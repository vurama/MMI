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
  Filter,
  Settings,
} from "lucide-react";
import AlertsWidget from "../dashboard/AlertsWidget";

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
                            <SelectValue>{newAlert.sector}</SelectValue>
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
                            <SelectValue>
                              {newAlert.condition === "above" && "Price above"}
                              {newAlert.condition === "below" && "Price below"}
                              {newAlert.condition === "change_above" &&
                                "Change above"}
                              {newAlert.condition === "change_below" &&
                                "Change below"}
                            </SelectValue>
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
                            <SelectValue>
                              {newAlert.notificationMethod === "email" &&
                                "Email"}
                              {newAlert.notificationMethod === "push" &&
                                "Push notification"}
                              {newAlert.notificationMethod === "sms" && "SMS"}
                            </SelectValue>
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
                                  onCheckedChange={(checked) => {
                                    handleToggleAlert(alert.id, checked);
                                  }}
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
                                {alert.lastTriggered
                                  ? `Last triggered: ${new Date(
                                      alert.lastTriggered,
                                    ).toLocaleString()}`
                                  : "Not triggered yet"}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No alerts found. Create a new alert to get started.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <AlertsWidget alerts={alertHistory} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
