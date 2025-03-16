import React from "react";
import HelpCenter from "@/components/help/HelpCenter";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

const HelpPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-900">
        <HelpCenter />
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
