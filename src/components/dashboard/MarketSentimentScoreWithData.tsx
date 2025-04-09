import React from "react";
import MarketSentimentScore from "./MarketSentimentScore";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";

interface MarketSentimentScoreWithDataProps {
  overallScore?: number;
  sectorScores?: Array<{ sector: string; score: number; change?: number }>;
  historicalData?: Array<{
    date: string;
    score: number;
    sector?: string;
    aiAnalysis?: string;
  }>;
  lastUpdated?: string;
  isLoading?: boolean;
}

const MarketSentimentScoreWithData = () => {
  const {
    overallScore,
    sectorScores,
    historicalData,
    lastUpdated,
    isLoading,
    error,
    refreshSentimentData,
  } = useMarketSentiment();

  // Format historical data for the component
  const formattedHistoricalData =
    historicalData && historicalData.length > 0
      ? historicalData.map((item) => ({
          date: item.date,
          score: item.score,
          sector: item.sector || undefined,
          aiAnalysis: item.aiAnalysis || undefined,
        }))
      : [];

  // If there's an error, show loading state
  if (error) {
    console.error("Error loading market sentiment data:", error);
  }

  return (
    <MarketSentimentScore
      overallScore={overallScore}
      sectorScores={sectorScores || []}
      historicalData={formattedHistoricalData}
      lastUpdated={lastUpdated || "Loading..."}
      isLoading={isLoading}
    />
  );
};

export default MarketSentimentScoreWithData;
