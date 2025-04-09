import React from "react";
import SocialTradingPage from "../social-trading/SocialTradingPage";
import TopNavigation from "../dashboard/layout/TopNavigation";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

export default function SocialTrading() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <DashboardLayout activeItem="Social Trading">
          <SocialTradingPage />
        </DashboardLayout>
      </div>
    </div>
  );
}
