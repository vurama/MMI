import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BellRing,
  Plus,
  Trash2,
  Edit,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  BellOff,
  Settings,
  Brain,
} from "lucide-react";
import AlertsWidget from "../dashboard/AlertsWidget";
import IntelligentAlerts from "../dashboard/IntelligentAlerts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Alert {
  id: string;
  sector: string;
  symbol?: string;
  condition: string;
  threshold: number;
  notificationMethod: string;
  isActive: boolean;
  createdAt: string;
  lastTriggered?: string;
  status?: "triggered" | "pending" | "inactive";
}

const AlertsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [globalAlertsEnabled, setGlobalAlertsEnabled] = useState(true);

  // Sample alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      sector: "Stocks",
      symbol: "AAPL",
      condition: "above",
      threshold: 200,
      notificationMethod: "email",
      isActive: true,
      createdAt: "2023-07-15T10:30:00Z",
      lastTriggered: "2023-07-22T14:45:00Z",
      status: "triggered",
    },
    {
      id: "2",
      sector: "Crypto",
      symbol: "BTC",
      condition: "below",
      threshold: 45000,
      notificationMethod: "push",
      isActive: true,
      createdAt: "2023-07-18T09:15:00Z",
      status: "pending",
    },
    {
      id: "3",
      sector: "Real Estate",
      condition: "change_above",
      threshold: 5,
      notificationMethod: "email",
      isActive: false,
      createdAt: "2023-07-10T16:20:00Z",
      status: "inactive",
    },
    {
      id: "4",
      sector: "Stocks",
      symbol: "MSFT",
      condition: "below",
      threshold: 350,
      notificationMethod: "push",
      isActive: true,
      createdAt: "2023-07-20T11:45:00Z",
      status: "pending",
    },
    {
      id: "5",
      sector: "Crypto",
      symbol: "ETH",
      condition: "above",
      threshold: 2500,
      notificationMethod: "sms",
      isActive: true,
      createdAt: "2023-07-19T14:30:00Z",
      lastTriggered: "2023-07-21T09:15:00Z",
      status: "triggered",
    },
  ]);

  // Sample recent alerts history
  const alertHistory = [
    {
      id: "h1",
      symbol: "AAPL",
      message: "Apple Inc. price above $200",
      timestamp: "Today, 2:45 PM",
      type: "price",
    },
    {
      id: "h2",
      symbol: "ETH",
      message: "Ethereum price above $2,500",
      timestamp: "Today, 9:15 AM",
      type: "price",
    },
    {
      id: "h3",
      symbol: "SPY",
      message: "S&P 500 ETF change above 2%",
      timestamp: "Yesterday, 3:30 PM",
      type: "change",
    },
    {
      id: "h4",
      symbol: "NVDA",
      message: "NVIDIA Corp volume spike detected",
      timestamp: "Yesterday, 11:20 AM",
      type: "volume",
    },
    {
      id: "h5",
      symbol: "HOUSING",
      message: "Housing market index change above 3%",
      timestamp: "Jul 20, 10:15 AM",
      type: "change",
    },
  ];

  const [newAlert, setNewAlert] = useState({
    sector: "Stocks",
    symbol: "",
    condition: "above",
    threshold: 0,
    notificationMethod: "email",
  });

  // Sample intelligent alert categories
  const [intelligentAlertCategories, setIntelligentAlertCategories] = useState<
    AlertCategory[]
  >([
    {
      id: "stocks",
      name: "Stock Market",
      description: "Alerts for stock market movements and opportunities",
      icon: <Brain className="h-5 w-5 text-blue-500" />,
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
          description:
            "Notification when capital flows indicate sector rotation",
          enabled: true,
          priority: "medium",
        },
      ],
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description:
        "Alerts for cryptocurrency market movements and opportunities",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
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
          description:
            "Notification when large holders move significant amounts",
          enabled: false,
          priority: "medium",
        },
      ],
    },
  ]);

  const handleCreateAlert = () => {
    const newAlertItem: Alert = {
      id: `${alerts.length + 1}`,
      ...newAlert,
      isActive: true,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setAlerts([newAlertItem, ...alerts]);
    setIsDialogOpen(false);
    setNewAlert({
      sector: "Stocks",
      symbol: "",
      condition: "above",
      threshold: 0,
      notificationMethod: "email",
    });
  };

  const handleToggleAlert = (id: string, isActive: boolean) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, isActive, status: isActive ? "pending" : "inactive" }
          : alert,
      ),
    );
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const filteredAlerts =
    activeTab === "all"
      ? alerts
      : activeTab === "active"
        ? alerts.filter((alert) => alert.isActive)
        : activeTab === "triggered"
          ? alerts.filter((alert) => alert.status === "triggered")
          : alerts.filter((alert) => alert.sector.toLowerCase() === activeTab);

  const getConditionText = (condition: string, threshold: number) => {
    switch (condition) {
      case "above":
        return `Price above ${threshold}`;
      case "below":
        return `Price below ${threshold}`;
      case "change_above":
        return `Change above ${threshold}%`;
      case "change_below":
        return `Change below ${threshold}%`;
      default:
        return `${condition} ${threshold}`;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "triggered":
        return <Badge className="bg-red-100 text-red-800">Triggered</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return null;
    }
  };

  const handleToggleCategory = (categoryId: string, enabled: boolean) => {
    setIntelligentAlertCategories(
      intelligentAlertCategories.map((category) =>
        category.id === categoryId ? { ...category, enabled } : category,
      ),
    );
  };

  const handleToggleIntelligentAlert = (
    categoryId: string,
    alertId: string,
    enabled: boolean,
  ) => {
    setIntelligentAlertCategories(
      intelligentAlertCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              alerts: category.alerts.map((alert) =>
                alert.id === alertId ? { ...alert, enabled } : alert,
              ),
            }
          : category,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Alerts" />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-6 pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <BellRing className="h-7 w-7 text-orange-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Market Alerts
                </h1>
                <div className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Alerts</span>
                  <Switch
                    checked={globalAlertsEnabled}
                    onCheckedChange={setGlobalAlertsEnabled}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Alert</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sector" className="text-right">
                          Sector
                        </Label>
                        <Select
                          value={newAlert.sector}
                          onValueChange={(value) =>
                            setNewAlert({ ...newAlert, sector: value })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Stocks">Stocks</SelectItem>
                            <SelectItem value="Real Estate">
                              Real Estate
                            </SelectItem>
                            <SelectItem value="Crypto">Crypto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="symbol" className="text-right">
                          Symbol
                        </Label>
                        <Input
                          id="symbol"
                          placeholder="e.g. AAPL, BTC (optional)"
                          className="col-span-3"
                          value={newAlert.symbol}
                          onChange={(e) =>
                            setNewAlert({ ...newAlert, symbol: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="condition" className="text-right">
                          Condition
                        </Label>
                        <Select
                          value={newAlert.condition}
                          onValueChange={(value) =>
                            setNewAlert({ ...newAlert, condition: value })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="above">Price above</SelectItem>
                            <SelectItem value="below">Price below</SelectItem>
                            <SelectItem value="change_above">
                              Change above
                            </SelectItem>
                            <SelectItem value="change_below">
                              Change below
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="threshold" className="text-right">
                          Threshold
                        </Label>
                        <Input
                          id="threshold"
                          type="number"
                          className="col-span-3"
                          value={newAlert.threshold.toString()}
                          onChange={(e) =>
                            setNewAlert({
                              ...newAlert,
                              threshold: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notification" className="text-right">
                          Notification
                        </Label>
                        <Select
                          value={newAlert.notificationMethod}
                          onValueChange={(value) =>
                            setNewAlert({
                              ...newAlert,
                              notificationMethod: value,
                            })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Notification method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="push">
                              Push notification
                            </SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleCreateAlert}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Create Alert
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="rounded-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Alert Settings
                </Button>
              </div>
            </div>

            {!globalAlertsEnabled && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-amber-800 text-sm">
                  All alerts are currently disabled. You will not receive any
                  notifications until alerts are enabled.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-amber-300 text-amber-700 hover:bg-amber-100"
                  onClick={() => setGlobalAlertsEnabled(true)}
                >
                  Enable Alerts
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 mb-6">
              <IntelligentAlerts
                categories={intelligentAlertCategories}
                onToggleCategory={handleToggleCategory}
                onToggleAlert={handleToggleIntelligentAlert}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">
                        Your Alerts
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <Filter className="h-3.5 w-3.5 mr-1" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      defaultValue="all"
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="mb-4"
                    >
                      <TabsList className="grid grid-cols-5 w-full">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="triggered">Triggered</TabsTrigger>
                        <TabsTrigger value="stocks">Stocks</TabsTrigger>
                        <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="space-y-4">
                      {filteredAlerts.length > 0 ? (
                        filteredAlerts.map((alert, index) => (
                          <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className={`p-4 border rounded-lg flex flex-col space-y-3 ${alert.isActive ? "border-orange-200 bg-orange-50/30" : "border-gray-200 bg-gray-50/50"}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    alert.sector === "Stocks"
                                      ? "default"
                                      : alert.sector === "Crypto"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {alert.sector}
                                </Badge>
                                {alert.symbol && (
                                  <Badge
                                    variant="outline"
                                    className="font-mono"
                                  >
                                    {alert.symbol}
                                  </Badge>
                                )}
                                {getStatusBadge(alert.status)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={alert.isActive}
                                  onCheckedChange={(checked) =>
                                    handleToggleAlert(alert.id, checked)
                                  }
                                  className="data-[state=checked]:bg-orange-500"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-gray-500 hover:text-gray-700"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-gray-500 hover:text-red-500"
                                  onClick={() => handleDeleteAlert(alert.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-sm text-gray-700">
                              {getConditionText(
                                alert.condition,
                                alert.threshold,
                              )}
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <div>
                                Notification via: {alert.notificationMethod}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {alert.lastTriggered ? (
                                  <span>
                                    Last triggered:{" "}
                                    {new Date(
                                      alert.lastTriggered,
                                    ).toLocaleString()}
                                  </span>
                                ) : (
                                  <span>
                                    Created:{" "}
                                    {new Date(alert.createdAt).toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="h-[240px] flex flex-col items-center justify-center text-center p-4">
                          <BellOff className="h-12 w-12 text-gray-300 mb-3" />
                          <h3 className="text-gray-700 font-medium mb-1">
                            No alerts found
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {activeTab === "all"
                              ? "You haven't created any alerts yet. Create one to get started."
                              : `No ${activeTab} alerts found. Try a different filter or create a new alert.`}
                          </p>
                          <Button
                            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => setIsDialogOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Alert
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <AlertsWidget
                  alerts={alerts.filter((a) => a.isActive)}
                  onToggleAlert={handleToggleAlert}
                  onDeleteAlert={handleDeleteAlert}
                  onCreateAlert={(alert) => {
                    const newAlertItem: Alert = {
                      id: `${alerts.length + 1}`,
                      ...alert,
                      createdAt: new Date().toISOString(),
                      status: "pending",
                    };
                    setAlerts([newAlertItem, ...alerts]);
                  }}
                />

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alertHistory.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <Bell className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Badge
                                  variant="outline"
                                  className="font-mono mb-1"
                                >
                                  {alert.symbol}
                                </Badge>
                                <p className="text-sm text-gray-700">
                                  {alert.message}
                                </p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {alert.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
