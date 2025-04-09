import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketSentimentProps {
  sentimentScore: number; // 0-100 score
  sector: string;
  change?: number; // percentage change
  aiAnalysis?: string;
  isLoading?: boolean;
}

const MarketSentimentWidget = ({
  sentimentScore = 65,
  sector = "Overall Market",
  change = 2.3,
  aiAnalysis = "Market sentiment is bullish with strong momentum in technology and financial sectors. Consider increasing exposure to these areas.",
  isLoading = false,
}: MarketSentimentProps) => {
  // Determine sentiment category and styling
  const getSentimentCategory = (score: number) => {
    if (score >= 70)
      return {
        label: "Bullish",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    if (score >= 50)
      return {
        label: "Slightly Bullish",
        color: "text-green-500",
        bgColor: "bg-green-50",
      };
    if (score >= 40)
      return {
        label: "Neutral",
        color: "text-gray-500",
        bgColor: "bg-gray-100",
      };
    if (score >= 20)
      return {
        label: "Slightly Bearish",
        color: "text-red-500",
        bgColor: "bg-red-50",
      };
    return { label: "Bearish", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const sentimentCategory = getSentimentCategory(sentimentScore);

  // Determine progress bar color
  const getProgressColor = (score: number): string => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-green-400";
    if (score >= 40) return "bg-gray-400";
    if (score >= 20) return "bg-red-400";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex justify-between items-center">
            <span>Market Sentiment</span>
            <div className="h-6 w-24 bg-gray-100 animate-pulse rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 animate-pulse rounded"></div>
              <div className="h-2 w-full bg-gray-100 animate-pulse rounded-full"></div>
            </div>
            <div className="h-24 w-full bg-gray-50 animate-pulse rounded-lg border border-gray-100"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 flex justify-between items-center">
          <span>Market Sentiment</span>
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${sentimentCategory.bgColor} ${sentimentCategory.color}`}
          >
            {sentimentCategory.label}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-500">{sector}</span>
              <div className="flex items-center">
                <span
                  className={
                    change > 0
                      ? "text-green-500"
                      : change < 0
                        ? "text-red-500"
                        : "text-gray-500"
                  }
                >
                  {change > 0 ? (
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                  ) : change < 0 ? (
                    <TrendingDown className="h-4 w-4 inline mr-1" />
                  ) : (
                    <Minus className="h-4 w-4 inline mr-1" />
                  )}
                  {Math.abs(change).toFixed(1)}%
                </span>
              </div>
            </div>
            <Progress
              value={sentimentScore}
              className="h-2 bg-gray-100 rounded-full"
              indicatorClassName={getProgressColor(sentimentScore)}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              AI Analysis
            </h4>
            <p className="text-sm text-gray-600">{aiAnalysis}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSentimentWidget;
