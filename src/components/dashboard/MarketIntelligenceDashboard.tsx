import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  RefreshCw,
  Info,
  Briefcase,
  Building,
  Coins,
  DollarSign,
  BarChart2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Clock,
  Globe,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";
import RealTimeDataActivator from "./RealTimeDataActivator";
import MarketSentimentCore from "./MarketSentimentCore";
import MarketMetricGauge from "./MarketMetricGauge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useMarketIntelligenceData } from "@/hooks/useMarketIntelligenceData";
import { supabase } from "@/supabase/supabase";

interface MarketIntelligenceDashboardProps {
  className?: string;
}

const MarketIntelligenceDashboard: React.FC<
  MarketIntelligenceDashboardProps
> = ({ className = "" }) => {
  const [activeCategory, setActiveCategory] = useState<string>("stocks");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("us");

  // Use the hook to fetch market intelligence data
  const { data: marketData, loading, error } = useMarketIntelligenceData();

  // Market categories
  const marketCategories = [
    {
      id: "stocks",
      name: "Stocks",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
    },
    { id: "crypto", name: "Crypto", icon: <Coins className="h-4 w-4 mr-2" /> },
    {
      id: "indices",
      name: "Indices",
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
    },
    {
      id: "forex",
      name: "Currency",
      icon: <DollarSign className="h-4 w-4 mr-2" />,
    },
    {
      id: "realestate",
      name: "Real Estate",
      icon: <Building className="h-4 w-4 mr-2" />,
    },
  ];

  // Handle refresh action
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Trigger a refresh of the data by listening to the Supabase realtime channel
      const channel = supabase
        .channel("market-intelligence-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "market_intelligence",
          },
          (payload) => {
            console.log("New market intelligence data received:", payload);
            // The useMarketIntelligenceData hook will automatically refresh
          },
        )
        .subscribe();

      // Simulate refresh delay
      setTimeout(() => {
        setIsRefreshing(false);
        // Clean up the subscription
        supabase.removeChannel(channel);
      }, 1500);
    } catch (error) {
      console.error("Error refreshing data:", error);
      setIsRefreshing(false);
    }
  };

  // Get sentiment category based on score
  const getSentimentCategory = (score: number) => {
    if (score >= 70) return "Bullish";
    if (score >= 55) return "Moderately Bullish";
    if (score >= 45) return "Neutral";
    if (score >= 30) return "Moderately Bearish";
    return "Bearish";
  };

  // Get color based on sentiment score
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-500";
    if (score >= 55) return "text-lime-600 dark:text-lime-500";
    if (score >= 45) return "text-gray-500 dark:text-gray-400";
    if (score >= 30) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  // Get background color based on sentiment score
  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 55) return "bg-lime-100 dark:bg-lime-900/30";
    if (score >= 45) return "bg-gray-100 dark:bg-gray-800";
    if (score >= 30) return "bg-orange-100 dark:bg-orange-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  // Data feeds are always active by default
  const [dataFeedsActive, setDataFeedsActive] = useState<boolean>(true);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Market Intelligence Dashboard
          {dataFeedsActive && (
            <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Live Data
            </Badge>
          )}
          {loading && (
            <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Loading...
            </Badge>
          )}
          {error && (
            <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
              Error: Using Default Data
            </Badge>
          )}
        </h2>
        <Button
          onClick={handleRefresh}
          className="mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          disabled={isRefreshing || loading}
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing || loading ? "animate-spin" : ""}`}
          />
          {isRefreshing
            ? "Updating..."
            : loading
              ? "Loading..."
              : "Refresh Data"}
        </Button>
      </div>

      {/* Category Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Market Category
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Choose a market category to view specialized intelligence and
                  sentiment data
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {marketCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`flex items-center ${activeCategory === category.id ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Country selector for real estate */}
        {activeCategory === "realestate" && (
          <div className="mt-4 flex items-center">
            <Globe className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="text-sm border border-gray-200 rounded-md p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="sg">Singapore</option>
            </select>
          </div>
        )}
      </div>

      {/* Overall Market Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {activeCategory.charAt(0).toUpperCase() +
                  activeCategory.slice(1)}{" "}
                Market Outlook
              </h3>
              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {marketData.overallSentiment[activeCategory].timeframe}
              </Badge>
            </div>

            <div className="flex items-center mb-4">
              <div
                className={`text-3xl font-bold ${getScoreColor(marketData.overallSentiment[activeCategory].score)}`}
              >
                {marketData.overallSentiment[activeCategory].score}
              </div>
              <div className="ml-2 flex items-center">
                {marketData.overallSentiment[activeCategory].trend > 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={
                    marketData.overallSentiment[activeCategory].trend > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {Math.abs(marketData.overallSentiment[activeCategory].trend)}%
                </span>
              </div>
            </div>

            <div
              className={`px-3 py-2 rounded-lg ${getScoreBgColor(marketData.overallSentiment[activeCategory].score)}`}
            >
              <div className="font-medium mb-1">
                {getSentimentCategory(
                  marketData.overallSentiment[activeCategory].score,
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Updated {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-full">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  AI Market Analysis
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {marketData.overallSentiment[activeCategory].analysis}
              </p>

              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-amber-500" />
                  Top{" "}
                  {activeCategory.charAt(0).toUpperCase() +
                    activeCategory.slice(1)}{" "}
                  Recommendations
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {marketData.topAssetsByMarket[activeCategory].map((asset) => (
                    <div
                      key={asset.symbol}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-2 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className="text-xs text-gray-500">
                          {asset.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={
                            asset.action === "long"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {asset.action.toUpperCase()}
                        </div>
                        <div className="text-xs">{asset.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Market Sentiment Core */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Market Sentiment Analysis
          <Badge className="ml-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </Badge>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <MarketSentimentCore
              category={activeCategory}
              showDetails={true}
              className="h-full"
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
              AI Sentiment Summary
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {activeCategory === "stocks" &&
                "Our AI analysis indicates moderately bullish sentiment in equity markets, with institutional investors showing increased buying activity in technology and financial sectors. Retail sentiment remains cautiously optimistic, suggesting continued market strength with potential for sector rotation."}
              {activeCategory === "crypto" &&
                "Cryptocurrency sentiment shows mixed signals with Bitcoin dominance increasing as investors seek relative safety. DeFi protocols are experiencing moderate stress while volatility metrics suggest potential for significant price movements in the coming days. Approach with selective positioning in established assets."}
              {activeCategory === "indices" &&
                "Global indices display positive momentum with developed markets outperforming emerging markets. Economic data continues to exceed expectations, supporting current valuations. Sector rotation from defensive to cyclical stocks indicates growing risk appetite among institutional investors."}
              {activeCategory === "forex" &&
                "Currency markets show weakness in the US Dollar against major pairs, creating a supportive environment for multinational corporations and commodities. Increasing policy divergence between major central banks is driving directional trends in key currency pairs."}
              {activeCategory === "realestate" &&
                "Real estate markets are experiencing cooling trends, particularly in residential properties where rising mortgage rates are pressuring affordability. Commercial real estate presents a bifurcated picture with office and retail facing challenges while industrial, data centers, and healthcare properties demonstrate resilience."}
            </p>
            <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Market Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {marketData.marketMetrics[activeCategory].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MarketMetricGauge
              title={metric.title}
              score={metric.score}
              trend={metric.trend}
              analysis={metric.analysis}
              tooltipText={`${metric.title} measures market conditions for ${activeCategory} based on AI analysis of multiple data sources.`}
              className="h-full"
              isLive={dataFeedsActive}
            />
          </motion.div>
        ))}
      </div>

      {/* Data Feeds are now always active by default */}

      {/* Key Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-amber-500" />
          Key {activeCategory.charAt(0).toUpperCase() +
            activeCategory.slice(1)}{" "}
          Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/30">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Opportunities
            </h4>
            <ul className="space-y-2 text-sm">
              {activeCategory === "stocks" && (
                <>
                  <li className="flex items-start">
                    • Technology sector showing strong momentum, particularly
                    semiconductors
                  </li>
                  <li className="flex items-start">
                    • Financial stocks benefiting from potential rate stability
                  </li>
                  <li className="flex items-start">
                    • Healthcare innovation driving selective opportunities
                  </li>
                </>
              )}
              {activeCategory === "crypto" && (
                <>
                  <li className="flex items-start">
                    • Layer-1 scaling solutions gaining adoption
                  </li>
                  <li className="flex items-start">
                    • Bitcoin showing relative strength as a defensive asset
                  </li>
                  <li className="flex items-start">
                    • Infrastructure tokens outperforming broader market
                  </li>
                </>
              )}
              {activeCategory === "indices" && (
                <>
                  <li className="flex items-start">
                    • US and European indices showing technical strength
                  </li>
                  <li className="flex items-start">
                    • Cyclical sectors outperforming defensive sectors
                  </li>
                  <li className="flex items-start">
                    • Small caps showing signs of relative improvement
                  </li>
                </>
              )}
              {activeCategory === "forex" && (
                <>
                  <li className="flex items-start">
                    • Commodity currencies benefiting from resource demand
                  </li>
                  <li className="flex items-start">
                    • EUR/USD potential upside on ECB policy expectations
                  </li>
                  <li className="flex items-start">
                    • Emerging market currencies showing selective strength
                  </li>
                </>
              )}
              {activeCategory === "realestate" && (
                <>
                  <li className="flex items-start">
                    • Industrial and logistics properties maintaining strength
                  </li>
                  <li className="flex items-start">
                    • Data center REITs benefiting from AI infrastructure demand
                  </li>
                  <li className="flex items-start">
                    • Healthcare properties showing defensive characteristics
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-100 dark:border-red-800/30">
            <h4 className="font-medium text-red-800 dark:text-red-300 mb-2 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Risk Factors
            </h4>
            <ul className="space-y-2 text-sm">
              {activeCategory === "stocks" && (
                <>
                  <li className="flex items-start">
                    • Potential Fed policy shifts could introduce volatility
                  </li>
                  <li className="flex items-start">
                    • Valuation concerns in high-growth technology names
                  </li>
                  <li className="flex items-start">
                    • Geopolitical tensions affecting global supply chains
                  </li>
                </>
              )}
              {activeCategory === "crypto" && (
                <>
                  <li className="flex items-start">
                    • Regulatory uncertainty remains a key concern
                  </li>
                  <li className="flex items-start">
                    • DeFi protocols facing liquidity and security challenges
                  </li>
                  <li className="flex items-start">
                    • NFT market correction affecting related tokens
                  </li>
                </>
              )}
              {activeCategory === "indices" && (
                <>
                  <li className="flex items-start">
                    • Inflation concerns could pressure valuations
                  </li>
                  <li className="flex items-start">
                    • Emerging markets underperforming on dollar strength
                  </li>
                  <li className="flex items-start">
                    • Potential for profit-taking after extended rally
                  </li>
                </>
              )}
              {activeCategory === "forex" && (
                <>
                  <li className="flex items-start">
                    • Central bank policy surprises could trigger volatility
                  </li>
                  <li className="flex items-start">
                    • Geopolitical events affecting safe-haven flows
                  </li>
                  <li className="flex items-start">
                    • Economic data divergence creating uncertainty
                  </li>
                </>
              )}
              {activeCategory === "realestate" && (
                <>
                  <li className="flex items-start">
                    • Rising mortgage rates pressuring residential demand
                  </li>
                  <li className="flex items-start">
                    • Office and retail properties facing structural challenges
                  </li>
                  <li className="flex items-start">
                    • Interest rate concerns affecting REIT valuations
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-100 dark:border-purple-800/30">
            <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              AI Recommendations
            </h4>
            <ul className="space-y-2 text-sm">
              {activeCategory === "stocks" && (
                <>
                  <li className="flex items-start">
                    • Focus on quality companies with strong cash flows
                  </li>
                  <li className="flex items-start">
                    • Consider selective exposure to semiconductor sector
                  </li>
                  <li className="flex items-start">
                    • Maintain balanced sector allocation with defensive
                    positions
                  </li>
                </>
              )}
              {activeCategory === "crypto" && (
                <>
                  <li className="flex items-start">
                    • Prioritize established assets with strong fundamentals
                  </li>
                  <li className="flex items-start">
                    • Consider reduced exposure to speculative altcoins
                  </li>
                  <li className="flex items-start">
                    • Monitor regulatory developments closely
                  </li>
                </>
              )}
              {activeCategory === "indices" && (
                <>
                  <li className="flex items-start">
                    • Favor developed markets over emerging markets
                  </li>
                  <li className="flex items-start">
                    • Consider cyclical sector exposure with quality focus
                  </li>
                  <li className="flex items-start">
                    • Implement hedging strategies for potential volatility
                  </li>
                </>
              )}
              {activeCategory === "forex" && (
                <>
                  <li className="flex items-start">
                    • Monitor central bank communication for policy shifts
                  </li>
                  <li className="flex items-start">
                    • Consider positions aligned with policy divergence trends
                  </li>
                  <li className="flex items-start">
                    • Implement risk management for upcoming data releases
                  </li>
                </>
              )}
              {activeCategory === "realestate" && (
                <>
                  <li className="flex items-start">
                    • Focus on specialized REITs with strong fundamentals
                  </li>
                  <li className="flex items-start">
                    • Reduce exposure to office and retail properties
                  </li>
                  <li className="flex items-start">
                    • Consider selective opportunities in affordable markets
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketIntelligenceDashboard;
