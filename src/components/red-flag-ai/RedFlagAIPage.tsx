import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Bell,
  Brain,
  ChevronDown,
  Filter,
  Info,
  Search,
  Shield,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

interface FlaggedProject {
  id: string;
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  priceChange24h: number;
  reputationScore: number;
  riskLevel: "high" | "medium" | "low";
  reasons: string[];
  flaggedBy: "ai" | "admin" | "community";
  flaggedDate: Date;
  tradeSuggestion: {
    type: "spot" | "futures";
    action: "short" | "avoid" | "caution";
    reasoning: string;
  };
  sentimentScore: number;
  newsCount: number;
  socialMentions: number;
}

const mockFlaggedProjects: FlaggedProject[] = [
  {
    id: "1",
    name: "RiskCoin",
    symbol: "RISK",
    marketCap: 25000000,
    price: 0.0034,
    priceChange24h: -12.5,
    reputationScore: 23,
    riskLevel: "high",
    reasons: [
      "Multiple team members have left the project recently",
      "GitHub repository has been inactive for 3 months",
      "Suspicious token movements from team wallets",
    ],
    flaggedBy: "ai",
    flaggedDate: new Date(2023, 6, 15),
    tradeSuggestion: {
      type: "futures",
      action: "short",
      reasoning:
        "Technical indicators suggest continued downtrend with high selling pressure",
    },
    sentimentScore: 28,
    newsCount: 7,
    socialMentions: 342,
  },
  {
    id: "2",
    name: "ScamToken",
    symbol: "SCAM",
    marketCap: 8500000,
    price: 0.00012,
    priceChange24h: -28.3,
    reputationScore: 12,
    riskLevel: "high",
    reasons: [
      "Project whitepaper contains plagiarized content",
      "Team members use pseudonyms with no verifiable identities",
      "Smart contract has critical vulnerabilities according to audit",
    ],
    flaggedBy: "admin",
    flaggedDate: new Date(2023, 6, 18),
    tradeSuggestion: {
      type: "spot",
      action: "avoid",
      reasoning:
        "High risk of complete project failure based on technical and fundamental analysis",
    },
    sentimentScore: 15,
    newsCount: 12,
    socialMentions: 890,
  },
  {
    id: "3",
    name: "PumpDump",
    symbol: "PUMP",
    marketCap: 42000000,
    price: 0.0078,
    priceChange24h: 45.2,
    reputationScore: 31,
    riskLevel: "medium",
    reasons: [
      "Unusual trading patterns suggesting market manipulation",
      "Excessive marketing with minimal product development",
      "Unrealistic roadmap promises",
    ],
    flaggedBy: "ai",
    flaggedDate: new Date(2023, 6, 20),
    tradeSuggestion: {
      type: "futures",
      action: "caution",
      reasoning:
        "Current pump likely unsustainable; consider short position after peak indicators",
    },
    sentimentScore: 42,
    newsCount: 5,
    socialMentions: 1240,
  },
  {
    id: "4",
    name: "VaporChain",
    symbol: "VAPOR",
    marketCap: 15800000,
    price: 0.0023,
    priceChange24h: -8.7,
    reputationScore: 35,
    riskLevel: "medium",
    reasons: [
      "Product launch delayed multiple times without explanation",
      "Inconsistent communication from team",
      "Several partnerships announced but unverified",
    ],
    flaggedBy: "community",
    flaggedDate: new Date(2023, 6, 22),
    tradeSuggestion: {
      type: "spot",
      action: "caution",
      reasoning:
        "Wait for more clarity on development progress before considering investment",
    },
    sentimentScore: 39,
    newsCount: 3,
    socialMentions: 520,
  },
  {
    id: "5",
    name: "EmptyToken",
    symbol: "EMPTY",
    marketCap: 3200000,
    price: 0.00004,
    priceChange24h: -15.3,
    reputationScore: 18,
    riskLevel: "high",
    reasons: [
      "No working product despite being 1 year past roadmap deadline",
      "Team has started a new project while this one remains incomplete",
      "Multiple security incidents reported",
    ],
    flaggedBy: "admin",
    flaggedDate: new Date(2023, 6, 25),
    tradeSuggestion: {
      type: "spot",
      action: "avoid",
      reasoning:
        "Project shows multiple signs of abandonment; high risk of further decline",
    },
    sentimentScore: 22,
    newsCount: 8,
    socialMentions: 670,
  },
];

