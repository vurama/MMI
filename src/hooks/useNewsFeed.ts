import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";

export interface NewsItem {
  id: string;
  summary: string;
  link: string;
  timestamp: string;
  category: string;
  created_at: string;
}

export function useNewsFeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial news items
    const fetchNewsItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("news_feed")
          .select("*")
          .order("timestamp", { ascending: false });

        if (error) throw error;

        setNewsItems(data || []);
      } catch (err) {
        console.error("Error fetching news feed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItems();

    // Set up realtime subscription
    const subscription = supabase
      .channel("news_feed_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "news_feed" },
        (payload) => {
          console.log("New news item received:", payload);
          setNewsItems((prev) => [payload.new as NewsItem, ...prev]);
        },
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { newsItems, loading, error };
}
