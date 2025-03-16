import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Check,
  Sparkles,
  Zap,
  Brain,
  TrendingUp,
  Building,
  Coins,
  Lock,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface AgentCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  features: string[];
  category: "stocks" | "real-estate" | "crypto" | "general";
  isPopular?: boolean;
  isOwned?: boolean;
}

const Agents = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const agentCards: AgentCard[] = [
    {
      id: "1",
      name: "TrendSpotter Pro",
      description:
        "Advanced pattern recognition for early trend detection across all markets",
      icon: <Brain className="h-5 w-5 text-indigo-600" />,
      price: 29.99,
      features: [
        "Early trend detection",
        "Pattern recognition",
        "Real-time alerts",
        "Historical performance analysis",
      ],
      category: "general",
      isPopular: true,
      isOwned: true,
    },
    {
      id: "2",
      name: "StockSage AI",
      description:
        "Specialized in stock market analysis with sector-specific insights",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      price: 19.99,
      features: [
        "Sector rotation analysis",
        "Earnings prediction",
        "Insider trading alerts",
        "Technical indicator analysis",
      ],
      category: "stocks",
    },
    {
      id: "3",
      name: "RealEstate Oracle",
      description:
        "Property market analysis with regional trends and investment opportunities",
      icon: <Building className="h-5 w-5 text-green-600" />,
      price: 24.99,
      features: [
        "Regional market analysis",
        "Rental yield forecasting",
        "Property value prediction",
        "Market cycle identification",
      ],
      category: "real-estate",
    },
    {
      id: "4",
      name: "CryptoSentinel",
      description:
        "Cryptocurrency market monitoring with blockchain analytics integration",
      icon: <Coins className="h-5 w-5 text-purple-600" />,
      price: 34.99,
      features: [
        "On-chain analytics",
        "DeFi protocol monitoring",
        "Whale transaction alerts",
        "Regulatory impact assessment",
      ],
      category: "crypto",
      isPopular: true,
    },
    {
      id: "5",
      name: "MarketMind Elite",
      description:
        "Our most advanced AI agent with cross-market correlation analysis",
      icon: <Sparkles className="h-5 w-5 text-amber-600" />,
      price: 49.99,
      features: [
        "Cross-market correlation",
        "Macro economic impact analysis",
        "Custom strategy development",
        "Priority AI processing",
        "Exclusive research reports",
      ],
      category: "general",
    },
    {
      id: "6",
      name: "Sentiment Analyzer",
      description:
        "Social media and news sentiment analysis for market prediction",
      icon: <Zap className="h-5 w-5 text-orange-600" />,
      price: 14.99,
      features: [
        "Social media monitoring",
        "News sentiment scoring",
        "Trending topics analysis",
        "Sentiment change alerts",
      ],
      category: "general",
      isOwned: true,
    },
  ];

  const filteredAgents =
    activeCategory === "all"
      ? agentCards
      : agentCards.filter((agent) => agent.category === activeCategory);

  const handlePurchase = (agent: AgentCard) => {
    toast({
      title: `${agent.name} purchased!`,
      description: "Your new AI agent is now available in your dashboard.",
      duration: 5000,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Agents" />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Bot className="h-8 w-8 mr-3 text-indigo-600" />
                  AI Agents Marketplace
                </h1>
                <p className="text-gray-600 mt-2">
                  Enhance your market intelligence with specialized AI agents
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2 overflow-x-auto pb-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                  className="rounded-full"
                >
                  All Agents
                </Button>
                <Button
                  variant={activeCategory === "general" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("general")}
                  className="rounded-full"
                >
                  <Brain className="h-4 w-4 mr-1" />
                  General
                </Button>
                <Button
                  variant={activeCategory === "stocks" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("stocks")}
                  className="rounded-full"
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Stocks
                </Button>
                <Button
                  variant={
                    activeCategory === "real-estate" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory("real-estate")}
                  className="rounded-full"
                >
                  <Building className="h-4 w-4 mr-1" />
                  Real Estate
                </Button>
                <Button
                  variant={activeCategory === "crypto" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("crypto")}
                  className="rounded-full"
                >
                  <Coins className="h-4 w-4 mr-1" />
                  Crypto
                </Button>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredAgents.map((agent) => (
                <motion.div key={agent.id} variants={item}>
                  <Card
                    className={cn(
                      "h-full flex flex-col transition-all duration-200 hover:shadow-md",
                      agent.isPopular
                        ? "border-indigo-200 shadow-md"
                        : "border-gray-200",
                      agent.isOwned
                        ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                        : "bg-white",
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          {agent.icon}
                        </div>
                        <div className="flex space-x-2">
                          {agent.isPopular && (
                            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {agent.isOwned && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              <Check className="h-3 w-3 mr-1" />
                              Owned
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="mt-4 text-xl">
                        {agent.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {agent.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {agent.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4 flex justify-between items-center">
                      <div className="text-lg font-bold text-gray-900">
                        ${agent.price}
                        <span className="text-sm font-normal text-gray-500">
                          /mo
                        </span>
                      </div>
                      {agent.isOwned ? (
                        <Button variant="outline" className="rounded-full">
                          <Lock className="h-4 w-4 mr-2" />
                          Activated
                        </Button>
                      ) : (
                        <Button
                          className="rounded-full bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => handlePurchase(agent)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Purchase
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2 flex items-center">
                    <Sparkles className="h-6 w-6 mr-2" />
                    Custom AI Agent Development
                  </h2>
                  <p className="text-indigo-100 max-w-xl">
                    Need a specialized AI agent for your specific investment
                    strategy? Our team can develop custom AI agents tailored to
                    your unique requirements.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full px-6"
                  onClick={() => {
                    toast({
                      title: "Request Submitted",
                      description:
                        "Our team will contact you shortly to discuss your custom AI agent requirements.",
                      duration: 5000,
                    });
                  }}
                >
                  Request Custom Agent
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Agents;
