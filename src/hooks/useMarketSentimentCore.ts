import { useState, useEffect } from "react";

interface SentimentSource {
  name: string;
  weight: number;
  data: {
    score: number;
    count: number;
  };
}

interface SentimentCoreResult {
  score: number;
  trend: number;
  sources: SentimentSource[];
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
}

// This hook provides market sentiment data for the selected market category
export function useMarketSentimentCore(category: string = "stocks") {
  const [result, setResult] = useState<SentimentCoreResult>({
    score: 65, // Default starting score
    trend: 0,
    sources: [],
    lastUpdated: new Date(),
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchSentimentData = async () => {
      if (!isMounted) return;

      setResult((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // In a production environment, this would call actual APIs
        // For demo purposes, we'll simulate the data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate sentiment data based on category
        const sentimentData = generateMockSentimentData(category);

        if (!isMounted) return;

        // Calculate the overall sentiment score (0-100 scale)
        const overallScore = calculateOverallSentiment(sentimentData);

        // Calculate trend (change from previous)
        const previousScore = result.score;
        const trendChange = overallScore - previousScore;

        setResult({
          score: overallScore,
          trend: parseFloat(trendChange.toFixed(1)),
          sources: sentimentData,
          lastUpdated: new Date(),
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching sentiment data:", error);
        setResult((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to fetch sentiment data. Please try again later.",
        }));
      }
    };

    fetchSentimentData();

    // Set up auto-refresh every 30 minutes (1800000 ms)
    const intervalId = setInterval(fetchSentimentData, 1800000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [category]);

  return result;
}

// Helper function to generate mock sentiment data based on category
function generateMockSentimentData(category: string): SentimentSource[] {
  // Base sentiment values that will be adjusted based on category
  let newsBase = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
  let twitterBase = Math.random() * 0.6 - 0.3; // -0.3 to 0.3
  let redditBase = Math.random() * 0.5 - 0.2; // -0.2 to 0.3

  // Adjust sentiment based on category
  switch (category.toLowerCase()) {
    case "stocks":
      newsBase += 0.1;
      twitterBase += 0.05;
      break;
    case "crypto":
      newsBase -= 0.05;
      twitterBase += 0.1;
      redditBase += 0.15;
      break;
    case "realestate":
      newsBase -= 0.1;
      redditBase -= 0.05;
      break;
    case "forex":
      newsBase += 0.05;
      twitterBase -= 0.1;
      break;
    default:
      // No adjustment for other categories
      break;
  }

  // Ensure values stay within -1 to 1 range
  newsBase = Math.max(-0.9, Math.min(0.9, newsBase));
  twitterBase = Math.max(-0.9, Math.min(0.9, twitterBase));
  redditBase = Math.max(-0.9, Math.min(0.9, redditBase));

  return [
    {
      name: "Google News",
      weight: 0.5, // 50% weight in overall score
      data: {
        score: newsBase,
        count: Math.floor(Math.random() * 20) + 10, // 10-30 articles
      },
    },
    {
      name: "Twitter",
      weight: 0.3, // 30% weight
      data: {
        score: twitterBase,
        count: Math.floor(Math.random() * 100) + 50, // 50-150 tweets
      },
    },
    {
      name: "Reddit",
      weight: 0.2, // 20% weight
      data: {
        score: redditBase,
        count: Math.floor(Math.random() * 30) + 5, // 5-35 posts
      },
    },
  ];
}

// Calculate overall sentiment score from multiple sources
function calculateOverallSentiment(sources: SentimentSource[]): number {
  let weightedSum = 0;
  let totalWeight = 0;

  sources.forEach((source) => {
    weightedSum += source.data.score * source.weight;
    totalWeight += source.weight;
  });

  // Convert from -1...1 scale to 0...100 scale
  const normalizedScore = (weightedSum / totalWeight + 1) / 2;
  return Math.round(normalizedScore * 100);
}
