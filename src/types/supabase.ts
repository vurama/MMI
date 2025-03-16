export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      market_data: {
        Row: {
          change_percentage: number | null
          created_at: string | null
          current_price: number | null
          id: string
          last_updated: string | null
          market_cap: number | null
          name: string
          previous_price: number | null
          sector: string
          symbol: string
          volume: number | null
        }
        Insert: {
          change_percentage?: number | null
          created_at?: string | null
          current_price?: number | null
          id?: string
          last_updated?: string | null
          market_cap?: number | null
          name: string
          previous_price?: number | null
          sector: string
          symbol: string
          volume?: number | null
        }
        Update: {
          change_percentage?: number | null
          created_at?: string | null
          current_price?: number | null
          id?: string
          last_updated?: string | null
          market_cap?: number | null
          name?: string
          previous_price?: number | null
          sector?: string
          symbol?: string
          volume?: number | null
        }
        Relationships: []
      }
      market_sentiment: {
        Row: {
          ai_analysis: string | null
          created_at: string | null
          date: string
          id: string
          sector: string
          sentiment_score: number
        }
        Insert: {
          ai_analysis?: string | null
          created_at?: string | null
          date: string
          id?: string
          sector: string
          sentiment_score: number
        }
        Update: {
          ai_analysis?: string | null
          created_at?: string | null
          date?: string
          id?: string
          sector?: string
          sentiment_score?: number
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          created_at: string | null
          id: string
          published_at: string | null
          sectors: string[]
          sentiment: number | null
          source: string
          summary: string | null
          symbols: string[] | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          published_at?: string | null
          sectors: string[]
          sentiment?: number | null
          source: string
          summary?: string | null
          symbols?: string[] | null
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          published_at?: string | null
          sectors?: string[]
          sentiment?: number | null
          source?: string
          summary?: string | null
          symbols?: string[] | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      signals: {
        Row: {
          category: string
          created_at: string | null
          direction: string | null
          id: string
          momentum: string | null
          rsi: string | null
          sentiment: string | null
          signal_date: string | null
          status: string | null
          ticker: string
          timeframe: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          direction?: string | null
          id?: string
          momentum?: string | null
          rsi?: string | null
          sentiment?: string | null
          signal_date?: string | null
          status?: string | null
          ticker: string
          timeframe: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          direction?: string | null
          id?: string
          momentum?: string | null
          rsi?: string | null
          sentiment?: string | null
          signal_date?: string | null
          status?: string | null
          ticker?: string
          timeframe?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan: string
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_alerts: {
        Row: {
          condition: string
          created_at: string | null
          id: string
          is_active: boolean | null
          last_triggered: string | null
          notification_method: string
          sector: string
          symbol: string | null
          threshold: number
          user_id: string
        }
        Insert: {
          condition: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          notification_method: string
          sector: string
          symbol?: string | null
          threshold: number
          user_id: string
        }
        Update: {
          condition?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          notification_method?: string
          sector?: string
          symbol?: string | null
          threshold?: number
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          dashboard_layout: Json | null
          favorite_symbols: Json | null
          id: string
          notification_settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dashboard_layout?: Json | null
          favorite_symbols?: Json | null
          id?: string
          notification_settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dashboard_layout?: Json | null
          favorite_symbols?: Json | null
          id?: string
          notification_settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
