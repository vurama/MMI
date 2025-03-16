import { supabase } from "../../supabase/supabase";

// Types
export interface AdminUpdate {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
  };
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
  comments: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: Date;
  }>;
  hasChart: boolean;
  chartType?: "line" | "bar" | "pie";
  chartImage?: string;
  resolution?: string;
}

export interface AIAnalysis {
  id: string;
  updateId: string; // Corresponds to an AdminUpdate id
  title: string;
  summary: string;
  insights: string[];
  confidence: number;
  timestamp: Date;
  trends: {
    direction: "up" | "down" | "neutral";
    percentage: number;
  };
}

// Singleton to store data in memory (simulating a database)
class AdvisorDataStore {
  private static instance: AdvisorDataStore;
  private _updates: AdminUpdate[] = [];
  private _analyses: AIAnalysis[] = [];

  private constructor() {
    // Initialize with sample data
    this._updates = [
      {
        id: "update-1",
        title: "Q2 Market Performance Overview",
        content:
          "The second quarter showed significant growth across technology sectors, with AI-related stocks outperforming the broader market by 15%. Key indicators suggest continued momentum into Q3, though with increased volatility expected due to upcoming Fed decisions.",
        category: "stocks",
        timestamp: new Date(2023, 6, 15, 10, 30),
        author: {
          name: "Sarah Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        reactions: {
          thumbsUp: 24,
          thumbsDown: 3,
          heart: 12,
        },
        comments: [
          {
            id: "comment-1",
            author: {
              name: "Michael Chen",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            },
            content:
              "Great insights on the tech sector. Do you anticipate any specific subsectors to lead in Q3?",
            timestamp: new Date(2023, 6, 15, 11, 45),
          },
          {
            id: "comment-2",
            author: {
              name: "Lisa Rodriguez",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
            },
            content:
              "The volatility prediction aligns with what I'm seeing in options pricing. Good call.",
            timestamp: new Date(2023, 6, 15, 14, 20),
          },
        ],
        hasChart: true,
        chartType: "line",
        resolution:
          "Based on Q2 performance, we recommend increasing allocation to semiconductor and cloud computing stocks while maintaining a defensive position in consumer staples as a hedge against potential volatility.",
      },
      {
        id: "update-2",
        title: "Real Estate Market Cooling Trends",
        content:
          "Our analysis indicates a significant cooling in residential real estate markets across major metropolitan areas. Housing inventory has increased 12% month-over-month, while days-on-market metrics have extended by an average of 15 days compared to the previous quarter.",
        category: "realestate",
        timestamp: new Date(2023, 6, 12, 14, 15),
        author: {
          name: "David Williams",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        },
        reactions: {
          thumbsUp: 18,
          thumbsDown: 5,
          heart: 7,
        },
        comments: [
          {
            id: "comment-3",
            author: {
              name: "Jennifer Taylor",
              avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
            },
            content:
              "I'm seeing similar trends in the midwest markets. Buyer sentiment has definitely shifted.",
            timestamp: new Date(2023, 6, 12, 16, 30),
          },
        ],
        hasChart: true,
        chartType: "bar",
        resolution:
          "We recommend caution with residential real estate investments in the short term. For those with existing holdings, consider diversifying into industrial and logistics properties which continue to show strength.",
      },
      {
        id: "update-3",
        title: "Cryptocurrency Regulatory Developments",
        content:
          "Recent regulatory announcements from the SEC and international bodies suggest a more structured framework for cryptocurrency markets is emerging. These developments are likely to increase institutional participation while potentially limiting certain DeFi applications.",
        category: "crypto",
        timestamp: new Date(2023, 6, 10, 9, 45),
        author: {
          name: "Alex Thompson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        reactions: {
          thumbsUp: 32,
          thumbsDown: 8,
          heart: 15,
        },
        comments: [
          {
            id: "comment-4",
            author: {
              name: "Ryan Peters",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
            },
            content:
              "The regulatory clarity should be positive for Bitcoin and established altcoins in the long run.",
            timestamp: new Date(2023, 6, 10, 11, 20),
          },
          {
            id: "comment-5",
            author: {
              name: "Sophia Kim",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
            },
            content:
              "Concerned about the impact on innovation in the DeFi space. Regulations need to be balanced.",
            timestamp: new Date(2023, 6, 10, 13, 15),
          },
          {
            id: "comment-6",
            author: {
              name: "James Wilson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
            },
            content:
              "Has anyone analyzed how these regulations might affect stablecoin projects specifically?",
            timestamp: new Date(2023, 6, 11, 9, 30),
          },
        ],
        hasChart: false,
        resolution:
          "We suggest maintaining Bitcoin and Ethereum positions while being selective with altcoin exposure. Focus on projects with strong compliance frameworks and established use cases.",
      },
    ];

    this._analyses = [
      {
        id: "analysis-update-1",
        updateId: "update-1",
        title: "AI Analysis: Q2 Market Performance Overview",
        summary:
          "AI has detected strong positive momentum in the technology sector with particular strength in semiconductor and cloud services companies. This aligns with the admin update on Q2 performance.",
        insights: [
          "Semiconductor demand is being driven primarily by AI chip requirements, with a 32% increase in orders from data center operators.",
          "Cloud service providers are showing improved margins due to operational efficiencies and increased enterprise adoption.",
          "Consumer technology spending remains resilient despite inflation concerns, suggesting strong brand loyalty.",
          "Technical indicators suggest potential consolidation before continued upward movement.",
        ],
        confidence: 92,
        timestamp: new Date(2023, 6, 15, 10, 35),
        trends: {
          direction: "up",
          percentage: 15.3,
        },
      },
      {
        id: "analysis-update-2",
        updateId: "update-2",
        title: "AI Analysis: Real Estate Market Transition",
        summary:
          "AI analysis confirms cooling trends in residential real estate with additional insights on regional variations and potential investment opportunities in the changing market.",
        insights: [
          "The cooling trend is most pronounced in previously hot markets like Austin, Phoenix, and Boise with price reductions becoming more common.",
          "Rental markets remain strong, suggesting a shift from buying to renting among consumers.",
          "Commercial real estate, particularly office space, continues to face challenges with remote work trends persisting.",
          "Industrial and logistics properties show resilience due to e-commerce growth and supply chain restructuring.",
        ],
        confidence: 88,
        timestamp: new Date(2023, 6, 12, 14, 20),
        trends: {
          direction: "down",
          percentage: 8.7,
        },
      },
      {
        id: "analysis-update-3",
        updateId: "update-3",
        title: "AI Analysis: Cryptocurrency Regulatory Impact Assessment",
        summary:
          "AI has analyzed the potential impacts of emerging cryptocurrency regulations on different digital assets and market segments.",
        insights: [
          "Bitcoin and Ethereum are likely to benefit from regulatory clarity, potentially attracting more institutional investment.",
          "DeFi protocols face varying levels of regulatory risk, with lending and exchange platforms most exposed.",
          "Stablecoins will likely face increased scrutiny and reserve requirements, potentially leading to consolidation in the space.",
          "Emerging markets show divergent regulatory approaches, creating potential arbitrage opportunities but also jurisdictional risks.",
        ],
        confidence: 84,
        timestamp: new Date(2023, 6, 10, 9, 50),
        trends: {
          direction: "neutral",
          percentage: 2.1,
        },
      },
    ];
  }

