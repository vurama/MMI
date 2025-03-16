import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, BarChart2, Users, Clock } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import MarketSentimentScoreWithData from "./MarketSentimentScoreWithData";

interface MarketCardProps {
  title: string;
  progress: number;
  analysts: Array<{ name: string; avatar: string }>;
  lastUpdated: string;
}

interface DashboardGridProps {
  markets?: MarketCardProps[];
  isLoading?: boolean;
}

const defaultMarkets: MarketCardProps[] = [
  {
    title: "Technology Sector",
    progress: 75,
    analysts: [
      {
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        name: "Bob",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        name: "Charlie",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      },
    ],
    lastUpdated: "2024-07-22",
  },
  {
    title: "Cryptocurrency Market",
    progress: 45,
    analysts: [
      {
        name: "David",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      {
        name: "Eve",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
      },
    ],
    lastUpdated: "2024-07-22",
  },
  {
    title: "Real Estate Trends",
    progress: 90,
    analysts: [
      {
        name: "Frank",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
      },
      {
        name: "Grace",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      },
      {
        name: "Henry",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
      },
    ],
    lastUpdated: "2024-07-21",
  },
];

const MarketCard = ({
  title,
  progress,
  analysts,
  lastUpdated,
}: MarketCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden dark:bg-gray-800/90 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center dark:bg-gray-700">
          <BarChart2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-gray-500 dark:text-gray-400">
                Performance
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                {progress}%
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-gray-100 rounded-full dark:bg-gray-700"
              style={
                {
                  backgroundColor: "rgb(243, 244, 246)",
                } as React.CSSProperties
              }
            />
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Updated {lastUpdated}</span>
            </div>
            <div className="flex -space-x-2">
              {analysts.map((analyst, i) => (
                <Avatar
                  key={i}
                  className="h-7 w-7 border-2 border-white shadow-sm dark:border-gray-800"
                >
                  <AvatarImage src={analyst.avatar} alt={analyst.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 font-medium dark:bg-blue-900 dark:text-blue-200">
                    {analyst.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardGrid = ({
  markets = defaultMarkets,
  isLoading = false,
}: DashboardGridProps) => {
  const [loading, setLoading] = useState(isLoading);

  // Simulate loading for demo purposes
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (loading) {
    return (
      <div className="p-6 h-full">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm h-[220px] flex items-center justify-center dark:bg-gray-800/90 dark:border-gray-700"
            >
              <div className="flex flex-col items-center justify-center p-6">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin dark:border-gray-700 dark:border-t-blue-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500/20 animate-pulse dark:bg-blue-400/20" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Loading market data...
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden dark:bg-gray-800/90 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">
              Total Markets
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center dark:bg-blue-900/30">
              <BarChart2 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {markets.length}
            </div>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Active markets being tracked
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden dark:bg-gray-800/90 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">
              Market Analysts
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center dark:bg-purple-900/30">
              <Users className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              12
            </div>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Active contributors
            </p>
          </CardContent>
        </Card>

        {/* Market Sentiment Score Card */}
        <MarketSentimentScoreWithData />

        {/* Market Cards */}
        {markets.map((market, index) => (
          <MarketCard key={index} {...market} />
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;
