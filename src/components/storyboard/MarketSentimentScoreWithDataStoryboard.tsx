import React from "react";
import MarketSentimentScoreWithData from "../dashboard/MarketSentimentScoreWithData";

export default function MarketSentimentScoreWithDataStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Market Sentiment Score (Live Data)
      </h1>
      <div className="max-w-md mx-auto">
        <MarketSentimentScoreWithData />
      </div>
    </div>
  );
}
