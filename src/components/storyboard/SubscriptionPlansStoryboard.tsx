import React from "react";
import SubscriptionPlans from "../subscription/SubscriptionPlans";

export default function SubscriptionPlansStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Subscription Plans
      </h1>
      <SubscriptionPlans currentPlanId="basic" />
    </div>
  );
}
