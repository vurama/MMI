import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Newspaper,
  ExternalLink,
  Clock,
  Filter,
  RefreshCw,
  Radio,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart2,
} from "lucide-react";
import { useNewsFeed, NewsItem } from "@/hooks/useNewsFeed";
import { motion } from "framer-motion";

const NewsFeedDisplay: React.FC = () => {
  const { newsItems, loading, error } = useNewsFeed();
  const [activeTab, setActiveTab] = useState("all");
  const [pulseEffect, setPulseEffect] = useState(true);

  // Pulse effect for the live indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Get unique categories from news items
  const categories = [
    "All",
    ...new Set(newsItems.map((item) => item.category)),
  ];

  // Filter news items by selected category
  const filteredItems =
    activeTab === "all"
      ? newsItems
      : newsItems.filter(
          (item) => item.category.toLowerCase() === activeTab.toLowerCase(),
        );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "technology":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "finance":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "stocks":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "crypto":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "real estate":
      case "realestate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "entertainment":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      case "sports":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  // Get sentiment icon based on content
  const getSentimentIcon = (summary: string) => {
    const lowerSummary = summary.toLowerCase();

    // Positive keywords
    if (
      /\b(increase|rise|gain|grow|up|positive|bull|rally|surge|soar)\b/.test(
        lowerSummary,
      )
    ) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }

    // Negative keywords
    if (
      /\b(decrease|fall|drop|decline|down|negative|bear|crash|plunge|sink)\b/.test(
        lowerSummary,
      )
    ) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }

    // Neutral by default
    return <BarChart2 className="h-4 w-4 text-gray-500" />;
  };

  // Get market impact based on content
  const getMarketImpact = (summary: string) => {
    const lowerSummary = summary.toLowerCase();

    // High impact keywords
    if (
      /\b(significant|major|critical|substantial|dramatic|massive|crucial|important)\b/.test(
        lowerSummary,
      )
    ) {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          High Impact
        </Badge>
      );
    }

    // Medium impact keywords
    if (
      /\b(moderate|notable|considerable|meaningful|noticeable)\b/.test(
        lowerSummary,
      )
    ) {
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          Medium Impact
        </Badge>
      );
    }

    // Low impact by default
    return (
      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
        Low Impact
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CardTitle className="flex items-center">
              <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
              News Feed
            </CardTitle>
            <div className="flex items-center ml-4">
              <motion.div
                animate={{
                  scale: pulseEffect ? 1 : 0.8,
                  opacity: pulseEffect ? 1 : 0.7,
                }}
                transition={{ duration: 1 }}
                className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Live Monitoring
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800/30">
            <div className="flex items-center">
              <Radio className="h-4 w-4 text-amber-500 mr-2 animate-pulse" />
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                Monitoring market news. Updates will appear automatically.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4 overflow-x-auto flex w-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.toLowerCase()}
                    value={category.toLowerCase()}
                    className="flex-shrink-0"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <ScrollArea className="h-[400px]">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                    </div>
                  ) : filteredItems.length > 0 ? (
                    <div className="space-y-4">
                      {filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                              {item.summary}
                            </h3>
                            <div className="flex items-center ml-2 flex-shrink-0">
                              {getSentimentIcon(item.summary)}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-2 dark:text-gray-400">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(item.timestamp)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <Badge className={getCategoryColor(item.category)}>
                              {item.category}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              {getMarketImpact(item.summary)}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2"
                                onClick={() => window.open(item.link, "_blank")}
                              >
                                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                View Source
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-6 max-w-md text-center">
                        <Radio className="h-6 w-6 text-blue-500 mb-3 mx-auto animate-pulse" />
                        <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">
                          Market Monitoring Active
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 text-sm">
                          We're actively monitoring market news across all
                          sectors. Updates will appear here automatically as
                          they become available.
                        </p>
                        <div className="flex items-center justify-center mt-4">
                          <Zap className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-xs text-amber-600 dark:text-amber-400">
                            Powered by AI categorization
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsFeedDisplay;
