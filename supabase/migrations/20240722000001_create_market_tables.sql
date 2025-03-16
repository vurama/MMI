-- Create market_data table
CREATE TABLE IF NOT EXISTS market_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sector VARCHAR NOT NULL,
  symbol VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  current_price DECIMAL(18, 2),
  previous_price DECIMAL(18, 2),
  change_percentage DECIMAL(8, 2),
  market_cap DECIMAL(18, 2),
  volume DECIMAL(18, 2),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  source VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  summary TEXT,
  sentiment DECIMAL(4, 2),
  sectors VARCHAR[] NOT NULL,
  symbols VARCHAR[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_alerts table
CREATE TABLE IF NOT EXISTS user_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  sector VARCHAR NOT NULL,
  symbol VARCHAR,
  condition VARCHAR NOT NULL,
  threshold DECIMAL(18, 2) NOT NULL,
  notification_method VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_triggered TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  dashboard_layout JSONB,
  favorite_symbols JSONB,
  notification_settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT user_preferences_user_id_key UNIQUE (user_id)
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  plan VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT subscriptions_user_id_key UNIQUE (user_id)
);

-- Create market_sentiment table
CREATE TABLE IF NOT EXISTS market_sentiment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sector VARCHAR NOT NULL,
  sentiment_score DECIMAL(4, 2) NOT NULL,
  ai_analysis TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT market_sentiment_sector_date_key UNIQUE (sector, date)
);

-- Enable Row Level Security
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_sentiment ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public data policies
DROP POLICY IF EXISTS "Public market data access" ON market_data;
CREATE POLICY "Public market data access" ON market_data FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public news articles access" ON news_articles;
CREATE POLICY "Public news articles access" ON news_articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public market sentiment access" ON market_sentiment;
CREATE POLICY "Public market sentiment access" ON market_sentiment FOR SELECT USING (true);

-- User-specific policies
DROP POLICY IF EXISTS "Users can view own alerts" ON user_alerts;
CREATE POLICY "Users can view own alerts" ON user_alerts 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own alerts" ON user_alerts;
CREATE POLICY "Users can insert own alerts" ON user_alerts 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own alerts" ON user_alerts;
CREATE POLICY "Users can update own alerts" ON user_alerts 
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own alerts" ON user_alerts;
CREATE POLICY "Users can delete own alerts" ON user_alerts 
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
CREATE POLICY "Users can view own preferences" ON user_preferences 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
CREATE POLICY "Users can insert own preferences" ON user_preferences 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
CREATE POLICY "Users can update own preferences" ON user_preferences 
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Enable realtime for tables
alter publication supabase_realtime add table market_data;
alter publication supabase_realtime add table news_articles;
alter publication supabase_realtime add table user_alerts;
alter publication supabase_realtime add table user_preferences;
alter publication supabase_realtime add table subscriptions;
alter publication supabase_realtime add table market_sentiment;
