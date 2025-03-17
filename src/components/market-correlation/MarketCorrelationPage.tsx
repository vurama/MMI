import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Zap,
  Calendar,
  Filter,
  RefreshCw,
} from "lucide-react";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import CorrelationHeatmap from "./CorrelationHeatmap";
import CorrelationScatterPlot from "./CorrelationScatterPlot";
import CorrelationTimeline from "./CorrelationTimeline";
import MarketEventCorrelation from "./MarketEventCorrelation";
import DiversificationSuggestions from "./DiversificationSuggestions";
import RiskAssessment from "./RiskAssessment";

const MarketCorrelationPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("3m");
  const [selectedAssetPair, setSelectedAssetPair] = useState("btc-sp500");
  const [isLoading, setIsLoading] = useState(false);
  const [correlationData, setCorrelationData] = useState<any>(null);
  const { overallScore: sentimentScore } = useMarketSentiment();

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCorrelationData({
        heatmapData: generateMockHeatmapData(),
        timelineData: generateMockTimelineData(),
        scatterData: generateMockScatterData(),
        marketEvents: generateMockMarketEvents(),
        diversificationSuggestions: generateMockDiversificationSuggestions(),
        riskAssessment: generateMockRiskAssessment(),
      });
      setIsLoading(false);
    }, 1000);
  }, [selectedTimeframe, selectedAssetPair]);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCorrelationData({
        heatmapData: generateMockHeatmapData(),
        timelineData: generateMockTimelineData(),
        scatterData: generateMockScatterData(),
        marketEvents: generateMockMarketEvents(),
        diversificationSuggestions: generateMockDiversificationSuggestions(),
        riskAssessment: generateMockRiskAssessment(),
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout activeItem="Market Correlation AI">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Brain className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              Market Correlation AI
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Analyze correlations between asset classes and make informed
              portfolio decisions
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Select
              value={selectedTimeframe}
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger className="w-[120px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="5y">5 Years</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Current Correlations
              </CardTitle>
              <CardDescription>
                Real-time correlation strength between major assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">BTC / S&P 500</span>
                    <div className="flex items-center">
                      <Badge
                        variant={getCorrelationBadgeVariant(0.72)}
                        className="mr-2"
                      >
                        0.72
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Strong
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ETH / NASDAQ</span>
                    <div className="flex items-center">
                      <Badge
                        variant={getCorrelationBadgeVariant(0.68)}
                        className="mr-2"
                      >
                        0.68
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Strong
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Gold / USD</span>
                    <div className="flex items-center">
                      <Badge
                        variant={getCorrelationBadgeVariant(-0.42)}
                        className="mr-2"
                      >
                        -0.42
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Moderate
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Oil / EUR</span>
                    <div className="flex items-center">
                      <Badge
                        variant={getCorrelationBadgeVariant(0.21)}
                        className="mr-2"
                      >
                        0.21
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Weak
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">BTC / Gold</span>
                    <div className="flex items-center">
                      <Badge
                        variant={getCorrelationBadgeVariant(-0.18)}
                        className="mr-2"
                      >
                        -0.18
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Weak
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                Correlation Alerts
              </CardTitle>
              <CardDescription>
                Significant changes in asset correlations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800 dark:text-red-300">
                          BTC/S&P 500 Correlation Spike
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                          Correlation increased from 0.45 to 0.72 in the last
                          week, suggesting increased market risk.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-300">
                          Gold/USD Correlation Shift
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                          Negative correlation strengthening, potential hedging
                          opportunity against inflation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                AI Insights
              </CardTitle>
              <CardDescription>
                AI-generated correlation insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                    <div className="flex items-start">
                      <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-200">
                          <span className="font-medium">
                            Crypto-Equity Correlation:
                          </span>{" "}
                          The strong correlation between crypto and equities
                          suggests a risk-on environment. Consider balancing
                          with uncorrelated assets like certain commodities.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                    <div className="flex items-start">
                      <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-200">
                          <span className="font-medium">
                            Hedging Opportunity:
                          </span>{" "}
                          Gold's negative correlation with USD is strengthening,
                          making it a potential hedge against dollar weakness
                          and inflation concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="correlation-analysis" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="correlation-analysis">
              Correlation Analysis
            </TabsTrigger>
            <TabsTrigger value="market-events">Market Events</TabsTrigger>
            <TabsTrigger value="diversification">Diversification</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="correlation-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Correlation Heatmap</CardTitle>
                  <CardDescription>
                    Visual representation of correlations between major assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Correlation Heatmap Visualization
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Correlation Timeline</CardTitle>
                  <CardDescription>
                    How correlations have changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Select
                      value={selectedAssetPair}
                      onValueChange={setSelectedAssetPair}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset pair" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc-sp500">BTC / S&P 500</SelectItem>
                        <SelectItem value="eth-nasdaq">ETH / NASDAQ</SelectItem>
                        <SelectItem value="gold-usd">Gold / USD</SelectItem>
                        <SelectItem value="oil-eur">Oil / EUR</SelectItem>
                        <SelectItem value="btc-gold">BTC / Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {isLoading ? (
                    <div className="h-[250px] flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[250px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Correlation Timeline Chart
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Correlation Scatter Plot</CardTitle>
                <CardDescription>
                  Price movements of selected asset pairs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select
                    value={selectedAssetPair}
                    onValueChange={setSelectedAssetPair}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset pair" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc-sp500">BTC / S&P 500</SelectItem>
                      <SelectItem value="eth-nasdaq">ETH / NASDAQ</SelectItem>
                      <SelectItem value="gold-usd">Gold / USD</SelectItem>
                      <SelectItem value="oil-eur">Oil / EUR</SelectItem>
                      <SelectItem value="btc-gold">BTC / Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Correlation Scatter Plot
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Events Impact</CardTitle>
                <CardDescription>
                  How major market events affected asset correlations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">
                        Fed Interest Rate Hike - June 2023
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Before Event
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>BTC / S&P 500</span>
                              <Badge variant={getCorrelationBadgeVariant(0.45)}>
                                0.45
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Gold / USD</span>
                              <Badge
                                variant={getCorrelationBadgeVariant(-0.32)}
                              >
                                -0.32
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            After Event
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>BTC / S&P 500</span>
                              <Badge variant={getCorrelationBadgeVariant(0.68)}>
                                0.68
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Gold / USD</span>
                              <Badge
                                variant={getCorrelationBadgeVariant(-0.41)}
                              >
                                -0.41
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          AI Analysis
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          The Fed rate hike strengthened the correlation between
                          crypto and equities, indicating that both are now more
                          sensitive to monetary policy. Gold's negative
                          correlation with USD also increased, reinforcing its
                          role as an inflation hedge.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">
                        Banking Crisis - March 2023
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Before Event
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>BTC / Bank Stocks</span>
                              <Badge variant={getCorrelationBadgeVariant(0.38)}>
                                0.38
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Gold / Bank Stocks</span>
                              <Badge variant={getCorrelationBadgeVariant(0.25)}>
                                0.25
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            After Event
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>BTC / Bank Stocks</span>
                              <Badge
                                variant={getCorrelationBadgeVariant(-0.15)}
                              >
                                -0.15
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Gold / Bank Stocks</span>
                              <Badge
                                variant={getCorrelationBadgeVariant(-0.32)}
                              >
                                -0.32
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          AI Analysis
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          During the banking crisis, Bitcoin and Gold both
                          decoupled from bank stocks, showing their potential as
                          safe havens during banking system stress. This
                          suggests they may serve as effective hedges during
                          financial system instability.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diversification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diversification Suggestions</CardTitle>
                <CardDescription>
                  AI-powered portfolio diversification recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                      <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                        Crypto-Heavy Portfolio
                      </h3>
                      <p className="text-sm text-indigo-700 dark:text-indigo-200 mb-4">
                        For portfolios with significant crypto exposure,
                        consider these diversification strategies:
                      </p>
                      <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-200">
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Add Gold Exposure (20%):</strong> Gold's
                            weak negative correlation with Bitcoin (-0.18)
                            provides a natural hedge.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Consider Value Stocks (15%):</strong> Value
                            stocks are less correlated with crypto than
                            growth/tech stocks.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Add Treasury Bonds (15%):</strong>{" "}
                            Government bonds show negative correlation during
                            market stress.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
                        Stock-Heavy Portfolio
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-200 mb-4">
                        For portfolios with significant stock market exposure,
                        consider these diversification strategies:
                      </p>
                      <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Add Commodities (15%):</strong> Particularly
                            gold and agricultural commodities which show lower
                            correlation to equities.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Consider Defensive Sectors (20%):</strong>{" "}
                            Utilities and consumer staples typically have lower
                            correlation with broader market.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>International Markets (15%):</strong>{" "}
                            Emerging markets can provide diversification
                            benefits despite some correlation.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
                      <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
                        Balanced Portfolio
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-200 mb-4">
                        For a balanced approach with optimal diversification
                        based on current correlations:
                      </p>
                      <ul className="space-y-2 text-sm text-green-700 dark:text-green-200">
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>US Equities (30%):</strong> Focus on a mix
                            of growth and value stocks across sectors.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>International Equities (15%):</strong>{" "}
                            Developed and emerging markets for geographical
                            diversification.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Fixed Income (25%):</strong> Mix of
                            government and corporate bonds of varying durations.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Commodities (10%):</strong> Gold and broad
                            commodity exposure for inflation protection.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Crypto (10%):</strong> Limited allocation to
                            major cryptocurrencies for growth potential.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Real Estate (10%):</strong> REITs provide
                            income and moderate correlation to other assets.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk-assessment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>
                  Current market conditions and correlation-based risk analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">
                        Current Market Risk Assessment
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30 flex flex-col items-center justify-center">
                          <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                            Overall Risk Level
                          </h4>
                          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            Moderate
                          </span>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30 flex flex-col items-center justify-center">
                          <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                            Correlation Risk
                          </h4>
                          <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                            High
                          </span>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 flex flex-col items-center justify-center">
                          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                            Market Sentiment
                          </h4>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {sentimentScore}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Risk Factors
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400 mt-1.5 mr-2"></span>
                            <span>
                              <strong>High Asset Correlation:</strong> Crypto
                              and equities are showing unusually high
                              correlation (0.72), reducing diversification
                              benefits.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5 mr-2"></span>
                            <span>
                              <strong>Inflation Concerns:</strong> Strengthening
                              negative correlation between gold and USD suggests
                              growing inflation concerns.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
                            <span>
                              <strong>Diversification Opportunity:</strong>{" "}
                              Commodities and defensive sectors are showing
                              lower correlation with risk assets.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                      <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                        AI Risk Adjustment Recommendations
                      </h3>
                      <p className="text-sm text-indigo-700 dark:text-indigo-200 mb-4">
                        Based on current correlation patterns, consider these
                        risk adjustments:
                      </p>
                      <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-200">
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Reduce Correlated Positions:</strong>{" "}
                            Consider trimming positions in both crypto and
                            high-growth tech stocks, as their high correlation
                            (0.72) increases portfolio volatility.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Increase Gold Allocation:</strong> The
                            strengthening negative correlation between gold and
                            USD (-0.42) makes it an effective hedge against
                            inflation and dollar weakness.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Consider Sector Rotation:</strong> Shift
                            from growth to value and defensive sectors to reduce
                            correlation risk in the equity portion of your
                            portfolio.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
                          <span>
                            <strong>Monitor Correlation Changes:</strong> Set up
                            alerts for significant correlation shifts between
                            major asset classes to adjust your strategy
                            accordingly.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Helper function to determine badge variant based on correlation value
const getCorrelationBadgeVariant = (value: number) => {
  const absValue = Math.abs(value);
  if (absValue >= 0.7) return value >= 0 ? "default" : "destructive";
  if (absValue >= 0.4) return value >= 0 ? "secondary" : "outline";
  return "outline";
};

// Mock data generation functions
const generateMockHeatmapData = () => {
  return [
    { asset1: "BTC", asset2: "S&P 500", correlation: 0.72 },
    { asset1: "ETH", asset2: "NASDAQ", correlation: 0.68 },
    { asset1: "Gold", asset2: "USD", correlation: -0.42 },
    { asset1: "Oil", asset2: "EUR", correlation: 0.21 },
    { asset1: "BTC", asset2: "Gold", correlation: -0.18 },
  ];
};

const generateMockTimelineData = () => {
  return [
    { date: "2023-01", btcSp500: 0.35, ethNasdaq: 0.42, goldUsd: -0.22 },
    { date: "2023-02", btcSp500: 0.38, ethNasdaq: 0.45, goldUsd: -0.25 },
    { date: "2023-03", btcSp500: 0.42, ethNasdaq: 0.48, goldUsd: -0.28 },
    { date: "2023-04", btcSp500: 0.48, ethNasdaq: 0.52, goldUsd: -0.3 },
    { date: "2023-05", btcSp500: 0.55, ethNasdaq: 0.58, goldUsd: -0.32 },
    { date: "2023-06", btcSp500: 0.68, ethNasdaq: 0.65, goldUsd: -0.38 },
    { date: "2023-07", btcSp500: 0.72, ethNasdaq: 0.68, goldUsd: -0.42 },
  ];
};

const generateMockScatterData = () => {
  return [
    { btcReturn: 2.3, sp500Return: 1.2 },
    { btcReturn: -1.8, sp500Return: -0.8 },
    { btcReturn: 3.5, sp500Return: 1.5 },
    { btcReturn: -2.1, sp500Return: -1.1 },
    { btcReturn: 1.7, sp500Return: 0.9 },
    { btcReturn: -3.2, sp500Return: -1.4 },
    { btcReturn: 4.1, sp500Return: 1.8 },
  ];
};

const generateMockMarketEvents = () => {
  return [
    {
      event: "Fed Interest Rate Hike",
      date: "2023-06-15",
      beforeCorrelations: { btcSp500: 0.45, goldUsd: -0.32 },
      afterCorrelations: { btcSp500: 0.68, goldUsd: -0.41 },
    },
    {
      event: "Banking Crisis",
      date: "2023-03-10",
      beforeCorrelations: { btcBanks: 0.38, goldBanks: 0.25 },
      afterCorrelations: { btcBanks: -0.15, goldBanks: -0.32 },
    },
  ];
};

const generateMockDiversificationSuggestions = () => {
  return {
    cryptoHeavy: [
      {
        asset: "Gold",
        allocation: 20,
        reason: "Negative correlation with Bitcoin",
      },
      {
        asset: "Value Stocks",
        allocation: 15,
        reason: "Less correlated with crypto than growth stocks",
      },
      {
        asset: "Treasury Bonds",
        allocation: 15,
        reason: "Negative correlation during market stress",
      },
    ],
    stockHeavy: [
      {
        asset: "Commodities",
        allocation: 15,
        reason: "Lower correlation to equities",
      },
      {
        asset: "Defensive Sectors",
        allocation: 20,
        reason: "Lower correlation with broader market",
      },
      {
        asset: "Emerging Markets",
        allocation: 15,
        reason: "Geographical diversification",
      },
    ],
    balanced: [
      { asset: "US Equities", allocation: 30, reason: "Core growth component" },
      {
        asset: "International Equities",
        allocation: 15,
        reason: "Geographical diversification",
      },
      { asset: "Fixed Income", allocation: 25, reason: "Stability and income" },
      { asset: "Commodities", allocation: 10, reason: "Inflation protection" },
      { asset: "Crypto", allocation: 10, reason: "Growth potential" },
      {
        asset: "Real Estate",
        allocation: 10,
        reason: "Income and moderate correlation",
      },
    ],
  };
};

const generateMockRiskAssessment = () => {
  return {
    overallRisk: "Moderate",
    correlationRisk: "High",
    riskFactors: [
      {
        factor: "High Asset Correlation",
        severity: "high",
        description: "Crypto and equities showing unusually high correlation",
      },
      {
        factor: "Inflation Concerns",
        severity: "medium",
        description: "Strengthening negative correlation between gold and USD",
      },
      {
        factor: "Diversification Opportunity",
        severity: "low",
        description:
          "Commodities and defensive sectors showing lower correlation",
      },
    ],
    recommendations: [
      {
        action: "Reduce Correlated Positions",
        description:
          "Trim positions in both crypto and high-growth tech stocks",
      },
      {
        action: "Increase Gold Allocation",
        description: "Effective hedge against inflation and dollar weakness",
      },
      {
        action: "Consider Sector Rotation",
        description: "Shift from growth to value and defensive sectors",
      },
      {
        action: "Monitor Correlation Changes",
        description: "Set up alerts for significant correlation shifts",
      },
    ],
  };
};

export default MarketCorrelationPage;
