import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMarketData, useSectorMarketData } from "@/hooks/useMarketData";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

export default function MarketDataServiceStoryboard() {
  const [selectedSector, setSelectedSector] = useState("Stocks");
  const {
    marketData,
    trendingAssets,
    decliningAssets,
    isLoading,
    refreshData,
  } = useMarketData();
  const {
    sectorData,
    averageChange,
    isLoading: isSectorLoading,
  } = useSectorMarketData(selectedSector);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Market Data Service Demo</h1>
        <Button
          onClick={refreshData}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Trending Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Trending Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {trendingAssets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex justify-between items-center p-2 border-b border-gray-100"
                  >
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-sm text-gray-500">{asset.name}</div>
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {asset.change_percentage.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Declining Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              Declining Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {decliningAssets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex justify-between items-center p-2 border-b border-gray-100"
                  >
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-sm text-gray-500">{asset.name}</div>
                    </div>
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      {asset.change_percentage.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sector Data */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <Button
            variant={selectedSector === "Stocks" ? "default" : "outline"}
            onClick={() => setSelectedSector("Stocks")}
          >
            Stocks
          </Button>
          <Button
            variant={selectedSector === "Crypto" ? "default" : "outline"}
            onClick={() => setSelectedSector("Crypto")}
          >
            Crypto
          </Button>
          <Button
            variant={selectedSector === "Real Estate" ? "default" : "outline"}
            onClick={() => setSelectedSector("Real Estate")}
          >
            Real Estate
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{selectedSector} Data</CardTitle>
              <Badge
                className={
                  averageChange >= 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                Avg: {averageChange.toFixed(2)}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isSectorLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectorData.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{item.symbol}</div>
                      <div
                        className={`flex items-center ${(item.change_percentage || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {(item.change_percentage || 0) >= 0 ? (
                          <TrendingUp className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 mr-1" />
                        )}
                        {(item.change_percentage || 0).toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                    <div className="mt-1 text-sm">
                      Price: ${(item.current_price || 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Volume: {(item.volume || 0).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Market Data */}
      <Card>
        <CardHeader>
          <CardTitle>All Market Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-2">Symbol</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Sector</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Change %</th>
                  <th className="text-right p-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? [...Array(10)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td colSpan={6} className="p-2">
                          <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
                        </td>
                      </tr>
                    ))
                  : marketData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-2 font-medium">{item.symbol}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">
                          <Badge variant="outline">{item.sector}</Badge>
                        </td>
                        <td className="p-2 text-right">
                          ${(item.current_price || 0).toFixed(2)}
                        </td>
                        <td
                          className={`p-2 text-right ${(item.change_percentage || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {(item.change_percentage || 0) >= 0 ? "+" : ""}
                          {(item.change_percentage || 0).toFixed(2)}%
                        </td>
                        <td className="p-2 text-right">
                          {(item.volume || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
