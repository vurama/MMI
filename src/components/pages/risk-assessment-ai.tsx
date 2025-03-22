import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Shield,
  Info,
} from "lucide-react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

const RiskAssessmentAI: React.FC = () => {
  const [riskScore, setRiskScore] = useState(65);
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [portfolioRisk, setPortfolioRisk] = useState(72);

  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-green-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-orange-500";
    return "bg-red-500";
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Moderate Risk";
    if (score < 80) return "High Risk";
    return "Very High Risk";
  };

  const marketConditions = [
    { name: "S&P 500", trend: "up", change: "+0.8%", risk: 42 },
    { name: "NASDAQ", trend: "up", change: "+1.2%", risk: 55 },
    { name: "Crypto Market", trend: "down", change: "-2.5%", risk: 85 },
    { name: "Real Estate", trend: "neutral", change: "+0.1%", risk: 38 },
    { name: "Commodities", trend: "up", change: "+1.5%", risk: 47 },
  ];

  const riskFactors = [
    {
      factor: "Market Volatility",
      impact: 75,
      description: "Current market conditions show increased volatility",
    },
    {
      factor: "Interest Rates",
      impact: 65,
      description: "Rising interest rates affecting asset valuations",
    },
    {
      factor: "Geopolitical Events",
      impact: 80,
      description: "Ongoing conflicts creating market uncertainty",
    },
    {
      factor: "Sector Concentration",
      impact: 55,
      description: "Your portfolio has moderate sector concentration",
    },
    {
      factor: "Liquidity Risk",
      impact: 40,
      description: "Most assets in your portfolio have good liquidity",
    },
  ];

  const recommendations = [
    "Consider diversifying into more defensive sectors",
    "Reduce exposure to high-volatility tech stocks",
    "Maintain a cash reserve of 15-20% for opportunities",
    "Add some inflation-protected securities to your portfolio",
    "Review and potentially reduce cryptocurrency allocation",
  ];

  return (
    <DashboardLayout activeItem="Risk Assessment AI">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Risk Assessment AI
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered analysis of your portfolio risk and market conditions
            </p>
          </div>
          <Button className="gap-2">
            <Shield className="h-4 w-4" />
            Generate Full Risk Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Your Risk Score
              </CardTitle>
              <CardDescription>
                Overall portfolio risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center ${getRiskColor(riskScore)} text-white mb-4`}
                >
                  <span className="text-3xl font-bold">{riskScore}</span>
                </div>
                <Badge variant="outline" className="text-sm font-medium">
                  {getRiskLabel(riskScore)}
                </Badge>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Your portfolio has a {getRiskLabel(riskScore).toLowerCase()}{" "}
                  profile based on current market conditions and your holdings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Risk Tolerance Settings
              </CardTitle>
              <CardDescription>Adjust your risk preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Your Risk Tolerance</Label>
                    <span className="text-sm font-medium">
                      {riskTolerance}%
                    </span>
                  </div>
                  <Slider
                    value={[riskTolerance]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setRiskTolerance(value[0])}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Label htmlFor="investment-horizon" className="mb-2 block">
                    Investment Horizon
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="investment-horizon">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">
                        Short Term (&lt; 2 years)
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium Term (2-5 years)
                      </SelectItem>
                      <SelectItem value="long">Long Term (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Update Preferences
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Market Conditions
              </CardTitle>
              <CardDescription>
                Current risk levels across markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[220px] pr-4">
                <div className="space-y-4">
                  {marketConditions.map((market, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {market.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : market.trend === "down" ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <BarChart3 className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className="font-medium">{market.name}</span>
                        </div>
                        <span
                          className={`text-sm ${market.trend === "up" ? "text-green-500" : market.trend === "down" ? "text-red-500" : "text-yellow-500"}`}
                        >
                          {market.change}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={market.risk} className="h-2" />
                        <span className="text-xs text-muted-foreground">
                          {market.risk}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Risk Factors
              </CardTitle>
              <CardDescription>
                Key factors affecting your portfolio risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{factor.factor}</span>
                        <Badge
                          variant={
                            factor.impact > 70
                              ? "destructive"
                              : factor.impact > 50
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {factor.impact}% Impact
                        </Badge>
                      </div>
                      <Progress value={factor.impact} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {factor.description}
                      </p>
                      {index < riskFactors.length - 1 && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions to optimize your risk profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {recommendations.map((recommendation, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-950/50 rounded-full p-1 mt-0.5">
                        <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm">{recommendation}</p>
                        {index < recommendations.length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Generate More Recommendations
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Asset-Specific Risk Analysis</CardTitle>
            <CardDescription>
              Analyze risk for specific assets in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stocks">
              <TabsList className="mb-4">
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="etfs">ETFs</TabsTrigger>
                <TabsTrigger value="bonds">Bonds</TabsTrigger>
              </TabsList>

              <TabsContent value="stocks" className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="stock-search" className="mb-2 block">
                      Search Stock
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="stock-search"
                        placeholder="Enter ticker or company name"
                      />
                      <Button>Analyze</Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="risk-timeframe" className="mb-2 block">
                      Analysis Timeframe
                    </Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="risk-timeframe">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">
                          Short Term (30 days)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium Term (90 days)
                        </SelectItem>
                        <SelectItem value="long">
                          Long Term (1 year+)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-1">
                      Select an asset to analyze
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Search for a stock or select from your portfolio to see
                      detailed risk metrics
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crypto">
                <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-1">
                      Cryptocurrency Risk Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Search for a cryptocurrency to analyze its risk profile
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="etfs">
                <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-1">
                      ETF Risk Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Search for an ETF to analyze its risk profile
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bonds">
                <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-1">
                      Bond Risk Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Search for a bond to analyze its risk profile
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RiskAssessmentAI;
