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

  return null;
};

export default TopBar;
