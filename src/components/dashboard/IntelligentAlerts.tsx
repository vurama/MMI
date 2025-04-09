import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Briefcase,
  Building,
  Coins,
  DollarSign,
  BarChart2,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AlertCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category?: string;
  alerts: AlertType[];
}

interface AlertType {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: "high" | "medium" | "low" | string;
}

interface IntelligentAlertsProps {
  categories?: AlertCategory[];
  onToggleCategory?: (categoryId: string, enabled: boolean) => void;
  onToggleAlert?: (
    categoryId: string,
    alertId: string,
    enabled: boolean,
  ) => void;
}

const defaultCategories: AlertCategory[] = [
  {
    id: "stocks",
    name: "Stock Market",
    description: "Alerts for stock market movements and opportunities",
    icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    enabled: true,
    alerts: [
      {
        id: "stock-trend-reversal",
        name: "Trend Reversal Detection",
        description:
          "Alert when AI detects a significant trend reversal in major indices",
        enabled: true,
        priority: "high",
      },
      {
        id: "stock-sector-rotation",
        name: "Sector Rotation",
        description: "Notification when capital flows indicate sector rotation",
        enabled: true,
        priority: "medium",
      },
      {
        id: "stock-earnings-surprise",
        name: "Earnings Surprise Impact",
        description:
          "Alert when earnings significantly beat or miss expectations",
        enabled: false,
        priority: "medium",
      },
      {
        id: "stock-unusual-volume",
        name: "Unusual Volume",
        description: "Notification for unusual trading volume in key stocks",
        enabled: true,
        priority: "low",
      },
    ],
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    description: "Alerts for cryptocurrency market movements and opportunities",
    icon: <Coins className="h-5 w-5 text-purple-500" />,
    enabled: true,
    alerts: [
      {
        id: "crypto-volatility-spike",
        name: "Volatility Spike",
        description: "Alert when volatility exceeds historical averages",
        enabled: true,
        priority: "high",
      },
      {
        id: "crypto-whale-movement",
        name: "Whale Movement",
        description: "Notification when large holders move significant amounts",
        enabled: true,
        priority: "medium",
      },
      {
        id: "crypto-correlation-break",
        name: "Correlation Break",
        description:
          "Alert when crypto assets break typical correlation patterns",
        enabled: false,
        priority: "medium",
      },
      {
        id: "crypto-sentiment-shift",
        name: "Sentiment Shift",
        description: "Notification when social sentiment dramatically shifts",
        enabled: true,
        priority: "low",
      },
    ],
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "Alerts for real estate market trends and opportunities",
    icon: <Building className="h-5 w-5 text-green-500" />,
    enabled: false,
    alerts: [
      {
        id: "realestate-inventory-change",
        name: "Inventory Change",
        description:
          "Alert when housing inventory significantly changes in key markets",
        enabled: false,
        priority: "high",
      },
      {
        id: "realestate-mortgage-rate-impact",
        name: "Mortgage Rate Impact",
        description:
          "Notification when mortgage rate changes affect affordability",
        enabled: false,
        priority: "medium",
      },
      {
        id: "realestate-commercial-vacancy",
        name: "Commercial Vacancy Trends",
        description:
          "Alert on significant changes in commercial property vacancy rates",
        enabled: false,
        priority: "medium",
      },
      {
        id: "realestate-reit-performance",
        name: "REIT Performance Divergence",
        description:
          "Notification when REITs diverge from broader market trends",
        enabled: false,
        priority: "low",
      },
    ],
  },
  {
    id: "forex",
    name: "Forex",
    description: "Alerts for currency market movements and opportunities",
    icon: <DollarSign className="h-5 w-5 text-cyan-500" />,
    enabled: false,
    alerts: [
      {
        id: "forex-central-bank-impact",
        name: "Central Bank Impact",
        description:
          "Alert when central bank decisions significantly impact currencies",
        enabled: false,
        priority: "high",
      },
      {
        id: "forex-correlation-change",
        name: "Correlation Change",
        description:
          "Notification when currency pairs break typical correlation patterns",
        enabled: false,
        priority: "medium",
      },
      {
        id: "forex-volatility-event",
        name: "Volatility Event",
        description: "Alert on unusual volatility in major currency pairs",
        enabled: false,
        priority: "medium",
      },
      {
        id: "forex-trend-strength",
        name: "Trend Strength Change",
        description: "Notification when trend strength significantly changes",
        enabled: false,
        priority: "low",
      },
    ],
  },
  {
    id: "commodities",
    name: "Commodities",
    description: "Alerts for commodity market trends and opportunities",
    icon: <BarChart2 className="h-5 w-5 text-amber-500" />,
    enabled: false,
    alerts: [
      {
        id: "commodities-supply-disruption",
        name: "Supply Disruption",
        description: "Alert when supply chain issues impact commodity prices",
        enabled: false,
        priority: "high",
      },
      {
        id: "commodities-demand-shift",
        name: "Demand Shift",
        description: "Notification when demand patterns significantly change",
        enabled: false,
        priority: "medium",
      },
      {
        id: "commodities-inventory-levels",
        name: "Inventory Level Changes",
        description:
          "Alert on significant changes in commodity inventory levels",
        enabled: false,
        priority: "medium",
      },
      {
        id: "commodities-seasonal-deviation",
        name: "Seasonal Pattern Deviation",
        description:
          "Notification when commodities deviate from seasonal patterns",
        enabled: false,
        priority: "low",
      },
    ],
  },
];

const IntelligentAlerts: React.FC<IntelligentAlertsProps> = ({
  categories = defaultCategories,
  onToggleCategory = () => {},
  onToggleAlert = () => {},
}) => {
  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
            High Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Medium Priority
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Low Priority
          </Badge>
        );
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center dark:text-white">
            <Brain className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            AI-Powered Intelligent Alerts
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  AI-powered alerts that notify you of important market events
                  and opportunities based on your preferences
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 dark:bg-indigo-900/20 dark:border-indigo-800/30">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 dark:text-indigo-400" />
              <div>
                <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                  Intelligent Market Monitoring
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">
                  Our AI continuously monitors markets and will alert you to
                  significant events, trend changes, and investment
                  opportunities based on your selected preferences below.
                </p>
              </div>
            </div>
          </div>

          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {category.icon}
                  <div className="ml-2">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="sr-only"
                  >
                    Enable {category.name} alerts
                  </Label>
                  <Switch
                    id={`category-${category.id}`}
                    checked={category.enabled}
                    onCheckedChange={(checked) =>
                      onToggleCategory(category.id, checked)
                    }
                    className="data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-700"
                  />
                </div>
              </div>

              {category.enabled && (
                <div className="pl-7 space-y-3">
                  {category.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-900/50 dark:border-gray-700"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {alert.name}
                          </h4>
                          {getPriorityBadge(alert.priority)}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {alert.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Switch
                          id={`alert-${alert.id}`}
                          checked={alert.enabled}
                          onCheckedChange={(checked) =>
                            onToggleAlert(category.id, alert.id, checked)
                          }
                          className="data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Separator className="my-2 bg-gray-100 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligentAlerts;
