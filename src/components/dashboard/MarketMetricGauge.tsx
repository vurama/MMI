import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface MarketMetricGaugeProps {
  title: string;
  score: number; // 0-100 scale
  trend?: number; // positive or negative change
  analysis: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  tooltipText?: string;
}

const MarketMetricGauge: React.FC<MarketMetricGaugeProps> = ({
  title,
  score = 65,
  trend = 0,
  analysis,
  size = "md",
  className,
  tooltipText,
}) => {
  // Determine sentiment category based on score
  const getSentimentCategory = (score: number) => {
    if (score >= 70) return "Bullish";
    if (score >= 55) return "Moderately Bullish";
    if (score >= 45) return "Neutral";
    if (score >= 30) return "Moderately Bearish";
    return "Bearish";
  };

  // Get text color class
  const getTextColorClass = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-500";
    if (score >= 55) return "text-lime-600 dark:text-lime-500";
    if (score >= 45) return "text-gray-500 dark:text-gray-400";
    if (score >= 30) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  // Get background color class
  const getBgColorClass = (score: number) => {
    if (score >= 70) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 55) return "bg-lime-100 dark:bg-lime-900/30";
    if (score >= 45) return "bg-gray-100 dark:bg-gray-800";
    if (score >= 30) return "bg-orange-100 dark:bg-orange-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  // Get progress color class
  const getProgressColorClass = (score: number) => {
    if (score >= 70) return "bg-green-500 dark:bg-green-600";
    if (score >= 55) return "bg-lime-500 dark:bg-lime-600";
    if (score >= 45) return "bg-gray-400 dark:bg-gray-500";
    if (score >= 30) return "bg-orange-500 dark:bg-orange-600";
    return "bg-red-500 dark:bg-red-600";
  };

  // Get trend icon and color
  const getTrendDisplay = (trend: number) => {
    if (trend > 0) {
      return {
        icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
        color: "text-green-600",
        sign: "+",
      };
    } else if (trend < 0) {
      return {
        icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
        color: "text-red-600",
        sign: "",
      };
    }
    return {
      icon: <ArrowRight className="h-4 w-4 text-gray-500" />,
      color: "text-gray-600",
      sign: "",
    };
  };

  // Size classes
  const sizeClasses = {
    sm: {
      score: "text-lg",
      label: "text-xs",
    },
    md: {
      score: "text-2xl",
      label: "text-sm",
    },
    lg: {
      score: "text-3xl",
      label: "text-base",
    },
  };

  const trendDisplay = getTrendDisplay(trend);

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <span
              className={cn(
                "font-bold mr-2",
                getTextColorClass(score),
                sizeClasses[size].score,
              )}
            >
              {score}
            </span>
            {trend !== 0 && (
              <div className="flex items-center">
                {trendDisplay.icon}
                <span className={`text-sm ${trendDisplay.color}`}>
                  {trendDisplay.sign}
                  {Math.abs(trend).toFixed(1)}%
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getBgColorClass(score),
                getTextColorClass(score),
              )}
            >
              {getSentimentCategory(score)}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`h-full rounded-full ${getProgressColorClass(score)}`}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
        <p>{analysis}</p>
      </div>
    </div>
  );
};

export default MarketMetricGauge;
