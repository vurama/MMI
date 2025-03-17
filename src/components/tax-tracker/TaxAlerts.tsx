import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Calendar,
  Clock,
  Settings,
  AlertTriangle,
  Check,
  X,
  Plus,
  ChevronRight,
} from "lucide-react";

interface TaxAlertsProps {
  year: string;
  country: string;
}

interface TaxAlert {
  id: string;
  title: string;
  description: string;
  type: "deadline" | "opportunity" | "policy" | "custom";
  priority: "high" | "medium" | "low";
  date?: string;
  isActive: boolean;
  assetClasses?: string[];
  actions?: string[];
}

const TaxAlerts: React.FC<TaxAlertsProps> = ({ year, country }) => {
  // Mock alerts data
  const alerts: TaxAlert[] = [
    {
      id: "1",
      title: "Q2 Estimated Tax Payment Due",
      description:
        "Your quarterly estimated tax payment is due in 15 days. Ensure you have sufficient funds available.",
      type: "deadline",
      priority: "high",
      date: "2023-06-15",
      isActive: true,
      assetClasses: ["all"],
      actions: ["Make payment", "Calculate amount", "Request extension"],
    },
    {
      id: "2",
      title: "Tax Loss Harvesting Opportunity",
      description:
        "Several assets in your portfolio have unrealized losses that could be harvested to offset capital gains.",
      type: "opportunity",
      priority: "medium",
      isActive: true,
      assetClasses: ["stocks", "crypto"],
      actions: ["View assets", "Calculate potential savings"],
    },
    {
      id: "3",
      title: "New Crypto Reporting Requirements",
      description:
        "New regulations for cryptocurrency reporting will take effect next month. Review your holdings for compliance.",
      type: "policy",
      priority: "medium",
      date: "2023-07-01",
      isActive: true,
      assetClasses: ["crypto"],
      actions: ["Review details", "Check compliance"],
    },
    {
      id: "4",
      title: "Long-term Capital Gains Threshold",
      description:
        "Several assets are approaching the 1-year holding period to qualify for long-term capital gains rates.",
      type: "opportunity",
      priority: "medium",
      isActive: true,
      assetClasses: ["stocks", "crypto"],
      actions: ["View assets", "Calculate tax difference"],
    },
    {
      id: "5",
      title: "Tax-Advantaged Account Contribution Limit",
      description:
        "You have not yet maximized your contributions to tax-advantaged accounts for this year.",
      type: "opportunity",
      priority: "low",
      isActive: true,
      assetClasses: ["retirement"],
      actions: ["Calculate remaining limit", "Set up contribution"],
    },
    {
      id: "6",
      title: "Last Day for Tax Loss Harvesting",
      description:
        "December 31st is the last day to realize losses for the current tax year.",
      type: "deadline",
      priority: "high",
      date: "2023-12-31",
      isActive: true,
      assetClasses: ["stocks", "crypto", "etfs"],
      actions: ["View opportunities", "Schedule transactions"],
    },
    {
      id: "7",
      title: "Capital Gains Tax Rate Change",
      description:
        "Proposed legislation may increase capital gains tax rates for high-income individuals starting next year.",
      type: "policy",
      priority: "high",
      date: "2024-01-01",
      isActive: true,
      assetClasses: ["all"],
      actions: ["Review impact", "Plan strategy"],
    },
    {
      id: "8",
      title: "Custom Alert: Portfolio Rebalancing",
      description:
        "Reminder to rebalance your portfolio for tax efficiency before the end of the quarter.",
      type: "custom",
      priority: "low",
      date: "2023-06-30",
      isActive: false,
      actions: ["View portfolio", "Set up rebalancing"],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "opportunity":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "policy":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "custom":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Calendar className="h-4 w-4 mr-2" />;
      case "opportunity":
        return <Check className="h-4 w-4 mr-2" />;
      case "policy":
        return <AlertTriangle className="h-4 w-4 mr-2" />;
      case "custom":
        return <Settings className="h-4 w-4 mr-2" />;
      default:
        return <Bell className="h-4 w-4 mr-2" />;
    }
  };

  // Count active alerts by priority
  const highPriorityCount = alerts.filter(
    (alert) => alert.isActive && alert.priority === "high",
  ).length;
  const mediumPriorityCount = alerts.filter(
    (alert) => alert.isActive && alert.priority === "medium",
  ).length;
  const lowPriorityCount = alerts.filter(
    (alert) => alert.isActive && alert.priority === "low",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Bell className="h-6 w-6 mr-2 text-indigo-500" />
                Tax Alerts & Notifications
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Stay informed about important tax events and opportunities
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Alert Settings</span>
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create Alert</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  High Priority
                </p>
                <h3 className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                  {highPriorityCount}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Require immediate attention
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Medium Priority
                </p>
                <h3 className="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">
                  {mediumPriorityCount}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Should be addressed soon
                </p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Low Priority
                </p>
                <h3 className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">
                  {lowPriorityCount}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  For your information
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="policies">Policy Changes</TabsTrigger>
          <TabsTrigger value="custom">Custom Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {alerts
              .filter((alert) => alert.isActive)
              .map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={getTypeColor(alert.type)}
                          >
                            {getTypeIcon(alert.type)}
                            <span>
                              {alert.type.charAt(0).toUpperCase() +
                                alert.type.slice(1)}
                            </span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.charAt(0).toUpperCase() +
                              alert.priority.slice(1)}{" "}
                            Priority
                          </Badge>
                          {alert.date && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(alert.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-medium">{alert.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {alert.description}
                        </p>

                        {alert.assetClasses && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {alert.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All Assets"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4">
                        <div className="flex items-center">
                          <Label
                            htmlFor={`alert-${alert.id}`}
                            className="mr-2 text-sm"
                          >
                            Active
                          </Label>
                          <Switch
                            id={`alert-${alert.id}`}
                            checked={alert.isActive}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                          {alert.actions?.map((action, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <span>Details</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {alerts.filter((alert) => alert.isActive).length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No active alerts found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="deadlines" className="mt-6">
          <div className="space-y-4">
            {alerts
              .filter((alert) => alert.isActive && alert.type === "deadline")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={getTypeColor(alert.type)}
                          >
                            {getTypeIcon(alert.type)}
                            <span>Deadline</span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.charAt(0).toUpperCase() +
                              alert.priority.slice(1)}{" "}
                            Priority
                          </Badge>
                          {alert.date && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(alert.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-medium">{alert.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {alert.description}
                        </p>

                        {alert.assetClasses && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {alert.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All Assets"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4">
                        <div className="flex items-center">
                          <Label
                            htmlFor={`deadline-${alert.id}`}
                            className="mr-2 text-sm"
                          >
                            Active
                          </Label>
                          <Switch
                            id={`deadline-${alert.id}`}
                            checked={alert.isActive}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                          {alert.actions?.map((action, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <span>Details</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {alerts.filter(
              (alert) => alert.isActive && alert.type === "deadline",
            ).length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No active deadline alerts found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <div className="space-y-4">
            {alerts
              .filter((alert) => alert.isActive && alert.type === "opportunity")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={getTypeColor(alert.type)}
                          >
                            {getTypeIcon(alert.type)}
                            <span>Opportunity</span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.charAt(0).toUpperCase() +
                              alert.priority.slice(1)}{" "}
                            Priority
                          </Badge>
                        </div>

                        <h3 className="text-lg font-medium">{alert.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {alert.description}
                        </p>

                        {alert.assetClasses && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {alert.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All Assets"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4">
                        <div className="flex items-center">
                          <Label
                            htmlFor={`opportunity-${alert.id}`}
                            className="mr-2 text-sm"
                          >
                            Active
                          </Label>
                          <Switch
                            id={`opportunity-${alert.id}`}
                            checked={alert.isActive}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                          {alert.actions?.map((action, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <span>Details</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {alerts.filter(
              (alert) => alert.isActive && alert.type === "opportunity",
            ).length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No active opportunity alerts found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="policies" className="mt-6">
          <div className="space-y-4">
            {alerts
              .filter((alert) => alert.isActive && alert.type === "policy")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={getTypeColor(alert.type)}
                          >
                            {getTypeIcon(alert.type)}
                            <span>Policy Change</span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.charAt(0).toUpperCase() +
                              alert.priority.slice(1)}{" "}
                            Priority
                          </Badge>
                          {alert.date && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(alert.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-medium">{alert.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {alert.description}
                        </p>

                        {alert.assetClasses && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {alert.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All Assets"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4">
                        <div className="flex items-center">
                          <Label
                            htmlFor={`policy-${alert.id}`}
                            className="mr-2 text-sm"
                          >
                            Active
                          </Label>
                          <Switch
                            id={`policy-${alert.id}`}
                            checked={alert.isActive}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                          {alert.actions?.map((action, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <span>Details</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {alerts.filter((alert) => alert.isActive && alert.type === "policy")
              .length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No active policy change alerts found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <div className="space-y-4">
            {alerts
              .filter((alert) => alert.type === "custom")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={getTypeColor(alert.type)}
                          >
                            {getTypeIcon(alert.type)}
                            <span>Custom</span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.charAt(0).toUpperCase() +
                              alert.priority.slice(1)}{" "}
                            Priority
                          </Badge>
                          {alert.date && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(alert.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-medium">{alert.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {alert.description}
                        </p>
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4">
                        <div className="flex items-center">
                          <Label
                            htmlFor={`custom-${alert.id}`}
                            className="mr-2 text-sm"
                          >
                            Active
                          </Label>
                          <Switch
                            id={`custom-${alert.id}`}
                            checked={alert.isActive}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                          {alert.actions?.map((action, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <span>Details</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {alerts.filter((alert) => alert.type === "custom").length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No custom alerts found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxAlerts;
