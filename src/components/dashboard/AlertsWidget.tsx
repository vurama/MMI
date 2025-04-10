import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellRing, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Alert {
  id: string;
  sector: string;
  symbol?: string;
  condition: string;
  threshold: number;
  notificationMethod: string;
  isActive: boolean;
}

interface AlertsWidgetProps {
  alerts?: Alert[];
  isLoading?: boolean;
  onCreateAlert?: (alert: Omit<Alert, "id">) => void;
  onDeleteAlert?: (id: string) => void;
  onToggleAlert?: (id: string, isActive: boolean) => void;
}

const defaultAlerts: Alert[] = [
  {
    id: "1",
    sector: "Stocks",
    symbol: "AAPL",
    condition: "above",
    threshold: 200,
    notificationMethod: "email",
    isActive: true,
  },
  {
    id: "2",
    sector: "Crypto",
    symbol: "BTC",
    condition: "below",
    threshold: 45000,
    notificationMethod: "push",
    isActive: true,
  },
  {
    id: "3",
    sector: "Real Estate",
    condition: "change_above",
    threshold: 5,
    notificationMethod: "email",
    isActive: false,
  },
];

const AlertsWidget = ({
  alerts = defaultAlerts,
  isLoading = false,
  onCreateAlert = () => {},
  onDeleteAlert = () => {},
  onToggleAlert = () => {},
}: AlertsWidgetProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    sector: "Stocks",
    symbol: "",
    condition: "above",
    threshold: 0,
    notificationMethod: "email",
  });

  const handleCreateAlert = () => {
    onCreateAlert({
      ...newAlert,
      isActive: true,
    });
    setNewAlert({
      sector: "Stocks",
      symbol: "",
      condition: "above",
      threshold: 0,
      notificationMethod: "email",
    });
    setIsDialogOpen(false);
  };

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

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
            <BellRing className="h-5 w-5 mr-2 text-orange-500" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-3 border border-gray-100 rounded-lg space-y-2 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-100 pt-4">
          <div className="h-9 bg-gray-100 animate-pulse rounded-md w-full"></div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <BellRing className="h-5 w-5 mr-2 text-orange-500" />
          Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <ScrollArea className="h-[240px] pr-4">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 border rounded-lg flex flex-col space-y-2 ${alert.isActive ? "border-orange-200 bg-orange-50/30" : "border-gray-200 bg-gray-50/50"}`}
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
                        <Badge variant="outline" className="font-mono">
                          {alert.symbol}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={alert.isActive}
                        onCheckedChange={(checked) =>
                          onToggleAlert(alert.id, checked)
                        }
                        size="sm"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-red-500"
                        onClick={() => onDeleteAlert(alert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {getConditionText(alert.condition, alert.threshold)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Notification via: {alert.notificationMethod}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="h-[240px] flex flex-col items-center justify-center text-center p-4">
            <BellRing className="h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-gray-700 font-medium mb-1">No alerts set</h3>
            <p className="text-gray-500 text-sm">
              Create alerts to get notified about market changes
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add New Alert
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
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
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
                    <SelectItem value="change_above">Change above</SelectItem>
                    <SelectItem value="change_below">Change below</SelectItem>
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
                    setNewAlert({ ...newAlert, notificationMethod: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Notification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push notification</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateAlert}>Create Alert</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AlertsWidget;
