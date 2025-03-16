import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Brain,
  LineChart,
  BarChart2,
  PieChart,
  Zap,
  Settings,
  Download,
  RefreshCw,
  Search,
  MessageSquare,
  Bell,
  ChevronUp,
  ChevronDown,
  Home,
  Newspaper,
  User,
} from "lucide-react";

interface QuickAccessToolbarProps {
  onRefresh?: () => void;
  onOpenSettings?: () => void;
  onOpenSearch?: () => void;
  onOpenChat?: () => void;
  onOpenAlerts?: () => void;
  isLoading?: boolean;
  aiEnabled?: boolean;
}

const QuickAccessToolbar: React.FC<QuickAccessToolbarProps> = ({
  onRefresh = () => {},
  onOpenSettings = () => window.dispatchEvent(new CustomEvent("open-settings")),
  onOpenSearch = () => {},
  onOpenChat = () => {},
  onOpenAlerts = () => {},
  isLoading = false,
  aiEnabled = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-end space-y-2">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-row space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                      onClick={() => window.open("/dashboard", "_self")}
                    >
                      <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400"
                      onClick={onOpenChat}
                    >
                      <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>AI Advisor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                      onClick={onOpenSearch}
                    >
                      <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Search</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                      onClick={() => window.open("/news", "_self")}
                    >
                      <Newspaper className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>News</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-400"
                      onClick={() => window.open("/chart-analyzer", "_self")}
                    >
                      <LineChart className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Chart Analyzer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                      onClick={onOpenAlerts}
                    >
                      <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Alerts</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 hidden md:flex"
                      onClick={onRefresh}
                      disabled={isLoading}
                    >
                      <RefreshCw
                        className={`h-5 w-5 text-red-600 dark:text-red-400 ${isLoading ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Refresh Data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      onClick={onOpenSettings}
                    >
                      <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg flex items-center justify-center dark:bg-indigo-700 dark:hover:bg-indigo-800"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <ChevronDown className="h-6 w-6 text-white" />
            ) : (
              <ChevronUp className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickAccessToolbar;
