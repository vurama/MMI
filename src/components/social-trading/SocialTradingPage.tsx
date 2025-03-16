import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  BarChart2,
  Eye,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Info,
  Clock,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: string | null;
  aiAnalysis?: string;
  url?: string;
  sectors: string[];
  impact: string | null;
  newsImpactScore?: number;
}

interface SentimentData {
  symbol: string;
  retailSentiment: number;
  institutionalSentiment: number;
  historicalTrend: number[];
  aiConfidence: number;
  sentimentSources?: {
    news: number;
    socialMedia: number;
    institutionalReports: number;
  };
  communityVote?: {
    agree: number;
    disagree: number;
  };
}

interface UnusualActivity {
  type: string;
  details: string;
  impact: "high" | "medium" | "low";
}

// Mock data
const marketSentimentData = {
  marketSentiment: {
    crypto: "Bullish 🟢",
    stocks: "Neutral 🟡",
    forex: "Bearish 🔴",
    commodities: "Bullish 🟢",
    options: "Mixed ⚖️",
  },
};

// Enhanced trending assets data with sentiment details
const trendingAssetsData = {
  trendingAssets: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      category: "crypto",
      mentions: 12000,
      sentiment: "+0.78 🔥",
      priceChange: "+3.5%",
      retailSentiment: 0.72,
      institutionalSentiment: -0.35,
      historicalTrend: [0.65, 0.7, 0.68, 0.72],
      aiConfidence: 85,
      sentimentSources: {
        news: 85,
        socialMedia: 15,
        institutionalReports: 50,
      },
      communityVote: {
        agree: 78,
        disagree: 22,
      },
      newsImpactScore: 78,
      unusualActivity: {
        type: "whale",
        details: "Bitcoin whale moved 1,000 BTC to exchange",
        impact: "high",
      },
    },
    {
      symbol: "NVDA",
      name: "Nvidia",
      category: "stocks",
      mentions: 8700,
      sentiment: "+0.62 🚀",
      priceChange: "+2.8%",
      retailSentiment: 0.68,
      institutionalSentiment: 0.75,
      historicalTrend: [0.55, 0.58, 0.6, 0.62],
      aiConfidence: 82,
      sentimentSources: {
        news: 65,
        socialMedia: 35,
        institutionalReports: 80,
      },
      communityVote: {
        agree: 85,
        disagree: 15,
      },
    },
    {
      symbol: "EUR/USD",
      name: "Euro/USD",
      category: "forex",
      mentions: 5400,
      sentiment: "-0.45 📉",
      priceChange: "-0.9%",
      retailSentiment: -0.4,
      institutionalSentiment: -0.52,
      historicalTrend: [-0.3, -0.35, -0.42, -0.45],
      aiConfidence: 75,
      sentimentSources: {
        news: 70,
        socialMedia: 30,
        institutionalReports: 65,
      },
    },
    {
      symbol: "XAU/USD",
      name: "Gold",
      category: "commodities",
      mentions: 3500,
      sentiment: "+0.32 🟡",
      priceChange: "+1.2%",
      retailSentiment: 0.35,
      institutionalSentiment: 0.28,
      historicalTrend: [0.25, 0.28, 0.3, 0.32],
      aiConfidence: 68,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      category: "crypto",
      mentions: 9800,
      sentiment: "+0.65 🚀",
      priceChange: "+4.2%",
      retailSentiment: 0.68,
      institutionalSentiment: 0.6,
      historicalTrend: [0.58, 0.6, 0.62, 0.65],
      aiConfidence: 80,
    },
    {
      symbol: "AAPL",
      name: "Apple",
      category: "stocks",
      mentions: 7500,
      sentiment: "+0.45 🟢",
      priceChange: "+1.5%",
      retailSentiment: 0.48,
      institutionalSentiment: 0.42,
      historicalTrend: [0.4, 0.42, 0.44, 0.45],
      aiConfidence: 72,
      sentimentSources: {
        news: 60,
        socialMedia: 40,
        institutionalReports: 75,
      },
    },
    {
      symbol: "GBP/USD",
      name: "Pound/USD",
      category: "forex",
      mentions: 3200,
      sentiment: "-0.25 🟡",
      priceChange: "-0.3%",
      retailSentiment: -0.22,
      institutionalSentiment: -0.3,
      historicalTrend: [-0.18, -0.2, -0.22, -0.25],
      aiConfidence: 65,
    },
    {
      symbol: "TSLA",
      name: "Tesla",
      category: "stocks",
      mentions: 6900,
      sentiment: "+0.58 🔥",
      priceChange: "+2.1%",
      retailSentiment: 0.65,
      institutionalSentiment: 0.48,
      historicalTrend: [0.45, 0.5, 0.55, 0.58],
      aiConfidence: 78,
      newsImpactScore: 82,
      unusualActivity: {
        type: "options",
        details: "200% increase in call option volume",
        impact: "high",
      },
    },
  ],
  mostDiscussed: ["BTC", "ETH", "NVDA", "AAPL", "TSLA"],
  mostTraded: ["AAPL", "NVDA", "BTC", "TSLA", "ETH"],
};

