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
    <div className="w-full h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
      <div></div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenSettings}
          className="h-8 w-8 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
