import React, { useState } from "react";
import SearchDialog from "../dashboard/SearchDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Brain } from "lucide-react";

export default function SearchDialogStoryboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dialogQuery, setDialogQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setDialogQuery(query);
    setIsOpen(true);
  };

  // Mock sentiment data for demo
  const mockSentimentData = {
    overallScore: 65,
    sectorScores: [
      { sector: "Stocks", score: 68 },
      { sector: "Real Estate", score: 42 },
      { sector: "Crypto", score: 75 },
    ],
    historicalData: [
      { date: "2024-07-22", sentiment_score: 65, sector: "Overall" },
      { date: "2024-07-21", sentiment_score: 62, sector: "Overall" },
      { date: "2024-07-20", sentiment_score: 58, sector: "Overall" },
      { date: "2024-07-19", sentiment_score: 55, sector: "Overall" },
      { date: "2024-07-18", sentiment_score: 60, sector: "Overall" },
      { date: "2024-07-17", sentiment_score: 63, sector: "Overall" },
      { date: "2024-07-16", sentiment_score: 67, sector: "Overall" },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">AI Search Dialog</h1>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-medium mb-4">Search Interface</h2>

          <form onSubmit={handleSearch} className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or ask AI about market trends, insights, or specific assets..."
                className="pl-10 pr-20 py-6 h-14 rounded-xl border-gray-200 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-10"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">Try these example queries:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDialogQuery("What's the current market sentiment?");
                  setIsOpen(true);
                }}
              >
                Market sentiment
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDialogQuery("Show me trending stocks");
                  setIsOpen(true);
                }}
              >
                Trending stocks
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDialogQuery("Crypto market analysis");
                  setIsOpen(true);
                }}
              >
                Crypto analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDialogQuery("Real estate market trends");
                  setIsOpen(true);
                }}
              >
                Real estate trends
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-medium mb-4">Implementation Notes</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              The search dialog uses OpenAI API to process queries (API key to
              be added manually)
            </li>
            <li>
              The dialog reads data from market components to provide
              context-aware responses
            </li>
            <li>Animated overlay focuses user attention on the conversation</li>
            <li>Suggestions help users discover capabilities</li>
            <li>Chat history is maintained during the session</li>
          </ul>
        </div>
      </div>

      {/* The actual search dialog component */}
      <SearchDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        initialQuery={dialogQuery}
        marketData={null}
        sentimentData={mockSentimentData}
      />
    </div>
  );
}
