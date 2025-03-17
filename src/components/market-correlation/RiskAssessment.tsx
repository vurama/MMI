import React from "react";

interface RiskAssessmentProps {
  data?: {
    overallRisk: string;
    correlationRisk: string;
    marketSentiment?: number;
    riskFactors: Array<{
      factor: string;
      severity: string;
      description: string;
    }>;
    recommendations: Array<{ action: string; description: string }>;
  };
  sentimentScore?: number;
  isLoading?: boolean;
}

const RiskAssessment = ({
  data,
  sentimentScore = 50,
  isLoading = false,
}: RiskAssessmentProps) => {
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
          No risk assessment data available
        </p>
      </div>
    );
  }

  // Helper function to get color based on risk level
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "green";
      case "medium":
      case "moderate":
        return "amber";
      case "high":
        return "red";
      default:
        return "blue";
    }
  };

  // Helper function to get color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "green";
      case "medium":
        return "amber";
      case "high":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-2">
          Current Market Risk Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div
            className={`p-3 bg-${getRiskColor(data.overallRisk)}-50 dark:bg-${getRiskColor(data.overallRisk)}-900/20 rounded-lg border border-${getRiskColor(data.overallRisk)}-100 dark:border-${getRiskColor(data.overallRisk)}-800/30 flex flex-col items-center justify-center`}
          >
            <h4
              className={`text-sm font-medium text-${getRiskColor(data.overallRisk)}-800 dark:text-${getRiskColor(data.overallRisk)}-300 mb-1`}
            >
              Overall Risk Level
            </h4>
            <span
              className={`text-2xl font-bold text-${getRiskColor(data.overallRisk)}-600 dark:text-${getRiskColor(data.overallRisk)}-400`}
            >
              {data.overallRisk}
            </span>
          </div>
          <div
            className={`p-3 bg-${getRiskColor(data.correlationRisk)}-50 dark:bg-${getRiskColor(data.correlationRisk)}-900/20 rounded-lg border border-${getRiskColor(data.correlationRisk)}-100 dark:border-${getRiskColor(data.correlationRisk)}-800/30 flex flex-col items-center justify-center`}
          >
            <h4
              className={`text-sm font-medium text-${getRiskColor(data.correlationRisk)}-800 dark:text-${getRiskColor(data.correlationRisk)}-300 mb-1`}
            >
              Correlation Risk
            </h4>
            <span
              className={`text-2xl font-bold text-${getRiskColor(data.correlationRisk)}-600 dark:text-${getRiskColor(data.correlationRisk)}-400`}
            >
              {data.correlationRisk}
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 flex flex-col items-center justify-center">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              Market Sentiment
            </h4>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {sentimentScore}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risk Factors
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {data.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full bg-${getSeverityColor(factor.severity)}-600 dark:bg-${getSeverityColor(factor.severity)}-400 mt-1.5 mr-2`}
                ></span>
                <span>
                  <strong>{factor.factor}:</strong> {factor.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
        <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
          AI Risk Adjustment Recommendations
        </h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-200 mb-4">
          Based on current correlation patterns, consider these risk
          adjustments:
        </p>
        <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-200">
          {data.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 mr-2"></span>
              <span>
                <strong>{rec.action}:</strong> {rec.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiskAssessment;
