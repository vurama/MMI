import { useState, useEffect } from "react";

export interface MarketDataItem {
  ticker: string;
  price: number;
  change: number;
  volume: number;
  avgVolume: number;
  lastUpdated: string;
}

// This hook provides functions to fetch real-time market data
export function useRealTimeMarketData(category?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Record<string, MarketDataItem> | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toISOString(),
  );

  // Generate mock data based on category
  useEffect(() => {
    if (category) {
      const mockTickers = getMockTickersForCategory(category);
      getBatchMarketData(mockTickers).then((result) => {
        if (result) {
          setData(result);
          setLastUpdated(new Date().toISOString());
        }
      });
    }
  }, [category]);

  // Get mock tickers based on category
  const getMockTickersForCategory = (category: string): string[] => {
    switch (category.toLowerCase()) {
      case "stocks":
        return ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
      case "crypto":
        return ["BTC", "ETH", "SOL", "ADA", "DOT"];
      case "forex":
        return ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD"];
      case "commodities":
        return ["GOLD", "SILVER", "OIL", "GAS", "COPPER"];
      default:
        return ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
    }
  };

  // Function to get real-time data for a specific ticker
  const getRealTimeData = async (ticker: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll simulate a response with slightly randomized data

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Base values for different tickers
      let basePrice = 0;
      let baseVolume = 0;
      let baseAvgVolume = 0;

      // Set different base values based on ticker
      if (ticker === "VNA.DE") {
        basePrice = 28.64;
        baseVolume = 2500000;
        baseAvgVolume = 2000000;
      } else if (ticker === "AT1.DE") {
        basePrice = 1.85;
        baseVolume = 1800000;
        baseAvgVolume = 1500000;
      } else if (ticker === "LEG.DE") {
        basePrice = 78.32;
        baseVolume = 900000;
        baseAvgVolume = 750000;
      } else {
        // Default values for unknown tickers
        basePrice = 50.0;
        baseVolume = 1000000;
        baseAvgVolume = 900000;
      }

      // Add some randomness to make it look like real-time data
      const randomFactor = 0.98 + Math.random() * 0.04; // Between 0.98 and 1.02
      const price = +(basePrice * randomFactor).toFixed(2);
      const change = +((randomFactor - 1) * 100).toFixed(2);

      const volumeRandomFactor = 0.9 + Math.random() * 0.2; // Between 0.9 and 1.1
      const volume = Math.round(baseVolume * volumeRandomFactor);

      // Return simulated market data
      return {
        ticker,
        price,
        change,
        volume,
        avgVolume: baseAvgVolume,
        lastUpdated: new Date().toISOString(),
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get market data for multiple tickers
  const getBatchMarketData = async (tickers: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      // Process each ticker in parallel
      const promises = tickers.map((ticker) => getRealTimeData(ticker));
      const results = await Promise.all(promises);

      // Return as an object with tickers as keys
      return results.reduce(
        (acc, data) => {
          if (data && data.ticker) {
            acc[data.ticker] = data;
          }
          return acc;
        },
        {} as Record<string, MarketDataItem>,
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRealTimeData,
    getBatchMarketData,
    isLoading,
    error,
    data,
    lastUpdated,
  };
}
