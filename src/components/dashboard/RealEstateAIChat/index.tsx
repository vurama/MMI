import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  Send,
  User,
  Bot,
  Sparkles,
  Zap,
  Maximize2,
  Minimize2,
} from "lucide-react";
import NotificationsCenter from "@/components/real-estate/NotificationsCenter";

interface RealEstateAIChatProps {
  className?: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const RealEstateAIChat: React.FC<RealEstateAIChatProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your real estate market assistant. How can I help you analyze the market today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple AI response generator based on keywords
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("market") && input.includes("trend")) {
      return "Based on current data, the real estate market is showing a 3.2% increase in property values across major metropolitan areas. Suburban areas are experiencing particularly strong growth due to continued remote work trends.";
    } else if (input.includes("interest rate") || input.includes("mortgage")) {
      return "Current mortgage rates are averaging 6.8% for a 30-year fixed rate. This is slightly higher than last quarter, which has begun to impact buyer demand in some markets. However, limited inventory is still keeping prices stable in most regions.";
    } else if (input.includes("invest") || input.includes("buy")) {
      return "For investment opportunities, multi-family properties in emerging tech hubs are showing strong rental yields. Areas with new infrastructure projects announced are also worth monitoring for potential appreciation. Would you like a more specific analysis for a particular region?";
    } else if (input.includes("sell") || input.includes("selling")) {
      return "The current seller's market continues in most regions due to inventory constraints. Properties that are well-staged and priced appropriately are selling within an average of 24 days. Luxury properties are taking longer at 45-60 days on market.";
    } else if (input.includes("forecast") || input.includes("prediction")) {
      return "Our AI models predict a moderate 4-5% appreciation in property values over the next 12 months, with regional variations. The rental market is expected to see 3% growth in rates. These projections assume no major changes to current interest rate policies.";
    } else {
      return "I'd be happy to provide insights on that aspect of the real estate market. Could you provide more specific details about what you're looking to understand? I can analyze trends, pricing, regional variations, or investment opportunities.";
    }
  };

  return (
    <div>
      {/* Notifications at the top */}
      {typeof NotificationsCenter === "function" && (
        <div className="mb-4">
          <NotificationsCenter position="top" />
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-medium py-2 px-4 rounded-md transition-colors shadow-md border border-amber-300">
          <span className="flex items-center justify-center bg-amber-300 rounded-full p-1 mr-1">
            <Zap className="h-3.5 w-3.5 text-amber-700" />
          </span>
          Daily Summary Report
        </button>
      </div>
      <Card
        className={`bg-white shadow-md border border-gray-100 ${className} ${isExpanded ? "h-[600px]" : "h-[400px]"}`}
      >
        <CardHeader className="pb-2 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold flex items-center">
              <Brain className="h-5 w-5 text-indigo-600 mr-2" />
              Real Estate Market AI Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4 text-gray-500" />
              ) : (
                <Maximize2 className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.type === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"}`}
                    >
                      <div className="flex items-center mb-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${message.type === "user" ? "bg-indigo-500" : "bg-white border border-gray-200"}`}
                        >
                          {message.type === "user" ? (
                            <User className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <Bot className="h-3.5 w-3.5 text-indigo-600" />
                          )}
                        </div>
                        <span className="text-xs font-medium">
                          {message.type === "user" ? "You" : "AI Assistant"}
                        </span>
                        {message.type === "ai" && (
                          <Sparkles className="h-3 w-3 text-yellow-500 ml-1" />
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <div className="text-right">
                        <span
                          className={`text-xs ${message.type === "user" ? "text-indigo-200" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about market trends, investment opportunities..."
                  className="flex-1 mr-2"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>
                  Try asking about: market trends, interest rates, investment
                  opportunities...
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealEstateAIChat;