  public static getInstance(): AdvisorDataStore {
    if (!AdvisorDataStore.instance) {
      AdvisorDataStore.instance = new AdvisorDataStore();
    }
    return AdvisorDataStore.instance;
  }

  // Updates
  get updates(): AdminUpdate[] {
    return [...this._updates];
  }

  addUpdate(update: AdminUpdate): void {
    this._updates.unshift(update);
  }

  updateUpdate(updatedUpdate: AdminUpdate): void {
    const index = this._updates.findIndex((u) => u.id === updatedUpdate.id);
    if (index !== -1) {
      this._updates[index] = updatedUpdate;
    }
  }

  deleteUpdate(id: string): void {
    this._updates = this._updates.filter((u) => u.id !== id);
    // Also delete associated analyses
    this._analyses = this._analyses.filter((a) => a.updateId !== id);
  }

  // Analyses
  get analyses(): AIAnalysis[] {
    return [...this._analyses];
  }

  addAnalysis(analysis: AIAnalysis): void {
    this._analyses.unshift(analysis);
  }

  updateAnalysis(updatedAnalysis: AIAnalysis): void {
    const index = this._analyses.findIndex((a) => a.id === updatedAnalysis.id);
    if (index !== -1) {
      this._analyses[index] = updatedAnalysis;
    } else {
      // If not found, add it
      this.addAnalysis(updatedAnalysis);
    }
  }

  deleteAnalysis(id: string): void {
    this._analyses = this._analyses.filter((a) => a.id !== id);
  }

