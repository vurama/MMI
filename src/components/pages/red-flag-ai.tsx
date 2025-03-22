import React from "react";
import RedFlagAIPage from "../red-flag-ai/RedFlagAIPage";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

const RedFlagAI: React.FC = () => {
  return (
    <DashboardLayout activeItem="Red Flag AI">
      <RedFlagAIPage />
    </DashboardLayout>
  );
};

export default RedFlagAI;
