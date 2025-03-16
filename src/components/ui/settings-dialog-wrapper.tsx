import React, { useState, useEffect } from "react";
import SettingsDialog from "./settings-dialog";

const SettingsDialogWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeAgents, setActiveAgents] = useState({
    marketAnalysis: true,
    sentimentTracker: true,
    newsAnalyzer: true,
    alertGenerator: true,
  });

  const toggleAgent = (agentKey: string) => {
    setActiveAgents((prev) => ({
      ...prev,
      [agentKey]: !prev[agentKey as keyof typeof prev],
    }));
  };

  useEffect(() => {
    // Listen for all possible settings events
    const handleOpenSettings = () => {
      console.log("Opening settings dialog");
      setIsOpen(true);
    };

    // Listen for all possible event names that might be used to open settings
    const eventNames = [
      "open-app-settings",
      "open-settings",
      "settings-click",
      "toggle-settings",
    ];

    eventNames.forEach((eventName) => {
      window.addEventListener(eventName, handleOpenSettings);
    });

    return () => {
      eventNames.forEach((eventName) => {
        window.removeEventListener(eventName, handleOpenSettings);
      });
    };
  }, []);

  return (
    <SettingsDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      aiEnabled={aiEnabled}
      setAiEnabled={setAiEnabled}
      activeAgents={activeAgents}
      toggleAgent={toggleAgent}
    />
  );
};

export default SettingsDialogWrapper;
