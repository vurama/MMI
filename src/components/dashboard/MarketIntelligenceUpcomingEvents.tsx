import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  Brain,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "earnings" | "economic" | "fed" | "ipo";
  impact: "high" | "medium" | "low";
  aiSummary: string;
}

const DUMMY_EVENTS: Event[] = [
  {
    id: "1",
    title: "Apple (AAPL) Earnings",
    date: "2023-07-28",
    time: "16:30 ET",
    type: "earnings",
    impact: "high",
    aiSummary:
      "Expected to report strong iPhone sales but potential weakness in services. Market anticipates EPS of $1.19, which would represent 2.5% YoY growth.",
  },
  {
    id: "2",
    title: "US GDP Q2 2023",
    date: "2023-07-27",
    time: "08:30 ET",
    type: "economic",
    impact: "high",
    aiSummary:
      "Consensus forecast is 1.8% annualized growth, down from 2.0% in Q1. A significant miss could trigger market volatility and shift Fed rate expectations.",
  },
  {
    id: "3",
    title: "Federal Reserve Interest Rate Decision",
    date: "2023-07-26",
    time: "14:00 ET",
    type: "fed",
    impact: "high",
    aiSummary:
      "Markets have priced in a 25bps hike with 94% probability. Key focus will be on forward guidance language regarding future rate path.",
  },
  {
    id: "4",
    title: "Microsoft (MSFT) Earnings",
    date: "2023-07-25",
    time: "16:00 ET",
    type: "earnings",
    impact: "high",
    aiSummary:
      "Cloud growth expected to remain strong at 25-27% YoY. AI investments likely to impact margins slightly, but overall EPS projected at $2.55.",
  },
  {
    id: "5",
    title: "US Consumer Confidence",
    date: "2023-07-25",
    time: "10:00 ET",
    type: "economic",
    impact: "medium",
    aiSummary:
      "Expected to show modest improvement to 103.5 from 102.3 last month. Continued strength in consumer sentiment would support the soft landing narrative.",
  },
  {
    id: "6",
    title: "ARM Holdings IPO",
    date: "2023-07-31",
    time: "09:30 ET",
    type: "ipo",
    impact: "medium",
    aiSummary:
      "Highly anticipated chip designer IPO valued at approximately $60B. Strong demand expected given AI chip boom, but pricing may be aggressive.",
  },
  {
    id: "7",
    title: "US PCE Inflation",
    date: "2023-07-28",
    time: "08:30 ET",
    type: "economic",
    impact: "high",
    aiSummary:
      "Core PCE expected at 4.1% YoY, down from 4.3%. This is the Fed's preferred inflation gauge and will influence September rate decision.",
  },
  {
    id: "8",
    title: "Tesla (TSLA) Earnings",
    date: "2023-07-24",
    time: "16:00 ET",
    type: "earnings",
    impact: "high",
    aiSummary:
      "Focus on margins after recent price cuts. Delivery numbers already released showed 83% YoY growth. EPS expected at $0.81 vs $0.76 last year.",
  },
];

const getEventTypeIcon = (type: Event["type"]) => {
  switch (type) {
    case "earnings":
      return <TrendingUp className="h-4 w-4 text-blue-500" />;
    case "economic":
      return <Calendar className="h-4 w-4 text-green-500" />;
    case "fed":
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case "ipo":
      return <TrendingUp className="h-4 w-4 text-purple-500" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getImpactColor = (impact: Event["impact"]) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "medium":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const MarketIntelligenceUpcomingEvents: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const uniqueDates = [
    ...new Set(DUMMY_EVENTS.map((event) => event.date)),
  ].sort();

  const filteredEvents = DUMMY_EVENTS.filter((event) => {
    if (selectedDate !== "all" && event.date !== selectedDate) return false;
    if (selectedType !== "all" && event.type !== selectedType) return false;
    return true;
  });

  const toggleEventExpansion = (eventId: string) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  return (
    <Card className="shadow-md border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">
              Upcoming Market Events
            </CardTitle>
            <CardDescription>
              Key events that may impact markets
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <select
              className="text-xs rounded-md border border-gray-200 bg-white px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="all">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
            <select
              className="text-xs rounded-md border border-gray-200 bg-white px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="earnings">Earnings</option>
              <option value="economic">Economic</option>
              <option value="fed">Fed</option>
              <option value="ipo">IPO</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`text-xs ${getImpactColor(event.impact)}`}
                      >
                        {event.impact.charAt(0).toUpperCase() +
                          event.impact.slice(1)}{" "}
                        Impact
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full"
                              onClick={() => toggleEventExpansion(event.id)}
                            >
                              <Brain className="h-3.5 w-3.5 text-indigo-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            className="bg-gray-900 text-white text-xs"
                          >
                            <p>AI Analysis</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {expandedEvent === event.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-start space-x-2">
                        <Brain className="h-4 w-4 text-indigo-500 mt-0.5" />
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          <p className="font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                            AI Analysis:
                          </p>
                          <p>{event.aiSummary}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No events match your filters</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MarketIntelligenceUpcomingEvents;
