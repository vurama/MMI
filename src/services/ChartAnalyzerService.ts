import { supabase } from "@/supabase/supabase";
import { RecommendationType } from "@/components/chart-analyzer/AIAnalysisPanel";
import { AnalysisStatus } from "@/components/chart-analyzer/HumanAnalysisPanel";
import { ChartHistoryEntry } from "@/components/chart-analyzer/ChartHistoryList";

export interface AIAnalysisResult {
  recommendation: RecommendationType;
  confidence: number;
  reasoning: string;
  keyLevels?: {
    support: string[];
    resistance: string[];
  };
  patterns?: string[];
  timestamp: string;
}

export interface HumanAnalysisResult {
  analyst: {
    name: string;
    avatar: string;
  };
  status: AnalysisStatus;
  submittedAt: string;
  completedAt?: string;
  analysis?: string;
  recommendation?: string;
}

export class ChartAnalyzerService {
  // Upload a chart image to storage and create a record in the database
  static async uploadChart(
    file: File,
    category: string,
    ticker: string,
  ): Promise<string> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("chart-uploads")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = await supabase.storage
        .from("chart-uploads")
        .getPublicUrl(fileName);

      const chartUrl = urlData.publicUrl;

      // Create record in chart_uploads table
      const { data, error } = await supabase
        .from("chart_uploads")
        .insert({
          user_id: user.id,
          chart_url: chartUrl,
          category,
          ticker,
        })
        .select()
        .single();

      if (error) throw error;

