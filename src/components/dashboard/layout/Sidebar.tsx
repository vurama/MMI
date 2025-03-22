import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  Brain,
  Newspaper,
  Settings,
  HelpCircle,
  BellRing,
  Bot,
  Sparkles,
  Menu,
  X,
  MessageSquare,
  Crown,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Globe,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
  badge?: {
    text: string;
    icon?: React.ReactNode;
    color: string;
  };
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Intelligence Center",
    href: "/dashboard",
    isActive: true,
  },
  {
    icon: <MessageSquare size={20} />,
    label: "Pro Advisor",
    href: "/advisor",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "purple",
    },
  },
  { icon: <Newspaper size={20} />, label: "News Flash", href: "/news" },
  { icon: <BellRing size={20} />, label: "AI Alerts", href: "/alerts" },
  {
    icon: <LineChart size={20} />,
    label: "Chart Analyzer",
    href: "/chart-analyzer",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "cyan",
    },
  },
  {
    icon: <Brain size={20} />,
    label: "Signals",
    href: "/signals",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "indigo",
    },
  },
  {
    icon: <TrendingUp size={20} />,
    label: "Social Trading",
    href: "/social-trading",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "purple",
    },
  },
  {
    icon: <AlertCircle size={20} />,
    label: "Broker Radar",
    href: "/broker-radar",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "orange",
    },
  },
  {
    icon: <Brain size={20} />,
    label: "Market Correlation AI",
    href: "/market-correlation",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "blue",
    },
  },

  {
    icon: <Brain size={20} />,
    label: "Risk Assessment AI",
    href: "/risk-assessment",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "green",
    },
  },
  {
    icon: <Globe size={20} />,
    label: "Crypto World Map",
    href: "/crypto-map",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "indigo",
    },
  },
  {
    icon: <AlertCircle size={20} />,
    label: "Red Flag AI",
    href: "/red-flag-ai",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "red",
    },
  },
  {
    icon: <DollarSign size={20} />,
    label: "Tax Tracker",
    href: "/tax-tracker",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "green",
    },
  },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  {
    icon: <Bot size={20} />,
    label: "Agents",
    href: "/agents",
    badge: {
      text: "New",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "indigo",
    },
  },
  {
    icon: <Crown size={20} />,
    label: "Subscription",
    href: "/subscription",
  },
  { icon: <HelpCircle size={20} />, label: "Help Center", href: "/help" },
  {
    icon: <FileText size={20} />,
    label: "Pro Advisor Admin",
    href: "/admin/advisor",
    badge: {
      text: "Admin",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "purple",
    },
  },
  {
    icon: <ClipboardCheck size={20} />,
    label: "Chart Analysis Admin",
    href: "/chart-analysis-admin",
    badge: {
      text: "Admin",
      icon: <Sparkles className="h-3 w-3 mr-1" />,
      color: "purple",
    },
  },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Intelligence Center",
  onItemClick = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleItemClick = (item: NavItem) => {
    onItemClick(item.label);
    if (item.label === "Settings") {
      // Dispatch custom event to open settings dialog
      window.dispatchEvent(new CustomEvent("open-settings"));
      setIsMobileMenuOpen(false);
      return;
    } else if (item.href) {
      navigate(item.href);
      setIsMobileMenuOpen(false);
      return;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile menu button that's always visible
  const mobileMenuButton = (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border border-gray-200 dark:border-gray-700 rounded-full"
      onClick={toggleMobileMenu}
    >
      {isMobileMenuOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  );

  // Main sidebar content
  const sidebarContent = (
    <>
      <div className="p-4 flex justify-center">
        {/* Logo and title removed as requested */}
      </div>

      <div className="flex-1 px-2 overflow-hidden">
        <div className="space-y-1.5">
          {items.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400 dark:hover:bg-indigo-950/70" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}
              onClick={() => handleItemClick(item)}
            >
              <span
                className={`${item.label === activeItem ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
              >
                {item.icon}
              </span>
              <>
                {item.label}
                {item.badge && (
                  <span
                    className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full flex items-center ${item.badge.color === "indigo" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" : item.badge.color === "cyan" ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300" : item.badge.color === "red" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : item.badge.color === "green" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"}`}
                  >
                    {item.badge.icon}
                    {item.badge.text}
                  </span>
                )}
              </>
            </Button>
          ))}
        </div>

        <Separator className="my-4 bg-gray-100 dark:bg-gray-700" />
      </div>

      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700 pb-8">
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400 dark:hover:bg-indigo-950/70" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"} mb-1.5`}
            onClick={() => handleItemClick(item)}
          >
            <span
              className={`${item.label === activeItem ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
            >
              {item.icon}
            </span>
            {item.label}
            {item.badge && (
              <span
                className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full flex items-center ${item.badge.color === "indigo" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" : item.badge.color === "cyan" ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300" : item.badge.color === "green" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"}`}
              >
                {item.badge.icon}
                {item.badge.text}
              </span>
            )}
          </Button>
        ))}
      </div>
    </>
  );

  return (
    <>
      {mobileMenuButton}

      {/* Desktop sidebar - always visible */}
      <div className="flex h-full w-[280px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 flex-col shadow-md relative overflow-hidden">
        {sidebarContent}
      </div>

      {/* Mobile sidebar - conditionally visible */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-[280px] h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
