import React from "react";
import MarketCorrelationPage from "../market-correlation/MarketCorrelationPage";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

const MarketCorrelation = () => {
  return (
    <DashboardLayout activeItem="Market Correlation">
      <MarketCorrelationPage />
    </DashboardLayout>
  );
};

export default MarketCorrelation;
