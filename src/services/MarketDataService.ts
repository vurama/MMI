import { supabase } from "../../supabase/supabase";
import { Tables } from "@/types/supabase";

export type MarketDataItem = Tables<"market_data">;

export interface TrendingAsset {
  symbol: string;
  name: string;
  sector: string;
  current_price: number;
  change_percentage: number;
  volume: number;
}

export class MarketDataService {
  /**
   * Fetch all market data
   */
  static async getAllMarketData(): Promise<MarketDataItem[]> {
    const { data, error } = await supabase
      .from("market_data")
      .select("*")
      .order("symbol");

    if (error) {
      console.error("Error fetching market data:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Fetch market data by sector
   */
  static async getMarketDataBySector(
    sector: string,
  ): Promise<MarketDataItem[]> {
    const { data, error } = await supabase
      .from("market_data")
      .select("*")
      .eq("sector", sector)
      .order("symbol");

    if (error) {
      console.error(`Error fetching ${sector} market data:`, error);
      return [];
    }

    return data || [];
  }

  /**
   * Get trending assets (highest positive or negative change)
   */
  static async getTrendingAssets(limit: number = 5): Promise<TrendingAsset[]> {
    const { data, error } = await supabase
      .from("market_data")
      .select("*")
      .not("change_percentage", "is", null)
      .order("change_percentage", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching trending assets:", error);
      return [];
    }

    return (
      data?.map((item) => ({
        symbol: item.symbol,
        name: item.name,
        sector: item.sector,
        current_price: item.current_price || 0,
        change_percentage: item.change_percentage || 0,
        volume: item.volume || 0,
      })) || []
    );
  }

  /**
   * Get declining assets (lowest negative change)
   */
  static async getDecliningAssets(limit: number = 5): Promise<TrendingAsset[]> {
    const { data, error } = await supabase
      .from("market_data")
      .select("*")
      .not("change_percentage", "is", null)
      .order("change_percentage", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Error fetching declining assets:", error);
      return [];
    }

    return (
      data?.map((item) => ({
        symbol: item.symbol,
        name: item.name,
        sector: item.sector,
        current_price: item.current_price || 0,
        change_percentage: item.change_percentage || 0,
        volume: item.volume || 0,
      })) || []
    );
  }

  /**
   * Get market data for a specific symbol
   */
  static async getMarketDataBySymbol(
    symbol: string,
  ): Promise<MarketDataItem | null> {
    const { data, error } = await supabase
      .from("market_data")
      .select("*")
      .eq("symbol", symbol)
      .single();

    if (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return null;
    }

    return data;
  }

  /**
   * Calculate average change percentage for a sector
   */
  static async getSectorAverageChange(sector: string): Promise<number> {
    const { data, error } = await supabase
      .from("market_data")
      .select("change_percentage")
      .eq("sector", sector)
      .not("change_percentage", "is", null);

    if (error || !data || data.length === 0) {
      console.error(`Error calculating average change for ${sector}:`, error);
      return 0;
    }

    const sum = data.reduce(
      (acc, item) => acc + (item.change_percentage || 0),
      0,
    );
    return sum / data.length;
  }

  /**
   * Get highest volume assets
   */
  static async getHighestVolumeAssets(
    limit: number = 5,
  ): Promise<TrendingAsset[]> {
    const { data, error } = await supabase
      .from("market_data")
      .select("*")
      .not("volume", "is", null)
      .order("volume", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching highest volume assets:", error);
      return [];
    }

    return (
      data?.map((item) => ({
        symbol: item.symbol,
        name: item.name,
        sector: item.sector,
        current_price: item.current_price || 0,
        change_percentage: item.change_percentage || 0,
        volume: item.volume || 0,
      })) || []
    );
  }

  /**
   * Subscribe to real-time updates for market data
   */
  static subscribeToMarketUpdates(callback: (payload: any) => void) {
    return supabase
      .channel("market_data_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "market_data" },
        callback,
      )
      .subscribe();
  }
}
