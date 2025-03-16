import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "../../../supabase/auth";
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
  Plus,
  Edit,
  Trash2,
  FileText,
  Image,
  Save,
  X,
  Briefcase,
  Building,
  Coins,
  DollarSign,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { AdvisorService } from "@/services/AdvisorService";

interface AdminUpdate {
  id: string;
  title: string;
  content: string;
  category: string; // Added category field
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
  };
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
  comments: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: Date;
  }>;
  hasChart: boolean;
  chartType?: "line" | "bar" | "pie";
  chartImage?: string;
  resolution?: string;
}

interface AIAnalysis {
  id: string;
  updateId: string; // Corresponds to an AdminUpdate id
  title: string;
  summary: string;
  insights: string[];
  confidence: number;
  timestamp: Date;
  trends: {
    direction: "up" | "down" | "neutral";
    percentage: number;
  };
}

const AdminAdvisorPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"posts" | "analytics">("posts");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AdminUpdate | null>(null);

  // Form state for creating/editing posts
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "", // Added category field
    hasChart: false,
    chartType: "line" as "line" | "bar" | "pie",
    chartImage: "", // Added chart image URL
    resolution: "",
  });

  const [chartFile, setChartFile] = useState<File | null>(null);
  const [chartPreview, setChartPreview] = useState<string>("");

  // Sample data for admin updates
  const [adminUpdates, setAdminUpdates] = useState<AdminUpdate[]>([
    {
      id: "update-1",
      title: "Q2 Market Performance Overview",
      content:
        "The second quarter showed significant growth across technology sectors, with AI-related stocks outperforming the broader market by 15%. Key indicators suggest continued momentum into Q3, though with increased volatility expected due to upcoming Fed decisions.",
      category: "stocks",
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
      category: "realestate",
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
      category: "crypto",
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

  // Sample data for AI analyses
  const [aiAnalyses, setAiAnalyses] = useState<AIAnalysis[]>([
    {
      id: "analysis-update-1",
      updateId: "update-1",
      title: "AI Analysis: Q2 Market Performance Overview",
      summary:
        "AI has detected strong positive momentum in the technology sector with particular strength in semiconductor and cloud services companies. This aligns with the admin update on Q2 performance.",
      insights: [
        "Semiconductor demand is being driven primarily by AI chip requirements, with a 32% increase in orders from data center operators.",
        "Cloud service providers are showing improved margins due to operational efficiencies and increased enterprise adoption.",
        "Consumer technology spending remains resilient despite inflation concerns, suggesting strong brand loyalty.",
        "Technical indicators suggest potential consolidation before continued upward movement.",
      ],
      confidence: 92,
      timestamp: new Date(2023, 6, 15, 10, 35),
      trends: {
        direction: "up",
        percentage: 15.3,
      },
    },
    {
      id: "analysis-update-2",
      updateId: "update-2",
      title: "AI Analysis: Real Estate Market Cooling Trends",
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
      id: "analysis-update-3",
      updateId: "update-3",
      title: "AI Analysis: Cryptocurrency Regulatory Developments",
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

  // Sample data for analytics
  const [postAnalytics, setPostAnalytics] = useState([
    {
      id: "update-1",
      title: "Q2 Market Performance Overview",
      views: 1245,
      engagement: 87,
      shares: 42,
      saves: 68,
      commentCount: 12,
    },
    {
      id: "update-2",
      title: "Real Estate Market Cooling Trends",
      views: 876,
      engagement: 62,
      shares: 28,
      saves: 45,
      commentCount: 8,
    },
  ]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const updates = await AdvisorService.getAllUpdates();
        setAdminUpdates(updates);

        const analyses = await AdvisorService.getAllAnalyses();
        setAiAnalyses(analyses);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Generate AI analysis for a post using the service
  const generateAIAnalysis = (post: AdminUpdate): AIAnalysis => {
    return AdvisorService.generateAIAnalysis(post);
  };

  const handleCreatePost = async () => {
    // Validate category is selected
    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a market category for your post.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Validate chart image size if uploaded
    if (chartFile && chartFile.size > 2 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Chart image must be less than 2MB in size.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    let chartImageUrl = formData.chartImage;

    // If there's a chart file, we would upload it to storage in a real app
    // For now, we'll use the preview URL directly
    if (chartFile && chartPreview) {
      chartImageUrl = chartPreview;
    }

    // Create a new post with the form data
    const newPost: AdminUpdate = {
      id: `update-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      category: formData.category,
      timestamp: new Date(),
      author: {
        name: user?.email?.split("@")[0] || "Admin",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "Admin"}`,
      },
      reactions: {
        thumbsUp: 0,
        thumbsDown: 0,
        heart: 0,
      },
      comments: [],
      hasChart: formData.hasChart,
      chartType: formData.hasChart ? formData.chartType : undefined,
      chartImage: formData.hasChart ? chartImageUrl : undefined,
      resolution: formData.resolution || undefined,
    };

    // Generate AI analysis for the new post
    const newAnalysis = generateAIAnalysis(newPost);

    try {
      // Add the post and analysis via service
      await AdvisorService.addUpdate(newPost, newAnalysis);

      // Update local state
      setAdminUpdates([newPost, ...adminUpdates]);
      setAiAnalyses([newAnalysis, ...aiAnalyses]);

      // Add to analytics
      setPostAnalytics([
        {
          id: newPost.id,
          title: newPost.title,
          views: 0,
          engagement: 0,
          shares: 0,
          saves: 0,
          commentCount: 0,
        },
        ...postAnalytics,
      ]);

      // Reset form and close dialog
      resetForm();
      setIsCreateDialogOpen(false);

      // Show success toast
      toast({
        title: "Post created",
        description:
          "Your post has been published to the Pro Advisor page with AI analysis.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
  };

  const handleEditPost = async () => {
    if (!selectedPost) return;

    // Validate category is selected
    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a market category for your post.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Validate chart image size if uploaded
    if (chartFile && chartFile.size > 2 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Chart image must be less than 2MB in size.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    let chartImageUrl = formData.chartImage;

    // If there's a chart file, we would upload it to storage in a real app
    // For now, we'll use the preview URL directly
    if (chartFile && chartPreview) {
      chartImageUrl = chartPreview;
    }

    // Update the selected post with the form data
    const updatedPosts = adminUpdates.map((post) => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          title: formData.title,
          content: formData.content,
          category: formData.category,
          hasChart: formData.hasChart,
          chartType: formData.hasChart ? formData.chartType : undefined,
          chartImage: formData.hasChart ? chartImageUrl : undefined,
          resolution: formData.resolution || undefined,
        };
      }
      return post;
    });

    // Get the updated post
    const updatedPost = updatedPosts.find(
      (post) => post.id === selectedPost.id,
    );

    // Update AI analysis if category changed or content significantly changed
    let newAnalysis;
    if (
      updatedPost &&
      (formData.category !== selectedPost.category ||
        formData.content !== selectedPost.content)
    ) {
      // Generate new AI analysis
      newAnalysis = generateAIAnalysis(updatedPost);

      // Update the AI analyses
      const updatedAnalyses = aiAnalyses.map((analysis) => {
        if (analysis.updateId === selectedPost.id) {
          return newAnalysis;
        }
        return analysis;
      });

      // If no existing analysis was found, add a new one
      if (!updatedAnalyses.some((a) => a.updateId === selectedPost.id)) {
        updatedAnalyses.unshift(newAnalysis);
      }

      setAiAnalyses(updatedAnalyses);
    }

    try {
      // Get the updated post
      const updatedPost = updatedPosts.find(
        (post) => post.id === selectedPost.id,
      );
      if (!updatedPost) return;

      // Update via service
      await AdvisorService.updateUpdate(updatedPost, newAnalysis);

      // Update local state
      setAdminUpdates(updatedPosts);

      // Update analytics title if needed
      if (formData.title !== selectedPost.title) {
        const updatedAnalytics = postAnalytics.map((item) => {
          if (item.id === selectedPost.id) {
            return {
              ...item,
              title: formData.title,
            };
          }
          return item;
        });
        setPostAnalytics(updatedAnalytics);
      }

      // Reset form and close dialog
      resetForm();
      setIsEditDialogOpen(false);
      setSelectedPost(null);

      // Show success toast
      toast({
        title: "Post updated",
        description: "Your changes have been saved and AI analysis updated.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      // Delete via service
      await AdvisorService.deleteUpdate(postId);

      // Update local state
      setAdminUpdates(adminUpdates.filter((post) => post.id !== postId));
      setPostAnalytics(postAnalytics.filter((item) => item.id !== postId));
      setAiAnalyses(
        aiAnalyses.filter((analysis) => analysis.updateId !== postId),
      );

      // Show success toast
      toast({
        title: "Post deleted",
        description: "The post has been removed from the Pro Advisor page.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const editPost = (post: AdminUpdate) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category || "",
      hasChart: post.hasChart,
      chartType: post.chartType || "line",
      chartImage: post.chartImage || "",
      resolution: post.resolution || "",
    });
    setChartPreview(post.chartImage || "");
    setChartFile(null);
    setIsEditDialogOpen(true);
  };

  const handleChartFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Chart image must be less than 2MB in size.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setChartFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setChartPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      hasChart: false,
      chartType: "line",
      chartImage: "",
      resolution: "",
    });
    setChartFile(null);
    setChartPreview("");
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "stocks":
        return <Briefcase className="h-4 w-4 mr-1 text-blue-500" />;
      case "crypto":
        return <Coins className="h-4 w-4 mr-1 text-amber-500" />;
      case "forex":
        return <DollarSign className="h-4 w-4 mr-1 text-green-500" />;
      case "realestate":
        return <Building className="h-4 w-4 mr-1 text-red-500" />;
      default:
        return null;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "stocks":
        return "Stocks";
      case "crypto":
        return "Cryptocurrency";
      case "forex":
        return "Forex";
      case "realestate":
        return "Real Estate";
      default:
        return "General";
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Pro Advisor" />
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Pro Advisor Admin
              </h1>

              <Button
                onClick={() => {
                  resetForm();
                  setIsCreateDialogOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </div>

            <Tabs
              defaultValue="posts"
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "posts" | "analytics")
              }
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="posts" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Manage Posts</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  <span>Analytics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="posts"
                className="flex-1 overflow-hidden flex flex-col mt-4"
              >
                <Card className="flex-1 flex flex-col overflow-hidden">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle>Published Posts</CardTitle>
                    <CardDescription>
                      Manage your posts on the Pro Advisor page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full px-4 py-2">
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
                                      <span>
                                        {formatDate(update.timestamp)}
                                      </span>
                                      {update.category && (
                                        <>
                                          <span className="mx-1">•</span>
                                          <Badge
                                            variant="outline"
                                            className="ml-1 flex items-center"
                                          >
                                            {getCategoryIcon(update.category)}
                                            {getCategoryName(update.category)}
                                          </Badge>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {update.hasChart && (
                                  <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    {getChartIcon(update.chartType)}
                                  </div>
                                )}
                              </div>

                              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                {update.content}
                              </p>

                              {update.hasChart && (
                                <div className="mb-4">
                                  {update.chartImage ? (
                                    <div className="relative">
                                      <img
                                        src={update.chartImage}
                                        alt="Chart"
                                        className="w-full h-auto max-h-[150px] object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                                      />
                                      <Badge
                                        variant="outline"
                                        className="absolute top-2 right-2 flex items-center gap-1 bg-white dark:bg-gray-800"
                                      >
                                        {update.chartType === "line" ? (
                                          <LineChart className="h-3 w-3 mr-1" />
                                        ) : update.chartType === "bar" ? (
                                          <BarChart2 className="h-3 w-3 mr-1" />
                                        ) : (
                                          <PieChart className="h-3 w-3 mr-1" />
                                        )}
                                        <span>Chart</span>
                                      </Badge>
                                    </div>
                                  ) : (
                                    <div className="h-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                      <Badge
                                        variant="outline"
                                        className="flex items-center gap-1"
                                      >
                                        {update.chartType === "line" ? (
                                          <LineChart className="h-3 w-3 mr-1" />
                                        ) : update.chartType === "bar" ? (
                                          <BarChart2 className="h-3 w-3 mr-1" />
                                        ) : (
                                          <PieChart className="h-3 w-3 mr-1" />
                                        )}
                                        <span>Chart included</span>
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <MessageSquare className="h-3 w-3" />
                                    <span>
                                      {update.comments.length} comments
                                    </span>
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{update.reactions.thumbsUp}</span>
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => editPost(update)}
                                  >
                                    <Edit className="h-4 w-4 text-blue-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleDeletePost(update.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="analytics"
                className="flex-1 overflow-hidden flex flex-col mt-4"
              >
                <Card className="flex-1 flex flex-col overflow-hidden">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle>Post Analytics</CardTitle>
                    <CardDescription>
                      View engagement metrics for your Pro Advisor posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full px-4 py-2">
                      <div className="space-y-6 pb-4">
                        {postAnalytics.map((analytics) => (
                          <motion.div
                            key={analytics.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden p-4"
                          >
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                              {analytics.title}
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Views
                                </p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {analytics.views}
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Engagement
                                </p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {analytics.engagement}%
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Shares
                                </p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {analytics.shares}
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Saves
                                </p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {analytics.saves}
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Comments
                                </p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {analytics.commentCount}
                                </p>
                              </div>
                            </div>

                            <div className="h-12 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <BarChart2 className="h-3 w-3 mr-1" />
                                <span>Analytics data</span>
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your post"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Market Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select market category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="realestate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="content">Post Content</Label>
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );
                            const newText =
                              formData.content.substring(0, start) +
                              `**${selectedText}**` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bold</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );
                            const newText =
                              formData.content.substring(0, start) +
                              `*${selectedText}*` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Italic</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Separator orientation="vertical" className="h-6" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const cursorPos = textarea.selectionStart;
                            const textBefore = formData.content.substring(
                              0,
                              cursorPos,
                            );
                            const textAfter =
                              formData.content.substring(cursorPos);

                            // Add bullet point at cursor position
                            const newText = textBefore + "\n- " + textAfter;

                            setFormData({ ...formData, content: newText });

                            // Set cursor position after the bullet point
                            setTimeout(() => {
                              textarea.focus();
                              textarea.selectionStart = textarea.selectionEnd =
                                cursorPos + 3;
                            }, 0);
                          }}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bullet List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const cursorPos = textarea.selectionStart;
                            const textBefore = formData.content.substring(
                              0,
                              cursorPos,
                            );
                            const textAfter =
                              formData.content.substring(cursorPos);

                            // Add numbered list at cursor position
                            const newText = textBefore + "\n1. " + textAfter;

                            setFormData({ ...formData, content: newText });

                            // Set cursor position after the number
                            setTimeout(() => {
                              textarea.focus();
                              textarea.selectionStart = textarea.selectionEnd =
                                cursorPos + 4;
                            }, 0);
                          }}
                        >
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Numbered List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Separator orientation="vertical" className="h-6" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );

                            // Open a prompt for the URL
                            const url = prompt("Enter URL:", "https://");
                            if (!url) return;

                            const newText =
                              formData.content.substring(0, start) +
                              `[${selectedText}](${url})` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                className="min-h-[200px] font-mono"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>
                  Formatting: <strong>**bold**</strong>, <em>*italic*</em>,
                  [link text](url), - for bullets, 1. for numbered lists
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="hasChart"
                checked={formData.hasChart}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasChart: checked })
                }
              />
              <Label htmlFor="hasChart">Include Chart</Label>
            </div>
            {formData.hasChart && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chartType">Chart Type</Label>
                  <Select
                    value={formData.chartType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        chartType: value as "line" | "bar" | "pie",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chartImage">Chart Image (Max 2MB)</Label>
                  <Input
                    id="chartImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChartFileChange}
                  />
                  {chartPreview && (
                    <div className="mt-2 relative">
                      <img
                        src={chartPreview}
                        alt="Chart preview"
                        className="max-h-[200px] rounded-md border border-gray-200 dark:border-gray-700"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setChartPreview("");
                          setChartFile(null);
                          setFormData({
                            ...formData,
                            chartImage: "",
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="resolution">
                Resolution/Recommendation (Optional)
              </Label>
              <Textarea
                id="resolution"
                placeholder="Add a recommendation or resolution for your analysis..."
                className="min-h-[100px]"
                value={formData.resolution}
                onChange={(e) =>
                  setFormData({ ...formData, resolution: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsCreateDialogOpen(false);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              disabled={!formData.title.trim() || !formData.content.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Publish Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Post Title</Label>
              <Input
                id="edit-title"
                placeholder="Enter a title for your post"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-sm font-medium">
                Market Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select market category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="realestate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="edit-content">Post Content</Label>
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );
                            const newText =
                              formData.content.substring(0, start) +
                              `**${selectedText}**` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bold</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );
                            const newText =
                              formData.content.substring(0, start) +
                              `*${selectedText}*` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Italic</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Separator orientation="vertical" className="h-6" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const cursorPos = textarea.selectionStart;
                            const textBefore = formData.content.substring(
                              0,
                              cursorPos,
                            );
                            const textAfter =
                              formData.content.substring(cursorPos);

                            // Add bullet point at cursor position
                            const newText = textBefore + "\n- " + textAfter;

                            setFormData({ ...formData, content: newText });

                            // Set cursor position after the bullet point
                            setTimeout(() => {
                              textarea.focus();
                              textarea.selectionStart = textarea.selectionEnd =
                                cursorPos + 3;
                            }, 0);
                          }}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bullet List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const cursorPos = textarea.selectionStart;
                            const textBefore = formData.content.substring(
                              0,
                              cursorPos,
                            );
                            const textAfter =
                              formData.content.substring(cursorPos);

                            // Add numbered list at cursor position
                            const newText = textBefore + "\n1. " + textAfter;

                            setFormData({ ...formData, content: newText });

                            // Set cursor position after the number
                            setTimeout(() => {
                              textarea.focus();
                              textarea.selectionStart = textarea.selectionEnd =
                                cursorPos + 4;
                            }, 0);
                          }}
                        >
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Numbered List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Separator orientation="vertical" className="h-6" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );

                            // Open a prompt for the URL
                            const url = prompt("Enter URL:", "https://");
                            if (!url) return;

                            const newText =
                              formData.content.substring(0, start) +
                              `[${selectedText}](${url})` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Textarea
                id="edit-content"
                placeholder="Write your post content here..."
                className="min-h-[200px] font-mono"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>
                  Formatting: <strong>**bold**</strong>, <em>*italic*</em>,
                  [link text](url), - for bullets, 1. for numbered lists
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-hasChart"
                checked={formData.hasChart}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasChart: checked })
                }
              />
              <Label htmlFor="edit-hasChart">Include Chart</Label>
            </div>
            {formData.hasChart && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-chartType">Chart Type</Label>
                  <Select
                    value={formData.chartType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        chartType: value as "line" | "bar" | "pie",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-chartImage">Chart Image (Max 2MB)</Label>
                  <Input
                    id="edit-chartImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChartFileChange}
                  />
                  {chartPreview && (
                    <div className="mt-2 relative">
                      <img
                        src={chartPreview}
                        alt="Chart preview"
                        className="max-h-[200px] rounded-md border border-gray-200 dark:border-gray-700"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setChartPreview("");
                          setChartFile(null);
                          setFormData({
                            ...formData,
                            chartImage: "",
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="edit-resolution">
                Resolution/Recommendation (Optional)
              </Label>
              <Textarea
                id="edit-resolution"
                placeholder="Add a recommendation or resolution for your analysis..."
                className="min-h-[100px]"
                value={formData.resolution}
                onChange={(e) =>
                  setFormData({ ...formData, resolution: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsEditDialogOpen(false);
                setSelectedPost(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleEditPost}
              disabled={!formData.title.trim() || !formData.content.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdvisorPage;
