import React from "react";
import AIInsightGrid from "../dashboard/AIInsightGrid";
import MarketSentimentWidget from "../dashboard/MarketSentimentWidget";
import AlertsWidget from "../dashboard/AlertsWidget";
import SubscriptionWidget from "../dashboard/SubscriptionWidget";
import MarketNewsWidget from "../dashboard/MarketNewsWidget";
import { Brain, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewDashboardView() {
  return (
    <div className="p-6 bg-[#f5f5f7] min-h-screen">
      {/* Header with AI indicator */}
      <div className="container mx-auto px-6 pt-6 pb-2 flex justify-between items-center bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            AI Market Intelligence
          </h1>
          <div className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            <span className="animate-pulse">Live Tracking</span>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Analysis
        </Button>
      </div>

      <div className="container mx-auto space-y-8">
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
