import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Calendar,
  DollarSign,
  Percent,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface TaxOverviewPanelProps {
  year: string;
  country: string;
}

const TaxOverviewPanel: React.FC<TaxOverviewPanelProps> = ({
  year,
  country,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tax Breakdown */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-indigo-500" />
              Tax Breakdown by Asset Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Assets</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="commodities">Commodities</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                        <span className="text-sm font-medium">Stocks</span>
                      </div>
                      <span className="text-sm font-medium">
                        $7,250 (58.2%)
                      </span>
                    </div>
                    <Progress value={58.2} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Cryptocurrencies
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        $3,850 (30.9%)
                      </span>
                    </div>
                    <Progress
                      value={30.9}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-blue-500 rounded-full"></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm font-medium">Commodities</span>
                      </div>
                      <span className="text-sm font-medium">
                        $1,350 (10.9%)
                      </span>
                    </div>
                    <Progress
                      value={10.9}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-amber-500 rounded-full"></div>
                    </Progress>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Effective Tax Rate
                    </div>
                    <div className="text-2xl font-bold mt-1">24.8%</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500">+2.3%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last year
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Tax Efficiency Score
                    </div>
                    <div className="text-2xl font-bold mt-1">72/100</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">+5 points</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last quarter
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stocks" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Long-term Capital Gains
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        $4,850 (66.9%)
                      </span>
                    </div>
                    <Progress
                      value={66.9}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-green-500 rounded-full"></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Short-term Capital Gains
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        $2,400 (33.1%)
                      </span>
                    </div>
                    <Progress
                      value={33.1}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-red-500 rounded-full"></div>
                    </Progress>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Effective Tax Rate
                    </div>
                    <div className="text-2xl font-bold mt-1">22.5%</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500">+1.8%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last year
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Tax Efficiency Score
                    </div>
                    <div className="text-2xl font-bold mt-1">78/100</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">+3 points</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last quarter
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="pt-4">
                {/* Similar content structure for crypto */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Long-term Capital Gains
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        $1,250 (32.5%)
                      </span>
                    </div>
                    <Progress
                      value={32.5}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-blue-500 rounded-full"></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Short-term Capital Gains
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        $2,600 (67.5%)
                      </span>
                    </div>
                    <Progress
                      value={67.5}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-purple-500 rounded-full"></div>
                    </Progress>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Effective Tax Rate
                    </div>
                    <div className="text-2xl font-bold mt-1">28.3%</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500">+4.2%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last year
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Tax Efficiency Score
                    </div>
                    <div className="text-2xl font-bold mt-1">65/100</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">+8 points</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last quarter
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="commodities" className="pt-4">
                {/* Similar content structure for commodities */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Long-term Capital Gains
                        </span>
                      </div>
                      <span className="text-sm font-medium">$950 (70.4%)</span>
                    </div>
                    <Progress
                      value={70.4}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-amber-500 rounded-full"></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-sm font-medium">
                          Short-term Capital Gains
                        </span>
                      </div>
                      <span className="text-sm font-medium">$400 (29.6%)</span>
                    </div>
                    <Progress
                      value={29.6}
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    >
                      <div className="h-full bg-orange-500 rounded-full"></div>
                    </Progress>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Effective Tax Rate
                    </div>
                    <div className="text-2xl font-bold mt-1">21.2%</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">-1.5%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last year
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Tax Efficiency Score
                    </div>
                    <div className="text-2xl font-bold mt-1">82/100</div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">+4 points</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        from last quarter
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tax Calendar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
              Tax Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2"
                    >
                      Urgent
                    </Badge>
                    <span className="font-medium text-sm">
                      Q1 Estimated Tax
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Apr 15, 2023</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Federal estimated tax payment for Q1 due
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mr-2"
                    >
                      Upcoming
                    </Badge>
                    <span className="font-medium text-sm">
                      Q2 Estimated Tax
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Jun 15, 2023</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Federal estimated tax payment for Q2 due
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-2"
                    >
                      Planning
                    </Badge>
                    <span className="font-medium text-sm">
                      Tax Loss Harvesting
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Dec 31, 2023</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Last day for tax loss harvesting for current year
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mr-2"
                    >
                      Crypto
                    </Badge>
                    <span className="font-medium text-sm">
                      Form 8949 Deadline
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Apr 15, 2024</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Deadline for reporting crypto transactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Rate Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Percent className="h-5 w-5 mr-2 text-indigo-500" />
            Applicable Tax Rates for {year} -{" "}
            {country
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-base font-medium mb-3">
                Short-term Capital Gains
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>$0 - $10,275</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$10,276 - $41,775</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$41,776 - $89,075</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$89,076 - $170,050</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$170,051 - $215,950</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$215,951 - $539,900</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$539,901+</span>
                  <span className="font-medium">37%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-3">
                Long-term Capital Gains
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>$0 - $41,675</span>
                  <span className="font-medium">0%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$41,676 - $459,750</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$459,751+</span>
                  <span className="font-medium">20%</span>
                </div>
              </div>

              <h3 className="text-base font-medium mb-3 mt-6">
                Net Investment Income Tax
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Income over $200,000 (single)</span>
                  <span className="font-medium">3.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Income over $250,000 (married)</span>
                  <span className="font-medium">3.8%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-3">
                Cryptocurrency Specific
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trading crypto-to-crypto</span>
                  <span className="font-medium">Taxable Event</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mining income</span>
                  <span className="font-medium">Ordinary Income</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Staking rewards</span>
                  <span className="font-medium">Ordinary Income</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>NFT sales</span>
                  <span className="font-medium">Collectibles (28%)</span>
                </div>
              </div>

              <h3 className="text-base font-medium mb-3 mt-6">
                Commodities Specific
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Section 1256 contracts</span>
                  <span className="font-medium">60/40 Rule</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Precious metals</span>
                  <span className="font-medium">Collectibles (28%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxOverviewPanel;
