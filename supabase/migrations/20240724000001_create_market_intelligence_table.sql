-- Create market_intelligence table to store the dashboard data
CREATE TABLE IF NOT EXISTS market_intelligence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS market_intelligence_created_at_idx ON market_intelligence (created_at DESC);

-- Enable row level security
ALTER TABLE market_intelligence ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Public read access" ON market_intelligence;
CREATE POLICY "Public read access"
  ON market_intelligence FOR SELECT
  USING (true);

-- Create policy for authenticated insert access
DROP POLICY IF EXISTS "Authenticated insert access" ON market_intelligence;
CREATE POLICY "Authenticated insert access"
  ON market_intelligence FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Add to realtime publication
alter publication supabase_realtime add table market_intelligence;
