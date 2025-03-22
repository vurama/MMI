import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useMarketIntelligenceAPI } from "@/hooks/useMarketIntelligenceAPI";

export default function LiveMarketIntelligenceDemo() {
  const [inputData, setInputData] = useState<string>("");
  const [responseData, setResponseData] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const { sendMarketIntelligence, isLoading } = useMarketIntelligenceAPI({
    onSuccess: (data) => {
      setResponseData(JSON.stringify(data, null, 2));
      setStatus("success");
    },
    onError: (error) => {
      setResponseData(JSON.stringify({ error: error.message }, null, 2));
      setStatus("error");
    },
  });

  // Sample data that matches the expected structure
  const sampleData = {
    overallSentiment: {
      stocks: {
        score: 67,
        trend: 1.2,
        timeframe: "14 days",
        analysis:
          "The aggregated market metrics indicate a moderately bullish outlook for stocks over the next two weeks.",
      },
      crypto: {
        score: 58,
        trend: -2.5,
        timeframe: "14 days",
        analysis:
          "Cryptocurrency markets are showing mixed signals with a slightly bearish bias for the next two weeks.",
      },
      indices: {
        score: 65,
        trend: 0.8,
        timeframe: "14 days",
        analysis:
          "Global indices are displaying neutral to slightly bullish momentum for the coming two weeks.",
      },
      forex: {
        score: 52,
        trend: -0.5,
        timeframe: "14 days",
        analysis:
          "Currency markets indicate a neutral outlook with a slight bearish bias for the US dollar over the next two weeks.",
      },
      realestate: {
        score: 45,
        trend: -3.2,
        timeframe: "14 days",
        analysis:
          "Real estate markets are showing moderately bearish signals for the coming two weeks.",
      },
    },
    marketMetrics: {
      stocks: [
        {
          title: "Market Fear & Greed Index",
          score: 68,
          trend: -3.2,
          analysis:
            "Greed is currently the dominant market emotion, though slightly down from extreme greed levels last week.",
          aiSummary:
            "Investor sentiment remains bullish despite recent volatility in tech stocks.",
        },
        {
          title: "7-Day AI Projection Score",
          score: 64,
          trend: 1.8,
          analysis:
            "AI models predict moderately bullish conditions over the next 7 days with technology and healthcare sectors leading gains.",
          aiSummary:
            "Our AI models project continued strength in equities over the next week.",
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
            "Bitcoin's increasing market dominance signals a potential defensive rotation within the cryptocurrency market.",
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
            "Global equity indices are showing positive momentum, with developed markets outperforming emerging markets.",
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
            "The US Dollar is in a weakening trend against major currencies.",
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
            "The residential real estate market is experiencing a cooling trend.",
        },
      ],
    },
    topAssetsByMarket: {
      stocks: [
        {
          symbol: "NVDA",
          name: "NVIDIA Corp",
          action: "long",
          confidence: 92,
          price: "$892.03",
          change: "+4.2%",
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
      ],
    },
  };

  // Function to generate random market data
  const generateRandomMarketData = () => {
    const randomScore = () => Math.floor(Math.random() * 100);
    const randomTrend = () => (Math.random() * 10 - 5).toFixed(1);
    const randomChange = () => {
      const change = (Math.random() * 10 - 5).toFixed(1);
      return change.startsWith("-") ? change + "%" : "+" + change + "%";
    };

    const data = {
      overallSentiment: {
        stocks: {
          score: randomScore(),
          trend: parseFloat(randomTrend()),
          timeframe: "14 days",
          analysis:
            "Generated market analysis for stocks based on real-time data.",
        },
        crypto: {
          score: randomScore(),
          trend: parseFloat(randomTrend()),
          timeframe: "14 days",
          analysis:
            "Generated market analysis for crypto based on real-time data.",
        },
        indices: {
          score: randomScore(),
          trend: parseFloat(randomTrend()),
          timeframe: "14 days",
          analysis:
            "Generated market analysis for indices based on real-time data.",
        },
        forex: {
          score: randomScore(),
          trend: parseFloat(randomTrend()),
          timeframe: "14 days",
          analysis:
            "Generated market analysis for forex based on real-time data.",
        },
        realestate: {
          score: randomScore(),
          trend: parseFloat(randomTrend()),
          timeframe: "14 days",
          analysis:
            "Generated market analysis for real estate based on real-time data.",
        },
      },
      marketMetrics: {
        stocks: [
          {
            title: "Market Fear & Greed Index",
            score: randomScore(),
            trend: parseFloat(randomTrend()),
            analysis: "Generated analysis for Market Fear & Greed Index.",
            aiSummary: "AI-generated summary for Market Fear & Greed Index.",
          },
        ],
        crypto: [
          {
            title: "Bitcoin Dominance Index",
            score: randomScore(),
            trend: parseFloat(randomTrend()),
            analysis: "Generated analysis for Bitcoin Dominance Index.",
            aiSummary: "AI-generated summary for Bitcoin Dominance Index.",
          },
        ],
        indices: [
          {
            title: "Global Market Sentiment",
            score: randomScore(),
            trend: parseFloat(randomTrend()),
            analysis: "Generated analysis for Global Market Sentiment.",
            aiSummary: "AI-generated summary for Global Market Sentiment.",
          },
        ],
        forex: [
          {
            title: "Dollar Strength (DXY Score)",
            score: randomScore(),
            trend: parseFloat(randomTrend()),
            analysis: "Generated analysis for Dollar Strength.",
            aiSummary: "AI-generated summary for Dollar Strength.",
          },
        ],
        realestate: [
          {
            title: "Housing Market Health",
            score: randomScore(),
            trend: parseFloat(randomTrend()),
            analysis: "Generated analysis for Housing Market Health.",
            aiSummary: "AI-generated summary for Housing Market Health.",
          },
        ],
      },
      topAssetsByMarket: {
        stocks: [
          {
            symbol: "NVDA",
            name: "NVIDIA Corp",
            action: Math.random() > 0.5 ? "long" : "short",
            confidence: randomScore(),
            price: "$" + (800 + Math.random() * 200).toFixed(2),
            change: randomChange(),
          },
        ],
        crypto: [
          {
            symbol: "BTC",
            name: "Bitcoin",
            action: Math.random() > 0.5 ? "long" : "short",
            confidence: randomScore(),
            price: "$" + (60000 + Math.random() * 5000).toFixed(0),
            change: randomChange(),
          },
        ],
        indices: [
          {
            symbol: "SPX",
            name: "S&P 500",
            action: Math.random() > 0.5 ? "long" : "short",
            confidence: randomScore(),
            price: (4700 + Math.random() * 200).toFixed(2),
            change: randomChange(),
          },
        ],
        forex: [
          {
            symbol: "EUR/USD",
            name: "Euro/US Dollar",
            action: Math.random() > 0.5 ? "long" : "short",
            confidence: randomScore(),
            price: (1.0 + Math.random() * 0.2).toFixed(4),
            change: randomChange(),
          },
        ],
        realestate: [
          {
            symbol: "VNQ",
            name: "Vanguard Real Estate ETF",
            action: Math.random() > 0.5 ? "long" : "short",
            confidence: randomScore(),
            price: "$" + (80 + Math.random() * 10).toFixed(2),
            change: randomChange(),
          },
        ],
      },
      timestamp: new Date().toISOString(),
    };

    return data;
  };

  const loadSampleData = () => {
    setInputData(JSON.stringify(sampleData, null, 2));
  };

  const loadRandomData = () => {
    const randomData = generateRandomMarketData();
    setInputData(JSON.stringify(randomData, null, 2));
  };

  const sendData = async () => {
    if (!inputData) {
      alert("Please enter data to send");
      return;
    }

    try {
      // Parse the input data to ensure it's valid JSON
      const parsedData = JSON.parse(inputData);
      await sendMarketIntelligence(parsedData);
    } catch (error) {
      console.error("Error parsing or sending data:", error);
      setResponseData(
        JSON.stringify(
          {
            error:
              error instanceof Error ? error.message : "Unknown error occurred",
          },
          null,
          2,
        ),
      );
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Live Market Intelligence Demo</CardTitle>
          <CardDescription>
            Send real-time or simulated market intelligence data to your
            Supabase Edge Function
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input">
            <TabsList className="mb-4">
              <TabsTrigger value="input">Input Data</TabsTrigger>
              <TabsTrigger value="response">API Response</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="space-y-4">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={loadSampleData}>
                    Load Sample Data
                  </Button>
                  <Button variant="outline" onClick={loadRandomData}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Random Data
                  </Button>
                </div>
                <Textarea
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="Paste your market intelligence data here in JSON format..."
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
            </TabsContent>
            <TabsContent value="response">
              <div className="bg-muted p-4 rounded-md min-h-[400px] font-mono text-sm whitespace-pre-wrap overflow-auto">
                {responseData || "No response yet. Send data first."}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button onClick={sendData} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Data...
              </>
            ) : (
              "Send Data to API"
            )}
          </Button>

          {status === "success" && (
            <Alert
              variant="default"
              className="w-full bg-green-50 border-green-200"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Data was successfully sent to the API and saved in your Supabase
                database.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error sending data to the API. Check the response
                tab for details.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
