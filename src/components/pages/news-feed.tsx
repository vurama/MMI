import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Newspaper,
  Search,
  ExternalLink,
  Clock,
  Filter,
  ThumbsUp,
  ThumbsDown,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Brain,
  Bookmark,
  Share2,
  MessageSquare,
  Briefcase,
  Building,
  Coins,
  DollarSign,
  Webhook,
  Zap,
} from "lucide-react";
import QuickAccessToolbar from "../dashboard/QuickAccessToolbar";
import MarketNewsWidget from "../dashboard/MarketNewsWidget";
import NewsValidationFeed from "../dashboard/NewsValidationFeed";
import NewsFeedDisplay from "../dashboard/NewsFeedDisplay";
import IFTTTWebhookSetup from "../dashboard/IFTTTWebhookSetup";
import { motion } from "framer-motion";

const NewsFeedPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTab, setActiveTab] = useState("all");
  const [activeMarketType, setActiveMarketType] = useState("stocks");
  const [activeSection, setActiveSection] = useState<"news" | "webhook">(
    "news",
  );

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

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === "positive")
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (sentiment === "negative")
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <BarChart2 className="h-4 w-4 text-gray-500" />;
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "positive") return "text-green-600";
    if (sentiment === "negative") return "text-red-600";
    return "text-gray-600";
  };

  const getImpactBadge = (impact: string) => {
    if (impact === "high")
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">
          High Impact
        </Badge>
      );
    if (impact === "medium")
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300">
          Medium Impact
        </Badge>
      );
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
        Low Impact
      </Badge>
    );
  };

  return (
    <DashboardLayout activeItem="News Flash">
      <main className="flex-1 overflow-auto">
        <QuickAccessToolbar
          onOpenSearch={() => window.open("/dashboard", "_self")}
          onOpenChat={() => window.open("/advisor", "_self")}
          onOpenAlerts={() => window.open("/alerts", "_self")}
        />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Newspaper className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              News Feed
            </h1>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <Button
                  variant={activeSection === "news" ? "default" : "outline"}
                  className={activeSection === "news" ? "bg-blue-600" : ""}
                  onClick={() => setActiveSection("news")}
                >
                  <Newspaper className="h-4 w-4 mr-2" />
                  News Feed
                </Button>
                <Button
                  variant={activeSection === "webhook" ? "default" : "outline"}
                  className={activeSection === "webhook" ? "bg-blue-600" : ""}
                  onClick={() => setActiveSection("webhook")}
                >
                  <Webhook className="h-4 w-4 mr-2" />
                  IFTTT Setup
                </Button>
              </div>
              {activeSection === "news" && (
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search news..."
                    className="pl-9 h-9 w-[200px] rounded-full bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {activeSection === "news" ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <NewsFeedDisplay />
                  <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3 text-sm">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-blue-800 dark:text-blue-300 font-medium">
                        AI-Powered News Categorization
                      </span>
                    </div>
                    <p className="mt-1 text-blue-600 dark:text-blue-400 text-xs">
                      News items are automatically categorized based on content
                      analysis. The system monitors multiple sources and updates
                      in real-time.
                    </p>
                  </div>
                </div>

                <div>
                  <NewsValidationFeed />
                </div>
              </div>

              <div className="mb-6">
                <Card className="border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium dark:text-white">
                        Featured News
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <Filter className="h-4 w-4 mr-1" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featuredNews.map((news) => (
                        <motion.div
                          key={news.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors dark:border-gray-700 dark:hover:border-blue-800 dark:hover:bg-blue-900/10"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                              {news.title}
                            </h3>
                            <div className="flex items-center">
                              {getSentimentIcon(news.sentiment)}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-2 dark:text-gray-400">
                            <span>{news.source}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {news.time}
                            </span>
                          </div>

                          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-3 dark:bg-indigo-900/20 dark:border-indigo-800/30">
                            <div className="flex items-start">
                              <Brain className="h-4 w-4 text-indigo-600 mt-0.5 mr-2 dark:text-indigo-400" />
                              <div>
                                <p className="text-xs font-medium text-indigo-800 mb-1 dark:text-indigo-300">
                                  AI Analysis
                                </p>
                                <p className="text-xs text-indigo-700 dark:text-indigo-400">
                                  {news.aiAnalysis}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-1.5">
                              {news.sectors.map((sector) => (
                                <Badge
                                  key={sector}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {sector}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center">
                              {getImpactBadge(news.impact)}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 ml-2 rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <IFTTTWebhookSetup />
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default NewsFeedPage;
