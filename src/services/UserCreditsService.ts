import { supabase } from "@/supabase/supabase";

export interface UserCredits {
  id: string;
  userId: string;
  signalCredits: number;
  createdAt: string;
  updatedAt: string;
}

export class UserCreditsService {
  // Get user's credits
  static async getUserCredits(): Promise<{ signalCredits: number }> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      // Check if user has credits record
      const { data, error } = await supabase
        .from("user_credits")
        .select("signal_credits")
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Create initial credits for user
          const { data: newData, error: insertError } = await supabase
            .from("user_credits")
            .insert({
              user_id: user.id,
              signal_credits: 500, // Default starting credits (increased for testing)
            })
            .select("*")
            .single();

          if (insertError) {
            console.error("Error inserting initial credits:", insertError);
            throw insertError;
          }

          if (!newData) {
            console.error("No data returned after inserting credits");
            return { signalCredits: 500 }; // Fallback to default
          }

          return {
            signalCredits: newData.signal_credits,
          };
        }
        throw error;
      }

      return {
        signalCredits: data.signal_credits,
      };
    } catch (error) {
      console.error("Error getting user credits:", error);
      // Return a default value instead of throwing to prevent UI errors
      return { signalCredits: 100 };
    }
  }

  // Deduct signal credits
  static async deductSignalCredits(amount: number = 1): Promise<void> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_credits")
        .select("signal_credits")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (data.signal_credits < amount) {
        throw new Error("Not enough credits");
      }

      await supabase
        .from("user_credits")
        .update({
          signal_credits: data.signal_credits - amount,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    } catch (error) {
      console.error("Error deducting signal credits:", error);
      throw error;
    }
  }

  // Add signal credits
  static async addSignalCredits(amount: number): Promise<void> {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("User not authenticated");

      // First try to get the user's credits
      const { data, error } = await supabase
        .from("user_credits")
        .select("signal_credits")
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // User doesn't have a credits record yet, create one
          const { error: insertError } = await supabase
            .from("user_credits")
            .insert({
              user_id: user.id,
              signal_credits: amount, // Start with the amount being added
            });

          if (insertError) throw insertError;
          return;
        }
        throw error;
      }

      // Update existing credits
      const { error: updateError } = await supabase
        .from("user_credits")
        .update({
          signal_credits: data.signal_credits + amount,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;
    } catch (error) {
      console.error("Error adding signal credits:", error);
      throw error;
    }
  }
}
