import React from "react";
import CryptoWorldMap from "@/components/crypto-map/CryptoWorldMap";

const CryptoWorldMapStoryboard: React.FC = () => {
  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900 overflow-hidden">
      <CryptoWorldMap />
    </div>
  );
};

export default CryptoWorldMapStoryboard;
