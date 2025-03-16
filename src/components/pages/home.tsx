import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Settings,
  User,
  LineChart,
  BarChart,
  TrendingUp,
  BellRing,
  Newspaper,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import MarketDashboard from "@/components/dashboard/MarketDashboard";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-semibold text-xl flex items-center">
              <LineChart className="h-6 w-6 mr-2 text-blue-600" />
              <span>MarketMind AI</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">
              Features
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Markets
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Resources
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 hover:cursor-pointer border-2 border-blue-100">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-800">
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
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
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm px-5 py-2 shadow-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="pt-16">
        {/* Hero section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-gray-900">
                  AI-Powered{" "}
                  <span className="text-blue-600">Market Intelligence</span> at
                  Your Fingertips
                </h1>
                <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Track market trends across real estate, stocks, and crypto
                  with AI-driven insights validated against real-world news
                  sources.
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 h-auto shadow-lg text-lg">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 text-base px-8 py-6 h-auto"
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center text-sm text-gray-500">
                  <BellRing className="h-4 w-4 mr-2 text-blue-500" />
                  <span>No credit card required • 14-day free trial</span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      <span className="font-medium">
                        AI Market Intelligence
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-800">
                        AI Insights Overview
                      </h3>
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                        <span className="text-xs text-gray-500">
                          Live tracking
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {/* AI Insight Cards */}
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            Tech Sector
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Just now
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Positive momentum detected in semiconductor stocks
                          with 3.2% increase in last 24h.
                        </p>
                        <div className="flex justify-end">
                          <div className="text-blue-600 text-xs font-medium flex items-center">
                            View analysis
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-100 text-green-800">
                            Real Estate
                          </Badge>
                          <span className="text-xs text-gray-500">
                            5 min ago
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Housing market showing signs of stabilization in urban
                          centers based on recent data.
                        </p>
                        <div className="flex justify-end">
                          <div className="text-green-600 text-xs font-medium flex items-center">
                            View analysis
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* AI Assistant Preview */}
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                            <Brain className="h-3 w-3 text-indigo-600" />
                          </div>
                          <span className="text-xs font-medium">
                            MarketMind AI Assistant
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-200 text-xs text-gray-700 mb-2">
                          Based on my analysis of recent news and market data, I
                          recommend increasing exposure to AI-related stocks due
                          to strong institutional investment trends and positive
                          earnings reports.
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            AI confidence: 92%
                          </span>
                          <div className="text-indigo-600 text-xs font-medium flex items-center">
                            Ask a question
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-blue-100 rounded-full h-24 w-24 z-[-1]"></div>
                <div className="absolute -top-6 -left-6 bg-indigo-100 rounded-full h-16 w-16 z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Powerful AI Market Analysis
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with real-time market data
              to deliver actionable insights.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-gray-100 hover:shadow-md transition-all">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Real-time Market Tracking
                </h3>
                <p className="text-gray-600">
                  Monitor stocks, real estate, and cryptocurrency markets with
                  live data and customizable dashboards.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-gray-100 hover:shadow-md transition-all">
                <div className="h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  AI-Powered Insights
                </h3>
                <p className="text-gray-600">
                  Get intelligent predictions and recommendations based on
                  advanced machine learning algorithms.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-gray-100 hover:shadow-md transition-all">
                <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Newspaper className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  News Validation
                </h3>
                <p className="text-gray-600">
                  Verify market trends against real-world news sources to make
                  informed investment decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Sectors section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full opacity-50 -ml-12 -mb-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Brain className="h-5 w-5 text-indigo-600 mr-2" />
                          <span className="font-medium">AI Market Agent</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                          <span className="text-xs text-gray-500">
                            Live tracking
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <div className="flex items-center mb-2">
                            <Badge className="bg-blue-100 text-blue-800">
                              Stocks
                            </Badge>
                            <span className="text-xs text-gray-500 ml-auto">
                              Just now
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            AI detected positive momentum in tech sector with
                            3.2% increase in semiconductor stocks.
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                          <div className="flex items-center mb-2">
                            <Badge className="bg-green-100 text-green-800">
                              Real Estate
                            </Badge>
                            <span className="text-xs text-gray-500 ml-auto">
                              5 min ago
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Housing market showing signs of stabilization in
                            urban centers.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="text-indigo-600 text-sm font-medium flex items-center">
                          View insights
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <Brain className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              MarketMind AI Assistant
                            </h4>
                            <p className="text-xs text-gray-500">
                              AI-powered market analysis
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 max-h-40 overflow-y-auto">
                        <div className="flex mb-3">
                          <div className="bg-indigo-100 rounded-lg p-3 max-w-[80%] text-sm">
                            <p>How is the tech sector performing today?</p>
                          </div>
                        </div>
                        <div className="flex justify-end mb-3">
                          <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%] text-sm shadow-sm">
                            <p>
                              The tech sector is showing strong performance
                              today with a 2.7% overall increase. AI-related
                              stocks are particularly strong with a 4.1% gain in
                              the last 24 hours.
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          <div className="bg-indigo-100 rounded-lg p-3 max-w-[80%] text-sm">
                            <p>What's driving this growth?</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%] text-sm shadow-sm">
                            <p>
                              Based on my analysis of recent news and market
                              data, the growth is primarily driven by positive
                              earnings reports from major tech companies and
                              increased institutional investment in AI
                              technologies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Track Multiple Market Sectors
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Stock Market
                      </h3>
                      <p className="text-gray-600">
                        Track indices, individual stocks, and sectors with
                        AI-powered trend analysis and predictive insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Real Estate
                      </h3>
                      <p className="text-gray-600">
                        Monitor property values, rental yields, and market
                        trends across different regions and property types.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Cryptocurrency
                      </h3>
                      <p className="text-gray-600">
                        Stay updated on crypto prices, market cap, and
                        blockchain trends with real-time data and AI analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Choose the plan that fits your investment strategy
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <div className="text-gray-500 mb-6">
                  For individual investors
                </div>
                <div className="text-4xl font-bold mb-1">
                  $19
                  <span className="text-xl font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-sm text-gray-500 mb-6">Billed monthly</div>

                <ul className="text-left space-y-4 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Stock market tracking
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Basic AI insights
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Daily market updates
                  </li>
                </ul>

                <Link to="/signup">
                  <Button className="w-full rounded-full bg-gray-900 text-white hover:bg-gray-800">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="bg-blue-600 p-8 rounded-2xl shadow-lg border border-blue-500 flex flex-col relative transform scale-105">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="text-blue-100 mb-6">For active traders</div>
                <div className="text-4xl font-bold mb-1 text-white">
                  $49
                  <span className="text-xl font-normal text-blue-200">/mo</span>
                </div>
                <div className="text-sm text-blue-200 mb-6">Billed monthly</div>

                <ul className="text-left space-y-4 mb-8 flex-grow text-white">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-blue-300 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    All markets tracking
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-blue-300 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Advanced AI insights
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-blue-300 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Real-time news validation
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-blue-300 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom alerts
                  </li>
                </ul>

                <Link to="/signup">
                  <Button className="w-full rounded-full bg-white text-blue-600 hover:bg-blue-50">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-gray-500 mb-6">For investment firms</div>
                <div className="text-4xl font-bold mb-1">
                  $199
                  <span className="text-xl font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-sm text-gray-500 mb-6">Billed monthly</div>

                <ul className="text-left space-y-4 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    All Pro features
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    API access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom integrations
                  </li>
                </ul>

                <Link to="/signup">
                  <Button className="w-full rounded-full bg-gray-900 text-white hover:bg-gray-800">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to transform your market analysis?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of investors who are making smarter decisions with
              AI-powered market intelligence.
            </p>
            <Link to="/signup">
              <Button className="rounded-full bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto shadow-lg">
                Start Your Free Trial
              </Button>
            </Link>
            <p className="mt-4 text-blue-200">
              No credit card required • 14-day free trial
            </p>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                <span>MarketMind AI</span>
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                AI-powered market intelligence for smarter investment decisions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    API
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Market Reports
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 text-sm text-gray-500">
            <p>© 2024 MarketMind AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
