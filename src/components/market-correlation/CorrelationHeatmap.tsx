import React from "react";

interface CorrelationHeatmapProps {
  data?: Array<{ asset1: string; asset2: string; correlation: number }>;
  isLoading?: boolean;
}

const CorrelationHeatmap = ({
  data = [],
  isLoading = false,
}: CorrelationHeatmapProps) => {
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

  // In a real implementation, this would render an actual heatmap visualization
  // using a library like d3, recharts, or visx
  return (
    <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">
        Correlation Heatmap Visualization
      </p>
    </div>
  );
};

export default CorrelationHeatmap;
