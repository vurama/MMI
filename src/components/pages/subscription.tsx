import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  CreditCard,
  Clock,
  CheckCircle2,
  Shield,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import SubscriptionPlans from "../subscription/SubscriptionPlans";
import SubscriptionFeatureComparison from "../subscription/SubscriptionFeatureComparison";
import { motion } from "framer-motion";

const SubscriptionPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("plans");
  const [currentPlan, setCurrentPlan] = useState("basic");
  const [expiryDate, setExpiryDate] = useState("August 15, 2024");

  const handleSelectPlan = (planId: string) => {
    // In a real app, this would initiate the checkout process
    // For demo purposes, we'll just show a toast and update the current plan
    toast({
      title: "Plan selection initiated",
      description: `You selected the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan. Proceeding to checkout.`,
      duration: 5000,
    });
  };

  const handleUpgradeClick = () => {
    setActiveTab("plans");
  };

  return (
    <DashboardLayout activeItem="Subscription">
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Crown className="h-7 w-7 text-yellow-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Subscription Management
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Current Period Ends
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {expiryDate}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleUpgradeClick}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full px-6 h-11 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade Plan
              </Button>
            </div>
          </div>

          {/* Current Plan Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                  <Crown className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mr-3">
                      {currentPlan.charAt(0).toUpperCase() +
                        currentPlan.slice(1)}{" "}
                      Plan
                    </h2>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Current
                    </Badge>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {currentPlan === "basic"
                      ? "Essential market tracking for individual investors"
                      : currentPlan === "pro"
                        ? "Advanced features for serious investors"
                        : "Complete solution for professional traders"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {currentPlan === "basic"
                    ? "Free"
                    : currentPlan === "pro"
                      ? "$29.99/mo"
                      : "$99.99/mo"}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Next billing date: {expiryDate}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    AI Queries
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {currentPlan === "basic"
                      ? "25 queries/day"
                      : currentPlan === "pro"
                        ? "100 queries/day"
                        : "Unlimited"}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {currentPlan === "basic" ? "18 remaining" : "Available"}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Data Access
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {currentPlan === "basic"
                      ? "Basic market data"
                      : currentPlan === "pro"
                        ? "Advanced market data"
                        : "Full data access + API"}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Payment Method
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {currentPlan === "basic"
                      ? "No payment required"
                      : "Visa ending in 4242"}
                  </span>
                  {currentPlan !== "basic" && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
              <TabsTrigger value="features">Feature Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-4">
              <SubscriptionPlans
                currentPlanId={currentPlan}
                onSelectPlan={handleSelectPlan}
                plans={[
                  {
                    id: "basic",
                    name: "Basic",
                    description:
                      "Essential market tracking for individual investors",
                    price: 0,
                    billingPeriod: "monthly",
                    features: [
                      { name: "Stock market tracking", included: true },
                      { name: "Basic AI insights", included: true },
                      { name: "Daily market updates", included: true },
                      { name: "Real-time news validation", included: false },
                      { name: "Custom alerts", included: false },
                      { name: "Advanced AI insights", included: false },
                      { name: "API access", included: false },
                    ],
                    color: "gray",
                    icon: <Crown className="h-5 w-5 text-gray-500" />,
                  },
                  {
                    id: "pro",
                    name: "Pro",
                    description: "Advanced features for serious investors",
                    price: 29.99,
                    billingPeriod: "monthly",
                    features: [
                      { name: "Stock market tracking", included: true },
                      { name: "Basic AI insights", included: true },
                      { name: "Daily market updates", included: true },
                      { name: "Real-time news validation", included: true },
                      { name: "Custom alerts", included: true },
                      { name: "Advanced AI insights", included: true },
                      { name: "API access", included: false },
                    ],
                    isPopular: true,
                    color: "blue",
                    icon: <Sparkles className="h-5 w-5 text-blue-500" />,
                  },
                  {
                    id: "enterprise",
                    name: "Enterprise",
                    description: "Complete solution for professional traders",
                    price: 99.99,
                    billingPeriod: "monthly",
                    features: [
                      { name: "Stock market tracking", included: true },
                      { name: "Basic AI insights", included: true },
                      { name: "Daily market updates", included: true },
                      { name: "Real-time news validation", included: true },
                      { name: "Custom alerts", included: true },
                      { name: "Advanced AI insights", included: true },
                      { name: "API access", included: true },
                    ],
                    color: "purple",
                    icon: <Star className="h-5 w-5 text-purple-500" />,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Feature Comparison
                </h2>
                <SubscriptionFeatureComparison />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2" />
                  Need a Custom Plan?
                </h2>
                <p className="text-indigo-100 max-w-xl">
                  Contact our team for enterprise-level solutions tailored to
                  your specific investment strategy and data requirements.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full px-6"
                onClick={() => {
                  toast({
                    title: "Request Submitted",
                    description:
                      "Our team will contact you shortly to discuss your custom subscription requirements.",
                    duration: 5000,
                  });
                }}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
