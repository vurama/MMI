import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface MarketEvent {
  date: string;
  event: string;
  impact: "High" | "Medium" | "Low";
  time: string;
}

interface MarketCalendarProps {
  events?: MarketEvent[];
  className?: string;
}

const MarketCalendar: React.FC<MarketCalendarProps> = ({
  events = [
    {
      date: "Jul 25",
      event: "Fed Interest Rate Decision",
      impact: "High",
      time: "2:00 PM ET",
    },
    {
      date: "Jul 26",
      event: "US GDP Q2 Preliminary",
      impact: "Medium",
      time: "8:30 AM ET",
    },
    {
      date: "Jul 27",
      event: "Tech Sector Earnings Reports",
      impact: "High",
      time: "After Market",
    },
    {
      date: "Jul 28",
      event: "ECB Monetary Policy Statement",
      impact: "Medium",
      time: "7:45 AM ET",
    },
    {
      date: "Jul 29",
      event: "US PCE Price Index",
      impact: "Medium",
      time: "8:30 AM ET",
    },
    {
      date: "Jul 30",
      event: "Bank of Japan Policy Decision",
      impact: "Medium",
      time: "11:00 PM ET",
    },
  ],
  className,
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {events.map((item, index) => (
        <motion.div
          key={`${item.date}-${item.event}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {item.event}
            </span>
            <Badge className={getImpactColor(item.impact)}>{item.impact}</Badge>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            {item.date} • {item.time}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MarketCalendar;
