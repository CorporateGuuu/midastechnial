-- SQL schema for Supabase 'parts' table

CREATE TABLE IF NOT EXISTS public.parts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2),
  category VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index for faster search on name
CREATE INDEX IF NOT EXISTS idx_parts_name ON public.parts USING gin (to_tsvector('english', name));

-- Trigger to update updated_at on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_parts_updated_at ON public.parts;

CREATE TRIGGER update_parts_updated_at
BEFORE UPDATE ON public.parts
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
