import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react";

interface Insight {
  id: string;
  title: string;
  description: string;
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  sectors: string[];
  actionable: string;
}

interface MarketInsightPanelProps {
  insights?: Insight[];
  isLoading?: boolean;
  onInsightClick?: (insight: Insight) => void;
}

const defaultInsights: Insight[] = [
  {
    id: "1",
    title: "Tech Sector Momentum",
    description:
      "AI analysis indicates strong momentum in tech stocks with potential growth opportunities in semiconductor and cloud services sectors.",
    sentiment: "positive",
    confidence: 92,
    sectors: ["Technology", "Semiconductors"],
    actionable:
      "Consider increasing exposure to semiconductor stocks like NVDA, AMD, and ASML.",
  },
  {
    id: "2",
    title: "Housing Market Slowdown",
    description:
      "Detected cooling trends in major metropolitan housing markets with decreasing demand and increasing inventory levels.",
    sentiment: "negative",
    confidence: 87,
    sectors: ["Real Estate", "Construction"],
    actionable:
      "Consider reducing exposure to residential real estate and homebuilder stocks.",
  },
  {
    id: "3",
    title: "Crypto Market Volatility",
    description:
      "Increased volatility detected in cryptocurrency markets with potential regulatory developments affecting market sentiment.",
    sentiment: "neutral",
    confidence: 78,
    sectors: ["Cryptocurrency", "Blockchain"],
    actionable:
      "Monitor regulatory news closely before making significant position changes.",
  },
];

const MarketInsightPanel = ({
  insights = defaultInsights,
  isLoading = false,
  onInsightClick = () => {},
}: MarketInsightPanelProps) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return (
          <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />
        );
      case "negative":
        return (
          <TrendingDown className="h-5 w-5 text-red-500 dark:text-red-400" />
        );
      default:
        return <Zap className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800/30";
      case "negative":
        return "bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800/30";
      default:
        return "bg-gray-50 border-gray-100 dark:bg-gray-900/50 dark:border-gray-800/30";
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <Brain className="h-5 w-5 mr-2 text-indigo-500" />
            AI Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 border border-gray-100 rounded-lg space-y-3 animate-pulse dark:border-gray-700"
              >
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-100 rounded w-1/3 dark:bg-gray-700"></div>
                  <div className="h-5 w-5 bg-gray-100 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-100 rounded w-full dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-100 rounded w-1/4 dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/4 dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
          <Brain className="h-5 w-5 mr-2 text-indigo-500" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 border rounded-lg ${getSentimentColor(insight.sentiment)} hover:shadow-md transition-all cursor-pointer`}
              onClick={() => onInsightClick(insight)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {insight.title}
                </h3>
                {getSentimentIcon(insight.sentiment)}
              </div>
              <p className="text-sm text-gray-600 mb-3 dark:text-gray-300">
                {insight.description}
              </p>

              <div className="bg-white/80 border border-gray-100 rounded-lg p-3 mb-3 dark:bg-gray-800/80 dark:border-gray-700">
                <div className="flex items-center mb-1">
                  <Lightbulb className="h-4 w-4 text-amber-500 mr-1 dark:text-amber-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Actionable Insight
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insight.actionable}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1.5">
                  {insight.sectors.map((sector) => (
                    <Badge key={sector} variant="outline" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2 dark:text-gray-400">
                    AI Confidence: {insight.confidence}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/20"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsightPanel;