const RedFlagAIPage: React.FC = () => {
  const [projects, setProjects] =
    useState<FlaggedProject[]>(mockFlaggedProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<FlaggedProject[]>(mockFlaggedProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [flaggedByFilter, setFlaggedByFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FlaggedProject | null>(
    null,
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  useEffect(() => {
    filterProjects();
  }, [searchQuery, riskFilter, flaggedByFilter, projects]);

  const filterProjects = () => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply risk level filter
    if (riskFilter !== "all") {
      filtered = filtered.filter((project) => project.riskLevel === riskFilter);
    }

    // Apply flagged by filter
    if (flaggedByFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.flaggedBy === flaggedByFilter,
      );
    }

    setFilteredProjects(filtered);
  };

  const handleProjectClick = (project: FlaggedProject) => {
    setSelectedProject(project);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const refreshProjects = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getFlaggedByBadgeColor = (flaggedBy: string) => {
    switch (flaggedBy) {
      case "ai":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "community":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "short":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "avoid":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "caution":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    } else {
      return `$${marketCap}`;
    }
  };

  return (
    <DashboardLayout activeItem="Red Flag AI">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
                Red Flag AI
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                AI-powered detection of high-risk cryptocurrency projects
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={refreshProjects}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : "Refresh Data"}
              </Button>

              {isAdminMode && (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setIsAddProjectDialogOpen(true)}
                >
                  Flag New Project
                </Button>
              )}

              <div className="flex items-center gap-2 ml-4 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium">Admin Mode</span>
                <Switch
                  checked={isAdminMode}
                  onCheckedChange={setIsAdminMode}
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by risk level" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={flaggedByFilter} onValueChange={setFlaggedByFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <SelectValue placeholder="Filter by source" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="ai">AI Flagged</SelectItem>
                <SelectItem value="admin">Admin Flagged</SelectItem>
                <SelectItem value="community">Community Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-l-4"
                  style={{
                    borderLeftColor:
                      project.riskLevel === "high"
                        ? "#ef4444"
                        : project.riskLevel === "medium"
                          ? "#f97316"
                          : "#eab308",
                  }}
                  onClick={() => handleProjectClick(project)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {project.name}
                          <span className="text-sm text-gray-500 ml-2">
                            {project.symbol}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Market Cap: {formatMarketCap(project.marketCap)}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${project.priceChange24h < 0 ? "text-red-500" : "text-green-500"}`}
                          >
                            {project.priceChange24h > 0 ? "+" : ""}
                            {project.priceChange24h.toFixed(2)}%
                          </span>
                          {project.priceChange24h < 0 ? (
                            <ArrowDown className="h-3 w-3 ml-1 text-red-500" />
                          ) : (
                            <ArrowUp className="h-3 w-3 ml-1 text-green-500" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          ${project.price.toFixed(6)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={getRiskBadgeColor(project.riskLevel)}
                      >
                        {project.riskLevel.charAt(0).toUpperCase() +
                          project.riskLevel.slice(1)}{" "}
                        Risk
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getFlaggedByBadgeColor(project.flaggedBy)}
                      >
                        {project.flaggedBy === "ai" ? (
                          <>
                            <Brain className="h-3 w-3 mr-1" /> AI Flagged
                          </>
                        ) : project.flaggedBy === "admin" ? (
                          <>Admin Flagged</>
                        ) : (
                          <>Community Flagged</>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Red Flags:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
                        {project.reasons.slice(0, 2).map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                        {project.reasons.length > 2 && (
                          <li className="text-gray-500 italic">
                            +{project.reasons.length - 2} more reasons...
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getActionBadgeColor(
                          project.tradeSuggestion.action,
                        )}
                      >
                        {project.tradeSuggestion.action === "short" ? (
                          <>
                            <TrendingDown className="h-3 w-3 mr-1" /> Short
                          </>
                        ) : project.tradeSuggestion.action === "avoid" ? (
                          <>Avoid</>
                        ) : (
                          <>Caution</>
                        )}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {project.tradeSuggestion.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">
                        Reputation: {project.reputationScore}/100
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                <AlertCircle className="h-12 w-12 mb-4 text-gray-400" />
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-sm mt-2">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      {selectedProject && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  {selectedProject.name} ({selectedProject.symbol})
                  <Badge
                    variant="outline"
                    className={`ml-3 ${getRiskBadgeColor(selectedProject.riskLevel)}`}
                  >
                    {selectedProject.riskLevel.charAt(0).toUpperCase() +
                      selectedProject.riskLevel.slice(1)}{" "}
                    Risk
                  </Badge>
                </div>
                {isAdminMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => {
                      handleDeleteProject(selectedProject.id);
                      setIsDetailDialogOpen(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove Flag
                  </Button>
                )}
              </DialogTitle>
              <DialogDescription>
                Flagged on {selectedProject.flaggedDate.toLocaleDateString()} by{" "}
                <Badge
                  variant="outline"
                  className={getFlaggedByBadgeColor(selectedProject.flaggedBy)}
                >
                  {selectedProject.flaggedBy === "ai" ? (
                    <>
                      <Brain className="h-3 w-3 mr-1" /> AI System
                    </>
                  ) : selectedProject.flaggedBy === "admin" ? (
                    <>Admin Team</>
                  ) : (
                    <>Community Reports</>
                  )}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-2">
                <Tabs defaultValue="reasons">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="reasons">Red Flags</TabsTrigger>
                    <TabsTrigger value="trading">Trading Analysis</TabsTrigger>
                    <TabsTrigger value="data">Data Sources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="reasons" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Risk Factors</h3>
                      <ScrollArea className="h-[200px] rounded-md border p-4">
                        <ul className="space-y-3">
                          {selectedProject.reasons.map((reason, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </div>

                    {isAdminMode && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">
                          Add New Risk Factor
                        </h3>
                        <div className="flex gap-2">
                          <Input placeholder="Enter new risk factor..." />
                          <Button size="sm">Add</Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="trading" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Trading Recommendation
                      </h3>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            <Badge
                              variant="outline"
                              className={`mr-2 ${getActionBadgeColor(selectedProject.tradeSuggestion.action)}`}
                            >
                              {selectedProject.tradeSuggestion.action ===
                              "short" ? (
                                <>
                                  <TrendingDown className="h-3 w-3 mr-1" />{" "}
                                  Short Position
                                </>
                              ) : selectedProject.tradeSuggestion.action ===
                                "avoid" ? (
                                <>Avoid Investment</>
                              ) : (
                                <>Exercise Caution</>
                              )}
                            </Badge>
                            {selectedProject.tradeSuggestion.type === "futures"
                              ? "Futures Market"
                              : "Spot Market"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400">
                            {selectedProject.tradeSuggestion.reasoning}
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Current Price
                              </p>
                              <p className="text-lg font-medium">
                                ${selectedProject.price.toFixed(6)}
                              </p>
                              <p
                                className={`text-sm ${selectedProject.priceChange24h < 0 ? "text-red-500" : "text-green-500"} flex items-center`}
                              >
                                {selectedProject.priceChange24h > 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {selectedProject.priceChange24h > 0 ? "+" : ""}
                                {selectedProject.priceChange24h.toFixed(2)}%
                                (24h)
                              </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Market Cap
                              </p>
                              <p className="text-lg font-medium">
                                {formatMarketCap(selectedProject.marketCap)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Rank: #1248
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="data" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Data Sources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Sentiment Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">
                                {selectedProject.sentimentScore}/100
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  selectedProject.sentimentScore < 30
                                    ? "bg-red-100 text-red-800"
                                    : selectedProject.sentimentScore < 50
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {selectedProject.sentimentScore < 30
                                  ? "Very Negative"
                                  : selectedProject.sentimentScore < 50
                                    ? "Negative"
                                    : "Neutral"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Based on social media and news analysis
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              News Coverage
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">
                                {selectedProject.newsCount}
                              </span>
                              <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800"
                              >
                                Articles
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Negative news articles in past 30 days
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Social Mentions
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">
                                {selectedProject.socialMentions}
                              </span>
                              <Badge
                                variant="outline"
                                className="bg-purple-100 text-purple-800"
                              >
                                Mentions
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Across Twitter, Reddit, and Discord
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Price Alert
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Info className="h-4 w-4 mr-2" />
                    View Detailed Report
                  </Button>
                  {isAdminMode && (
                    <>
                      <Separator />
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Request AI Analysis
                      </Button>
                      <Button className="w-full justify-start bg-red-600 hover:bg-red-700 text-white">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Send User Alert
                      </Button>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Risk Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Reputation Score
                        </span>
                        <span className="text-sm font-medium">
                          {selectedProject.reputationScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{
                            width: `${selectedProject.reputationScore}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Technical Risk
                        </span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-orange-500 h-2.5 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Team Credibility
                        </span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Community Trust
                        </span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{ width: "32%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Project Dialog (Admin Only) */}
      {isAdminMode && (
        <Dialog
          open={isAddProjectDialogOpen}
          onOpenChange={setIsAddProjectDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Flag New Project</DialogTitle>
              <DialogDescription>
                Add a new cryptocurrency project to the red flag list.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input placeholder="e.g. RiskCoin" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Symbol</label>
                  <Input placeholder="e.g. RISK" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reasons for Flagging
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-gray-300 dark:border-gray-700 p-2 text-sm dark:bg-gray-800"
                  placeholder="Enter reasons for flagging this project (one per line)"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Trading Recommendation
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Select defaultValue="avoid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="avoid">Avoid</SelectItem>
                      <SelectItem value="caution">Caution</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="spot">
                    <SelectTrigger>
                      <SelectValue placeholder="Select market type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spot">Spot Market</SelectItem>
                      <SelectItem value="futures">Futures Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddProjectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Add new project logic would go here
                  setIsAddProjectDialogOpen(false);
                }}
              >
                Add Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default RedFlagAIPage;
