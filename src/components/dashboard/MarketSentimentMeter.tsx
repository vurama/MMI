import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarketSentimentMeterProps {
  score: number; // 0-100 scale
  trend?: number; // positive or negative change
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MarketSentimentMeter: React.FC<MarketSentimentMeterProps> = ({
  score = 65,
  trend = 0,
  showLabel = true,
  size = "md",
  className,
}) => {
  // Determine sentiment category based on score
  const getSentimentCategory = (score: number) => {
    if (score >= 70) return "Bullish";
    if (score >= 55) return "Moderately Bullish";
    if (score >= 45) return "Neutral";
    if (score >= 30) return "Moderately Bearish";
    return "Bearish";
  };

  // Get color based on sentiment score
  const getColor = (score: number) => {
    if (score >= 70) return "#22c55e"; // green-500
    if (score >= 55) return "#84cc16"; // lime-500
    if (score >= 45) return "#a3a3a3"; // gray-400
    if (score >= 30) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  // Get dark mode color
  const getDarkColor = (score: number) => {
    if (score >= 70) return "#22c55e"; // green-500
    if (score >= 55) return "#84cc16"; // lime-500
    if (score >= 45) return "#a3a3a3"; // gray-400
    if (score >= 30) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  // Get text color class
  const getTextColorClass = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-500";
    if (score >= 55) return "text-lime-600 dark:text-lime-500";
    if (score >= 45) return "text-gray-500 dark:text-gray-400";
    if (score >= 30) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  // Get trend icon
  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  // Size classes
  const sizeClasses = {
    sm: {
      container: "h-16",
      meter: "h-8 w-8",
      score: "text-lg",
      label: "text-xs",
    },
    md: {
      container: "h-20",
      meter: "h-12 w-12",
      score: "text-2xl",
      label: "text-sm",
    },
    lg: {
      container: "h-24",
      meter: "h-16 w-16",
      score: "text-3xl",
      label: "text-base",
    },
  };

  // Calculate rotation based on score (0-100 maps to -90 to 90 degrees)
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size].container)}>
        {/* Semicircle background */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full aspect-[2/1] bg-gradient-to-t from-gray-100 to-gray-50 rounded-t-full overflow-hidden dark:from-gray-800 dark:to-gray-900">
          {/* Color segments */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20 dark:opacity-30" />
          </div>
        </div>

        {/* Needle */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{ zIndex: 10 }}
        >
          <div className="w-1 h-[calc(100%-12px)] bg-gray-800 rounded-t-full dark:bg-gray-200" />
        </motion.div>

        {/* Center point */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gray-800 z-20 dark:bg-gray-200" />

        {/* Score display */}
        <motion.div
          className={cn(
            "absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center",
            sizeClasses[size].meter,
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center">
            <span
              className={cn(
                "font-bold",
                getTextColorClass(score),
                sizeClasses[size].score,
              )}
            >
              {score}
            </span>
            {trend !== 0 && <span className="ml-1">{getTrendIcon(trend)}</span>}
          </div>
        </motion.div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex items-center mt-1">
          <span
            className={cn(
              "font-medium",
              getTextColorClass(score),
              sizeClasses[size].label,
            )}
          >
            {getSentimentCategory(score)}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Market sentiment score (0-100)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default MarketSentimentMeter;
