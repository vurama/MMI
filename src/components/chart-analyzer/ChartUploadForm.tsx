import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ChartUploadFormProps {
  onSubmit: (data: {
    chartFile: File;
    category: string;
    ticker: string;
    consent: boolean;
  }) => void;
  isSubmitting: boolean;
  isPendingAnalysis: boolean;
}

const ChartUploadForm: React.FC<ChartUploadFormProps> = ({
  onSubmit,
  isSubmitting,
  isPendingAnalysis,
}) => {
  const [chartFile, setChartFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [ticker, setTicker] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setChartFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chartFile) {
      setError("Please upload a chart image");
      return;
    }

    if (!category) {
      setError("Please select a category");
      return;
    }

    if (!ticker) {
      setError("Please enter a ticker symbol");
      return;
    }

    if (!consent) {
      setError("Please accept the data usage agreement");
      return;
    }

    onSubmit({ chartFile, category, ticker, consent });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {isPendingAnalysis && (
            <Alert className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Analysis in progress</AlertTitle>
              <AlertDescription>
                You have a chart currently being analyzed. Please wait for the
                results before submitting another chart.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="chart-upload" className="text-sm font-medium">
              Upload Chart Image (Max 5MB)
            </Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <Input
                id="chart-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isSubmitting || isPendingAnalysis}
              />
              <label
                htmlFor="chart-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {chartFile
                    ? chartFile.name
                    : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Chart Category
              </Label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={isSubmitting || isPendingAnalysis}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="commodities">Commodities</SelectItem>
                  <SelectItem value="indices">Indices</SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                  <SelectItem value="realestate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-medium">
                Ticker Symbol
              </Label>
              <Input
                id="ticker"
                placeholder="e.g., AAPL, BTC, EUR/USD"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                disabled={isSubmitting || isPendingAnalysis}
              />
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              disabled={isSubmitting || isPendingAnalysis}
              className="mt-1"
            />
            <Label
              htmlFor="consent"
              className="text-sm text-gray-600 dark:text-gray-400 font-normal"
            >
              I consent that my uploaded chart may be used for improving
              analysis models and services.
            </Label>
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={isSubmitting || isPendingAnalysis}
          >
            {isSubmitting ? "Submitting..." : "Analyze Chart"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChartUploadForm;
