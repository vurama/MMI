import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const SupabaseEdgeFunctionTest = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const [envStatus, setEnvStatus] = useState<{
    url: boolean;
    key: boolean;
  }>({ url: false, key: false });

  // Check environment variables on component mount
  React.useEffect(() => {
    checkEnvironmentVariables();
  }, []);

  const checkEnvironmentVariables = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    setEnvStatus({
      url: !!url,
      key: !!key,
    });

    if (url && key) {
      const client = createClient(url, key);
      setSupabaseClient(client);
    }
  };

  const testEdgeFunction = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      if (!supabaseClient) {
        throw new Error("Supabase client not initialized");
      }

      // Test data to send to the edge function
      const testData = {
        query: "market sentiment for tech stocks",
        timestamp: new Date().toISOString(),
        test: true,
      };

      // Call the edge function
      const { data, error } = await supabaseClient.functions.invoke(
        "market-intelligence",
        {
          body: testData,
        },
      );

      if (error) throw error;

      setTestResult({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Edge function test failed:", error);

      setTestResult({
        success: false,
        error: error.message || "Unknown error",
        timestamp: new Date().toISOString(),
        environmentVariables: {
          VITE_SUPABASE_URL: envStatus.url ? "✓ Available" : "✗ Missing",
          VITE_SUPABASE_ANON_KEY: envStatus.key ? "✓ Available" : "✗ Missing",
        },
        possibleIssues: [
          "Edge Function not deployed",
          "Supabase project not properly configured",
          "CORS issues with the Edge Function",
          "Network connectivity problems",
        ],
        nextSteps: [
          "Check if the Edge Function is deployed in your Supabase project",
          "Verify that SUPABASE_URL and SUPABASE_SERVICE_KEY are set in your Supabase Edge Function settings",
          "Make sure your Supabase project is on a paid plan that supports Edge Functions",
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Supabase Edge Function Test
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This tool tests the connection to your Supabase Edge Function and
          helps diagnose any issues.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm">VITE_SUPABASE_URL</div>
              <Badge
                className={
                  envStatus.url
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {envStatus.url ? "Available" : "Missing"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm">VITE_SUPABASE_ANON_KEY</div>
              <Badge
                className={
                  envStatus.key
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {envStatus.key ? "Available" : "Missing"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Edge Function Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert
              className={
                !envStatus.url || !envStatus.key
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-blue-50 border-blue-200"
              }
            >
              {!envStatus.url || !envStatus.key ? (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-blue-600" />
              )}
              <AlertTitle>
                {!envStatus.url || !envStatus.key
                  ? "Missing Environment Variables"
                  : "Ready to Test"}
              </AlertTitle>
              <AlertDescription>
                {!envStatus.url || !envStatus.key
                  ? "Please ensure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are set."
                  : "Environment variables are set. You can now test the edge function."}
              </AlertDescription>
            </Alert>

            <Button
              onClick={testEdgeFunction}
              disabled={loading || !envStatus.url || !envStatus.key}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Edge Function"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle>
              Test Result{" "}
              {testResult.success ? (
                <Badge className="ml-2 bg-green-100 text-green-800">
                  Success
                </Badge>
              ) : (
                <Badge className="ml-2 bg-red-100 text-red-800">Failed</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-auto max-h-96">
                <pre className="text-sm">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>

              {!testResult.success && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Troubleshooting Steps</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      {testResult.nextSteps?.map(
                        (step: string, index: number) => (
                          <li key={index}>{step}</li>
                        ),
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupabaseEdgeFunctionTest;
