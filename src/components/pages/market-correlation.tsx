import React from "react";
import MarketCorrelationPage from "../market-correlation/MarketCorrelationPage";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import TopNavigation from "../dashboard/layout/TopNavigation";

const MarketCorrelation = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <DashboardLayout activeItem="Market Correlation">
          <MarketCorrelationPage />
        </DashboardLayout>
      </div>
    </div>
  );
};

export default MarketCorrelation;
