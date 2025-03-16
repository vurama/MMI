import React from "react";
import MarketSentimentCore from "../dashboard/MarketSentimentCore";

export default function MarketSentimentCoreStoryboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Market Sentiment Core</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Stocks</h2>
          <MarketSentimentCore category="stocks" showDetails={true} />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Real Estate</h2>
          <MarketSentimentCore category="realestate" showDetails={true} />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Crypto</h2>
          <MarketSentimentCore category="crypto" showDetails={true} />
        </div>
      </div>
    </div>
  );
}
