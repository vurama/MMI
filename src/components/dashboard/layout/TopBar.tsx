import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Settings } from "lucide-react";
import AccountDropdown from "@/components/ui/account-dropdown";

interface TopBarProps {
  onOpenSettings: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onOpenSettings }) => {
  const handleOpenSettings = () => {
    // Dispatch multiple events to ensure all settings buttons work
    [
      "open-app-settings",
      "open-settings",
      "settings-click",
      "toggle-settings",
    ].forEach((eventName) => {
      window.dispatchEvent(new Event(eventName));
    });

    // Also call the passed in handler if it exists
    if (onOpenSettings) {
      onOpenSettings();
    }
  };

  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-30">
      <div className="flex-1 flex items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={handleOpenSettings}
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <AccountDropdown onOpenSettings={handleOpenSettings} />
      </div>
    </div>
  );
};

export default TopBar;
