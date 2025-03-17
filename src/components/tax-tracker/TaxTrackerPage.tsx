import React, { useState, Suspense, lazy } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Filter,
  Globe,
  HelpCircle,
  Info,
  Percent,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Scissors,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
// Lazy load components to improve performance
const TaxOverviewPanel = lazy(() => import("./TaxOverviewPanel"));
const CapitalGainsCalculator = lazy(() => import("./CapitalGainsCalculator"));
const TaxSavingSuggestions = lazy(() => import("./TaxSavingSuggestions"));
const TaxEventsTracker = lazy(() => import("./TaxEventsTracker"));
const GlobalTaxMap = lazy(() => import("./GlobalTaxMap"));
const PortfolioTaxImpact = lazy(() => import("./PortfolioTaxImpact"));
const TaxAlerts = lazy(() => import("./TaxAlerts"));

// Loading component
const LoadingComponent = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
  </div>
);

const TaxTrackerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedCountry, setSelectedCountry] = useState("united-states");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <DollarSign className="h-6 w-6 mr-2 text-indigo-500" />
            Tax Tracker
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Optimize your tax strategy across multiple asset classes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="united-states">United States</SelectItem>
              <SelectItem value="united-kingdom">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>

          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Estimated Tax Liability
                </p>
                <h3 className="text-2xl font-bold mt-1">$12,450</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-500">+8.2%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    from last year
                  </span>
                </div>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <Progress className="mt-4" value={65} />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Current: $8,125</span>
              <span>Projected: $12,450</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Capital Gains
                </p>
                <h3 className="text-2xl font-bold mt-1">$42,850</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+15.3%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    from last year
                  </span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Short-term
                </p>
                <p className="font-medium">$18,250</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Long-term
                </p>
                <p className="font-medium">$24,600</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tax Saving Opportunities
                </p>
                <h3 className="text-2xl font-bold mt-1">$3,250</h3>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    5 actionable strategies
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Scissors className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <span>View Strategies</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full">
          <TabsTrigger value="overview" className="text-xs md:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="capital-gains" className="text-xs md:text-sm">
            Capital Gains
          </TabsTrigger>
          <TabsTrigger value="tax-saving" className="text-xs md:text-sm">
            Tax Strategies
          </TabsTrigger>
          <TabsTrigger value="tax-events" className="text-xs md:text-sm">
            Tax Events
          </TabsTrigger>
          <TabsTrigger value="global-tax" className="text-xs md:text-sm">
            Global Tax
          </TabsTrigger>
          <TabsTrigger value="portfolio-impact" className="text-xs md:text-sm">
            Portfolio Impact
          </TabsTrigger>
          <TabsTrigger value="tax-alerts" className="text-xs md:text-sm">
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <TaxOverviewPanel year={selectedYear} country={selectedCountry} />
          </Suspense>
        </TabsContent>

        <TabsContent value="capital-gains" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <CapitalGainsCalculator
              year={selectedYear}
              country={selectedCountry}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="tax-saving" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <TaxSavingSuggestions
              year={selectedYear}
              country={selectedCountry}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="tax-events" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <TaxEventsTracker year={selectedYear} country={selectedCountry} />
          </Suspense>
        </TabsContent>

        <TabsContent value="global-tax" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <GlobalTaxMap
              year={selectedYear}
              selectedCountry={selectedCountry}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="portfolio-impact" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <PortfolioTaxImpact year={selectedYear} country={selectedCountry} />
          </Suspense>
        </TabsContent>

        <TabsContent value="tax-alerts" className="mt-6">
          <Suspense fallback={<LoadingComponent />}>
            <TaxAlerts year={selectedYear} country={selectedCountry} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxTrackerPage;
