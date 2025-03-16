import React from "react";
import AIInsightBox from "../dashboard/AIInsightBox";

export default function AIInsightBoxShowcase() {
  return (
    <div className="p-6 bg-[#f5f5f7] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">AI Insight Boxes - New Design</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Positive Status Box */}
        <AIInsightBox
          title="Tech Sector Momentum"
          category="Stocks"
          summary="AI analysis indicates strong momentum in tech stocks with potential growth opportunities in semiconductor and cloud services sectors."
          status="positive"
          lastUpdated="5 min ago"
          isTracking={true}
        />

        {/* Negative Status Box */}
        <AIInsightBox
          title="Housing Market Slowdown"
          category="Real Estate"
          summary="Detected cooling trends in major metropolitan housing markets with decreasing demand and increasing inventory levels."
          status="negative"
          lastUpdated="15 min ago"
          isTracking={true}
        />

        {/* Neutral Status Box */}
        <AIInsightBox
          title="Crypto Market Volatility"
          category="Crypto"
          summary="Increased volatility detected in cryptocurrency markets with potential regulatory developments affecting market sentiment."
          status="neutral"
          lastUpdated="Just now"
          isTracking={true}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Key Features of New Design:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-gray-800">
            Pulsing tracking indicators showing real-time monitoring status
          </li>
          <li className="text-gray-800">
            Color-coded status indicators (green for positive, red for negative,
            gray for neutral)
          </li>
          <li className="text-gray-800">
            Category badges for different market sectors
          </li>
          <li className="text-gray-800">
            AI brain icon showing AI-powered analysis
          </li>
          <li className="text-gray-800">
            Last updated timestamp for freshness indication
          </li>
          <li className="text-gray-800">
            Clickable cards to view detailed insights
          </li>
        </ul>
      </div>
    </div>
  );
}
