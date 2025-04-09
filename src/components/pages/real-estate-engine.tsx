import React from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Search, MessageSquare } from "lucide-react";
import PropertyValuationCheck from "@/components/real-estate/PropertyValuationCheck";
import RealEstateAIChat from "@/components/dashboard/RealEstateAIChat";
import DataInsightsProjections from "@/components/dashboard/DataInsightsProjections";
import MarketStrengthGrowthBar from "@/components/dashboard/MarketStrengthGrowthBar";
import FocusResolutionBox from "@/components/dashboard/FocusResolutionBox";

const RealEstateEnginePage: React.FC = () => {
  // Mock data for real estate companies
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
      sentiment: 0.7,
    },
  ];

  return (
    <DashboardLayout activeItem="Real Estate Engine">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Building2 className="h-8 w-8 text-indigo-600" />
                Real Estate Engine
              </h1>
              <p className="text-gray-500 mt-1">
                Advanced Real Estate Market Analysis
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties, markets, or metrics..."
                className="pl-10 w-full"
              />
            </div>
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
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Tab content will be implemented in future changes */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardContent className="pt-6">
                <p>Overview content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RealEstateEnginePage;
