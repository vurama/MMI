import React from "react";
import { motion } from "framer-motion";

interface ActionRecommendation {
  action: string;
  confidence: "High" | "Medium" | "Low";
}

interface ActionRecommendationsPanelProps {
  recommendations?: ActionRecommendation[];
  className?: string;
}

const ActionRecommendationsPanel: React.FC<ActionRecommendationsPanelProps> = ({
  recommendations = [
    { action: "Increase exposure to technology sector", confidence: "High" },
    { action: "Reduce holdings in energy stocks", confidence: "Medium" },
    {
      action: "Consider defensive positioning in portfolios",
      confidence: "Medium",
    },
    {
      action: "Monitor central bank communications closely",
      confidence: "High",
    },
  ],
  className,
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {recommendations.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
        >
          <div className="h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium text-purple-800 dark:text-purple-300 mr-2 flex-shrink-0 mt-0.5">
            {index + 1}
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">{item.action}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Confidence: {item.confidence}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActionRecommendationsPanel;