  // Get analysis for a specific update
  getAnalysisForUpdate(updateId: string): AIAnalysis | undefined {
    return this._analyses.find((a) => a.updateId === updateId);
  }

  // Filter updates by category
  getUpdatesByCategory(category: string): AdminUpdate[] {
    if (!category) return this._updates;
    return this._updates.filter((u) => u.category === category);
  }
}

// Event system for real-time updates
class EventEmitter {
  private static instance: EventEmitter;
  private listeners: { [event: string]: Function[] } = {};

  private constructor() {}

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(
      (cb) => cb !== callback,
    );
  }

  emit(event: string, data?: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((callback) => callback(data));
  }
}

// Service for interacting with advisor data
export class AdvisorService {
  private static dataStore = AdvisorDataStore.getInstance();
  private static eventEmitter = EventEmitter.getInstance();

  // Event constants
  static EVENTS = {
    UPDATE_ADDED: "update_added",
    UPDATE_MODIFIED: "update_modified",
    UPDATE_DELETED: "update_deleted",
    COMMENT_ADDED: "comment_added",
    REACTION_UPDATED: "reaction_updated",
  };

  // Subscribe to data changes
  static subscribe(event: string, callback: Function) {
    this.eventEmitter.on(event, callback);
    return () => this.eventEmitter.off(event, callback);
  }

  // Get all updates
  static async getAllUpdates(): Promise<AdminUpdate[]> {
    // In a real app, this would fetch from Supabase
    return this.dataStore.updates;
  }

  // Get updates by category
  static async getUpdatesByCategory(category: string): Promise<AdminUpdate[]> {
    return this.dataStore.getUpdatesByCategory(category);
  }

  // Get all AI analyses
  static async getAllAnalyses(): Promise<AIAnalysis[]> {
    return this.dataStore.analyses;
  }

  // Get analysis for a specific update
  static async getAnalysisForUpdate(
    updateId: string,
  ): Promise<AIAnalysis | undefined> {
    return this.dataStore.getAnalysisForUpdate(updateId);
  }

  // Add a new update
  static async addUpdate(
    update: AdminUpdate,
    analysis: AIAnalysis,
  ): Promise<void> {
    try {
      this.dataStore.addUpdate(update);
      this.dataStore.addAnalysis(analysis);

      // Emit event for real-time updates
      this.eventEmitter.emit(this.EVENTS.UPDATE_ADDED, { update, analysis });
    } catch (error) {
      console.error("Error adding update:", error);
      throw error;
    }
  }

  // Update an existing update
  static async updateUpdate(
    update: AdminUpdate,
    analysis?: AIAnalysis,
  ): Promise<void> {
    try {
      this.dataStore.updateUpdate(update);
      if (analysis) {
        this.dataStore.updateAnalysis(analysis);
      }

      // Emit event for real-time updates
      this.eventEmitter.emit(this.EVENTS.UPDATE_MODIFIED, { update, analysis });
    } catch (error) {
      console.error("Error updating update:", error);
      throw error;
    }
  }

  // Delete an update
  static async deleteUpdate(id: string): Promise<void> {
    try {
      this.dataStore.deleteUpdate(id);

      // Emit event for real-time updates
      this.eventEmitter.emit(this.EVENTS.UPDATE_DELETED, { id });
    } catch (error) {
      console.error("Error deleting update:", error);
      throw error;
    }
  }

