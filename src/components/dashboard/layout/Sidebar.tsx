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
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      {
        icon: <LayoutDashboard size={20} />,
        label: "Intelligence Center",
        href: "/dashboard",
      },
      {
        icon: <MessageSquare size={20} />,
        label: "Pro Advisor",
        href: "/advisor",
      },
      {
        icon: <Newspaper size={20} />,
        label: "News Flash",
        href: "/news",
      },
      {
        icon: <BellRing size={20} />,
        label: "AI Alerts",
        href: "/alerts",
      },
      {
        icon: <Globe size={20} />,
        label: "Real Estate",
        href: "/real-estate",
      },
      {
        icon: <Building2 size={20} />,
        label: "Real Estate Engine",
        href: "/real-estate-engine",
      },
    ],
  },
  {
    title: "Analysis",
    items: [
      {
        icon: <LineChart size={20} />,
        label: "Chart Analyzer",
        href: "/chart-analyzer",
      },
      {
        icon: <Brain size={20} />,
        label: "Signals",
        href: "/signals",
      },
      {
        icon: <TrendingUp size={20} />,
        label: "Social Trading",
        href: "/social-trading",
      },
    ],
  },
  {
    title: "Market Intelligence",
    items: [
      {
        icon: <AlertCircle size={20} />,
        label: "Broker Radar",
        href: "/broker-radar",
      },
      {
        icon: <Brain size={20} />,
        label: "Market Correlation",
        href: "/market-correlation",
      },
      {
        icon: <Brain size={20} />,
        label: "Risk Assessment",
        href: "/risk-assessment",
      },
      {
        icon: <Globe size={20} />,
        label: "Crypto World Map",
        href: "/crypto-map",
      },
      {
        icon: <AlertCircle size={20} />,
        label: "Red Flag AI",
        href: "/red-flag-ai",
      },
      {
        icon: <DollarSign size={20} />,
        label: "Tax Tracker",
        href: "/tax-tracker",
      },
    ],
  },
  {
    title: "Settings & Support",
    items: [
      {
        icon: <Settings size={20} />,
        label: "Settings",
        href: "/settings",
      },
      {
        icon: <Bot size={20} />,
        label: "Agents",
        href: "/agents",
      },
      {
        icon: <Crown size={20} />,
        label: "Subscription",
        href: "/subscription",
      },
      {
        icon: <HelpCircle size={20} />,
        label: "Help Center",
        href: "/help",
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        icon: <FileText size={20} />,
        label: "Pro Advisor Admin",
        href: "/admin/advisor",
      },
      {
        icon: <ClipboardCheck size={20} />,
        label: "Chart Analysis Admin",
        href: "/chart-analysis-admin",
      },
    ],
  },
];

const Sidebar = ({
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

      <div className="flex-1 px-3 overflow-y-auto">
        {navGroups.map((group, index) => (
          <div key={group.title} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-10 rounded-md text-sm font-medium ${item.label === activeItem ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400 dark:hover:bg-indigo-950/70" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span
                    className={`${item.label === activeItem ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Button>
              ))}
            </div>
            {index < navGroups.length - 1 && (
              <Separator className="my-4 bg-gray-100 dark:bg-gray-700" />
            )}
          </div>
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
              className="w-[280px] h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto"
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
