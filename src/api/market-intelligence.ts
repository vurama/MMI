import { supabase } from "@/supabase/supabase";
import type { MarketIntelligenceData } from "@/hooks/useMarketIntelligenceData";

/**
 * Saves market intelligence data to Supabase
 * This function would be called by your API endpoint that receives the POST request
 */
export const saveMarketIntelligenceData = async (
  data: MarketIntelligenceData,
) => {
  try {
    const { data: result, error } = await supabase
      .from("market_intelligence")
      .insert([
        {
          data: data,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return { success: true, data: result };
  } catch (error) {
    console.error("Error saving market intelligence data:", error);
    return { success: false, error };
  }
};

/**
 * Gets the latest market intelligence data from Supabase
 */
export const getLatestMarketIntelligenceData = async () => {
  try {
    const { data, error } = await supabase
      .from("market_intelligence")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error("Error getting market intelligence data:", error);
    return { success: false, error };
  }
};
