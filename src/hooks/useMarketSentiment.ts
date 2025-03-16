import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabase";
import { Tables } from "@/types/supabase";

export type MarketSentimentItem = Tables<"market_sentiment">;

export interface SectorSentiment {
  sector: string;
  score: number;
}

export function useMarketSentiment() {
  const [overallScore, setOverallScore] = useState<number>(50);
  const [sectorScores, setSectorScores] = useState<SectorSentiment[]>([]);
  const [historicalData, setHistoricalData] = useState<MarketSentimentItem[]>(
    [],
  );
  const [lastUpdated, setLastUpdated] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentimentData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get the latest overall sentiment score
        const { data: latestData, error: latestError } = await supabase
          .from("market_sentiment")
          .select("*")
          .eq("sector", "Overall")
          .order("date", { ascending: false })
          .limit(1);

        if (latestError) throw latestError;

        if (latestData && latestData.length > 0) {
          setOverallScore(latestData[0].sentiment_score);
          setLastUpdated(new Date(latestData[0].date).toLocaleString());
        }

        // Get sector-specific sentiment scores
        const { data: sectorData, error: sectorError } = await supabase
          .from("market_sentiment")
          .select("*")
          .not("sector", "eq", "Overall")
          .order("date", { ascending: false })
          .limit(10);

        if (sectorError) throw sectorError;

        if (sectorData) {
          // Group by sector and get the latest score for each
          const sectorMap = new Map<string, number>();
          sectorData.forEach((item) => {
            if (!sectorMap.has(item.sector)) {
              sectorMap.set(item.sector, item.sentiment_score);
            }
          });

          const sectorScoresArray = Array.from(sectorMap.entries()).map(
            ([sector, score]) => ({ sector, score }),
          );
          setSectorScores(sectorScoresArray);
        }

        // Get historical data for trend visualization
        const { data: historyData, error: historyError } = await supabase
          .from("market_sentiment")
          .select("*")
          .eq("sector", "Overall")
          .order("date", { ascending: false })
          .limit(7);

        if (historyError) throw historyError;

        if (historyData) {
          setHistoricalData(historyData.reverse()); // Reverse to get chronological order
        }
      } catch (err) {
        console.error("Error fetching market sentiment data:", err);
        setError("Failed to fetch market sentiment data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentimentData();

    // Set up real-time subscription
    const subscription = supabase
      .channel("market_sentiment_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "market_sentiment" },
        (payload) => {
          // When we receive an update, refresh the data
          fetchSentimentData();
        },
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshSentimentData = async () => {
    setIsLoading(true);
    try {
      // Get the latest overall sentiment score
      const { data: latestData, error: latestError } = await supabase
        .from("market_sentiment")
        .select("*")
        .eq("sector", "Overall")
        .order("date", { ascending: false })
        .limit(1);

      if (latestError) throw latestError;

      if (latestData && latestData.length > 0) {
        setOverallScore(latestData[0].sentiment_score);
        setLastUpdated(new Date(latestData[0].date).toLocaleString());
      }

      // Get sector-specific sentiment scores
      const { data: sectorData, error: sectorError } = await supabase
        .from("market_sentiment")
        .select("*")
        .not("sector", "eq", "Overall")
        .order("date", { ascending: false })
        .limit(10);

      if (sectorError) throw sectorError;

      if (sectorData) {
        // Group by sector and get the latest score for each
        const sectorMap = new Map<string, number>();
        sectorData.forEach((item) => {
          if (!sectorMap.has(item.sector)) {
            sectorMap.set(item.sector, item.sentiment_score);
          }
        });

        const sectorScoresArray = Array.from(sectorMap.entries()).map(
          ([sector, score]) => ({ sector, score }),
        );
        setSectorScores(sectorScoresArray);
      }

      // Get historical data for trend visualization
      const { data: historyData, error: historyError } = await supabase
        .from("market_sentiment")
        .select("*")
        .eq("sector", "Overall")
        .order("date", { ascending: false })
        .limit(7);

      if (historyError) throw historyError;

      if (historyData) {
        setHistoricalData(historyData.reverse()); // Reverse to get chronological order
      }
    } catch (err) {
      console.error("Error refreshing market sentiment data:", err);
      setError("Failed to refresh market sentiment data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    overallScore,
    sectorScores,
    historicalData,
    lastUpdated,
    isLoading,
    error,
    refreshSentimentData,
  };
}
