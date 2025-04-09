import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Info,
  ChevronDown,
  ChevronUp,
  Brain,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TimeFrame {
  label: string;
  currentGrowth: number;
  previousGrowth: number;
  confidence: number;
  aiSummary?: string;
  investmentAdvice?: string;
  startDate?: Date;
  endDate?: Date;
}

interface MarketStrengthGrowthBarProps {
  timeFrames: TimeFrame[];
  projectedGrowth: number;
  projectedConfidence: number;
  className?: string;
  defaultExpandedTimeFrame?: string;
  aiSummary?: string;
  investmentAdvice?: string;
  appreciationFactor?: number;
}

// Helper functions moved outside component to avoid recreation on each render
const getGrowthColor = (growth: number) => {
  if (growth > 3) return "bg-green-500";
  if (growth > 0) return "bg-green-400";
  if (growth === 0) return "bg-gray-400";
  if (growth > -3) return "bg-red-400";
  return "bg-red-500";
};

const getGrowthTextColor = (growth: number) => {
  if (growth > 0) return "text-green-600";
  if (growth === 0) return "text-gray-600";
  return "text-red-600";
};

const formatGrowth = (growth: number) => {
  return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
};

interface TimeFrameItemProps {
  timeFrame: TimeFrame;
  isExpanded: boolean;
  onToggle: () => void;
  getGrowthColor: (growth: number) => string;
  getGrowthTextColor: (growth: number) => string;
  formatGrowth: (growth: number) => string;
}

