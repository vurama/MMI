import React from "react";
import CryptoWorldMap from "@/components/crypto-map/CryptoWorldMap";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

const CryptoWorldMapPage: React.FC = () => {
  return (
    <DashboardLayout activeItem="Crypto World Map">
      <div
        className="h-full w-full flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <CryptoWorldMap />
      </div>
    </DashboardLayout>
  );
};

export default CryptoWorldMapPage;
