import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface RiskFactor {
  risk: string;
  impact: "High" | "Medium" | "Low";
  color: "red" | "amber" | "green" | "blue";
}

interface RiskFactorsPanelProps {
  factors?: RiskFactor[];
  className?: string;
}

const RiskFactorsPanel: React.FC<RiskFactorsPanelProps> = ({
  factors = [
    { risk: "Central Bank Policy Changes", impact: "High", color: "red" },
    { risk: "Geopolitical Tensions", impact: "Medium", color: "amber" },
    { risk: "Inflation Concerns", impact: "Medium", color: "amber" },
    { risk: "Liquidity Constraints", impact: "Low", color: "green" },
  ],
  className,
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {factors.map((item, index) => (
        <motion.div
          key={item.risk}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
        >
          <span className="text-gray-700 dark:text-gray-300">{item.risk}</span>
          <Badge
            className={`bg-${item.color}-100 text-${item.color}-800 dark:bg-${item.color}-900/30 dark:text-${item.color}-300`}
          >
            {item.impact} Impact
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};

export default RiskFactorsPanel;
