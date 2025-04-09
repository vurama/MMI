import React from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, TrendingUp, Map } from "lucide-react";
import DataInsightsProjections from "@/components/dashboard/DataInsightsProjections";
import NotificationsCenter from "@/components/real-estate/NotificationsCenter";

const RealEstatePage: React.FC = () => {
  // Sample data for real estate companies
  const realEstateCompanies = [
    {
      id: 1,
      name: "Realty Income Corp",
      ticker: "O",
      price: 52.75,
      change: 0.85,
      volume: 5200000,
      avgVolume: 4800000,
      sentiment: 0.72,
    },
    {
      id: 2,
      name: "Digital Realty Trust",
      ticker: "DLR",
      price: 142.3,
      change: -0.45,
      volume: 1800000,
      avgVolume: 2100000,
      sentiment: 0.58,
    },
  ];

  return (
    <DashboardLayout activeItem="Real Estate">
      <div className="container mx-auto p-6">
        {/* Notifications at the top */}
        {typeof NotificationsCenter === "function" && (
          <div className="mb-4">
            <NotificationsCenter position="top" />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Real Estate Market</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Home className="h-5 w-5 mr-2 text-indigo-600" />
                Property Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Chart Placeholder</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Chart Placeholder</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Map className="h-5 w-5 mr-2 text-indigo-600" />
                Regional Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Map Placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Insights and Projections */}
        <DataInsightsProjections realEstateCompanies={realEstateCompanies} />
      </div>
    </DashboardLayout>
  );
};

export default RealEstatePage;
