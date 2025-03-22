import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Upload,
  Bell,
  Filter,
  Search,
  User,
  Building,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import { supabase } from "@/supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";

interface ScammerReport {
  id: string;
  name: string;
  category: "Firm" | "Broker" | "Influencer" | "Person";
  country: string;
  reportDate: string;
  description: string;
  evidence: string;
  upvotes: number;
  downvotes: number;
  aiResolution: "Confirmed" | "Denied" | "Under Review";
  adminEndorsement: "Confirmed" | "Under Review" | "Denied";
  reporterId: string;
  attachments?: string[];
  anonymous: boolean;
}

const categoryIcons = {
  Firm: <Building className="h-5 w-5" />,
  Broker: <Users className="h-5 w-5" />,
  Influencer: <TrendingUp className="h-5 w-5" />,
  Person: <User className="h-5 w-5" />,
};

const resolutionColors = {
  Confirmed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Denied: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "Under Review":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
};

// Function to get country code for flags
const getCountryCode = (country: string): string => {
  const countryMap: Record<string, string> = {
    "United States": "US",
    "United Kingdom": "GB",
    Canada: "CA",
    Australia: "AU",
    Singapore: "SG",
    Germany: "DE",
    France: "FR",
    Japan: "JP",
    China: "CN",
    India: "IN",
    Other: "UN", // United Nations flag as fallback
  };
  return countryMap[country] || "UN";
};

const resolutionIcons = {
  Confirmed: <CheckCircle className="h-4 w-4 mr-1" />,
  Denied: <X className="h-4 w-4 mr-1" />,
  "Under Review": <Clock className="h-4 w-4 mr-1" />,
};

const BrokerRadarPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [scammerReports, setScammerReports] = useState<ScammerReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ScammerReport[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ScammerReport | null>(
    null,
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userVotes, setUserVotes] = useState<
    Record<string, "up" | "down" | null>
  >({});
  const [userReportCount, setUserReportCount] = useState(0);
  const [userViolations, setUserViolations] = useState(0);
  const [userReputation, setUserReputation] = useState(0);

  // Form state
  const [reportForm, setReportForm] = useState({
    name: "",
    category: "Broker",
    country: "United States",
    description: "",
    evidence: "",
    anonymous: false,
    attachments: [] as File[],
  });

  // Mock data for initial development
  useEffect(() => {
    const mockData: ScammerReport[] = [
      {
        id: "1",
        name: "Crypto Wealth Investments",
        category: "Firm",
        country: "United States",
        reportDate: "2023-10-15",
        description:
          "Promises unrealistic returns on crypto investments with guaranteed 300% ROI in 30 days.",
        evidence:
          "Multiple users reported losing funds. Website disappears periodically.",
        upvotes: 45,
        downvotes: 3,
        aiResolution: "Confirmed",
        adminEndorsement: "Confirmed",
        reporterId: "user123",
        anonymous: false,
      },
      {
        id: "2",
        name: "John Smith Trading",
        category: "Broker",
        country: "United Kingdom",
        reportDate: "2023-11-02",
        description:
          "Claims to be a licensed broker but takes funds and disappears.",
        evidence:
          "No regulatory registration found. Multiple complaints on forums.",
        upvotes: 28,
        downvotes: 5,
        aiResolution: "Under Review",
        adminEndorsement: "Under Review",
        reporterId: "user456",
        anonymous: true,
      },
      {
        id: "3",
        name: "CryptoGuru99",
        category: "Influencer",
        country: "Canada",
        reportDate: "2023-11-10",
        description: "Promotes pump and dump schemes on social media.",
        evidence:
          "Pattern of promoting coins before massive price drops. Deletes posts afterward.",
        upvotes: 67,
        downvotes: 12,
        aiResolution: "Confirmed",
        adminEndorsement: "Under Review",
        reporterId: "user789",
        anonymous: false,
      },
      {
        id: "4",
        name: "Sarah Johnson",
        category: "Person",
        country: "Australia",
        reportDate: "2023-11-15",
        description: "Solicits investments for fake real estate opportunities.",
        evidence:
          "Provides fake documents and disappears after receiving funds.",
        upvotes: 12,
        downvotes: 2,
        aiResolution: "Under Review",
        adminEndorsement: "Under Review",
        reporterId: "user101",
        anonymous: true,
      },
      {
        id: "5",
        name: "Global Trading Solutions",
        category: "Firm",
        country: "Singapore",
        reportDate: "2023-11-20",
        description:
          "Unregistered forex trading platform with withdrawal issues.",
        evidence:
          "Multiple users unable to withdraw funds. No response from support.",
        upvotes: 34,
        downvotes: 4,
        aiResolution: "Confirmed",
        adminEndorsement: "Confirmed",
        reporterId: "user202",
        anonymous: false,
      },
    ];

    // Simulate loading data from database
    setTimeout(() => {
      setScammerReports(mockData);
      setFilteredReports(mockData);
      setIsLoading(false);

      // Mock user data
      setUserReportCount(3);
      setUserViolations(1);
      setUserReputation(75);
    }, 1000);

    // In a real implementation, fetch data from Supabase
    // const fetchReports = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('scammer_reports')
    //       .select('*')
    //       .order('reportDate', { ascending: false });
    //
    //     if (error) throw error;
    //     setScammerReports(data || []);
    //     setFilteredReports(data || []);
    //   } catch (error) {
    //     console.error('Error fetching scammer reports:', error);
    //     toast({
    //       title: "Error",
    //       description: "Failed to load scammer reports. Please try again later.",
    //       variant: "destructive",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    //
    // fetchReports();
  }, []);

  // Filter reports based on category, country, and search query
  useEffect(() => {
    let results = scammerReports;

    if (selectedCategory !== "All") {
      results = results.filter(
        (report) => report.category === selectedCategory,
      );
    }

    if (selectedCountry !== "All") {
      results = results.filter((report) => report.country === selectedCountry);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (report) =>
          report.name.toLowerCase().includes(query) ||
          report.description.toLowerCase().includes(query),
      );
    }

    setFilteredReports(results);
  }, [selectedCategory, selectedCountry, searchQuery, scammerReports]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleReportFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setReportForm((prev) => ({ ...prev, anonymous: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setReportForm((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...fileArray],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setReportForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitReport = async () => {
    if (!reportForm.name || !reportForm.description || !reportForm.evidence) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, upload to Supabase
      // const { data, error } = await supabase
      //   .from('scammer_reports')
      //   .insert([
      //     {
      //       name: reportForm.name,
      //       category: reportForm.category,
      //       description: reportForm.description,
      //       evidence: reportForm.evidence,
      //       reportDate: new Date().toISOString(),
      //       upvotes: 0,
      //       downvotes: 0,
      //       aiResolution: "Under Review",
      //       adminEndorsement: "Under Review",
      //       reporterId: user?.id || "anonymous",
      //       anonymous: reportForm.anonymous,
      //     }
      //   ]);
      //
      // if (error) throw error;

      // Mock successful submission
      const newReport: ScammerReport = {
        id: `${Date.now()}`,
        name: reportForm.name,
        category: reportForm.category as
          | "Firm"
          | "Broker"
          | "Influencer"
          | "Person",
        country: reportForm.country,
        description: reportForm.description,
        evidence: reportForm.evidence,
        reportDate: new Date().toISOString().split("T")[0],
        upvotes: 0,
        downvotes: 0,
        aiResolution: "Under Review",
        adminEndorsement: "Under Review",
        reporterId: user?.id || "anonymous",
        anonymous: reportForm.anonymous,
      };

      setScammerReports((prev) => [newReport, ...prev]);
      setUserReportCount((prev) => prev + 1);

      toast({
        title: "Report Submitted",
        description:
          "Your scam report has been submitted successfully and is under review.",
      });

      // Reset form
      setReportForm({
        name: "",
        category: "Broker",
        country: "United States",
        description: "",
        evidence: "",
        anonymous: false,
        attachments: [],
      });

      setIsReportDialogOpen(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit your report. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (reportId: string, voteType: "up" | "down") => {
    // Check if user has already voted on this report
    const currentVote = userVotes[reportId];

    // Update local state first for immediate feedback
    setScammerReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          // If user is changing their vote
          if (currentVote && currentVote !== voteType) {
            return {
              ...report,
              upvotes:
                voteType === "up"
                  ? report.upvotes + 1
                  : report.upvotes - (currentVote === "up" ? 1 : 0),
              downvotes:
                voteType === "down"
                  ? report.downvotes + 1
                  : report.downvotes - (currentVote === "down" ? 1 : 0),
            };
          }
          // If user is removing their vote
          else if (currentVote === voteType) {
            return {
              ...report,
              upvotes: voteType === "up" ? report.upvotes - 1 : report.upvotes,
              downvotes:
                voteType === "down" ? report.downvotes - 1 : report.downvotes,
            };
          }
          // If user is voting for the first time
          else {
            return {
              ...report,
              upvotes: voteType === "up" ? report.upvotes + 1 : report.upvotes,
              downvotes:
                voteType === "down" ? report.downvotes + 1 : report.downvotes,
            };
          }
        }
        return report;
      }),
    );

    // Update user votes record
    setUserVotes((prev) => ({
      ...prev,
      [reportId]: currentVote === voteType ? null : voteType,
    }));

    // In a real implementation, update vote in Supabase
    // try {
    //   // First, check if vote exists
    //   const { data: existingVote, error: fetchError } = await supabase
    //     .from('user_votes')
    //     .select('*')
    //     .eq('user_id', user?.id)
    //     .eq('report_id', reportId)
    //     .single();
    //
    //   if (fetchError && fetchError.code !== 'PGRST116') {
    //     throw fetchError;
    //   }
    //
    //   if (existingVote) {
    //     // Update or delete existing vote
    //     if (existingVote.vote_type === voteType) {
    //       // Delete vote if clicking the same button
    //       await supabase
    //         .from('user_votes')
    //         .delete()
    //         .eq('id', existingVote.id);
    //     } else {
    //       // Change vote type
    //       await supabase
    //         .from('user_votes')
    //         .update({ vote_type: voteType })
    //         .eq('id', existingVote.id);
    //     }
    //   } else {
    //     // Insert new vote
    //     await supabase
    //       .from('user_votes')
    //       .insert([
    //         {
    //           user_id: user?.id,
    //           report_id: reportId,
    //           vote_type: voteType,
    //         }
    //       ]);
    //   }
    //
    //   // Update report vote counts
    //   const { data: updatedReport, error: updateError } = await supabase
    //     .from('scammer_reports')
    //     .select('upvotes, downvotes')
    //     .eq('id', reportId)
    //     .single();
    //
    //   if (updateError) throw updateError;
    //
    //   // Refresh the reports to get updated vote counts
    //   fetchReports();
    // } catch (error) {
    //   console.error('Error updating vote:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to register your vote. Please try again.",
    //     variant: "destructive",
    //   });
    // }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    toast({
      title: isSubscribed ? "Unsubscribed" : "Subscribed",
      description: isSubscribed
        ? "You will no longer receive notifications about new scam reports."
        : "You will now receive notifications about new scam reports.",
    });
  };

  const handleViewDetails = (report: ScammerReport) => {
    setSelectedReport(report);
    setIsDetailDialogOpen(true);
  };

  const isReportingDisabled = userViolations >= 3;

  return (
    <DashboardLayout activeItem="Broker Radar">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Broker Radar</h1>
            <p className="text-muted-foreground mt-1">
              Report and track potential scammers in the financial markets
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setIsReportDialogOpen(true)}
              disabled={isReportingDisabled}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <AlertCircle className="h-4 w-4" />
              Report a Scammer
            </Button>

            <Button
              variant="outline"
              onClick={handleSubscribe}
              className="gap-2"
            >
              <Bell className="h-4 w-4" />
              {isSubscribed ? "Unsubscribe from Alerts" : "Subscribe to Alerts"}
            </Button>
          </div>
        </div>

        {isReportingDisabled && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 dark:bg-red-900/20 dark:border-red-800">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-300 font-medium">
                Your reporting privileges have been restricted due to multiple
                violations. Please contact support for assistance.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>User Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Reputation Score
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{userReputation}</span>
                    <Badge
                      variant={userReputation > 50 ? "default" : "destructive"}
                    >
                      {userReputation > 80
                        ? "Excellent"
                        : userReputation > 50
                          ? "Good"
                          : "Poor"}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Reports Submitted
                  </span>
                  <span className="font-medium">{userReportCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Violations</span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {userViolations}/3
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Token Credits</span>
                  <span className="font-medium">
                    {userReportCount * 10 - userViolations * 5}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle>Scammer Categories</CardTitle>
              <CardDescription>
                Filter reports by category to find specific types of scams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant={selectedCategory === "All" ? "default" : "outline"}
                  className="justify-start gap-2"
                  onClick={() => handleCategoryChange("All")}
                >
                  <Filter className="h-4 w-4" />
                  All Categories
                </Button>
                <Button
                  variant={selectedCategory === "Firm" ? "default" : "outline"}
                  className="justify-start gap-2"
                  onClick={() => handleCategoryChange("Firm")}
                >
                  <Building className="h-4 w-4" />
                  Firms
                </Button>
                <Button
                  variant={
                    selectedCategory === "Broker" ? "default" : "outline"
                  }
                  className="justify-start gap-2"
                  onClick={() => handleCategoryChange("Broker")}
                >
                  <Users className="h-4 w-4" />
                  Brokers
                </Button>
                <Button
                  variant={
                    selectedCategory === "Influencer" ? "default" : "outline"
                  }
                  className="justify-start gap-2"
                  onClick={() => handleCategoryChange("Influencer")}
                >
                  <TrendingUp className="h-4 w-4" />
                  Influencers
                </Button>
                <Button
                  variant={
                    selectedCategory === "Person" ? "default" : "outline"
                  }
                  className="justify-start gap-2 md:col-start-1"
                  onClick={() => handleCategoryChange("Person")}
                >
                  <User className="h-4 w-4" />
                  Individuals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Country Filter</CardTitle>
              <CardDescription>
                Filter reports by country of origin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant={selectedCountry === "All" ? "default" : "outline"}
                  className="justify-start gap-2"
                  onClick={() => handleCountryChange("All")}
                >
                  <Globe className="h-4 w-4" />
                  All Countries
                </Button>
                <Button
                  variant={
                    selectedCountry === "United States" ? "default" : "outline"
                  }
                  className="justify-start gap-2"
                  onClick={() => handleCountryChange("United States")}
                >
                  <span className="mr-1">
                    <img
                      src="https://flagcdn.com/16x12/us.png"
                      alt="US"
                      className="inline h-3 w-4 rounded-sm"
                    />
                  </span>
                  United States
                </Button>
                <Button
                  variant={
                    selectedCountry === "United Kingdom" ? "default" : "outline"
                  }
                  className="justify-start gap-2"
                  onClick={() => handleCountryChange("United Kingdom")}
                >
                  <span className="mr-1">
                    <img
                      src="https://flagcdn.com/16x12/gb.png"
                      alt="UK"
                      className="inline h-3 w-4 rounded-sm"
                    />
                  </span>
                  United Kingdom
                </Button>
                <Button
                  variant={selectedCountry === "Canada" ? "default" : "outline"}
                  className="justify-start gap-2"
                  onClick={() => handleCountryChange("Canada")}
                >
                  <span className="mr-1">
                    <img
                      src="https://flagcdn.com/16x12/ca.png"
                      alt="CA"
                      className="inline h-3 w-4 rounded-sm"
                    />
                  </span>
                  Canada
                </Button>
                <Button
                  variant={
                    selectedCountry === "Australia" ? "default" : "outline"
                  }
                  className="justify-start gap-2"
                  onClick={() => handleCountryChange("Australia")}
                >
                  <span className="mr-1">
                    <img
                      src="https://flagcdn.com/16x12/au.png"
                      alt="AU"
                      className="inline h-3 w-4 rounded-sm"
                    />
                  </span>
                  Australia
                </Button>
                <Button
                  variant={
                    selectedCountry === "Singapore" ? "default" : "outline"
                  }
                  className="justify-start gap-2"
                  onClick={() => handleCountryChange("Singapore")}
                >
                  <span className="mr-1">
                    <img
                      src="https://flagcdn.com/16x12/sg.png"
                      alt="SG"
                      className="inline h-3 w-4 rounded-sm"
                    />
                  </span>
                  Singapore
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-muted-foreground">
              Loading reports...
            </span>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No reports found</h3>
            <p className="mt-2 text-muted-foreground">
              {searchQuery ||
              selectedCategory !== "All" ||
              selectedCountry !== "All"
                ? "Try adjusting your search or filters"
                : "Be the first to report a scammer"}
            </p>
            {(searchQuery ||
              selectedCategory !== "All" ||
              selectedCountry !== "All") && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedCountry("All");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge
                      className={`mb-2 ${report.category === "Firm" ? "bg-blue-500" : report.category === "Broker" ? "bg-purple-500" : report.category === "Influencer" ? "bg-amber-500" : "bg-emerald-500"}`}
                    >
                      {report.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="outline"
                        className={`flex items-center ${resolutionColors[report.aiResolution]}`}
                      >
                        {resolutionIcons[report.aiResolution]}
                        AI: {report.aiResolution}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1">{report.name}</CardTitle>
                  <CardDescription>
                    Reported on{" "}
                    {new Date(report.reportDate).toLocaleDateString()}
                    {!report.anonymous && " by User123"} •
                    <span className="inline-flex items-center gap-1">
                      <img
                        src={`https://flagcdn.com/16x12/${getCountryCode(report.country).toLowerCase()}.png`}
                        alt={report.country}
                        className="inline h-3 w-4 rounded-sm"
                      />
                      {report.country}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3 mb-4">
                    {report.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-1 ${userVotes[report.id] === "up" ? "text-green-600 dark:text-green-400" : ""}`}
                        onClick={() => handleVote(report.id, "up")}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{report.upvotes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-1 ${userVotes[report.id] === "down" ? "text-red-600 dark:text-red-400" : ""}`}
                        onClick={() => handleVote(report.id, "down")}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{report.downvotes}</span>
                      </Button>
                    </div>
                    <Badge
                      variant="outline"
                      className={`flex items-center ${report.adminEndorsement === "Confirmed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : report.adminEndorsement === "Denied" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"}`}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {report.adminEndorsement}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleViewDetails(report)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Report Dialog */}
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Report a Scammer</DialogTitle>
              <DialogDescription>
                Provide details about the suspected scammer. Accurate reports
                help protect the community.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name/ID
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={reportForm.name}
                  onChange={handleReportFormChange}
                  placeholder="Name or identifier of the scammer"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  name="category"
                  value={reportForm.category}
                  onValueChange={(value) =>
                    setReportForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Firm">Firm</SelectItem>
                    <SelectItem value="Broker">Broker</SelectItem>
                    <SelectItem value="Influencer">Influencer</SelectItem>
                    <SelectItem value="Person">Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Select
                  name="country"
                  value={reportForm.country}
                  onValueChange={(value) =>
                    setReportForm((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={reportForm.description}
                  onChange={handleReportFormChange}
                  placeholder="Describe the scam or suspicious activity"
                  className="col-span-3"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="evidence" className="text-right">
                  Evidence
                </Label>
                <Textarea
                  id="evidence"
                  name="evidence"
                  value={reportForm.evidence}
                  onChange={handleReportFormChange}
                  placeholder="Provide any evidence or red flags you've observed"
                  className="col-span-3"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attachments" className="text-right">
                  Attachments
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Input
                      id="attachments"
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      className="col-span-3"
                    />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>

                  {reportForm.attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">
                        Uploaded files:
                      </p>
                      <ul className="text-sm space-y-1">
                        {reportForm.attachments.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="truncate">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="anonymous" className="text-right">
                  Anonymous
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="anonymous"
                    checked={reportForm.anonymous}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="anonymous">
                    Submit this report anonymously
                  </Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsReportDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitReport} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        {selectedReport && (
          <Dialog
            open={isDetailDialogOpen}
            onOpenChange={setIsDetailDialogOpen}
          >
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${selectedReport.category === "Firm" ? "bg-blue-500" : selectedReport.category === "Broker" ? "bg-purple-500" : selectedReport.category === "Influencer" ? "bg-amber-500" : "bg-emerald-500"}`}
                  >
                    {selectedReport.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`flex items-center ${resolutionColors[selectedReport.aiResolution]}`}
                  >
                    {resolutionIcons[selectedReport.aiResolution]}
                    AI: {selectedReport.aiResolution}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`flex items-center ${selectedReport.adminEndorsement === "Confirmed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : selectedReport.adminEndorsement === "Denied" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"}`}
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    Admin: {selectedReport.adminEndorsement}
                  </Badge>
                </div>
                <DialogTitle className="text-xl mt-2">
                  {selectedReport.name}
                </DialogTitle>
                <DialogDescription>
                  Reported on{" "}
                  {new Date(selectedReport.reportDate).toLocaleDateString()}
                  {!selectedReport.anonymous && " by User123"} •
                  <span className="inline-flex items-center gap-1">
                    <img
                      src={`https://flagcdn.com/16x12/${getCountryCode(selectedReport.country).toLowerCase()}.png`}
                      alt={selectedReport.country}
                      className="inline h-3 w-4 rounded-sm"
                    />
                    {selectedReport.country}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm">{selectedReport.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-1">Category Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>{" "}
                        {selectedReport.category}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Country:</span>{" "}
                        <span className="inline-flex items-center gap-1">
                          <img
                            src={`https://flagcdn.com/16x12/${getCountryCode(selectedReport.country).toLowerCase()}.png`}
                            alt={selectedReport.country}
                            className="inline h-3 w-4 rounded-sm"
                          />
                          {selectedReport.country}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>{" "}
                        {selectedReport.adminEndorsement}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          AI Analysis:
                        </span>{" "}
                        {selectedReport.aiResolution}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Report ID:
                        </span>{" "}
                        {selectedReport.id}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-1">AI Analysis</h4>
                    <p className="text-sm">
                      {selectedReport.aiResolution === "Confirmed"
                        ? "Our AI system has analyzed this report and found multiple patterns consistent with known scams. The reported behavior matches historical fraud cases in our database."
                        : selectedReport.aiResolution === "Denied"
                          ? "Our AI system has analyzed this report and found insufficient evidence to confirm fraudulent activity. The reported behavior does not match known scam patterns in our database."
                          : "Our AI system is currently analyzing this report. This process may take 24-48 hours depending on complexity and volume of reports."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="evidence" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-1">Evidence Provided</h4>
                    <p className="text-sm">{selectedReport.evidence}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-1">Attachments</h4>
                    <p className="text-sm text-muted-foreground">
                      No attachments provided with this report.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-1">Similar Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      No similar reports found in our database.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="community" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Community Feedback</h4>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-1 ${userVotes[selectedReport.id] === "up" ? "text-green-600 dark:text-green-400" : ""}`}
                        onClick={() => handleVote(selectedReport.id, "up")}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{selectedReport.upvotes}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-1 ${userVotes[selectedReport.id] === "down" ? "text-red-600 dark:text-red-400" : ""}`}
                        onClick={() => handleVote(selectedReport.id, "down")}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{selectedReport.downvotes}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar>
                        <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center text-sm font-medium">
                          U
                        </div>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">User456</p>
                        <p className="text-xs text-muted-foreground">
                          2 days ago
                        </p>
                        <p className="text-sm mt-1">
                          I can confirm this. They also contacted me with the
                          same scheme and disappeared after I sent funds.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Avatar>
                        <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center text-sm font-medium">
                          A
                        </div>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-muted-foreground">
                          1 day ago
                        </p>
                        <p className="text-sm mt-1">
                          We are currently investigating this report. Thank you
                          for bringing it to our attention.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDetailDialogOpen(false)}
                >
                  Close
                </Button>
                <Button variant="destructive">Report as False</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BrokerRadarPage;
