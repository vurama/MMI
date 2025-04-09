import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Brain,
  Send,
  MessageSquare,
  X,
  Maximize2,
  Minimize2,
  Calendar,
  Info,
} from "lucide-react";

interface RealEstateAIChatProps {
  className?: string;
}

const EXAMPLE_QUERIES = [
  "What is the current sentiment around Vonovia stock?",
  "What is the 7-day price projection for Aroundtown?",
  "Show me a comparison between the trading volumes of Vonovia and LEG Immobilien over the past month.",
];

const COUNTRIES = [
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "uk", label: "United Kingdom" },
  { value: "spain", label: "Spain" },
  { value: "italy", label: "Italy" },
  { value: "netherlands", label: "Netherlands" },
];

const RealEstateAIChat: React.FC<RealEstateAIChatProps> = ({
  className = "",
}) => {
  const [selectedCountry, setSelectedCountry] = useState("germany");
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDailySummary, setShowDailySummary] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: "How can I assist you with real estate data today?",
      isUser: false,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const handleSendMessage = () => {
    if (!query.trim()) return;

    // Add user message
    setMessages([...messages, { text: query, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `I'm analyzing real estate data for ${COUNTRIES.find((c) => c.value === selectedCountry)?.label}. This is a simulated response to your query: "${query}". In a real implementation, this would connect to an AI service.`,
          isUser: false,
        },
      ]);
    }, 1000);

    setQuery("");
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <Card
        className={`bg-white shadow-md border border-gray-100 ${className} ${isExpanded ? "fixed inset-0 z-50 m-4 max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] transition-all duration-300" : "transition-all duration-300"}`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <CardHeader className="pb-2 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Brain className="h-5 w-5 text-indigo-600 mr-2" />
              Real Estate AI Assistant
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
                className="ml-2"
                aria-label={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              {isExpanded && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="ml-1"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div
            className={`flex flex-col ${isExpanded ? "h-[calc(100vh-12rem)]" : "h-[300px]"}`}
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-100">
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Example queries:</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_QUERIES.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 h-auto"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example.length > 30
                        ? `${example.substring(0, 30)}...`
                        : example}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Ask about real estate data..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setShowDailySummary(true)}
                        size="icon"
                        variant="outline"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Get your daily summary of key market data and trends in
                        one click.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Daily Summary Modal */}
      {showDailySummary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold flex items-center">
                <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                Daily Market Summary
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDailySummary(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Market Overview
                  </h3>
                  <p className="text-gray-700">
                    Today's real estate market in{" "}
                    {COUNTRIES.find((c) => c.value === selectedCountry)?.label}{" "}
                    shows a moderate upward trend with a 2.3% increase in
                    average property values across major metropolitan areas.
                    Transaction volume is up 5% compared to the previous week,
                    indicating strong buyer interest despite rising mortgage
                    rates.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        Average Price Change
                      </p>
                      <p className="text-xl font-bold text-green-600">+2.3%</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        Transaction Volume
                      </p>
                      <p className="text-xl font-bold text-green-600">+5.0%</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Mortgage Rate</p>
                      <p className="text-xl font-bold text-amber-600">6.8%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Top Performing Areas
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Berlin - Mitte: +3.7% (Residential)</li>
                    <li>Munich - Schwabing: +3.2% (Residential)</li>
                    <li>Frankfurt - Westend: +2.9% (Commercial)</li>
                    <li>Hamburg - HafenCity: +2.8% (Mixed-use)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Market Sentiment
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>Bearish</span>
                    <span className="font-medium">
                      Moderately Bullish (65/100)
                    </span>
                    <span>Bullish</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Today's News Highlights
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="font-medium">
                        New Government Housing Initiative Announced
                      </p>
                      <p className="text-sm text-gray-600">
                        The government has announced a new initiative to
                        increase affordable housing supply in major cities.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="font-medium">
                        Vonovia Reports Strong Q2 Results
                      </p>
                      <p className="text-sm text-gray-600">
                        Vonovia has reported better than expected Q2 results,
                        with rental income up 3.5%.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Forecast</h3>
                  <p className="text-gray-700">
                    Based on current trends and economic indicators, we forecast
                    a continued moderate growth in the real estate market over
                    the next month, with an estimated 2.5-3.0% appreciation in
                    property values. Rental yields are expected to remain
                    stable, with a slight increase in premium locations.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <Button onClick={() => setShowDailySummary(false)}>
                Close Summary
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateAIChat;