const institutionalFlowData = {
  institutionalFlow: [
    {
      symbol: "TSLA",
      darkPoolBuys: "120M",
      darkPoolSells: "80M",
      smartMoneyBias: "+40M 🏦",
      retailSentiment: "+0.68 🟢",
    },
    {
      symbol: "AAPL",
      darkPoolBuys: "90M",
      darkPoolSells: "100M",
      smartMoneyBias: "-10M 🔴",
      retailSentiment: "+0.52 🟢",
    },
    {
      symbol: "AMZN",
      darkPoolBuys: "75M",
      darkPoolSells: "65M",
      smartMoneyBias: "+10M 🟢",
      retailSentiment: "+0.45 🟢",
    },
    {
      symbol: "MSFT",
      darkPoolBuys: "110M",
      darkPoolSells: "95M",
      smartMoneyBias: "+15M 🟢",
      retailSentiment: "+0.38 🟢",
    },
    {
      symbol: "META",
      darkPoolBuys: "85M",
      darkPoolSells: "95M",
      smartMoneyBias: "-10M 🔴",
      retailSentiment: "+0.42 🟢",
    },
  ],
};

const alertsData = {
  alerts: [
    {
      type: "whale",
      symbol: "ETH",
      message:
        "🚨 200,000 ETH transferred to Binance – Possible sell-off incoming.",
      newsImpactScore: 85,
      timeframe: "1h ago",
      source: "Whale Alert API",
      credibility: "high",
    },
    {
      type: "news",
      symbol: "NVDA",
      message:
        "📰 Nvidia announces AI breakthrough, shares surge 5% pre-market!",
      newsImpactScore: 78,
      timeframe: "3h ago",
      source: "Bloomberg",
      credibility: "high",
    },
    {
      type: "sentiment",
      symbol: "TSLA",
      message: "🔴 Tesla sentiment dropped by 30% in 24hrs – Traders cautious!",
      newsImpactScore: 72,
      timeframe: "6h ago",
      source: "Social Media Analysis",
      credibility: "medium",
    },
    {
      type: "whale",
      symbol: "BTC",
      message: "🚨 Large wallet accumulating 500 BTC over past 24 hours.",
      newsImpactScore: 68,
      timeframe: "12h ago",
      source: "Whale Alert API",
      credibility: "high",
    },
    {
      type: "news",
      symbol: "AAPL",
      message:
        "📰 Apple supply chain issues resolved according to analyst report.",
      newsImpactScore: 65,
      timeframe: "1d ago",
      source: "Reuters",
      credibility: "high",
    },
    {
      type: "sentiment",
      symbol: "AMZN",
      message: "🟢 Amazon sentiment surged after positive earnings surprise.",
      newsImpactScore: 75,
      timeframe: "1d ago",
      source: "StockTwits, Twitter",
      credibility: "medium",
    },
    {
      type: "options",
      symbol: "TSLA",
      message:
        "📈 Tesla 200% surge in call option volume – Institutions betting on a rally",
      newsImpactScore: 82,
      timeframe: "4h ago",
      source: "Options Flow Data",
      credibility: "high",
    },
    {
      type: "insider",
      symbol: "MSFT",
      message:
        "👤 Microsoft CFO purchased 5,000 shares – Bullish insider activity",
      newsImpactScore: 70,
      timeframe: "2d ago",
      source: "SEC Filings",
      credibility: "high",
    },
  ],
};

