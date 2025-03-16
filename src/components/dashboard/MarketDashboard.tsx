import React, { useState } from "react";
import MarketSentimentCore from "./MarketSentimentCore";
import AssetRecommendation from "./AssetRecommendation";
import { useAssetRecommendations } from "@/hooks/useAssetRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MarketDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("stocks");
  const { assets, isLoading, error } =
    useAssetRecommendations(selectedCategory);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Market Intelligence Dashboard</h1>
      </div>

      <Tabs
        defaultValue="stocks"
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="realestate">Real Estate</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <MarketSentimentCore
              category={selectedCategory}
              showDetails={true}
              className="h-full"
            />
          </div>

          <div>
            <AssetRecommendation
              assets={assets}
              title={`Top 10 ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} to Long/Short`}
              className="h-full"
            />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MarketDashboard;
