import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Brain, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentData {
  date: string;
  score: number;
  sector: string;
  aiAnalysis?: string;
}

interface MarketSentimentScoreProps {
  overallScore?: number; // 0-100 scale
  sectorScores?: {
    sector: string;
    score: number;
  }[];
  historicalData?: SentimentData[];
  lastUpdated?: string;
  isLoading?: boolean;
}

const defaultSectorScores = [
  { sector: "Stocks", score: 68 },
  { sector: "Real Estate", score: 42 },
  { sector: "Crypto", score: 75 },
];

const defaultHistoricalData = [
  { date: "2024-07-22", score: 65, sector: "Overall" },
  { date: "2024-07-21", score: 62, sector: "Overall" },
  { date: "2024-07-20", score: 58, sector: "Overall" },
  { date: "2024-07-19", score: 55, sector: "Overall" },
  { date: "2024-07-18", score: 60, sector: "Overall" },
  { date: "2024-07-17", score: 63, sector: "Overall" },
  { date: "2024-07-16", score: 67, sector: "Overall" },
];

const MarketSentimentScore = ({
  overallScore = 65,
  sectorScores = defaultSectorScores,
  historicalData = defaultHistoricalData,
  lastUpdated = "Just now",
  isLoading = false,
}: MarketSentimentScoreProps) => {
  const getSentimentCategory = (score: number) => {
    if (score >= 70) return "Bullish";
    if (score >= 55) return "Moderately Bullish";
    if (score >= 45) return "Neutral";
    if (score >= 30) return "Moderately Bearish";
    return "Bearish";
  };

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-500";
    if (score >= 55) return "text-green-500 dark:text-green-400";
    if (score >= 45) return "text-gray-500 dark:text-gray-400";
    if (score >= 30) return "text-red-500 dark:text-red-400";
    return "text-red-600 dark:text-red-500";
  };

  const getSentimentIcon = (score: number) => {
    if (score >= 55) return <TrendingUp className="h-5 w-5" />;
    if (score < 45) return <TrendingDown className="h-5 w-5" />;
    return null;
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-green-600 dark:bg-green-500";
    if (score >= 55) return "bg-green-500 dark:bg-green-400";
    if (score >= 45) return "bg-gray-500 dark:bg-gray-400";
    if (score >= 30) return "bg-red-500 dark:bg-red-400";
    return "bg-red-600 dark:bg-red-500";
  };

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <Brain className="h-5 w-5 mr-2 text-indigo-500" />
            Market Sentiment Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-32 w-32 bg-gray-100 rounded-full animate-pulse dark:bg-gray-700"></div>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-100 rounded w-1/4 dark:bg-gray-700"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/6 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded dark:bg-gray-700"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate trend (is the sentiment improving or declining)
  const sentimentTrend =
    historicalData.length > 1
      ? historicalData[0].score - historicalData[1].score
      : 0;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
          <Brain className="h-5 w-5 mr-2 text-indigo-500" />
          Market Sentiment Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main sentiment score */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className={cn(
                  "text-5xl font-bold",
                  getSentimentColor(overallScore),
                )}
              >
                {overallScore}
              </div>
              <div className="absolute -top-1 -right-6">
                {sentimentTrend > 0 ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    +{sentimentTrend.toFixed(1)}
                  </Badge>
                ) : sentimentTrend < 0 ? (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {sentimentTrend.toFixed(1)}
                  </Badge>
                ) : null}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-lg font-medium",
                  getSentimentColor(overallScore),
                )}
              >
                {getSentimentCategory(overallScore)}
              </span>
              {getSentimentIcon(overallScore) && (
                <span className={cn("ml-2", getSentimentColor(overallScore))}>
                  {getSentimentIcon(overallScore)}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              Updated {lastUpdated}
            </div>
          </div>

          {/* Sector sentiment scores */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Sector Sentiment
              </span>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Info className="h-3 w-3 mr-1" />
                <span>0-100 scale</span>
              </div>
            </div>
            {sectorScores.map((sector) => (
              <div key={sector.sector} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    {sector.sector}
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      getSentimentColor(sector.score),
                    )}
                  >
                    {sector.score}
                  </span>
                </div>
                <Progress
                  value={sector.score}
                  max={100}
                  className="h-2 bg-gray-100 dark:bg-gray-700"
                  indicatorClassName={getProgressColor(sector.score)}
                />
              </div>
            ))}
          </div>

          {/* Historical trend visualization */}
          <div className="pt-2">
            <div className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-300">
              7-Day Sentiment Trend
            </div>
            <div className="h-20 relative">
              <div className="absolute inset-0 flex items-end justify-between">
                {historicalData.map((data, index) => {
                  const height = `${data.score}%`;
                  return (
                    <div
                      key={index}
                      className="w-[8%] group relative"
                      style={{ height }}
                    >
                      <div
                        className={cn(
                          "w-full h-full rounded-t",
                          getProgressColor(data.score),
                        )}
                      ></div>
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200 whitespace-nowrap dark:bg-gray-700">
                        {new Date(data.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        : {data.score}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200 dark:bg-gray-600"></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              {historicalData
                .slice(0)
                .reverse()
                .filter((_, i) => i % 2 === 0)
                .map((data, index) => (
                  <div key={index}>
                    {new Date(data.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSentimentScore;
