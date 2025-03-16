-- Create chart_uploads table
CREATE TABLE IF NOT EXISTS chart_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chart_url TEXT NOT NULL,
  category TEXT NOT NULL,
  ticker TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_analysis table
CREATE TABLE IF NOT EXISTS ai_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chart_id UUID REFERENCES chart_uploads(id) ON DELETE CASCADE,
  recommendation TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  reasoning TEXT NOT NULL,
  key_levels JSONB,
  patterns JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create human_analysis table
CREATE TABLE IF NOT EXISTS human_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chart_id UUID REFERENCES chart_uploads(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  boost_credits INTEGER NOT NULL DEFAULT 0,
  analyst_id UUID,
  analyst_name TEXT,
  analyst_avatar TEXT,
  analysis TEXT,
  recommendation TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_credits table
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ai_credits INTEGER NOT NULL DEFAULT 10,
  human_credits INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on these tables
ALTER TABLE chart_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Create policies for chart_uploads
DROP POLICY IF EXISTS "Users can view their own chart uploads" ON chart_uploads;
CREATE POLICY "Users can view their own chart uploads"
  ON chart_uploads FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own chart uploads" ON chart_uploads;
CREATE POLICY "Users can insert their own chart uploads"
  ON chart_uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all chart uploads" ON chart_uploads;
CREATE POLICY "Admins can view all chart uploads"
  ON chart_uploads FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.is_admin = true
  ));

-- Create policies for ai_analysis
DROP POLICY IF EXISTS "Users can view their own AI analysis" ON ai_analysis;
CREATE POLICY "Users can view their own AI analysis"
  ON ai_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM chart_uploads
    WHERE chart_uploads.id = ai_analysis.chart_id
    AND chart_uploads.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins can view all AI analysis" ON ai_analysis;
CREATE POLICY "Admins can view all AI analysis"
  ON ai_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.is_admin = true
  ));

-- Create policies for human_analysis
DROP POLICY IF EXISTS "Users can view their own human analysis" ON human_analysis;
CREATE POLICY "Users can view their own human analysis"
  ON human_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM chart_uploads
    WHERE chart_uploads.id = human_analysis.chart_id
    AND chart_uploads.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins can view all human analysis" ON human_analysis;
CREATE POLICY "Admins can view all human analysis"
  ON human_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.is_admin = true
  ));

DROP POLICY IF EXISTS "Admins can update human analysis" ON human_analysis;
CREATE POLICY "Admins can update human analysis"
  ON human_analysis FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.is_admin = true
  ));

-- Create policies for user_credits
DROP POLICY IF EXISTS "Users can view their own credits" ON user_credits;
CREATE POLICY "Users can view their own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all user credits" ON user_credits;
CREATE POLICY "Admins can view all user credits"
  ON user_credits FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.is_admin = true
  ));

-- Enable realtime for these tables
alter publication supabase_realtime add table chart_uploads;
alter publication supabase_realtime add table ai_analysis;
alter publication supabase_realtime add table human_analysis;
alter publication supabase_realtime add table user_credits;
