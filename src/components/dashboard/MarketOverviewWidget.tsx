import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number; // percentage
  volume: string;
}

interface MarketOverviewWidgetProps {
  stockData?: MarketItem[];
  realEstateData?: MarketItem[];
  cryptoData?: MarketItem[];
  isLoading?: boolean;
}

const defaultStockData: MarketItem[] = [
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    price: 478.32,
    change: 1.2,
    volume: "84.5M",
  },
  {
    symbol: "QQQ",
    name: "Nasdaq 100 ETF",
    price: 412.76,
    change: 1.8,
    volume: "52.3M",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.45,
    change: 2.3,
    volume: "67.1M",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 402.12,
    change: 0.9,
    volume: "23.8M",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.23,
    change: 1.5,
    volume: "31.2M",
  },
];

const defaultRealEstateData: MarketItem[] = [
  {
    symbol: "VNQ",
    name: "Vanguard REIT ETF",
    price: 84.56,
    change: -0.7,
    volume: "5.2M",
  },
  {
    symbol: "IYR",
    name: "iShares U.S. Real Estate",
    price: 87.23,
    change: -0.5,
    volume: "4.8M",
  },
  {
    symbol: "XLRE",
    name: "Real Estate Select",
    price: 38.45,
    change: -0.3,
    volume: "3.1M",
  },
  {
    symbol: "AMT",
    name: "American Tower Corp",
    price: 192.34,
    change: 0.2,
    volume: "1.9M",
  },
  {
    symbol: "PLD",
    name: "Prologis Inc",
    price: 124.56,
    change: -0.8,
    volume: "2.7M",
  },
];

const defaultCryptoData: MarketItem[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 51243.67,
    change: 3.2,
    volume: "32.5B",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2876.45,
    change: 2.1,
    volume: "18.7B",
  },
  { symbol: "SOL", name: "Solana", price: 102.34, change: 5.7, volume: "4.2B" },
  { symbol: "ADA", name: "Cardano", price: 0.45, change: -1.2, volume: "1.8B" },
  {
    symbol: "DOT",
    name: "Polkadot",
    price: 6.78,
    change: 0.8,
    volume: "952.3M",
  },
];

const MarketOverviewWidget = ({
  stockData = defaultStockData,
  realEstateData = defaultRealEstateData,
  cryptoData = defaultCryptoData,
  isLoading = false,
}: MarketOverviewWidgetProps) => {
  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900">
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 animate-pulse"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-12 bg-gray-100 rounded"></div>
                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-16 bg-gray-100 rounded"></div>
                    <div className="h-4 w-16 bg-gray-100 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900">
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stocks">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="mt-0">
            <div className="space-y-1">
              {stockData.map((item) => (
                <MarketItemRow key={item.symbol} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="real-estate" className="mt-0">
            <div className="space-y-1">
              {realEstateData.map((item) => (
                <MarketItemRow key={item.symbol} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="mt-0">
            <div className="space-y-1">
              {cryptoData.map((item) => (
                <MarketItemRow key={item.symbol} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const MarketItemRow = ({ item }: { item: MarketItem }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-2">
        <span className="font-mono text-sm font-medium">{item.symbol}</span>
        <span className="text-sm text-gray-600 truncate max-w-[150px]">
          {item.name}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-medium text-sm">
          {item.price < 1 ? item.price.toFixed(4) : item.price.toFixed(2)}
        </span>
        <span
          className={`flex items-center text-xs font-medium ${item.change > 0 ? "text-green-500" : item.change < 0 ? "text-red-500" : "text-gray-500"}`}
        >
          {item.change > 0 ? (
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
          ) : item.change < 0 ? (
            <TrendingDown className="h-3.5 w-3.5 mr-1" />
          ) : (
            <Minus className="h-3.5 w-3.5 mr-1" />
          )}
          {Math.abs(item.change).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default MarketOverviewWidget;
