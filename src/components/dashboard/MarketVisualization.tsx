import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  BarChart2,
  PieChart,
  Calendar,
  Download,
  Filter,
} from "lucide-react";

interface MarketVisualizationProps {
  isLoading?: boolean;
}

const MarketVisualization = ({
  isLoading = false,
}: MarketVisualizationProps) => {
  const [timeframe, setTimeframe] = useState("1W");

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Market Visualization
            </CardTitle>
            <div className="h-8 bg-gray-100 rounded-md w-32 animate-pulse dark:bg-gray-700"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-100 rounded-md w-full mb-4 animate-pulse dark:bg-gray-700"></div>
          <div className="h-[300px] bg-gray-100 rounded-lg animate-pulse dark:bg-gray-700"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Market Visualization
          </CardTitle>
          <div className="flex space-x-1">
            {["1D", "1W", "1M", "3M", "1Y", "All"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="line" className="flex items-center">
                <LineChart className="h-4 w-4 mr-1" />
                Line
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-1" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center">
                <PieChart className="h-4 w-4 mr-1" />
                Pie
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="line" className="h-[300px]">
            <div className="h-full w-full bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center dark:bg-gray-900/50 dark:border-gray-700">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-gray-300 mx-auto mb-4 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  Line chart visualization would be displayed here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bar" className="h-[300px]">
            <div className="h-full w-full bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center dark:bg-gray-900/50 dark:border-gray-700">
              <div className="text-center">
                <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-4 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  Bar chart visualization would be displayed here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pie" className="h-[300px]">
            <div className="h-full w-full bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center dark:bg-gray-900/50 dark:border-gray-700">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-300 mx-auto mb-4 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  Pie chart visualization would be displayed here
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Data as of {new Date().toLocaleDateString()}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {timeframe} timeframe
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketVisualization;
