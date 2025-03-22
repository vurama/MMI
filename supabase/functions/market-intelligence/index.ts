import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_KEY");

    // Check if credentials exist
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Supabase credentials not found",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse the request body
    const data = await req.json();

    // Validate the data structure
    if (
      !data ||
      !data.overallSentiment ||
      !data.marketMetrics ||
      !data.topAssetsByMarket
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Invalid data structure. Required fields: overallSentiment, marketMetrics, topAssetsByMarket",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Insert the data into the market_intelligence table
    const { data: result, error } = await supabase
      .from("market_intelligence")
      .insert([
        {
          data: data,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Market intelligence data saved successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error processing request:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
