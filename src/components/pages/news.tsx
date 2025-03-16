import React, { useState } from "react";
import TopNavigation from "./TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Newspaper,
  Search,
  RefreshCw,
  ExternalLink,
  Clock,
  Filter,
  ThumbsUp,
  ThumbsDown,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import MarketNewsWidget from "../dashboard/MarketNewsWidget";
import { motion } from "framer-motion";

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
}

const NewsPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTab, setActiveTab] = useState("all");

  const handleRefresh = () => {
    setLoading(true);
    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Sample featured news data
  const featuredNews = [
    {
      id: "1",
      title: "Fed signals potential rate cuts as inflation cools",
      source: "Financial Times",
      time: "2 hours ago",
      sentiment: "positive",
      aiAnalysis:
        "This news is likely to positively impact both stock and bond markets. Expect increased buying activity in rate-sensitive sectors.",
      url: "#",
      sectors: ["Stocks", "Bonds"],
      impact: "high",
    },
    {
      id: "2",
      title: "Tech giants report stronger than expected earnings",
      source: "CNBC",
      time: "4 hours ago",
      sentiment: "positive",
      aiAnalysis:
        "Strong earnings from major tech companies indicate continued sector growth. This may lead to increased investor confidence in technology stocks.",
      url: "#",
      sectors: ["Technology", "Stocks"],
      impact: "high",
    },
    {
      id: "3",
      title: "Housing market shows signs of cooling in major metros",
      source: "Reuters",
      time: "6 hours ago",
      sentiment: "negative",
      aiAnalysis:
        "Declining home sales in major metropolitan areas suggest a potential slowdown in the real estate market. This could affect related sectors like construction and home improvement.",
      url: "#",
      sectors: ["Real Estate"],
      impact: "medium",
    },
  ];

  // Sample recent news data
  const recentNews = [
    {
      id: "4",
      title: "Oil prices drop on increased production forecasts",
      source: "Bloomberg",
      time: "8 hours ago",
      sentiment: "negative",
      sectors: ["Energy", "Commodities"],
      impact: "medium",
    },
    {
      id: "5",
      title: "Retail sales exceed expectations in Q2",
      source: "Wall Street Journal",
      time: "10 hours ago",
      sentiment: "positive",
      sectors: ["Retail", "Consumer"],
      impact: "medium",
    },
    {
      id: "6",
      title: "New regulations proposed for cryptocurrency exchanges",
      source: "CoinDesk",
      time: "12 hours ago",
      sentiment: "neutral",
      sectors: ["Crypto", "Regulation"],
      impact: "high",
    },
    {
      id: "7",
      title: "Major merger announced in healthcare sector",
      source: "Healthcare Daily",
      time: "14 hours ago",
      sentiment: "positive",
      sectors: ["Healthcare"],
      impact: "medium",
    },
    {
      id: "8",
      title: "Supply chain issues continue to affect manufacturing",
      source: "Industry Week",
      time: "16 hours ago",
      sentiment: "negative",
      sectors: ["Manufacturing", "Logistics"],
      impact: "medium",
    },
    {
      id: "9",
      title: "New AI developments boost tech sector outlook",
      source: "Tech Insider",
      time: "18 hours ago",
      sentiment: "positive",
      sectors: ["Technology", "AI"],
      impact: "high",
    },
    {
      id: "10",
      title: "Global economic growth forecasts revised upward",
      source: "Economic Times",
      time: "20 hours ago",
      sentiment: "positive",
      sectors: ["Global Markets", "Economy"],
      impact: "high",
    },
  ];

  const filteredNews =
    activeTab === "all"
      ? recentNews
      : recentNews.filter((news) =>
          news.sectors.some(
            (sector) => sector.toLowerCase() === activeTab.toLowerCase(),
          ),
        );

  const getSentimentIcon = (sentiment: string | null) => {
    if (!sentiment) return <BarChart2 className="h-4 w-4 text-gray-500" />;
    if (sentiment === "positive")
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (sentiment === "negative")
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <BarChart2 className="h-4 w-4 text-gray-500" />;
  };

  const getSentimentColor = (sentiment: string | null) => {
    if (!sentiment) return "text-gray-600";
    if (sentiment === "positive") return "text-green-600";
    if (sentiment === "negative") return "text-red-600";
    return "text-gray-600";
  };

  const getImpactBadge = (impact: string | null | undefined) => {
    if (!impact) return null;
    if (impact === "high")
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          High Impact
        </Badge>
      );
    if (impact === "medium")
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Medium Impact
        </Badge>
      );
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
        Low Impact
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="News Flash" />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-6 pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Newspaper className="h-7 w-7 text-green-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Market News
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search news..."
                    className="pl-9 h-9 w-[200px] rounded-full bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px] h-9 rounded-full bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="impact">Impact</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleRefresh}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  {loading ? "Loading..." : "Refresh"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card className="border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium dark:text-white">
                      Featured News
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {featuredNews.map((news, index) => (
                        <motion.div
                          key={news.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0 dark:border-gray-700"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold dark:text-white">
                              {news.title}
                            </h3>
                            {getImpactBadge(news.impact)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-3 dark:text-gray-400">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {news.source}
                            </span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{news.time}</span>
                            <span className="mx-2">•</span>
                            <span
                              className={`flex items-center ${getSentimentColor(news.sentiment)}`}
                            >
                              {getSentimentIcon(news.sentiment)}
                              <span className="ml-1 capitalize">
                                {news.sentiment}
                              </span>
                            </span>
                          </div>
                          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-3 flex items-start dark:bg-gray-700/30 dark:border-gray-700">
                            <Brain className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-medium text-gray-700 mb-1 dark:text-gray-300">
                                AI Analysis
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {news.aiAnalysis}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-1.5">
                              {news.sectors.map((sector) => (
                                <Badge
                                  key={sector}
                                  variant="outline"
                                  className="text-xs dark:border-gray-600"
                                >
                                  {sector}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-8 px-2 dark:hover:bg-green-900/30"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Read More
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <MarketNewsWidget isLoading={loading} />
              </div>
            </div>

            <div className="mb-6">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="grid grid-cols-5 w-full max-w-md">
                    <TabsTrigger value="all">All News</TabsTrigger>
                    <TabsTrigger value="stocks">Stocks</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    <TabsTrigger value="real estate">Real Estate</TabsTrigger>
                    <TabsTrigger value="economy">Economy</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Filter className="h-4 w-4 mr-1" />
                    More Filters
                  </Button>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  <Card className="dark:border-gray-700 dark:bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium dark:text-white">
                        Recent News
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredNews.map((news, index) => (
                          <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700"
                          >
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="text-sm font-medium text-gray-700 mr-2 dark:text-gray-300">
                                  {news.source}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center dark:text-gray-400">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {news.time}
                                </span>
                              </div>
                              <h3 className="font-medium mb-2 dark:text-white">
                                {news.title}
                              </h3>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1.5">
                                  {news.sectors.map((sector) => (
                                    <Badge
                                      key={sector}
                                      variant="outline"
                                      className="text-xs dark:border-gray-600"
                                    >
                                      {sector}
                                    </Badge>
                                  ))}
                                </div>
                                <div
                                  className={`flex items-center text-xs font-medium ${getSentimentColor(news.sentiment)}`}
                                >
                                  {getSentimentIcon(news.sentiment)}
                                  <span className="ml-1 capitalize">
                                    {news.sentiment}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsPage;
