import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "../../../supabase/auth";
import {
  Brain,
  MessageSquare,
  Send,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Building,
  Coins,
  Clock,
  ChevronRight,
  Sparkles,
  BarChart2,
  Lightbulb,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  User,
  Settings,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Newspaper,
  Plus,
  Edit,
  Trash2,
  LineChart,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "advisor";
  timestamp: Date;
  attachments?: {
    type: "chart" | "recommendation" | "alert";
    data: any;
  }[];
}

interface AdvisorProfile {
  id: string;
  name: string;
  specialty: string;
  description: string;
  avatar: string;
  experience: number;
  rating: number;
}

const PersonalAdvisor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("posts");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("1");
  const [investmentFocus, setInvestmentFocus] = useState<string[]>([
    "stocks",
    "crypto",
  ]);
  const [riskTolerance, setRiskTolerance] = useState<number>(65);
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // For demo purposes

  // Sample advisors
  const advisors: AdvisorProfile[] = [
    {
      id: "1",
      name: "MarketMind AI",
      specialty: "General Market Analysis",
      description:
        "Advanced AI advisor with expertise across all market sectors. Provides balanced insights and recommendations based on your preferences.",
      avatar: "/ai-advisor.png",
      experience: 5,
      rating: 4.8,
    },
    {
      id: "2",
      name: "StockSage",
      specialty: "Stock Market Specialist",
      description:
        "Specialized in equity markets with deep knowledge of technical analysis, fundamental valuation, and sector rotation strategies.",
      avatar: "/stock-advisor.png",
      experience: 7,
      rating: 4.6,
    },
    {
      id: "3",
      name: "CryptoOracle",
      specialty: "Cryptocurrency Expert",
      description:
        "Focused on digital assets, blockchain technology, and DeFi markets. Provides insights on emerging trends and regulatory impacts.",
      avatar: "/crypto-advisor.png",
      experience: 4,
      rating: 4.5,
    },
    {
      id: "4",
      name: "PropertyPro",
      specialty: "Real Estate Advisor",
      description:
        "Specialized in real estate markets with expertise in property valuation, REITs, and housing market trends across different regions.",
      avatar: "/realestate-advisor.png",
      experience: 8,
      rating: 4.7,
    },
  ];

  // Sample conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your personal MarketMind AI advisor. How can I help with your investment strategy today?",
      sender: "advisor",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      content: "I'm interested in tech stocks. What's your current outlook?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "3",
      content:
        "Based on my analysis, the tech sector is showing strong momentum, particularly in semiconductor and cloud services. Here's my current assessment:",
      sender: "advisor",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      attachments: [
        {
          type: "chart",
          data: {
            title: "Tech Sector Performance",
            trend: "positive",
            percentage: "+3.2%",
            confidence: 92,
          },
        },
        {
          type: "recommendation",
          data: {
            title: "Consider increasing exposure to semiconductor stocks",
            reasoning:
              "Strong demand for AI chips and ongoing supply constraints are driving higher margins for leading semiconductor manufacturers.",
            riskLevel: "moderate",
          },
        },
      ],
    },
    {
      id: "4",
      content:
        "That's helpful. Any specific companies you'd recommend watching?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
    {
      id: "5",
      content:
        "Based on your moderate-high risk tolerance and investment focus, here are three companies worth watching in the semiconductor space:",
      sender: "advisor",
      timestamp: new Date(Date.now() - 1000 * 60),
      attachments: [
        {
          type: "recommendation",
          data: {
            title: "Top Semiconductor Picks",
            items: [
              "NVDA - Strong AI chip demand and market leadership",
              "AMD - Gaining market share in data center processors",
              "ASML - Critical supplier for advanced chip manufacturing",
            ],
          },
        },
      ],
    },
  ]);

  // Sample recommendations
  const recommendations = [
    {
      id: "1",
      title: "Increase Tech Allocation",
      description:
        "Consider increasing your portfolio allocation to technology stocks, particularly in AI and semiconductor sectors.",
      confidence: 92,
      impact: "high",
      timeframe: "3-6 months",
    },
    {
      id: "2",
      title: "Reduce Exposure to Commercial Real Estate",
      description:
        "Current trends suggest reducing exposure to commercial real estate REITs due to ongoing work-from-home trends.",
      confidence: 87,
      impact: "medium",
      timeframe: "6-12 months",
    },
    {
      id: "3",
      title: "Consider Bitcoin Position",
      description:
        "Bitcoin's recent price action and institutional adoption suggest a small position could be beneficial for diversification.",
      confidence: 78,
      impact: "medium",
      timeframe: "1-3 months",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const newAdvisorMessage: Message = {
        id: `advisor-${Date.now()}`,
        content:
          "I've analyzed your question about " +
          message.substring(0, 30) +
          "... Based on current market data and your investment profile, here's my assessment:",
        sender: "advisor",
        timestamp: new Date(),
        attachments: [
          {
            type: "recommendation",
            data: {
              title: "Personalized Insight",
              reasoning:
                "This recommendation is based on your risk tolerance and investment focus areas.",
              riskLevel: "aligned with your profile",
            },
          },
        ],
      };

      setMessages((prev) => [...prev, newAdvisorMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleAdvisorChange = (advisorId: string) => {
    setSelectedAdvisor(advisorId);
    toast({
      title: "Advisor Changed",
      description: `You are now working with ${advisors.find((a) => a.id === advisorId)?.name}`,
      duration: 3000,
    });
  };

  const toggleInvestmentFocus = (focus: string) => {
    setInvestmentFocus((prev) =>
      prev.includes(focus) ? prev.filter((f) => f !== focus) : [...prev, focus],
    );
  };

  const currentAdvisor =
    advisors.find((a) => a.id === selectedAdvisor) || advisors[0];

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Personal Advisor" />
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto px-4 md:px-6 py-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div className="flex items-center">
                <Brain className="h-7 w-7 text-purple-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Personal Advisor
                </h1>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Personalized
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </div>

            <Tabs
              defaultValue="chat"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="posts" className="flex items-center">
                    <Newspaper className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Posts</span>
                  </TabsTrigger>
                  <TabsTrigger value="advice" className="flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Advice</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="posts"
                className="flex-1 overflow-hidden flex flex-col mt-4"
              >
                <Card className="flex-1 flex flex-col overflow-hidden">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={
                              currentAdvisor.avatar ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentAdvisor.name}`
                            }
                          />
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            {currentAdvisor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            {currentAdvisor.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {currentAdvisor.specialty}
                          </CardDescription>
                        </div>
                      </div>
                      {isAdmin && (
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4 mr-2" />
                          New Post
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full px-4 py-2">
                      <div className="space-y-6 pb-4">
                        {/* Sample advisor posts */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentAdvisor.name}`}
                              />
                              <AvatarFallback className="bg-purple-100 text-purple-800">
                                {currentAdvisor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">
                                {currentAdvisor.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                July 23, 2024 • 10:30 AM
                              </div>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold mb-2">
                            Tech Sector Analysis: AI Stocks Momentum
                          </h3>

                          <p className="text-gray-700 mb-4">
                            Our analysis shows continued strong momentum in
                            AI-related technology stocks. The semiconductor
                            sector is particularly strong with increased demand
                            for AI chips driving higher margins for leading
                            manufacturers.
                          </p>

                          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">
                                Tech Sector Performance
                              </span>
                              <div className="flex items-center text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>+3.2%</span>
                              </div>
                            </div>
                            <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center">
                              <BarChart2 className="h-16 w-16 text-gray-300" />
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">24</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span className="text-xs">12 comments</span>
                              </Button>
                            </div>
                            {isAdmin && (
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentAdvisor.name}`}
                              />
                              <AvatarFallback className="bg-purple-100 text-purple-800">
                                {currentAdvisor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">
                                {currentAdvisor.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                July 22, 2024 • 2:15 PM
                              </div>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold mb-2">
                            Housing Market Update: Signs of Cooling
                          </h3>

                          <p className="text-gray-700 mb-4">
                            Our latest analysis shows cooling trends in major
                            metropolitan housing markets with decreasing demand
                            and increasing inventory levels. This could present
                            opportunities for buyers who have been waiting for
                            better conditions.
                          </p>

                          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">
                                Housing Market Trend
                              </span>
                              <div className="flex items-center text-red-600">
                                <TrendingDown className="h-4 w-4 mr-1" />
                                <span>-1.8%</span>
                              </div>
                            </div>
                            <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center">
                              <LineChart className="h-16 w-16 text-gray-300" />
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span className="text-xs">18</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span className="text-xs">8 comments</span>
                              </Button>
                            </div>
                            {isAdmin && (
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <div className="p-4 border-t border-gray-100">
                    <form className="flex items-center space-x-2">
                      <Input
                        placeholder="Add a comment..."
                        className="flex-grow"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="advice" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Advisor Recommendations
                    </CardTitle>
                    <CardDescription>
                      Expert recommendations based on current market conditions
                    </CardDescription>
                    {isAdmin && (
                      <Button className="mt-2 bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Recommendation
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec) => (
                        <motion.div
                          key={rec.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 border rounded-lg bg-white hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900">
                              {rec.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={
                                rec.confidence >= 90
                                  ? "bg-green-50 text-green-700"
                                  : rec.confidence >= 80
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-blue-50 text-blue-700"
                              }
                            >
                              {rec.confidence >= 90 ? (
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                              ) : rec.confidence >= 80 ? (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              ) : (
                                <Zap className="h-3 w-3 mr-1" />
                              )}
                              {rec.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {rec.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {rec.timeframe}
                              </span>
                              <span className="flex items-center">
                                <Target className="h-3 w-3 mr-1" />
                                {rec.impact} impact
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-green-50 hover:text-green-600"
                              >
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-red-50 hover:text-red-600"
                              >
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Bookmark className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-purple-50 hover:text-purple-600"
                              >
                                <Share2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Advisor Selection</CardTitle>
                    <CardDescription>
                      Choose which AI advisor best fits your investment style
                      and goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {advisors.map((advisor) => (
                        <div
                          key={advisor.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedAdvisor === advisor.id ? "border-purple-300 bg-purple-50 shadow-sm" : "bg-white hover:border-gray-300"}`}
                          onClick={() => handleAdvisorChange(advisor.id)}
                        >
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={
                                  advisor.avatar ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${advisor.name}`
                                }
                              />
                              <AvatarFallback className="bg-purple-100 text-purple-800">
                                {advisor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-900">
                                  {advisor.name}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {advisor.experience}+ years
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-purple-600 mb-1">
                                {advisor.specialty}
                              </p>
                              <p className="text-xs text-gray-500">
                                {advisor.description}
                              </p>
                              <div className="flex items-center mt-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Sparkles
                                      key={i}
                                      className={`h-3 w-3 ${i < Math.floor(advisor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-1">
                                  {advisor.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Preferences</CardTitle>
                    <CardDescription>
                      Customize your investment focus and risk tolerance to
                      receive more relevant advice
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Investment Focus
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={
                              investmentFocus.includes("stocks")
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="rounded-full"
                            onClick={() => toggleInvestmentFocus("stocks")}
                          >
                            <Briefcase className="h-4 w-4 mr-1" />
                            Stocks
                          </Button>
                          <Button
                            variant={
                              investmentFocus.includes("crypto")
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="rounded-full"
                            onClick={() => toggleInvestmentFocus("crypto")}
                          >
                            <Coins className="h-4 w-4 mr-1" />
                            Crypto
                          </Button>
                          <Button
                            variant={
                              investmentFocus.includes("real-estate")
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="rounded-full"
                            onClick={() => toggleInvestmentFocus("real-estate")}
                          >
                            <Building className="h-4 w-4 mr-1" />
                            Real Estate
                          </Button>
                          <Button
                            variant={
                              investmentFocus.includes("etfs")
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="rounded-full"
                            onClick={() => toggleInvestmentFocus("etfs")}
                          >
                            <BarChart2 className="h-4 w-4 mr-1" />
                            ETFs
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <h3 className="text-sm font-medium">
                            Risk Tolerance
                          </h3>
                          <span className="text-sm text-gray-500">
                            {riskTolerance < 30
                              ? "Conservative"
                              : riskTolerance < 70
                                ? "Moderate"
                                : "Aggressive"}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <Progress value={riskTolerance} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Conservative</span>
                            <span>Moderate</span>
                            <span>Aggressive</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={riskTolerance}
                            onChange={(e) =>
                              setRiskTolerance(parseInt(e.target.value))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalAdvisor;
