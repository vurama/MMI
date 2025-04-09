import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  Search,
  Settings,
  User,
  LineChart,
  Brain,
  Zap,
  Cog,
  BarChart2,
  Menu,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";
import SearchDialog from "../SearchDialog";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
  notifications?: Array<{ id: string; title: string }>;
}

const TopNavigation = ({
  onSearch = () => {},
  notifications = [
    { id: "1", title: "Market alert: Tech sector up 3.2%" },
    { id: "2", title: "New AI analysis available" },
  ],
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [searchDialogQuery, setSearchDialogQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getSentiment, getOverallSentiment } = useMarketSentiment();
  const sentimentScore = getOverallSentiment();
  const { sectorScores, historicalData: sentimentHistory } = getSentiment();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Open search dialog with the query
    setSearchDialogQuery(searchQuery);
    setIsSearchDialogOpen(true);
    // Also call the onSearch prop if provided
    onSearch(searchQuery);
  };

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-500";
    if (score >= 55) return "text-green-500 dark:text-green-400";
    if (score >= 45) return "text-gray-500 dark:text-gray-400";
    if (score >= 30) return "text-orange-500 dark:text-orange-400";
    return "text-red-600 dark:text-red-500";
  };

  const handleSentimentClick = () => {
    window.dispatchEvent(new CustomEvent("toggle-sentiment-meter"));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSettingsClick = () => {
    window.dispatchEvent(new CustomEvent("open-settings"));
  };

  if (!user) return null;

  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 md:px-6 fixed top-0 z-50 shadow-md dark:bg-gray-900/95 dark:border-gray-800">
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="font-semibold text-xl flex items-center">
          <LineChart className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="dark:text-white hidden sm:inline">
            MarketMind AI
          </span>
        </Link>
      </div>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden rounded-full h-9 w-9"
        onClick={toggleMobileMenu}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search bar - hidden on small screens, full size on medium+ */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-[600px]">
        <form onSubmit={handleSearch} className="relative w-full">
          <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask AI about market trends, insights, or specific assets..."
            className="pl-10 pr-20 py-2 h-10 rounded-xl border-gray-200 bg-white shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus-visible:ring-indigo-600"
            onFocus={() => {
              if (searchQuery === "") {
                setIsSearchDialogOpen(true);
              }
            }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-7 px-3 text-xs shadow-sm dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              <Brain className="h-3 w-3 mr-1" />
              Ask AI
            </Button>
          </div>
        </form>
      </div>

      {/* Mobile search button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg px-3 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30"
          onClick={() => setIsSearchDialogOpen(true)}
        >
          <Brain className="h-4 w-4 mr-1.5" />
          Ask AI
        </Button>
      </div>

      {/* AI Search Dialog */}
      <SearchDialog
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
        initialQuery={searchDialogQuery}
        marketData={null}
        sentimentData={{
          overallScore: sentimentScore,
          sectorScores,
          historicalData: sentimentHistory,
        }}
      />

      {/* Right side icons - condensed on mobile */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Market Sentiment Score Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 md:h-9 md:w-9 bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 relative"
                onClick={handleSentimentClick}
              >
                <BarChart2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span
                  className={`absolute -top-1 -right-1 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white dark:border-gray-800 ${getSentimentColor(sentimentScore)}`}
                >
                  {sentimentScore}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Market Sentiment Score</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* AI Accuracy - hidden on mobile */}
        <div className="hidden md:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 relative"
                >
                  <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white dark:border-gray-800 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    92
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
                <p>AI Accuracy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Help button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/help">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 md:h-9 md:w-9 bg-purple-50 hover:bg-purple-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <HelpCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Help Center</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Settings button - visible on all screens */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 md:h-9 md:w-9 bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={handleSettingsClick}
              >
                <Cog className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full h-8 w-8 md:h-9 md:w-9 bg-blue-50 hover:bg-blue-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium border border-white dark:border-gray-800">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl overflow-hidden p-2 border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <DropdownMenuLabel className="text-sm font-medium text-gray-900 px-2 dark:text-gray-100">
                    Market Alerts
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-gray-100 dark:bg-gray-700" />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="rounded-lg text-sm py-2 focus:bg-blue-50 dark:focus:bg-blue-900/30 dark:text-gray-200"
                    >
                      {notification.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Market Alerts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 md:h-9 md:w-9 hover:cursor-pointer border-2 border-blue-100 dark:border-blue-900">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.email || ""}
              />
              <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {user.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-none shadow-lg dark:bg-gray-800"
          >
            <DropdownMenuLabel className="text-xs text-gray-500">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleSettingsClick}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile search bar - only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 shadow-md z-40">
          <Button
            className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 flex items-center justify-between py-2 px-4 rounded-xl dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30"
            onClick={() => {
              setIsSearchDialogOpen(true);
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="flex items-center">
              <Brain className="h-4 w-4 mr-2 text-indigo-500" />
              <span>Ask AI about markets...</span>
            </div>
            <Search className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 flex items-center justify-center"
              onClick={handleSettingsClick}
            >
              <Cog className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Link to="/help" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-purple-600 dark:text-purple-400 flex items-center justify-center"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 dark:text-blue-400 col-span-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close Menu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;
