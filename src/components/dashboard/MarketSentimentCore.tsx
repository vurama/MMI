import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useMarketSentimentCore } from "@/hooks/useMarketSentimentCore";
import { useRealTimeMarketData } from "@/hooks/useRealTimeMarketData";
import { RefreshCw, Info, Clock, TrendingUp, TrendingDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface MarketSentimentCoreProps {
  category?: string;
  className?: string;
  showDetails?: boolean;
}

const MarketSentimentCore: React.FC<MarketSentimentCoreProps> = ({
  category = "stocks",
  className = "",
  showDetails = false,
}) => {
  const { score, trend, sources, lastUpdated, isLoading, error } =
    useMarketSentimentCore(category);
  const { data: marketData } = useRealTimeMarketData(category);
  const [manualRefresh, setManualRefresh] = useState(false);

  // Handle manual refresh
  const handleRefresh = () => {
    setManualRefresh(true);
    // Reset after animation completes
    setTimeout(() => setManualRefresh(false), 1000);
  };

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 71) return "text-green-600 dark:text-green-500";
    if (score >= 41) return "text-amber-600 dark:text-amber-500";
    return "text-red-600 dark:text-red-500";
  };

  // Determine background color for progress bar
  const getProgressColor = (score: number) => {
    if (score >= 71) return "bg-green-500";
    if (score >= 41) return "bg-amber-500";
    return "bg-red-500";
  };

  // Determine sentiment category based on score
  const getSentimentCategory = (score: number) => {
    if (score >= 71) return "High Confidence";
    if (score >= 41) return "Neutral";
    return "Poor Sentiment";
  };

  // Format the last updated time
  const formatLastUpdated = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <Card
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Aggregated sentiment from Google News, Twitter, and Reddit
                    sources. Updated every 30 minutes.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <button
              onClick={handleRefresh}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading || manualRefresh ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative py-4">
              {/* Score display */}
              <motion.div
                className="flex items-center justify-between mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Market Sentiment
                </span>
                <div className="flex items-center">
                  <span
                    className={`text-2xl font-bold ${getScoreColor(score)}`}
                  >
                    {score}
                  </span>
                  {trend !== 0 && (
                    <span className="ml-1">
                      {trend > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Progress bar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-full" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 10 }}
                  className={`h-2.5 rounded-full ${getProgressColor(score)}`}
                  style={{ width: `${score}%` }}
                />

                {/* Tick marks */}
                <div className="absolute top-0 w-full flex justify-between px-0 mt-1">
                  <div className="h-1 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="h-1 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="h-1 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="h-1 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="h-1 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                </div>

                {/* Scale labels */}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>

              {/* Sentiment category */}
              <div className="flex justify-center mt-3">
                <Badge
                  className={`${score >= 71 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : score >= 41 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"} border-0`}
                >
                  {getSentimentCategory(score)}
                </Badge>
              </div>
            </div>

            {/* Source breakdown - only shown if showDetails is true */}
            {showDetails && sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Source Breakdown
                </h4>
                <div className="space-y-2">
                  {sources.map((source) => (
                    <div
                      key={source.name}
                      className="flex justify-between items-center text-xs"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {source.name} ({source.data.count} items)
                      </span>
                      <span
                        className={`font-medium ${source.data.score >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
                      >
                        {(source.data.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Last updated timestamp */}
            <div className="flex justify-center items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {formatLastUpdated(lastUpdated)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketSentimentCore;
