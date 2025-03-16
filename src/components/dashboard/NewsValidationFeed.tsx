import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Clock,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: number; // -1 to 1 scale
  sectors: string[];
  symbols?: string[];
  aiValidation?: {
    score: number; // 0-100
    summary: string;
  };
}

interface NewsValidationFeedProps {
  news?: NewsItem[];
  isLoading?: boolean;
  onNewsClick?: (item: NewsItem) => void;
}

const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "Fed signals potential rate cuts as inflation cools",
    source: "Financial Times",
    url: "#",
    publishedAt: "2024-07-22T14:30:00Z",
    sentiment: 0.7,
    sectors: ["Stocks", "Bonds"],
    symbols: ["SPY", "QQQ"],
    aiValidation: {
      score: 92,
      summary:
        "AI confirms this news aligns with recent economic indicators and Fed statements. High confidence in the accuracy of this report.",
    },
  },
  {
    id: "2",
    title: "Housing market shows signs of cooling in major metros",
    source: "Reuters",
    url: "#",
    publishedAt: "2024-07-22T12:15:00Z",
    sentiment: -0.3,
    sectors: ["Real Estate"],
    symbols: ["VNQ"],
    aiValidation: {
      score: 87,
      summary:
        "AI analysis confirms cooling trend in housing markets based on multiple data sources. Some regional variations exist.",
    },
  },
  {
    id: "3",
    title: "Bitcoin surges past $50,000 on ETF inflow news",
    source: "CoinDesk",
    url: "#",
    publishedAt: "2024-07-22T09:45:00Z",
    sentiment: 0.8,
    sectors: ["Crypto"],
    symbols: ["BTC", "ETH"],
    aiValidation: {
      score: 95,
      summary:
        "AI confirms ETF inflows match reported figures. Price movement is consistent with historical patterns for similar events.",
    },
  },
  {
    id: "4",
    title: "Tech stocks rally on strong earnings reports",
    source: "CNBC",
    url: "#",
    publishedAt: "2024-07-21T16:20:00Z",
    sentiment: 0.6,
    sectors: ["Stocks", "Technology"],
    symbols: ["AAPL", "MSFT", "GOOGL"],
    aiValidation: {
      score: 90,
      summary:
        "AI confirms earnings figures match official reports. Market reaction is proportional to the earnings surprise.",
    },
  },
  {
    id: "5",
    title: "Oil prices drop on increased production forecasts",
    source: "Bloomberg",
    url: "#",
    publishedAt: "2024-07-21T10:30:00Z",
    sentiment: -0.5,
    sectors: ["Commodities", "Energy"],
    symbols: ["USO", "XLE"],
    aiValidation: {
      score: 88,
      summary:
        "AI confirms production forecast numbers match official sources. Some uncertainty remains about actual implementation.",
    },
  },
];

const NewsValidationFeed = ({
  news = defaultNews,
  isLoading = false,
  onNewsClick = () => {},
}: NewsValidationFeedProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.2)
      return <TrendingUp className="h-3.5 w-3.5 text-green-500" />;
    if (sentiment < -0.2)
      return <TrendingDown className="h-3.5 w-3.5 text-red-500" />;
    return null;
  };

  const getValidationBadge = (score: number) => {
    if (score >= 90) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          High Confidence
        </Badge>
      );
    } else if (score >= 75) {
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Medium Confidence
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          Low Confidence
        </Badge>
      );
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
            News Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded-md dark:bg-gray-700"></div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-3 border border-gray-100 rounded-lg space-y-2 animate-pulse dark:border-gray-700"
              >
                <div className="h-4 bg-gray-100 rounded w-3/4 dark:bg-gray-700"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 dark:bg-gray-700"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-100 rounded w-1/4 dark:bg-gray-700"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/4 dark:bg-gray-700"></div>
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
          <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
          News Validation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors dark:border-gray-700 dark:hover:border-blue-800 dark:hover:bg-blue-900/10"
                onClick={() => onNewsClick(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 flex-1 dark:text-gray-100">
                    {item.title}
                  </h3>
                  {getSentimentIcon(item.sentiment)}
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-2 dark:text-gray-400">
                  <span>{item.source}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(item.publishedAt)}
                  </span>
                </div>

                {item.aiValidation && (
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 mb-2 dark:bg-gray-900/50 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center text-xs font-medium text-gray-700 dark:text-gray-300">
                        <Brain className="h-3 w-3 mr-1 text-indigo-500" />
                        AI Validation
                      </div>
                      {getValidationBadge(item.aiValidation.score)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.aiValidation.summary}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1.5">
                    {item.sectors.map((sector) => (
                      <Badge
                        key={sector}
                        variant="secondary"
                        className="text-xs"
                      >
                        {sector}
                      </Badge>
                    ))}
                    {item.symbols?.map((symbol) => (
                      <Badge
                        key={symbol}
                        variant="outline"
                        className="text-xs font-mono"
                      >
                        {symbol}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NewsValidationFeed;
