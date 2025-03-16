import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  summary: string;
  link: string;
  timestamp: string;
}

interface NewsEntry extends WebhookPayload {
  category: string;
}

// Enhanced AI-based category detection function
function detectCategory(summary: string): string {
  const summary_lower = summary.toLowerCase();

  // Stocks keywords
  if (
    /\b(stock|stocks|equity|equities|shares|nasdaq|nyse|dow jones|s&p 500|index|indices|etf|dividend|earnings|quarterly|investor|shareholders)\b/.test(
      summary_lower,
    )
  ) {
    return "Stocks";
  }

  // Crypto keywords
  if (
    /\b(crypto|cryptocurrency|bitcoin|btc|ethereum|eth|altcoin|token|blockchain|defi|nft|mining|wallet|exchange|binance|coinbase|ledger|satoshi)\b/.test(
      summary_lower,
    )
  ) {
    return "Crypto";
  }

  // Real Estate keywords
  if (
    /\b(real estate|housing|property|mortgage|rent|home|house|apartment|commercial property|residential|reit|construction|building|development|land)\b/.test(
      summary_lower,
    )
  ) {
    return "Real Estate";
  }

  // Technology keywords
  if (
    /\b(tech|technology|software|app|digital|ai|artificial intelligence|programming|developer|code|startup|innovation|silicon valley|gadget)\b/.test(
      summary_lower,
    )
  ) {
    return "Technology";
  }

  // Finance keywords
  if (
    /\b(finance|financial|economy|economic|bank|banking|money|currency|dollar|euro|profit|loss|fed|federal reserve|interest rate|inflation)\b/.test(
      summary_lower,
    )
  ) {
    return "Finance";
  }

  // Entertainment keywords
  if (
    /\b(entertainment|movie|film|tv|television|show|actor|actress|celebrity|music|song|album|artist|concert|performance)\b/.test(
      summary_lower,
    )
  ) {
    return "Entertainment";
  }

  // Sports keywords
  if (
    /\b(sport|sports|game|match|player|team|win|lose|score|tournament|championship|league|football|soccer|basketball|baseball|tennis|golf)\b/.test(
      summary_lower,
    )
  ) {
    return "Sports";
  }

  // Default category if no specific match
  return "General News";
}

const validatePayload = (payload: any): WebhookPayload => {
  if (!payload) throw new Error("Missing payload");
  if (typeof payload.summary !== "string" || !payload.summary)
    throw new Error("Missing or invalid summary");
  if (typeof payload.link !== "string" || !payload.link)
    throw new Error("Missing or invalid link");
  if (typeof payload.timestamp !== "string" || !payload.timestamp)
    throw new Error("Missing or invalid timestamp");

  return {
    summary: payload.summary,
    link: payload.link,
    timestamp: payload.timestamp,
  };
};

// Hardcoded Supabase credentials for development
// In production, these would be securely stored in environment variables
const SUPABASE_URL = "https://ixnbqfxvwdwxjnbecwzs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmJxZnh2d2R3eGpuYmVjd3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzOTc1NzYsImV4cCI6MjAzMTk3MzU3Nn0.Nh83ebqzf5jgSrSUEYZFwuJZGkGvG3tVYGNOc5xrZdc";

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Try to get environment variables first, fall back to hardcoded values if not available
    const supabaseUrl =
      Deno.env.get("SUPABASE_URL") ||
      Deno.env.get("VITE_SUPABASE_URL") ||
      SUPABASE_URL;

    const supabaseServiceKey =
      Deno.env.get("SUPABASE_SERVICE_KEY") ||
      Deno.env.get("SUPABASE_ANON_KEY") ||
      Deno.env.get("VITE_SUPABASE_ANON_KEY") ||
      SUPABASE_ANON_KEY;

    console.log("Using Supabase URL:", supabaseUrl.substring(0, 15) + "...");
    console.log(
      "Using Supabase Key:",
      supabaseServiceKey.substring(0, 15) + "...",
    );

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const payload = await req.json();
    console.log("Received webhook payload:", payload);

    // Validate payload
    const validatedData = validatePayload(payload);

    // Detect category using AI-based context detection
    const category = detectCategory(validatedData.summary);

    // Prepare news entry
    const newsEntry: NewsEntry = {
      ...validatedData,
      category,
    };

    // Save to database
    const { data, error } = await supabase
      .from("news_feed")
      .insert(newsEntry)
      .select();

    if (error) throw error;

    console.log("Successfully processed and stored news entry:", data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
        data: newsEntry,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error processing webhook:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
