import React from "react";

interface DiversificationSuggestionsProps {
  data?: {
    cryptoHeavy: Array<{ asset: string; allocation: number; reason: string }>;
    stockHeavy: Array<{ asset: string; allocation: number; reason: string }>;
    balanced: Array<{ asset: string; allocation: number; reason: string }>;
  };
  isLoading?: boolean;
}

const DiversificationSuggestions = ({
  data,
  isLoading = false,
}: DiversificationSuggestionsProps) => {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No diversification data available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
        <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
          Crypto-Heavy Portfolio
        </h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-200 mb-4">
          For portfolios with significant crypto exposure, consider these
          diversification strategies:
        </p>
        <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-200">
          {data.cryptoHeavy.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
              <span>
                <strong>
                  Add {item.asset} ({item.allocation}%):
                </strong>{" "}
                {item.reason}.
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
          Stock-Heavy Portfolio
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-200 mb-4">
          For portfolios with significant stock market exposure, consider these
          diversification strategies:
        </p>
        <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
          {data.stockHeavy.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 mr-2"></span>
              <span>
                <strong>
                  Add {item.asset} ({item.allocation}%):
                </strong>{" "}
                {item.reason}.
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
        <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
          Balanced Portfolio
        </h3>
        <p className="text-sm text-green-700 dark:text-green-200 mb-4">
          For a balanced approach with optimal diversification based on current
          correlations:
        </p>
        <ul className="space-y-2 text-sm text-green-700 dark:text-green-200">
          {data.balanced.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-1.5 mr-2"></span>
              <span>
                <strong>
                  {item.asset} ({item.allocation}%):
                </strong>{" "}
                {item.reason}.
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiversificationSuggestions;
