import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRealTimeMarketData } from "@/hooks/useRealTimeMarketData";
import { RefreshCw, Info, Clock, TrendingUp, TrendingDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RealTimeMarketDataProps {
  category?: string;
  className?: string;
}

const RealTimeMarketData: React.FC<RealTimeMarketDataProps> = ({
  category = "stocks",
  className = "",
}) => {
  const { data, isLoading, error, lastUpdated } =
    useRealTimeMarketData(category);

  // Format the last updated time
  const formatLastUpdated = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <Card
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">Real-Time Market Data</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Real-time market data for {category}. Updates every minute.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant="outline" className="text-xs">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              {error}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {data.map((item) => (
                <motion.div
                  key={item.symbol}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <div className="font-medium">{item.symbol}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.price}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-medium ${parseFloat(item.change) >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
                    >
                      {item.change} ({item.changePercent})
                    </span>
                    <span className="ml-1">
                      {parseFloat(item.change) >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Last updated timestamp */}
            <div className="flex justify-center items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {formatLastUpdated(lastUpdated)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeMarketData;
