import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleIFTTTWebhook(payload: any) {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke(
      "process_ifttt_webhook",
      {
        body: payload,
      },
    );

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return { success: false, error: error.message };
  }
}
