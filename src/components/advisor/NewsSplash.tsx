import React, { useState, useEffect } from "react";
import { NewsService, NewsItem } from "@/services/NewsService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Clock, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

interface NewsSplashProps {
  category?: string;
}

const NewsSplash: React.FC<NewsSplashProps> = ({ category }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let newsData;
        if (category) {
          newsData = await NewsService.getNewsByCategory(category);
        } else {
          newsData = await NewsService.getLatestNews(6);
        }
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "stocks":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "crypto":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "forex":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "realestate":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "stocks":
        return "Stocks";
      case "crypto":
        return "Cryptocurrency";
      case "forex":
        return "Forex";
      case "realestate":
        return "Real Estate";
      default:
        return "General";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <Newspaper className="h-5 w-5 mr-2 text-blue-600" />
            Market News
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-blue-600" />
          {category
            ? `${getCategoryName(category)} News`
            : "Latest Market News"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200">
              {item.imageUrl && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <Badge className={getCategoryColor(item.category)}>
                    {getCategoryName(item.category)}
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                  {item.description.length > 120
                    ? `${item.description.substring(0, 120)}...`
                    : item.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {NewsService.formatRelativeTime(item.publishedAt)}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <span className="mr-1">Read more</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsSplash;
