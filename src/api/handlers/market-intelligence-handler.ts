import { Request, Response } from "express";
import { saveMarketIntelligenceData } from "@/api/market-intelligence";
import type { MarketIntelligenceData } from "@/hooks/useMarketIntelligenceData";

/**
 * Handler for POST requests to /api/market-intelligence
 * This would be used in a Node.js server environment
 *
 * For the Vite client-side app, we'll use a Supabase Edge Function instead
 */
export const handleMarketIntelligencePost = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = req.body as MarketIntelligenceData;

    // Validate the data structure
    if (
      !data ||
      !data.overallSentiment ||
      !data.marketMetrics ||
      !data.topAssetsByMarket
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Invalid data structure. Required fields: overallSentiment, marketMetrics, topAssetsByMarket",
      });
    }

    // Save the data to Supabase
    const result = await saveMarketIntelligenceData(data);

    if (!result.success) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to save data" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Market intelligence data saved successfully",
      });
  } catch (error) {
    console.error("Error in market intelligence handler:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
