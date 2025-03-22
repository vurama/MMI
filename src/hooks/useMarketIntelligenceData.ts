import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabase";

// Define types for the market intelligence data
export interface MarketMetric {
  title: string;
  score: number;
  trend: number;
  analysis: string;
  aiSummary: string;
}

export interface TopAsset {
  symbol: string;
  name: string;
  action: "long" | "short";
  confidence: number;
  price: string;
  change: string;
}

export interface MarketSentiment {
  score: number;
  trend: number;
  timeframe: string;
  analysis: string;
}

export interface MarketIntelligenceData {
  overallSentiment: {
    stocks: MarketSentiment;
    crypto: MarketSentiment;
    indices: MarketSentiment;
    forex: MarketSentiment;
    realestate: MarketSentiment;
  };
  marketMetrics: {
    stocks: MarketMetric[];
    crypto: MarketMetric[];
    indices: MarketMetric[];
    forex: MarketMetric[];
    realestate: MarketMetric[];
  };
  topAssetsByMarket: {
    stocks: TopAsset[];
    crypto: TopAsset[];
    indices: TopAsset[];
    forex: TopAsset[];
    realestate: TopAsset[];
  };
}

// Default data to use while loading or if the API request fails
const defaultData: MarketIntelligenceData = {
  overallSentiment: {
    stocks: {
      score: 67,
      trend: 1.2,
      timeframe: "14 days",
      analysis:
        "The aggregated market metrics indicate a moderately bullish outlook for stocks over the next two weeks. Institutional positioning shows accumulation in technology and financial sectors, while retail sentiment remains cautiously optimistic. The weakening dollar is likely to support multinational earnings. Key risks include potential Fed policy shifts and geopolitical tensions that could introduce volatility.",
    },
    crypto: {
      score: 58,
      trend: -2.5,
      timeframe: "14 days",
      analysis:
        "Cryptocurrency markets are showing mixed signals with a slightly bearish bias for the next two weeks. Bitcoin's relative strength compared to altcoins suggests a defensive positioning by investors. Regulatory developments remain a key concern, though institutional adoption continues to provide underlying support. DeFi and NFT sectors may underperform while infrastructure and scaling solutions show resilience.",
    },
    indices: {
      score: 65,
      trend: 0.8,
      timeframe: "14 days",
      analysis:
        "Global indices are displaying neutral to slightly bullish momentum for the coming two weeks. Developed markets are outperforming emerging markets, with US and European indices showing particular strength. Economic data remains supportive, though inflation concerns and central bank policy adjustments could introduce volatility. Sector rotation trends favor cyclicals over defensives.",
    },
    forex: {
      score: 52,
      trend: -0.5,
      timeframe: "14 days",
      analysis:
        "Currency markets indicate a neutral outlook with a slight bearish bias for the US dollar over the next two weeks. Interest rate differentials and central bank policy divergence are key drivers of current trends. Commodity currencies may benefit from resilient raw material prices, while safe-haven currencies could face pressure if risk appetite remains strong. Volatility is expected to increase around upcoming economic data releases.",
    },
    realestate: {
      score: 45,
      trend: -3.2,
      timeframe: "14 days",
      analysis:
        "Real estate markets are showing moderately bearish signals for the coming two weeks. Residential property is experiencing cooling demand due to affordability constraints and rising mortgage rates. Commercial real estate remains bifurcated with office and retail facing challenges while industrial, data centers, and healthcare properties demonstrate resilience. REITs may underperform broader equities in the near term as interest rate concerns persist.",
    },
  },
  marketMetrics: {
    stocks: [
      {
        title: "Market Fear & Greed Index",
        score: 68,
        trend: -3.2,
        analysis:
          "Greed is currently the dominant market emotion, though slightly down from extreme greed levels last week.",
        aiSummary:
          "Investor sentiment remains bullish despite recent volatility in tech stocks. The Fear & Greed Index indicates continued market optimism, though slightly tempered from previous weeks. Consider maintaining equity positions while being selective with new entries.",
      },
      {
        title: "7-Day AI Projection Score",
        score: 64,
        trend: 1.8,
        analysis:
          "AI models predict moderately bullish conditions over the next 7 days with technology and healthcare sectors leading gains.",
        aiSummary:
          "Our AI models project continued strength in equities over the next week, with particular momentum in technology and healthcare. Semiconductor stocks show the strongest technical patterns, while defensive sectors may underperform in this environment.",
      },
      {
        title: "Institutional Flow Indicator",
        score: 76,
        trend: 4.2,
        analysis:
          "Strong institutional buying detected in large-cap tech and financial sectors, suggesting continued upward momentum.",
        aiSummary:
          "Significant institutional capital is flowing into large-cap technology and financial stocks, a typically bullish signal for broader market direction. This pattern often precedes sustained market rallies, particularly when accompanied by increasing trading volumes.",
      },
      {
        title: "Retail Sentiment Index",
        score: 62,
        trend: -1.5,
        analysis:
          "Retail investors showing cautious optimism with moderate buying activity in popular tech and consumer stocks.",
        aiSummary:
          "Retail investor sentiment remains cautiously optimistic but has cooled slightly from previous highs. Social media analysis shows continued interest in technology and consumer discretionary stocks, though with more selective positioning than earlier quarters.",
      },
    ],
    crypto: [
      {
        title: "Bitcoin Dominance Index",
        score: 65,
        trend: 1.8,
        analysis:
          "Bitcoin's market dominance is increasing, suggesting a potential flight to quality within the crypto space.",
        aiSummary:
          "Bitcoin's increasing market dominance signals a potential defensive rotation within the cryptocurrency market. This pattern typically emerges during periods of uncertainty, with capital flowing from altcoins to Bitcoin as investors seek relative stability.",
      },
      {
        title: "DeFi Health Score",
        score: 62,
        trend: -2.4,
        analysis:
          "DeFi protocols showing moderate stress with TVL decreasing by 8% over the past week amid market uncertainty.",
        aiSummary:
          "Decentralized finance protocols are experiencing moderate pressure with declining total value locked (TVL) metrics. This trend suggests caution is warranted in the DeFi sector, though established protocols with strong fundamentals continue to demonstrate resilience.",
      },
      {
        title: "NFT Market Vitality",
        score: 45,
        trend: -7.5,
        analysis:
          "NFT trading volumes have decreased significantly, indicating reduced speculative interest in digital collectibles.",
        aiSummary:
          "The NFT market continues to cool with trading volumes down significantly from previous highs. This sector is experiencing a necessary correction after speculative excesses, though projects with genuine utility and strong communities maintain relative strength.",
      },
      {
        title: "Crypto Volatility Index",
        score: 68,
        trend: 4.2,
        analysis:
          "Market volatility remains elevated with larger than average price swings expected in the coming week.",
        aiSummary:
          "Cryptocurrency volatility metrics indicate potential for significant price movements in the coming days. Options market data suggests traders are positioning for increased volatility, creating opportunities for both directional and volatility-based strategies.",
      },
    ],
    indices: [
      {
        title: "Global Market Sentiment",
        score: 67,
        trend: 1.2,
        analysis:
          "Overall positive sentiment across major global indices with developed markets outperforming emerging markets.",
        aiSummary:
          "Global equity indices are showing positive momentum, with developed markets outperforming emerging markets. This divergence often occurs during periods of dollar strength and rising interest rate expectations, suggesting a preference for quality over growth.",
      },
      {
        title: "Economic Surprise Index",
        score: 63,
        trend: 2.5,
        analysis:
          "Recent economic data has moderately exceeded consensus expectations, supporting equity market valuations.",
        aiSummary:
          "Economic data releases have consistently exceeded analyst expectations, providing fundamental support for current market valuations. This positive surprise factor typically supports equity markets, particularly cyclical sectors that benefit from economic strength.",
      },
      {
        title: "Sector Rotation Indicator",
        score: 72,
        trend: 3.8,
        analysis:
          "Rotation from defensive to cyclical sectors accelerating, suggesting increased risk appetite among investors.",
        aiSummary:
          "Market participants are increasingly rotating from defensive sectors to cyclicals, a classic sign of growing risk appetite. This rotation pattern typically emerges during the middle phase of economic expansions and often precedes periods of broader market strength.",
      },
      {
        title: "Market Breadth Score",
        score: 68,
        trend: -1.5,
        analysis:
          "Healthy market breadth with advancing issues outnumbering declining issues, though slightly weakening from recent peaks.",
        aiSummary:
          "Market breadth remains healthy with broad participation across sectors, though slightly weakening from recent highs. This pattern suggests the rally remains intact but may be maturing, warranting more selective positioning in stocks with strong relative strength.",
      },
    ],
    forex: [
      {
        title: "Dollar Strength (DXY Score)",
        score: 42,
        trend: -1.5,
        analysis:
          "The US Dollar is showing weakness against major currencies, potentially benefiting multinational corporations and commodities.",
        aiSummary:
          "The US Dollar is in a weakening trend against major currencies, creating a supportive environment for multinational corporations and commodity prices. This dollar weakness typically benefits emerging markets and export-oriented economies while supporting precious metals prices.",
      },
      {
        title: "Currency Volatility Index",
        score: 56,
        trend: 2.8,
        analysis:
          "FX market volatility is increasing ahead of central bank meetings, creating potential trading opportunities.",
        aiSummary:
          "Foreign exchange volatility is rising ahead of key central bank decisions, creating potential trading opportunities in major currency pairs. Options market pricing suggests particular focus on EUR/USD and USD/JPY pairs, with significant movement expected following policy announcements.",
      },
      {
        title: "Interest Rate Differential",
        score: 68,
        trend: -0.7,
        analysis:
          "Narrowing interest rate differentials between major economies are influencing currency pair movements.",
        aiSummary:
          "Interest rate differentials between major economies are narrowing as central banks globally adjust monetary policy. This convergence is a key driver of current currency movements, particularly affecting carry trade dynamics and emerging market currencies.",
      },
      {
        title: "Central Bank Policy Divergence",
        score: 74,
        trend: 3.2,
        analysis:
          "Increasing policy divergence between major central banks is creating directional trends in key currency pairs.",
        aiSummary:
          "Policy divergence between major central banks is creating clear directional trends in key currency pairs. The Federal Reserve's stance relative to the ECB and Bank of Japan remains the primary driver, with markets closely monitoring communication for signs of changing policy trajectories.",
      },
    ],
    realestate: [
      {
        title: "Housing Market Health",
        score: 48,
        trend: -4.5,
        analysis:
          "Residential real estate showing signs of cooling with decreased transaction volumes and moderating price growth.",
        aiSummary:
          "The residential real estate market is experiencing a cooling trend with declining transaction volumes and moderating price appreciation. This adjustment is most pronounced in previously hot markets that saw substantial pandemic-era price increases, while affordable secondary markets show greater resilience.",
      },
      {
        title: "Commercial Property Index",
        score: 42,
        trend: -3.2,
        analysis:
          "Office and retail sectors continue to face challenges while industrial and data center properties remain resilient.",
        aiSummary:
          "Commercial real estate presents a bifurcated picture with office and retail properties facing significant headwinds, while industrial, logistics, and data center properties demonstrate strength. This divergence reflects structural shifts in work patterns and consumer behavior accelerated by the pandemic.",
      },
      {
        title: "REIT Performance Score",
        score: 56,
        trend: 1.8,
        analysis:
          "Specialized REITs outperforming broader real estate market, particularly in healthcare and digital infrastructure.",
        aiSummary:
          "Specialized REITs focused on healthcare, digital infrastructure, and logistics are outperforming the broader real estate sector. This performance divergence highlights the importance of sector selection within real estate investments, with technology-adjacent properties showing particular strength.",
      },
      {
        title: "Mortgage Rate Impact",
        score: 38,
        trend: -5.2,
        analysis:
          "Rising mortgage rates are pressuring affordability and reducing demand, particularly in high-priced markets.",
        aiSummary:
          "Elevated mortgage rates continue to pressure housing affordability and transaction volumes, particularly in high-priced coastal markets. This rate environment is creating a challenging backdrop for residential real estate, though the structural housing shortage provides some support for valuations.",
      },
    ],
  },
  topAssetsByMarket: {
    stocks: [
      {
        symbol: "NVDA",
        name: "NVIDIA Corp",
        action: "long",
        confidence: 92,
        price: "$892.03",
        change: "+4.2%",
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc",
        action: "short",
        confidence: 87,
        price: "$248.42",
        change: "-2.8%",
      },
      {
        symbol: "AAPL",
        name: "Apple Inc",
        action: "long",
        confidence: 84,
        price: "$187.45",
        change: "+1.7%",
      },
    ],
    crypto: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        action: "short",
        confidence: 76,
        price: "$62,345",
        change: "-3.2%",
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        action: "short",
        confidence: 73,
        price: "$3,421",
        change: "-2.1%",
      },
      {
        symbol: "SOL",
        name: "Solana",
        action: "long",
        confidence: 82,
        price: "$142.78",
        change: "+5.4%",
      },
    ],
    indices: [
      {
        symbol: "SPX",
        name: "S&P 500",
        action: "long",
        confidence: 81,
        price: "4,782.82",
        change: "+1.2%",
      },
      {
        symbol: "NDX",
        name: "Nasdaq 100",
        action: "long",
        confidence: 84,
        price: "16,742.39",
        change: "+1.6%",
      },
      {
        symbol: "DJI",
        name: "Dow Jones",
        action: "long",
        confidence: 76,
        price: "38,503.75",
        change: "+0.7%",
      },
    ],
    forex: [
      {
        symbol: "EUR/USD",
        name: "Euro/US Dollar",
        action: "long",
        confidence: 74,
        price: "1.0845",
        change: "+0.6%",
      },
      {
        symbol: "USD/JPY",
        name: "US Dollar/Japanese Yen",
        action: "short",
        confidence: 68,
        price: "153.42",
        change: "-0.8%",
      },
      {
        symbol: "GBP/USD",
        name: "British Pound/US Dollar",
        action: "long",
        confidence: 71,
        price: "1.2678",
        change: "+0.4%",
      },
    ],
    realestate: [
      {
        symbol: "VNQ",
        name: "Vanguard Real Estate ETF",
        action: "short",
        confidence: 65,
        price: "$82.45",
        change: "-0.8%",
      },
      {
        symbol: "IYR",
        name: "iShares U.S. Real Estate ETF",
        action: "short",
        confidence: 63,
        price: "$87.32",
        change: "-1.1%",
      },
      {
        symbol: "AMT",
        name: "American Tower Corp",
        action: "long",
        confidence: 72,
        price: "$195.43",
        change: "+1.2%",
      },
    ],
  },
};

export const useMarketIntelligenceData = () => {
  const [data, setData] = useState<MarketIntelligenceData>(defaultData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketIntelligenceData = async () => {
      setLoading(true);
      setError(null);

      try {
        // First try to fetch from Supabase
        const { data: marketData, error } = await supabase
          .from("market_intelligence")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) throw error;

        if (marketData && marketData.length > 0) {
          // Parse the JSON data from Supabase
          const parsedData = marketData[0].data as MarketIntelligenceData;
          setData(parsedData);
        } else {
          // If no data in Supabase, use default data
          setData(defaultData);
        }
      } catch (err) {
        console.error("Error fetching market intelligence data:", err);
        setError("Failed to fetch market data. Using default values.");
        // Use default data on error
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketIntelligenceData();

    // Set up a polling interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchMarketIntelligenceData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { data, loading, error };
};
