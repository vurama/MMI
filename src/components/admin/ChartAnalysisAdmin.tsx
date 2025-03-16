import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Hourglass,
  RefreshCw,
  User,
  Zap,
} from "lucide-react";
import { ChartAnalyzerService } from "@/services/ChartAnalyzerService";
import { AnalysisStatus } from "@/components/chart-analyzer/HumanAnalysisPanel";
import { useToast } from "@/components/ui/use-toast";

interface PendingAnalysisRequest {
  id: string;
  status: AnalysisStatus;
  boost_credits: number;
  submitted_at: string;
  chart_uploads: {
    id: string;
    chart_url: string;
    category: string;
    ticker: string;
    user_id: string;
  };
}

const ChartAnalysisAdmin: React.FC = () => {
  const { toast } = useToast();
  const [pendingRequests, setPendingRequests] = useState<
    PendingAnalysisRequest[]
  >([]);
  const [selectedRequest, setSelectedRequest] =
    useState<PendingAnalysisRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [analystName, setAnalystName] = useState("John Smith");
  const [analystAvatar, setAnalystAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  );

  useEffect(() => {
    loadPendingRequests();
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(() => {
      loadPendingRequests();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const loadPendingRequests = async () => {
    setIsLoading(true);
    try {
      const requests =
        await ChartAnalyzerService.getPendingHumanAnalysisRequests();
      console.log("Loaded pending requests:", requests);
      setPendingRequests(requests || []);
    } catch (error) {
      console.error("Error loading pending requests:", error);
      toast({
        title: "Error",
        description: "Failed to load pending analysis requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRequest = (request: PendingAnalysisRequest) => {
    setSelectedRequest(request);
    setAnalysis("");
    setRecommendation("");

    // If the request is pending, mark it as in-review
    if (request.status === "pending") {
      updateRequestStatus(request.id, "in-review");
    }
  };

  const updateRequestStatus = async (id: string, status: AnalysisStatus) => {
    try {
      await ChartAnalyzerService.updateHumanAnalysis(id, { status });

      // Update local state
      setPendingRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req)),
      );

      if (selectedRequest?.id === id) {
        setSelectedRequest((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAnalysis = async () => {
    if (!selectedRequest) return;
    if (!analysis.trim()) {
      toast({
        title: "Error",
        description: "Please provide an analysis",
        variant: "destructive",
      });
      return;
    }
    if (!recommendation.trim()) {
      toast({
        title: "Error",
        description: "Please provide a recommendation",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await ChartAnalyzerService.updateHumanAnalysis(selectedRequest.id, {
        status: "completed",
        analystName,
        analystAvatar,
        analysis,
        recommendation,
        completedAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Analysis submitted successfully",
      });

      // Refresh the list and clear selection
      loadPendingRequests();
      setSelectedRequest(null);
      setAnalysis("");
      setRecommendation("");
    } catch (error) {
      console.error("Error submitting analysis:", error);
      toast({
        title: "Error",
        description: "Failed to submit analysis",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Chart Analysis Admin Panel
        </h1>
        <Button onClick={loadPendingRequests} disabled={isLoading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Requests List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Pending Analysis Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {pendingRequests.length > 0 ? (
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <Card
                      key={request.id}
                      className={`cursor-pointer hover:shadow-md transition-all ${selectedRequest?.id === request.id ? "border-blue-500 dark:border-blue-400" : ""}`}
                      onClick={() => handleSelectRequest(request)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">
                            {request.chart_uploads.ticker.toUpperCase()}
                          </h3>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <Badge variant="outline" className="mr-2 capitalize">
                            {request.chart_uploads.category}
                          </Badge>
                          <span>
                            {new Date(request.submitted_at).toLocaleString()}
                          </span>
                        </div>

                        {request.boost_credits > 0 && (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            <Zap className="h-3 w-3 mr-1" />
                            {request.boost_credits} credit boost
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {isLoading ? "Loading..." : "No pending requests"}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Analysis Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {selectedRequest ? "Provide Analysis" : "Select a Request"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRequest ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {selectedRequest.chart_uploads.ticker.toUpperCase()}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Badge variant="outline" className="mr-2 capitalize">
                          {selectedRequest.chart_uploads.category}
                        </Badge>
                        <span>
                          Submitted:{" "}
                          {new Date(
                            selectedRequest.submitted_at,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={selectedRequest.chart_uploads.chart_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Size
                      </a>
                    </Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                    <img
                      src={selectedRequest.chart_uploads.chart_url}
                      alt={`Chart for ${selectedRequest.chart_uploads.ticker}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="analyst-info">Analyst Information</Label>
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {analystAvatar ? (
                          <img
                            src={analystAvatar}
                            alt={analystName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <Input
                        id="analyst-name"
                        value={analystName}
                        onChange={(e) => setAnalystName(e.target.value)}
                        placeholder="Analyst Name"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analysis">Analysis</Label>
                    <Textarea
                      id="analysis"
                      value={analysis}
                      onChange={(e) => setAnalysis(e.target.value)}
                      placeholder="Provide your detailed analysis of the chart..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recommendation">Recommendation</Label>
                    <Textarea
                      id="recommendation"
                      value={recommendation}
                      onChange={(e) => setRecommendation(e.target.value)}
                      placeholder="Provide your recommendation based on the analysis..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleSubmitAnalysis}
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Analysis"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  No request selected
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 max-w-md">
                  Select a pending request from the list to provide your
                  analysis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartAnalysisAdmin;
