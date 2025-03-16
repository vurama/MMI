import React from "react";
import AIInsightBox from "../dashboard/AIInsightBox";

export default function AIInsightBoxStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">AI Insight Boxes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AIInsightBox
          title="Tech Sector Momentum"
          category="Stocks"
          summary="AI analysis indicates strong momentum in tech stocks with potential growth opportunities in semiconductor and cloud services sectors."
          status="positive"
          lastUpdated="5 min ago"
          isTracking={true}
        />

        <AIInsightBox
          title="Housing Market Slowdown"
          category="Real Estate"
          summary="Detected cooling trends in major metropolitan housing markets with decreasing demand and increasing inventory levels."
          status="negative"
          lastUpdated="15 min ago"
          isTracking={true}
        />

        <AIInsightBox
          title="Crypto Market Volatility"
          category="Crypto"
          summary="Increased volatility detected in cryptocurrency markets with potential regulatory developments affecting market sentiment."
          status="neutral"
          lastUpdated="Just now"
          isTracking={true}
        />
      </div>
    </div>
  );
}
