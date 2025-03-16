import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
}

const timeframes = ["4H", "1D", "1W"];
const categories = ["Crypto", "Stocks", "Forex", "Commodities"];

const mockTickers = {
  Crypto: ["BTC/USD", "ETH/USD", "SOL/USD", "ADA/USD", "DOT/USD"],
  Stocks: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"],
  Forex: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD"],
  Commodities: ["GOLD", "SILVER", "OIL", "NATURAL GAS", "COPPER"],
};

export default function SignalsPage() {
  // No need for container background when integrated into layout
  const containerStyle = ""; // Removed bg color as it's provided by the layout
  const [selectedCategory, setSelectedCategory] = useState<string>("Crypto");
  const [selectedTicker, setSelectedTicker] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1D");
  const [isRequesting, setIsRequesting] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [activeTab, setActiveTab] = useState("request");
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
      },
    ];
  };

  const requestSignal = async () => {
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
      // In a real implementation, this would create a record in Supabase
      const newSignal = {
        ticker: selectedTicker,
        timeframe: selectedTimeframe,
        category: selectedCategory,
        status: "pending",
      };

      try {
        const { data, error } = await supabase
          .from("signals")
          .insert([newSignal])
          .select();

        if (error) throw error;
      } catch (insertError) {
        console.error("Error inserting signal:", insertError);
        // Continue with mock flow even if insert fails
      }

      toast({
        title: "Signal requested",
        description: `Your signal for ${selectedTicker} (${selectedTimeframe}) has been requested.`,
      });

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
        };

        setSignals((prev) => [mockSignal, ...prev]);

        toast({
          title: "Signal received",
          description: `New signal for ${selectedTicker} is ready to view.`,
        });

        setActiveTab("signals");
      }, 3000);
    } catch (error) {
      console.error("Error requesting signal:", error);
      toast({
        title: "Error",
        description:
          "There was an error requesting your signal. Please try again.",
        variant: "destructive",
      });
    } finally {
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

  return (
    <div className={`container mx-auto py-6 max-w-7xl ${containerStyle}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Market Signals</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="request">Request Signal</TabsTrigger>
            <TabsTrigger value="signals">My Signals</TabsTrigger>
          </TabsList>

          <TabsContent value="request" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Request a New Signal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                </div>

                <Button
                  onClick={requestSignal}
                  disabled={
                    isRequesting || !selectedTicker || !selectedTimeframe
                  }
                  className="w-full md:w-auto"
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Signals</CardTitle>
              </CardHeader>
              <CardContent>
                {signals.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No signals yet. Request your first signal!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {signals.map((signal) => (
                      <div
                        key={signal.id}
                        className="border rounded-lg p-4 bg-card"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <h3 className="font-semibold text-lg">
                              {signal.ticker}
                            </h3>
                            <Badge
                              variant={
                                signal.direction === "Long"
                                  ? "success"
                                  : "destructive"
                              }
                            >
                              {signal.direction}
                            </Badge>
                            <Badge variant="outline">{signal.timeframe}</Badge>
                            <Badge variant="secondary">{signal.category}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Signal Date: {formatDate(signal.signalDate)}
                          </div>
                        </div>

                        <Separator className="my-3" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm font-medium">
                              {signal.direction} in Play
                              <Badge
                                className="ml-2"
                                variant={
                                  signal.sentiment === "Bullish"
                                    ? "success"
                                    : "destructive"
                                }
                              >
                                {signal.sentiment}
                              </Badge>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm">
                              Momentum: {signal.momentum}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm">
                              RSI:{" "}
                              <span
                                className={
                                  signal.rsi === "Bullish"
                                    ? "text-green-500"
                                    : signal.rsi === "Bearish"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                }
                              >
                                {signal.rsi}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