  // Add a comment to an update
  static async addComment(
    updateId: string,
    comment: {
      id: string;
      author: {
        name: string;
        avatar: string;
      };
      content: string;
      timestamp: Date;
    },
  ): Promise<void> {
    try {
      const updates = this.dataStore.updates;
      const updateIndex = updates.findIndex((u) => u.id === updateId);

      if (updateIndex !== -1) {
        const update = updates[updateIndex];
        update.comments.push(comment);
        this.dataStore.updateUpdate(update);

        // Emit event for real-time updates
        this.eventEmitter.emit(this.EVENTS.COMMENT_ADDED, {
          updateId,
          comment,
        });
      } else {
        throw new Error(`Update with ID ${updateId} not found`);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  // Update reactions for an update
  static async updateReactions(
    updateId: string,
    reactionType: "thumbsUp" | "thumbsDown" | "heart",
    increment: boolean,
  ): Promise<void> {
    try {
      const updates = this.dataStore.updates;
      const updateIndex = updates.findIndex((u) => u.id === updateId);

      if (updateIndex !== -1) {
        const update = updates[updateIndex];
        update.reactions[reactionType] += increment ? 1 : -1;
        this.dataStore.updateUpdate(update);

        // Emit event for real-time updates
        this.eventEmitter.emit(this.EVENTS.REACTION_UPDATED, {
          updateId,
          reactionType,
          increment,
          newValue: update.reactions[reactionType],
        });
      } else {
        throw new Error(`Update with ID ${updateId} not found`);
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
      throw error;
    }
  }

  // Generate AI analysis for a post
  static generateAIAnalysis(post: AdminUpdate): AIAnalysis {
    // Generate insights based on post category and content
    let insights: string[] = [];
    let summary = "";
    let confidence = 0;
    let direction: "up" | "down" | "neutral" = "neutral";
    let percentage = 0;

    // Generate different insights based on category
    if (post.category === "stocks") {
      summary = `AI has analyzed the stock market trends mentioned in this update and identified key patterns that may impact investor decisions.`;
      insights = [
        "Market volatility indicators suggest cautious positioning in the short term.",
        "Sector rotation trends favor technology and healthcare in the current environment.",
        "Earnings forecasts indicate potential upside surprises in the coming quarter.",
        "Institutional money flow shows accumulation in large-cap value stocks.",
      ];
      confidence = Math.floor(Math.random() * 11) + 85; // 85-95
      direction = Math.random() > 0.5 ? "up" : "down";
      percentage = parseFloat((Math.random() * 10 + 2).toFixed(1));
    } else if (post.category === "crypto") {
      summary = `AI analysis of cryptocurrency market conditions reveals important regulatory and adoption trends that could affect digital asset valuations.`;
      insights = [
        "Regulatory clarity is improving, potentially reducing compliance risks for established projects.",
        "Institutional adoption continues to increase despite market volatility.",
        "Layer-2 scaling solutions are gaining traction, improving network efficiency.",
        "DeFi protocols face increased scrutiny but innovation continues at a rapid pace.",
      ];
      confidence = Math.floor(Math.random() * 11) + 80; // 80-90
      direction =
        Math.random() > 0.6 ? "up" : Math.random() > 0.5 ? "down" : "neutral";
      percentage = parseFloat((Math.random() * 15 + 5).toFixed(1));
    } else if (post.category === "realestate") {
      summary = `AI has evaluated real estate market conditions and identified regional trends and investment opportunities in the changing landscape.`;
      insights = [
        "Housing affordability metrics indicate potential market corrections in overheated regions.",
        "Commercial real estate faces challenges in office space but opportunities in logistics and warehousing.",
        "Interest rate sensitivity analysis suggests caution for highly leveraged investments.",
        "Regional economic indicators favor sunbelt states for continued growth.",
      ];
      confidence = Math.floor(Math.random() * 11) + 82; // 82-92
      direction = Math.random() > 0.7 ? "down" : "neutral";
      percentage = parseFloat((Math.random() * 8 + 1).toFixed(1));
    } else if (post.category === "forex") {
      summary = `AI currency analysis has identified key macroeconomic factors and central bank policies that may influence exchange rate movements.`;
      insights = [
        "Central bank policy divergence creates opportunities in major currency pairs.",
        "Economic growth differentials favor USD strength in the near term.",
        "Inflation data suggests potential volatility in emerging market currencies.",
        "Technical indicators show potential reversal patterns forming in EUR/USD.",
      ];
      confidence = Math.floor(Math.random() * 11) + 83; // 83-93
      direction =
        Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "neutral";
      percentage = parseFloat((Math.random() * 5 + 0.5).toFixed(1));
    } else {
      summary = `AI has analyzed the market information provided and identified potential trends and opportunities.`;
      insights = [
        "Market sentiment indicators suggest cautious positioning in the current environment.",
        "Technical analysis reveals potential support and resistance levels to monitor.",
        "Fundamental factors indicate changing dynamics that may present new opportunities.",
        "Risk assessment suggests diversification as a prudent strategy.",
      ];
      confidence = Math.floor(Math.random() * 11) + 80; // 80-90
      direction =
        Math.random() > 0.33
          ? Math.random() > 0.5
            ? "up"
            : "down"
          : "neutral";
      percentage = parseFloat((Math.random() * 10 + 1).toFixed(1));
    }

    return {
      id: `analysis-${post.id}`,
      updateId: post.id,
      title: `AI Analysis: ${post.title}`,
      summary,
      insights,
      confidence,
      timestamp: new Date(post.timestamp.getTime() + 5 * 60000), // 5 minutes after post
      trends: {
        direction,
        percentage,
      },
    };
  }
}
