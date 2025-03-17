import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Scissors,
  ChevronRight,
  TrendingDown,
  Clock,
  Calendar,
  Wallet,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface TaxSavingSuggestionsProps {
  year: string;
  country: string;
}

interface TaxStrategy {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  difficulty: "easy" | "medium" | "complex";
  timeframe: "immediate" | "short-term" | "long-term";
  assetClasses: string[];
  steps: string[];
  implemented?: boolean;
}

const TaxSavingSuggestions: React.FC<TaxSavingSuggestionsProps> = ({
  year,
  country,
}) => {
  // Mock tax saving strategies
  const strategies: TaxStrategy[] = [
    {
      id: "1",
      title: "Tax Loss Harvesting",
      description:
        "Sell underperforming assets to offset capital gains and reduce your tax liability.",
      potentialSavings: 1250,
      difficulty: "easy",
      timeframe: "immediate",
      assetClasses: ["stocks", "crypto", "etfs"],
      steps: [
        "Identify assets with unrealized losses",
        "Sell assets to realize losses",
        "Use losses to offset capital gains",
        "Reinvest in similar (but not identical) assets to maintain market exposure",
        "Ensure you avoid wash sale rules",
      ],
    },
    {
      id: "2",
      title: "Long-term Holding Strategy",
      description:
        "Hold assets for more than one year to qualify for lower long-term capital gains tax rates.",
      potentialSavings: 850,
      difficulty: "easy",
      timeframe: "long-term",
      assetClasses: ["stocks", "crypto", "etfs", "commodities"],
      steps: [
        "Identify assets approaching one-year holding period",
        "Calculate tax difference between short-term and long-term rates",
        "Delay selling until long-term status is achieved",
        "Consider market conditions and risk of waiting",
      ],
    },
    {
      id: "3",
      title: "Tax-Advantaged Accounts",
      description:
        "Utilize tax-advantaged accounts like IRAs, 401(k)s, or HSAs for investments to defer or eliminate taxes.",
      potentialSavings: 3200,
      difficulty: "medium",
      timeframe: "long-term",
      assetClasses: ["stocks", "etfs", "bonds"],
      steps: [
        "Maximize contributions to available tax-advantaged accounts",
        "Prioritize high-growth or dividend-paying assets in these accounts",
        "Consider Roth conversions for future tax-free growth",
        "Understand withdrawal rules and penalties",
      ],
    },
    {
      id: "4",
      title: "Strategic Asset Location",
      description:
        "Place tax-inefficient investments in tax-advantaged accounts and tax-efficient investments in taxable accounts.",
      potentialSavings: 750,
      difficulty: "medium",
      timeframe: "short-term",
      assetClasses: ["stocks", "bonds", "etfs", "reits"],
      steps: [
        "Identify tax-inefficient investments (high-yield bonds, REITs)",
        "Move these investments to tax-advantaged accounts",
        "Place tax-efficient investments (index funds, growth stocks) in taxable accounts",
        "Rebalance portfolio while maintaining optimal tax location",
      ],
    },
    {
      id: "5",
      title: "Crypto Specific: Like-Kind Exchange",
      description:
        "For certain jurisdictions, explore like-kind exchange options for cryptocurrency trades to defer taxes.",
      potentialSavings: 1800,
      difficulty: "complex",
      timeframe: "immediate",
      assetClasses: ["crypto"],
      steps: [
        "Consult with a tax professional about eligibility",
        "Document all transactions thoroughly",
        "Ensure compliance with local regulations",
        "File appropriate forms with tax return",
      ],
      implemented: true,
    },
    {
      id: "6",
      title: "Charitable Giving with Appreciated Assets",
      description:
        "Donate appreciated assets to charity to avoid capital gains tax and receive a tax deduction.",
      potentialSavings: 950,
      difficulty: "medium",
      timeframe: "short-term",
      assetClasses: ["stocks", "crypto", "etfs"],
      steps: [
        "Identify highly appreciated assets",
        "Select qualified charitable organizations",
        "Transfer assets directly to charity",
        "Obtain proper documentation for tax deduction",
        "Report donation on tax return",
      ],
    },
    {
      id: "7",
      title: "Tax-Loss Carryforward",
      description:
        "Carry forward capital losses to offset future capital gains or ordinary income.",
      potentialSavings: 1100,
      difficulty: "easy",
      timeframe: "long-term",
      assetClasses: ["stocks", "crypto", "etfs", "commodities"],
      steps: [
        "Document capital losses exceeding current year gains",
        "Apply up to $3,000 of excess losses against ordinary income",
        "Carry forward remaining losses to future tax years",
        "Track loss carryforwards for future tax planning",
      ],
    },
  ];

  const totalPotentialSavings = strategies.reduce(
    (sum, strategy) =>
      sum + (strategy.implemented ? 0 : strategy.potentialSavings),
    0,
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "complex":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case "immediate":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "short-term":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "long-term":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Scissors className="h-6 w-6 mr-2 text-indigo-500" />
                Tax Optimization Strategies
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Personalized recommendations to minimize your tax liability
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Potential Tax Savings
              </div>
              <div className="text-3xl font-bold mt-1 text-green-600 dark:text-green-400">
                ${totalPotentialSavings.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Across {strategies.filter((s) => !s.implemented).length}{" "}
                actionable strategies
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategies Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Strategies</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="other">Other Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <Card
                key={strategy.id}
                className={
                  strategy.implemented
                    ? "border-green-200 dark:border-green-800"
                    : ""
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">
                      {strategy.title}
                    </CardTitle>
                    {strategy.implemented && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Implemented
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {strategy.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge
                      variant="outline"
                      className={getDifficultyColor(strategy.difficulty)}
                    >
                      {strategy.difficulty.charAt(0).toUpperCase() +
                        strategy.difficulty.slice(1)}
                    </Badge>

                    <Badge
                      variant="outline"
                      className={getTimeframeColor(strategy.timeframe)}
                    >
                      {strategy.timeframe === "immediate"
                        ? "Immediate"
                        : strategy.timeframe === "short-term"
                          ? "Short-term"
                          : "Long-term"}
                    </Badge>

                    {strategy.assetClasses.map((assetClass) => (
                      <Badge
                        key={assetClass}
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {assetClass.charAt(0).toUpperCase() +
                          assetClass.slice(1)}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Potential Savings
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        ${strategy.potentialSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Implementation Steps
                    </h4>
                    <ul className="space-y-1">
                      {strategy.steps.map((step, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      Learn More
                    </Button>
                    <Button size="sm" className="flex items-center">
                      {strategy.implemented ? "Review" : "Apply Strategy"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stocks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies
              .filter((strategy) => strategy.assetClasses.includes("stocks"))
              .map((strategy) => (
                <Card
                  key={strategy.id}
                  className={
                    strategy.implemented
                      ? "border-green-200 dark:border-green-800"
                      : ""
                  }
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">
                        {strategy.title}
                      </CardTitle>
                      {strategy.implemented && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Implemented
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {strategy.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(strategy.difficulty)}
                      >
                        {strategy.difficulty.charAt(0).toUpperCase() +
                          strategy.difficulty.slice(1)}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={getTimeframeColor(strategy.timeframe)}
                      >
                        {strategy.timeframe === "immediate"
                          ? "Immediate"
                          : strategy.timeframe === "short-term"
                            ? "Short-term"
                            : "Long-term"}
                      </Badge>

                      {strategy.assetClasses.map((assetClass) => (
                        <Badge
                          key={assetClass}
                          variant="outline"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {assetClass.charAt(0).toUpperCase() +
                            assetClass.slice(1)}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Potential Savings
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          ${strategy.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">
                        Learn More
                      </Button>
                      <Button size="sm" className="flex items-center">
                        {strategy.implemented ? "Review" : "Apply Strategy"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies
              .filter((strategy) => strategy.assetClasses.includes("crypto"))
              .map((strategy) => (
                <Card
                  key={strategy.id}
                  className={
                    strategy.implemented
                      ? "border-green-200 dark:border-green-800"
                      : ""
                  }
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">
                        {strategy.title}
                      </CardTitle>
                      {strategy.implemented && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Implemented
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {strategy.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(strategy.difficulty)}
                      >
                        {strategy.difficulty.charAt(0).toUpperCase() +
                          strategy.difficulty.slice(1)}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={getTimeframeColor(strategy.timeframe)}
                      >
                        {strategy.timeframe === "immediate"
                          ? "Immediate"
                          : strategy.timeframe === "short-term"
                            ? "Short-term"
                            : "Long-term"}
                      </Badge>

                      {strategy.assetClasses.map((assetClass) => (
                        <Badge
                          key={assetClass}
                          variant="outline"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {assetClass.charAt(0).toUpperCase() +
                            assetClass.slice(1)}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Potential Savings
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          ${strategy.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">
                        Learn More
                      </Button>
                      <Button size="sm" className="flex items-center">
                        {strategy.implemented ? "Review" : "Apply Strategy"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies
              .filter(
                (strategy) =>
                  strategy.assetClasses.includes("bonds") ||
                  strategy.assetClasses.includes("reits") ||
                  strategy.assetClasses.includes("commodities"),
              )
              .map((strategy) => (
                <Card
                  key={strategy.id}
                  className={
                    strategy.implemented
                      ? "border-green-200 dark:border-green-800"
                      : ""
                  }
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">
                        {strategy.title}
                      </CardTitle>
                      {strategy.implemented && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Implemented
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {strategy.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(strategy.difficulty)}
                      >
                        {strategy.difficulty.charAt(0).toUpperCase() +
                          strategy.difficulty.slice(1)}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={getTimeframeColor(strategy.timeframe)}
                      >
                        {strategy.timeframe === "immediate"
                          ? "Immediate"
                          : strategy.timeframe === "short-term"
                            ? "Short-term"
                            : "Long-term"}
                      </Badge>

                      {strategy.assetClasses.map((assetClass) => (
                        <Badge
                          key={assetClass}
                          variant="outline"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {assetClass.charAt(0).toUpperCase() +
                            assetClass.slice(1)}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Potential Savings
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          ${strategy.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">
                        Learn More
                      </Button>
                      <Button size="sm" className="flex items-center">
                        {strategy.implemented ? "Review" : "Apply Strategy"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxSavingSuggestions;
