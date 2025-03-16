import React from "react";
import MarketSentimentScore from "./MarketSentimentScore";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";

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
          score: item.sentiment_score,
          sector: item.sector,
          aiAnalysis: item.ai_analysis || undefined,
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
