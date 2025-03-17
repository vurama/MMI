import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Download,
  Filter,
  Plus,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";

interface CapitalGainsCalculatorProps {
  year: string;
  country: string;
}

interface Transaction {
  id: string;
  asset: string;
  assetType: "stock" | "crypto" | "commodity";
  quantity: number;
  purchaseDate: string;
  purchasePrice: number;
  saleDate: string;
  salePrice: number;
  gain: number;
  gainType: "short" | "long";
  taxRate: number;
  taxAmount: number;
}

const CapitalGainsCalculator: React.FC<CapitalGainsCalculatorProps> = ({
  year,
  country,
}) => {
  const [assetFilter, setAssetFilter] = useState<string>("all");
  const [gainTypeFilter, setGainTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("gain");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: "1",
      asset: "Apple Inc. (AAPL)",
      assetType: "stock",
      quantity: 50,
      purchaseDate: "2022-01-15",
      purchasePrice: 172.5,
      saleDate: "2023-03-20",
      salePrice: 198.75,
      gain: 1312.5,
      gainType: "long",
      taxRate: 15,
      taxAmount: 196.88,
    },
    {
      id: "2",
      asset: "Bitcoin (BTC)",
      assetType: "crypto",
      quantity: 0.5,
      purchaseDate: "2022-11-10",
      purchasePrice: 18500,
      saleDate: "2023-02-05",
      salePrice: 23400,
      gain: 2450,
      gainType: "short",
      taxRate: 24,
      taxAmount: 588,
    },
    {
      id: "3",
      asset: "Gold ETF (GLD)",
      assetType: "commodity",
      quantity: 20,
      purchaseDate: "2021-08-22",
      purchasePrice: 167.8,
      saleDate: "2023-01-18",
      salePrice: 178.2,
      gain: 208,
      gainType: "long",
      taxRate: 15,
      taxAmount: 31.2,
    },
    {
      id: "4",
      asset: "Microsoft Corp. (MSFT)",
      assetType: "stock",
      quantity: 25,
      purchaseDate: "2022-12-05",
      purchasePrice: 245.3,
      saleDate: "2023-04-10",
      salePrice: 282.8,
      gain: 937.5,
      gainType: "short",
      taxRate: 24,
      taxAmount: 225,
    },
    {
      id: "5",
      asset: "Ethereum (ETH)",
      assetType: "crypto",
      quantity: 3,
      purchaseDate: "2021-05-12",
      purchasePrice: 3850,
      saleDate: "2023-03-01",
      salePrice: 1650,
      gain: -6600,
      gainType: "long",
      taxRate: 0,
      taxAmount: 0,
    },
    {
      id: "6",
      asset: "Silver (SLV)",
      assetType: "commodity",
      quantity: 100,
      purchaseDate: "2022-09-18",
      purchasePrice: 18.5,
      saleDate: "2023-02-28",
      salePrice: 21.2,
      gain: 270,
      gainType: "short",
      taxRate: 24,
      taxAmount: 64.8,
    },
    {
      id: "7",
      asset: "Tesla Inc. (TSLA)",
      assetType: "stock",
      quantity: 10,
      purchaseDate: "2021-03-10",
      purchasePrice: 673.5,
      saleDate: "2023-01-15",
      salePrice: 122.4,
      gain: -5511,
      gainType: "long",
      taxRate: 0,
      taxAmount: 0,
    },
    {
      id: "8",
      asset: "Solana (SOL)",
      assetType: "crypto",
      quantity: 50,
      purchaseDate: "2022-04-22",
      purchasePrice: 102.5,
      saleDate: "2023-03-15",
      salePrice: 21.8,
      gain: -4035,
      gainType: "long",
      taxRate: 0,
      taxAmount: 0,
    },
  ];

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((transaction) => {
      // Filter by asset type
      if (assetFilter !== "all" && transaction.assetType !== assetFilter) {
        return false;
      }

      // Filter by gain type
      if (gainTypeFilter !== "all" && transaction.gainType !== gainTypeFilter) {
        return false;
      }

      // Filter by search query
      if (
        searchQuery &&
        !transaction.asset.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      let aValue: any = a[sortField as keyof Transaction];
      let bValue: any = b[sortField as keyof Transaction];

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle number comparison
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });

  // Calculate summary statistics
  const totalGain = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.gain,
    0,
  );
  const totalTax = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.taxAmount,
    0,
  );
  const totalShortTermGain = filteredTransactions
    .filter((t) => t.gainType === "short")
    .reduce((sum, transaction) => sum + transaction.gain, 0);
  const totalLongTermGain = filteredTransactions
    .filter((t) => t.gainType === "long")
    .reduce((sum, transaction) => sum + transaction.gain, 0);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
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
                  Total Capital Gains
                </p>
                <h3
                  className={`text-2xl font-bold mt-1 ${totalGain >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  $
                  {totalGain.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <Calculator className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Estimated Tax
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  $
                  {totalTax.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                <Calculator className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Short-term Gains
                </p>
                <h3
                  className={`text-2xl font-bold mt-1 ${totalShortTermGain >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  $
                  {totalShortTermGain.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
              >
                Higher Tax
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Long-term Gains
                </p>
                <h3
                  className={`text-2xl font-bold mt-1 ${totalLongTermGain >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  $
                  {totalLongTermGain.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                Lower Tax
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={assetFilter} onValueChange={setAssetFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Asset Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="stock">Stocks</SelectItem>
              <SelectItem value="crypto">Cryptocurrencies</SelectItem>
              <SelectItem value="commodity">Commodities</SelectItem>
            </SelectContent>
          </Select>

          <Select value={gainTypeFilter} onValueChange={setGainTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Gain Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gains</SelectItem>
              <SelectItem value="short">Short-term</SelectItem>
              <SelectItem value="long">Long-term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Transaction</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Capital Gains Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("asset")}
                >
                  <div className="flex items-center">
                    Asset
                    {sortField === "asset" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("quantity")}
                >
                  <div className="flex items-center">
                    Quantity
                    {sortField === "quantity" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("purchaseDate")}
                >
                  <div className="flex items-center">
                    Purchase Date
                    {sortField === "purchaseDate" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("saleDate")}
                >
                  <div className="flex items-center">
                    Sale Date
                    {sortField === "saleDate" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("gain")}
                >
                  <div className="flex items-center">
                    Gain/Loss
                    {sortField === "gain" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Tax Rate</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("taxAmount")}
                >
                  <div className="flex items-center">
                    Tax Amount
                    {sortField === "taxAmount" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          transaction.assetType === "stock"
                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                            : transaction.assetType === "crypto"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        }
                      >
                        {transaction.assetType.charAt(0).toUpperCase() +
                          transaction.assetType.slice(1)}
                      </Badge>
                      {transaction.asset}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>
                    {new Date(transaction.purchaseDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${transaction.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(transaction.saleDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${transaction.salePrice.toFixed(2)}</TableCell>
                  <TableCell
                    className={
                      transaction.gain >= 0
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : "text-red-600 dark:text-red-400 font-medium"
                    }
                  >
                    ${transaction.gain.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        transaction.gainType === "long"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      }
                    >
                      {transaction.gainType === "long"
                        ? "Long-term"
                        : "Short-term"}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.taxRate}%</TableCell>
                  <TableCell className="font-medium">
                    ${transaction.taxAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}

              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-gray-500"
                  >
                    No transactions found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapitalGainsCalculator;
