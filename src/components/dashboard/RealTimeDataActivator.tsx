import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Zap, Database } from "lucide-react";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";
import { useRealTimeMarketData } from "@/hooks/useRealTimeMarketData";

interface RealTimeDataActivatorProps {
  onActivate: () => void;
  className?: string;
}

const RealTimeDataActivator: React.FC<RealTimeDataActivatorProps> = ({
  onActivate,
  className = "",
}) => {
  const [isActivating, setIsActivating] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { refreshSentimentData } = useMarketSentiment();
  const { data: marketData, lastUpdated } = useRealTimeMarketData("stocks");

  const handleActivate = () => {
    setIsActivating(true);

    // Simulate activation process
    setTimeout(() => {
      refreshSentimentData();
      setIsActivating(false);
      setIsActive(true);
      onActivate();
    }, 1500);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Real-Time Data Feeds
          </h3>
        </div>
        <Badge
          className={
            isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
          }
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            Market Sentiment Feed
          </span>
          <Badge
            variant="outline"
            className={
              isActive
                ? "border-green-500 text-green-600"
                : "border-gray-300 text-gray-500"
            }
          >
            {isActive ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            Real-Time Price Data
          </span>
          <Badge
            variant="outline"
            className={
              isActive
                ? "border-green-500 text-green-600"
                : "border-gray-300 text-gray-500"
            }
          >
            {isActive ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            News Validation Feed
          </span>
          <Badge
            variant="outline"
            className={
              isActive
                ? "border-green-500 text-green-600"
                : "border-gray-300 text-gray-500"
            }
          >
            {isActive ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </div>

      <Button
        onClick={handleActivate}
        disabled={isActivating || isActive}
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
      >
        {isActivating ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Activating...
          </>
        ) : isActive ? (
          <>
            <Zap className="h-4 w-4" />
            Data Feeds Active
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Activate Data Feeds
          </>
        )}
      </Button>
    </div>
  );
};

export default RealTimeDataActivator;
