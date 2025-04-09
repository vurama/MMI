import React from "react";
import TaxTrackerPage from "@/components/tax-tracker/TaxTrackerPage";
import TopNavigation from "../dashboard/layout/TopNavigation";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

const TaxTrackerPageWrapper: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <DashboardLayout activeItem="Tax Tracker">
          <div
            className="h-full w-full flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden"
            style={{ minHeight: "calc(100vh - 64px)" }}
          >
            <TaxTrackerPage />
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default TaxTrackerPageWrapper;