const userWatchlistData = {
  userWatchlist: {
    userID: "12345",
    trackedAssets: ["BTC", "AAPL", "EUR/USD", "TSLA", "ETH"],
    aiInsights: {
      BTC: "Bullish trend confirmed – Strong accumulation detected.",
      AAPL: "Volatility increasing – Watch for earnings report.",
      "EUR/USD": "Bearish pressure – Market reacting to ECB policy speech.",
      TSLA: "Unusual options activity detected – Possible breakout.",
      ETH: "Sentiment improving – Watch for resistance at $3,500.",
    },
    savedTrends: {
      BTC: [0.5, 0.65, 0.78, 0.72],
      AAPL: [0.4, 0.45, 0.5, 0.52],
      TSLA: [0.45, 0.5, 0.55, 0.58],
      ETH: [0.58, 0.6, 0.62, 0.65],
    },
    customAlerts: [
      {
        symbol: "BTC",
        condition: "sentiment_drop",
        threshold: 0.1,
        timeframe: "1h",
      },
      {
        symbol: "AAPL",
        condition: "price_above",
        threshold: 190,
        timeframe: "any",
      },
    ],
  },
};

const SocialTradingPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [filteredAssets, setFilteredAssets] = useState(
    trendingAssetsData.trendingAssets,
  );

  // Simulate data refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCounter((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter assets by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredAssets(trendingAssetsData.trendingAssets);
    } else {
      setFilteredAssets(
        trendingAssetsData.trendingAssets.filter(
          (asset) => asset.category === activeCategory,
        ),
      );
    }
  }, [activeCategory, refreshCounter]);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "crypto":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "stocks":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "forex":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "commodities":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "options":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    if (
      sentiment.includes("🔥") ||
      sentiment.includes("🚀") ||
      sentiment.includes("🟢")
    ) {
      return "text-green-600 dark:text-green-400";
    } else if (sentiment.includes("📉") || sentiment.includes("🔴")) {
      return "text-red-600 dark:text-red-400";
    } else {
      return "text-yellow-600 dark:text-yellow-400";
    }
  };

  const getAlertTypeColor = (type: string | null | undefined) => {
    if (!type) {
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }

    switch (type) {
      case "whale":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "news":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "sentiment":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "options":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "insider":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Social Trading
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Auto-refreshing data
          </span>
          <RefreshCw className="h-4 w-4 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Market Sentiment Overview
            </CardTitle>
            <CardDescription>
              AI-analyzed market mood based on social discussions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(marketSentimentData.marketSentiment).map(
                ([market, sentiment]) => (
                  <Card key={market} className="overflow-hidden">
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm capitalize">
                        {market}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div
                        className={`text-lg font-semibold ${sentiment.includes("🟢") ? "text-green-600 dark:text-green-400" : sentiment.includes("🔴") ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}
                      >
                        {sentiment}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Retail</span>
                        <span
                          className={
                            sentiment.includes("🟢")
                              ? "text-green-600 dark:text-green-400"
                              : sentiment.includes("🔴")
                                ? "text-red-600 dark:text-red-400"
                                : "text-yellow-600 dark:text-yellow-400"
                          }
                        >
                          {sentiment.includes("🟢")
                            ? "+0.65"
                            : sentiment.includes("🔴")
                              ? "-0.45"
                              : "+0.32"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Institutional</span>
                        <span
                          className={
                            sentiment.includes("🟢")
                              ? "text-green-600 dark:text-green-400"
                              : sentiment.includes("🔴")
                                ? "text-red-600 dark:text-red-400"
                                : "text-yellow-600 dark:text-yellow-400"
                          }
                        >
                          {sentiment.includes("🟢")
                            ? "+0.58"
                            : sentiment.includes("🔴")
                              ? "-0.52"
                              : "+0.28"}
                        </span>
                      </div>
                      <div className="mt-1 text-xs flex items-center">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          AI Confidence:
                        </span>
                        <span className="ml-1">
                          {sentiment.includes("🟢")
                            ? "82%"
                            : sentiment.includes("🔴")
                              ? "75%"
                              : "68%"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium mb-2">
                  Most Discussed Assets
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trendingAssetsData.mostDiscussed.map((symbol) => (
                    <Badge
                      key={symbol}
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50"
                    >
                      {symbol}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium mb-2">Most Traded Assets</h4>
                <div className="flex flex-wrap gap-2">
                  {trendingAssetsData.mostTraded.map((symbol) => (
                    <Badge
                      key={symbol}
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50"
                    >
                      {symbol}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              Unusual Activity Alerts
            </CardTitle>
            <CardDescription>Real-time market alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-3">
                {alertsData.alerts.slice(0, 4).map((alert, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-start justify-between">
                      <Badge className={getAlertTypeColor(alert?.type)}>
                        {alert?.symbol || "Unknown"}
                      </Badge>
                      <div className="flex items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {alert?.timeframe || ""}
                        </span>
                        <span className="mx-1">•</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {alert?.source || ""}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm">
                      {alert?.message || "No message available"}
                    </p>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <div className="flex items-center">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          Impact Score:
                        </span>
                        <span className="ml-1 font-bold text-amber-600 dark:text-amber-400">
                          {alert?.newsImpactScore || 0}%
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          Credibility:
                        </span>
                        <span className="ml-1 font-medium">
                          {alert?.credibility || "unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Trending Assets
              </CardTitle>
              <div className="flex gap-2">
                <Badge
                  onClick={() => setActiveCategory("all")}
                  className={`cursor-pointer ${activeCategory === "all" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                >
                  All
                </Badge>
                <Badge
                  onClick={() => setActiveCategory("crypto")}
                  className={`cursor-pointer ${activeCategory === "crypto" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                >
                  Crypto
                </Badge>
                <Badge
                  onClick={() => setActiveCategory("stocks")}
                  className={`cursor-pointer ${activeCategory === "stocks" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                >
                  Stocks
                </Badge>
                <Badge
                  onClick={() => setActiveCategory("forex")}
                  className={`cursor-pointer ${activeCategory === "forex" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                >
                  Forex
                </Badge>
                <Badge
                  onClick={() => setActiveCategory("commodities")}
                  className={`cursor-pointer ${activeCategory === "commodities" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                >
                  Commodities
                </Badge>
              </div>
            </div>
            <CardDescription>
              Assets ranked by social mentions and sentiment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
                <Card
                  key={asset.symbol}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">
                          {asset.symbol}
                        </CardTitle>
                        <CardDescription>{asset.name}</CardDescription>
                      </div>
                      <Badge className={getCategoryBadgeColor(asset.category)}>
                        {asset.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Mentions
                        </p>
                        <p className="font-medium">
                          {asset.mentions.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Sentiment
                        </p>
                        <p
                          className={`font-medium ${getSentimentColor(asset.sentiment)}`}
                        >
                          {asset.sentiment}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Change
                        </p>
                        <p
                          className={`font-medium ${asset.priceChange.includes("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                        >
                          {asset.priceChange}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Retail Sentiment
                        </p>
                        <p
                          className={`font-medium ${asset.retailSentiment > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                        >
                          {asset.retailSentiment > 0 ? "+" : ""}
                          {asset.retailSentiment.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Institutional
                        </p>
                        <p
                          className={`font-medium ${asset.institutionalSentiment > 0 ? "text-green-600 dark:text-green-400" : asset.institutionalSentiment < 0 ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {asset.institutionalSentiment !== undefined ? (
                            <>
                              {asset.institutionalSentiment > 0 ? "+" : ""}
                              {asset.institutionalSentiment.toFixed(2)}
                            </>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Sentiment Trend (7d)
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        {asset.historicalTrend.map((value, i) => (
                          <div
                            key={i}
                            className={`h-4 w-full rounded-sm ${value > 0.6 ? "bg-green-500" : value > 0.4 ? "bg-green-300" : value > 0 ? "bg-green-200" : value > -0.4 ? "bg-red-200" : "bg-red-400"}`}
                            style={{
                              height: `${Math.max(Math.abs(value) * 24, 4)}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          AI Confidence:
                        </span>
                        <span className="ml-1">{asset.aiConfidence}%</span>
                      </div>
                      {asset.unusualActivity && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          {asset.unusualActivity.type}
                        </Badge>
                      )}
                    </div>

                    {asset.sentimentSources && (
                      <div className="mt-2 text-xs">
                        <p className="text-gray-500 dark:text-gray-400 mb-1">
                          Data Sources
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full"
                              style={{
                                width: `${asset.sentimentSources.news}%`,
                              }}
                            />
                          </div>
                          <span className="text-blue-600 dark:text-blue-400">
                            {asset.sentimentSources.news}% News
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-green-500 h-1.5 rounded-full"
                              style={{
                                width: `${asset.sentimentSources.socialMedia}%`,
                              }}
                            />
                          </div>
                          <span className="text-green-600 dark:text-green-400">
                            {asset.sentimentSources.socialMedia}% Social
                          </span>
                        </div>
                      </div>
                    )}

                    {asset.communityVote && (
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Community agrees:
                        </span>
                        <div className="flex items-center">
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {asset.communityVote.agree}%
                          </span>
                          <span className="mx-1 text-gray-400">|</span>
                          <span className="text-red-600 dark:text-red-400 font-medium">
                            {asset.communityVote.disagree}%
                          </span>
                        </div>
                      </div>
                    )}

                    {asset.newsImpactScore && (
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          News Impact:
                        </span>
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          {asset.newsImpactScore}%
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Institutional vs. Retail Activity
            </CardTitle>
            <CardDescription>
              Smart money flows compared to retail sentiment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {institutionalFlowData.institutionalFlow.map((item) => (
                <div
                  key={item.symbol}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{item.symbol}</h3>
                    <Badge
                      className={
                        item.smartMoneyBias.includes("+")
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }
                    >
                      {item.smartMoneyBias}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Dark Pool Buys
                      </p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {item.darkPoolBuys}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Dark Pool Sells
                      </p>
                      <p className="font-medium text-red-600 dark:text-red-400">
                        {item.darkPoolSells}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Retail Sentiment
                    </p>
                    <p
                      className={`font-medium ${getSentimentColor(item.retailSentiment)}`}
                    >
                      {item.retailSentiment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Your Watchlist & AI Insights
              </CardTitle>
              <Button variant="outline" size="sm" className="h-8 rounded-full">
                <span className="text-xs">Customize</span>
              </Button>
            </div>
            <CardDescription>
              Personalized insights for your tracked assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userWatchlistData.userWatchlist.trackedAssets.map((symbol) => (
                <div
                  key={symbol}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{symbol}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        <Eye className="h-3 w-3 mr-1" /> Watching
                      </Badge>
                      {userWatchlistData.userWatchlist.savedTrends &&
                        userWatchlistData.userWatchlist.savedTrends[
                          symbol as keyof typeof userWatchlistData.userWatchlist.savedTrends
                        ] && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Tracking
                          </Badge>
                        )}
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500 dark:text-gray-400">
                      AI Insight
                    </p>
                    <p className="font-medium">
                      {
                        userWatchlistData.userWatchlist.aiInsights[
                          symbol as keyof typeof userWatchlistData.userWatchlist.aiInsights
                        ]
                      }
                    </p>
                  </div>

                  {userWatchlistData.userWatchlist.savedTrends &&
                    userWatchlistData.userWatchlist.savedTrends[
                      symbol as keyof typeof userWatchlistData.userWatchlist.savedTrends
                    ] && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Sentiment Trend (30d)
                        </p>
                        <div className="flex items-end space-x-1 h-6">
                          {userWatchlistData.userWatchlist.savedTrends[
                            symbol as keyof typeof userWatchlistData.userWatchlist.savedTrends
                          ].map((value, i) => (
                            <div
                              key={i}
                              className={`w-full rounded-sm ${value > 0.6 ? "bg-green-500" : value > 0.4 ? "bg-green-300" : "bg-green-200"}`}
                              style={{ height: `${Math.max(value * 24, 4)}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Agree
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        Disagree
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      Set Alert
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              All Market Alerts
            </CardTitle>
            <Tabs defaultValue="all" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high">High Impact</TabsTrigger>
                <TabsTrigger value="whale">Whale Moves</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardDescription className="flex items-center">
            Unusual activity and important market events
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Data sourced from multiple APIs including Whale Alert,
                    Options Flow, and Social Media Analysis
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertsData.alerts.map((alert, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getAlertTypeColor(alert?.type)}>
                      {alert?.symbol || "Unknown"}
                    </Badge>
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">
                        {alert?.timeframe || ""}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800/50"
                  >
                    {alert?.newsImpactScore || 0}% Impact
                  </Badge>
                </div>
                <p className="text-sm">
                  {alert?.message || "No message available"}
                </p>
                <div className="flex items-center justify-between text-xs mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Source:
                    </span>
                    <span className="font-medium">
                      {alert?.source || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full"
                    >
                      <ThumbsUp className="h-3 w-3 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full"
                    >
                      <ThumbsDown className="h-3 w-3 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="text-sm">
              Load More Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialTradingPage;
