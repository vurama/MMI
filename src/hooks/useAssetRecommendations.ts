import { useState, useEffect } from "react";

export interface Asset {
  symbol: string;
  name: string;
  action: "long" | "short";
  confidence: number;
  price?: string;
  change?: string;
}

// This hook provides asset recommendations based on the selected market category
export function useAssetRecommendations(category: string = "stocks") {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAssetData = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate mock asset data based on category
        const assetData = generateMockAssetData(category);

        if (!isMounted) return;

        setAssets(assetData);
        setIsLoading(false);
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching asset recommendations:", error);
        setError(
          "Failed to fetch asset recommendations. Please try again later.",
        );
        setIsLoading(false);
      }
    };

    fetchAssetData();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { assets, isLoading, error };
}

// Helper function to generate mock asset data based on category
function generateMockAssetData(category: string): Asset[] {
  // Different assets based on category
  switch (category.toLowerCase()) {
    case "stocks":
      return [
        {
          symbol: "NVDA",
          name: "NVIDIA Corporation",
          action: "long",
          confidence: 92,
          price: "$945.70",
          change: "+3.2%",
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          action: "long",
          confidence: 88,
          price: "$425.22",
          change: "+1.8%",
        },
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          action: "long",
          confidence: 76,
          price: "$182.15",
          change: "+0.5%",
        },
        {
          symbol: "TSLA",
          name: "Tesla, Inc.",
          action: "short",
          confidence: 65,
          price: "$172.63",
          change: "-2.1%",
        },
        {
          symbol: "AMZN",
          name: "Amazon.com, Inc.",
          action: "long",
          confidence: 82,
          price: "$178.75",
          change: "+1.2%",
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          action: "long",
          confidence: 79,
          price: "$165.30",
          change: "+0.8%",
        },
        {
          symbol: "META",
          name: "Meta Platforms, Inc.",
          action: "long",
          confidence: 84,
          price: "$485.92",
          change: "+2.4%",
        },
        {
          symbol: "INTC",
          name: "Intel Corporation",
          action: "short",
          confidence: 71,
          price: "$30.18",
          change: "-1.5%",
        },
        {
          symbol: "AMD",
          name: "Advanced Micro Devices, Inc.",
          action: "long",
          confidence: 80,
          price: "$158.32",
          change: "+2.7%",
        },
        {
          symbol: "NFLX",
          name: "Netflix, Inc.",
          action: "long",
          confidence: 77,
          price: "$632.80",
          change: "+1.1%",
        },
      ];
    case "crypto":
      return [
        {
          symbol: "BTC",
          name: "Bitcoin",
          action: "long",
          confidence: 85,
          price: "$63,245",
          change: "+2.8%",
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          action: "long",
          confidence: 82,
          price: "$3,478",
          change: "+3.5%",
        },
        {
          symbol: "SOL",
          name: "Solana",
          action: "long",
          confidence: 78,
          price: "$142.65",
          change: "+5.2%",
        },
        {
          symbol: "ADA",
          name: "Cardano",
          action: "short",
          confidence: 62,
          price: "$0.45",
          change: "-1.8%",
        },
        {
          symbol: "DOT",
          name: "Polkadot",
          action: "short",
          confidence: 58,
          price: "$6.82",
          change: "-2.3%",
        },
        {
          symbol: "AVAX",
          name: "Avalanche",
          action: "long",
          confidence: 76,
          price: "$35.24",
          change: "+4.1%",
        },
        {
          symbol: "LINK",
          name: "Chainlink",
          action: "long",
          confidence: 80,
          price: "$14.92",
          change: "+3.7%",
        },
        {
          symbol: "DOGE",
          name: "Dogecoin",
          action: "short",
          confidence: 45,
          price: "$0.12",
          change: "-4.2%",
        },
        {
          symbol: "MATIC",
          name: "Polygon",
          action: "long",
          confidence: 72,
          price: "$0.58",
          change: "+2.1%",
        },
        {
          symbol: "UNI",
          name: "Uniswap",
          action: "long",
          confidence: 68,
          price: "$7.45",
          change: "+1.5%",
        },
      ];
    case "realestate":
      return [
        {
          symbol: "VNQ",
          name: "Vanguard Real Estate ETF",
          action: "long",
          confidence: 74,
          price: "$84.25",
          change: "+0.8%",
        },
        {
          symbol: "SPG",
          name: "Simon Property Group",
          action: "long",
          confidence: 70,
          price: "$148.32",
          change: "+1.2%",
        },
        {
          symbol: "AMT",
          name: "American Tower Corp",
          action: "long",
          confidence: 76,
          price: "$195.45",
          change: "+0.9%",
        },
        {
          symbol: "PLD",
          name: "Prologis Inc",
          action: "short",
          confidence: 62,
          price: "$124.18",
          change: "-0.7%",
        },
        {
          symbol: "WELL",
          name: "Welltower Inc",
          action: "long",
          confidence: 68,
          price: "$92.75",
          change: "+0.5%",
        },
        {
          symbol: "EQIX",
          name: "Equinix Inc",
          action: "long",
          confidence: 72,
          price: "$782.30",
          change: "+1.1%",
        },
        {
          symbol: "O",
          name: "Realty Income Corp",
          action: "short",
          confidence: 58,
          price: "$52.40",
          change: "-1.2%",
        },
        {
          symbol: "DLR",
          name: "Digital Realty Trust",
          action: "long",
          confidence: 66,
          price: "$142.85",
          change: "+0.6%",
        },
        {
          symbol: "PSA",
          name: "Public Storage",
          action: "long",
          confidence: 64,
          price: "$284.92",
          change: "+0.3%",
        },
        {
          symbol: "AVB",
          name: "AvalonBay Communities",
          action: "short",
          confidence: 55,
          price: "$186.24",
          change: "-0.8%",
        },
      ];
    default:
      return [];
  }
}
