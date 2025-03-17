import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Minus,
  Globe,
  Filter,
  Bell,
  RefreshCw,
  Info,
  Search,
  ChevronDown,
  X,
  Maximize2,
  Layers,
  Settings,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CountryData {
  id: string;
  name: string;
  sentiment: "bullish" | "bearish" | "neutral";
  marketCap: string;
  dominantAsset: string;
  priceChange24h: number;
  tradingVolume: string;
  regulations: string;
  latestNews: string[];
  coordinates: { x: number; y: number };
}

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
}

const CryptoWorldMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  );
  const [globalSentiment, setGlobalSentiment] = useState<number>(65);
  const [selectedAsset, setSelectedAsset] = useState<string>("bitcoin");
  const [timeRange, setTimeRange] = useState<string>("24h");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlerts, setShowAlerts] = useState<boolean>(true);
  const [filterSentiment, setFilterSentiment] = useState<string>("all");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("map");

  // Mock data for countries
  const mockCountries: CountryData[] = [
    {
      id: "us",
      name: "United States",
      sentiment: "bullish",
      marketCap: "$450B",
      dominantAsset: "Bitcoin",
      priceChange24h: 2.4,
      tradingVolume: "$28.5B",
      regulations: "Moderate",
      latestNews: [
        "SEC approves new crypto ETF applications",
        "Major bank launches institutional crypto custody service",
      ],
      coordinates: { x: 220, y: 160 },
    },
    {
      id: "jp",
      name: "Japan",
      sentiment: "neutral",
      marketCap: "$120B",
      dominantAsset: "XRP",
      priceChange24h: 0.2,
      tradingVolume: "$12.1B",
      regulations: "Progressive",
      latestNews: [
        "Japan's FSA introduces new crypto exchange guidelines",
        "Major retailer begins accepting crypto payments nationwide",
      ],
      coordinates: { x: 780, y: 180 },
    },
    {
      id: "kr",
      name: "South Korea",
      sentiment: "bullish",
      marketCap: "$85B",
      dominantAsset: "Ethereum",
      priceChange24h: 3.8,
      tradingVolume: "$9.7B",
      regulations: "Strict",
      latestNews: [
        "Korean crypto exchanges implement new KYC requirements",
        "Government announces blockchain initiative for public services",
      ],
      coordinates: { x: 750, y: 200 },
    },
    {
      id: "ch",
      name: "Switzerland",
      sentiment: "bullish",
      marketCap: "$42B",
      dominantAsset: "Ethereum",
      priceChange24h: 4.1,
      tradingVolume: "$5.3B",
      regulations: "Favorable",
      latestNews: [
        "Swiss canton now accepts tax payments in cryptocurrency",
        "New crypto bank receives regulatory approval",
      ],
      coordinates: { x: 480, y: 150 },
    },
    {
      id: "sg",
      name: "Singapore",
      sentiment: "neutral",
      marketCap: "$38B",
      dominantAsset: "Bitcoin",
      priceChange24h: 0.5,
      tradingVolume: "$4.8B",
      regulations: "Progressive",
      latestNews: [
        "Singapore's MAS clarifies crypto licensing requirements",
        "Major exchange relocates headquarters to Singapore",
      ],
      coordinates: { x: 700, y: 300 },
    },
    {
      id: "uk",
      name: "United Kingdom",
      sentiment: "bearish",
      marketCap: "$72B",
      dominantAsset: "Bitcoin",
      priceChange24h: -1.8,
      tradingVolume: "$8.2B",
      regulations: "Tightening",
      latestNews: [
        "UK financial regulator issues warning on crypto investments",
        "Bank of England discusses CBDC development timeline",
      ],
      coordinates: { x: 450, y: 140 },
    },
    {
      id: "de",
      name: "Germany",
      sentiment: "neutral",
      marketCap: "$65B",
      dominantAsset: "Ethereum",
      priceChange24h: 0.3,
      tradingVolume: "$7.5B",
      regulations: "Structured",
      latestNews: [
        "German banks authorized to offer crypto custody services",
        "New tax guidelines for crypto trading announced",
      ],
      coordinates: { x: 490, y: 160 },
    },
    {
      id: "cn",
      name: "China",
      sentiment: "bearish",
      marketCap: "$110B",
      dominantAsset: "NEO",
      priceChange24h: -2.5,
      tradingVolume: "$14.3B",
      regulations: "Restrictive",
      latestNews: [
        "Provincial authorities crack down on remaining mining operations",
        "Central bank reaffirms stance against crypto trading",
      ],
      coordinates: { x: 700, y: 200 },
    },
    {
      id: "br",
      name: "Brazil",
      sentiment: "bullish",
      marketCap: "$32B",
      dominantAsset: "Bitcoin",
      priceChange24h: 5.2,
      tradingVolume: "$3.9B",
      regulations: "Developing",
      latestNews: [
        "Brazilian investment bank launches crypto trading platform",
        "Central bank announces CBDC pilot program",
      ],
      coordinates: { x: 300, y: 350 },
    },
    {
      id: "au",
      name: "Australia",
      sentiment: "neutral",
      marketCap: "$28B",
      dominantAsset: "Bitcoin",
      priceChange24h: 0.7,
      tradingVolume: "$3.2B",
      regulations: "Balanced",
      latestNews: [
        "Australian tax office updates crypto reporting requirements",
        "Major supermarket chain begins accepting crypto payments",
      ],
      coordinates: { x: 800, y: 420 },
    },
    {
      id: "ca",
      name: "Canada",
      sentiment: "bullish",
      marketCap: "$58B",
      dominantAsset: "Bitcoin",
      priceChange24h: 1.8,
      tradingVolume: "$6.7B",
      regulations: "Progressive",
      latestNews: [
        "Canadian regulators approve new crypto ETFs",
        "Major Canadian bank partners with crypto exchange",
      ],
      coordinates: { x: 200, y: 120 },
    },
    {
      id: "in",
      name: "India",
      sentiment: "neutral",
      marketCap: "$74B",
      dominantAsset: "Bitcoin",
      priceChange24h: 0.9,
      tradingVolume: "$8.3B",
      regulations: "Evolving",
      latestNews: [
        "Indian government clarifies crypto tax regulations",
        "Major Indian tech companies exploring blockchain solutions",
      ],
      coordinates: { x: 650, y: 250 },
    },
  ];

  // Mock data for crypto assets
  const mockAssets: CryptoAsset[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 63245.82,
      priceChange24h: 2.1,
      marketCap: 1230000000000,
      volume24h: 28500000000,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3456.78,
      priceChange24h: 3.5,
      marketCap: 415000000000,
      volume24h: 15700000000,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: 142.35,
      priceChange24h: 5.8,
      marketCap: 61000000000,
      volume24h: 4200000000,
    },
    {
      id: "ripple",
      name: "XRP",
      symbol: "XRP",
      price: 0.58,
      priceChange24h: -1.2,
      marketCap: 31000000000,
      volume24h: 1800000000,
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      price: 0.45,
      priceChange24h: 0.3,
      marketCap: 16000000000,
      volume24h: 950000000,
    },
  ];

  // Mock global events
  const mockEvents = [
    {
      id: 1,
      type: "price_pump",
      asset: "Bitcoin",
      change: "+12%",
      timeAgo: "2h ago",
      region: "Global",
    },
    {
      id: 2,
      type: "whale_movement",
      asset: "Ethereum",
      amount: "12,500 ETH",
      timeAgo: "4h ago",
      region: "Asia",
    },
    {
      id: 3,
      type: "regulation",
      country: "United States",
      description: "SEC announces new crypto framework",
      timeAgo: "8h ago",
      region: "North America",
    },
    {
      id: 4,
      type: "price_dump",
      asset: "XRP",
      change: "-8%",
      timeAgo: "12h ago",
      region: "Global",
    },
    {
      id: 5,
      type: "exchange_outage",
      platform: "Binance",
      status: "Resolved",
      timeAgo: "1d ago",
      region: "Global",
    },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate global sentiment changes
    const sentimentTimer = setInterval(() => {
      setGlobalSentiment((prev) => {
        const change = Math.random() * 6 - 3; // Random value between -3 and 3
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 30), 85); // Keep between 30 and 85
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(sentimentTimer);
    };
  }, []);

  const handleCountryClick = (country: CountryData) => {
    setSelectedCountry(country);
  };

  const getSentimentColor = (sentiment: "bullish" | "bearish" | "neutral") => {
    switch (sentiment) {
      case "bullish":
        return "bg-green-500 hover:bg-green-600 group ring-2 ring-green-200 dark:ring-green-900/30";
      case "bearish":
        return "bg-red-500 hover:bg-red-600 group ring-2 ring-red-200 dark:ring-red-900/30";
      case "neutral":
        return "bg-blue-500 hover:bg-blue-600 group ring-2 ring-blue-200 dark:ring-blue-900/30";
      default:
        return "bg-gray-500 hover:bg-gray-600 group ring-2 ring-gray-200 dark:ring-gray-900/30";
    }
  };

  const getSentimentIcon = (sentiment: "bullish" | "bearish" | "neutral") => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="h-4 w-4" />;
      case "bearish":
        return <TrendingDown className="h-4 w-4" />;
      case "neutral":
        return <Minus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(num);
  };

  const filteredCountries = mockCountries
    .filter((country) => {
      if (filterSentiment === "all") return true;
      return country.sentiment === filterSentiment;
    })
    .filter((country) => {
      if (!searchQuery) return true;
      return (
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const filteredAssets = mockAssets.filter((asset) => {
    if (!searchQuery) return true;
    return (
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      className={`flex flex-col w-full h-full bg-white dark:bg-gray-900 ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* Header with tabs */}
      <div className="flex flex-col border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Global Crypto Market Map
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setIsLoading(true)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh market data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="px-3 sm:px-4 pb-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="map" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Map
              </TabsTrigger>
              <TabsTrigger value="assets" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Search and filters bar */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search countries or assets..."
                  className="pl-8 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="hidden md:flex items-center space-x-2 ml-4">
                <div className="flex items-center space-x-1">
                  <Label
                    htmlFor="asset-select"
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    Asset:
                  </Label>
                  <Select
                    value={selectedAsset}
                    onValueChange={setSelectedAsset}
                  >
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue placeholder="Select Asset" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-1">
                  <Label
                    htmlFor="time-select"
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    Time:
                  </Label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[100px] h-9">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 Hour</SelectItem>
                      <SelectItem value="24h">24 Hours</SelectItem>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Filter panel - conditionally rendered */}
              <AnimatePresence>
                {isFilterPanelOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto"
                  >
                    <div className="p-4 space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center text-sm font-medium">
                          <Filter className="h-4 w-4 mr-2 text-gray-500" />
                          Filters
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => setIsFilterPanelOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-500">
                            Sentiment
                          </Label>
                          <Select
                            value={filterSentiment}
                            onValueChange={setFilterSentiment}
                          >
                            <SelectTrigger className="w-full h-9">
                              <SelectValue placeholder="Filter by sentiment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                All Sentiments
                              </SelectItem>
                              <SelectItem value="bullish">Bullish</SelectItem>
                              <SelectItem value="bearish">Bearish</SelectItem>
                              <SelectItem value="neutral">Neutral</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-gray-500">
                              Market Cap (Min)
                            </Label>
                            <span className="text-xs font-medium">$10B+</span>
                          </div>
                          <Slider defaultValue={[10]} max={500} step={10} />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-gray-500">
                              Trading Volume (Min)
                            </Label>
                            <span className="text-xs font-medium">$1B+</span>
                          </div>
                          <Slider defaultValue={[1]} max={30} step={1} />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="show-alerts"
                            className="text-xs text-gray-500"
                          >
                            Show Alerts
                          </Label>
                          <Switch
                            id="show-alerts"
                            checked={showAlerts}
                            onCheckedChange={setShowAlerts}
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <h3 className="flex items-center text-sm font-medium mb-3">
                          <Bell className="h-4 w-4 mr-2 text-gray-500" />
                          Market Events
                        </h3>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {mockEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-xs"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <Badge
                                  variant={
                                    event.type === "price_pump"
                                      ? "default"
                                      : event.type === "price_dump"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                  className="text-[10px] h-4"
                                >
                                  {event.type.replace("_", " ")}
                                </Badge>
                                <span className="text-gray-500">
                                  {event.timeAgo}
                                </span>
                              </div>
                              <p className="font-medium">
                                {event.type === "price_pump" ||
                                event.type === "price_dump"
                                  ? `${event.asset} ${event.change}`
                                  : event.type === "whale_movement"
                                    ? `${event.amount} moved`
                                    : event.type === "regulation"
                                      ? `${event.country} regulation`
                                      : `${event.platform} outage`}
                              </p>
                              <p className="text-gray-500 mt-1">
                                {event.region}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tab content */}
              <div className="flex-1 overflow-hidden">
                <TabsContent value="map" className="h-full m-0">
                  {/* Map visualization */}
                  <div className="relative h-full w-full overflow-hidden bg-gray-50 dark:bg-gray-800">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm z-10">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin mb-3"></div>
                          <p className="text-gray-600 dark:text-gray-300">
                            Loading global market data...
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {/* Static World Map */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full max-w-[1600px] mx-auto">
                        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800">
                          <img
                            src="https://images.unsplash.com/photo-1589519160732-576f165b9aad?w=1200&q=80"
                            alt="World Map Background"
                            className="w-full h-full object-cover opacity-30"
                          />
                        </div>

                        {/* Static Map Overlay */}
                        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-1 p-4">
                          {Array.from({ length: 72 }).map((_, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 dark:border-gray-700 opacity-20"
                            ></div>
                          ))}
                        </div>

                        {/* Country indicators - positioned with fixed coordinates */}
                        <div className="absolute inset-0">
                          {filteredCountries.map((country, index) => (
                            <motion.div
                              key={country.id}
                              className={`absolute cursor-pointer rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center ${getSentimentColor(country.sentiment)} shadow-lg z-20`}
                              style={{
                                left: `${country.coordinates.x / 10}%`,
                                top: `${country.coordinates.y / 6}%`,
                                transform: "translate(-50%, -50%)", // Center the indicator on its coordinates
                                position: "absolute",
                              }}
                              onClick={() => handleCountryClick(country)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                                delay: index * 0.05,
                              }}
                            >
                              {getSentimentIcon(country.sentiment)}
                              <span className="absolute -bottom-6 text-xs font-medium bg-white dark:bg-gray-800 px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30">
                                {country.name}
                              </span>
                              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold border border-gray-200 dark:border-gray-700">
                                {country.id.toUpperCase()}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Global sentiment indicator */}
                        <motion.div
                          className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-lg p-3 shadow-lg z-20 border border-gray-200 dark:border-gray-700 max-w-[200px] sm:max-w-[250px]"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-indigo-500" />
                            Global Sentiment Index
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                              <motion.div
                                className={`h-3 rounded-full ${globalSentiment > 65 ? "bg-green-500" : globalSentiment > 45 ? "bg-blue-500" : "bg-red-500"}`}
                                style={{ width: `${globalSentiment}%` }}
                                initial={{ width: "0%" }}
                                animate={{ width: `${globalSentiment}%` }}
                                transition={{ duration: 0.5 }}
                              ></motion.div>
                            </div>
                            <span className="text-sm font-bold">
                              {globalSentiment}
                            </span>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Bearish</span>
                            <span>Neutral</span>
                            <span>Bullish</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Country detail panel */}
                    <AnimatePresence>
                      {selectedCountry && (
                        <motion.div
                          className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-3 sm:p-4 z-30 max-w-3xl mx-auto border border-gray-200 dark:border-gray-700 overflow-auto max-h-[40vh] md:max-h-[50vh]"
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 100, opacity: 0 }}
                          transition={{ type: "spring", damping: 20 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold flex items-center">
                                {selectedCountry.name}
                                <Badge className="ml-2">
                                  {selectedCountry.id.toUpperCase()}
                                </Badge>
                              </h3>
                              <div className="flex items-center mt-1">
                                <Badge
                                  className={`mr-2 ${selectedCountry.sentiment === "bullish" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : selectedCountry.sentiment === "bearish" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"}`}
                                >
                                  {selectedCountry.sentiment
                                    .charAt(0)
                                    .toUpperCase() +
                                    selectedCountry.sentiment.slice(1)}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Dominant: {selectedCountry.dominantAsset}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCountry(null)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Close
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mt-3">
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Market Cap
                              </div>
                              <div className="font-medium text-sm">
                                {selectedCountry.marketCap}
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                24h Change
                              </div>
                              <div
                                className={`font-medium text-sm ${selectedCountry.priceChange24h >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                              >
                                {selectedCountry.priceChange24h >= 0 ? "+" : ""}
                                {selectedCountry.priceChange24h}%
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Trading Volume
                              </div>
                              <div className="font-medium text-sm">
                                {selectedCountry.tradingVolume}
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Regulations
                              </div>
                              <div className="font-medium text-sm">
                                {selectedCountry.regulations}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">
                              Latest News
                            </h4>
                            <ul className="space-y-2 bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                              {selectedCountry.latestNews.map((news, index) => (
                                <li
                                  key={index}
                                  className="text-sm flex items-start"
                                >
                                  <span className="text-indigo-500 mr-2">
                                    •
                                  </span>
                                  {news}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TabsContent>

                <TabsContent
                  value="assets"
                  className="h-full m-0 p-2 sm:p-4 overflow-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredAssets.map((asset) => (
                      <Card
                        key={asset.id}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                                <span className="font-semibold text-xs">
                                  {asset.symbol}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-sm">
                                  {asset.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {asset.symbol}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">
                                $
                                {asset.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </div>
                              <div
                                className={`text-xs ${asset.priceChange24h >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                              >
                                {asset.priceChange24h >= 0 ? "+" : ""}
                                {asset.priceChange24h}%
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <span className="text-gray-500 block mb-1">
                                Market Cap
                              </span>
                              <div className="font-medium">
                                {formatNumber(asset.marketCap)}
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <span className="text-gray-500 block mb-1">
                                Volume (24h)
                              </span>
                              <div className="font-medium">
                                {formatNumber(asset.volume24h)}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-1 ${asset.priceChange24h >= 0 ? "bg-green-500" : "bg-red-500"}`}
                                style={{
                                  width: `${Math.min(Math.abs(asset.priceChange24h) * 10, 100)}%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                              <span>24h Low</span>
                              <span>24h High</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent
                  value="events"
                  className="h-full m-0 p-2 sm:p-4 overflow-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {mockEvents.map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <Badge
                              variant={
                                event.type === "price_pump"
                                  ? "default"
                                  : event.type === "price_dump"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {event.type.replace("_", " ")}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {event.timeAgo}
                            </span>
                          </div>

                          <h3 className="font-medium text-base mb-2">
                            {event.type === "price_pump" ||
                            event.type === "price_dump"
                              ? `${event.asset} ${event.change}`
                              : event.type === "whale_movement"
                                ? `${event.amount} moved`
                                : event.type === "regulation"
                                  ? `${event.country} regulation`
                                  : `${event.platform} outage`}
                          </h3>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {event.region}
                            </span>
                            <Button variant="ghost" size="sm" className="h-8">
                              Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent
                  value="insights"
                  className="h-full m-0 p-2 sm:p-4 overflow-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-base font-medium mb-3 flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2 text-indigo-500" />
                          Global Market Overview
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Total Market Cap
                            </span>
                            <span className="font-medium text-sm">$2.45T</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              24h Volume
                            </span>
                            <span className="font-medium text-sm">$98.7B</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              BTC Dominance
                            </span>
                            <span className="font-medium text-sm">48.2%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Active Cryptocurrencies
                            </span>
                            <span className="font-medium text-sm">12,831</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-base font-medium mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-indigo-500" />
                          Market Momentum
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                              <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{ width: "65%" }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium min-w-[40px] text-right">
                              65%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Bearish</span>
                            <span>Bullish</span>
                          </div>

                          <div className="pt-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-500">
                                Fear & Greed Index
                              </span>
                              <span className="font-medium text-sm text-green-500">
                                Greed (72)
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-500">
                                30-Day Volatility
                              </span>
                              <span className="font-medium text-sm">3.8%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">
                                Market Trend
                              </span>
                              <span className="font-medium text-sm text-green-500">
                                Upward
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-base font-medium mb-3 flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-indigo-500" />
                          Regional Activity
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">North America</span>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: "75%" }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">28%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Europe</span>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: "65%" }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">24%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Asia</span>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">32%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Other Regions</span>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: "42%" }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">16%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-base font-medium mb-3 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-indigo-500" />
                          Regulatory Outlook
                        </h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                            <div className="font-medium text-sm text-green-700 dark:text-green-400 mb-1">
                              Positive Developments
                            </div>
                            <ul className="text-xs text-green-600 dark:text-green-300 space-y-1">
                              <li>• ETF approvals in multiple jurisdictions</li>
                              <li>• Clearer tax guidelines in EU countries</li>
                              <li>
                                • Institutional adoption framework in Singapore
                              </li>
                            </ul>
                          </div>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                            <div className="font-medium text-sm text-red-700 dark:text-red-400 mb-1">
                              Regulatory Concerns
                            </div>
                            <ul className="text-xs text-red-600 dark:text-red-300 space-y-1">
                              <li>• Stablecoin regulations pending in US</li>
                              <li>• Mining restrictions in certain regions</li>
                              <li>• DeFi compliance challenges globally</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CryptoWorldMap;
