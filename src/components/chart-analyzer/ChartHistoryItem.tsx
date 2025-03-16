import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  ChevronRight,
  Brain,
  User,
  CheckCircle2,
  Hourglass,
  Zap,
} from "lucide-react";
import { RecommendationType } from "./AIAnalysisPanel";
import { AnalysisStatus } from "./HumanAnalysisPanel";

interface ChartHistoryItemProps {
  id: string;
  chartUrl: string;
  category: string;
  ticker: string;
  submittedAt: string;
  aiAnalysis?: {
    recommendation: RecommendationType;
    confidence: number;
  };
  humanAnalysis?: {
    status: AnalysisStatus;
    boostCredits: number;
  };
  onClick: () => void;
}

const ChartHistoryItem: React.FC<ChartHistoryItemProps> = ({
  id,
  chartUrl,
  category,
  ticker,
  submittedAt,
  aiAnalysis,
  humanAnalysis,
  onClick,
}) => {
  const getRecommendationColor = (recommendation: RecommendationType) => {
    switch (recommendation) {
      case "long":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "short":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "wait":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "neutral":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusBadge = (status: AnalysisStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            <Hourglass className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "in-review":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            In Review
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
            {chartUrl ? (
              <img
                src={chartUrl}
                alt={`Chart for ${ticker}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {ticker.toUpperCase()}
              </h3>
              <Badge variant="outline" className="text-xs capitalize">
                {category}
              </Badge>
            </div>

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Clock className="h-3 w-3 mr-1" />
              {formatDate(submittedAt)}
            </div>

            <div className="flex flex-wrap gap-2">
              {aiAnalysis && (
                <div className="flex items-center">
                  <Brain className="h-3 w-3 text-indigo-600 dark:text-indigo-400 mr-1" />
                  <Badge
                    className={`text-xs ${getRecommendationColor(aiAnalysis.recommendation)}`}
                  >
                    {aiAnalysis.recommendation.toUpperCase()}
                  </Badge>
                </div>
              )}

              {humanAnalysis && (
                <div className="flex items-center">
                  <User className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                  {getStatusBadge(humanAnalysis.status)}
                </div>
              )}

              {humanAnalysis && humanAnalysis.boostCredits > 0 && (
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  {humanAnalysis.boostCredits} credits used
                </Badge>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="ml-2 flex-shrink-0">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartHistoryItem;
