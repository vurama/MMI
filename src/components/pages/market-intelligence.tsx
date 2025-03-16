import React from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketSentimentScore from "@/components/dashboard/MarketSentimentScore";
import MarketOverviewWidget from "@/components/dashboard/MarketOverviewWidget";
import MarketNewsWidget from "@/components/dashboard/MarketNewsWidget";
import AIInsightBox from "@/components/dashboard/AIInsightBox";
import MarketSentimentWidget from "@/components/dashboard/MarketSentimentWidget";
import MarketTrendsWidget from "@/components/dashboard/MarketTrendsWidget";
import ActionRecommendationsPanel from "@/components/dashboard/ActionRecommendationsPanel";
import MomentumSectorsPanel from "@/components/dashboard/MomentumSectorsPanel";
import RiskFactorsPanel from "@/components/dashboard/RiskFactorsPanel";
import MarketIntelligenceUpcomingEvents from "@/components/dashboard/MarketIntelligenceUpcomingEvents";

const MarketIntelligencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <div className="flex h-screen">
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 max-w-7xl">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                  Market Intelligence Center
                </h1>
                <MarketSentimentScore score={67} change={2.5} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content - 2/3 width on large screens */}
                <div className="lg:col-span-2 space-y-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start border-b mb-4 pb-0 bg-transparent">
                      <TabsTrigger
                        value="overview"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-4 py-2 data-[state=active]:shadow-none bg-transparent"
                      >
                        Market Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="trends"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-4 py-2 data-[state=active]:shadow-none bg-transparent"
                      >
                        Trends & Patterns
                      </TabsTrigger>
                      <TabsTrigger
                        value="sentiment"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-4 py-2 data-[state=active]:shadow-none bg-transparent"
                      >
                        Sentiment Analysis
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0 space-y-6">
                      <MarketOverviewWidget />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AIInsightBox
                          title="Market Outlook"
                          category="Stocks"
                          summary="Based on current economic indicators and market sentiment, we're seeing a cautiously optimistic outlook for Q3. Inflation concerns are moderating while corporate earnings have exceeded expectations by an average of 3.2%."
                          status="positive"
                        />
                        <AIInsightBox
                          title="Sector Rotation"
                          category="Stocks"
                          summary="We're detecting early signs of rotation from defensive sectors into cyclicals, particularly technology and consumer discretionary. This typically signals growing investor confidence in economic expansion."
                          status="neutral"
                        />
                      </div>
                      <ActionRecommendationsPanel />
                    </TabsContent>

                    <TabsContent value="trends" className="mt-0 space-y-6">
                      <MarketTrendsWidget />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MomentumSectorsPanel />
                        <RiskFactorsPanel />
                      </div>
                    </TabsContent>

                    <TabsContent value="sentiment" className="mt-0 space-y-6">
                      <MarketSentimentWidget />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AIInsightBox
                          title="Social Media Sentiment"
                          category="Crypto"
                          summary="Retail investor sentiment on social platforms has turned increasingly positive over the past week, with a 15% increase in bullish comments. This often precedes broader market movements by 3-5 days."
                          status="positive"
                        />
                        <AIInsightBox
                          title="Institutional Positioning"
                          category="Stocks"
                          summary="Options flow analysis indicates institutional investors are increasing hedges against downside risk while maintaining core long positions, suggesting cautious optimism with protection."
                          status="neutral"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right sidebar - 1/3 width on large screens */}
                <div className="space-y-6">
                  <MarketIntelligenceUpcomingEvents />
                  <MarketNewsWidget />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketIntelligencePage;
