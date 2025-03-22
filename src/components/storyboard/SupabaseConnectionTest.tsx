import React, { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseData, setResponseData] = useState<any>(null);
  const [envVars, setEnvVars] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    // Check environment variables on component mount
    checkEnvironmentVariables();
  }, []);

  const checkEnvironmentVariables = () => {
    const vars = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || null,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || null,
    };
    setEnvVars(vars);
  };

  const testSupabaseConnection = async () => {
    setConnectionStatus("loading");
    try {
      // Simple query to test connection
      const { data, error } = await supabase
        .from("_prisma_migrations")
        .select("*")
        .limit(1);

      if (error) {
        throw error;
      }

      setResponseData({
        success: true,
        message: "Successfully connected to Supabase",
        projectUrl: import.meta.env.VITE_SUPABASE_URL,
        data: data,
      });
      setConnectionStatus("success");
    } catch (error) {
      console.error("Error connecting to Supabase:", error);
      setResponseData({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        projectUrl: import.meta.env.VITE_SUPABASE_URL,
      });
      setConnectionStatus("error");
    }
  };

  const testEdgeFunction = async () => {
    setConnectionStatus("loading");
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("Supabase URL not found in environment variables");
      }

      // Construct the Edge Function URL
      const functionUrl = `${supabaseUrl}/functions/v1/market-intelligence`;

      // Make an OPTIONS request to test CORS and basic connectivity
      const response = await fetch(functionUrl, {
        method: "OPTIONS",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setResponseData({
          success: true,
          message: "Successfully connected to the Edge Function",
          status: response.status,
          statusText: response.statusText,
          functionUrl: functionUrl,
        });
        setConnectionStatus("success");
      } else {
        throw new Error(
          `Function responded with status: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error testing Edge Function:", error);
      setResponseData({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        projectUrl: import.meta.env.VITE_SUPABASE_URL,
      });
      setConnectionStatus("error");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>
            Verify your Supabase connection and Edge Function availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Environment Variables</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong>VITE_SUPABASE_URL:</strong>{" "}
                    {envVars.VITE_SUPABASE_URL ? (
                      <span className="text-green-600">
                        {envVars.VITE_SUPABASE_URL}
                      </span>
                    ) : (
                      <span className="text-red-600">Not set</span>
                    )}
                  </div>
                  <div>
                    <strong>VITE_SUPABASE_ANON_KEY:</strong>{" "}
                    {envVars.VITE_SUPABASE_ANON_KEY ? (
                      <span className="text-green-600">
                        ✓ Set (hidden for security)
                      </span>
                    ) : (
                      <span className="text-red-600">Not set</span>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {responseData && (
              <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-auto">
                {JSON.stringify(responseData, null, 2)}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="flex w-full gap-4">
            <Button
              onClick={testSupabaseConnection}
              disabled={connectionStatus === "loading"}
              className="flex-1"
            >
              {connectionStatus === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                "Test Database Connection"
              )}
            </Button>

            <Button
              onClick={testEdgeFunction}
              disabled={connectionStatus === "loading"}
              className="flex-1"
            >
              {connectionStatus === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Edge Function...
                </>
              ) : (
                "Test Edge Function"
              )}
            </Button>
          </div>

          {connectionStatus === "success" && (
            <Alert
              variant="default"
              className="w-full bg-green-50 border-green-200"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">
                Connection Successful
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Check the response above for more details.
              </AlertDescription>
            </Alert>
          )}

          {connectionStatus === "error" && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                There was an error connecting to Supabase. Check the response
                for details.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
