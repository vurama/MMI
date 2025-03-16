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

interface MarketIntelligenceDashboardProps {
  className?: string;
}

const MarketIntelligenceDashboard: React.FC<
  MarketIntelligenceDashboardProps
> = ({ className = "" }) => {
  const [activeCategory, setActiveCategory] = useState<string>("stocks");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("us");

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

  // Overall market sentiment by category
  const overallSentiment = {
    stocks: {
      score: 67,
      trend: 1.2,
      timeframe: "14 days",
      analysis:
        "The aggregated market metrics indicate a moderately bullish outlook for stocks over the next two weeks. Institutional positioning shows accumulation in technology and financial sectors, while retail sentiment remains cautiously optimistic. The weakening dollar is likely to support multinational earnings. Key risks include potential Fed policy shifts and geopolitical tensions that could introduce volatility.",
    },
    crypto: {
      score: 58,
      trend: -2.5,
      timeframe: "14 days",
      analysis:
        "Cryptocurrency markets are showing mixed signals with a slightly bearish bias for the next two weeks. Bitcoin's relative strength compared to altcoins suggests a defensive positioning by investors. Regulatory developments remain a key concern, though institutional adoption continues to provide underlying support. DeFi and NFT sectors may underperform while infrastructure and scaling solutions show resilience.",
    },
    indices: {
      score: 65,
      trend: 0.8,
      timeframe: "14 days",
      analysis:
        "Global indices are displaying neutral to slightly bullish momentum for the coming two weeks. Developed markets are outperforming emerging markets, with US and European indices showing particular strength. Economic data remains supportive, though inflation concerns and central bank policy adjustments could introduce volatility. Sector rotation trends favor cyclicals over defensives.",
    },
    forex: {
      score: 52,
      trend: -0.5,
      timeframe: "14 days",
      analysis:
        "Currency markets indicate a neutral outlook with a slight bearish bias for the US dollar over the next two weeks. Interest rate differentials and central bank policy divergence are key drivers of current trends. Commodity currencies may benefit from resilient raw material prices, while safe-haven currencies could face pressure if risk appetite remains strong. Volatility is expected to increase around upcoming economic data releases.",
    },
    realestate: {
      score: 45,
      trend: -3.2,
      timeframe: "14 days",
      analysis:
        "Real estate markets are showing moderately bearish signals for the coming two weeks. Residential property is experiencing cooling demand due to affordability constraints and rising mortgage rates. Commercial real estate remains bifurcated with office and retail facing challenges while industrial, data centers, and healthcare properties demonstrate resilience. REITs may underperform broader equities in the near term as interest rate concerns persist.",
    },
  };

  // Market metrics data by category
  const marketMetrics = {
    stocks: [
      {
        title: "Market Fear & Greed Index",
        score: 68,
        trend: -3.2,
        analysis:
          "Greed is currently the dominant market emotion, though slightly down from extreme greed levels last week.",
        aiSummary:
          "Investor sentiment remains bullish despite recent volatility in tech stocks. The Fear & Greed Index indicates continued market optimism, though slightly tempered from previous weeks. Consider maintaining equity positions while being selective with new entries.",
      },
      {
        title: "7-Day AI Projection Score",
        score: 64,
        trend: 1.8,
        analysis:
          "AI models predict moderately bullish conditions over the next 7 days with technology and healthcare sectors leading gains.",
        aiSummary:
          "Our AI models project continued strength in equities over the next week, with particular momentum in technology and healthcare. Semiconductor stocks show the strongest technical patterns, while defensive sectors may underperform in this environment.",
      },
      {
        title: "Institutional Flow Indicator",
        score: 76,
        trend: 4.2,
        analysis:
          "Strong institutional buying detected in large-cap tech and financial sectors, suggesting continued upward momentum.",
        aiSummary:
          "Significant institutional capital is flowing into large-cap technology and financial stocks, a typically bullish signal for broader market direction. This pattern often precedes sustained market rallies, particularly when accompanied by increasing trading volumes.",
      },
      {
        title: "Retail Sentiment Index",
        score: 62,
        trend: -1.5,
        analysis:
          "Retail investors showing cautious optimism with moderate buying activity in popular tech and consumer stocks.",
        aiSummary:
          "Retail investor sentiment remains cautiously optimistic but has cooled slightly from previous highs. Social media analysis shows continued interest in technology and consumer discretionary stocks, though with more selective positioning than earlier quarters.",
      },
    ],
    crypto: [
      {
        title: "Bitcoin Dominance Index",
        score: 65,
        trend: 1.8,
        analysis:
          "Bitcoin's market dominance is increasing, suggesting a potential flight to quality within the crypto space.",
        aiSummary:
          "Bitcoin's increasing market dominance signals a potential defensive rotation within the cryptocurrency market. This pattern typically emerges during periods of uncertainty, with capital flowing from altcoins to Bitcoin as investors seek relative stability.",
      },
      {
        title: "DeFi Health Score",
        score: 62,
        trend: -2.4,
        analysis:
          "DeFi protocols showing moderate stress with TVL decreasing by 8% over the past week amid market uncertainty.",
        aiSummary:
          "Decentralized finance protocols are experiencing moderate pressure with declining total value locked (TVL) metrics. This trend suggests caution is warranted in the DeFi sector, though established protocols with strong fundamentals continue to demonstrate resilience.",
      },
      {
        title: "NFT Market Vitality",
        score: 45,
        trend: -7.5,
        analysis:
          "NFT trading volumes have decreased significantly, indicating reduced speculative interest in digital collectibles.",
        aiSummary:
          "The NFT market continues to cool with trading volumes down significantly from previous highs. This sector is experiencing a necessary correction after speculative excesses, though projects with genuine utility and strong communities maintain relative strength.",
      },
      {
        title: "Crypto Volatility Index",
        score: 68,
        trend: 4.2,
        analysis:
          "Market volatility remains elevated with larger than average price swings expected in the coming week.",
        aiSummary:
          "Cryptocurrency volatility metrics indicate potential for significant price movements in the coming days. Options market data suggests traders are positioning for increased volatility, creating opportunities for both directional and volatility-based strategies.",
      },
    ],
    indices: [
      {
        title: "Global Market Sentiment",
        score: 67,
        trend: 1.2,
        analysis:
          "Overall positive sentiment across major global indices with developed markets outperforming emerging markets.",
        aiSummary:
          "Global equity indices are showing positive momentum, with developed markets outperforming emerging markets. This divergence often occurs during periods of dollar strength and rising interest rate expectations, suggesting a preference for quality over growth.",
      },
      {
        title: "Economic Surprise Index",
        score: 63,
        trend: 2.5,
        analysis:
          "Recent economic data has moderately exceeded consensus expectations, supporting equity market valuations.",
        aiSummary:
          "Economic data releases have consistently exceeded analyst expectations, providing fundamental support for current market valuations. This positive surprise factor typically supports equity markets, particularly cyclical sectors that benefit from economic strength.",
      },
      {
        title: "Sector Rotation Indicator",
        score: 72,
        trend: 3.8,
        analysis:
          "Rotation from defensive to cyclical sectors accelerating, suggesting increased risk appetite among investors.",
        aiSummary:
          "Market participants are increasingly rotating from defensive sectors to cyclicals, a classic sign of growing risk appetite. This rotation pattern typically emerges during the middle phase of economic expansions and often precedes periods of broader market strength.",
      },
      {
        title: "Market Breadth Score",
        score: 68,
        trend: -1.5,
        analysis:
          "Healthy market breadth with advancing issues outnumbering declining issues, though slightly weakening from recent peaks.",
        aiSummary:
          "Market breadth remains healthy with broad participation across sectors, though slightly weakening from recent highs. This pattern suggests the rally remains intact but may be maturing, warranting more selective positioning in stocks with strong relative strength.",
      },
    ],
    forex: [
      {
        title: "Dollar Strength (DXY Score)",
        score: 42,
        trend: -1.5,
        analysis:
          "The US Dollar is showing weakness against major currencies, potentially benefiting multinational corporations and commodities.",
        aiSummary:
          "The US Dollar is in a weakening trend against major currencies, creating a supportive environment for multinational corporations and commodity prices. This dollar weakness typically benefits emerging markets and export-oriented economies while supporting precious metals prices.",
      },
      {
        title: "Currency Volatility Index",
        score: 56,
        trend: 2.8,
        analysis:
          "FX market volatility is increasing ahead of central bank meetings, creating potential trading opportunities.",
        aiSummary:
          "Foreign exchange volatility is rising ahead of key central bank decisions, creating potential trading opportunities in major currency pairs. Options market pricing suggests particular focus on EUR/USD and USD/JPY pairs, with significant movement expected following policy announcements.",
      },
      {
        title: "Interest Rate Differential",
        score: 68,
        trend: -0.7,
        analysis:
          "Narrowing interest rate differentials between major economies are influencing currency pair movements.",
        aiSummary:
          "Interest rate differentials between major economies are narrowing as central banks globally adjust monetary policy. This convergence is a key driver of current currency movements, particularly affecting carry trade dynamics and emerging market currencies.",
      },
      {
        title: "Central Bank Policy Divergence",
        score: 74,
        trend: 3.2,
        analysis:
          "Increasing policy divergence between major central banks is creating directional trends in key currency pairs.",
        aiSummary:
          "Policy divergence between major central banks is creating clear directional trends in key currency pairs. The Federal Reserve's stance relative to the ECB and Bank of Japan remains the primary driver, with markets closely monitoring communication for signs of changing policy trajectories.",
      },
    ],
    realestate: [
      {
        title: "Housing Market Health",
        score: 48,
        trend: -4.5,
        analysis:
          "Residential real estate showing signs of cooling with decreased transaction volumes and moderating price growth.",
        aiSummary:
          "The residential real estate market is experiencing a cooling trend with declining transaction volumes and moderating price appreciation. This adjustment is most pronounced in previously hot markets that saw substantial pandemic-era price increases, while affordable secondary markets show greater resilience.",
      },
      {
        title: "Commercial Property Index",
        score: 42,
        trend: -3.2,
        analysis:
          "Office and retail sectors continue to face challenges while industrial and data center properties remain resilient.",
        aiSummary:
          "Commercial real estate presents a bifurcated picture with office and retail properties facing significant headwinds, while industrial, logistics, and data center properties demonstrate strength. This divergence reflects structural shifts in work patterns and consumer behavior accelerated by the pandemic.",
      },
      {
        title: "REIT Performance Score",
        score: 56,
        trend: 1.8,
        analysis:
          "Specialized REITs outperforming broader real estate market, particularly in healthcare and digital infrastructure.",
        aiSummary:
          "Specialized REITs focused on healthcare, digital infrastructure, and logistics are outperforming the broader real estate sector. This performance divergence highlights the importance of sector selection within real estate investments, with technology-adjacent properties showing particular strength.",
      },
      {
        title: "Mortgage Rate Impact",
        score: 38,
        trend: -5.2,
        analysis:
          "Rising mortgage rates are pressuring affordability and reducing demand, particularly in high-priced markets.",
        aiSummary:
          "Elevated mortgage rates continue to pressure housing affordability and transaction volumes, particularly in high-priced coastal markets. This rate environment is creating a challenging backdrop for residential real estate, though the structural housing shortage provides some support for valuations.",
      },
    ],
  };

  // Top assets by market type for recommendations
  const topAssetsByMarket = {
    stocks: [
      {
        symbol: "NVDA",
        name: "NVIDIA Corp",
        action: "long",
        confidence: 92,
        price: "$892.03",
        change: "+4.2%",
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc",
        action: "short",
        confidence: 87,
        price: "$248.42",
        change: "-2.8%",
      },
      {
        symbol: "AAPL",
        name: "Apple Inc",
        action: "long",
        confidence: 84,
        price: "$187.45",
        change: "+1.7%",
      },
    ],
    crypto: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        action: "short",
        confidence: 76,
        price: "$62,345",
        change: "-3.2%",
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        action: "short",
        confidence: 73,
        price: "$3,421",
        change: "-2.1%",
      },
      {
        symbol: "SOL",
        name: "Solana",
        action: "long",
        confidence: 82,
        price: "$142.78",
        change: "+5.4%",
      },
    ],
    indices: [
      {
        symbol: "SPX",
        name: "S&P 500",
        action: "long",
        confidence: 81,
        price: "4,782.82",
        change: "+1.2%",
      },
      {
        symbol: "NDX",
        name: "Nasdaq 100",
        action: "long",
        confidence: 84,
        price: "16,742.39",
        change: "+1.6%",
      },
      {
        symbol: "DJI",
        name: "Dow Jones",
        action: "long",
        confidence: 76,
        price: "38,503.75",
        change: "+0.7%",
      },
    ],
    forex: [
      {
        symbol: "EUR/USD",
        name: "Euro/US Dollar",
        action: "long",
        confidence: 74,
        price: "1.0845",
        change: "+0.6%",
      },
      {
        symbol: "USD/JPY",
        name: "US Dollar/Japanese Yen",
        action: "short",
        confidence: 68,
        price: "153.42",
        change: "-0.8%",
      },
      {
        symbol: "GBP/USD",
        name: "British Pound/US Dollar",
        action: "long",
        confidence: 71,
        price: "1.2678",
        change: "+0.4%",
      },
    ],
    realestate: [
      {
        symbol: "VNQ",
        name: "Vanguard Real Estate ETF",
        action: "short",
        confidence: 65,
        price: "$82.45",
        change: "-0.8%",
      },
      {
        symbol: "IYR",
        name: "iShares U.S. Real Estate ETF",
        action: "short",
        confidence: 63,
        price: "$87.32",
        change: "-1.1%",
      },
      {
        symbol: "AMT",
        name: "American Tower Corp",
        action: "long",
        confidence: 72,
        price: "$195.43",
        change: "+1.2%",
      },
    ],
  };

  // Handle refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
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
        </h2>
        <Button
          onClick={handleRefresh}
          className="mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Updating..." : "Refresh Data"}
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
                {overallSentiment[activeCategory].timeframe}
              </Badge>
            </div>

            <div className="flex items-center mb-4">
              <div
                className={`text-3xl font-bold ${getScoreColor(overallSentiment[activeCategory].score)}`}
              >
                {overallSentiment[activeCategory].score}
              </div>
              <div className="ml-2 flex items-center">
                {overallSentiment[activeCategory].trend > 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={
                    overallSentiment[activeCategory].trend > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {Math.abs(overallSentiment[activeCategory].trend)}%
                </span>
              </div>
            </div>

            <div
              className={`px-3 py-2 rounded-lg ${getScoreBgColor(overallSentiment[activeCategory].score)}`}
            >
              <div className="font-medium mb-1">
                {getSentimentCategory(overallSentiment[activeCategory].score)}
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
                {overallSentiment[activeCategory].analysis}
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
                  {topAssetsByMarket[activeCategory].map((asset) => (
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
        {marketMetrics[activeCategory].map((metric, index) => (
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
