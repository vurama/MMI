import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  X,
  TrendingUp,
  TrendingDown,
  Building,
  Calendar,
  BarChart2,
} from "lucide-react";

interface DailySummaryProps {
  className?: string;
  onClose: () => void;
}

const DailySummary: React.FC<DailySummaryProps> = ({ className, onClose }) => {
  // Current date for the summary
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock data for the daily summary
  const summaryData = {
    marketOverview: {
      title: "Market Overview",
      content:
        "The real estate market showed moderate growth today with a 0.8% increase across major indices. Residential properties continue to outperform commercial spaces in urban centers.",
      trend: 0.8,
      icon: <BarChart2 className="h-5 w-5 text-indigo-600" />,
    },
    topPerformers: {
      title: "Top Performers",
      items: [
        { name: "Vonovia", change: 1.2, price: "28.64€" },
        { name: "LEG Immobilien", change: 0.8, price: "78.32€" },
      ],
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
    },
    underperformers: {
      title: "Underperformers",
      items: [{ name: "Aroundtown", change: -0.5, price: "1.85€" }],
      icon: <TrendingDown className="h-5 w-5 text-red-600" />,
    },
    keyEvents: {
      title: "Key Events",
      items: [
        "New property valuation data available for Berlin",
        "Vonovia announces new development project in Hamburg",
        "LEG Immobilien trading volume up 12% in the last 24 hours",
      ],
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
    },
    projections: {
      title: "Market Projections",
      content:
        "Analysts project a 4.5% growth for the real estate sector in 2025, with residential properties in Berlin and Munich expected to see the highest appreciation rates.",
      icon: <Building className="h-5 w-5 text-purple-600" />,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-lg shadow-xl border border-gray-200 ${className}`}
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2 border-b flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-amber-500 mr-2" />
            <CardTitle className="text-xl font-bold">
              Daily Market Summary - {currentDate}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {/* Market Overview */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  {summaryData.marketOverview.icon}
                  <h3 className="text-lg font-semibold ml-2">
                    {summaryData.marketOverview.title}
                  </h3>
                  <Badge
                    className={
                      summaryData.marketOverview.trend >= 0
                        ? "bg-green-600 ml-2"
                        : "bg-red-600 ml-2"
                    }
                  >
                    {summaryData.marketOverview.trend >= 0 ? "+" : ""}
                    {summaryData.marketOverview.trend}%
                  </Badge>
                </div>
                <p className="text-gray-700">
                  {summaryData.marketOverview.content}
                </p>
              </div>

              {/* Top Performers */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  {summaryData.topPerformers.icon}
                  <h3 className="text-lg font-semibold ml-2">
                    {summaryData.topPerformers.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {summaryData.topPerformers.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-white rounded border border-gray-100"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{item.price}</span>
                        <Badge className="bg-green-600">+{item.change}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Underperformers */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  {summaryData.underperformers.icon}
                  <h3 className="text-lg font-semibold ml-2">
                    {summaryData.underperformers.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {summaryData.underperformers.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-white rounded border border-gray-100"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{item.price}</span>
                        <Badge variant="destructive">{item.change}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Events */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  {summaryData.keyEvents.icon}
                  <h3 className="text-lg font-semibold ml-2">
                    {summaryData.keyEvents.title}
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {summaryData.keyEvents.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Market Projections */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center mb-2">
                  {summaryData.projections.icon}
                  <h3 className="text-lg font-semibold ml-2">
                    {summaryData.projections.title}
                  </h3>
                </div>
                <p className="text-gray-700">
                  {summaryData.projections.content}
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailySummary;
