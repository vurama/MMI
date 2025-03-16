import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Info, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Asset {
  symbol: string;
  name: string;
  action: "long" | "short";
  confidence: number;
  price?: string;
  change?: string;
}

interface AssetRecommendationProps {
  assets: Asset[];
  title?: string;
  className?: string;
}

const AssetRecommendation: React.FC<AssetRecommendationProps> = ({
  assets = [],
  title = "Top 10 Assets to Long/Short",
  className,
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 dark:text-green-500";
    if (confidence >= 60) return "text-lime-600 dark:text-lime-500";
    if (confidence >= 40) return "text-yellow-600 dark:text-yellow-500";
    if (confidence >= 20) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  const getActionBadge = (action: "long" | "short") => {
    if (action === "long") {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <TrendingUp className="h-3 w-3 mr-1" />
          LONG
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <TrendingDown className="h-3 w-3 mr-1" />
          SHORT
        </Badge>
      );
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  AI-recommended assets to long or short based on current market
                  analysis
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {assets.map((asset, index) => (
            <div
              key={asset.symbol}
              className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 text-center text-xs text-gray-500 dark:text-gray-400">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {asset.symbol}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {asset.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  {asset.price && (
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {asset.price}
                    </div>
                  )}
                  {asset.change && (
                    <div
                      className={`text-xs ${asset.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {asset.change}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getActionBadge(asset.action)}
                  <div
                    className={`text-xs font-medium ${getConfidenceColor(asset.confidence)}`}
                  >
                    {asset.confidence}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetRecommendation;
