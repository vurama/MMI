import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  BarChart2,
  PieChart,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Filter,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import QuickAccessToolbar from "../dashboard/QuickAccessToolbar";
import MarketOverviewWidget from "../dashboard/MarketOverviewWidget";
import { motion } from "framer-motion";

const MarketData = () => {
  const [liveData, setLiveData] = useState(true);
  const [timeframe, setTimeframe] = useState("1d");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample market indices data
  const marketIndices = [
    { name: "S&P 500", value: "4,782.82", change: "+1.2%", trend: "up" },
    { name: "Nasdaq", value: "16,742.39", change: "+1.6%", trend: "up" },
    { name: "Dow Jones", value: "38,503.75", change: "+0.7%", trend: "up" },
    { name: "Russell 2000", value: "2,093.58", change: "-0.3%", trend: "down" },
    { name: "VIX", value: "13.21", change: "-5.2%", trend: "down" },
  ];

  // Sample top movers data
  const topMovers = [
    {
      symbol: "NVDA",
      name: "NVIDIA Corp",
      price: "$892.03",
      change: "+4.2%",
      volume: "42.3M",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc",
      price: "$248.42",
      change: "+3.8%",
      volume: "38.7M",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc",
      price: "$187.45",
      change: "+1.7%",
      volume: "32.1M",
    },
    {
      symbol: "META",
      name: "Meta Platforms",
      price: "$478.22",
      change: "+2.3%",
      volume: "28.5M",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com",
      price: "$178.23",
      change: "+1.5%",
      volume: "24.9M",
    },
  ];

  // Sample sector performance data
  const sectorPerformance = [
    { name: "Technology", change: "+2.4%", trend: "up" },
    { name: "Healthcare", change: "+0.8%", trend: "up" },
    { name: "Financials", change: "+0.5%", trend: "up" },
    { name: "Consumer Discretionary", change: "+1.2%", trend: "up" },
    { name: "Communication Services", change: "+1.7%", trend: "up" },
    { name: "Industrials", change: "+0.3%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <QuickAccessToolbar
            onOpenSearch={() => window.open("/dashboard", "_self")}
            onOpenChat={() => window.open("/advisor", "_self")}
            onOpenAlerts={() => window.open("/alerts", "_self")}
          />
          <div className="container mx-auto px-6 pt-6 pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <LineChart className="h-7 w-7 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Market Data
                </h1>
                <div className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Live Data</span>
                  <Switch
                    checked={liveData}
                    onCheckedChange={setLiveData}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search symbols..."
                    className="pl-9 h-9 w-[200px] rounded-full bg-white border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[100px] h-9 rounded-full bg-white border-gray-200">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                    <SelectItem value="5y">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {!liveData && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-amber-800 text-sm">
                  Live market data is currently disabled. Data shown may not
                  reflect current market conditions.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-amber-300 text-amber-700 hover:bg-amber-100"
                  onClick={() => setLiveData(true)}
                >
                  Enable Live Data
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {marketIndices.map((index, i) => (
                <motion.div
                  key={index.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-gray-500">
                        {index.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">{index.value}</div>
                        <div
                          className={`flex items-center ${index.trend === "up" ? "text-green-600" : "text-red-600"}`}
                        >
                          {index.trend === "up" ? (
                            <ArrowUpRight className="h-5 w-5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-5 w-5 mr-1" />
                          )}
                          <span className="font-semibold">{index.change}</span>
                        </div>
                      </div>
                      {liveData && (
                        <div className="mt-2 flex items-center">
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1 text-blue-500" />
                            Live
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      Top Movers
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                              Symbol
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                              Name
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                              Price
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                              Change
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                              Volume
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {topMovers.map((mover) => (
                            <tr
                              key={mover.symbol}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">
                                <div className="font-medium">
                                  {mover.symbol}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {mover.name}
                              </td>
                              <td className="py-3 px-4 text-right font-medium">
                                {mover.price}
                              </td>
                              <td
                                className={`py-3 px-4 text-right font-medium ${mover.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                              >
                                {mover.change}
                              </td>
                              <td className="py-3 px-4 text-right text-sm text-gray-600">
                                {mover.volume}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Sector Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-3">
                        {sectorPerformance.map((sector) => (
                          <div
                            key={sector.name}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <span className="text-sm font-medium">
                              {sector.name}
                            </span>
                            <span
                              className={`font-medium ${sector.trend === "up" ? "text-green-600" : "text-red-600"}`}
                            >
                              {sector.change}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
                      <TabsTrigger value="news">News Impact</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-blue-800">
                          Market Overview
                        </h3>
                        <p className="text-blue-700 mb-3">
                          Markets are showing positive momentum today with
                          technology stocks leading the gains. The S&P 500 and
                          Nasdaq are both up, driven by strong earnings reports
                          from major tech companies.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                              <span className="font-medium">Key Strengths</span>
                            </div>
                            <ul className="mt-2 space-y-1 text-sm pl-7 list-disc">
                              <li>Technology sector outperformance</li>
                              <li>Strong consumer spending data</li>
                              <li>Positive earnings surprises</li>
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="flex items-center">
                              <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                              <span className="font-medium">Key Concerns</span>
                            </div>
                            <ul className="mt-2 space-y-1 text-sm pl-7 list-disc">
                              <li>Energy sector weakness</li>
                              <li>Rising treasury yields</li>
                              <li>Geopolitical tensions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="technical">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-purple-800">
                          Technical Analysis
                        </h3>
                        <p className="text-purple-700 mb-3">
                          The S&P 500 is trading above its 50-day and 200-day
                          moving averages, indicating a strong bullish trend.
                          RSI levels suggest the market is approaching
                          overbought territory but hasn't reached extreme levels
                          yet.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-500 mb-1">
                                RSI (14)
                              </div>
                              <div className="text-xl font-bold text-amber-500">
                                68.5
                              </div>
                              <div className="text-xs text-gray-500">
                                Approaching overbought
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-500 mb-1">
                                MACD
                              </div>
                              <div className="text-xl font-bold text-green-500">
                                Bullish
                              </div>
                              <div className="text-xs text-gray-500">
                                Above signal line
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-500 mb-1">
                                Bollinger Bands
                              </div>
                              <div className="text-xl font-bold text-blue-500">
                                Expanding
                              </div>
                              <div className="text-xs text-gray-500">
                                Increasing volatility
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="fundamental">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-green-800">
                          Fundamental Analysis
                        </h3>
                        <p className="text-green-700 mb-3">
                          Q2 earnings season has been positive with 78% of S&P
                          500 companies beating estimates. Average earnings
                          growth is 8.2% year-over-year, exceeding the expected
                          5.7%.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="text-sm font-medium text-gray-500 mb-1">
                              S&P 500 P/E Ratio (Forward)
                            </div>
                            <div className="flex items-end">
                              <div className="text-xl font-bold">19.8</div>
                              <div className="text-xs text-amber-500 ml-2 mb-1">
                                Slightly above 5-year average (18.6)
                              </div>
                            </div>
                            <div className="mt-2 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-amber-500 rounded-full"
                                style={{ width: "65%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="text-sm font-medium text-gray-500 mb-1">
                              Dividend Yield
                            </div>
                            <div className="flex items-end">
                              <div className="text-xl font-bold">1.42%</div>
                              <div className="text-xs text-red-500 ml-2 mb-1">
                                Below 5-year average (1.84%)
                              </div>
                            </div>
                            <div className="mt-2 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-red-500 rounded-full"
                                style={{ width: "35%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="news">
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-amber-800">
                          News Impact Analysis
                        </h3>
                        <p className="text-amber-700 mb-3">
                          Recent Fed comments have been interpreted as dovish,
                          supporting market sentiment. Technology earnings have
                          exceeded expectations, while energy companies face
                          headwinds from falling commodity prices.
                        </p>
                        <div className="space-y-3 mt-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="flex items-start">
                              <Badge className="mt-0.5 bg-green-100 text-green-800 hover:bg-green-100 mr-3">
                                High Impact
                              </Badge>
                              <div>
                                <h4 className="font-medium">
                                  Fed Signals Potential Rate Cut
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Federal Reserve officials indicated they're
                                  getting closer to cutting interest rates,
                                  boosting market sentiment across all sectors.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="flex items-start">
                              <Badge className="mt-0.5 bg-blue-100 text-blue-800 hover:bg-blue-100 mr-3">
                                Medium Impact
                              </Badge>
                              <div>
                                <h4 className="font-medium">
                                  Tech Earnings Exceed Expectations
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Major technology companies reported
                                  stronger-than-expected earnings, driving the
                                  sector's outperformance.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <div className="flex items-start">
                              <Badge className="mt-0.5 bg-amber-100 text-amber-800 hover:bg-amber-100 mr-3">
                                Low Impact
                              </Badge>
                              <div>
                                <h4 className="font-medium">
                                  Retail Sales Data Mixed
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Latest retail sales data showed mixed results,
                                  with online sales growing while
                                  brick-and-mortar stores continue to struggle.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketData;
