import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: PlanFeature[];
  isPopular?: boolean;
  color: string;
  icon: React.ReactNode;
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  currentPlanId?: string;
  onSelectPlan?: (planId: string) => void;
  showYearlyToggle?: boolean;
}

const defaultPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential market tracking for individual investors",
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
];

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  plans = defaultPlans,
  currentPlanId = "basic",
  onSelectPlan = () => {},
  showYearlyToggle = true,
}) => {
  const [billingPeriod, setBillingPeriod] = React.useState<
    "monthly" | "yearly"
  >("monthly");
  const navigate = useNavigate();

  const handleUpgrade = (planId: string) => {
    onSelectPlan(planId);
    // Navigate to checkout or confirmation page
    navigate(`/checkout?plan=${planId}&billing=${billingPeriod}`);
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = isActive
      ? "border-2 shadow-lg"
      : "border hover:border-2 hover:shadow-md";

    switch (color) {
      case "blue":
        return `${baseClasses} ${isActive ? "border-blue-500" : "border-gray-200 hover:border-blue-300"}`;
      case "purple":
        return `${baseClasses} ${isActive ? "border-purple-500" : "border-gray-200 hover:border-purple-300"}`;
      default:
        return `${baseClasses} ${isActive ? "border-gray-400" : "border-gray-200 hover:border-gray-300"}`;
    }
  };

  const getButtonClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-blue-200 dark:hover:shadow-blue-900/30";
      case "purple":
        return "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-purple-200 dark:hover:shadow-purple-900/30";
      default:
        return "bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-gray-200 dark:hover:shadow-gray-900/30";
    }
  };

  const getBadgeClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    // 20% discount for yearly billing
    return (monthlyPrice * 12 * 0.8).toFixed(2);
  };

  const getFullYearlyPrice = (monthlyPrice: number) => {
    // Full yearly price without discount
    return (monthlyPrice * 12).toFixed(2);
  };

  return (
    <div className="w-full">
      {showYearlyToggle && (
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-full inline-flex shadow-sm dark:bg-gray-800">
            <button
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${billingPeriod === "monthly" ? "bg-white shadow-sm text-gray-900 dark:bg-gray-700 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${billingPeriod === "yearly" ? "bg-white shadow-sm text-gray-900 dark:bg-gray-700 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const isCurrentPlan = plan.id === currentPlanId;
          const planPrice =
            billingPeriod === "yearly"
              ? getYearlyPrice(plan.price)
              : plan.price.toFixed(2);

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden ${getColorClasses(plan.color, isCurrentPlan)} bg-white dark:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg`}
            >
              <div className="p-6">
                {plan.isPopular && (
                  <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                    <Zap className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <div className="flex items-center mb-4">
                  <div
                    className={`h-10 w-10 rounded-full bg-${plan.color}-100 flex items-center justify-center mr-3 dark:bg-${plan.color}-900/30`}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {planPrice === "0.00" ? "Free" : `${planPrice}`}
                    </span>
                    {planPrice !== "0.00" && (
                      <span className="ml-2 text-gray-500 dark:text-gray-400">
                        /{billingPeriod === "monthly" ? "mo" : "yr"}
                      </span>
                    )}
                  </div>
                  {billingPeriod === "yearly" && planPrice !== "0.00" && (
                    <div className="mt-1 text-sm">
                      <span className="text-gray-500 dark:text-gray-400 line-through mr-2">
                        ${getFullYearlyPrice(plan.price)}
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Save 20%
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div
                        className={`mt-1 mr-3 ${feature.included ? "text-green-500 dark:text-green-400" : "text-gray-300 dark:text-gray-600"}`}
                      >
                        <Check className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-sm ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                {isCurrentPlan ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${getButtonClasses(plan.color)} font-medium py-5 rounded-xl transition-all duration-200 transform hover:scale-[1.02]`}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {currentPlanId === "basic" && plan.price > 0
                      ? "Upgrade"
                      : "Select Plan"}
                  </Button>
                )}
              </div>
              {isCurrentPlan && (
                <div
                  className={`py-2 px-6 text-center text-sm font-medium text-white bg-${plan.color}-600 dark:bg-${plan.color}-700`}
                >
                  Your Current Plan
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
