import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Bot,
  Brain,
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aiEnabled: boolean;
  setAiEnabled: (enabled: boolean) => void;
  activeAgents: {
    marketAnalysis: boolean;
    sentimentTracker: boolean;
    newsAnalyzer: boolean;
    alertGenerator: boolean;
  };
  toggleAgent: (agentKey: string) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  aiEnabled,
  setAiEnabled,
  activeAgents,
  toggleAgent,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl dark:text-white">
            <Settings className="h-5 w-5 mr-2" />
            Dashboard Settings
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium dark:text-white">
                  Appearance
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize the theme and appearance
                </p>
              </div>
              <ThemeToggle />
            </div>
            <Separator className="my-4 bg-gray-100 dark:bg-gray-700" />
          </div>
          {/* AI Engine Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium dark:text-white">
                  AI Engine
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Control AI-powered features and analysis
                </p>
              </div>
              <Switch
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
                className="data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-700"
              />
            </div>

            {!aiEnabled && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2 flex-shrink-0" />
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  AI analysis is currently disabled. Enable AI to receive
                  real-time market insights and predictions.
                </p>
              </div>
            )}

            <Separator className="my-4 bg-gray-100 dark:bg-gray-700" />

            {/* Active AI Agents */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium dark:text-white flex items-center">
                  <Bot className="h-4 w-4 mr-1.5 text-indigo-600 dark:text-indigo-400" />
                  Active AI Agents
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/30"
                  onClick={() => {
                    // Enable all agents
                    toggleAgent("marketAnalysis");
                    toggleAgent("sentimentTracker");
                    toggleAgent("newsAnalyzer");
                    toggleAgent("alertGenerator");
                  }}
                  disabled={!aiEnabled}
                >
                  Enable All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                      <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-gray-200">
                        Market Analyzer
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Trend detection
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeAgents.marketAnalysis}
                    onCheckedChange={() => toggleAgent("marketAnalysis")}
                    className="data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-700"
                    disabled={!aiEnabled}
                  />
                </div>

                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-gray-200">
                        Sentiment Tracker
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Mood analysis
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeAgents.sentimentTracker}
                    onCheckedChange={() => toggleAgent("sentimentTracker")}
                    className="data-[state=checked]:bg-green-600 dark:data-[state=checked]:bg-green-700"
                    disabled={!aiEnabled}
                  />
                </div>

                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-gray-200">
                        News Analyzer
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Content parsing
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeAgents.newsAnalyzer}
                    onCheckedChange={() => toggleAgent("newsAnalyzer")}
                    className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700"
                    disabled={!aiEnabled}
                  />
                </div>

                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-gray-200">
                        Alert Generator
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeAgents.alertGenerator}
                    onCheckedChange={() => toggleAgent("alertGenerator")}
                    className="data-[state=checked]:bg-orange-600 dark:data-[state=checked]:bg-orange-700"
                    disabled={!aiEnabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
