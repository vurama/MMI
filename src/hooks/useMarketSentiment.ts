import { useState } from "react";

// Define types for sector scores
export interface SectorScore {
  sector: string;
  score: number;
  change: number;
}

// Define types for historical data
export interface HistoricalDataPoint {
  date: string;
  score: number;
}

// This hook provides functions to fetch market sentiment data
export function useMarketSentiment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [overallScore, setOverallScore] = useState<number>(
    Math.floor(30 + Math.random() * 70),
  ); // Random score between 30-100
  const [sectorScores, setSectorScores] = useState<SectorScore[]>([
    {
      sector: "Technology",
      score: Math.floor(30 + Math.random() * 70),
      change: Math.floor(-5 + Math.random() * 10),
    },
    {
      sector: "Finance",
      score: Math.floor(30 + Math.random() * 70),
      change: Math.floor(-5 + Math.random() * 10),
    },
    {
      sector: "Healthcare",
      score: Math.floor(30 + Math.random() * 70),
      change: Math.floor(-5 + Math.random() * 10),
    },
    {
      sector: "Real Estate",
      score: Math.floor(30 + Math.random() * 70),
      change: Math.floor(-5 + Math.random() * 10),
    },
    {
      sector: "Energy",
      score: Math.floor(30 + Math.random() * 70),
      change: Math.floor(-5 + Math.random() * 10),
    },
  ]);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(
    Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      score: Math.floor(30 + Math.random() * 70),
    })),
  );
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toISOString(),
  );

  // Function to get sentiment data for a specific ticker
  const getSentiment = async (ticker: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll simulate a response with random data

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate a random sentiment score between 0.2 and 0.9
      const randomSentiment = 0.2 + Math.random() * 0.7;

      // Return simulated sentiment data
      return {
        ticker,
        score: randomSentiment,
        lastUpdated: new Date().toISOString(),
        source: "AI Analysis",
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get overall market sentiment
  const getOverallSentiment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Generate a random overall sentiment score between 0.3 and 0.8
      const randomSentiment = 0.3 + Math.random() * 0.5;

      return {
        score: randomSentiment,
        trend: randomSentiment > 0.5 ? "positive" : "negative",
        lastUpdated: new Date().toISOString(),
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh sentiment data
  const refreshSentimentData = () => {
    setOverallScore(Math.floor(30 + Math.random() * 70));
    setSectorScores(
      sectorScores.map((sector) => ({
        ...sector,
        score: Math.floor(30 + Math.random() * 70),
        change: Math.floor(-5 + Math.random() * 10),
      })),
    );
    setHistoricalData([
      ...historicalData.slice(1),
      {
        date: new Date().toISOString().split("T")[0],
        score: Math.floor(30 + Math.random() * 70),
      },
    ]);
    setLastUpdated(new Date().toISOString());
  };

  return {
    getSentiment,
    getOverallSentiment,
    isLoading,
    error,
    overallScore,
    sectorScores,
    historicalData,
    lastUpdated,
    refreshSentimentData,
  };
}
