import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AnalysisStatus = "pending" | "in-review" | "completed" | "none";

interface HumanAnalysisResult {
  analyst: {
    name: string;
    avatar: string;
  };
  status: AnalysisStatus;
  submittedAt: string;
  completedAt?: string;
  analysis?: string;
  recommendation?: string;
}

interface HumanAnalysisPanelProps {
  result?: HumanAnalysisResult;
  availableCredits: number;
  onRequestAnalysis: (boostHours: number) => void;
  isSubmitting: boolean;
}

const HumanAnalysisPanel: React.FC<HumanAnalysisPanelProps> = ({
  result,
  availableCredits,
  onRequestAnalysis,
  isSubmitting,
}) => {
  const [boostHours, setBoostHours] = useState<number>(0);

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
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <Clock className="h-3 w-3 mr-1" />
          In Review
        </Badge>;
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

  const getEstimatedTime = () => {
    if (boostHours > 0) {
      return `${boostHours} hour${boostHours > 1 ? "s" : ""}`;
    }
    return "24 hours";
  };

  const getBoostCost = () => {
    return boostHours;
  };

  return (
    <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Human Analyst Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {getStatusBadge(result.status)}
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Submitted: {new Date(result.submittedAt).toLocaleString()}
              </div>
            </div>

            {result.status === "completed" && result.analysis ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {result.analyst.avatar ? (
                      <img
                        src={result.analyst.avatar}
                        alt={result.analyst.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {result.analyst.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        Professional Analyst
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Completed:{" "}
                      {result.completedAt
                        ? new Date(result.completedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Analysis
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1 whitespace-pre-line">
                        {result.analysis}
                      </p>
                    </div>
                  </div>
                </div>

                {result.recommendation && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
                      <div>
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                          Recommendation
                        </h3>
                        <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                          {result.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Status Update
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      {result.status === "pending"
                        ? "Your chart is in the queue and will be reviewed by our analysts soon."
                        : "Your chart is currently being reviewed by our professional analysts."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="h-32 flex flex-col items-center justify-center text-center">
              <User className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                Submit your chart for review by a professional market analyst
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
                Request Professional Analysis
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700 dark:text-blue-400">
                    Standard review time: 24 hours
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Free
                  </Badge>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-blue-700 dark:text-blue-400">
                    Speed up review (optional):
                  </label>
                  <Select
                    value={boostHours.toString()}
                    onValueChange={(value) => setBoostHours(parseInt(value))}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="No boost" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No boost (24h)</SelectItem>
                      <SelectItem value="1">
                        1 hour turnaround (1 credit)
                      </SelectItem>
                      <SelectItem value="2">
                        2 hour turnaround (2 credits)
                      </SelectItem>
                      <SelectItem value="4">
                        4 hour turnaround (4 credits)
                      </SelectItem>
                      <SelectItem value="8">
                        8 hour turnaround (8 credits)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {boostHours > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-400">
                      Boost cost:
                    </span>
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      <Zap className="h-3 w-3 mr-1" />
                      {getBoostCost()} credits
                    </Badge>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700 dark:text-blue-400">
                    Your available credits:
                  </span>
                  <span className="font-medium text-blue-800 dark:text-blue-300">
                    {availableCredits} credits
                  </span>
                </div>

                {boostHours > availableCredits ? (
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded text-xs text-red-700 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Not enough credits for this boost
                  </div>
                ) : null}

                <div className="pt-2">
                  <Button
                    onClick={() => onRequestAnalysis(boostHours)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                    disabled={
                      isSubmitting ||
                      (boostHours > 0 && boostHours > availableCredits)
                    }
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Request Analysis
                        <span className="ml-1 text-xs">
                          (Est. {getEstimatedTime()})
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HumanAnalysisPanel;
