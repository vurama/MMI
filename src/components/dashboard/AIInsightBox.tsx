import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightBoxProps {
  title: string;
  category: string;
  summary: string;
  status: "positive" | "negative" | "neutral";
  lastUpdated?: string;
  isTracking?: boolean;
  onClick?: () => void;
}

const AIInsightBox = ({
  title,
  category,
  summary,
  status = "neutral",
  lastUpdated = "Just now",
  isTracking = true,
  onClick,
}: AIInsightBoxProps) => {
  const [pulseOpacity, setPulseOpacity] = useState(1);

  // Pulsing effect for tracking indicator
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setPulseOpacity((prev) => (prev === 1 ? 0.4 : 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [isTracking]);

  const getStatusColor = () => {
    switch (status) {
      case "positive":
        return "bg-green-500";
      case "negative":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "stocks":
        return "bg-blue-100 text-blue-800";
      case "real estate":
        return "bg-green-100 text-green-800";
      case "crypto":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-full hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-5 relative">
          {/* AI Brain Icon */}
          <div className="absolute top-5 right-5 flex items-center">
            <Brain className="h-5 w-5 text-indigo-500 mr-2" />
            <span className="text-xs text-gray-500">{lastUpdated}</span>
          </div>

          {/* Tracking Indicator */}
          {isTracking && (
            <div className="absolute top-5 left-5 flex items-center">
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full mr-1.5",
                  getStatusColor(),
                  "transition-opacity duration-1000",
                )}
                style={{ opacity: pulseOpacity }}
              />
              <Activity className="h-3.5 w-3.5 text-gray-400" />
            </div>
          )}

          {/* Content */}
          <div className="mt-10">
            <Badge className={cn("mb-3", getCategoryColor())}>{category}</Badge>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{summary}</p>

            <div className="flex items-center text-indigo-600 text-sm font-medium">
              View insights
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightBox;
