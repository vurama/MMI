import React from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import ChartAnalysisAdmin from "../admin/ChartAnalysisAdmin";
import TopNavigation from "../dashboard/layout/TopNavigation";

const ChartAnalysisAdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <DashboardLayout activeItem="Chart Analysis Admin">
          <main className="flex-1 overflow-auto p-4">
            <ChartAnalysisAdmin />
          </main>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default ChartAnalysisAdminPage;
