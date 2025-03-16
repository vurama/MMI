-- Create news_feed table
CREATE TABLE IF NOT EXISTS news_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  summary TEXT NOT NULL,
  link TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS but make the table publicly readable
ALTER TABLE news_feed ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Public read access" ON news_feed;
CREATE POLICY "Public read access"
  ON news_feed FOR SELECT
  USING (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE news_feed;
