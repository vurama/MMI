import React from "react";
import { Badge } from "@/components/ui/badge";

interface MarketEventCorrelationProps {
  data?: Array<{
    event: string;
    date: string;
    beforeCorrelations: Record<string, number>;
    afterCorrelations: Record<string, number>;
  }>;
  isLoading?: boolean;
}

const MarketEventCorrelation = ({
  data = [],
  isLoading = false,
}: MarketEventCorrelationProps) => {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Helper function to determine badge variant based on correlation value
  const getCorrelationBadgeVariant = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.7) return value >= 0 ? "default" : "destructive";
    if (absValue >= 0.4) return value >= 0 ? "secondary" : "outline";
    return "outline";
  };

  return (
    <div className="space-y-6">
      {data.map((event, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <h3 className="text-lg font-medium mb-2">
            {event.event} - {event.date}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Before Event
              </h4>
              <div className="space-y-2">
                {Object.entries(event.beforeCorrelations).map(
                  ([pair, value]) => (
                    <div key={pair} className="flex justify-between">
                      <span>{formatPair(pair)}</span>
                      <Badge variant={getCorrelationBadgeVariant(value)}>
                        {value.toFixed(2)}
                      </Badge>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                After Event
              </h4>
              <div className="space-y-2">
                {Object.entries(event.afterCorrelations).map(
                  ([pair, value]) => (
                    <div key={pair} className="flex justify-between">
                      <span>{formatPair(pair)}</span>
                      <Badge variant={getCorrelationBadgeVariant(value)}>
                        {value.toFixed(2)}
                      </Badge>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              AI Analysis
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {getEventAnalysis(event)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to format correlation pair names
const formatPair = (pair: string): string => {
  // Convert camelCase to readable format
  // e.g., btcSp500 -> BTC / S&P 500
  if (pair === "btcSp500") return "BTC / S&P 500";
  if (pair === "ethNasdaq") return "ETH / NASDAQ";
  if (pair === "goldUsd") return "Gold / USD";
  if (pair === "btcBanks") return "BTC / Bank Stocks";
  if (pair === "goldBanks") return "Gold / Bank Stocks";

  return pair;
};

// Helper function to generate analysis text based on the event
const getEventAnalysis = (event: any): string => {
  if (event.event === "Fed Interest Rate Hike") {
    return "The Fed rate hike strengthened the correlation between crypto and equities, indicating that both are now more sensitive to monetary policy. Gold's negative correlation with USD also increased, reinforcing its role as an inflation hedge.";
  }

  if (event.event === "Banking Crisis") {
    return "During the banking crisis, Bitcoin and Gold both decoupled from bank stocks, showing their potential as safe havens during banking system stress. This suggests they may serve as effective hedges during financial system instability.";
  }

  return "This market event significantly impacted asset correlations, potentially creating new opportunities for portfolio diversification and risk management.";
};

export default MarketEventCorrelation;
