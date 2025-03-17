import React from "react";

interface CorrelationScatterPlotProps {
  data?: Array<{ btcReturn: number; sp500Return: number }>;
  assetPair?: string;
  isLoading?: boolean;
}

const CorrelationScatterPlot = ({
  data = [],
  assetPair = "btc-sp500",
  isLoading = false,
}: CorrelationScatterPlotProps) => {
  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Get asset names from the pair
  const [asset1, asset2] = assetPair.split("-").map((a) => a.toUpperCase());

  // In a real implementation, this would render an actual scatter plot visualization
  // using a library like d3, recharts, or visx
  return (
    <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400 mb-2">
        Correlation Scatter Plot
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {asset1} vs {asset2}
      </p>
    </div>
  );
};

export default CorrelationScatterPlot;
