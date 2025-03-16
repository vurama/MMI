import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BarChart2,
} from "lucide-react";
import AIInsightBox from "../dashboard/AIInsightBox";
import { motion } from "framer-motion";

const AIInsights = () => {
  const [loading, setLoading] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Simulated AI accuracy metrics
  const accuracyMetrics = {
    overall: 92,
    stocks: 94,
    realEstate: 89,
    crypto: 87,
  };

  const insights = [
    {
      id: "1",
      title: "Tech Sector Momentum",
      category: "Stocks",
      summary:
        "AI analysis indicates strong momentum in tech stocks with potential growth opportunities in semiconductor and cloud services sectors.",
      status: "positive",
      lastUpdated: "5 min ago",
      isTracking: true,
      accuracy: 96,
    },
    {
      id: "2",
      title: "Housing Market Slowdown",
      category: "Real Estate",
      summary:
        "Detected cooling trends in major metropolitan housing markets with decreasing demand and increasing inventory levels.",
      status: "negative",
      lastUpdated: "15 min ago",
      isTracking: true,
      accuracy: 91,
    },
    {
      id: "3",
      title: "Crypto Market Volatility",
      category: "Crypto",
      summary:
        "Increased volatility detected in cryptocurrency markets with potential regulatory developments affecting market sentiment.",
      status: "neutral",
      lastUpdated: "Just now",
      isTracking: true,
      accuracy: 88,
    },
    {
      id: "4",
      title: "Energy Sector Analysis",
      category: "Stocks",
      summary:
        "Renewable energy stocks showing positive momentum based on policy developments and increased institutional investment.",
      status: "positive",
      lastUpdated: "30 min ago",
      isTracking: true,
      accuracy: 93,
    },
    {
      id: "5",
      title: "Commercial Real Estate Trends",
      category: "Real Estate",
      summary:
        "Office space demand remains below pre-pandemic levels while industrial and logistics properties continue to perform well.",
      status: "neutral",
      lastUpdated: "1 hour ago",
      isTracking: true,
      accuracy: 90,
    },
    {
      id: "6",
      title: "DeFi Protocol Analysis",
      category: "Crypto",
      summary:
        "Decentralized finance protocols showing increased adoption metrics with growing total value locked across major platforms.",
      status: "positive",
      lastUpdated: "45 min ago",
      isTracking: true,
      accuracy: 85,
    },
  ];

  const filteredInsights =
    activeTab === "all"
      ? insights
      : insights.filter(
          (insight) =>
            insight.category.toLowerCase().replace(" ", "-") === activeTab,
        );

  const handleRefresh = () => {
    setLoading(true);
    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return "text-green-600";
    if (accuracy >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccuracyIcon = (accuracy) => {
    if (accuracy >= 90)
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (accuracy >= 80)
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="AI Insights" />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-6 pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Brain className="h-7 w-7 text-indigo-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Market Insights
                </h1>
                <div className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-500">AI Engine</span>
                  <Switch
                    checked={aiEnabled}
                    onCheckedChange={setAiEnabled}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg shadow-sm p-2 flex items-center space-x-3">
                  <div className="flex items-center">
                    {getAccuracyIcon(accuracyMetrics.overall)}
                    <div className="ml-2">
                      <div className="text-xs text-gray-500">AI Accuracy</div>
                      <div
                        className={`text-sm font-semibold ${getAccuracyColor(accuracyMetrics.overall)}`}
                      >
                        {accuracyMetrics.overall}%
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleRefresh}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
                  disabled={loading || !aiEnabled}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  {loading ? "Analyzing..." : "Refresh Analysis"}
                </Button>
              </div>
            </div>

            {!aiEnabled && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-amber-800 text-sm">
                  AI analysis is currently disabled. Enable AI to receive
                  real-time market insights and predictions.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-amber-300 text-amber-700 hover:bg-amber-100"
                  onClick={() => setAiEnabled(true)}
                >
                  Enable AI
                </Button>
              </div>
            )}

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all">All Insights</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>
            </Tabs>

            {aiEnabled ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AIInsightBox
                      title={insight.title}
                      category={insight.category}
                      summary={insight.summary}
                      status={
                        insight.status as "positive" | "negative" | "neutral"
                      }
                      lastUpdated={insight.lastUpdated}
                      isTracking={insight.isTracking}
                    />
                    <div className="mt-2 flex items-center justify-between px-2">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">
                          AI Confidence:
                        </span>
                        <span
                          className={`text-xs font-medium ${getAccuracyColor(insight.accuracy)}`}
                        >
                          {insight.accuracy}%
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1 text-indigo-500" />
                        Live Data
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-gray-50 border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-gray-400 flex justify-between">
                        <span>AI Insight Disabled</span>
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Brain className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-8 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                AI Accuracy Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      Historical Accuracy by Sector
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Stocks</span>
                          <span className="text-sm font-medium">
                            {accuracyMetrics.stocks}%
                          </span>
                        </div>
                        <Progress
                          value={accuracyMetrics.stocks}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Real Estate
                          </span>
                          <span className="text-sm font-medium">
                            {accuracyMetrics.realEstate}%
                          </span>
                        </div>
                        <Progress
                          value={accuracyMetrics.realEstate}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Cryptocurrency
                          </span>
                          <span className="text-sm font-medium">
                            {accuracyMetrics.crypto}%
                          </span>
                        </div>
                        <Progress
                          value={accuracyMetrics.crypto}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      Recent AI Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[180px]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">NASDAQ Composite</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            96% Accurate
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <div className="flex items-center">
                            <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-sm">Housing Prices NYC</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            93% Accurate
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Bitcoin Price</span>
                          </div>
                          <Badge variant="outline" className="bg-yellow-50">
                            <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
                            82% Accurate
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <div className="flex items-center">
                            <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-sm">Oil Futures</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            91% Accurate
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">S&P 500</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            95% Accurate
                          </Badge>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIInsights;
