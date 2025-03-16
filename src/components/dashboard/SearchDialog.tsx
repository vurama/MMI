import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  Brain,
  Sparkles,
  X,
  Loader2,
  MessageSquare,
  ArrowRight,
  Briefcase,
  Building,
  Coins,
  DollarSign,
  BarChart2,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
  marketData?: any;
  sentimentData?: any;
}

const SearchDialog = ({
  open,
  onOpenChange,
  initialQuery = "",
  marketData,
  sentimentData,
}: SearchDialogProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMarket, setActiveMarket] = useState<string>("stocks");
  const [suggestions, setSuggestions] = useState<string[]>([
    "What's the current market sentiment?",
    "Show me trending stocks in the tech sector",
    "Analyze recent crypto market volatility",
    "What are the key market insights today?",
    "How is the real estate market performing?",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set initial query when provided
  useEffect(() => {
    if (initialQuery && open) {
      setQuery(initialQuery);
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, open]);

  const handleSendMessage = async (messageText: string = query) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      // In a real implementation, this would call your OpenAI API
      // For now, we'll simulate a response
      const contextData = {
        marketData,
        sentimentData,
        activeMarket,
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate response based on context data and selected market
      let responseText = generateMockResponse(messageText, contextData);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an error processing your request. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
  };

  // Mock response generator based on query, context, and selected market
  const generateMockResponse = (query: string, contextData: any): string => {
    const lowerQuery = query.toLowerCase();
    const market = contextData.activeMarket || "stocks";

    // Add market-specific prefix to response
    const marketPrefix = `[${market.toUpperCase()} MARKET] `;

    // Market sentiment related queries
    if (
      lowerQuery.includes("sentiment") ||
      lowerQuery.includes("market mood")
    ) {
      const sentimentScore = contextData.sentimentData?.overallScore || 65;
      const sentimentCategory = getSentimentCategory(sentimentScore);

      if (market === "stocks") {
        return `${marketPrefix}The current stock market sentiment score is ${sentimentScore}, which indicates a ${sentimentCategory} outlook. This is based on our AI analysis of recent market movements, news sentiment, and trading volumes across multiple sectors. Major indices are showing positive momentum with technology and healthcare leading the gains.`;
      } else if (market === "crypto") {
        return `${marketPrefix}The current cryptocurrency market sentiment score is ${sentimentScore}, which indicates a ${sentimentCategory} outlook. Bitcoin dominance is at 48%, with altcoins showing mixed performance. Institutional interest remains strong despite regulatory uncertainties.`;
      } else if (market === "forex") {
        return `${marketPrefix}The current forex market sentiment score is ${sentimentScore}, which indicates a ${sentimentCategory} outlook. USD strength is moderating against major currencies, with EUR/USD showing technical resistance at key levels.`;
      } else if (market === "commodities") {
        return `${marketPrefix}The current commodities market sentiment score is ${sentimentScore}, which indicates a ${sentimentCategory} outlook. Energy prices are stabilizing while precious metals show defensive positioning amid inflation concerns.`;
      } else if (market === "realestate") {
        return `${marketPrefix}The current real estate market sentiment score is ${sentimentScore}, which indicates a ${sentimentCategory} outlook. Residential markets are cooling in major metros while industrial and data center properties continue to perform well.`;
      } else {
        return `${marketPrefix}The current market sentiment score is ${sentimentScore}, which indicates a ${sentimentCategory} outlook. This is based on our AI analysis of recent market movements, news sentiment, and trading volumes.`;
      }
    }

    // Trending stocks queries
    if (lowerQuery.includes("trending") && market === "stocks") {
      return `${marketPrefix}Based on our analysis, the top trending stocks today are NVDA (+4.2%), TSLA (+3.8%), and AAPL (+1.7%). The tech sector is showing particularly strong momentum with semiconductor stocks leading the gains.`;
    }

    // Crypto market queries
    if (market === "crypto") {
      return `${marketPrefix}The cryptocurrency market is currently experiencing moderate volatility. Bitcoin is up 2.3% in the last 24 hours, while Ethereum has gained 1.8%. Our AI analysis indicates increased institutional interest, but regulatory concerns remain a factor to watch.`;
    }

    // Real estate market queries
    if (market === "realestate") {
      return `${marketPrefix}The real estate market is showing signs of cooling in major metropolitan areas. Our analysis indicates decreasing demand and increasing inventory levels. Commercial real estate, particularly office space, continues to face challenges while industrial and logistics properties are performing well.`;
    }

    // Forex market queries
    if (market === "forex") {
      return `${marketPrefix}In the forex market, USD/JPY is showing technical resistance at 153.50 with potential for pullback. EUR/USD has found support at 1.0820 with improving Eurozone economic data. GBP/USD remains range-bound ahead of key central bank decisions.`;
    }

    // Commodities market queries
    if (market === "commodities") {
      return `${marketPrefix}In the commodities space, crude oil is consolidating after recent volatility due to Middle East tensions. Gold continues its upward trend as a hedge against inflation, while agricultural commodities face pressure from improved harvest forecasts.`;
    }

    // Market insights queries
    if (lowerQuery.includes("insight") || lowerQuery.includes("analysis")) {
      if (market === "stocks") {
        return `${marketPrefix}Today's key stock market insights include: 1) Tech sector showing strong momentum led by semiconductor stocks, 2) Federal Reserve signals potential rate adjustments in response to inflation data, 3) Energy sector underperforming due to supply concerns, and 4) Healthcare stocks outperforming on positive clinical trial data.`;
      } else if (market === "crypto") {
        return `${marketPrefix}Today's key crypto market insights include: 1) Bitcoin testing resistance at $65,000, 2) Ethereum gas fees decreasing after recent network upgrade, 3) DeFi protocols seeing increased TVL, and 4) Regulatory clarity improving in key markets.`;
      } else {
        return `${marketPrefix}Today's key market insights include: 1) Strong performance in key sectors, 2) Macroeconomic indicators showing mixed signals, 3) Volatility measures indicating potential near-term fluctuations, and 4) Institutional positioning becoming more defensive.`;
      }
    }

    // Default response for other queries
    return (
      `${marketPrefix}I've analyzed your question about ` +
      query +
      `. Based on current ${market} market data and trends, I can provide you with insights tailored to your specific interests. Would you like me to focus on a particular aspect of the ${market} market?`
    );
  };

  // Helper function to categorize sentiment scores
  const getSentimentCategory = (score: number): string => {
    if (score >= 70) return "bullish";
    if (score >= 55) return "moderately bullish";
    if (score >= 45) return "neutral";
    if (score >= 30) return "moderately bearish";
    return "bearish";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] p-0 gap-0 overflow-hidden border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <DialogHeader className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-lg">
              <Brain className="h-5 w-5 mr-2 text-indigo-600" />
              MarketMind AI Assistant
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Market Category Tabs */}
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex space-x-2">
            {[
              {
                id: "stocks",
                name: "Stocks",
                icon: <Briefcase className="h-4 w-4 mr-1" />,
              },
              {
                id: "crypto",
                name: "Crypto",
                icon: <Coins className="h-4 w-4 mr-1" />,
              },
              {
                id: "forex",
                name: "Forex",
                icon: <DollarSign className="h-4 w-4 mr-1" />,
              },
              {
                id: "commodities",
                name: "Commodities",
                icon: <BarChart2 className="h-4 w-4 mr-1" />,
              },
              {
                id: "realestate",
                name: "Real Estate",
                icon: <Building className="h-4 w-4 mr-1" />,
              },
              {
                id: "custom",
                name: "Custom",
                icon: <Search className="h-4 w-4 mr-1" />,
              },
            ].map((market) => (
              <Button
                key={market.id}
                variant={activeMarket === market.id ? "default" : "outline"}
                size="sm"
                className={`flex items-center ${activeMarket === market.id ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""}`}
                onClick={() => setActiveMarket(market.id)}
              >
                {market.icon}
                {market.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-[60vh]">
          <ScrollArea className="flex-1 p-4">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col items-center justify-center text-center p-4"
                >
                  <div className="bg-indigo-100 p-4 rounded-full mb-4 dark:bg-indigo-900/30">
                    <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-gray-100">
                    MarketMind AI Assistant
                  </h3>
                  <p className="text-gray-500 max-w-md mb-6 dark:text-gray-400">
                    Ask me anything about market trends, investment insights, or
                    specific assets. I can analyze data across stocks, real
                    estate, and crypto markets.
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-md">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-2 px-3 text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 dark:hover:border-indigo-800"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <ArrowRight className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                          {suggestion}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4 pb-2">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${message.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 border border-gray-200"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center mb-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src="/ai-avatar.png" />
                              <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                <Brain className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-gray-700">
                              MarketMind AI
                            </span>
                            <Badge className="ml-2 bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0 h-4">
                              <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                              AI
                            </Badge>
                          </div>
                        )}
                        <p
                          className={`text-sm ${message.role === "user" ? "text-white" : "text-gray-800"}`}
                        >
                          {message.content}
                        </p>
                        <div
                          className={`text-right mt-1 text-xs ${message.role === "user" ? "text-indigo-200" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-2xl p-4 bg-gray-100 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src="/ai-avatar.png" />
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                              <Brain className="h-3 w-3" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-gray-700">
                            MarketMind AI
                          </span>
                          <Badge className="ml-2 bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0 h-4">
                            <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                            AI
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
                          <span className="text-sm text-gray-600">
                            Analyzing market data...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about market trends, insights, or specific assets..."
                className="flex-1 border-gray-200 focus-visible:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!query.trim() || isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-10 w-10 p-0 flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {messages.length > 0 && (
              <div className="flex justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500 h-auto py-1"
                  onClick={clearChat}
                >
                  Clear conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
