import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  InfoIcon,
  SendIcon,
  CheckCircle,
  AlertTriangle,
  Code,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/supabase/supabase";

const MarketIntelligenceDirectTest = () => {
  const [jsonData, setJsonData] = useState<string>(`{
  "overallSentiment": {
    "stocks": {
      "score": 72,
      "trend": 2.5,
      "timeframe": "14 days",
      "analysis": "The stock market is showing strong bullish momentum with technology and financial sectors leading the gains."
    },
    "crypto": {
      "score": 58,
      "trend": -2.5,
      "timeframe": "14 days",
      "analysis": "Cryptocurrency markets are showing mixed signals with a slightly bearish bias for the next two weeks."
    },
    "indices": {
      "score": 65,
      "trend": 0.8,
      "timeframe": "14 days",
      "analysis": "Global indices are displaying neutral to slightly bullish momentum for the coming two weeks."
    },
    "forex": {
      "score": 52,
      "trend": -0.5,
      "timeframe": "14 days",
      "analysis": "Currency markets indicate a neutral outlook with a slight bearish bias for the US dollar over the next two weeks."
    },
    "realestate": {
      "score": 45,
      "trend": -3.2,
      "timeframe": "14 days",
      "analysis": "Real estate markets are showing moderately bearish signals for the coming two weeks."
    }
  },
  "marketMetrics": {
    "stocks": [
      {
        "title": "Market Fear & Greed Index",
        "score": 75,
        "trend": 4.2,
        "analysis": "Greed is currently the dominant market emotion, up significantly from last week's levels.",
        "aiSummary": "Investor sentiment is strongly bullish with the Fear & Greed Index showing elevated optimism."
      }
    ],
    "crypto": [
      {
        "title": "Bitcoin Dominance Index",
        "score": 65,
        "trend": 1.8,
        "analysis": "Bitcoin's market dominance is increasing, suggesting a potential flight to quality within the crypto space.",
        "aiSummary": "Bitcoin's increasing market dominance signals a potential defensive rotation within the cryptocurrency market."
      }
    ],
    "indices": [
      {
        "title": "Global Market Sentiment",
        "score": 67,
        "trend": 1.2,
        "analysis": "Overall positive sentiment across major global indices with developed markets outperforming emerging markets.",
        "aiSummary": "Global equity indices are showing positive momentum, with developed markets outperforming emerging markets."
      }
    ],
    "forex": [
      {
        "title": "Dollar Strength (DXY Score)",
        "score": 42,
        "trend": -1.5,
        "analysis": "The US Dollar is showing weakness against major currencies, potentially benefiting multinational corporations and commodities.",
        "aiSummary": "The US Dollar is in a weakening trend against major currencies."
      }
    ],
    "realestate": [
      {
        "title": "Housing Market Health",
        "score": 48,
        "trend": -4.5,
        "analysis": "Residential real estate showing signs of cooling with decreased transaction volumes and moderating price growth.",
        "aiSummary": "The residential real estate market is experiencing a cooling trend."
      }
    ]
  },
  "topAssetsByMarket": {
    "stocks": [
      {
        "symbol": "NVDA",
        "name": "NVIDIA Corp",
        "action": "long",
        "confidence": 94,
        "price": "$925.17",
        "change": "+5.8%"
      }
    ],
    "crypto": [
      {
        "symbol": "BTC",
        "name": "Bitcoin",
        "action": "short",
        "confidence": 76,
        "price": "$62,345",
        "change": "-3.2%"
      }
    ],
    "indices": [
      {
        "symbol": "SPX",
        "name": "S&P 500",
        "action": "long",
        "confidence": 81,
        "price": "4,782.82",
        "change": "+1.2%"
      }
    ],
    "forex": [
      {
        "symbol": "EUR/USD",
        "name": "Euro/US Dollar",
        "action": "long",
        "confidence": 74,
        "price": "1.0845",
        "change": "+0.6%"
      }
    ],
    "realestate": [
      {
        "symbol": "VNQ",
        "name": "Vanguard Real Estate ETF",
        "action": "short",
        "confidence": 65,
        "price": "$82.45",
        "change": "-0.8%"
      }
    ]
  }
}`);
  const [responseStatus, setResponseStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [supabaseInfo, setSupabaseInfo] = useState<string>("");

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

  const testSupabaseConnection = async () => {
    try {
      setResponseStatus("loading");
      setResponseMessage("Testing Supabase connection...");

      // Get Supabase URL and key from environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      setSupabaseInfo(
        `URL: ${supabaseUrl ? "Available" : "Not available"}, Key: ${supabaseKey ? "Available" : "Not available"}`,
      );

      // Test a simple query
      const { data, error } = await supabase
        .from("market_intelligence")
        .select("created_at")
        .limit(1);

      if (error) throw error;

      setResponseStatus("success");
      setResponseMessage(
        `Supabase connection successful! ${data ? `Found ${data.length} records.` : "No records found."}`,
      );
    } catch (error) {
      console.error("Error testing Supabase connection:", error);
      setResponseStatus("error");
      setResponseMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      );
    }
  };

  const handleSendToSupabase = async () => {
    try {
      setResponseStatus("loading");
      setResponseMessage("Sending data to Supabase directly...");

      // Parse the JSON data
      const parsedData = JSON.parse(jsonData);

      // Insert directly into Supabase
      const { data, error } = await supabase
        .from("market_intelligence")
        .insert([
          {
            data: parsedData,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      setResponseStatus("success");
      setResponseMessage(
        "Data successfully sent to Supabase! The dashboard will update automatically.",
      );
    } catch (error) {
      console.error("Error sending data:", error);
      setResponseStatus("error");
      setResponseMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      );
    }
  };

  const generateRandomData = () => {
    const randomData = generateRandomMarketData();
    setJsonData(JSON.stringify(randomData, null, 2));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Market Intelligence Direct Test
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This tool bypasses the Edge Function and sends data directly to
          Supabase. Use this to test if your Supabase connection is working
          properly.
        </p>
      </div>

      <div className="mb-4">
        <Button
          onClick={testSupabaseConnection}
          variant="outline"
          className="mb-4"
        >
          Test Supabase Connection
        </Button>

        {supabaseInfo && (
          <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>Supabase Environment</AlertTitle>
            <AlertDescription>{supabaseInfo}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">JSON Data</div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={generateRandomData}>
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Generate Random Data
            </Button>
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              <Code className="h-3 w-3 mr-1" /> JSON
            </Badge>
          </div>
        </div>
        <Textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="font-mono text-sm h-96 mt-1"
          placeholder="Paste your JSON data here..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSendToSupabase}
          disabled={responseStatus === "loading"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          {responseStatus === "loading" ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            <>
              <SendIcon className="h-4 w-4" />
              Send Data Directly to Supabase
            </>
          )}
        </Button>
      </div>

      {responseStatus !== "idle" && (
        <div
          className={`mt-6 p-4 rounded-lg ${responseStatus === "success" ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : responseStatus === "error" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"}`}
        >
          <div className="flex items-start">
            {responseStatus === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
            ) : responseStatus === "error" ? (
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
            ) : (
              <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
            )}
            <div>
              <h4
                className={`font-medium ${responseStatus === "success" ? "text-green-800 dark:text-green-300" : responseStatus === "error" ? "text-red-800 dark:text-red-300" : "text-blue-800 dark:text-blue-300"}`}
              >
                {responseStatus === "success"
                  ? "Success"
                  : responseStatus === "error"
                    ? "Error"
                    : "Processing"}
              </h4>
              <p
                className={`text-sm ${responseStatus === "success" ? "text-green-700 dark:text-green-400" : responseStatus === "error" ? "text-red-700 dark:text-red-400" : "text-blue-700 dark:text-blue-400"}`}
              >
                {responseMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketIntelligenceDirectTest;
