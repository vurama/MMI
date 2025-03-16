import { useState, useEffect } from "react";
import {
  MarketDataService,
  MarketDataItem,
  TrendingAsset,
} from "../services/MarketDataService";

export function useMarketData() {
  const [marketData, setMarketData] = useState<MarketDataItem[]>([]);
  const [trendingAssets, setTrendingAssets] = useState<TrendingAsset[]>([]);
  const [decliningAssets, setDecliningAssets] = useState<TrendingAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [allData, trending, declining] = await Promise.all([
          MarketDataService.getAllMarketData(),
          MarketDataService.getTrendingAssets(),
          MarketDataService.getDecliningAssets(),
        ]);

        setMarketData(allData);
        setTrendingAssets(trending);
        setDecliningAssets(declining);
      } catch (err) {
        console.error("Error in useMarketData hook:", err);
        setError("Failed to fetch market data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    const subscription = MarketDataService.subscribeToMarketUpdates(
      (payload) => {
        // When we receive an update, refresh the data
        fetchData();
      },
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [allData, trending, declining] = await Promise.all([
        MarketDataService.getAllMarketData(),
        MarketDataService.getTrendingAssets(),
        MarketDataService.getDecliningAssets(),
      ]);

      setMarketData(allData);
      setTrendingAssets(trending);
      setDecliningAssets(declining);
    } catch (err) {
      setError("Failed to refresh market data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    marketData,
    trendingAssets,
    decliningAssets,
    isLoading,
    error,
    refreshData,
  };
}

export function useSectorMarketData(sector: string) {
  const [sectorData, setSectorData] = useState<MarketDataItem[]>([]);
  const [averageChange, setAverageChange] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [data, avgChange] = await Promise.all([
          MarketDataService.getMarketDataBySector(sector),
          MarketDataService.getSectorAverageChange(sector),
        ]);

        setSectorData(data);
        setAverageChange(avgChange);
      } catch (err) {
        console.error(`Error fetching ${sector} data:`, err);
        setError(`Failed to fetch ${sector} market data`);
      } finally {
        setIsLoading(false);
      }
    };

    if (sector) {
      fetchSectorData();

      // Set up real-time subscription for this sector
      const subscription = MarketDataService.subscribeToMarketUpdates(
        (payload) => {
          // Only refresh if the updated record is in our sector
          if (payload.new && payload.new.sector === sector) {
            fetchSectorData();
          }
        },
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [sector]);

  return { sectorData, averageChange, isLoading, error };
}
