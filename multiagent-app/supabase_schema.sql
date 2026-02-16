-- Add this to your Supabase SQL editor

CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  code TEXT DEFAULT '// Happy coding!',
  language TEXT DEFAULT 'javascript'
);

-- Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read/write to rooms for this demo
CREATE POLICY "Public Access" ON rooms FOR ALL USING (true);
