import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase/supabase";
import {
  Filter,
  History,
  Info,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Signal {
  id: string;
  ticker: string;
  timeframe: string;
  direction: "Long" | "Short";
  signalDate: string;
  sentiment: string;
  momentum: string;
  rsi: string;
  status: "pending" | "completed";
  category: string;
  signalType?: "Breakout" | "Reversal" | "Momentum" | "Support/Resistance";
  indicator?: string;
  notes?: string;
  confidence?: number;
}

interface SignalHistory {
  ticker: string;
  history: Array<{
    direction: "Long" | "Short";
    date: string;
    successful?: boolean;
  }>;
}

const timeframes = ["1H", "4H", "1D", "1W"];
const categories = ["Crypto", "Stocks", "Forex", "Commodities"];
const signalTypes = ["Breakout", "Reversal", "Momentum", "Support/Resistance"];

const mockTickers = {
  Crypto: ["BTC/USD", "ETH/USD", "SOL/USD", "ADA/USD", "DOT/USD"],
  Stocks: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"],
  Forex: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD"],
  Commodities: ["GOLD", "SILVER", "OIL", "NATURAL GAS", "COPPER"],
};

const mockSignalHistory: SignalHistory[] = [
  {
    ticker: "BTC/USD",
    history: [
      { direction: "Long", date: "2024-07-15", successful: true },
      { direction: "Short", date: "2024-07-10", successful: false },
      { direction: "Long", date: "2024-07-05", successful: true },
      { direction: "Long", date: "2024-06-28", successful: true },
      { direction: "Short", date: "2024-06-20", successful: true },
    ],
  },
  {
    ticker: "ETH/USD",
    history: [
      { direction: "Short", date: "2024-07-14", successful: true },
      { direction: "Short", date: "2024-07-08", successful: true },
      { direction: "Long", date: "2024-07-01", successful: false },
      { direction: "Short", date: "2024-06-25", successful: true },
    ],
  },
  {
    ticker: "AAPL",
    history: [
      { direction: "Long", date: "2024-07-12", successful: true },
      { direction: "Long", date: "2024-07-05", successful: true },
      { direction: "Short", date: "2024-06-28", successful: false },
    ],
  },
];

export default function SignalsPage() {
  // No need for container background when integrated into layout
  const containerStyle = ""; // Removed bg color as it's provided by the layout
  const [selectedCategory, setSelectedCategory] = useState<string>("Crypto");
  const [selectedTicker, setSelectedTicker] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1D");
  const [selectedSignalType, setSelectedSignalType] = useState<string>("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [activeTab, setActiveTab] = useState("signals");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTimeframe, setFilterTimeframe] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterSignalType, setFilterSignalType] = useState<string>("");
  const [filterDirection, setFilterDirection] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset ticker when category changes
    setSelectedTicker("");

    // Load signals from database
    fetchSignals();
  }, [selectedCategory]);

  const fetchSignals = async () => {
    try {
      // In a real implementation, this would fetch from Supabase
      const { data, error } = await supabase
        .from("signals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setSignals(data as Signal[]);
      } else {
        // If no data or empty array, set mock data
        setSignals(getMockSignals());
      }
    } catch (error) {
      console.error("Error fetching signals:", error);
      // For demo purposes, set some mock data
      setSignals(getMockSignals());
    }
  };

  const getMockSignals = (): Signal[] => {
    return [
      {
        id: "1",
        ticker: "BTC/USD",
        timeframe: "1D",
        direction: "Long",
        signalDate: new Date().toISOString(),
        sentiment: "Bullish",
        momentum: "Trend is upwards",
        rsi: "Bullish",
        status: "completed",
        category: "Crypto",
        signalType: "Breakout",
        indicator: "Pro Indicator",
        notes: "Breaking key resistance level at $60,000",
        confidence: 85,
      },
      {
        id: "2",
        ticker: "ETH/USD",
        timeframe: "4H",
        direction: "Short",
        signalDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        sentiment: "Bearish",
        momentum: "Trend is downwards",
        rsi: "Bearish",
        status: "completed",
        category: "Crypto",
        signalType: "Reversal",
        indicator: "Trend Reversal",
        notes: "Double top pattern formed on 4H chart",
        confidence: 75,
      },
      {
        id: "3",
        ticker: "AAPL",
        timeframe: "1W",
        direction: "Long",
        signalDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        sentiment: "Bullish",
        momentum: "Trend is upwards",
        rsi: "Neutral",
        status: "completed",
        category: "Stocks",
        signalType: "Momentum",
        indicator: "MACD Crossover",
        notes: "Positive earnings report expected",
        confidence: 80,
      },
      {
        id: "4",
        ticker: "EUR/USD",
        timeframe: "1H",
        direction: "Short",
        signalDate: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        sentiment: "Bearish",
        momentum: "Trend is downwards",
        rsi: "Bearish",
        status: "completed",
        category: "Forex",
        signalType: "Support/Resistance",
        indicator: "Support Break",
        notes: "Breaking below key support level",
        confidence: 70,
      },
      {
        id: "5",
        ticker: "GOLD",
        timeframe: "1D",
        direction: "Long",
        signalDate: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        sentiment: "Bullish",
        momentum: "Trend is upwards",
        rsi: "Bullish",
        status: "completed",
        category: "Commodities",
        signalType: "Breakout",
        indicator: "Volume Breakout",
        notes: "Breaking above resistance with high volume",
        confidence: 90,
      },
    ];
  };

  const getSignalHistoryForTicker = (
    ticker: string,
  ): Array<{
    direction: "Long" | "Short";
    date: string;
    successful?: boolean;
  }> => {
    const historyItem = mockSignalHistory.find(
      (item) => item.ticker === ticker,
    );
    return historyItem ? historyItem.history : [];
  };

  const requestSignal = async (e: React.FormEvent | null) => {
    // Prevent default form submission behavior
    if (e && e.preventDefault) e.preventDefault();

    if (!selectedTicker || !selectedTimeframe) {
      toast({
        title: "Missing information",
        description: "Please select both a ticker and timeframe",
        variant: "destructive",
      });
      return;
    }

    setIsRequesting(true);

    try {
      // Show toast notification for request immediately
      toast({
        title: "Signal requested",
        description: `Your signal for ${selectedTicker} (${selectedTimeframe}) has been requested.`,
      });

      // In a real implementation, this would create a record in Supabase
      const newSignal = {
        ticker: selectedTicker,
        timeframe: selectedTimeframe,
        category: selectedCategory,
        signalType: selectedSignalType || undefined,
        status: "pending",
      };

      // Try to insert into Supabase, but don't block on errors
      try {
        const { error } = await supabase.from("signals").insert([newSignal]);
        if (error) {
          console.error("Error inserting signal:", error);
        }
      } catch (insertError) {
        console.error("Error inserting signal:", insertError);
        // Continue with mock flow even if insert fails
      }

      // Simulate receiving a signal after a short delay
      setTimeout(() => {
        const mockSignal: Signal = {
          id: Math.random().toString(36).substring(7),
          ticker: selectedTicker,
          timeframe: selectedTimeframe,
          direction: Math.random() > 0.5 ? "Long" : "Short",
          signalDate: new Date().toISOString(),
          sentiment: Math.random() > 0.5 ? "Bullish" : "Bearish",
          momentum:
            Math.random() > 0.5 ? "Trend is upwards" : "Trend is downwards",
          rsi: Math.random() > 0.5 ? "Bullish" : "Bearish",
          status: "completed",
          category: selectedCategory,
          signalType:
            (selectedSignalType as any) ||
            (signalTypes[
              Math.floor(Math.random() * signalTypes.length)
            ] as any),
          indicator: "Pro Indicator",
          notes: `Signal based on technical analysis for ${selectedTicker}`,
          confidence: 70 + Math.floor(Math.random() * 20),
        };

        setSignals((prev) => [mockSignal, ...prev]);

        toast({
          title: "Signal received",
          description: `New signal for ${selectedTicker} is ready to view.`,
        });

        setActiveTab("signals");
        setIsRequesting(false);
      }, 3000);
    } catch (error) {
      console.error("Error requesting signal:", error);
      toast({
        title: "Error",
        description:
          "There was an error requesting your signal. Please try again.",
        variant: "destructive",
      });
      setIsRequesting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredSignals = useMemo(() => {
    return signals.filter((signal) => {
      // Search query filter
      if (
        searchQuery &&
        !signal.ticker.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !signal.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Timeframe filter
      if (filterTimeframe && signal.timeframe !== filterTimeframe) {
        return false;
      }

      // Category filter
      if (filterCategory && signal.category !== filterCategory) {
        return false;
      }

      // Signal type filter
      if (filterSignalType && signal.signalType !== filterSignalType) {
        return false;
      }

      // Direction filter
      if (filterDirection && signal.direction !== filterDirection) {
        return false;
      }

      return true;
    });
  }, [
    signals,
    searchQuery,
    filterTimeframe,
    filterCategory,
    filterSignalType,
    filterDirection,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterTimeframe("");
    setFilterCategory("");
    setFilterSignalType("");
    setFilterDirection("");
  };

  return (
    <div className={`container mx-auto py-6 max-w-7xl ${containerStyle}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Market Signals</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="signals">My Signals</TabsTrigger>
            <TabsTrigger value="request">Request Signal</TabsTrigger>
          </TabsList>

          <TabsContent value="signals" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>Your Signals</CardTitle>
                  <CardDescription>
                    View and filter your trading signals
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search by ticker or notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    {filteredSignals.length > 0 && (
                      <div className="text-sm text-muted-foreground flex items-center">
                        Showing {filteredSignals.length} of {signals.length}{" "}
                        signals
                      </div>
                    )}
                  </div>

                  {showFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Timeframe
                        </label>
                        <Select
                          value={filterTimeframe}
                          onValueChange={setFilterTimeframe}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Timeframes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Timeframes</SelectItem>
                            {timeframes.map((timeframe) => (
                              <SelectItem key={timeframe} value={timeframe}>
                                {timeframe}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Category
                        </label>
                        <Select
                          value={filterCategory}
                          onValueChange={setFilterCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Signal Type
                        </label>
                        <Select
                          value={filterSignalType}
                          onValueChange={setFilterSignalType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Types</SelectItem>
                            {signalTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Direction
                        </label>
                        <Select
                          value={filterDirection}
                          onValueChange={setFilterDirection}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Directions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Directions</SelectItem>
                            <SelectItem value="Long">Long</SelectItem>
                            <SelectItem value="Short">Short</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetFilters}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  )}

                  {filteredSignals.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">
                        {signals.length === 0
                          ? "No signals yet. Request your first signal!"
                          : "No signals match your current filters."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredSignals.map((signal) => {
                        const signalHistory = getSignalHistoryForTicker(
                          signal.ticker,
                        );
                        return (
                          <div
                            key={signal.id}
                            className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-0">
                                <h3 className="font-semibold text-lg">
                                  {signal.ticker}
                                </h3>
                                <Badge
                                  variant={
                                    signal.direction === "Long"
                                      ? "success"
                                      : "destructive"
                                  }
                                  className="font-medium"
                                >
                                  {signal.direction}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="flex items-center"
                                >
                                  <Clock className="h-3 w-3 mr-1" />
                                  {signal.timeframe}
                                </Badge>
                                <Badge variant="secondary">
                                  {signal.category}
                                </Badge>
                                {signal.signalType && (
                                  <Badge
                                    variant="outline"
                                    className="bg-primary/10"
                                  >
                                    {signal.signalType}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(signal.signalDate)}
                              </div>
                            </div>

                            <Separator className="my-3" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                              <div>
                                <p className="text-sm font-medium flex items-center">
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  {signal.direction} in Play
                                  <Badge
                                    className={`ml-2 ${signal.sentiment === "Bullish" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}`}
                                    variant="outline"
                                  >
                                    {signal.sentiment}
                                  </Badge>
                                </p>
                                {signal.indicator && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Indicator: {signal.indicator}
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Momentum: {signal.momentum}
                                </p>
                                <p className="text-sm mt-1">
                                  RSI:{" "}
                                  <span
                                    className={
                                      signal.rsi === "Bullish"
                                        ? "text-green-600 font-medium"
                                        : signal.rsi === "Bearish"
                                          ? "text-red-600 font-medium"
                                          : "text-yellow-600 font-medium"
                                    }
                                  >
                                    {signal.rsi}
                                  </span>
                                </p>
                              </div>
                              <div>
                                {signal.notes && (
                                  <p className="text-sm">
                                    <span className="font-medium">Notes:</span>{" "}
                                    {signal.notes}
                                  </p>
                                )}
                                {signal.confidence && (
                                  <div className="mt-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="flex items-center">
                                            <span className="text-xs font-medium mr-1">
                                              Confidence:
                                            </span>
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                              <div
                                                className={`h-full ${signal.confidence >= 80 ? "bg-green-500" : signal.confidence >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                                style={{
                                                  width: `${signal.confidence}%`,
                                                }}
                                              ></div>
                                            </div>
                                            <span className="ml-1 text-xs">
                                              {signal.confidence}%
                                            </span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="text-xs">
                                            Confidence based on historical
                                            accuracy
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                )}
                              </div>
                            </div>

                            {signalHistory.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-border">
                                <div className="flex items-center mb-2">
                                  <History className="h-4 w-4 mr-1" />
                                  <span className="text-sm font-medium">
                                    Signal History
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {signalHistory.map((item, index) => (
                                    <TooltipProvider key={index}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Badge
                                            variant="outline"
                                            className={`${item.direction === "Long" ? "border-green-500" : "border-red-500"} ${item.successful ? "bg-green-500/10" : "bg-red-500/10"}`}
                                          >
                                            {item.direction}
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="text-xs">
                                            {item.date} -{" "}
                                            {item.successful
                                              ? "Successful"
                                              : "Unsuccessful"}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="request" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Request a New Signal</CardTitle>
                <CardDescription>
                  Select your asset and timeframe to receive a trading signal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={(e) => requestSignal(e)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Asset Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ticker</label>
                      <Select
                        value={selectedTicker}
                        onValueChange={setSelectedTicker}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ticker" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTickers[
                            selectedCategory as keyof typeof mockTickers
                          ].map((ticker) => (
                            <SelectItem key={ticker} value={ticker}>
                              {ticker}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timeframe</label>
                      <Select
                        value={selectedTimeframe}
                        onValueChange={setSelectedTimeframe}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeframes.map((timeframe) => (
                            <SelectItem key={timeframe} value={timeframe}>
                              {timeframe}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Signal Type (Optional)
                      </label>
                      <Select
                        value={selectedSignalType}
                        onValueChange={setSelectedSignalType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any signal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any signal type</SelectItem>
                          {signalTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg flex items-start space-x-3 mt-6">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">About Signal Requests</p>
                      <p className="text-muted-foreground mt-1">
                        Signals are generated by professional traders and
                        technical analysts. Each signal includes direction,
                        momentum indicators, and supporting analysis. Historical
                        performance for each asset is provided for reference.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      type="submit"
                      disabled={
                        isRequesting || !selectedTicker || !selectedTimeframe
                      }
                      className="w-full md:w-auto"
                      variant="default"
                    >
                      {isRequesting ? (
                        <>
                          <LoadingSpinner className="mr-2" />
                          Requesting...
                        </>
                      ) : (
                        "Request Signal"
                      )}
                    </Button>
                    <Button
                      onClick={() => requestSignal(null)}
                      disabled={
                        isRequesting || !selectedTicker || !selectedTimeframe
                      }
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isRequesting ? (
                        <>
                          <LoadingSpinner className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Quick Request"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
