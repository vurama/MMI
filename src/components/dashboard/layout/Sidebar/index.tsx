import React from "react";
import { Home, BarChart2, Settings, HelpCircle, Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={`w-16 bg-white border-r border-gray-200 h-screen flex flex-col items-center py-6 ${className}`}
    >
      <div className="flex flex-col items-center space-y-8">
        <Link
          to="/dashboard"
          className="p-3 rounded-lg hover:bg-indigo-100 text-indigo-600"
        >
          <Home className="h-6 w-6" />
        </Link>
        <Link
          to="/market-data"
          className="p-3 rounded-lg hover:bg-indigo-100 text-gray-600 hover:text-indigo-600"
        >
          <BarChart2 className="h-6 w-6" />
        </Link>
        <Link
          to="/alerts"
          className="p-3 rounded-lg hover:bg-indigo-100 text-gray-600 hover:text-indigo-600"
        >
          <Bell className="h-6 w-6" />
        </Link>
        <Link
          to="/help"
          className="p-3 rounded-lg hover:bg-indigo-100 text-gray-600 hover:text-indigo-600"
        >
          <HelpCircle className="h-6 w-6" />
        </Link>
        <Link
          to="/settings"
          className="p-3 rounded-lg hover:bg-indigo-100 text-gray-600 hover:text-indigo-600"
        >
          <Settings className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
