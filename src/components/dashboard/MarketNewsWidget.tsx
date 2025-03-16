import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  ExternalLink,
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
}

interface MarketNewsWidgetProps {
  news?: NewsItem[];
  isLoading?: boolean;
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
  },
];

const MarketNewsWidget = ({
  news = defaultNews,
  isLoading = false,
}: MarketNewsWidgetProps) => {
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredNews =
    activeTab === "all"
      ? news
      : news.filter((item) => item.sectors.includes(activeTab));

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
            <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
            Market News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-3 border border-gray-100 rounded-lg space-y-2 animate-pulse"
              >
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
          Market News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Stocks">Stocks</TabsTrigger>
            <TabsTrigger value="Real Estate">Real Estate</TabsTrigger>
            <TabsTrigger value="Crypto">Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-3">
                {filteredNews.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 flex-1">
                        {item.title}
                      </h3>
                      {getSentimentIcon(item.sentiment)}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>{item.source}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
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
                  </a>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketNewsWidget;
