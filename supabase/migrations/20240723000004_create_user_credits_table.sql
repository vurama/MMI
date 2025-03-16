-- Create user_credits table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_credits INTEGER NOT NULL DEFAULT 25,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable row level security
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own credits";
CREATE POLICY "Users can view their own credits"
ON user_credits FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own credits";
CREATE POLICY "Users can update their own credits"
ON user_credits FOR UPDATE
USING (auth.uid() = user_id);

-- Add to realtime publication
alter publication supabase_realtime add table user_credits;
