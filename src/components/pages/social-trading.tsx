import React from "react";
import SocialTradingPage from "../social-trading/SocialTradingPage";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

export default function SocialTrading() {
  return (
    <DashboardLayout activeItem="Social Trading">
      <SocialTradingPage />
    </DashboardLayout>
  );
}
