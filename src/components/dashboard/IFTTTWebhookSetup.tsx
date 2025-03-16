import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Clipboard,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Webhook,
  Code,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WebhookLog {
  timestamp: string;
  status: "success" | "error";
  message: string;
  payload?: any;
}

const IFTTTWebhookSetup: React.FC = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("setup");
  const [logs, setLogs] = useState<WebhookLog[]>([]);

  // Get the current domain for the webhook URL
  const domain = window.location.origin;
  const webhookUrl = `${domain}/api/webhook/ifttt`;

  // Example payload for testing
  const examplePayload = {
    summary: "Apple announces new AI features for iPhone",
    link: "https://example.com/news/apple-ai",
    timestamp: new Date().toISOString(),
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The webhook URL has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to add a log entry
  const addLogEntry = (log: WebhookLog) => {
    setLogs((prevLogs) => [log, ...prevLogs]);
  };

  // Function to send a test webhook
  const sendTestWebhook = async () => {
    try {
      // Add a log entry for the attempt
      addLogEntry({
        timestamp: new Date().toISOString(),
        status: "success",
        message: "Sending test webhook...",
        payload: examplePayload,
      });

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examplePayload),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Test webhook sent successfully",
          description: "The webhook was processed and data was stored.",
          variant: "default",
        });

        // Add success log
        addLogEntry({
          timestamp: new Date().toISOString(),
          status: "success",
          message: "Webhook processed successfully",
          payload: data,
        });
      } else {
        toast({
          title: "Error sending test webhook",
          description:
            data.error || "An error occurred while processing the webhook.",
          variant: "destructive",
        });

        // Add error log
        addLogEntry({
          timestamp: new Date().toISOString(),
          status: "error",
          message: data.error || "Error processing webhook",
          payload: data,
        });
      }
    } catch (error: any) {
      console.error("Error sending test webhook:", error);
      toast({
        title: "Error sending test webhook",
        description:
          "An error occurred while sending the webhook. Check console for details.",
        variant: "destructive",
      });

      // Add error log
      addLogEntry({
        timestamp: new Date().toISOString(),
        status: "error",
        message: error.message || "Unknown error",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Webhook className="h-5 w-5 mr-2 text-blue-500" />
          IFTTT Webhook Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
            <TabsTrigger value="test">Test Webhook</TabsTrigger>
            <TabsTrigger value="logs">Webhook Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4 mt-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Follow these steps to connect IFTTT to your news feed.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Step 1: Copy your webhook URL
                </h3>
                <div className="flex items-center space-x-2">
                  <Input
                    value={webhookUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(webhookUrl)}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">
                  Step 2: Create a new IFTTT applet
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    Go to{" "}
                    <a
                      href="https://ifttt.com/create"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      IFTTT Create
                    </a>
                  </li>
                  <li>
                    Choose your trigger service (e.g., RSS Feed, Twitter, etc.)
                  </li>
                  <li>For the action service, select "Webhooks"</li>
                  <li>Choose "Make a web request" as the action</li>
                  <li>
                    Enter your webhook URL:{" "}
                    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                      {webhookUrl}
                    </code>
                  </li>
                  <li>
                    Set Method to <Badge>POST</Badge>
                  </li>
                  <li>
                    Set Content Type to <Badge>application/json</Badge>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">
                  Step 3: Configure the body
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Use this JSON template for the body:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(
                      {
                        summary: "{{EntryTitle}}",
                        link: "{{EntryUrl}}",
                        timestamp: "{{EntryPublished}}",
                      },
                      null,
                      2,
                    )}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(
                          {
                            summary: "{{EntryTitle}}",
                            link: "{{EntryUrl}}",
                            timestamp: "{{EntryPublished}}",
                          },
                          null,
                          2,
                        ),
                      )
                    }
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy JSON
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Note: Replace the placeholder values with the appropriate
                  IFTTT ingredients for your trigger service.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="test" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Test your webhook</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Send a test payload to verify your webhook is working correctly.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-medium">Example Payload</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(JSON.stringify(examplePayload, null, 2))
                    }
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(examplePayload, null, 2)}
                </pre>
              </div>

              <Button className="w-full" onClick={sendTestWebhook}>
                <Code className="h-4 w-4 mr-2" />
                Send Test Webhook
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Recent Webhook Logs</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                View the most recent webhook requests and their status.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-20">
                    No webhook logs available yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-xs ${log.status === "success" ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800/30" : "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30"}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : "destructive"
                            }
                            className="text-[10px] h-4"
                          >
                            {log.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {log.message}
                        </p>
                        {log.payload && (
                          <details className="mt-1">
                            <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
                              View Details
                            </summary>
                            <pre className="mt-1 p-1 bg-gray-50 dark:bg-gray-950 rounded overflow-x-auto text-[10px]">
                              {JSON.stringify(log.payload, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IFTTTWebhookSetup;