const TimeFrameItem: React.FC<TimeFrameItemProps> = ({
  timeFrame,
  isExpanded,
  onToggle,
  getGrowthColor,
  getGrowthTextColor,
  formatGrowth,
}) => {
  // Format dates for display
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const dateRangeText =
    timeFrame.startDate && timeFrame.endDate
      ? `${formatDate(timeFrame.startDate)} - ${formatDate(timeFrame.endDate)}`
      : "";

  return (
    <div className="border rounded-lg p-3 transition-all duration-300 hover:border-gray-300">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-sm font-medium">{timeFrame.label}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-gray-400 ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-xs">
                    The {timeFrame.label.toLowerCase()} bar shows a{" "}
                    {formatGrowth(timeFrame.currentGrowth)} change based on the
                    average sentiment and price changes.
                    <br />
                    <br />
                    Confidence level: {timeFrame.confidence}%
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {dateRangeText && (
            <span className="text-xs text-gray-500 mt-0.5">
              {dateRangeText}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${getGrowthTextColor(timeFrame.currentGrowth)}`}
          >
            {formatGrowth(timeFrame.currentGrowth)}
          </span>
          <ArrowRight
            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-blue-500" : "text-gray-500"}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-3 pt-2 border-t">
          {/* Current Period Growth Bar */}
          <div className="h-5 bg-gray-100 rounded-full overflow-hidden relative">
            <div
              className={`h-full ${getGrowthColor(timeFrame.currentGrowth)} rounded-full transition-all duration-500`}
              style={{
                width: `${Math.min(Math.max(50 + timeFrame.currentGrowth * 5, 0), 100)}%`,
              }}
            ></div>
            <div className="absolute top-0 left-1/2 h-full w-px bg-gray-300"></div>
          </div>

          {/* Previous Period Comparison */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">vs Previous Period</span>
            <div className="flex items-center">
              <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden mr-2">
                <div
                  className={`h-full ${getGrowthColor(timeFrame.previousGrowth)} rounded-full transition-all duration-500`}
                  style={{
                    width: `${Math.min(Math.max(50 + timeFrame.previousGrowth * 5, 0), 100)}%`,
                  }}
                ></div>
              </div>
              <span
                className={`text-xs ${getGrowthTextColor(timeFrame.previousGrowth)}`}
              >
                {formatGrowth(timeFrame.previousGrowth)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MarketStrengthGrowthBar: React.FC<MarketStrengthGrowthBarProps> = ({
  timeFrames = [],
  projectedGrowth = 0,
  projectedConfidence = 0,
  className = "",
  defaultExpandedTimeFrame = "1 Week",
  aiSummary = "Market shows moderate growth potential based on current trends and sentiment analysis.",
  investmentAdvice = "Consider diversifying investments across stable real estate markets with positive growth indicators.",
  appreciationFactor = 1.2,
}) => {
  // State to track which time frames are expanded
  const [expandedTimeFrames, setExpandedTimeFrames] = useState<
    Record<string, boolean>
  >({});
  const [showAllTimeFrames, setShowAllTimeFrames] = useState(false);

  // Calculate date ranges for each time frame
  useEffect(() => {
    const today = new Date();
    const updatedTimeFrames = timeFrames.map((tf) => {
      const endDate = new Date();
      const startDate = new Date();

      switch (tf.label) {
        case "1 Week":
          startDate.setDate(today.getDate() - 7);
          break;
        case "1 Month":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "1 Quarter":
          startDate.setMonth(today.getMonth() - 3);
          break;
        case "1 Year":
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        case "3 Years":
          startDate.setFullYear(today.getFullYear() - 3);
          break;
        case "5 Years":
          startDate.setFullYear(today.getFullYear() - 5);
          break;
        default:
          // For any other time frame, default to 30 days
          startDate.setDate(today.getDate() - 30);
      }

      return {
        ...tf,
        startDate,
        endDate,
      };
    });

    // Update the timeFrames with date ranges
    // Note: In a real application, you would update the state here
    // This is just for demonstration purposes
  }, []);

  // Initialize expanded state with the first time frame and default time frame expanded
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    timeFrames.forEach((tf, index) => {
      initialState[tf.label] =
        index === 0 || tf.label === defaultExpandedTimeFrame;
    });
    setExpandedTimeFrames(initialState);
  }, [timeFrames, defaultExpandedTimeFrame]);

  // Toggle a specific time frame's expanded state
  const toggleTimeFrame = (label: string) => {
    setExpandedTimeFrames((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Toggle showing all time frames
  const toggleAllTimeFrames = () => {
    const newShowAllState = !showAllTimeFrames;
    setShowAllTimeFrames(newShowAllState);

    // If showing all, expand all time frames; otherwise, collapse all except default
    const newExpandedState: Record<string, boolean> = {};
    timeFrames.forEach((tf) => {
      newExpandedState[tf.label] =
        newShowAllState || tf.label === defaultExpandedTimeFrame;
    });
    setExpandedTimeFrames(newExpandedState);
  };

  return (
    <Card className={`bg-white shadow-md border border-gray-100 ${className}`}>
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center">
            Market Strength Growth
            <span className="ml-2 flex items-center">
              <span
                className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-1"
                title="Real-time data"
              ></span>
              <span className="text-xs text-green-600 font-normal">
                Live Data
              </span>
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAllTimeFrames}
            className="text-sm"
          >
            {showAllTimeFrames ? "Collapse All" : "Expand All"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Growth Bars */}
          <div className="md:col-span-2 space-y-3">
            <div className="space-y-3">
              {timeFrames.map((timeFrame, index) => (
                <TimeFrameItem
                  key={index}
                  timeFrame={timeFrame}
                  isExpanded={expandedTimeFrames[timeFrame.label] || false}
                  onToggle={() => toggleTimeFrame(timeFrame.label)}
                  getGrowthColor={getGrowthColor}
                  getGrowthTextColor={getGrowthTextColor}
                  formatGrowth={formatGrowth}
                />
              ))}
            </div>
          </div>

          {/* Focus Resolution Box */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold mb-3 flex items-center">
                  Expected Growth for 2025
                  <span
                    className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"
                    title="Real-time data"
                  ></span>
                  <span className="ml-1 text-xs text-green-600">Live</span>
                </h3>
                <div className="text-3xl font-bold mb-2 text-center relative">
                  <span className={getGrowthTextColor(projectedGrowth)}>
                    {formatGrowth(projectedGrowth)}
                  </span>
                  <span
                    className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"
                    title="Real-time data"
                  ></span>
                </div>
                <Badge className="self-center mb-3 mx-auto flex">
                  {projectedConfidence}% confidence
                </Badge>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Appreciation Factor: {appreciationFactor.toFixed(1)}x
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p className="text-xs">
                          Appreciation factor indicates how much faster this
                          market is growing compared to the national average.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="space-y-3 mt-3 border-t pt-3">
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <Brain className="h-3.5 w-3.5 text-indigo-500 mr-1" />
                    AI Market Summary
                  </h4>
                  <p className="text-xs text-gray-700">
                    {aiSummary
                      ?.split(
                        /\b(Vonovia|Aroundtown|LEG Immobilien|TAG Immobilien|Deutsche Wohnen)\b/,
                      )
                      .map((part, index) => {
                        if (
                          [
                            "Vonovia",
                            "Aroundtown",
                            "LEG Immobilien",
                            "TAG Immobilien",
                            "Deutsche Wohnen",
                          ].includes(part)
                        ) {
                          return (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 font-medium px-1.5 py-0.5 rounded text-xs mx-0.5"
                            >
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <TrendingUp className="h-3.5 w-3.5 text-indigo-500 mr-1" />
                    Investment Advice
                  </h4>
                  <p className="text-xs text-gray-700">
                    {investmentAdvice
                      ?.split(
                        /\b(Vonovia|Aroundtown|LEG Immobilien|TAG Immobilien|Deutsche Wohnen)\b/,
                      )
                      .map((part, index) => {
                        if (
                          [
                            "Vonovia",
                            "Aroundtown",
                            "LEG Immobilien",
                            "TAG Immobilien",
                            "Deutsche Wohnen",
                          ].includes(part)
                        ) {
                          return (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 font-medium px-1.5 py-0.5 rounded text-xs mx-0.5"
                            >
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketStrengthGrowthBar;
