import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IFTTTWebhookSetup from "../dashboard/IFTTTWebhookSetup";
import NewsFeedDisplay from "../dashboard/NewsFeedDisplay";

export default function WebhookIntegrationStoryboard() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">IFTTT Webhook Integration</h1>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="setup">Webhook Setup</TabsTrigger>
          <TabsTrigger value="feed">News Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <IFTTTWebhookSetup />
        </TabsContent>

        <TabsContent value="feed">
          <NewsFeedDisplay />
        </TabsContent>
      </Tabs>
    </div>
  );
}
