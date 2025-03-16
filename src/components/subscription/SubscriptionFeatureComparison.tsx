import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
  description?: string;
}

interface SubscriptionFeatureComparisonProps {
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    name: "Stock market tracking",
    basic: true,
    pro: true,
    enterprise: true,
    description: "Track major stock indices and individual stocks",
  },
  {
    name: "Basic AI insights",
    basic: true,
    pro: true,
    enterprise: true,
    description: "Fundamental AI-powered market analysis",
  },
  {
    name: "Daily market updates",
    basic: true,
    pro: true,
    enterprise: true,
    description: "Daily summary of market movements",
  },
  {
    name: "Real-time news validation",
    basic: false,
    pro: true,
    enterprise: true,
    description: "AI verification of news impact on markets",
  },
  {
    name: "Custom alerts",
    basic: false,
    pro: true,
    enterprise: true,
    description: "Set personalized alerts for price movements",
  },
  {
    name: "Advanced AI insights",
    basic: false,
    pro: true,
    enterprise: true,
    description: "Deep analysis of market trends and patterns",
  },
  {
    name: "Cryptocurrency analysis",
    basic: false,
    pro: true,
    enterprise: true,
    description: "Detailed crypto market intelligence",
  },
  {
    name: "Real estate market tracking",
    basic: false,
    pro: true,
    enterprise: true,
    description: "Analysis of housing and commercial real estate markets",
  },
  {
    name: "API access",
    basic: false,
    pro: false,
    enterprise: true,
    description: "Programmatic access to market data and AI insights",
  },
  {
    name: "Dedicated support",
    basic: false,
    pro: false,
    enterprise: true,
    description: "Priority customer support",
  },
  {
    name: "Custom integrations",
    basic: false,
    pro: false,
    enterprise: true,
    description: "Connect with your existing trading platforms",
  },
];

const SubscriptionFeatureComparison: React.FC<
  SubscriptionFeatureComparisonProps
> = ({ features = defaultFeatures, className }) => {
  return (
    <div className={cn("w-full overflow-auto rounded-xl shadow-md", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Features
              </span>
            </th>
            <th className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Basic
              </span>
            </th>
            <th className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700 text-center">
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                Pro
              </span>
            </th>
            <th className="p-4 bg-purple-50 dark:bg-purple-900/20 border-b border-gray-200 dark:border-gray-700 text-center">
              <span className="text-purple-700 dark:text-purple-300 font-medium">
                Enterprise
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td className="p-4">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {feature.name}
                </div>
                {feature.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {feature.description}
                  </div>
                )}
              </td>
              <td className="p-4 text-center">
                {feature.basic ? (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
                )}
              </td>
              <td className="p-4 text-center bg-blue-50/50 dark:bg-blue-900/10">
                {feature.pro ? (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
                )}
              </td>
              <td className="p-4 text-center bg-purple-50/50 dark:bg-purple-900/10">
                {feature.enterprise ? (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionFeatureComparison;
