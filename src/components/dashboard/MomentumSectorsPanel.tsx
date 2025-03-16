import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface SectorMomentum {
  sector: string;
  trend: string;
  direction: "up" | "down";
}

interface MomentumSectorsPanelProps {
  sectors?: SectorMomentum[];
  className?: string;
}

const MomentumSectorsPanel: React.FC<MomentumSectorsPanelProps> = ({
  sectors = [
    { sector: "Technology", trend: "+4.2%", direction: "up" },
    { sector: "Healthcare", trend: "+2.8%", direction: "up" },
    { sector: "Energy", trend: "-1.5%", direction: "down" },
    { sector: "Financials", trend: "+1.7%", direction: "up" },
  ],
  className,
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {sectors.map((item, index) => (
        <motion.div
          key={item.sector}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0"
        >
          <span className="text-gray-700 dark:text-gray-300">
            {item.sector}
          </span>
          <span
            className={`flex items-center ${item.direction === "up" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
          >
            {item.direction === "up" ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {item.trend}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default MomentumSectorsPanel;
