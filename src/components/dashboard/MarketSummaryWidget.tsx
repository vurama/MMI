import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react";

interface MarketIndex {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface MarketSummaryWidgetProps {
  indices?: MarketIndex[];
  isLoading?: boolean;
}

const defaultIndices: MarketIndex[] = [
  { name: "S&P 500", value: "4,782.82", change: "+1.2%", trend: "up" },
  { name: "Nasdaq", value: "16,742.39", change: "+1.6%", trend: "up" },
  { name: "Dow Jones", value: "38,503.75", change: "+0.7%", trend: "up" },
  { name: "Russell 2000", value: "2,093.58", change: "-0.3%", trend: "down" },
  { name: "VIX", value: "13.21", change: "-5.2%", trend: "down" },
];

const MarketSummaryWidget = ({
  indices = defaultIndices,
  isLoading = false,
}: MarketSummaryWidgetProps) => {
  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
            Market Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/4 dark:bg-gray-700"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-16 dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 dark:bg-gray-700"></div>
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
          <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
          Market Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indices.map((index, i) => (
            <div
              key={index.name}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 dark:border-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {index.name}
              </span>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {index.value}
                </span>
                <div
                  className={`flex items-center ${index.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {index.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="font-medium">{index.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSummaryWidget;
