import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  InfoIcon,
  SendIcon,
  CheckCircle,
  AlertTriangle,
  Code,
} from "lucide-react";
import { supabase } from "@/supabase/supabase";

const MarketIntelligenceAPIStoryboard = () => {
  const [apiUrl, setApiUrl] = useState<string>(
    `${window.location.origin}/api/market-intelligence`,
  );
  const [jsonData, setJsonData] = useState<string>(`{
  "overallSentiment": {
    "stocks": {
      "score": 72,
      "trend": 2.5,
      "timeframe": "14 days",
      "analysis": "The stock market is showing strong bullish momentum with technology and financial sectors leading the gains. Institutional investors are increasing their positions, suggesting confidence in continued market strength. Earnings reports have generally exceeded expectations, providing fundamental support for current valuations."
    },
    "crypto": {
      "score": 58,
      "trend": -2.5,
      "timeframe": "14 days",
      "analysis": "Cryptocurrency markets are showing mixed signals with a slightly bearish bias for the next two weeks. Bitcoin's relative strength compared to altcoins suggests a defensive positioning by investors."
    },
    "indices": {
      "score": 65,
      "trend": 0.8,
      "timeframe": "14 days",
      "analysis": "Global indices are displaying neutral to slightly bullish momentum for the coming two weeks. Developed markets are outperforming emerging markets."
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
      "analysis": "Real estate markets are showing moderately bearish signals for the coming two weeks. Residential property is experiencing cooling demand."
    }
  },
  "marketMetrics": {
    "stocks": [
      {
        "title": "Market Fear & Greed Index",
        "score": 75,
        "trend": 4.2,
        "analysis": "Greed is currently the dominant market emotion, up significantly from last week's levels.",
        "aiSummary": "Investor sentiment is strongly bullish with the Fear & Greed Index showing elevated optimism. Consider maintaining equity positions but be cautious about new entries at current levels."
      },
      {
        "title": "7-Day AI Projection Score",
        "score": 68,
        "trend": 2.3,
        "analysis": "AI models predict continued bullish conditions over the next 7 days with technology and healthcare sectors leading gains.",
        "aiSummary": "Our AI models project continued strength in equities over the next week, with particular momentum in technology and healthcare."
      },
      {
        "title": "Institutional Flow Indicator",
        "score": 82,
        "trend": 5.7,
        "analysis": "Strong institutional buying detected across multiple sectors, suggesting broad market confidence.",
        "aiSummary": "Significant institutional capital is flowing into the market across sectors, a typically bullish signal for broader market direction."
      },
      {
        "title": "Retail Sentiment Index",
        "score": 70,
        "trend": 3.2,
        "analysis": "Retail investors showing increased optimism with strong buying activity in popular tech and consumer stocks.",
        "aiSummary": "Retail investor sentiment has strengthened considerably, with social media analysis showing heightened interest in technology and consumer discretionary stocks."
      }
    ],
    "crypto": [...],
    "indices": [...],
    "forex": [...],
    "realestate": [...]
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
      },
      {
        "symbol": "MSFT",
        "name": "Microsoft Corp",
        "action": "long",
        "confidence": 88,
        "price": "$415.32",
        "change": "+2.4%"
      },
      {
        "symbol": "AAPL",
        "name": "Apple Inc",
        "action": "long",
        "confidence": 84,
        "price": "$192.75",
        "change": "+3.2%"
      }
    ],
    "crypto": [...],
    "indices": [...],
    "forex": [...],
    "realestate": [...]
  }
}`);
  const [responseStatus, setResponseStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("supabase");

  const handleSendToSupabase = async () => {
    try {
      setResponseStatus("loading");
      setResponseMessage("Sending data to Supabase...");

      // Parse the JSON data
      const parsedData = JSON.parse(jsonData);

      // Insert directly into Supabase
      console.log("Inserting data directly into Supabase");
      const { data, error } = await supabase
        .from("market_intelligence")
        .insert([
          {
            data: parsedData,
            created_at: new Date().toISOString(),
          },
        ]);

      console.log("Supabase response:", { data, error });
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

  const handleSendToAPI = async () => {
    try {
      setResponseStatus("loading");
      setResponseMessage("Sending data to API endpoint...");

      // Parse the JSON data to validate it
      const parsedData = JSON.parse(jsonData);

      // Send to the API endpoint
      console.log("Sending data to API endpoint:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          ...(import.meta.env.VITE_SUPABASE_ANON_KEY
            ? {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              }
            : {}),
        },
        body: jsonData,
      });

      console.log("API response status:", response.status);
      const result = await response.json();
      console.log("API response data:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to send data to API");
      }

      setResponseStatus("success");
      setResponseMessage(
        "Data successfully sent to API! The dashboard will update automatically.",
      );
    } catch (error) {
      console.error("Error sending data:", error);
      setResponseStatus("error");
      setResponseMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Market Intelligence API Tester
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Use this tool to test sending market intelligence data to your
          dashboard. The data will be stored in Supabase and automatically
          update the dashboard.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supabase">Direct to Supabase</TabsTrigger>
          <TabsTrigger value="api">API Endpoint</TabsTrigger>
        </TabsList>

        <TabsContent value="supabase" className="mt-4">
          <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>Direct Supabase Method</AlertTitle>
            <AlertDescription>
              This method sends data directly to your Supabase database using
              the Supabase client. This is useful for testing within your
              application.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="api" className="mt-4">
          <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>API Endpoint Method</AlertTitle>
            <AlertDescription>
              This method sends data to an API endpoint that will process and
              store the data in your Supabase database. This is useful for
              external systems to update your dashboard.
            </AlertDescription>
          </Alert>

          <div className="mb-4">
            <Label htmlFor="apiUrl">API Endpoint URL</Label>
            <Input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="mt-1"
              placeholder="https://your-api-endpoint.com/market-intelligence"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="jsonData">JSON Data</Label>
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <Code className="h-3 w-3 mr-1" /> JSON
          </Badge>
        </div>
        <Textarea
          id="jsonData"
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="font-mono text-sm h-96 mt-1"
          placeholder="Paste your JSON data here..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={
            activeTab === "supabase" ? handleSendToSupabase : handleSendToAPI
          }
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
              Send Data
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

export default MarketIntelligenceAPIStoryboard;
