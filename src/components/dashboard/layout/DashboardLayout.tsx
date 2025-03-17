import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SettingsDialog from "@/components/ui/settings-dialog";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeItem: propActiveItem,
}) => {
  const [activeItem, setActiveItem] = useState(
    propActiveItem || "Intelligence Center",
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeAgents, setActiveAgents] = useState({
    marketAnalysis: true,
    sentimentTracker: true,
    newsAnalyzer: true,
    alertGenerator: false,
  });

  const toggleAgent = (agentKey: string) => {
    setActiveAgents((prev) => ({
      ...prev,
      [agentKey]: !prev[agentKey as keyof typeof prev],
    }));
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onOpenSettings={handleOpenSettings} />
        <main className="flex-1 overflow-y-auto w-full h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        aiEnabled={aiEnabled}
        setAiEnabled={setAiEnabled}
        activeAgents={activeAgents}
        toggleAgent={toggleAgent}
      />
    </div>
  );
};

export default DashboardLayout;
