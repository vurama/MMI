-- Create the market_intelligence table if it doesn't exist
CREATE TABLE IF NOT EXISTS market_intelligence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data JSONB NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE market_intelligence ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON market_intelligence;
CREATE POLICY "Allow all operations for authenticated users"
  ON market_intelligence
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE market_intelligence;
