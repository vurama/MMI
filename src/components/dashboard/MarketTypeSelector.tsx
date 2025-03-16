import React from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building,
  Coins,
  BarChart2,
  DollarSign,
} from "lucide-react";

interface MarketType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface MarketTypeSelectorProps {
  activeMarketType: string;
  onMarketTypeChange: (marketType: string) => void;
  className?: string;
}

const MarketTypeSelector: React.FC<MarketTypeSelectorProps> = ({
  activeMarketType,
  onMarketTypeChange,
  className,
}) => {
  const marketTypes: MarketType[] = [
    {
      id: "stocks",
      name: "Stocks",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
    },
    { id: "crypto", name: "Crypto", icon: <Coins className="h-4 w-4 mr-2" /> },
    {
      id: "indices",
      name: "Indices",
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
    },
    {
      id: "forex",
      name: "Currency",
      icon: <DollarSign className="h-4 w-4 mr-2" />,
    },
    {
      id: "realestate",
      name: "Real Estate",
      icon: <Building className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className={`flex overflow-x-auto pb-2 space-x-2 ${className}`}>
      {marketTypes.map((market) => (
        <Button
          key={market.id}
          variant={activeMarketType === market.id ? "default" : "outline"}
          className={`flex items-center ${activeMarketType === market.id ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" : ""}`}
          onClick={() => onMarketTypeChange(market.id)}
        >
          {market.icon}
          {market.name}
        </Button>
      ))}
    </div>
  );
};

export default MarketTypeSelector;
