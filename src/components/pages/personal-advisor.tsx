import React, { useState, useEffect } from "react";
import {
  AdvisorService,
  AdminUpdate,
  AIAnalysis,
} from "@/services/AdvisorService";
import { Briefcase, Building, Coins, DollarSign } from "lucide-react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import QuickAccessToolbar from "../dashboard/QuickAccessToolbar";
import NewsSplash from "../advisor/NewsSplash";
import {
  Brain,
  MessageSquare,
  Send,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Clock,
  BarChart2,
  LineChart,
  PieChart,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Share2,
  Bookmark,
  MoreHorizontal,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

// Using types from AdvisorService

const PersonalAdvisor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"updates" | "analysis">("updates");
  const [comment, setComment] = useState("");
  const [expandedUpdateId, setExpandedUpdateId] = useState<string | null>(null);
  const [expandedAnalysisId, setExpandedAnalysisId] = useState<string | null>(
    null,
  );
  const [userReaction, setUserReaction] = useState<{
    updateId: string;
    reaction: "thumbsUp" | "thumbsDown" | "heart" | null;
  } | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [adminUpdates, setAdminUpdates] = useState<AdminUpdate[]>([
    {
      id: "update-1",
      title: "Q2 Market Performance Overview",
      content:
        "The second quarter showed significant growth across technology sectors, with AI-related stocks outperforming the broader market by 15%. Key indicators suggest continued momentum into Q3, though with increased volatility expected due to upcoming Fed decisions.",
      timestamp: new Date(2023, 6, 15, 10, 30),
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      reactions: {
        thumbsUp: 24,
        thumbsDown: 3,
        heart: 12,
      },
      comments: [
        {
          id: "comment-1",
          author: {
            name: "Michael Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          },
          content:
            "Great insights on the tech sector. Do you anticipate any specific subsectors to lead in Q3?",
          timestamp: new Date(2023, 6, 15, 11, 45),
        },
        {
          id: "comment-2",
          author: {
            name: "Lisa Rodriguez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
          },
          content:
            "The volatility prediction aligns with what I'm seeing in options pricing. Good call.",
          timestamp: new Date(2023, 6, 15, 14, 20),
        },
      ],
      hasChart: true,
      chartType: "line",
      resolution:
        "Based on Q2 performance, we recommend increasing allocation to semiconductor and cloud computing stocks while maintaining a defensive position in consumer staples as a hedge against potential volatility.",
    },
    {
      id: "update-2",
      title: "Real Estate Market Cooling Trends",
      content:
        "Our analysis indicates a significant cooling in residential real estate markets across major metropolitan areas. Housing inventory has increased 12% month-over-month, while days-on-market metrics have extended by an average of 15 days compared to the previous quarter.",
      timestamp: new Date(2023, 6, 12, 14, 15),
      author: {
        name: "David Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      reactions: {
        thumbsUp: 18,
        thumbsDown: 5,
        heart: 7,
      },
      comments: [
        {
          id: "comment-3",
          author: {
            name: "Jennifer Taylor",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
          },
          content:
            "I'm seeing similar trends in the midwest markets. Buyer sentiment has definitely shifted.",
          timestamp: new Date(2023, 6, 12, 16, 30),
        },
      ],
      hasChart: true,
      chartType: "bar",
      resolution:
        "We recommend caution with residential real estate investments in the short term. For those with existing holdings, consider diversifying into industrial and logistics properties which continue to show strength.",
    },
    {
      id: "update-3",
      title: "Cryptocurrency Regulatory Developments",
      content:
        "Recent regulatory announcements from the SEC and international bodies suggest a more structured framework for cryptocurrency markets is emerging. These developments are likely to increase institutional participation while potentially limiting certain DeFi applications.",
      timestamp: new Date(2023, 6, 10, 9, 45),
      author: {
        name: "Alex Thompson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      reactions: {
        thumbsUp: 32,
        thumbsDown: 8,
        heart: 15,
      },
      comments: [
        {
          id: "comment-4",
          author: {
            name: "Ryan Peters",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
          },
          content:
            "The regulatory clarity should be positive for Bitcoin and established altcoins in the long run.",
          timestamp: new Date(2023, 6, 10, 11, 20),
        },
        {
          id: "comment-5",
          author: {
            name: "Sophia Kim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
          },
          content:
            "Concerned about the impact on innovation in the DeFi space. Regulations need to be balanced.",
          timestamp: new Date(2023, 6, 10, 13, 15),
        },
        {
          id: "comment-6",
          author: {
            name: "James Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
          },
          content:
            "Has anyone analyzed how these regulations might affect stablecoin projects specifically?",
          timestamp: new Date(2023, 6, 11, 9, 30),
        },
      ],
      hasChart: false,
      resolution:
        "We suggest maintaining Bitcoin and Ethereum positions while being selective with altcoin exposure. Focus on projects with strong compliance frameworks and established use cases.",
    },
  ]);

  // Import AI analyses from context or service
  const [aiAnalyses, setAiAnalyses] = useState<AIAnalysis[]>([
    {
      id: "analysis-1",
      updateId: "update-1",
      title: "Tech Sector Growth Analysis",
      summary:
        "AI has detected strong positive momentum in the technology sector with particular strength in semiconductor and cloud services companies. This aligns with the admin update on Q2 performance.",
      insights: [
        "Semiconductor demand is being driven primarily by AI chip requirements, with a 32% increase in orders from data center operators.",
        "Cloud service providers are showing improved margins due to operational efficiencies and increased enterprise adoption.",
        "Consumer technology spending remains resilient despite inflation concerns, suggesting strong brand loyalty.",
      ],
      confidence: 92,
      timestamp: new Date(2023, 6, 15, 10, 35),
      trends: {
        direction: "up",
        percentage: 15.3,
      },
    },
    {
      id: "analysis-2",
      updateId: "update-2",
      title: "Real Estate Market Transition",
      summary:
        "AI analysis confirms cooling trends in residential real estate with additional insights on regional variations and potential investment opportunities in the changing market.",
      insights: [
        "The cooling trend is most pronounced in previously hot markets like Austin, Phoenix, and Boise with price reductions becoming more common.",
        "Rental markets remain strong, suggesting a shift from buying to renting among consumers.",
        "Commercial real estate, particularly office space, continues to face challenges with remote work trends persisting.",
        "Industrial and logistics properties show resilience due to e-commerce growth and supply chain restructuring.",
      ],
      confidence: 88,
      timestamp: new Date(2023, 6, 12, 14, 20),
      trends: {
        direction: "down",
        percentage: 8.7,
      },
    },
    {
      id: "analysis-3",
      updateId: "update-3",
      title: "Cryptocurrency Regulatory Impact Assessment",
      summary:
        "AI has analyzed the potential impacts of emerging cryptocurrency regulations on different digital assets and market segments.",
      insights: [
        "Bitcoin and Ethereum are likely to benefit from regulatory clarity, potentially attracting more institutional investment.",
        "DeFi protocols face varying levels of regulatory risk, with lending and exchange platforms most exposed.",
        "Stablecoins will likely face increased scrutiny and reserve requirements, potentially leading to consolidation in the space.",
        "Emerging markets show divergent regulatory approaches, creating potential arbitrage opportunities but also jurisdictional risks.",
      ],
      confidence: 84,
      timestamp: new Date(2023, 6, 10, 9, 50),
      trends: {
        direction: "neutral",
        percentage: 2.1,
      },
    },
  ]);

  // Load advisor data on component mount and set up real-time listeners
  useEffect(() => {
    const loadAdvisorData = async () => {
      try {
        const updates = await AdvisorService.getAllUpdates();
        setAdminUpdates(updates);

        const analyses = await AdvisorService.getAllAnalyses();
        setAiAnalyses(analyses);
      } catch (error) {
        console.error("Error loading advisor data:", error);
        toast({
          title: "Error",
          description: "Failed to load advisor data. Please try again later.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    // Set up event listeners for real-time updates
    const updateAddedUnsubscribe = AdvisorService.subscribe(
      AdvisorService.EVENTS.UPDATE_ADDED,
      ({ update, analysis }: { update: AdminUpdate; analysis: AIAnalysis }) => {
        setAdminUpdates((prev) => [update, ...prev]);
        setAiAnalyses((prev) => [analysis, ...prev]);
        toast({
          title: "New Update",
          description: `New market update: ${update.title}`,
          duration: 3000,
        });
      },
    );

    const updateModifiedUnsubscribe = AdvisorService.subscribe(
      AdvisorService.EVENTS.UPDATE_MODIFIED,
      ({
        update,
        analysis,
      }: {
        update: AdminUpdate;
        analysis?: AIAnalysis;
      }) => {
        setAdminUpdates((prev) =>
          prev.map((item) => (item.id === update.id ? update : item)),
        );

        if (analysis) {
          setAiAnalyses((prev) =>
            prev.map((item) => (item.id === analysis.id ? analysis : item)),
          );
        }
      },
    );

    const updateDeletedUnsubscribe = AdvisorService.subscribe(
      AdvisorService.EVENTS.UPDATE_DELETED,
      ({ id }: { id: string }) => {
        setAdminUpdates((prev) => prev.filter((item) => item.id !== id));
        setAiAnalyses((prev) => prev.filter((item) => item.updateId !== id));
      },
    );

    const commentAddedUnsubscribe = AdvisorService.subscribe(
      AdvisorService.EVENTS.COMMENT_ADDED,
      ({ updateId, comment }: { updateId: string; comment: any }) => {
        setAdminUpdates((prev) =>
          prev.map((update) => {
            if (update.id === updateId) {
              return {
                ...update,
                comments: [...update.comments, comment],
              };
            }
            return update;
          }),
        );
      },
    );

    const reactionUpdatedUnsubscribe = AdvisorService.subscribe(
      AdvisorService.EVENTS.REACTION_UPDATED,
      ({
        updateId,
        reactionType,
        newValue,
      }: {
        updateId: string;
        reactionType: "thumbsUp" | "thumbsDown" | "heart";
        newValue: number;
      }) => {
        setAdminUpdates((prev) =>
          prev.map((update) => {
            if (update.id === updateId) {
              return {
                ...update,
                reactions: {
                  ...update.reactions,
                  [reactionType]: newValue,
                },
              };
            }
            return update;
          }),
        );
      },
    );

    loadAdvisorData();

    // Cleanup function to unsubscribe from events
    return () => {
      updateAddedUnsubscribe();
      updateModifiedUnsubscribe();
      updateDeletedUnsubscribe();
      commentAddedUnsubscribe();
      reactionUpdatedUnsubscribe();
    };
  }, []);

  // Filter updates by category when category changes
  useEffect(() => {
    const filterUpdatesByCategory = async () => {
      try {
        if (selectedCategory) {
          const filteredUpdates =
            await AdvisorService.getUpdatesByCategory(selectedCategory);
          setAdminUpdates(filteredUpdates);
        } else {
          const allUpdates = await AdvisorService.getAllUpdates();
          setAdminUpdates(allUpdates);
        }
      } catch (error) {
        console.error("Error filtering updates:", error);
      }
    };

    filterUpdatesByCategory();
  }, [selectedCategory]);

  const handleCommentSubmit = async (updateId: string) => {
    if (!comment.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: {
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
      content: comment,
      timestamp: new Date(),
    };

    try {
      // Add comment via service
      await AdvisorService.addComment(updateId, newComment);

      // Update local state
      setAdminUpdates(
        adminUpdates.map((update) =>
          update.id === updateId
            ? { ...update, comments: [...update.comments, newComment] }
            : update,
        ),
      );

      setComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been added to the discussion.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleReaction = async (
    updateId: string,
    reaction: "thumbsUp" | "thumbsDown" | "heart",
  ) => {
    // Check if user already reacted with this reaction
    const alreadyReacted =
      userReaction?.updateId === updateId &&
      userReaction?.reaction === reaction;

    // Set the new reaction state
    setUserReaction(alreadyReacted ? null : { updateId, reaction });

    try {
      // Update reaction via service
      await AdvisorService.updateReactions(updateId, reaction, !alreadyReacted);

      // Update the reaction count in local state
      setAdminUpdates(
        adminUpdates.map((update) => {
          if (update.id === updateId) {
            const reactions = { ...update.reactions };

            // If already reacted with this reaction, decrement
            if (alreadyReacted) {
              reactions[reaction] -= 1;
            } else {
              // If reacted with a different reaction before, decrement that one
              if (
                userReaction?.updateId === updateId &&
                userReaction?.reaction
              ) {
                reactions[userReaction.reaction] -= 1;
              }
              // Increment the new reaction
              reactions[reaction] += 1;
            }

            return { ...update, reactions };
          }
          return update;
        }),
      );
    } catch (error) {
      console.error("Error updating reaction:", error);
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const toggleUpdateExpansion = (updateId: string) => {
    setExpandedUpdateId(expandedUpdateId === updateId ? null : updateId);
  };

  const toggleAnalysisExpansion = (analysisId: string) => {
    setExpandedAnalysisId(
      expandedAnalysisId === analysisId ? null : analysisId,
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const getChartIcon = (chartType?: "line" | "bar" | "pie") => {
    switch (chartType) {
      case "line":
        return <LineChart className="h-5 w-5 text-blue-500" />;
      case "bar":
        return <BarChart2 className="h-5 w-5 text-green-500" />;
      case "pie":
        return <PieChart className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (direction: "up" | "down" | "neutral") => {
    switch (direction) {
      case "up":
        return (
          <ChevronRight className="h-5 w-5 text-green-500 rotate-[-45deg]" />
        );
      case "down":
        return <ChevronRight className="h-5 w-5 text-red-500 rotate-45" />;
      case "neutral":
        return <ChevronRight className="h-5 w-5 text-gray-500 rotate-90" />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Pro Advisor" />
        <main className="flex-1 overflow-y-auto flex flex-col">
          <QuickAccessToolbar
            onOpenSearch={() => window.open("/dashboard", "_self")}
            onOpenChat={() => {}}
            onOpenAlerts={() => window.open("/alerts", "_self")}
          />
          <div className="container mx-auto px-4 py-6 flex-1 flex flex-col pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Pro Advisor
              </h1>

              {/* Market Type Selector */}
              <div className="flex overflow-x-auto pb-2 space-x-2 w-full md:w-auto">
                {[
                  {
                    id: "stocks",
                    name: "Stocks",
                    icon: <Briefcase className="h-4 w-4 mr-2" />,
                  },
                  {
                    id: "crypto",
                    name: "Crypto",
                    icon: <Coins className="h-4 w-4 mr-2" />,
                  },
                  {
                    id: "forex",
                    name: "Forex",
                    icon: <DollarSign className="h-4 w-4 mr-2" />,
                  },
                  {
                    id: "realestate",
                    name: "Real Estate",
                    icon: <Building className="h-4 w-4 mr-2" />,
                  },
                ].map((market) => (
                  <Button
                    key={market.id}
                    variant={"outline"}
                    className={`flex items-center ${selectedCategory === market.id ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}`}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === market.id ? "" : market.id,
                      )
                    }
                  >
                    {market.icon}
                    {market.name}
                  </Button>
                ))}
              </div>

              {/* Mobile tabs - only visible on small screens */}
              <div className="md:hidden w-full">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "updates" | "analysis")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* News splash removed as requested */}

            <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
              {/* Admin Updates Panel - Full width on mobile when active tab is "updates" */}
              <div
                className={`flex-1 flex flex-col overflow-hidden ${activeTab !== "updates" && "hidden md:flex"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Admin Updates
                  </h2>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Latest updates</span>
                  </Badge>
                </div>
                <div className="flex-1 pr-4 overflow-y-auto">
                  <div className="space-y-6 pb-4">
                    {adminUpdates.map((update) => (
                      <motion.div
                        key={update.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={update.author.avatar} />
                                <AvatarFallback>
                                  {update.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                  {update.title}
                                </h3>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                  <span>{update.author.name}</span>
                                  <span className="mx-1">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{formatDate(update.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                            {update.hasChart && (
                              <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                {getChartIcon(update.chartType)}
                              </div>
                            )}
                          </div>

                          <div className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                            {update.content
                              .split(/\n/)
                              .map((paragraph, idx) => {
                                // Handle bullet points
                                if (paragraph.trim().startsWith("- ")) {
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-start mb-2"
                                    >
                                      <span className="mr-2">•</span>
                                      <span>
                                        {paragraph
                                          .substring(2)
                                          .replace(
                                            /\*\*(.+?)\*\*/g,
                                            "<strong>$1</strong>",
                                          )
                                          .replace(/\*(.+?)\*/g, "<em>$1</em>")
                                          .replace(
                                            /\[(.+?)\]\((.+?)\)/g,
                                            '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>',
                                          )
                                          .split(/(<[^>]+>)/)
                                          .map((part, i) => {
                                            if (part.startsWith("<"))
                                              return (
                                                <span
                                                  key={i}
                                                  dangerouslySetInnerHTML={{
                                                    __html: part,
                                                  }}
                                                />
                                              );
                                            return <span key={i}>{part}</span>;
                                          })}
                                      </span>
                                    </div>
                                  );
                                }

                                // Handle numbered lists
                                if (/^\d+\.\s/.test(paragraph.trim())) {
                                  const num =
                                    paragraph.match(/^(\d+)\.\s/)?.[1];
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-start mb-2"
                                    >
                                      <span className="mr-2">{num}.</span>
                                      <span>
                                        {paragraph
                                          .replace(/^\d+\.\s/, "")
                                          .replace(
                                            /\*\*(.+?)\*\*/g,
                                            "<strong>$1</strong>",
                                          )
                                          .replace(/\*(.+?)\*/g, "<em>$1</em>")
                                          .replace(
                                            /\[(.+?)\]\((.+?)\)/g,
                                            '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>',
                                          )
                                          .split(/(<[^>]+>)/)
                                          .map((part, i) => {
                                            if (part.startsWith("<"))
                                              return (
                                                <span
                                                  key={i}
                                                  dangerouslySetInnerHTML={{
                                                    __html: part,
                                                  }}
                                                />
                                              );
                                            return <span key={i}>{part}</span>;
                                          })}
                                      </span>
                                    </div>
                                  );
                                }

                                // Handle regular paragraphs with formatting
                                return (
                                  <p key={idx} className="mb-2">
                                    {paragraph
                                      .replace(
                                        /\*\*(.+?)\*\*/g,
                                        "<strong>$1</strong>",
                                      )
                                      .replace(/\*(.+?)\*/g, "<em>$1</em>")
                                      .replace(
                                        /\[(.+?)\]\((.+?)\)/g,
                                        '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>',
                                      )
                                      .split(/(<[^>]+>)/)
                                      .map((part, i) => {
                                        if (part.startsWith("<"))
                                          return (
                                            <span
                                              key={i}
                                              dangerouslySetInnerHTML={{
                                                __html: part,
                                              }}
                                            />
                                          );
                                        return <span key={i}>{part}</span>;
                                      })}
                                  </p>
                                );
                              })}
                          </div>

                          {update.hasChart && (
                            <div className="mb-4">
                              {update.chartImage ? (
                                <div
                                  className="relative cursor-pointer"
                                  onClick={() =>
                                    toggleUpdateExpansion(update.id)
                                  }
                                >
                                  <img
                                    src={update.chartImage}
                                    alt="Chart"
                                    className={`w-full rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${expandedUpdateId === update.id ? "max-h-[500px]" : "max-h-[200px] object-cover"}`}
                                  />
                                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {expandedUpdateId === update.id
                                      ? "Click to minimize"
                                      : "Click to expand"}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                  {update.chartType === "line" ? (
                                    <LineChart className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                                  ) : update.chartType === "bar" ? (
                                    <BarChart2 className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                                  ) : (
                                    <PieChart className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Resolution section - expandable */}
                          {update.resolution && (
                            <div className="mb-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-between"
                                onClick={() => toggleUpdateExpansion(update.id)}
                              >
                                <span className="flex items-center">
                                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                                  Resolution
                                </span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${expandedUpdateId === update.id ? "rotate-180" : ""}`}
                                />
                              </Button>
                              {expandedUpdateId === update.id && (
                                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                                  <p className="text-sm text-gray-700 dark:text-amber-100">
                                    {update.resolution}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Reactions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${userReaction?.updateId === update.id && userReaction?.reaction === "thumbsUp" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : ""}`}
                                onClick={() =>
                                  handleReaction(update.id, "thumbsUp")
                                }
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{update.reactions.thumbsUp}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${userReaction?.updateId === update.id && userReaction?.reaction === "thumbsDown" ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" : ""}`}
                                onClick={() =>
                                  handleReaction(update.id, "thumbsDown")
                                }
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                <span>{update.reactions.thumbsDown}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${userReaction?.updateId === update.id && userReaction?.reaction === "heart" ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400" : ""}`}
                                onClick={() =>
                                  handleReaction(update.id, "heart")
                                }
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                <span>{update.reactions.heart}</span>
                              </Button>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Bookmark className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Comments section */}
                        <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Comments ({update.comments.length})
                          </h4>
                          <div className="space-y-3 mb-3">
                            {update.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="flex items-start space-x-3"
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.author.avatar} />
                                  <AvatarFallback>
                                    {comment.author.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm">
                                    <div className="flex justify-between items-start">
                                      <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                        {comment.author.name}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatDate(comment.timestamp)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {comment.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Add a comment..."
                                className="min-h-[80px] resize-none mb-2"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                              <Button
                                onClick={() => handleCommentSubmit(update.id)}
                                className="ml-auto"
                                disabled={!comment.trim()}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Analysis Panel - Full width on mobile when active tab is "analysis" */}
              <div
                className={`flex-1 flex flex-col overflow-hidden ${activeTab !== "analysis" && "hidden md:flex"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                    AI Analysis
                  </h2>
                  <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                    Powered by AI
                  </Badge>
                </div>
                <div className="flex-1 pr-4 overflow-y-auto">
                  <div className="space-y-6 pb-4">
                    {aiAnalyses.map((analysis) => {
                      // Find the corresponding update
                      const relatedUpdate = adminUpdates.find(
                        (update) => update.id === analysis.updateId,
                      );

                      return (
                        <motion.div
                          key={analysis.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {analysis.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className={`flex items-center ${analysis.trends.direction === "up" ? "text-green-600" : analysis.trends.direction === "down" ? "text-red-600" : "text-gray-600"}`}
                                >
                                  {getTrendIcon(analysis.trends.direction)}
                                  <span className="ml-1">
                                    {analysis.trends.percentage}%
                                  </span>
                                </Badge>
                                <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                                  <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                              </div>
                            </div>

                            {relatedUpdate && (
                              <div className="mb-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <span>Analysis for:</span>
                                <Badge
                                  variant="outline"
                                  className="ml-2 font-normal"
                                >
                                  {relatedUpdate.title}
                                </Badge>
                              </div>
                            )}

                            <div className="mb-4">
                              <p className="text-gray-700 dark:text-gray-300">
                                {analysis.summary}
                              </p>
                            </div>

                            <div className="mb-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-between"
                                onClick={() =>
                                  toggleAnalysisExpansion(analysis.id)
                                }
                              >
                                <span className="flex items-center">
                                  <Brain className="h-4 w-4 mr-2 text-indigo-500" />
                                  Key Insights
                                </span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${expandedAnalysisId === analysis.id ? "rotate-180" : ""}`}
                                />
                              </Button>
                              {expandedAnalysisId === analysis.id && (
                                <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                                  <ul className="space-y-2">
                                    {analysis.insights.map((insight, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start text-sm text-gray-700 dark:text-indigo-100"
                                      >
                                        <span className="mr-2">•</span>
                                        <span>{insight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <span className="text-gray-500 dark:text-gray-400 mr-2">
                                  Confidence:
                                </span>
                                <span
                                  className={`font-medium ${getConfidenceColor(analysis.confidence)}`}
                                >
                                  {analysis.confidence}%
                                </span>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{formatDate(analysis.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalAdvisor;
