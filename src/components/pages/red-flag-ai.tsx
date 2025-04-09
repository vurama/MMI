import React from "react";
import RedFlagAIPage from "../red-flag-ai/RedFlagAIPage";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import TopNavigation from "../dashboard/layout/TopNavigation";

const RedFlagAI: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <DashboardLayout activeItem="Red Flag AI">
          <RedFlagAIPage />
        </DashboardLayout>
      </div>
    </div>
  );
};

export default RedFlagAI;
