import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartHistoryItem from "./ChartHistoryItem";
import { RecommendationType } from "./AIAnalysisPanel";
import { AnalysisStatus } from "./HumanAnalysisPanel";

export interface ChartHistoryEntry {
  id: string;
  chartUrl: string;
  category: string;
  ticker: string;
  submittedAt: string;
  aiAnalysis?: {
    recommendation: RecommendationType;
    confidence: number;
  };
  humanAnalysis?: {
    status: AnalysisStatus;
    boostCredits: number;
  };
}

interface ChartHistoryListProps {
  history: ChartHistoryEntry[];
  onSelectEntry: (entry: ChartHistoryEntry) => void;
}

const ChartHistoryList: React.FC<ChartHistoryListProps> = ({
  history,
  onSelectEntry,
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All Charts</TabsTrigger>
        <TabsTrigger value="ai">AI Analysis</TabsTrigger>
        <TabsTrigger value="human">Human Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.length > 0 ? (
              history.map((entry) => (
                <ChartHistoryItem
                  key={entry.id}
                  {...entry}
                  onClick={() => onSelectEntry(entry)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No chart analysis history yet
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="ai" className="mt-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.filter((entry) => entry.aiAnalysis).length > 0 ? (
              history
                .filter((entry) => entry.aiAnalysis)
                .map((entry) => (
                  <ChartHistoryItem
                    key={entry.id}
                    {...entry}
                    onClick={() => onSelectEntry(entry)}
                  />
                ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No AI analysis history yet
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="human" className="mt-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.filter((entry) => entry.humanAnalysis).length > 0 ? (
              history
                .filter((entry) => entry.humanAnalysis)
                .map((entry) => (
                  <ChartHistoryItem
                    key={entry.id}
                    {...entry}
                    onClick={() => onSelectEntry(entry)}
                  />
                ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No human analysis history yet
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default ChartHistoryList;
