import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Info,
  TrendingDown,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

interface GlobalTaxMapProps {
  year: string;
  selectedCountry: string;
}

interface CountryTaxInfo {
  id: string;
  country: string;
  region: string;
  capitalGainsRate: {
    short: number;
    long: number;
  };
  cryptoTaxation: string;
  taxTreaty: boolean;
  recentChanges?: string;
  upcomingChanges?: string;
  favorability: "favorable" | "neutral" | "unfavorable";
}

const GlobalTaxMap: React.FC<GlobalTaxMapProps> = ({
  year,
  selectedCountry,
}) => {
  // Mock country tax data
  const countryTaxData: CountryTaxInfo[] = [
    {
      id: "us",
      country: "United States",
      region: "North America",
      capitalGainsRate: {
        short: 37,
        long: 20,
      },
      cryptoTaxation: "Property",
      taxTreaty: true,
      recentChanges: "Increased reporting requirements for crypto transactions",
      upcomingChanges:
        "Proposed increase in capital gains tax for high earners",
      favorability: "neutral",
    },
    {
      id: "sg",
      country: "Singapore",
      region: "Asia",
      capitalGainsRate: {
        short: 0,
        long: 0,
      },
      cryptoTaxation: "No capital gains tax",
      taxTreaty: true,
      upcomingChanges: "Potential GST on crypto transactions in 2023",
      favorability: "favorable",
    },
    {
      id: "pt",
      country: "Portugal",
      region: "Europe",
      capitalGainsRate: {
        short: 28,
        long: 28,
      },
      cryptoTaxation: "Previously exempt, now taxed at 28%",
      taxTreaty: true,
      recentChanges: "Ended crypto tax exemption in 2023",
      favorability: "neutral",
    },
    {
      id: "de",
      country: "Germany",
      region: "Europe",
      capitalGainsRate: {
        short: 25,
        long: 0,
      },
      cryptoTaxation: "Tax-free after 1 year holding",
      taxTreaty: true,
      favorability: "favorable",
    },
    {
      id: "jp",
      country: "Japan",
      region: "Asia",
      capitalGainsRate: {
        short: 55,
        long: 55,
      },
      cryptoTaxation: "Miscellaneous income",
      taxTreaty: true,
      recentChanges: "Simplified crypto reporting in 2023",
      favorability: "unfavorable",
    },
    {
      id: "ch",
      country: "Switzerland",
      region: "Europe",
      capitalGainsRate: {
        short: 0,
        long: 0,
      },
      cryptoTaxation: "Wealth tax applies",
      taxTreaty: true,
      favorability: "favorable",
    },
    {
      id: "uk",
      country: "United Kingdom",
      region: "Europe",
      capitalGainsRate: {
        short: 20,
        long: 20,
      },
      cryptoTaxation: "Subject to capital gains tax",
      taxTreaty: true,
      recentChanges: "Reduced annual exempt amount for capital gains",
      favorability: "neutral",
    },
    {
      id: "au",
      country: "Australia",
      region: "Oceania",
      capitalGainsRate: {
        short: 45,
        long: 22.5,
      },
      cryptoTaxation: "Subject to capital gains tax",
      taxTreaty: true,
      recentChanges: "Enhanced crypto transaction tracking",
      favorability: "neutral",
    },
    {
      id: "ca",
      country: "Canada",
      region: "North America",
      capitalGainsRate: {
        short: 26.5,
        long: 26.5,
      },
      cryptoTaxation: "50% of gains taxable",
      taxTreaty: true,
      favorability: "neutral",
    },
    {
      id: "ae",
      country: "UAE",
      region: "Middle East",
      capitalGainsRate: {
        short: 0,
        long: 0,
      },
      cryptoTaxation: "No capital gains tax",
      taxTreaty: false,
      recentChanges: "Introduced corporate tax in 2023",
      favorability: "favorable",
    },
    {
      id: "hk",
      country: "Hong Kong",
      region: "Asia",
      capitalGainsRate: {
        short: 0,
        long: 0,
      },
      cryptoTaxation: "No capital gains tax",
      taxTreaty: true,
      upcomingChanges: "Potential regulatory framework for crypto in 2024",
      favorability: "favorable",
    },
    {
      id: "br",
      country: "Brazil",
      region: "South America",
      capitalGainsRate: {
        short: 22.5,
        long: 15,
      },
      cryptoTaxation: "Subject to capital gains tax",
      taxTreaty: false,
      recentChanges: "New reporting requirements for crypto exchanges",
      favorability: "neutral",
    },
  ];

  const getFavorabilityColor = (favorability: string) => {
    switch (favorability) {
      case "favorable":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "neutral":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "unfavorable":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Globe className="h-6 w-6 mr-2 text-indigo-500" />
                Global Tax Comparison
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Compare tax treatments across different jurisdictions
              </p>
            </div>

            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                  <SelectItem value="middle-east">Middle East</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Favorability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="favorable">Favorable</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="unfavorable">Unfavorable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Comparison Tabs */}
      <Tabs defaultValue="comparison">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Country Comparison</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Taxation</TabsTrigger>
          <TabsTrigger value="changes">Recent Changes</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryTaxData.map((country) => (
              <Card
                key={country.id}
                className={
                  country.id === selectedCountry.split("-").join("")
                    ? "border-indigo-300 dark:border-indigo-700"
                    : ""
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">
                      {country.country}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={getFavorabilityColor(country.favorability)}
                    >
                      {country.favorability.charAt(0).toUpperCase() +
                        country.favorability.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {country.region}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Short-term Rate
                        </div>
                        <div className="text-xl font-bold mt-1">
                          {country.capitalGainsRate.short}%
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Long-term Rate
                        </div>
                        <div className="text-xl font-bold mt-1">
                          {country.capitalGainsRate.long}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Crypto Taxation
                      </div>
                      <div className="text-sm font-medium mt-1">
                        {country.cryptoTaxation}
                      </div>
                    </div>

                    {(country.recentChanges || country.upcomingChanges) && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {country.recentChanges && (
                          <div className="mb-2">
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Recent Changes
                            </div>
                            <div className="text-sm mt-1">
                              {country.recentChanges}
                            </div>
                          </div>
                        )}

                        {country.upcomingChanges && (
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Upcoming Changes
                            </div>
                            <div className="text-sm mt-1">
                              {country.upcomingChanges}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className={
                            country.taxTreaty
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {country.taxTreaty
                            ? "Tax Treaty Available"
                            : "No Tax Treaty"}
                        </Badge>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <span>Details</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Info className="h-5 w-5 mr-2 text-indigo-500" />
                Cryptocurrency Tax Treatment by Country
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {countryTaxData.map((country) => (
                  <div
                    key={country.id}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-center mb-2 md:mb-0">
                        <Badge
                          variant="outline"
                          className={getFavorabilityColor(country.favorability)}
                        >
                          {country.favorability.charAt(0).toUpperCase() +
                            country.favorability.slice(1)}
                        </Badge>
                        <span className="font-medium ml-2">
                          {country.country}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          ({country.region})
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm mr-4">
                          <span className="text-gray-500 dark:text-gray-400">
                            Short-term:
                          </span>
                          <span className="font-medium ml-1">
                            {country.capitalGainsRate.short}%
                          </span>
                        </div>

                        <div className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Long-term:
                          </span>
                          <span className="font-medium ml-1">
                            {country.capitalGainsRate.long}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-sm">{country.cryptoTaxation}</div>

                      {country.recentChanges && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-amber-500" />
                          {country.recentChanges}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changes" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                Recent & Upcoming Tax Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3">Recent Changes</h3>
                  <div className="space-y-3">
                    {countryTaxData
                      .filter((country) => country.recentChanges)
                      .map((country) => (
                        <div
                          key={`recent-${country.id}`}
                          className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge
                                variant="outline"
                                className={getFavorabilityColor(
                                  country.favorability,
                                )}
                              >
                                {country.country}
                              </Badge>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              {year}
                            </Badge>
                          </div>
                          <p className="text-sm mt-2">
                            {country.recentChanges}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3">
                    Upcoming Changes
                  </h3>
                  <div className="space-y-3">
                    {countryTaxData
                      .filter((country) => country.upcomingChanges)
                      .map((country) => (
                        <div
                          key={`upcoming-${country.id}`}
                          className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge
                                variant="outline"
                                className={getFavorabilityColor(
                                  country.favorability,
                                )}
                              >
                                {country.country}
                              </Badge>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            >
                              Proposed
                            </Badge>
                          </div>
                          <p className="text-sm mt-2">
                            {country.upcomingChanges}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalTaxMap;
