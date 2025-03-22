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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function MarketIntelligenceDebugger() {
  const [responseData, setResponseData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [envVars, setEnvVars] = useState<{ [key: string]: string | null }>({});

  const checkEnvironment = () => {
    setIsLoading(true);
    setStatus("idle");

    try {
      // Check environment variables
      const vars = {
        VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || null,
        VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || null,
      };

      setEnvVars(vars);

      // Construct the Edge Function URL for a simple test
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("Supabase URL not found in environment variables");
      }

      // Test the connection with a simple OPTIONS request
      testConnection(supabaseUrl);
    } catch (error) {
      console.error("Error checking environment:", error);
      setResponseData(
        JSON.stringify(
          {
            error:
              error instanceof Error ? error.message : "Unknown error occurred",
            help: "Make sure your Supabase environment variables are set correctly",
          },
          null,
          2,
        ),
      );
      setStatus("error");
      setIsLoading(false);
    }
  };

  const testConnection = async (supabaseUrl: string) => {
    try {
      // Construct the Edge Function URL
      const functionUrl = `${supabaseUrl}/functions/v1/market-intelligence`;

      // Make an OPTIONS request to test CORS and basic connectivity
      const response = await fetch(functionUrl, {
        method: "OPTIONS",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the function exists and responds
      if (response.ok) {
        setResponseData(
          JSON.stringify(
            {
              success: true,
              message: "Successfully connected to the Edge Function",
              status: response.status,
              statusText: response.statusText,
              environmentVariables: {
                VITE_SUPABASE_URL: envVars.VITE_SUPABASE_URL
                  ? "✓ Set"
                  : "✗ Missing",
                VITE_SUPABASE_ANON_KEY: envVars.VITE_SUPABASE_ANON_KEY
                  ? "✓ Set"
                  : "✗ Missing",
              },
              note: "This only confirms the function exists. The function itself may still have issues with its environment variables.",
            },
            null,
            2,
          ),
        );
        setStatus("success");
      } else {
        throw new Error(
          `Function responded with status: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      setResponseData(
        JSON.stringify(
          {
            error:
              error instanceof Error ? error.message : "Unknown error occurred",
            environmentVariables: {
              VITE_SUPABASE_URL: envVars.VITE_SUPABASE_URL
                ? "✓ Set"
                : "✗ Missing",
              VITE_SUPABASE_ANON_KEY: envVars.VITE_SUPABASE_ANON_KEY
                ? "✓ Set"
                : "✗ Missing",
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
          },
          null,
          2,
        ),
      );
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Market Intelligence API Debugger</CardTitle>
          <CardDescription>
            Diagnose issues with your Supabase Edge Function
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Troubleshooting Guide</AlertTitle>
              <AlertDescription>
                <p className="mb-2">The Market Intelligence API requires:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    A deployed Supabase Edge Function named
                    "market-intelligence"
                  </li>
                  <li>Environment variables set in your Supabase project:</li>
                  <ul className="list-disc pl-5">
                    <li>
                      <code>SUPABASE_URL</code> - Your Supabase project URL
                    </li>
                    <li>
                      <code>SUPABASE_SERVICE_KEY</code> - Your Supabase service
                      role key
                    </li>
                  </ul>
                  <li>
                    A "market_intelligence" table in your Supabase database
                  </li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-md min-h-[300px] font-mono text-sm whitespace-pre-wrap overflow-auto">
              {responseData || "Click 'Run Diagnostics' to check your setup."}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button
            onClick={checkEnvironment}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Diagnostics...
              </>
            ) : (
              "Run Diagnostics"
            )}
          </Button>

          {status === "success" && (
            <Alert
              variant="default"
              className="w-full bg-green-50 border-green-200"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">
                Connection Successful
              </AlertTitle>
              <AlertDescription className="text-green-700">
                The Edge Function exists, but check the response for more
                details about your environment.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                There was an error connecting to your Edge Function. Check the
                response for details.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
