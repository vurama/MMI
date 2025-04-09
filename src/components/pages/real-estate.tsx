import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import RealEstateAIChat from "@/components/dashboard/RealEstateAIChat";
import DataInsightsProjections from "@/components/dashboard/DataInsightsProjections";
import MarketStrengthGrowthBar from "@/components/dashboard/MarketStrengthGrowthBar";
import FocusResolutionBox from "@/components/dashboard/FocusResolutionBox";
import PropertyValuationCheck from "@/components/real-estate/PropertyValuationCheck";
import NotificationsCenter from "@/components/real-estate/NotificationsCenter";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  MessageSquare,
  Bell,
} from "lucide-react";

const RealEstatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for real estate companies (sorted alphabetically by name)
  const realEstateCompanies = [
    {
      id: 2,
      name: "Aroundtown",
      ticker: "AT1.DE",
      price: 1.85,
      change: -0.5,
      volume: 1800000,
      avgVolume: 1500000,
      sentiment: 0.4,
    },
    {
      id: 3,
      name: "LEG Immobilien",
      ticker: "LEG.DE",
      price: 78.32,
      change: 0.8,
      volume: 900000,
      avgVolume: 750000,
      sentiment: 0.6,
    },
    {
      id: 1,
      name: "Vonovia",
      ticker: "VNA.DE",
      price: 28.64,
      change: 1.2,
      volume: 2500000,
      avgVolume: 2000000,
      sentiment: 0.7, // 0 to 1 scale, higher is more positive
    },
  ];

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Vonovia Reports Strong Q2 Results Despite Market Challenges",
      source: "Financial Times",
      date: "2023-08-15",
      url: "#",
      company: "Vonovia",
      sentiment: "positive",
    },
    {
      id: 2,
      title: "Aroundtown Faces Pressure as Interest Rates Continue to Rise",
      source: "Bloomberg",
      date: "2023-08-14",
      url: "#",
      company: "Aroundtown",
      sentiment: "negative",
    },
    {
      id: 3,
      title: "LEG Immobilien Announces New Development Projects in Berlin",
      source: "Reuters",
      date: "2023-08-12",
      url: "#",
      company: "LEG Immobilien",
      sentiment: "positive",
    },
    {
      id: 4,
      title: "German Real Estate Market Shows Signs of Stabilization",
      source: "The Economist",
      date: "2023-08-10",
      url: "#",
      company: "General",
      sentiment: "neutral",
    },
  ];

  // Mock alerts
  const alerts = [
    {
      id: 1,
      type: "price",
      message: "Vonovia (VNA.DE) up 1.2% in the last hour",
      timestamp: "10:45 AM",
      priority: "medium",
    },
    {
      id: 2,
      type: "volume",
      message: "Unusual trading volume detected for Aroundtown (AT1.DE)",
      timestamp: "9:30 AM",
      priority: "high",
    },
    {
      id: 3,
      type: "news",
      message: "New analyst report for LEG Immobilien (LEG.DE) released",
      timestamp: "Yesterday",
      priority: "low",
    },
  ];

  return (
    <DashboardLayout activeItem="Real Estate">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Building2 className="h-8 w-8 text-indigo-600" />
                Real Estate
              </h1>
              <p className="text-gray-500 mt-1">
                Your Gateway to Real Estate Insights
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search companies, news, or metrics..."
              className="w-64 md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <NotificationsCenter />
          </div>
        </div>

        {/* AI Chat Box */}
        <div className="mb-8">
          <RealEstateAIChat className="w-full mx-auto" />
        </div>

        {/* Focus Resolution Box and Market Strength */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <FocusResolutionBox
                className="h-full"
                projectedGrowth={4.5}
                timeFrame="next quarter"
                marketSummary="Market is expected to show moderate growth over the next quarter with a projected +4.5% growth for 2025. Positive trends are seen in short-term data (1 week, 2 weeks) with a forecasted +3.7% growth in the next month."
              />
            </div>
            <div className="md:col-span-2">
              <MarketStrengthGrowthBar
                className="w-full h-full"
                timeFrames={[
                  {
                    label: "1 Week",
                    currentGrowth: 2.3,
                    previousGrowth: 1.8,
                    confidence: 92,
                  },
                  {
                    label: "2 Weeks",
                    currentGrowth: 3.7,
                    previousGrowth: 2.1,
                    confidence: 88,
                  },
                  {
                    label: "1 Month",
                    currentGrowth: 1.9,
                    previousGrowth: -0.5,
                    confidence: 85,
                  },
                  {
                    label: "1 Quarter",
                    currentGrowth: -1.2,
                    previousGrowth: 3.4,
                    confidence: 78,
                  },
                  {
                    label: "1 Year",
                    currentGrowth: 4.8,
                    previousGrowth: 3.2,
                    confidence: 72,
                  },
                ]}
                projectedGrowth={4.5}
                projectedConfidence={80}
              />
            </div>
          </div>
        </div>

        {/* Property Valuation Check */}
        <div className="mb-8">
          <PropertyValuationCheck className="w-full" />
        </div>

        {/* Data Insights & AI Projections Section */}
        <div className="mb-8">
          <DataInsightsProjections
            className="w-full"
            realEstateCompanies={realEstateCompanies}
          />
        </div>

        {/* Tabs Navigation */}
        <Tabs
          defaultValue="overview"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Real Estate Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realEstateCompanies.map((company) => (
                <Card key={company.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{company.name}</CardTitle>
                        <CardDescription>{company.ticker}</CardDescription>
                      </div>
                      <Badge
                        variant={company.change > 0 ? "default" : "destructive"}
                      >
                        {company.change > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {company.change > 0 ? "+" : ""}
                        {company.change}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-xl font-semibold">
                          {company.price} €
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Volume</p>
                        <p className="text-xl font-semibold">
                          {(company.volume / 1000000).toFixed(1)}M
                          {company.volume > company.avgVolume ? (
                            <span className="text-green-500 text-sm ml-1">
                              ↑
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm ml-1">↓</span>
                          )}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Sentiment</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className={`h-2.5 rounded-full ${company.sentiment > 0.6 ? "bg-green-500" : company.sentiment > 0.4 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${company.sentiment * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* News Feed Section */}
            <Card>
              <CardHeader>
                <CardTitle>Latest News</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {newsItems.map((news) => (
                      <div
                        key={news.id}
                        className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{news.title}</h3>
                          <Badge
                            variant={
                              news.sentiment === "positive"
                                ? "default"
                                : news.sentiment === "negative"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {news.sentiment}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>{news.source}</span>
                          <span className="mx-2">•</span>
                          <span>{news.date}</span>
                          <span className="mx-2">•</span>
                          <span>{news.company}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab Content - Placeholder */}
          <TabsContent value="companies" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Real Estate Companies</CardTitle>
                <CardDescription>
                  Detailed information about real estate companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Companies content will be implemented in the next phase.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab Content - Placeholder */}
          <TabsContent value="news" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Real Estate News</CardTitle>
                <CardDescription>
                  Latest news and updates from the real estate market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>News content will be implemented in the next phase.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab Content - Placeholder */}
          <TabsContent value="alerts" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Real Estate Alerts</CardTitle>
                <CardDescription>
                  Configure and view your real estate alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 border rounded-lg border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Bell
                          className={`h-5 w-5 ${alert.priority === "high" ? "text-red-500" : alert.priority === "medium" ? "text-amber-500" : "text-blue-500"}`}
                        />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-500">
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chat Assistant Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button className="rounded-full h-14 w-14 shadow-lg" size="icon">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default RealEstatePage;
