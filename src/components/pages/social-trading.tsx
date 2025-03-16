import React from "react";
import SocialTradingPage from "../social-trading/SocialTradingPage";
import TopNavigation from "./TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";

export default function SocialTrading() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Social Trading" />
        <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-900">
          <SocialTradingPage />
        </div>
      </div>
    </div>
  );
}
