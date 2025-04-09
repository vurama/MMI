import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  LineChart,
  BarChart2,
  Brain,
  Info,
  Calculator,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BarChart,
  Activity,
  TrendingUp as TrendingUpIcon,
  BarChart4,
  Scale,
} from "lucide-react";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";
import { useRealTimeMarketData } from "@/hooks/useRealTimeMarketData";

interface DataInsightsProjectionsProps {
  className?: string;
  realEstateCompanies: Array<{
    id: number;
    name: string;
    ticker: string;
    price: number;
    change: number;
    volume: number;
    avgVolume: number;
    sentiment: number;
  }>;
}

const DataInsightsProjections: React.FC<DataInsightsProjectionsProps> = ({
  className,
  realEstateCompanies = [],
}) => {
  const [showFormulas, setShowFormulas] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [realTimeData, setRealTimeData] = useState<any>(null);

  // Use our custom hooks
  const marketSentiment = useMarketSentiment();
  const realTimeMarketData = useRealTimeMarketData();

  // Track last refresh time to prevent too frequent updates
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  // Separate function for fetching data to improve readability and maintainability
  const fetchRealTimeData = async (force = false) => {
    // Skip if no companies data
    if (!realEstateCompanies || !Array.isArray(realEstateCompanies)) {
      return;
    }

    // Check if we should refresh based on time elapsed (unless forced)
    if (!force && lastRefreshTime) {
      const now = new Date();
      const elapsedMs = now.getTime() - lastRefreshTime.getTime();
      const FIVE_MINUTES_MS = 300000;

      if (elapsedMs < FIVE_MINUTES_MS) {
        console.log(
          `Skipping refresh, only ${Math.round(elapsedMs / 1000)}s elapsed since last refresh`,
        );
        return;
      }
    }

    // Only set loading on initial load, not on refreshes
    if (!realTimeData) {
      setIsLoading(true);
    }

    try {
      // Create a stable copy of the data to work with
      const companiesSnapshot = [...realEstateCompanies];

      // Fetch real-time data for each company
      const dataPromises = companiesSnapshot.map(async (company) => {
        try {
          // Get sentiment data
          const sentiment = await marketSentiment?.getSentiment?.(
            company.ticker,
          );

          // Get real-time market data
          const marketData = await realTimeMarketData?.getRealTimeData?.(
            company.ticker,
          );

          return {
            id: company.id,
            name: company.name,
            ticker: company.ticker,
            sentiment: sentiment?.score || company.sentiment,
            price: marketData?.price || company.price,
            change: marketData?.change || company.change,
            volume: marketData?.volume || company.volume,
            avgVolume: marketData?.avgVolume || company.avgVolume,
            lastUpdated: new Date().toISOString(),
          };
        } catch (err) {
          // Handle individual company fetch errors gracefully
          console.warn(`Error fetching data for ${company.ticker}:`, err);
          return company;
        }
      });

      const results = await Promise.all(dataPromises);

      // Update the refresh timestamp
      setLastRefreshTime(new Date());

      // Update the data state
      setRealTimeData(results);
      console.log(
        "Real-time data refreshed at",
        new Date().toLocaleTimeString(),
      );
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      // Fallback to the provided data if there's an error
      if (!realTimeData) {
        setRealTimeData(realEstateCompanies);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchRealTimeData(true);

    // Set up a refresh interval (every 5 minutes = 300000 ms)
    const FIVE_MINUTES_MS = 300000;
    const intervalId = setInterval(
      () => fetchRealTimeData(false),
      FIVE_MINUTES_MS,
    );

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      console.log("Cleared real-time data refresh interval");
    };
  }, []); // Empty dependency array to prevent re-creating the interval

  // Handle prop changes separately
  useEffect(() => {
    // Only fetch new data if companies data changes and we have valid data
    if (
      realEstateCompanies &&
      Array.isArray(realEstateCompanies) &&
      realEstateCompanies.length > 0
    ) {
      fetchRealTimeData(true);
    }
  }, [realEstateCompanies]);

  // Memoize display data to prevent unnecessary re-renders
  const displayData = React.useMemo(() => {
    return (
      realTimeData ||
      (realEstateCompanies && Array.isArray(realEstateCompanies)
        ? realEstateCompanies
        : [])
    );
  }, [realTimeData, realEstateCompanies]);

  // Calculate 7-day projections (simulated)
  const getProjectedPrice = (
    currentPrice: number,
    change: number,
    sentiment: number,
  ) => {
    // Enhanced projection formula based on current price, change percentage, and sentiment
    const marketTrend = 1.005; // Slight upward market trend (0.5%)
    const volatilityFactor = Math.abs(change) > 1.5 ? 1.2 : 1.0; // Higher volatility means higher potential movement
    const sentimentFactor =
      sentiment > 0.6 ? 1.03 : sentiment > 0.4 ? 1.0 : 0.97;

    // Calculate projected change with more factors
    const projectedChange =
      change * 1.5 * sentimentFactor * volatilityFactor * marketTrend;

    // Apply to current price
    return +(currentPrice * (1 + projectedChange / 100)).toFixed(2);
  };

  // Get formula explanation for a specific company
  const getFormulaExplanation = (company: any) => {
    const marketTrend = 1.005;
    const volatilityFactor = Math.abs(company.change) > 1.5 ? 1.2 : 1.0;
    const sentimentFactor =
      company.sentiment > 0.6 ? 1.03 : company.sentiment > 0.4 ? 1.0 : 0.97;
    const projectedChange =
      company.change * 1.5 * sentimentFactor * volatilityFactor * marketTrend;
    const projectedPrice = +(
      company.price *
      (1 + projectedChange / 100)
    ).toFixed(2);

    return {
      marketTrend,
      volatilityFactor,
      sentimentFactor,
      projectedChange: +projectedChange.toFixed(2),
      projectedPrice,
      explanation: [
        `Base Price: ${company.price} €`,
        `Recent Change: ${company.change}%`,
        `Market Trend Factor: +0.5%`,
        `Volatility Factor: ${volatilityFactor.toFixed(1)}x`,
        `Sentiment Factor: ${sentimentFactor.toFixed(2)}x`,
        `Projected Change: ${projectedChange > 0 ? "+" : ""}${projectedChange.toFixed(2)}%`,
        `Projected Price: ${projectedPrice} €`,
      ],
    };
  };

  // Generate AI insights based on data with more detailed analysis
  const generateInsight = (company: any) => {
    const priceDirection = company.change > 0 ? "upward" : "downward";
    const volumeStatus =
      company.volume > company.avgVolume ? "above average" : "below average";
    const volumeRatio = +(company.volume / company.avgVolume).toFixed(2);
    const sentimentLevel =
      company.sentiment > 0.6
        ? "positive"
        : company.sentiment > 0.4
          ? "neutral"
          : "negative";

    // Calculate momentum score (combination of price change, volume, and sentiment)
    const momentumScore = +(
      company.change * 0.4 +
      (volumeRatio - 1) * 30 +
      (company.sentiment - 0.5) * 100
    ).toFixed(1);

    // More nuanced recommendation based on multiple factors
    let recommendation = "Monitor closely";
    if (company.sentiment > 0.6 && company.change > 0 && volumeRatio > 1.1) {
      recommendation = "Consider accumulating";
    } else if (company.sentiment > 0.5 && company.change > 0) {
      recommendation = "Watchlist for entry";
    } else if (
      company.sentiment < 0.4 &&
      company.change < 0 &&
      volumeRatio > 1.1
    ) {
      recommendation = "Consider reducing exposure";
    } else if (company.sentiment < 0.4 && company.change < 0) {
      recommendation = "Caution advised";
    }

    // Calculate confidence score with more factors
    const confidenceScore = Math.round(
      company.sentiment * 0.5 + // Sentiment weight
        (Math.min(Math.abs(company.change), 5) / 5) * 0.3 + // Change magnitude (capped at 5%)
        (volumeRatio > 1 ? 0.2 : 0.1) * // Volume factor
          100,
    );

    return {
      text: `${company.name} shows ${priceDirection} price movement (${company.change}%) with ${volumeStatus} trading volume (${volumeRatio}x avg). Market sentiment is ${sentimentLevel} (${(company.sentiment * 100).toFixed(0)}%).`,
      recommendation,
      confidence: confidenceScore,
      momentum: momentumScore,
      details: {
        volumeRatio,
        sentimentScore: +(company.sentiment * 100).toFixed(0),
        momentumScore,
      },
    };
  };

  // Toggle formula visibility for a company
  const toggleFormula = (companyId: number) => {
    setShowFormulas((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }));
  };

  return (
    <Card className={`bg-white shadow-md border border-gray-100 ${className}`}>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl font-bold flex items-center">
          <Brain className="h-5 w-5 text-indigo-600 mr-2" />
          Focus: Data Insights & AI Projections
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          AI-powered analysis and projections based on current market data
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {/* Key Metrics Data Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {isLoading ? (
            // Show loading state
            <div className="col-span-4 flex justify-center items-center py-8">
              <div className="flex items-center space-x-2">
                <div
                  className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <span className="text-sm text-gray-500 ml-2">
                  Loading real-time data...
                </span>
              </div>
            </div>
          ) : (
            // Show data boxes when data is loaded
            // Group metrics by company
            displayData.map((company) => (
              <div
                key={`metrics-group-${company.id}`}
                className="col-span-2 grid grid-cols-2 gap-3"
              >
                <MetricsDataBox
                  title="Sentiment vs Price"
                  company={company.name}
                  value1={`${(company.sentiment * 100).toFixed(0)}%`}
                  value2={`${company.price} €`}
                  icon={<Scale className="h-4 w-4" />}
                  color={
                    company.sentiment > 0.6
                      ? "bg-green-100"
                      : company.sentiment > 0.4
                        ? "bg-amber-100"
                        : "bg-red-100"
                  }
                  tooltip="Correlation between market sentiment and current price. Higher sentiment percentages typically indicate positive market outlook and potential price appreciation. This metric helps identify investment opportunities in real estate markets with strong positive sentiment."
                  isRealTime={!!realTimeData}
                />
                <MetricsDataBox
                  title="Volume vs Average"
                  company={company.name}
                  value1={`${(company.volume / 1000000).toFixed(1)}M`}
                  value2={`${(company.avgVolume / 1000000).toFixed(1)}M`}
                  icon={<BarChart4 className="h-4 w-4" />}
                  color={
                    company.volume > company.avgVolume
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }
                  tooltip="Current trading volume compared to average volume"
                  comparison={
                    company.volume > company.avgVolume
                      ? "+" +
                        (
                          (company.volume / company.avgVolume - 1) *
                          100
                        ).toFixed(0) +
                        "%"
                      : "-" +
                        (
                          (1 - company.volume / company.avgVolume) *
                          100
                        ).toFixed(0) +
                        "%"
                  }
                  isRealTime={!!realTimeData}
                />
              </div>
            ))
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price Projections */}
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center">
                <LineChart className="h-4 w-4 text-indigo-500 mr-2" />
                7-Day Price Projections
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                      >
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">
                        Projections based on price momentum, market sentiment,
                        and trading volume patterns
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <span className="text-sm text-gray-500 ml-2">
                      Loading projections...
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayData.map((company) => {
                    const projectedPrice = getProjectedPrice(
                      company.price,
                      company.change,
                      company.sentiment,
                    );
                    const projectedChange = +(
                      (projectedPrice / company.price - 1) *
                      100
                    ).toFixed(1);
                    const formulaDetails = getFormulaExplanation(company);

                    return (
                      <div
                        key={company.id}
                        className="space-y-2 p-2 border border-gray-100 rounded-lg hover:border-indigo-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-sm font-medium">
                              {company.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">
                              {projectedPrice} €
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5 ml-1 p-0"
                                    >
                                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-xs">
                                      Sentiment percentage reflects market
                                      confidence.
                                      <br />• 70%+ indicates strong positive
                                      outlook
                                      <br />• 40-70% indicates neutral market
                                      conditions
                                      <br />• Below 40% suggests caution
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </span>
                            <Badge
                              variant={
                                projectedChange > 0 ? "default" : "destructive"
                              }
                              className="text-xs"
                            >
                              {projectedChange > 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {projectedChange > 0 ? "+" : ""}
                              {projectedChange}%
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-12 w-12 ml-1 rounded-full hover:bg-indigo-100 shadow-sm border-2 border-indigo-200 hover:border-indigo-300 transition-all"
                              onClick={() => toggleFormula(company.id)}
                            >
                              <Calculator className="h-6 w-6 text-indigo-600" />
                            </Button>
                          </div>
                        </div>

                        {/* Formula Explanation */}
                        {showFormulas[company.id] && (
                          <div className="bg-slate-50 p-2 rounded-md text-xs space-y-1 mt-1 border border-slate-200">
                            <div className="font-medium text-slate-700 mb-1">
                              Projection Formula:
                            </div>
                            {formulaDetails.explanation.map((line, idx) => (
                              <div key={idx} className="flex items-center">
                                {idx <
                                  formulaDetails.explanation.length - 2 && (
                                  <ArrowRight className="h-3 w-3 text-slate-400 mr-1" />
                                )}
                                <span
                                  className={
                                    idx >= formulaDetails.explanation.length - 2
                                      ? "font-medium text-indigo-600"
                                      : ""
                                  }
                                >
                                  {line}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center">
                <Brain className="h-4 w-4 text-indigo-500 mr-2" />
                AI-Generated Insights
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                      >
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">
                        AI analysis based on price action, volume patterns, and
                        market sentiment indicators
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <span className="text-sm text-gray-500 ml-2">
                      Generating insights...
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayData.map((company) => {
                    const insight = generateInsight(company);

                    return (
                      <div
                        key={company.id}
                        className="p-3 border border-gray-100 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium">
                            {company.name}
                          </span>
                          <Badge
                            variant={
                              insight.confidence > 70
                                ? "default"
                                : insight.confidence > 50
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {insight.text}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-medium">
                              Recommendation:{" "}
                              <span className="text-indigo-600 font-semibold">
                                {insight.recommendation}
                              </span>
                            </p>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-xs text-gray-500 underline decoration-dotted cursor-help">
                                    What does this mean?
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="bottom"
                                  className="max-w-xs"
                                >
                                  <p className="text-xs">
                                    <strong>{insight.recommendation}</strong>:
                                    Based on sentiment score, price movement,
                                    and trading volume.
                                    {insight.recommendation ===
                                      "Consider accumulating" &&
                                      " Strong positive indicators suggest potential growth opportunity."}
                                    {insight.recommendation ===
                                      "Watchlist for entry" &&
                                      " Positive indicators but waiting for stronger confirmation signals."}
                                    {insight.recommendation ===
                                      "Monitor closely" &&
                                      " Mixed signals suggest watching for clearer direction."}
                                    {insight.recommendation ===
                                      "Consider reducing exposure" &&
                                      " Negative indicators suggest potential downside risk."}
                                    {insight.recommendation ===
                                      "Caution advised" &&
                                      " Multiple negative signals suggest defensive positioning."}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs mr-1">Momentum:</span>
                            <Badge
                              variant={
                                insight.momentum > 0 ? "default" : "destructive"
                              }
                              className="text-xs"
                            >
                              {insight.momentum > 0 ? "+" : ""}
                              {insight.momentum}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 ml-1 p-0"
                                  >
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="bottom"
                                  className="max-w-xs"
                                >
                                  <p className="text-xs">
                                    Momentum score combines price change (
                                    {(company.change * 0.4).toFixed(1)} pts),
                                    volume ratio (
                                    {(
                                      (insight.details.volumeRatio - 1) *
                                      30
                                    ).toFixed(1)}{" "}
                                    pts), and sentiment (
                                    {((company.sentiment - 0.5) * 100).toFixed(
                                      1,
                                    )}{" "}
                                    pts).
                                    <br />• Positive values indicate upward
                                    momentum
                                    <br />• Negative values indicate downward
                                    pressure
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

// Metrics Data Box Component
interface MetricsDataBoxProps {
  title: string;
  company: string;
  value1: string;
  value2: string;
  icon: React.ReactNode;
  color: string;
  tooltip: string;
  comparison?: string;
  isRealTime?: boolean;
}

import { Popup } from "@/components/ui/popup";

const MetricsDataBox: React.FC<MetricsDataBoxProps> = ({
  title,
  company,
  value1,
  value2,
  icon,
  color,
  tooltip,
  comparison,
  isRealTime = false,
}) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Generate detailed content for the popup based on the metrics type
  const getDetailedContent = () => {
    if (title === "Sentiment vs Price") {
      return (
        <div className="space-y-4">
          <p className="text-sm">
            This metric shows the correlation between market sentiment and
            current price for {company}.
          </p>
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Current Values:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Sentiment Score</p>
                <p className="text-base font-semibold">{value1}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Current Price</p>
                <p className="text-base font-semibold">{value2}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">What This Means:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Higher sentiment percentages typically indicate positive market
                outlook
              </li>
              <li>
                Strong correlation between sentiment and price suggests market
                efficiency
              </li>
              <li>
                Divergence between sentiment and price movement may indicate
                potential investment opportunities
              </li>
            </ul>
          </div>
        </div>
      );
    } else if (title === "Volume vs Average") {
      return (
        <div className="space-y-4">
          <p className="text-sm">
            This metric compares current trading volume with historical average
            volume for {company}.
          </p>
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Current Values:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Current Volume</p>
                <p className="text-base font-semibold">{value1}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Average Volume</p>
                <p className="text-base font-semibold">{value2}</p>
              </div>
            </div>
            {comparison && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Difference</p>
                <p className="text-base font-semibold">{comparison}</p>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-medium mb-2">What This Means:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Higher than average volume may indicate increased market
                interest
              </li>
              <li>Volume spikes often precede significant price movements</li>
              <li>Consistent high volume suggests sustained market activity</li>
            </ul>
          </div>
        </div>
      );
    } else {
      return <p>Detailed information not available for this metric.</p>;
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`${color} rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer`}
              onClick={openPopup}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <div className="p-1 bg-white rounded-full">{icon}</div>
                  <span className="text-xs font-medium">{title}</span>
                </div>
                <span className="text-xs text-gray-500 truncate max-w-[80px]">
                  {company}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold">{value1}</span>
                    {isRealTime && (
                      <span
                        className="ml-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"
                        title="Real-time data"
                      ></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">vs</span>
                  <span className="text-sm font-semibold">{value2}</span>
                </div>
                {comparison && (
                  <Badge
                    variant={
                      comparison.startsWith("+") ? "default" : "secondary"
                    }
                    className="text-xs h-5"
                  >
                    {comparison}
                  </Badge>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{tooltip}</p>
            <p className="text-xs mt-1 text-indigo-600">
              Click for more details
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Detailed Popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title={`${title} - ${company}`}
        className="max-w-lg"
      >
        {getDetailedContent()}
      </Popup>
    </>
  );
};

export default DataInsightsProjections;
