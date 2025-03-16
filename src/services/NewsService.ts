import { supabase } from "../../supabase/supabase";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  publishedAt: Date;
}

export class NewsService {
  // Free news API endpoints
  private static newsAPIs = {
    stocks:
      "https://finnhub.io/api/v1/news?category=general&token=c1g1uts37fkvq7v1edag",
    crypto: "https://api.coingecko.com/api/v3/news",
    forex: "https://api.exchangerate.host/latest",
    realestate: "https://api.usa.gov/properties/v1/properties?limit=10",
  };

  // Fallback news data by category
  private static fallbackNews: Record<string, NewsItem[]> = {
    stocks: [
      {
        id: "stock-1",
        title: "Tech Stocks Rally as Inflation Concerns Ease",
        description:
          "Major tech stocks saw significant gains today as new economic data suggests inflation may be cooling, potentially leading to a more favorable interest rate environment.",
        url: "https://example.com/tech-stocks-rally",
        imageUrl:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        source: "Market Watch",
        category: "stocks",
        publishedAt: new Date(Date.now() - 3600000),
      },
      {
        id: "stock-2",
        title: "Earnings Season Exceeds Analyst Expectations",
        description:
          "This quarter's earnings reports have largely surpassed Wall Street expectations, with 76% of S&P 500 companies beating estimates so far.",
        url: "https://example.com/earnings-season",
        imageUrl:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
        source: "Financial Times",
        category: "stocks",
        publishedAt: new Date(Date.now() - 7200000),
      },
      {
        id: "stock-3",
        title: "Fed Minutes Reveal Divided Opinion on Rate Path",
        description:
          "Recently released Federal Reserve meeting minutes show committee members are divided on the future path of interest rates, creating market uncertainty.",
        url: "https://example.com/fed-minutes",
        imageUrl:
          "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
        source: "Bloomberg",
        category: "stocks",
        publishedAt: new Date(Date.now() - 10800000),
      },
    ],
    crypto: [
      {
        id: "crypto-1",
        title: "Bitcoin Surges Past $50,000 on ETF Approval News",
        description:
          "Bitcoin has broken through the $50,000 barrier following news that regulators are close to approving several spot Bitcoin ETF applications.",
        url: "https://example.com/bitcoin-etf-surge",
        imageUrl:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
        source: "CoinDesk",
        category: "crypto",
        publishedAt: new Date(Date.now() - 2700000),
      },
      {
        id: "crypto-2",
        title: "Ethereum Completes Major Network Upgrade",
        description:
          "Ethereum has successfully implemented its latest network upgrade, improving scalability and reducing transaction fees on the world's second-largest blockchain.",
        url: "https://example.com/ethereum-upgrade",
        imageUrl:
          "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
        source: "The Block",
        category: "crypto",
        publishedAt: new Date(Date.now() - 5400000),
      },
      {
        id: "crypto-3",
        title: "Regulatory Clarity Emerges for Crypto Industry",
        description:
          "New guidelines from financial regulators provide clearer frameworks for cryptocurrency businesses, potentially opening the door to broader institutional adoption.",
        url: "https://example.com/crypto-regulations",
        imageUrl:
          "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
        source: "Decrypt",
        category: "crypto",
        publishedAt: new Date(Date.now() - 9000000),
      },
    ],
    forex: [
      {
        id: "forex-1",
        title: "Dollar Weakens Against Major Currencies on Trade Data",
        description:
          "The US dollar index fell today following the release of trade deficit data that was worse than economists had predicted.",
        url: "https://example.com/dollar-weakens",
        imageUrl:
          "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=800&q=80",
        source: "Reuters",
        category: "forex",
        publishedAt: new Date(Date.now() - 4500000),
      },
      {
        id: "forex-2",
        title: "Euro Strengthens as ECB Signals Potential Rate Hike",
        description:
          "The Euro gained ground against other major currencies after European Central Bank officials hinted at possible interest rate increases in the coming months.",
        url: "https://example.com/euro-strengthens",
        imageUrl:
          "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=800&q=80",
        source: "Financial Times",
        category: "forex",
        publishedAt: new Date(Date.now() - 6300000),
      },
      {
        id: "forex-3",
        title: "Yen Volatility Increases on Bank of Japan Policy Uncertainty",
        description:
          "The Japanese Yen has experienced increased volatility as markets react to unclear signals about future monetary policy from the Bank of Japan.",
        url: "https://example.com/yen-volatility",
        imageUrl:
          "https://images.unsplash.com/photo-1599409637219-d04e9a30b708?w=800&q=80",
        source: "Nikkei",
        category: "forex",
        publishedAt: new Date(Date.now() - 8100000),
      },
    ],
    realestate: [
      {
        id: "realestate-1",
        title: "Housing Market Shows Signs of Cooling as Mortgage Rates Rise",
        description:
          "The residential real estate market is showing early signs of slowing down as mortgage rates reach their highest levels in over a decade.",
        url: "https://example.com/housing-market-cooling",
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        source: "Housing Wire",
        category: "realestate",
        publishedAt: new Date(Date.now() - 3900000),
      },
      {
        id: "realestate-2",
        title:
          "Commercial Real Estate Faces Challenges in Post-Pandemic Landscape",
        description:
          "Office and retail properties continue to struggle with occupancy rates as remote work and e-commerce trends persist beyond the pandemic.",
        url: "https://example.com/commercial-real-estate",
        imageUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
        source: "Commercial Property Executive",
        category: "realestate",
        publishedAt: new Date(Date.now() - 5800000),
      },
      {
        id: "realestate-3",
        title: "Industrial and Logistics Properties Remain Strong Investment",
        description:
          "While other commercial real estate sectors struggle, industrial and logistics properties continue to see strong demand and investment returns.",
        url: "https://example.com/industrial-properties",
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        source: "Real Estate Investment Today",
        category: "realestate",
        publishedAt: new Date(Date.now() - 7900000),
      },
    ],
  };

  // Get news by category
  static async getNewsByCategory(category: string): Promise<NewsItem[]> {
    try {
      // In a real app, we would fetch from the actual API endpoints
      // For now, we'll use our fallback data
      const news = this.fallbackNews[category] || [];

      // If no category specified, return a mix of all categories
      if (!category) {
        return Object.values(this.fallbackNews).flat().slice(0, 6);
      }

      return news;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  }

  // Get latest news across all categories
  static async getLatestNews(limit: number = 6): Promise<NewsItem[]> {
    try {
      // Combine all news and sort by date
      const allNews = Object.values(this.fallbackNews).flat();
      return allNews
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
        .slice(0, limit);
    } catch (error) {
      console.error("Error fetching latest news:", error);
      return [];
    }
  }

  // Format relative time (e.g., "2 hours ago")
  static formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return `${diffSecs} seconds ago`;
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  }
}
