import { useState, useEffect } from "react";

export interface MarketData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  lastUpdated: Date;
}

export interface RealTimeMarketDataResult {
  data: MarketData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date;
}

// This hook fetches real-time market data for the selected category
export function useRealTimeMarketData(category: string = "stocks") {
  const [result, setResult] = useState<RealTimeMarketDataResult>({
    data: [],
    isLoading: true,
    error: null,
    lastUpdated: new Date(),
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMarketData = async () => {
      if (!isMounted) return;

      setResult((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Select symbols based on category
        const symbols = getSymbolsForCategory(category);
        const symbolsString = symbols.join(",");

        // Using Alpha Vantage API (free tier - limited to 5 API calls per minute and 500 per day)
        // You would need to replace 'demo' with an actual API key for production use
        const apiKey = "demo"; // For demo purposes

        // For stocks and indices
        if (category === "stocks" || category === "indices") {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbolsString.split(",")[0]}&apikey=${apiKey}`,
            { signal },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch market data");
          }

          const data = await response.json();

          // Process the data
          const processedData = processAlphaVantageData(data, category);

          if (!isMounted) return;

          setResult({
            data: processedData,
            isLoading: false,
            error: null,
            lastUpdated: new Date(),
          });
        }
        // For crypto
        else if (category === "crypto") {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`,
            { signal },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch crypto data");
          }

          const data = await response.json();

          // Process the data
          const processedData = processCryptoData(data);

          if (!isMounted) return;

          setResult({
            data: processedData,
            isLoading: false,
            error: null,
            lastUpdated: new Date(),
          });
        }
        // For forex
        else if (category === "forex") {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=${apiKey}`,
            { signal },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch forex data");
          }

          const data = await response.json();

          // Process the data
          const processedData = processForexData(data);

          if (!isMounted) return;

          setResult({
            data: processedData,
            isLoading: false,
            error: null,
            lastUpdated: new Date(),
          });
        }
        // For real estate, we'll use mock data as there's no free real-time API
        else {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Generate mock data
          const mockData = generateMockData(category);

          if (!isMounted) return;

          setResult({
            data: mockData,
            isLoading: false,
            error: null,
            lastUpdated: new Date(),
          });
        }
      } catch (error) {
        if (!isMounted) return;

        console.error("Error fetching market data:", error);

        // Fall back to mock data on error
        const mockData = generateMockData(category);

        setResult({
          data: mockData,
          isLoading: false,
          error: "Using demo data. For production, please use a valid API key.",
          lastUpdated: new Date(),
        });
      }
    };

    fetchMarketData();

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchMarketData, 60000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(intervalId);
    };
  }, [category]);

  return result;
}

// Helper function to get symbols for each category
function getSymbolsForCategory(category: string): string[] {
  switch (category.toLowerCase()) {
    case "stocks":
      return ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
    case "crypto":
      return ["BTC", "ETH", "SOL", "ADA", "XRP"];
    case "indices":
      return ["SPY", "QQQ", "DIA", "IWM", "VIX"];
    case "forex":
      return ["EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD"];
    case "realestate":
      return ["VNQ", "IYR", "XLRE", "AMT", "PLD"];
    default:
      return ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
  }
}

// Process Alpha Vantage stock/index data
function processAlphaVantageData(data: any, category: string): MarketData[] {
  // For demo purposes, we'll generate mock data if the API returns limited data
  if (
    !data ||
    !data["Global Quote"] ||
    Object.keys(data["Global Quote"]).length === 0
  ) {
    return generateMockData(category);
  }

  const quote = data["Global Quote"];
  const symbol = quote["01. symbol"];
  const price = quote["05. price"];
  const change = quote["09. change"];
  const changePercent = quote["10. change percent"];

  return [
    {
      symbol,
      price: `$${parseFloat(price).toFixed(2)}`,
      change: `${parseFloat(change) >= 0 ? "+" : ""}${parseFloat(change).toFixed(2)}`,
      changePercent: changePercent,
      lastUpdated: new Date(),
    },
  ];
}

// Process crypto data
function processCryptoData(data: any): MarketData[] {
  // For demo purposes, we'll generate mock data if the API returns limited data
  if (!data || !data["Realtime Currency Exchange Rate"]) {
    return generateMockData("crypto");
  }

  const exchangeRate = data["Realtime Currency Exchange Rate"];
  const fromCurrency = exchangeRate["1. From_Currency Code"];
  const price = exchangeRate["5. Exchange Rate"];

  // We don't get change data from this endpoint, so we'll simulate it
  const change = (Math.random() * 2 - 1) * 1000; // Random change between -1000 and 1000
  const changePercent = `${((change / parseFloat(price)) * 100).toFixed(2)}%`;

  return [
    {
      symbol: fromCurrency,
      price: `$${parseFloat(price).toFixed(2)}`,
      change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}`,
      changePercent: `${change >= 0 ? "+" : ""}${changePercent}`,
      lastUpdated: new Date(),
    },
  ];
}

// Process forex data
function processForexData(data: any): MarketData[] {
  // For demo purposes, we'll generate mock data if the API returns limited data
  if (!data || !data["Realtime Currency Exchange Rate"]) {
    return generateMockData("forex");
  }

  const exchangeRate = data["Realtime Currency Exchange Rate"];
  const fromCurrency = exchangeRate["1. From_Currency Code"];
  const toCurrency = exchangeRate["3. To_Currency Code"];
  const price = exchangeRate["5. Exchange Rate"];

  // We don't get change data from this endpoint, so we'll simulate it
  const change = Math.random() * 0.02 - 0.01; // Random change between -0.01 and 0.01
  const changePercent = `${((change / parseFloat(price)) * 100).toFixed(2)}%`;

  return [
    {
      symbol: `${fromCurrency}/${toCurrency}`,
      price: parseFloat(price).toFixed(4),
      change: `${change >= 0 ? "+" : ""}${change.toFixed(4)}`,
      changePercent: `${change >= 0 ? "+" : ""}${changePercent}`,
      lastUpdated: new Date(),
    },
  ];
}

// Generate mock market data
function generateMockData(category: string): MarketData[] {
  const symbols = getSymbolsForCategory(category);

  return symbols.map((symbol) => {
    // Generate random price and change based on category
    let basePrice = 0;
    let changeRange = 0;

    switch (category.toLowerCase()) {
      case "stocks":
        basePrice = Math.random() * 500 + 50; // $50-$550
        changeRange = basePrice * 0.05; // 5% of price
        break;
      case "crypto":
        if (symbol === "BTC") {
          basePrice = Math.random() * 5000 + 60000; // $60,000-$65,000
        } else if (symbol === "ETH") {
          basePrice = Math.random() * 500 + 3000; // $3,000-$3,500
        } else {
          basePrice = Math.random() * 100 + 10; // $10-$110
        }
        changeRange = basePrice * 0.08; // 8% of price (crypto is more volatile)
        break;
      case "indices":
        if (symbol === "SPY") {
          basePrice = Math.random() * 50 + 450; // $450-$500
        } else if (symbol === "QQQ") {
          basePrice = Math.random() * 50 + 380; // $380-$430
        } else {
          basePrice = Math.random() * 1000 + 1000; // $1,000-$2,000
        }
        changeRange = basePrice * 0.02; // 2% of price
        break;
      case "forex":
        basePrice = Math.random() * 0.1 + 1; // 1.0-1.1 for major pairs
        changeRange = basePrice * 0.01; // 1% of price
        break;
      case "realestate":
        basePrice = Math.random() * 50 + 80; // $80-$130 for REITs
        changeRange = basePrice * 0.03; // 3% of price
        break;
      default:
        basePrice = Math.random() * 100 + 50; // $50-$150
        changeRange = basePrice * 0.04; // 4% of price
    }

    const change = (Math.random() * 2 - 1) * changeRange; // Random change between -changeRange and +changeRange
    const changePercent = (change / basePrice) * 100;

    // Format based on category
    let formattedPrice = "";
    let formattedChange = "";

    if (category === "forex") {
      formattedPrice = basePrice.toFixed(4);
      formattedChange = change.toFixed(4);
    } else {
      formattedPrice = `$${basePrice.toFixed(2)}`;
      formattedChange = `${change >= 0 ? "+" : ""}${change.toFixed(2)}`;
    }

    return {
      symbol,
      price: formattedPrice,
      change: formattedChange,
      changePercent: `${change >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
      lastUpdated: new Date(),
    };
  });
}
