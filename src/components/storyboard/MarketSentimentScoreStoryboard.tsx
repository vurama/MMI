import React from "react";
import MarketSentimentScore from "../dashboard/MarketSentimentScore";

export default function MarketSentimentScoreStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Market Sentiment Score
      </h1>
      <div className="max-w-md mx-auto">
        <MarketSentimentScore />
      </div>
    </div>
  );
}