      return data.id;
    } catch (error) {
      console.error("Error uploading chart:", error);
      throw error;
    }
  }

  // Perform AI analysis on a chart
  static async analyzeChartWithAI(chartId: string): Promise<AIAnalysisResult> {
    try {
      // Get chart details
      const { data: chartData, error: chartError } = await supabase
        .from("chart_uploads")
        .select("*")
        .eq("id", chartId)
        .single();

      if (chartError) throw chartError;

      // In a real implementation, you would call an AI service here
      // For now, we'll simulate an AI response
      const recommendations: RecommendationType[] = [
        "long",
        "short",
        "wait",
        "neutral",
      ];
      const randomRecommendation =
        recommendations[Math.floor(Math.random() * recommendations.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 60; // 60-90%

      const aiResult: AIAnalysisResult = {
        recommendation: randomRecommendation,
        confidence: randomConfidence,
        reasoning: `Based on the chart pattern analysis for ${chartData.ticker}, we've identified a ${randomRecommendation === "long" ? "bullish" : randomRecommendation === "short" ? "bearish" : "neutral"} trend. The price action shows ${randomRecommendation === "long" ? "support levels holding with increasing volume" : randomRecommendation === "short" ? "resistance levels with decreasing volume" : "consolidation with mixed signals"}.`,
        keyLevels: {
          support: ["$145.32", "$142.18", "$138.76"],
          resistance: ["$152.45", "$156.89", "$160.23"],
        },
        patterns: [
          "Double bottom formation",
          "Golden cross (50 MA crossing above 200 MA)",
          "Increasing volume on up days",
        ],
        timestamp: new Date().toISOString(),
      };

      // Save AI analysis to database
      const { data, error } = await supabase
        .from("ai_analysis")
        .insert({
          chart_id: chartId,
          recommendation: aiResult.recommendation,
          confidence: aiResult.confidence,
          reasoning: aiResult.reasoning,
          key_levels: aiResult.keyLevels,
          patterns: aiResult.patterns,
        })
        .select()
        .single();

      if (error) throw error;

      // Deduct AI credits
      await this.deductAICredits();

      return aiResult;
    } catch (error) {
      console.error("Error analyzing chart with AI:", error);
      throw error;
    }
  }

  // Request human analysis for a chart
  static async requestHumanAnalysis(
    chartId: string,
    boostHours: number,
  ): Promise<void> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      // Check if user has enough credits for boost
      if (boostHours > 0) {
        const { data: creditsData, error: creditsError } = await supabase
          .from("user_credits")
          .select("human_credits")
          .eq("user_id", user.id)
          .single();

        if (creditsError) throw creditsError;

        if (creditsData.human_credits < boostHours) {
          throw new Error("Not enough credits for this boost");
        }

        // Deduct credits
        await supabase
          .from("user_credits")
          .update({ human_credits: creditsData.human_credits - boostHours })
          .eq("user_id", user.id);
      }

      // Create human analysis request
      const { error } = await supabase.from("human_analysis").insert({
        chart_id: chartId,
        status: "pending",
        boost_credits: boostHours,
        submitted_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error requesting human analysis:", error);
      throw error;
    }
  }

  // Get user's chart history
  static async getChartHistory(): Promise<ChartHistoryEntry[]> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      // Get chart uploads with AI and human analysis
      const { data, error } = await supabase
        .from("chart_uploads")
        .select(
          `
          id,
          chart_url,
          category,
          ticker,
          created_at,
          ai_analysis(recommendation, confidence),
          human_analysis(status, boost_credits)
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Format data for frontend
      return data.map((item: any) => {
        const entry: ChartHistoryEntry = {
          id: item.id,
          chartUrl: item.chart_url,
          category: item.category,
          ticker: item.ticker,
          submittedAt: item.created_at,
        };

        if (item.ai_analysis && item.ai_analysis.length > 0) {
          entry.aiAnalysis = {
            recommendation: item.ai_analysis[0]
              .recommendation as RecommendationType,
            confidence: item.ai_analysis[0].confidence,
          };
        }

        if (item.human_analysis && item.human_analysis.length > 0) {
          entry.humanAnalysis = {
            status: item.human_analysis[0].status as AnalysisStatus,
            boostCredits: item.human_analysis[0].boost_credits,
          };
        }

        return entry;
      });
    } catch (error) {
      console.error("Error getting chart history:", error);
      throw error;
    }
  }

  // Get AI analysis for a chart
  static async getAIAnalysis(
    chartId: string,
  ): Promise<AIAnalysisResult | null> {
    try {
      const { data, error } = await supabase
        .from("ai_analysis")
        .select("*")
        .eq("chart_id", chartId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // No rows returned
        throw error;
      }

      return {
        recommendation: data.recommendation as RecommendationType,
        confidence: data.confidence,
        reasoning: data.reasoning,
        keyLevels: data.key_levels,
        patterns: data.patterns,
        timestamp: data.created_at,
      };
    } catch (error) {
      console.error("Error getting AI analysis:", error);
      throw error;
    }
  }

  // Get human analysis for a chart
  static async getHumanAnalysis(
    chartId: string,
  ): Promise<HumanAnalysisResult | null> {
    try {
      const { data, error } = await supabase
        .from("human_analysis")
        .select("*")
        .eq("chart_id", chartId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // No rows returned
        throw error;
      }

      return {
        analyst: {
          name: data.analyst_name || "Pending Assignment",
          avatar: data.analyst_avatar || "",
        },
        status: data.status as AnalysisStatus,
        submittedAt: data.submitted_at,
        completedAt: data.completed_at,
        analysis: data.analysis,
        recommendation: data.recommendation,
      };
    } catch (error) {
      console.error("Error getting human analysis:", error);
      throw error;
    }
  }

  // Get user's available credits
  static async getUserCredits(): Promise<{
    aiCredits: number;
    humanCredits: number;
  }> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      // Check if user has credits record
      const { data, error } = await supabase
        .from("user_credits")
        .select("ai_credits, human_credits")
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Create initial credits for user
          const { data: newData, error: insertError } = await supabase
            .from("user_credits")
            .insert({
              user_id: user.id,
              ai_credits: 10,
              human_credits: 5,
            })
            .select()
            .single();

          if (insertError) throw insertError;

          return {
            aiCredits: newData.ai_credits,
            humanCredits: newData.human_credits,
          };
        }
        throw error;
      }

      return {
        aiCredits: data.ai_credits,
        humanCredits: data.human_credits,
      };
    } catch (error) {
      console.error("Error getting user credits:", error);
      throw error;
    }
  }

  // Deduct AI credits
  private static async deductAICredits(): Promise<void> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_credits")
        .select("ai_credits")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (data.ai_credits > 0) {
        await supabase
          .from("user_credits")
          .update({ ai_credits: data.ai_credits - 1 })
          .eq("user_id", user.id);
      }
    } catch (error) {
      console.error("Error deducting AI credits:", error);
    }
  }

  // Admin: Get pending human analysis requests
  static async getPendingHumanAnalysisRequests(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from("human_analysis")
        .select(
          `
          id,
          status,
          boost_credits,
          submitted_at,
          chart_uploads(id, chart_url, category, ticker, user_id)
        `,
        )
        .in("status", ["pending", "in-review"])
        .order("boost_credits", { ascending: false })
        .order("submitted_at", { ascending: true });

      if (error) throw error;

      // Add console log for debugging
      console.log("Pending requests data:", data);

      // Handle case where no data is returned
      if (!data || data.length === 0) {
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error getting pending human analysis requests:", error);
      throw error;
    }
  }

  // Admin: Update human analysis
  static async updateHumanAnalysis(
    analysisId: string,
    update: {
      status?: AnalysisStatus;
      analystId?: string;
      analystName?: string;
      analystAvatar?: string;
      analysis?: string;
      recommendation?: string;
      completedAt?: string;
    },
  ): Promise<void> {
    try {
      const updateData: any = {};

      if (update.status) updateData.status = update.status;
      if (update.analystId) updateData.analyst_id = update.analystId;
      if (update.analystName) updateData.analyst_name = update.analystName;
      if (update.analystAvatar)
        updateData.analyst_avatar = update.analystAvatar;
      if (update.analysis) updateData.analysis = update.analysis;
      if (update.recommendation)
        updateData.recommendation = update.recommendation;
      if (update.completedAt) updateData.completed_at = update.completedAt;

      const { error } = await supabase
        .from("human_analysis")
        .update(updateData)
        .eq("id", analysisId);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating human analysis:", error);
      throw error;
    }
  }
}
