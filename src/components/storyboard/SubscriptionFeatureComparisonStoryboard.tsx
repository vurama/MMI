import React from "react";
import SubscriptionFeatureComparison from "../subscription/SubscriptionFeatureComparison";

export default function SubscriptionFeatureComparisonStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Feature Comparison
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <SubscriptionFeatureComparison />
      </div>
    </div>
  );
}
