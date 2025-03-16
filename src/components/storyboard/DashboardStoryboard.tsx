import React from "react";
import AIInsightGrid from "../dashboard/AIInsightGrid";
import MarketSentimentWidget from "../dashboard/MarketSentimentWidget";
import AlertsWidget from "../dashboard/AlertsWidget";
import SubscriptionWidget from "../dashboard/SubscriptionWidget";
import MarketNewsWidget from "../dashboard/MarketNewsWidget";
import { Brain, Zap } from "lucide-react";

export default function DashboardStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <Brain className="h-6 w-6 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">
          AI Market Intelligence
        </h1>
        <div className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <Zap className="h-3 w-3 mr-1" />
          Live Tracking
        </div>
      </div>

      <div className="space-y-8">
        {/* AI Insight Boxes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            AI Market Insights
          </h2>
          <AIInsightGrid />
        </div>

        {/* Secondary Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MarketNewsWidget />
          </div>
          <div className="space-y-6">
            <MarketSentimentWidget />
            <AlertsWidget />
            <SubscriptionWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
