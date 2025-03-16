import React, { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartHistoryEntry } from "./ChartHistoryList";
import ChartUploadForm from "./ChartUploadForm";
import AIAnalysisPanel, { RecommendationType } from "./AIAnalysisPanel";
import HumanAnalysisPanel, { AnalysisStatus } from "./HumanAnalysisPanel";
import ChartHistoryList from "./ChartHistoryList";
import { useToast } from "@/components/ui/use-toast";
import QuickAccessToolbar from "../dashboard/QuickAccessToolbar";
import {
  LineChart,
  History,
  Upload,
  Zap,
  Brain,
  User,
  Info,
} from "lucide-react";
import { ChartAnalyzerService } from "@/services/ChartAnalyzerService";

const ChartAnalyzerPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"upload" | "history">("upload");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPendingAnalysis, setIsPendingAnalysis] = useState(false);
  const [history, setHistory] = useState<ChartHistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<ChartHistoryEntry | null>(
    null,
  );
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [aiAnalysisError, setAiAnalysisError] = useState<string>("");
  const [humanAnalysisResult, setHumanAnalysisResult] = useState<any>(null);
  const [availableCredits, setAvailableCredits] = useState(0);

  useEffect(() => {
    loadChartHistory();
    loadUserCredits();
  }, []);

  const loadChartHistory = async () => {
    try {
      const chartHistory = await ChartAnalyzerService.getChartHistory();
      setHistory(chartHistory);
    } catch (error) {
      console.error("Error loading chart history:", error);
      toast({
        title: "Error",
        description: "Failed to load chart history",
        variant: "destructive",
      });
    }
  };

  const loadUserCredits = async () => {
    try {
      const credits = await ChartAnalyzerService.getUserCredits();
      setAvailableCredits(credits.humanCredits);
    } catch (error) {
      console.error("Error loading user credits:", error);
    }
  };

  const handleChartUpload = async (data: {
    chartFile: File;
    category: string;
    ticker: string;
    consent: boolean;
  }) => {
    setIsSubmitting(true);
    setAiAnalysisLoading(true);
    setAiAnalysisError("");

    try {
      // Upload chart to storage and create record
      const chartId = await ChartAnalyzerService.uploadChart(
        data.chartFile,
        data.category,
        data.ticker,
      );

      // Perform AI analysis
      const aiResult = await ChartAnalyzerService.analyzeChartWithAI(chartId);
      setAiAnalysisResult(aiResult);

      // Refresh chart history
      await loadChartHistory();
      await loadUserCredits();

      // Find the newly created entry
      const newEntry = (await ChartAnalyzerService.getChartHistory()).find(
        (entry) => entry.id === chartId,
      );

      if (newEntry) {
        setSelectedEntry(newEntry);
      }

      // Reset states
      setIsPendingAnalysis(false);
      setActiveTab("history");

      toast({
        title: "Chart uploaded successfully",
        description: "AI analysis has been completed.",
      });
    } catch (error) {
      console.error("Error uploading chart:", error);
      setAiAnalysisError("Failed to analyze chart. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setAiAnalysisLoading(false);
    }
  };

  const handleRequestHumanAnalysis = async (boostHours: number) => {
    setIsSubmitting(true);

    try {
      if (!selectedEntry) {
        throw new Error("No chart selected");
      }

      // Request human analysis
      await ChartAnalyzerService.requestHumanAnalysis(
        selectedEntry.id,
        boostHours,
      );

      // Refresh data
      await loadChartHistory();
      await loadUserCredits();

      // Get updated human analysis
      const humanResult = await ChartAnalyzerService.getHumanAnalysis(
        selectedEntry.id,
      );
      setHumanAnalysisResult(humanResult);

      // Update selected entry
      const updatedEntry = (await ChartAnalyzerService.getChartHistory()).find(
        (entry) => entry.id === selectedEntry.id,
      );

      if (updatedEntry) {
        setSelectedEntry(updatedEntry);
      }

      toast({
        title: "Analysis requested",
        description:
          boostHours > 0
            ? `Your chart has been submitted with a ${boostHours}-hour boost.`
            : "Your chart has been submitted for analysis.",
      });
    } catch (error) {
      console.error("Error requesting human analysis:", error);
      toast({
        title: "Request failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to request human analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectHistoryEntry = async (entry: ChartHistoryEntry) => {
    setSelectedEntry(entry);
    setAiAnalysisLoading(true);

    try {
      // Get AI analysis
      const aiResult = await ChartAnalyzerService.getAIAnalysis(entry.id);
      setAiAnalysisResult(aiResult);

      // Get human analysis if available
      const humanResult = await ChartAnalyzerService.getHumanAnalysis(entry.id);
      setHumanAnalysisResult(humanResult);
    } catch (error) {
      console.error("Error loading analysis details:", error);
      setAiAnalysisError("Failed to load analysis details");
    } finally {
      setAiAnalysisLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsSubmitting(true);
    try {
      await loadChartHistory();
      await loadUserCredits();

      if (selectedEntry) {
        const entry = (await ChartAnalyzerService.getChartHistory()).find(
          (e) => e.id === selectedEntry.id,
        );

        if (entry) {
          await handleSelectHistoryEntry(entry);
        }
      }

      toast({
        title: "Refreshed",
        description: "Chart data has been refreshed.",
      });
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Chart Analyzer" />
        <main className="flex-1 overflow-auto">
          <QuickAccessToolbar
            onRefresh={handleRefresh}
            onOpenSearch={() => window.open("/dashboard", "_self")}
            onOpenChat={() => window.open("/advisor", "_self")}
            onOpenAlerts={() => window.open("/alerts", "_self")}
            isLoading={isSubmitting}
          />
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <LineChart className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                Chart Analyzer
              </h1>
              <div className="flex items-center space-x-2">
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 flex items-center">
                  <Brain className="h-3.5 w-3.5 mr-1" />
                  <span>AI-Powered</span>
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex items-center">
                  <User className="h-3.5 w-3.5 mr-1" />
                  <span>Expert Analysis</span>
                </Badge>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left sidebar */}
              <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "upload" | "history")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center">
                      <History className="h-4 w-4 mr-2" />
                      History
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Available Credits
                    </h3>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Zap className="h-3.5 w-3.5 mr-1" />
                      Buy Credits
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      <Zap className="h-3.5 w-3.5 mr-1" />
                      {availableCredits} credits
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full"
                    >
                      <Info className="h-3.5 w-3.5 text-gray-500" />
                    </Button>
                  </div>
                </div>

                {activeTab === "upload" ? (
                  <ChartUploadForm
                    onSubmit={handleChartUpload}
                    isSubmitting={isSubmitting}
                    isPendingAnalysis={isPendingAnalysis}
                  />
                ) : (
                  <ChartHistoryList
                    history={history}
                    onSelectEntry={handleSelectHistoryEntry}
                  />
                )}
              </div>

              {/* Main content area */}
              <div className="flex-1 space-y-6">
                {/* Chart preview */}
                {selectedEntry && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          {selectedEntry.ticker.toUpperCase()}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Badge variant="outline" className="mr-2 capitalize">
                            {selectedEntry.category}
                          </Badge>
                          <span>
                            Submitted:{" "}
                            {new Date(
                              selectedEntry.submittedAt,
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={selectedEntry.chartUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Full Size
                        </a>
                      </Button>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                      <img
                        src={selectedEntry.chartUrl}
                        alt={`Chart for ${selectedEntry.ticker}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Analysis panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AIAnalysisPanel
                    isLoading={aiAnalysisLoading}
                    result={aiAnalysisResult}
                    error={aiAnalysisError}
                    remainingCredits={5} // Mock remaining AI credits
                  />
                  <HumanAnalysisPanel
                    result={humanAnalysisResult}
                    availableCredits={availableCredits}
                    onRequestAnalysis={handleRequestHumanAnalysis}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChartAnalyzerPage;
