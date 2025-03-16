-- Create signals table
CREATE TABLE IF NOT EXISTS signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  ticker TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  category TEXT NOT NULL,
  direction TEXT,
  sentiment TEXT,
  momentum TEXT,
  rsi TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  signal_date TIMESTAMP WITH TIME ZONE
);

-- Enable row level security
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own signals" ON signals;
CREATE POLICY "Users can view their own signals"
  ON signals FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own signals" ON signals;
CREATE POLICY "Users can insert their own signals"
  ON signals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add to realtime publication
alter publication supabase_realtime add table signals;
