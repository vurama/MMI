import React from "react";
import AIInsightBox from "./AIInsightBox";
import { useNavigate } from "react-router-dom";

interface AIInsight {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: "positive" | "negative" | "neutral";
  lastUpdated?: string;
  isTracking?: boolean;
}

interface AIInsightGridProps {
  insights?: AIInsight[];
  isLoading?: boolean;
}

const defaultInsights: AIInsight[] = [
  {
    id: "1",
    title: "Tech Sector Momentum",
    category: "Stocks",
    summary:
      "AI analysis indicates strong momentum in tech stocks with potential growth opportunities in semiconductor and cloud services sectors.",
    status: "positive",
    lastUpdated: "5 min ago",
    isTracking: true,
  },
  {
    id: "2",
    title: "Housing Market Slowdown",
    category: "Real Estate",
    summary:
      "Detected cooling trends in major metropolitan housing markets with decreasing demand and increasing inventory levels.",
    status: "negative",
    lastUpdated: "15 min ago",
    isTracking: true,
  },
  {
    id: "3",
    title: "Crypto Market Volatility",
    category: "Crypto",
    summary:
      "Increased volatility detected in cryptocurrency markets with potential regulatory developments affecting market sentiment.",
    status: "neutral",
    lastUpdated: "Just now",
    isTracking: true,
  },
  {
    id: "4",
    title: "Energy Sector Analysis",
    category: "Stocks",
    summary:
      "Renewable energy stocks showing positive momentum based on policy developments and increased institutional investment.",
    status: "positive",
    lastUpdated: "30 min ago",
    isTracking: true,
  },
  {
    id: "5",
    title: "Commercial Real Estate Trends",
    category: "Real Estate",
    summary:
      "Office space demand remains below pre-pandemic levels while industrial and logistics properties continue to perform well.",
    status: "neutral",
    lastUpdated: "1 hour ago",
    isTracking: true,
  },
  {
    id: "6",
    title: "DeFi Protocol Analysis",
    category: "Crypto",
    summary:
      "Decentralized finance protocols showing increased adoption metrics with growing total value locked across major platforms.",
    status: "positive",
    lastUpdated: "45 min ago",
    isTracking: true,
  },
];

const AIInsightGrid = ({
  insights = defaultInsights,
  isLoading = false,
}: AIInsightGridProps) => {
  const navigate = useNavigate();

  const handleInsightClick = (insightId: string) => {
    // Navigate to detail page or open modal with more information
    console.log(`Clicked insight ${insightId}`);
    // Example: navigate(`/insights/${insightId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 shadow-sm h-[220px] animate-pulse p-5"
          >
            <div className="flex justify-between">
              <div className="h-2.5 w-2.5 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="mt-10 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight) => (
        <AIInsightBox
          key={insight.id}
          title={insight.title}
          category={insight.category}
          summary={insight.summary}
          status={insight.status}
          lastUpdated={insight.lastUpdated}
          isTracking={insight.isTracking}
          onClick={() => handleInsightClick(insight.id)}
        />
      ))}
    </div>
  );
};

export default AIInsightGrid;
