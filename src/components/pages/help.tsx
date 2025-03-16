import React from "react";
import HelpCenter from "@/components/help/HelpCenter";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

const HelpPage: React.FC = () => {
  return (
    <DashboardLayout activeItem="Help Center">
      <main className="flex-1 overflow-auto p-4">
        <HelpCenter />
      </main>
    </DashboardLayout>
  );
};

export default HelpPage;
