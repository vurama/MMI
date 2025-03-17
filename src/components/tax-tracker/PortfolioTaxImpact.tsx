import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ChevronRight,
  BarChart3,
  PieChart,
  Scissors,
} from "lucide-react";

interface PortfolioTaxImpactProps {
  year: string;
  country: string;
}

interface AssetTaxImpact {
  id: string;
  name: string;
  type: "stock" | "crypto" | "etf" | "commodity";
  value: number;
  costBasis: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  potentialTax: number;
  effectiveTaxRate: number;
  holdingPeriod: number; // in days
  daysToLongTerm?: number;
  taxStrategy?: string;
}

const PortfolioTaxImpact: React.FC<PortfolioTaxImpactProps> = ({
  year,
  country,
}) => {
  // Mock portfolio data
  const portfolioAssets: AssetTaxImpact[] = [
    {
      id: "1",
      name: "Apple Inc. (AAPL)",
      type: "stock",
      value: 15250,
      costBasis: 12000,
      unrealizedGain: 3250,
      unrealizedGainPercent: 27.08,
      potentialTax: 780,
      effectiveTaxRate: 24,
      holdingPeriod: 410,
      taxStrategy: "Hold for long-term capital gains rate",
    },
    {
      id: "2",
      name: "Bitcoin (BTC)",
      type: "crypto",
      value: 22500,
      costBasis: 18000,
      unrealizedGain: 4500,
      unrealizedGainPercent: 25,
      potentialTax: 1080,
      effectiveTaxRate: 24,
      holdingPeriod: 280,
      daysToLongTerm: 85,
      taxStrategy: "Wait 85 more days for long-term status",
    },
    {
      id: "3",
      name: "Vanguard S&P 500 ETF (VOO)",
      type: "etf",
      value: 42000,
      costBasis: 35000,
      unrealizedGain: 7000,
      unrealizedGainPercent: 20,
      potentialTax: 1050,
      effectiveTaxRate: 15,
      holdingPeriod: 520,
      taxStrategy: "Consider tax-loss harvesting with similar ETFs",
    },
    {
      id: "4",
      name: "Ethereum (ETH)",
      type: "crypto",
      value: 8500,
      costBasis: 12000,
      unrealizedGain: -3500,
      unrealizedGainPercent: -29.17,
      potentialTax: 0,
      effectiveTaxRate: 0,
      holdingPeriod: 180,
      daysToLongTerm: 185,
      taxStrategy: "Consider tax-loss harvesting",
    },
    {
      id: "5",
      name: "Tesla Inc. (TSLA)",
      type: "stock",
      value: 7800,
      costBasis: 14000,
      unrealizedGain: -6200,
      unrealizedGainPercent: -44.29,
      potentialTax: 0,
      effectiveTaxRate: 0,
      holdingPeriod: 390,
      taxStrategy: "Consider tax-loss harvesting",
    },
    {
      id: "6",
      name: "Gold ETF (GLD)",
      type: "commodity",
      value: 9200,
      costBasis: 8500,
      unrealizedGain: 700,
      unrealizedGainPercent: 8.24,
      potentialTax: 168,
      effectiveTaxRate: 24,
      holdingPeriod: 290,
      daysToLongTerm: 75,
      taxStrategy: "Consider waiting for long-term status",
    },
    {
      id: "7",
      name: "Microsoft Corp. (MSFT)",
      type: "stock",
      value: 18500,
      costBasis: 14200,
      unrealizedGain: 4300,
      unrealizedGainPercent: 30.28,
      potentialTax: 645,
      effectiveTaxRate: 15,
      holdingPeriod: 410,
      taxStrategy: "Hold for continued growth",
    },
    {
      id: "8",
      name: "Solana (SOL)",
      type: "crypto",
      value: 3200,
      costBasis: 5800,
      unrealizedGain: -2600,
      unrealizedGainPercent: -44.83,
      potentialTax: 0,
      effectiveTaxRate: 0,
      holdingPeriod: 150,
      daysToLongTerm: 215,
      taxStrategy: "Consider tax-loss harvesting",
    },
  ];

  // Calculate summary statistics
  const totalPortfolioValue = portfolioAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );
  const totalUnrealizedGain = portfolioAssets.reduce(
    (sum, asset) => sum + asset.unrealizedGain,
    0,
  );
  const totalPotentialTax = portfolioAssets.reduce(
    (sum, asset) => sum + asset.potentialTax,
    0,
  );
  const totalUnrealizedLoss = portfolioAssets
    .filter((asset) => asset.unrealizedGain < 0)
    .reduce((sum, asset) => sum + Math.abs(asset.unrealizedGain), 0);

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case "stock":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "crypto":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "etf":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "commodity":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Portfolio Value
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ${totalPortfolioValue.toLocaleString()}
                </h3>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unrealized Gains
                </p>
                <h3 className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  ${totalUnrealizedGain.toLocaleString()}
                </h3>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Potential Tax
                </p>
                <h3 className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                  ${totalPotentialTax.toLocaleString()}
                </h3>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tax Loss Harvest Potential
                </p>
                <h3 className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">
                  ${totalUnrealizedLoss.toLocaleString()}
                </h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Scissors className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Tax Impact Tabs */}
      <Tabs defaultValue="assets">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="strategies">Tax Strategies</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-indigo-500" />
                Portfolio Tax Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Cost Basis</TableHead>
                    <TableHead>Unrealized Gain/Loss</TableHead>
                    <TableHead>Holding Period</TableHead>
                    <TableHead>Potential Tax</TableHead>
                    <TableHead>Tax Rate</TableHead>
                    <TableHead>Strategy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={getAssetTypeColor(asset.type)}
                          >
                            {asset.type.charAt(0).toUpperCase() +
                              asset.type.slice(1)}
                          </Badge>
                          <span className="font-medium">{asset.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>${asset.value.toLocaleString()}</TableCell>
                      <TableCell>${asset.costBasis.toLocaleString()}</TableCell>
                      <TableCell
                        className={
                          asset.unrealizedGain >= 0
                            ? "text-green-600 dark:text-green-400 font-medium"
                            : "text-red-600 dark:text-red-400 font-medium"
                        }
                      >
                        ${asset.unrealizedGain.toLocaleString()} (
                        {asset.unrealizedGainPercent.toFixed(1)}%)
                      </TableCell>
                      <TableCell>
                        {asset.holdingPeriod} days
                        {asset.daysToLongTerm && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {asset.daysToLongTerm} days to long-term
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        ${asset.potentialTax.toLocaleString()}
                      </TableCell>
                      <TableCell>{asset.effectiveTaxRate}%</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{asset.taxStrategy}</span>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                Tax Optimization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-base font-medium mb-2 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2 text-blue-500" />
                    Tax-Loss Harvesting Opportunities
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Consider selling these assets to realize losses and offset
                    capital gains.
                  </p>

                  <div className="space-y-3">
                    {portfolioAssets
                      .filter((asset) => asset.unrealizedGain < 0)
                      .map((asset) => (
                        <div
                          key={asset.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getAssetTypeColor(asset.type)}
                              >
                                {asset.type.charAt(0).toUpperCase() +
                                  asset.type.slice(1)}
                              </Badge>
                              <span className="font-medium">{asset.name}</span>
                            </div>
                            <div className="text-sm text-red-600 dark:text-red-400 mt-1">
                              Unrealized Loss: $
                              {Math.abs(asset.unrealizedGain).toLocaleString()}
                            </div>
                          </div>

                          <div className="mt-3 md:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full md:w-auto"
                            >
                              View Similar Assets
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-base font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-amber-500" />
                    Long-Term Holding Opportunities
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    These assets are approaching long-term status. Consider
                    holding to qualify for lower tax rates.
                  </p>

                  <div className="space-y-3">
                    {portfolioAssets
                      .filter(
                        (asset) =>
                          asset.daysToLongTerm &&
                          asset.daysToLongTerm < 100 &&
                          asset.unrealizedGain > 0,
                      )
                      .map((asset) => (
                        <div
                          key={asset.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getAssetTypeColor(asset.type)}
                              >
                                {asset.type.charAt(0).toUpperCase() +
                                  asset.type.slice(1)}
                              </Badge>
                              <span className="font-medium">{asset.name}</span>
                            </div>
                            <div className="text-sm mt-1">
                              <span className="text-green-600 dark:text-green-400">
                                Potential Tax Savings: $
                                {Math.round(
                                  asset.potentialTax * 0.4,
                                ).toLocaleString()}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">
                                ({asset.daysToLongTerm} days remaining)
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 md:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full md:w-auto"
                            >
                              Set Reminder
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-base font-medium mb-2 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                    Tax-Efficient Asset Location
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Consider relocating these assets to more tax-efficient
                    account types.
                  </p>

                  <div className="space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            Bonds
                          </Badge>
                          <span className="font-medium">
                            Move from Taxable to Tax-Deferred
                          </span>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Potential Annual Savings: $350
                        </div>
                      </div>

                      <div className="mt-3 md:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          >
                            REITs
                          </Badge>
                          <span className="font-medium">
                            Move from Taxable to Tax-Free
                          </span>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Potential Annual Savings: $280
                        </div>
                      </div>

                      <div className="mt-3 md:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-indigo-500" />
                  Asset Allocation by Tax Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  [Tax Impact Visualization Chart]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-indigo-500" />
                  Tax Efficiency by Asset Type
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  [Tax Efficiency Chart]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioTaxImpact;
