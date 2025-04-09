import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, TrendingUp, Calendar } from "lucide-react";

interface FocusResolutionBoxProps {
  className?: string;
  projectedGrowth: number;
  timeFrame: string;
  marketSummary: string;
}

const FocusResolutionBox: React.FC<FocusResolutionBoxProps> = ({
  className,
  projectedGrowth = 4.5,
  timeFrame = "next quarter",
  marketSummary = "Market is expected to show moderate growth over the next quarter with positive trends in short-term data.",
}) => {
  return (
    <Card className={`bg-white shadow-md border border-gray-100 ${className}`}>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl font-bold flex items-center">
          <LineChart className="h-5 w-5 text-indigo-600 mr-2" />
          Market Outlook
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Projection for {timeFrame}
              </span>
            </div>
            <Badge className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />+{projectedGrowth}%
            </Badge>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p className="text-gray-800">{marketSummary}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Based on current market data</span>
            <span>Updated today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusResolutionBox;
