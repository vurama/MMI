import React from "react";
import TaxTrackerPage from "@/components/tax-tracker/TaxTrackerPage";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

const TaxTrackerPageWrapper: React.FC = () => {
  return (
    <DashboardLayout activeItem="Tax Tracker">
      <div
        className="h-full w-full flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <TaxTrackerPage />
      </div>
    </DashboardLayout>
  );
};

export default TaxTrackerPageWrapper;
