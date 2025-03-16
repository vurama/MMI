import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Lightbulb, AlertTriangle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export type RecommendationType = "long" | "short" | "wait" | "neutral";

interface AIAnalysisResult {
  recommendation: RecommendationType;
  confidence: number;
  reasoning: string;
  keyLevels?: {
    support: string[];
    resistance: string[];
  };
  patterns?: string[];
  timestamp: string;
}

interface AIAnalysisPanelProps {
  isLoading: boolean;
  result?: AIAnalysisResult;
  error?: string;
  remainingCredits?: number;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  isLoading,
  result,
  error,
  remainingCredits = 0,
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 dark:text-green-500";
    if (confidence >= 60) return "text-amber-600 dark:text-amber-500";
    return "text-red-600 dark:text-red-500";
  };

  return (
    <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Brain className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          AI Chart Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Analyzing your chart...
            </p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Analysis Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge
                className={`px-3 py-1 text-sm font-medium ${getRecommendationColor(result.recommendation)}`}
              >
                {result.recommendation.toUpperCase()} RECOMMENDATION
              </Badge>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(result.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                    AI Reasoning
                  </h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                    {result.reasoning}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Confidence:
                </span>
                <span
                  className={`ml-2 text-sm font-medium ${getConfidenceColor(result.confidence)}`}
                >
                  {result.confidence}%
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Remaining credits: {remainingCredits}
              </div>
            </div>

            {result.keyLevels && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Key Levels
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Support
                    </h4>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {result.keyLevels.support.map((level, i) => (
                        <li key={i}>{level}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Resistance
                    </h4>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {result.keyLevels.resistance.map((level, i) => (
                        <li key={i}>{level}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {result.patterns && result.patterns.length > 0 && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Identified Patterns
                </h3>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  {result.patterns.map((pattern, i) => (
                    <li key={i}>{pattern}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <Brain className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Upload a chart to receive AI-powered analysis and recommendations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalysisPanel;
