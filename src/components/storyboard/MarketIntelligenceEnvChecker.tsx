import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

const MarketIntelligenceEnvChecker = () => {
  const [envVars, setEnvVars] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkEnvironmentVariables();
  }, []);

  const checkEnvironmentVariables = () => {
    setLoading(true);

    // Check for all relevant environment variables
    const vars = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || null,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY
        ? "[AVAILABLE]"
        : null,
      SUPABASE_URL: "[SERVER ONLY]",
      SUPABASE_ANON_KEY: "[SERVER ONLY]",
      SUPABASE_SERVICE_KEY: "[SERVER ONLY]",
      SUPABASE_PROJECT_ID: "[SERVER ONLY]",
    };

    setEnvVars(vars);
    setLoading(false);
  };

  const getSupabaseUrl = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    if (!url) return null;

    try {
      // Check if it's a valid URL
      new URL(url);
      return url;
    } catch (e) {
      return null;
    }
  };

  const testEdgeFunctionUrl = () => {
    const url = getSupabaseUrl();
    if (!url) return null;

    return `${url}/functions/v1/market-intelligence`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Environment Variables Checker
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This tool checks the availability of environment variables needed for
          the Market Intelligence API.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin h-6 w-6 border-2 border-indigo-500 border-opacity-50 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="font-mono text-sm">{key}</div>
                  <Badge
                    className={
                      value
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {value
                      ? value === "[SERVER ONLY]"
                        ? value
                        : "Available"
                      : "Not Available"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Edge Function URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">
                Expected Edge Function URL:
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm break-all">
                {testEdgeFunctionUrl() ||
                  "Cannot determine URL (VITE_SUPABASE_URL not available or invalid)"}
              </div>
            </div>

            <Alert
              className={
                getSupabaseUrl()
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }
            >
              {getSupabaseUrl() ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <AlertTitle>
                {getSupabaseUrl() ? "URL Looks Valid" : "URL Issue Detected"}
              </AlertTitle>
              <AlertDescription>
                {getSupabaseUrl()
                  ? "The Supabase URL appears to be properly formatted."
                  : "The VITE_SUPABASE_URL environment variable is either missing or not properly formatted."}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={checkEnvironmentVariables} variant="outline">
          Refresh Check
        </Button>

        <Button
          onClick={() => window.open(testEdgeFunctionUrl() || "", "_blank")}
          disabled={!testEdgeFunctionUrl()}
        >
          Test Edge Function URL
        </Button>
      </div>
    </div>
  );
};

export default MarketIntelligenceEnvChecker;
