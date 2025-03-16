import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  Brain,
  Briefcase,
  Building,
  Coins,
  LineChart,
  BarChart2,
  DollarSign,
  Globe,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Sparkles,
  Clock,
} from "lucide-react";
import MarketMetricGauge from "../dashboard/MarketMetricGauge";
import MarketIntelligenceDashboard from "../dashboard/MarketIntelligenceDashboard";
import AssetRecommendation from "../dashboard/AssetRecommendation";
import OverallMarketSentiment from "../dashboard/OverallMarketSentiment";
import QuickAccessToolbar from "../dashboard/QuickAccessToolbar";
import RealEstateCountrySelector from "../dashboard/RealEstateCountrySelector";
import FloatingSentimentMeter from "../dashboard/FloatingSentimentMeter";
import SearchDialog from "../dashboard/SearchDialog";
import RealTimeMarketData from "../dashboard/RealTimeMarketData";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";
import { motion } from "framer-motion";
import TopNavigation from "./TopNavigation";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [searchDialogQuery, setSearchDialogQuery] = useState("");
  const [activeMarketType, setActiveMarketType] = useState("stocks");

  // Get market sentiment data for AI context
  const {
    overallScore: sentimentScore,
    sectorScores,
    historicalData: sentimentHistory,
  } = useMarketSentiment();

  // Function to trigger loading state for demonstration
  const handleRefresh = () => {
    setLoading(true);
    // Reset loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Market type data
  const marketTypes = [
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

  // Sample top assets data by market type
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
      {
        symbol: "META",
        name: "Meta Platforms",
        action: "long",
        confidence: 82,
        price: "$478.22",
        change: "+2.3%",
      },
      {
        symbol: "AMZN",
        name: "Amazon.com",
        action: "long",
        confidence: 79,
        price: "$178.23",
        change: "+1.5%",
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp",
        action: "long",
        confidence: 65,
        price: "$412.67",
        change: "+0.9%",
      },
      {
        symbol: "XOM",
        name: "Exxon Mobil",
        action: "long",
        confidence: 71,
        price: "$118.32",
        change: "+0.8%",
      },
      {
        symbol: "JPM",
        name: "JPMorgan Chase",
        action: "long",
        confidence: 68,
        price: "$197.45",
        change: "+1.2%",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc",
        action: "long",
        confidence: 76,
        price: "$175.98",
        change: "+1.8%",
      },
      {
        symbol: "V",
        name: "Visa Inc",
        action: "long",
        confidence: 73,
        price: "$278.45",
        change: "+0.7%",
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
      {
        symbol: "ADA",
        name: "Cardano",
        action: "long",
        confidence: 68,
        price: "$0.45",
        change: "+2.7%",
      },
      {
        symbol: "DOT",
        name: "Polkadot",
        action: "short",
        confidence: 65,
        price: "$6.82",
        change: "-1.5%",
      },
      {
        symbol: "AVAX",
        name: "Avalanche",
        action: "long",
        confidence: 78,
        price: "$35.67",
        change: "+4.2%",
      },
      {
        symbol: "LINK",
        name: "Chainlink",
        action: "long",
        confidence: 75,
        price: "$14.23",
        change: "+3.8%",
      },
      {
        symbol: "XRP",
        name: "Ripple",
        action: "short",
        confidence: 62,
        price: "$0.58",
        change: "-0.9%",
      },
      {
        symbol: "MATIC",
        name: "Polygon",
        action: "long",
        confidence: 71,
        price: "$0.72",
        change: "+2.1%",
      },
      {
        symbol: "UNI",
        name: "Uniswap",
        action: "short",
        confidence: 64,
        price: "$8.45",
        change: "-1.2%",
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
      {
        symbol: "RUT",
        name: "Russell 2000",
        action: "short",
        confidence: 68,
        price: "2,093.58",
        change: "-0.3%",
      },
      {
        symbol: "VIX",
        name: "Volatility Index",
        action: "short",
        confidence: 72,
        price: "13.21",
        change: "-5.2%",
      },
      {
        symbol: "FTSE",
        name: "FTSE 100",
        action: "long",
        confidence: 65,
        price: "7,845.32",
        change: "+0.5%",
      },
      {
        symbol: "DAX",
        name: "DAX",
        action: "long",
        confidence: 69,
        price: "18,432.65",
        change: "+0.8%",
      },
      {
        symbol: "N225",
        name: "Nikkei 225",
        action: "short",
        confidence: 62,
        price: "38,654.23",
        change: "-0.4%",
      },
      {
        symbol: "HSI",
        name: "Hang Seng",
        action: "short",
        confidence: 58,
        price: "17,832.17",
        change: "-1.2%",
      },
      {
        symbol: "SSEC",
        name: "Shanghai Composite",
        action: "short",
        confidence: 55,
        price: "3,145.78",
        change: "-0.7%",
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
      {
        symbol: "USD/CHF",
        name: "US Dollar/Swiss Franc",
        action: "short",
        confidence: 65,
        price: "0.9045",
        change: "-0.5%",
      },
      {
        symbol: "AUD/USD",
        name: "Australian Dollar/US Dollar",
        action: "long",
        confidence: 62,
        price: "0.6587",
        change: "+0.3%",
      },
      {
        symbol: "USD/CAD",
        name: "US Dollar/Canadian Dollar",
        action: "short",
        confidence: 67,
        price: "1.3645",
        change: "-0.4%",
      },
      {
        symbol: "NZD/USD",
        name: "New Zealand Dollar/US Dollar",
        action: "long",
        confidence: 59,
        price: "0.5987",
        change: "+0.2%",
      },
      {
        symbol: "USD/CNY",
        name: "US Dollar/Chinese Yuan",
        action: "short",
        confidence: 72,
        price: "7.2345",
        change: "-0.6%",
      },
      {
        symbol: "USD/MXN",
        name: "US Dollar/Mexican Peso",
        action: "short",
        confidence: 64,
        price: "16.8765",
        change: "-0.7%",
      },
      {
        symbol: "USD/INR",
        name: "US Dollar/Indian Rupee",
        action: "short",
        confidence: 61,
        price: "83.4567",
        change: "-0.3%",
      },
    ],
    realestate: [
      {
        symbol: "VNQ",
        name: "Vanguard Real Estate ETF",
        action: "short",
        confidence: 65,
        price: "82.45",
        change: "-0.8%",
      },
      {
        symbol: "IYR",
        name: "iShares U.S. Real Estate ETF",
        action: "short",
        confidence: 63,
        price: "87.32",
        change: "-1.1%",
      },
      {
        symbol: "XLRE",
        name: "Real Estate Select Sector SPDR",
        action: "short",
        confidence: 67,
        price: "39.87",
        change: "-0.7%",
      },
      {
        symbol: "AMT",
        name: "American Tower Corp",
        action: "long",
        confidence: 72,
        price: "195.43",
        change: "+1.2%",
      },
      {
        symbol: "PLD",
        name: "Prologis Inc",
        action: "long",
        confidence: 69,
        price: "124.56",
        change: "+0.9%",
      },
      {
        symbol: "CCI",
        name: "Crown Castle Inc",
        action: "short",
        confidence: 64,
        price: "102.34",
        change: "-0.5%",
      },
      {
        symbol: "EQIX",
        name: "Equinix Inc",
        action: "long",
        confidence: 75,
        price: "782.45",
        change: "+1.5%",
      },
      {
        symbol: "PSA",
        name: "Public Storage",
        action: "short",
        confidence: 62,
        price: "287.65",
        change: "-0.3%",
      },
      {
        symbol: "WELL",
        name: "Welltower Inc",
        action: "long",
        confidence: 68,
        price: "92.34",
        change: "+0.7%",
      },
      {
        symbol: "SPG",
        name: "Simon Property Group",
        action: "long",
        confidence: 71,
        price: "148.76",
        change: "+1.1%",
      },
    ],
  };

  // Market metrics data by market type
  const marketMetrics = {
    stocks: [
      {
        title: "Market Sentiment Score",
        score: 72,
        trend: 2.5,
        analysis:
          "AI detects strong positive sentiment across major indices with institutional buying increasing by 15% this week.",
      },
      {
        title: "Market Fear & Greed Index",
        score: 68,
        trend: -3.2,
        analysis:
          "Greed is currently the dominant market emotion, though slightly down from extreme greed levels last week.",
      },
      {
        title: "7-Day AI Projection Score",
        score: 64,
        trend: 1.8,
        analysis:
          "AI models predict moderately bullish conditions over the next 7 days with technology and healthcare sectors leading gains.",
      },
      {
        title: "Institutional Flow Indicator",
        score: 76,
        trend: 4.2,
        analysis:
          "Strong institutional buying detected in large-cap tech and financial sectors, suggesting continued upward momentum.",
      },
      {
        title: "Retail Sentiment Index",
        score: 62,
        trend: -1.5,
        analysis:
          "Retail investors showing cautious optimism with moderate buying activity in popular tech and consumer stocks.",
      },
      {
        title: "Earnings Surprise Indicator",
        score: 70,
        trend: 2.8,
        analysis:
          "Recent earnings reports have exceeded expectations by an average of 7.2%, particularly in technology and healthcare sectors.",
      },
    ],
    crypto: [
      {
        title: "Crypto Sentiment Score",
        score: 58,
        trend: -5.2,
        analysis:
          "Market sentiment has cooled following recent regulatory announcements, with increased caution among institutional investors.",
      },
      {
        title: "Bitcoin Dominance Index",
        score: 65,
        trend: 1.8,
        analysis:
          "Bitcoin's market dominance is increasing, suggesting a potential flight to quality within the crypto space.",
      },
      {
        title: "DeFi Health Score",
        score: 62,
        trend: -2.4,
        analysis:
          "DeFi protocols showing moderate stress with TVL decreasing by 8% over the past week amid market uncertainty.",
      },
      {
        title: "NFT Market Vitality",
        score: 45,
        trend: -7.5,
        analysis:
          "NFT trading volumes have decreased significantly, indicating reduced speculative interest in digital collectibles.",
      },
      {
        title: "Layer-1 Competition Index",
        score: 72,
        trend: 3.6,
        analysis:
          "Alternative L1 blockchains gaining momentum with increased developer activity and user adoption metrics.",
      },
      {
        title: "Crypto Volatility Index",
        score: 68,
        trend: 4.2,
        analysis:
          "Market volatility remains elevated with larger than average price swings expected in the coming week.",
      },
    ],
    indices: [
      {
        title: "Global Market Sentiment",
        score: 67,
        trend: 1.2,
        analysis:
          "Overall positive sentiment across major global indices with developed markets outperforming emerging markets.",
      },
      {
        title: "Economic Surprise Index",
        score: 63,
        trend: 2.5,
        analysis:
          "Recent economic data has moderately exceeded consensus expectations, supporting equity market valuations.",
      },
      {
        title: "Sector Rotation Indicator",
        score: 72,
        trend: 3.8,
        analysis:
          "Rotation from defensive to cyclical sectors accelerating, suggesting increased risk appetite among investors.",
      },
      {
        title: "Market Breadth Score",
        score: 68,
        trend: -1.5,
        analysis:
          "Healthy market breadth with advancing issues outnumbering declining issues, though slightly weakening from recent peaks.",
      },
      {
        title: "Global Liquidity Indicator",
        score: 65,
        trend: -2.2,
        analysis:
          "Central bank liquidity remains supportive but is gradually tightening, which may limit upside potential.",
      },
      {
        title: "Cross-Asset Correlation",
        score: 58,
        trend: 1.7,
        analysis:
          "Decreasing correlation between asset classes suggests a more favorable environment for active management strategies.",
      },
    ],
    forex: [
      {
        title: "Dollar Strength (DXY Score)",
        score: 42,
        trend: -1.5,
        analysis:
          "The US Dollar is showing weakness against major currencies, potentially benefiting multinational corporations and commodities.",
      },
      {
        title: "Currency Volatility Index",
        score: 56,
        trend: 2.8,
        analysis:
          "FX market volatility is increasing ahead of central bank meetings, creating potential trading opportunities.",
      },
      {
        title: "Interest Rate Differential",
        score: 68,
        trend: -0.7,
        analysis:
          "Narrowing interest rate differentials between major economies are influencing currency pair movements.",
      },
      {
        title: "Carry Trade Attractiveness",
        score: 62,
        trend: 1.5,
        analysis:
          "Moderate opportunities for carry trades with select emerging market currencies offering favorable risk-reward profiles.",
      },
      {
        title: "Central Bank Policy Divergence",
        score: 74,
        trend: 3.2,
        analysis:
          "Increasing policy divergence between major central banks is creating directional trends in key currency pairs.",
      },
      {
        title: "Global Risk Sentiment",
        score: 65,
        trend: 2.1,
        analysis:
          "Risk-on sentiment is supporting higher-yielding currencies at the expense of traditional safe havens.",
      },
    ],
    realestate: [
      {
        title: "Housing Market Health",
        score: 48,
        trend: -4.5,
        analysis:
          "Residential real estate showing signs of cooling with decreased transaction volumes and moderating price growth.",
      },
      {
        title: "Commercial Property Index",
        score: 42,
        trend: -3.2,
        analysis:
          "Office and retail sectors continue to face challenges while industrial and data center properties remain resilient.",
      },
      {
        title: "REIT Performance Score",
        score: 56,
        trend: 1.8,
        analysis:
          "Specialized REITs outperforming broader real estate market, particularly in healthcare and digital infrastructure.",
      },
      {
        title: "Mortgage Rate Impact",
        score: 38,
        trend: -5.2,
        analysis:
          "Rising mortgage rates are pressuring affordability and reducing demand, particularly in high-priced markets.",
      },
      {
        title: "Construction Activity Index",
        score: 52,
        trend: -1.5,
        analysis:
          "New construction starts moderating with builders showing increased caution amid economic uncertainty.",
      },
      {
        title: "Real Estate Liquidity Score",
        score: 45,
        trend: -2.8,
        analysis:
          "Transaction liquidity decreasing with properties staying on market longer and increased buyer negotiating power.",
      },
    ],
  };

  // Overall market sentiment by market type
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

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <DashboardLayout activeItem="Intelligence Center">
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-2">
              {/* Market Intelligence Dashboard */}
              <div className="mb-6">
                <MarketIntelligenceDashboard />
              </div>

              {/* Asset Recommendations */}
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AssetRecommendation
                    assets={topAssetsByMarket[activeMarketType]}
                    title={`Top 10 ${marketTypes.find((m) => m.id === activeMarketType)?.name} to Long/Short`}
                  />
                </motion.div>
              </div>

              {/* Additional Market Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    Key Risk Factors
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        risk: "Central Bank Policy Changes",
                        impact: "High",
                        color: "red",
                      },
                      {
                        risk: "Geopolitical Tensions",
                        impact: "Medium",
                        color: "amber",
                      },
                      {
                        risk: "Inflation Concerns",
                        impact: "Medium",
                        color: "amber",
                      },
                      {
                        risk: "Liquidity Constraints",
                        impact: "Low",
                        color: "green",
                      },
                    ].map((item) => (
                      <div
                        key={item.risk}
                        className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.risk}
                        </span>
                        <Badge
                          className={`bg-${item.color}-100 text-${item.color}-800 dark:bg-${item.color}-900/30 dark:text-${item.color}-300`}
                        >
                          {item.impact} Impact
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    Momentum Sectors
                  </h3>
                  <div className="space-y-3">
                    {[
                      { sector: "Technology", trend: "+4.2%", direction: "up" },
                      { sector: "Healthcare", trend: "+2.8%", direction: "up" },
                      { sector: "Energy", trend: "-1.5%", direction: "down" },
                      { sector: "Financials", trend: "+1.7%", direction: "up" },
                    ].map((item) => (
                      <div
                        key={item.sector}
                        className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.sector}
                        </span>
                        <span
                          className={`flex items-center ${item.direction === "up" ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.direction === "up" ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {item.trend}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    AI Action Recommendations
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        action: "Increase exposure to technology sector",
                        confidence: "High",
                      },
                      {
                        action: "Reduce holdings in energy stocks",
                        confidence: "Medium",
                      },
                      {
                        action: "Consider defensive positioning in portfolios",
                        confidence: "Medium",
                      },
                      {
                        action: "Monitor central bank communications closely",
                        confidence: "High",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
                      >
                        <div className="h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium text-purple-800 dark:text-purple-300 mr-2 flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {item.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Confidence: {item.confidence}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Market Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                  Upcoming Market Events
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      date: "Jul 25",
                      event: "Fed Interest Rate Decision",
                      impact: "High",
                      time: "2:00 PM ET",
                    },
                    {
                      date: "Jul 26",
                      event: "US GDP Q2 Preliminary",
                      impact: "Medium",
                      time: "8:30 AM ET",
                    },
                    {
                      date: "Jul 27",
                      event: "Tech Sector Earnings Reports",
                      impact: "High",
                      time: "After Market",
                    },
                    {
                      date: "Jul 28",
                      event: "ECB Monetary Policy Statement",
                      impact: "Medium",
                      time: "7:45 AM ET",
                    },
                    {
                      date: "Jul 29",
                      event: "US PCE Price Index",
                      impact: "Medium",
                      time: "8:30 AM ET",
                    },
                    {
                      date: "Jul 30",
                      event: "Bank of Japan Policy Decision",
                      impact: "Medium",
                      time: "11:00 PM ET",
                    },
                  ].map((item) => (
                    <div
                      key={item.event}
                      className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.event}
                        </span>
                        <Badge
                          className={`${item.impact === "High" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}`}
                        >
                          {item.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.date} • {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </main>

          {/* Quick Access Toolbar */}
          <QuickAccessToolbar
            onRefresh={handleRefresh}
            onOpenSearch={() => setIsSearchDialogOpen(true)}
            onOpenChat={() => window.open("/advisor", "_self")}
            onOpenAlerts={() => window.open("/alerts", "_self")}
            isLoading={loading}
            aiEnabled={true}
          />

          {/* Floating Market Sentiment Meter */}
          <FloatingSentimentMeter />

          {/* Search Dialog */}
          <SearchDialog
            open={isSearchDialogOpen}
            onOpenChange={setIsSearchDialogOpen}
            initialQuery={searchDialogQuery}
            marketData={null}
            sentimentData={{
              overallScore: sentimentScore,
              sectorScores,
              historicalData: sentimentHistory,
            }}
          />
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
