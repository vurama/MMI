import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  X,
  ArrowRight,
  Building,
  TrendingUp,
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: "property" | "market" | "alert" | "news";
  read: boolean;
  link?: string;
}

interface NotificationsCenterProps {
  className?: string;
  position?: "top" | "side";
}

const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  className,
  position = "top",
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        message: "New property valuation data available for Berlin.",
        timestamp: "2 minutes ago",
        type: "property",
        read: false,
        link: "#property-valuation",
      },
      {
        id: "2",
        message: "Market sentiment shifted positively for Vonovia.",
        timestamp: "15 minutes ago",
        type: "market",
        read: false,
        link: "#market-insights",
      },
      {
        id: "3",
        message:
          "New real estate trend alert: Prices in Munich show a 3% increase.",
        timestamp: "1 hour ago",
        type: "alert",
        read: true,
        link: "#market-strength",
      },
      {
        id: "4",
        message:
          "Aroundtown quarterly report released with better than expected results.",
        timestamp: "3 hours ago",
        type: "news",
        read: true,
        link: "#news",
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);

    // Simulate receiving a new notification every 20 seconds
    const intervalId = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: `Real-time update: ${
          [
            "Property prices in Frankfurt increased by 0.5%",
            "LEG Immobilien trading volume up 12% in the last hour",
            "New market analysis available for residential properties",
            "Vonovia announces new development project in Hamburg",
          ][Math.floor(Math.random() * 4)]
        }`,
        timestamp: "Just now",
        type: ["property", "market", "alert", "news"][
          Math.floor(Math.random() * 4)
        ] as any,
        read: false,
        link: "#",
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 7)]);
      setUnreadCount((prev) => prev + 1);
    }, 20000); // Update every 20 seconds

    return () => clearInterval(intervalId);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
    setUnreadCount(0);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
    // Update unread count if needed
    const wasUnread = notifications.find((n) => n.id === id)?.read === false;
    if (wasUnread) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const dismissAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "property":
        return <Building className="h-4 w-4 text-blue-500" />;
      case "market":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "alert":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "news":
        return <MapPin className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get the most recent unread notification
  const latestUnreadNotification = notifications.find((n) => !n.read);

  if (position === "top") {
    return (
      <TooltipProvider>
        <div className={`relative w-full ${className}`}>
          {/* Single-line notification box */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2 flex-1">
                <Bell className="h-5 w-5 text-indigo-600" />
                {unreadCount > 0 ? (
                  <Badge variant="destructive" className="mr-2">
                    {unreadCount}
                  </Badge>
                ) : null}
                <div className="text-sm truncate flex-1">
                  {latestUnreadNotification ? (
                    <span>
                      {getNotificationIcon(latestUnreadNotification.type)}
                      <span className="ml-2">
                        {latestUnreadNotification.message}
                      </span>
                    </span>
                  ) : (
                    <span className="text-gray-500">No new notifications</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={dismissAllNotifications}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Dismiss all
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <CardContent className="p-0 border-t">
                    {notifications.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 border-b last:border-b-0 flex items-start gap-2 ${notification.read ? "bg-white" : "bg-blue-50"}`}
                          >
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <a
                                  href={notification.link}
                                  className="text-sm font-medium hover:text-indigo-600 transition-colors"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  {notification.message}
                                </a>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 ml-1"
                                  onClick={() =>
                                    removeNotification(notification.id)
                                  }
                                >
                                  <X className="h-3 w-3 text-gray-400" />
                                </Button>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">
                                  {notification.timestamp}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 p-0 text-xs text-indigo-600 hover:text-indigo-800"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <span className="mr-1">View</span>
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Pulse animation for unread notifications */}
          {unreadCount > 0 && !isExpanded && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          )}
        </div>
      </TooltipProvider>
    );
  }

  // Original side notification center implementation
  return (
    <TooltipProvider>
      <div className={`relative ${className}`}>
        {/* Circular notification badge with bell icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full h-10 w-10 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Bell className="h-5 w-5 text-indigo-600" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {unreadCount > 0
                ? `${unreadCount} new notifications`
                : "No new notifications"}
            </p>
          </TooltipContent>
        </Tooltip>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden absolute right-0 top-12 z-50 w-80 md:w-96"
            >
              <Card className="border border-gray-200 shadow-md">
                <div className="flex items-center justify-between p-3 border-b">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4 text-indigo-600" />
                    Notifications
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {unreadCount} new
                      </Badge>
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <Check className="h-3 w-3" />
                        Mark all as read
                      </Button>
                    )}
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={dismissAllNotifications}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Dismiss all
                      </Button>
                    )}
                  </div>
                </div>
                <CardContent className="p-0">
                  {notifications.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      No notifications
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 border-b last:border-b-0 flex items-start gap-2 ${notification.read ? "bg-white" : "bg-blue-50"}`}
                        >
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <a
                                href={notification.link}
                                className="text-sm font-medium hover:text-indigo-600 transition-colors"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.message}
                              </a>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 ml-1"
                                onClick={() =>
                                  removeNotification(notification.id)
                                }
                              >
                                <X className="h-3 w-3 text-gray-400" />
                              </Button>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500">
                                {notification.timestamp}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 p-0 text-xs text-indigo-600 hover:text-indigo-800"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <span className="mr-1">View</span>
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation for unread notifications */}
        {unreadCount > 0 && !isExpanded && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </div>
    </TooltipProvider>
  );
};

export default NotificationsCenter;
