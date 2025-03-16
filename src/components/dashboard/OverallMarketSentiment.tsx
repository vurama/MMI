import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, TrendingDown, Info, Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverallMarketSentimentProps {
  score: number; // 0-100 scale
  trend?: number; // positive or negative change
  timeframe?: string; // e.g., "14 days"
  analysis: string;
  className?: string;
}

const OverallMarketSentiment: React.FC<OverallMarketSentimentProps> = ({
  score = 65,
  trend = 0,
  timeframe = "14 days",
  analysis,
  className,
}) => {
  // Determine sentiment category based on score
  const getSentimentCategory = (score: number) => {
    if (score >= 70) return "Bullish";
    if (score >= 55) return "Moderately Bullish";
    if (score >= 45) return "Neutral";
    if (score >= 30) return "Moderately Bearish";
    return "Bearish";
  };

  // Get color based on sentiment score
  const getTextColorClass = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-500";
    if (score >= 55) return "text-lime-600 dark:text-lime-500";
    if (score >= 45) return "text-gray-500 dark:text-gray-400";
    if (score >= 30) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  // Get background color based on sentiment score
  const getBgColorClass = (score: number) => {
    if (score >= 70) return "bg-green-50 dark:bg-green-900/20";
    if (score >= 55) return "bg-lime-50 dark:bg-lime-900/20";
    if (score >= 45) return "bg-gray-50 dark:bg-gray-800";
    if (score >= 30) return "bg-orange-50 dark:bg-orange-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  // Get trend icon and text
  const getTrendDisplay = (trend: number) => {
    if (trend > 0) {
      return {
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        text: `+${trend.toFixed(1)}`,
        class: "text-green-600 dark:text-green-500",
      };
    } else if (trend < 0) {
      return {
        icon: <TrendingDown className="h-5 w-5 text-red-500" />,
        text: `${trend.toFixed(1)}`,
        class: "text-red-600 dark:text-red-500",
      };
    }
    return {
      icon: null,
      text: "0",
      class: "text-gray-500 dark:text-gray-400",
    };
  };

  const trendDisplay = getTrendDisplay(trend);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <Brain className="h-5 w-5 mr-2 text-indigo-500" />
            Overall Market Sentiment
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Aggregated market sentiment based on all metrics over{" "}
                  {timeframe}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`p-4 rounded-xl ${getBgColorClass(score)} mb-4`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span
                className={`text-4xl font-bold ${getTextColorClass(score)}`}
              >
                {score}
              </span>
              <div className="ml-3">
                <div
                  className={`text-lg font-medium ${getTextColorClass(score)}`}
                >
                  {getSentimentCategory(score)}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {timeframe} outlook
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                {trendDisplay.icon}
                <span className={`ml-1 font-medium ${trendDisplay.class}`}>
                  {trendDisplay.text}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Since last week
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p>{analysis}</p>
        </div>

        {/* Directives Section */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Investor Directives:
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {score >= 70
              ? "Consider long positions in quality assets with strong fundamentals. Set appropriate stop losses to manage risk."
              : score >= 55
                ? "Maintain existing long positions but be selective with new entries. Focus on sectors showing relative strength."
                : score >= 45
                  ? "Neutral market conditions suggest a balanced approach. Consider both long and short opportunities based on individual asset analysis."
                  : score >= 30
                    ? "Exercise caution with new long positions. Consider reducing exposure to high-risk assets and focus on defensive sectors."
                    : "Defensive positioning recommended. Consider short positions in weak sectors or moving to cash until market conditions improve."}
          </p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
            Disclaimer: This is data-driven AI detection technology, not
            financial advice. Always conduct your own research before making
            investment decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallMarketSentiment;
