import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, LineChart, BarChart2 } from "lucide-react";

interface MarketTrend {
  name: string;
  change: number;
  data: number[];
  timeframe: string;
}

interface MarketTrendsWidgetProps {
  trends?: MarketTrend[];
  isLoading?: boolean;
}

const defaultTrends: MarketTrend[] = [
  {
    name: "S&P 500",
    change: 1.2,
    data: [3450, 3460, 3455, 3470, 3480, 3495, 3510, 3520, 3515, 3525],
    timeframe: "1W",
  },
  {
    name: "NASDAQ",
    change: 1.8,
    data: [
      13450, 13500, 13480, 13520, 13550, 13580, 13600, 13650, 13700, 13720,
    ],
    timeframe: "1W",
  },
  {
    name: "Bitcoin",
    change: -2.3,
    data: [
      48000, 47800, 47600, 47200, 46800, 46500, 46200, 46000, 46300, 46900,
    ],
    timeframe: "1W",
  },
  {
    name: "Real Estate Index",
    change: 0.5,
    data: [1200, 1205, 1210, 1208, 1215, 1220, 1218, 1225, 1230, 1235],
    timeframe: "1W",
  },
];

const MarketTrendsWidget = ({
  trends = defaultTrends,
  isLoading = false,
}: MarketTrendsWidgetProps) => {
  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <LineChart className="h-5 w-5 mr-2 text-blue-500" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6 dark:bg-gray-700"></div>
                </div>
                <div className="h-12 bg-gray-100 rounded-lg dark:bg-gray-700"></div>
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
          <LineChart className="h-5 w-5 mr-2 text-blue-500" />
          Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {trend.name}
                  </span>
                  <Badge className="ml-2" variant="outline">
                    {trend.timeframe}
                  </Badge>
                </div>
                <div
                  className={`flex items-center ${trend.change >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
                >
                  {trend.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="font-medium">
                    {trend.change >= 0 ? "+" : ""}
                    {trend.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-12 bg-gray-50 rounded-lg relative overflow-hidden dark:bg-gray-900">
                <div className="absolute inset-0 flex items-end">
                  {trend.data.map((value, i) => {
                    const height = `${(value / Math.max(...trend.data)) * 100}%`;
                    return (
                      <div
                        key={i}
                        className={`w-full ${trend.change >= 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                        style={{ height }}
                      ></div>
                    );
                  })}
                </div>
                <div className="absolute inset-0 flex items-end">
                  <svg
                    className="w-full h-full"
                    viewBox={`0 0 ${trend.data.length} 100`}
                    preserveAspectRatio="none"
                  >
                    <path
                      d={`M0,${100 - (trend.data[0] / Math.max(...trend.data)) * 100} ${trend.data
                        .map(
                          (d, i) =>
                            `L${i},${100 - (d / Math.max(...trend.data)) * 100}`,
                        )
                        .join(" ")}`}
                      fill="none"
                      stroke={trend.change >= 0 ? "#22c55e" : "#ef4444"}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrendsWidget;
