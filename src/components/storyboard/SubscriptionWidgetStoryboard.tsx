import React from "react";
import SubscriptionWidget from "../dashboard/SubscriptionWidget";

export default function SubscriptionWidgetStoryboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Subscription Widget
      </h1>
      <div className="max-w-md mx-auto">
        <SubscriptionWidget
          plan="basic"
          expiryDate="August 15, 2024"
          onUpgrade={() => alert("Upgrade clicked")}
        />
      </div>
    </div>
  );
}
