import React from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import ChartAnalysisAdmin from "../admin/ChartAnalysisAdmin";

const ChartAnalysisAdminPage: React.FC = () => {
  return (
    <DashboardLayout activeItem="Chart Analysis Admin">
      <main className="flex-1 overflow-auto p-4">
        <ChartAnalysisAdmin />
      </main>
    </DashboardLayout>
  );
};

export default ChartAnalysisAdminPage;
