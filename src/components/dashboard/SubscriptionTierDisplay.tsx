import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, ArrowRight, Sparkles } from "lucide-react";

interface SubscriptionTierDisplayProps {
  currentPlan?: "basic" | "pro" | "enterprise";
  expiryDate?: string;
  features?: string[];
  isLoading?: boolean;
  onUpgrade?: () => void;
}

const planDetails = {
  basic: {
    name: "Basic",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    features: [
      "Stock market tracking",
      "Basic AI insights",
      "Daily market updates",
    ],
    nextPlan: "pro",
  },
  pro: {
    name: "Pro",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    features: [
      "All markets tracking",
      "Advanced AI insights",
      "Real-time news validation",
      "Custom alerts",
    ],
    nextPlan: "enterprise",
  },
  enterprise: {
    name: "Enterprise",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    features: [
      "All Pro features",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    nextPlan: null,
  },
};

const SubscriptionTierDisplay = ({
  currentPlan = "basic",
  expiryDate = "August 15, 2024",
  features,
  isLoading = false,
  onUpgrade = () => {},
}: SubscriptionTierDisplayProps) => {
  const currentPlanDetails = planDetails[currentPlan];
  const nextPlan = currentPlanDetails.nextPlan
    ? planDetails[currentPlanDetails.nextPlan]
    : null;

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
            <Crown className="h-5 w-5 mr-2 text-yellow-500" />
            <span>Subscription</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded-md dark:bg-gray-700"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 animate-pulse"
                >
                  <div className="h-4 w-4 bg-gray-100 rounded-full dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 dark:bg-gray-700"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="h-9 bg-gray-100 animate-pulse rounded-md w-full dark:bg-gray-700"></div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full dark:bg-gray-800/90 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center dark:text-gray-100">
          <Crown className="h-5 w-5 mr-2 text-yellow-500" />
          <span>Subscription</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              className={`${currentPlanDetails.color} px-3 py-1 text-xs font-medium`}
            >
              {currentPlanDetails.name} Plan
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Expires: {expiryDate}
            </span>
          </div>

          <div className="space-y-2">
            {(features || currentPlanDetails.features).map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 dark:bg-green-900/30">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      {nextPlan && (
        <CardFooter className="border-t border-gray-100 pt-4 dark:border-gray-700">
          <Button
            onClick={onUpgrade}
            className="w-full flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-700 dark:hover:to-purple-700"
          >
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Upgrade to {nextPlan.name}</span>
            </div>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SubscriptionTierDisplay;
