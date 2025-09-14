-- SQL schema for Supabase 'parts' table with enhanced security and performance

-- Enable Row Level Security (RLS)
ALTER TABLE IF EXISTS public.parts ENABLE ROW LEVEL SECURITY;

-- Create the parts table with comprehensive constraints
CREATE TABLE IF NOT EXISTS public.parts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL CHECK (length(trim(name)) > 0),
  description TEXT,
  price NUMERIC(10, 2) CHECK (price >= 0),
  category VARCHAR(100) NOT NULL CHECK (length(trim(category)) > 0),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  sku VARCHAR(100) UNIQUE NOT NULL CHECK (length(trim(sku)) > 0),
  manufacturer VARCHAR(100),
  model VARCHAR(100),
  compatibility TEXT[], -- Array of compatible devices
  warranty_period INTEGER DEFAULT 12 CHECK (warranty_period > 0), -- months
  weight_grams INTEGER CHECK (weight_grams > 0),
  dimensions_cm VARCHAR(50), -- e.g., "10x5x2"
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by VARCHAR(100),
  updated_by VARCHAR(100)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_parts_name ON public.parts USING gin (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_parts_category ON public.parts (category);
CREATE INDEX IF NOT EXISTS idx_parts_price ON public.parts (price);
CREATE INDEX IF NOT EXISTS idx_parts_stock ON public.parts (stock_quantity);
CREATE INDEX IF NOT EXISTS idx_parts_sku ON public.parts (sku);
CREATE INDEX IF NOT EXISTS idx_parts_manufacturer ON public.parts (manufacturer);
CREATE INDEX IF NOT EXISTS idx_parts_active ON public.parts (is_active);
CREATE INDEX IF NOT EXISTS idx_parts_created_at ON public.parts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parts_updated_at ON public.parts (updated_at DESC);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_parts_category_active ON public.parts (category, is_active);
CREATE INDEX IF NOT EXISTS idx_parts_price_category ON public.parts (price, category);
CREATE INDEX IF NOT EXISTS idx_parts_stock_category ON public.parts (stock_quantity, category);

-- Partial index for active parts only
CREATE INDEX IF NOT EXISTS idx_parts_active_only ON public.parts (name, price, category)
WHERE is_active = true;

-- GIN index for array compatibility search
CREATE INDEX IF NOT EXISTS idx_parts_compatibility ON public.parts USING gin (compatibility);

-- Create audit log table for tracking changes
CREATE TABLE IF NOT EXISTS public.parts_audit (
  id SERIAL PRIMARY KEY,
  part_id INTEGER REFERENCES public.parts(id) ON DELETE CASCADE,
  action VARCHAR(10) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_values JSONB,
  new_values JSONB,
  changed_by VARCHAR(100),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Index for audit table
CREATE INDEX IF NOT EXISTS idx_parts_audit_part_id ON public.parts_audit (part_id);
CREATE INDEX IF NOT EXISTS idx_parts_audit_changed_at ON public.parts_audit (changed_at DESC);

-- Create categories lookup table for data integrity
CREATE TABLE IF NOT EXISTS public.part_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_category_id INTEGER REFERENCES public.part_categories(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Insert standard categories
INSERT INTO public.part_categories (name, description) VALUES
('iPhone Parts', 'Apple iPhone repair parts and components'),
('iPad Parts', 'Apple iPad repair parts and components'),
('MacBook Parts', 'Apple MacBook repair parts and components'),
('Samsung Parts', 'Samsung device repair parts'),
('Tools', 'Repair tools and equipment'),
('Accessories', 'Device accessories and peripherals')
ON CONFLICT (name) DO NOTHING;

-- Create manufacturers lookup table
CREATE TABLE IF NOT EXISTS public.manufacturers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  country VARCHAR(100),
  website VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Insert common manufacturers
INSERT INTO public.manufacturers (name, country) VALUES
('Apple Inc.', 'United States'),
('Samsung Electronics', 'South Korea'),
('Foxconn', 'Taiwan'),
('Pegatron', 'Taiwan'),
('Wistron', 'Taiwan')
ON CONFLICT (name) DO NOTHING;

-- Updated trigger to update updated_at on row update
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

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_parts_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.parts_audit (part_id, action, old_values, changed_by)
    VALUES (OLD.id, 'DELETE', row_to_json(OLD), current_setting('app.current_user', true));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.parts_audit (part_id, action, old_values, new_values, changed_by)
    VALUES (NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), current_setting('app.current_user', true));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.parts_audit (part_id, action, new_values, changed_by)
    VALUES (NEW.id, 'INSERT', row_to_json(NEW), current_setting('app.current_user', true));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Create audit trigger
DROP TRIGGER IF EXISTS audit_parts_trigger ON public.parts;
CREATE TRIGGER audit_parts_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.parts
FOR EACH ROW EXECUTE PROCEDURE audit_parts_changes();

-- Row Level Security policies (if using Supabase auth)
-- Uncomment and modify based on your authentication setup

-- CREATE POLICY "Enable read access for all users" ON public.parts
-- FOR SELECT USING (is_active = true);

-- CREATE POLICY "Enable insert for authenticated users only" ON public.parts
-- FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Enable update for authenticated users only" ON public.parts
-- FOR UPDATE USING (auth.role() = 'authenticated');

-- Function to get low stock alerts
CREATE OR REPLACE FUNCTION get_low_stock_parts(threshold INTEGER DEFAULT 5)
RETURNS TABLE (
  id INTEGER,
  name VARCHAR(255),
  stock_quantity INTEGER,
  category VARCHAR(100)
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.name, p.stock_quantity, p.category
  FROM public.parts p
  WHERE p.stock_quantity <= threshold
    AND p.is_active = true
  ORDER BY p.stock_quantity ASC;
END;
$$ language 'plpgsql';

-- Function to update stock levels safely
CREATE OR REPLACE FUNCTION update_part_stock(
  part_id INTEGER,
  quantity_change INTEGER,
  updated_by_user VARCHAR(100) DEFAULT 'system'
)
RETURNS BOOLEAN AS $$
DECLARE
  new_quantity INTEGER;
BEGIN
  -- Update the stock
  UPDATE public.parts
  SET stock_quantity = stock_quantity + quantity_change,
      updated_at = now(),
      updated_by = updated_by_user
  WHERE id = part_id
    AND is_active = true
  RETURNING stock_quantity INTO new_quantity;

  -- Check if update was successful
  IF new_quantity IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Ensure stock doesn't go negative
  IF new_quantity < 0 THEN
    -- Rollback by subtracting the change again
    UPDATE public.parts
    SET stock_quantity = stock_quantity - quantity_change,
        updated_at = now()
    WHERE id = part_id;

    RAISE EXCEPTION 'Stock quantity cannot be negative';
  END IF;

  RETURN TRUE;
END;
$$ language 'plpgsql';

-- Function to search parts with full-text search
CREATE OR REPLACE FUNCTION search_parts(
  search_query TEXT,
  category_filter VARCHAR(100) DEFAULT NULL,
  min_price NUMERIC DEFAULT NULL,
  max_price NUMERIC DEFAULT NULL,
  in_stock_only BOOLEAN DEFAULT false,
  limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  id INTEGER,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC(10, 2),
  category VARCHAR(100),
  stock_quantity INTEGER,
  sku VARCHAR(100),
  manufacturer VARCHAR(100)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.description,
    p.price,
    p.category,
    p.stock_quantity,
    p.sku,
    p.manufacturer
  FROM public.parts p
  WHERE p.is_active = true
    AND (search_query IS NULL OR to_tsvector('english', p.name || ' ' || COALESCE(p.description, '')) @@ plainto_tsquery('english', search_query))
    AND (category_filter IS NULL OR p.category = category_filter)
    AND (min_price IS NULL OR p.price >= min_price)
    AND (max_price IS NULL OR p.price <= max_price)
    AND (NOT in_stock_only OR p.stock_quantity > 0)
  ORDER BY
    CASE WHEN search_query IS NOT NULL THEN
      ts_rank(to_tsvector('english', p.name || ' ' || COALESCE(p.description, '')), plainto_tsquery('english', search_query))
    ELSE 0 END DESC,
    p.created_at DESC
  LIMIT limit_count;
END;
$$ language 'plpgsql';

-- Insert iPhone 13 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 13 (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 13 - Genuine OEM Part', 277.25, 'iPhone 13 Parts', 10),
('OLED Assembly Compatible For iPhone 13 (Genuine OEM)', 'OLED Assembly Compatible For iPhone 13 - Genuine OEM Part', 321.89, 'iPhone 13 Parts', 8),
('Replacement Battery With Adhesive For iPhone 13 (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 - Genuine OEM Part', 49.74, 'iPhone 13 Parts', 25),
('Front Camera For iPhone 13 (Genuine OEM)', 'Quality Apple Genuine Front Camera For iPhone 13 - Genuine OEM Part', 154.52, 'iPhone 13 Parts', 15),
('Single SIM Card Tray For iPhone 13 (Genuine OEM) (Pink)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Pink - Genuine OEM Part', 10.67, 'iPhone 13 Parts', 20),
('Single SIM Card Tray Compatible For iPhone 13 (Genuine OEM) (Blue)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Blue - Genuine OEM Part', 10.67, 'iPhone 13 Parts', 20),
('Single SIM Card Tray For iPhone 13 (Genuine OEM) (Red)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Red - Genuine OEM Part', 10.67, 'iPhone 13 Parts', 20),
('Single SIM Card Tray For iPhone 13 (Genuine OEM) (Mint)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Mint - Genuine OEM Part', 10.67, 'iPhone 13 Parts', 20),
('Single SIM Card Tray For iPhone 13 (Genuine OEM) (Starlight)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Starlight - Genuine OEM Part', 10.67, 'iPhone 13 Parts', 20),
('Single SIM Card Tray Compatible For iPhone 13 (Genuine OEM) (Green)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Green - Genuine OEM Part', 10.67, 'iPhone 13 Parts', 20),
('Adhesive (5G MmWave Antenna) Compatible For iPhone 13 (Genuine OEM) (48 Pack)', 'Quality Apple Genuine Adhesive (5G MmWave Antenna) Compatible For iPhone 13 - 48 Pack - Genuine OEM Part', 6.75, 'iPhone 13 Parts', 5),
('Waterproof Display Adhesive Tape Compatible For iPhone 13 (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 13 Parts', 12),
('Display Adhesive Compatible For iPhone 13 (Genuine OEM) (30 Pack)', 'Display Adhesive Compatible For iPhone 13 - 30 Pack - Genuine OEM Part', 36.00, 'iPhone 13 Parts', 10);

-- Insert iPhone 13 Pro Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 13 Pro (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 13 Pro - Genuine OEM Part', 289.70, 'iPhone 13 Pro Parts', 10),
('OLED Assembly Compatible For iPhone 13 Pro (Genuine OEM)', 'OLED Assembly Compatible For iPhone 13 Pro - Genuine OEM Part', 334.34, 'iPhone 13 Pro Parts', 8),
('Replacement Battery With Adhesive For iPhone 13 Pro (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 Pro - Genuine OEM Part', 49.74, 'iPhone 13 Pro Parts', 25),
('Front Camera For iPhone 13 Pro (Genuine OEM)', 'Quality Apple Genuine Front Camera For iPhone 13 Pro - Genuine OEM Part', 154.52, 'iPhone 13 Pro Parts', 15),
('Back Camera For iPhone 13 Pro / 13 Pro Max (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 13 Pro / 13 Pro Max - Genuine OEM Part', 195.99, 'iPhone 13 Pro Parts', 12),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Blue)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Blue - Genuine OEM Part', 10.67, 'iPhone 13 Pro Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Gold)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Gold - Genuine OEM Part', 10.67, 'iPhone 13 Pro Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Silver)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Silver - Genuine OEM Part', 10.67, 'iPhone 13 Pro Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Graphite)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Graphite - Genuine OEM Part', 10.67, 'iPhone 13 Pro Parts', 20),
('Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Green)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Green - Genuine OEM Part', 10.67, 'iPhone 13 Pro Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 13 Pro Parts', 12);

-- Insert iPhone 13 Pro Max Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 13 Pro Max (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 13 Pro Max - Genuine OEM Part', 326.58, 'iPhone 13 Pro Max Parts', 8),
('OLED Assembly Compatible For iPhone 13 Pro Max (Genuine OEM)', 'OLED Assembly Compatible For iPhone 13 Pro Max - Genuine OEM Part', 379.22, 'iPhone 13 Pro Max Parts', 6),
('Replacement Battery With Adhesive For iPhone 13 Pro Max (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 Pro Max - Genuine OEM Part', 49.74, 'iPhone 13 Pro Max Parts', 25),
('Front Camera For iPhone 13 Pro Max (Genuine OEM)', 'Quality Apple Genuine Front Camera For iPhone 13 Pro Max - Genuine OEM Part', 154.52, 'iPhone 13 Pro Max Parts', 15),
('Back Camera For iPhone 13 Pro / 13 Pro Max (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 13 Pro / 13 Pro Max - Genuine OEM Part', 195.99, 'iPhone 13 Pro Max Parts', 12),
('Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Green)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Green - Genuine OEM Part', 10.67, 'iPhone 13 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Graphite)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Graphite - Genuine OEM Part', 10.67, 'iPhone 13 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Silver)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Silver - Genuine OEM Part', 10.67, 'iPhone 13 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Gold)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Gold - Genuine OEM Part', 10.67, 'iPhone 13 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Blue)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Blue - Genuine OEM Part', 10.67, 'iPhone 13 Pro Max Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro Max (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro Max - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 13 Pro Max Parts', 12);

-- Insert iPhone 14 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 14 (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 14 - Genuine OEM Part', 277.25, 'iPhone 14 Parts', 10),
('OLED Assembly Compatible For iPhone 14 (Genuine OEM)', 'OLED Assembly Compatible For iPhone 14 - Genuine OEM Part', 321.89, 'iPhone 14 Parts', 8),
('Replacement Battery With Adhesive Compatible For iPhone 14 (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 14 - Genuine OEM Part', 55.86, 'iPhone 14 Parts', 25),
('Front Camera Compatible For iPhone 14 (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 14 - Genuine OEM Part', 154.52, 'iPhone 14 Parts', 15),
('Back Camera For iPhone 14 (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 14 - Genuine OEM Part', 165.42, 'iPhone 14 Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Yellow)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Yellow - Genuine OEM Part', 124.86, 'iPhone 14 Parts', 15),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Purple)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Purple - Genuine OEM Part', 124.86, 'iPhone 14 Parts', 15),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Blue)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Blue - Genuine OEM Part', 124.86, 'iPhone 14 Parts', 15),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Red)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Red - Genuine OEM Part', 124.86, 'iPhone 14 Parts', 15),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Midnight)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Midnight - Genuine OEM Part', 124.86, 'iPhone 14 Parts', 15),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Starlight)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Starlight - Genuine OEM Part', 124.86, 'iPhone 14 Parts', 15),
('Sim Card Tray Compatible For iPhone 14 /14 Plus (Genuine OEM) (Red)', 'Quality Apple Genuine Sim Card Tray Compatible For iPhone 14 /14 Plus - Red - Genuine OEM Part', 10.67, 'iPhone 14 Parts', 20),
('Sim Card Tray For iPhone 14 / 14 Plus (Genuine OEM) (Yellow)', 'Quality Apple Genuine Sim Card Tray Compatible For iPhone 14 / 14 Plus - Yellow - Genuine OEM Part', 10.67, 'iPhone 14 Parts', 20),
('SIM Card Tray For iPhone 14 / 14 Plus (Genuine OEM) (Starlight)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 14 / 14 Plus - Starlight - Genuine OEM Part', 10.67, 'iPhone 14 Parts', 20),
('SIM Card Tray Compatible for iPhone 14 / 14 Plus (Genuine OEM) (Midnight)', 'Quality Apple Genuine SIM Card Tray Compatible for iPhone 14 / 14 Plus - Midnight - Genuine OEM Part', 10.67, 'iPhone 14 Parts', 20),
('Back Cover Adhesive Tape Compatible For iPhone 14 (Black) (30 Pack) (Genuine OEM)', 'Quality Apple Genuine Back Cover Adhesive Tape Compatible For iPhone 14 - Black - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 14 Parts', 12);

-- Insert iPhone 14 Plus Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 14 Plus (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 14 Plus - Genuine OEM Part', 326.58, 'iPhone 14 Plus Parts', 8),
('OLED Assembly Compatible For iPhone 14 Plus (Genuine OEM)', 'OLED Assembly Compatible For iPhone 14 Plus - Genuine OEM Part', 379.22, 'iPhone 14 Plus Parts', 6),
('Replacement Battery With Adhesive Compatible For iPhone 14 Plus (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 14 Plus - Genuine OEM Part', 55.86, 'iPhone 14 Plus Parts', 25),
('Front Camera For iPhone 14 Plus (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 14 Plus - Genuine OEM Part', 154.52, 'iPhone 14 Plus Parts', 15),
('Back Camera For iPhone 14 Plus (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 14 Plus - Genuine OEM Part', 165.42, 'iPhone 14 Plus Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus (Genuine OEM) (Yellow)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus - Yellow - Genuine OEM Part', 142.39, 'iPhone 14 Plus Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus (Genuine OEM) (Purple)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus - Purple - Genuine OEM Part', 142.39, 'iPhone 14 Plus Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus (Genuine OEM) (Blue)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus - Blue - Genuine OEM Part', 142.39, 'iPhone 14 Plus Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus (Genuine OEM) (Red)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus - Red - Genuine OEM Part', 142.39, 'iPhone 14 Plus Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus (Genuine OEM) (Starlight)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus - Starlight - Genuine OEM Part', 142.39, 'iPhone 14 Plus Parts', 12),
('Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus (Genuine OEM) (Midnight)', 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 Plus - Midnight - Genuine OEM Part', 142.39, 'iPhone 14 Plus Parts', 12),
('Sim Card Tray For iPhone 14 / 14 Plus (Genuine OEM) (Yellow)', 'Quality Apple Genuine Sim Card Tray Compatible For iPhone 14 / 14 Plus - Yellow - Genuine OEM Part', 10.67, 'iPhone 14 Plus Parts', 20),
('Sim Card Tray Compatible For iPhone 14 /14 Plus (Genuine OEM) (Red)', 'Quality Apple Genuine Sim Card Tray Compatible For iPhone 14 /14 Plus - Red - Genuine OEM Part', 10.67, 'iPhone 14 Plus Parts', 20),
('SIM Card Tray For iPhone 14 / 14 Plus (Genuine OEM) (Starlight)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 14 / 14 Plus - Starlight - Genuine OEM Part', 10.67, 'iPhone 14 Plus Parts', 20),
('SIM Card Tray Compatible for iPhone 14 / 14 Plus (Genuine OEM) (Midnight)', 'Quality Apple Genuine SIM Card Tray Compatible for iPhone 14 / 14 Plus - Midnight - Genuine OEM Part', 10.67, 'iPhone 14 Plus Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 14 Plus Parts', 12),
('Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus (Genuine OEM) (18 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus - 18 Pack - Genuine OEM Part', 27.06, 'iPhone 14 Plus Parts', 15);

-- Insert iPhone 14 Pro Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 14 Pro (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 14 Pro - Genuine OEM Part', 326.58, 'iPhone 14 Pro Parts', 8),
('OLED Assembly Compatible For iPhone 14 Pro (Genuine OEM)', 'OLED Assembly Compatible For iPhone 14 Pro - Genuine OEM Part', 379.22, 'iPhone 14 Pro Parts', 6),
('Replacement Battery With Adhesive For iPhone 14 Pro (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 14 Pro - Genuine OEM Part', 55.86, 'iPhone 14 Pro Parts', 25),
('Front Camera For iPhone 14 Pro (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 14 Pro - Genuine OEM Part', 216.77, 'iPhone 14 Pro Parts', 12),
('Back Camera For iPhone 14 Pro (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 14 Pro - Genuine OEM Part', 218.33, 'iPhone 14 Pro Parts', 10),
('Waterproof Display Adhesive Tape Compatible For iPhone 14 Pro (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 14 Pro - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 14 Pro Parts', 12),
('Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 14 Pro Parts', 12);

-- Insert iPhone 15 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 15 (Genuine OEM)', 'Quality Apple Genuine OLED Assembly For iPhone 15 - Genuine OEM Part', 277.31, 'iPhone 15 Parts', 10),
('OLED Assembly Compatible For iPhone 15 (Genuine OEM)', 'OLED Assembly Compatible For iPhone 15 - Genuine OEM Part', 310.79, 'iPhone 15 Parts', 8),
('Replacement Battery Compatible For iPhone 15 (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPhone 15 - Genuine OEM Part', 55.86, 'iPhone 15 Parts', 25),
('Charging Port Flex Cable With Board Compatible For iPhone 15 (Genuine OEM) (Pink)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 15 - Pink - Genuine OEM Part', 70.09, 'iPhone 15 Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 15 (Genuine OEM) (Yellow)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 15 - Yellow - Genuine OEM Part', 70.09, 'iPhone 15 Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 15 (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 15 - Blue - Genuine OEM Part', 70.09, 'iPhone 15 Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 15 (Genuine OEM) (Green)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 15 - Green - Genuine OEM Part', 70.09, 'iPhone 15 Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 15 (Genuine OEM) (Black)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 15 - Black - Genuine OEM Part', 70.09, 'iPhone 15 Parts', 15),
('Front Camera Compatible For iPhone 15 (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 15 - Genuine OEM Part', 154.52, 'iPhone 15 Parts', 15),
('Back Camera Compatible For iPhone 15 (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 15 - Genuine OEM Part', 215.42, 'iPhone 15 Parts', 12),
('Loudspeaker Compatible For iPhone 15 (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPhone 15 - Genuine OEM Part', 77.52, 'iPhone 15 Parts', 20),
('Top Speaker Compatible For iPhone 15 (Genuine OEM)', 'Quality Apple Genuine Top Speaker Compatible For iPhone 15 - Genuine OEM Part', 77.52, 'iPhone 15 Parts', 20),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex For IPhone 15 (Genuine OEM) (Blue)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 15 - Blue - Genuine OEM Part', 124.86, 'iPhone 15 Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex For IPhone 15 (Genuine OEM) (Yellow)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 15 - Yellow - Genuine OEM Part', 124.86, 'iPhone 15 Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex For IPhone 15 (Genuine OEM) (Pink)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 15 - Pink - Genuine OEM Part', 124.86, 'iPhone 15 Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex For IPhone 15 (Genuine OEM) (Black)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 15 - Black - Genuine OEM Part', 124.86, 'iPhone 15 Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex For IPhone 15 (Genuine OEM) (Green)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 15 - Green - Genuine OEM Part', 124.86, 'iPhone 15 Parts', 12),
('Back Housing Including Battery Compatible For iPhone 15 (US Version) (Genuine OEM) (Green)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 15 - US Version - Green - Genuine OEM Part', 322.47, 'iPhone 15 Parts', 8),
('Back Housing Including Battery Compatible For iPhone 15 (US Version) (Genuine OEM) (Blue)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 15 - US Version - Blue - Genuine OEM Part', 322.47, 'iPhone 15 Parts', 8),
('Back Housing Including Battery Compatible For iPhone 15 (US Version) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 15 - US Version - Yellow - Genuine OEM Part', 322.47, 'iPhone 15 Parts', 8),
('Back Housing Including Battery Compatible For iPhone 15 (US Version) (Genuine OEM) (Pink)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 15 - US Version - Pink - Genuine OEM Part', 322.47, 'iPhone 15 Parts', 8),
('Back Housing Including Battery Compatible For iPhone 15 (US Version) (Genuine OEM) (Black)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 15 - US Version - Black - Genuine OEM Part', 322.47, 'iPhone 15 Parts', 8);

-- Insert iPhone 16 Plus Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For iPhone 16 Plus (Genuine OEM)', 'OLED Assembly Compatible For iPhone 16 Plus - Genuine OEM Part', 326.65, 'iPhone 16 Plus Parts', 8),
('OLED Assembly Compatible For iPhone 16 Plus (Genuine OEM)', 'OLED Assembly Compatible For iPhone 16 Plus - Genuine OEM Part', 343.10, 'iPhone 16 Plus Parts', 6),
('Replacement Battery Compatible For iPhone 16 Plus (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPhone 16 Plus - Genuine OEM Part', 55.86, 'iPhone 16 Plus Parts', 25),
('Charging Port Flex Cable With Board Compatible For iPhone 16 Plus (Genuine OEM) (Black)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Plus - Black - Genuine OEM Part', 70.09, 'iPhone 16 Plus Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 16 Plus (Genuine OEM) (Teal)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Plus - Teal - Genuine OEM Part', 70.09, 'iPhone 16 Plus Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 16 Plus (Genuine OEM) (Ultramarine)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Plus - Ultramarine - Genuine OEM Part', 70.09, 'iPhone 16 Plus Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 16 Plus (Genuine OEM) (Pink)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Plus - Pink - Genuine OEM Part', 70.09, 'iPhone 16 Plus Parts', 15),
('Charging Port Flex Cable With Board Compatible For iPhone 16 Plus (Genuine OEM) (White)', 'Quality Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Plus - White - Genuine OEM Part', 70.09, 'iPhone 16 Plus Parts', 15),
('Back Camera Cover Shield Compatible for iPhone 16 / 16 Plus (Genuine OEM)', 'Quality Apple Genuine Back Camera Cover Shield Compatible for iPhone 16 / 16 Plus - Genuine OEM Part', 8.00, 'iPhone 16 Plus Parts', 30),
('Front Camera Compatible For iPhone 16 Plus (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 16 Plus - Genuine OEM Part', 154.52, 'iPhone 16 Plus Parts', 15),
('Back Camera For iPhone 16 Plus (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 16 Plus - Genuine OEM Part', 165.42, 'iPhone 16 Plus Parts', 12),
('Top Speaker Compatible For iPhone 16 Plus (mmWave) (Genuine OEM)', 'Quality Apple Genuine Top Speaker Compatible For iPhone 16 Plus - mmWave - Genuine OEM Part', 126.83, 'iPhone 16 Plus Parts', 15),
('Top Speaker Compatible For iPhone 16 Plus (Non- mmWave) (Genuine OEM)', 'Quality Apple Genuine Top Speaker Compatible For iPhone 16 Plus - Non-mmWave - Genuine OEM Part', 126.83, 'iPhone 16 Plus Parts', 15),
('Loud Speaker Compatible For iPhone 16 Plus (Genuine OEM)', 'Quality Apple Genuine Loud Speaker Compatible For iPhone 16 Plus - Genuine OEM Part', 126.83, 'iPhone 16 Plus Parts', 15),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus (Genuine OEM) (Teal)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus - Teal - Genuine OEM Part', 142.39, 'iPhone 16 Plus Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus (Genuine OEM) (Ultramarine)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus - Ultramarine - Genuine OEM Part', 142.39, 'iPhone 16 Plus Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus (Genuine OEM) (Pink)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus - Pink - Genuine OEM Part', 142.39, 'iPhone 16 Plus Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus (Genuine OEM) (White)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus - White - Genuine OEM Part', 142.39, 'iPhone 16 Plus Parts', 12),
('Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus (Genuine OEM) (Black)', 'Quality Apple Genuine Back Glass With Steel Plate With Wireless NFC Charging MagSafe Magnet & Flashlight Flex Compatible For iPhone 16 Plus - Black - Genuine OEM Part', 142.39, 'iPhone 16 Plus Parts', 12),
('Back Housing Including Battery Compatible For iPhone 16 Plus (US Version) (Genuine OEM) (Black)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 16 Plus - US Version - Black - Genuine OEM Part', 369.28, 'iPhone 16 Plus Parts', 8),
('Back Housing Including Battery Compatible For iPhone 16 Plus (US Version) (Genuine OEM) (Teal)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 16 Plus - US Version - Teal - Genuine OEM Part', 369.28, 'iPhone 16 Plus Parts', 8),
('Back Housing Including Battery Compatible For iPhone 16 Plus (US Version) (Genuine OEM) (Ultramarine)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 16 Plus - US Version - Ultramarine - Genuine OEM Part', 369.28, 'iPhone 16 Plus Parts', 8),
('Back Housing Including Battery Compatible For iPhone 16 Plus (US Version) (Genuine OEM) (Pink)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 16 Plus - US Version - Pink - Genuine OEM Part', 369.28, 'iPhone 16 Plus Parts', 8),
('Back Housing Including Battery Compatible For iPhone 16 Plus (US Version) (Genuine OEM) (White)', 'Quality Apple Genuine Back Housing Including Battery Compatible For iPhone 16 Plus - US Version - White - Genuine OEM Part', 369.28, 'iPhone 16 Plus Parts', 8),
('Single SIM Card Tray Compatible For iPhone 16 / 16 Plus (Genuine OEM) (Black)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 16 / 16 Plus - Black - Genuine OEM Part', 10.67, 'iPhone 16 Plus Parts', 20),
('Single SIM Card Tray Compatible For iPhone 16 / 16 Plus (Genuine OEM) (Pink)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 16 / 16 Plus - Pink - Genuine OEM Part', 10.67, 'iPhone 16 Plus Parts', 20),
('Single SIM Card Tray Compatible For iPhone 16 / 16 Plus (Genuine OEM) (Teal)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 16 / 16 Plus - Teal - Genuine OEM Part', 10.67, 'iPhone 16 Plus Parts', 20),
('Single SIM Card Tray Compatible For iPhone 16 / 16 Plus (Genuine OEM) (Ultramarine)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 16 / 16 Plus - Ultramarine - Genuine OEM Part', 10.67, 'iPhone 16 Plus Parts', 20),
('Single SIM Card Tray Compatible For iPhone 16 / 16 Plus (Genuine OEM) (White)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 16 / 16 Plus - White - Genuine OEM Part', 10.67, 'iPhone 16 Plus Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 16 Plus (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 16 Plus - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 16 Plus Parts', 12),
('Waterproof Back Cover Glass Adhesive Tape Compatible For iPhone 16 Plus (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Back Cover Glass Adhesive Tape Compatible For iPhone 16 Plus - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 16 Plus Parts', 12);

-- Insert iPad 11 (2025) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine LCD Assembly Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 263.85, 'iPad 11 (2025) Parts', 5),
('LCD Assembly Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine LCD Assembly Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 298.85, 'iPad 11 (2025) Parts', 4),
('LCD Assembly Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine LCD Assembly Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 263.85, 'iPad 11 (2025) Parts', 5),
('LCD Assembly Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine LCD Assembly Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 298.85, 'iPad 11 (2025) Parts', 4),
('Cover Glass Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Front Glass Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 8),
('Cover Glass Compatible For iPad 11 (2025) (WiFi) (Genuine OEM)', 'Quality Apple Genuine Front Glass Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 8),
('Replacement Battery Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 96.04, 'iPad 11 (2025) Parts', 12),
('Replacement Battery Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 96.04, 'iPad 11 (2025) Parts', 12),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Pink)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi / Cellular - Pink - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi / Cellular - Yellow - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Silver)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi / Cellular - Silver - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi) (Genuine OEM) (Pink)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Pink - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Yellow - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi) (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Blue - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) (WiFi) (Genuine OEM) (Silver)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Silver - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Front Camera Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Front Camera Compatible For iPad 11 (2025) (WiFi) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 156.64, 'iPad 11 (2025) Parts', 10),
('Back Camera Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 196.64, 'iPad 11 (2025) Parts', 8),
('Back Camera Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 236.64, 'iPad 11 (2025) Parts', 6),
('Back Camera Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 196.64, 'iPad 11 (2025) Parts', 8),
('Back Camera Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 236.64, 'iPad 11 (2025) Parts', 6),
('Speaker Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Speaker Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 15),
('Speaker Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Speaker Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 15),
('Power Button Flex Cable Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Pink)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Pink - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Flex Cable Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Yellow - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Flex Cable Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Flex Cable Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad 11 (2025) - WiFi Only - Silver - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Flex Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Pink)', 'Quality Apple Genuine Volume Flex Compatible For iPad 11 (2025) - WiFi Only - Pink - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Flex Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Flex Compatible For iPad 11 (2025) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Flex Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Volume Flex Compatible For iPad 11 (2025) - WiFi Only - Silver - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Flex Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Volume Flex Compatible For iPad 11 (2025) - WiFi Only - Yellow - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Compatible For iPad 11 (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Pink)', 'Quality Apple Genuine Volume Button Compatible For iPad 11 (2025) - WiFi / Cellular - Pink - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Volume Button Compatible For iPad 11 (2025) - WiFi / Cellular - Yellow - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad 11 (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Volume Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Silver)', 'Quality Apple Genuine Volume Button Compatible For iPad 11 (2025) - WiFi / Cellular - Silver - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Pink)', 'Quality Apple Genuine Power Button Compatible For iPad 11 (2025) - WiFi / Cellular - Pink - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Yellow)', 'Quality Apple Genuine Power Button Compatible For iPad 11 (2025) - WiFi / Cellular - Yellow - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Power Button Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM) (Silver)', 'Quality Apple Genuine Power Button Compatible For iPad 11 (2025) - WiFi / Cellular - Silver - Genuine OEM Part', 70.09, 'iPad 11 (2025) Parts', 12),
('Display Adhesive Tape Compatible For iPad 11 (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad 11 (2025) - WiFi / Cellular - Genuine OEM Part', 9.33, 'iPad 11 (2025) Parts', 20),
('Display Adhesive Tape Compatible For iPad 11 (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad 11 (2025) - WiFi Only - Genuine OEM Part', 9.33, 'iPad 11 (2025) Parts', 20);

-- Insert iPad Mini 7 (2024) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly With Digitizer Compatible For iPad Mini 7 (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Mini 7 (2024) - WiFi Only - All Colors - Genuine OEM Part', 291.94, 'iPad Mini 7 (2024) Parts', 6),
('LCD Assembly With Digitizer Compatible For iPad Mini 7 (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Mini 7 (2024) - WiFi Only - All Colors - Genuine OEM Part', 326.94, 'iPad Mini 7 (2024) Parts', 5),
('LCD Assembly With Digitizer Compatible For iPad Mini 7 (WiFi / 4G) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Mini 7 (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 291.94, 'iPad Mini 7 (2024) Parts', 6),
('LCD Assembly With Digitizer Compatible For iPad Mini 7 (WiFi / 4G) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Mini 7 (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 326.94, 'iPad Mini 7 (2024) Parts', 5),
('Replacement Battery Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 96.04, 'iPad Mini 7 (2024) Parts', 12),
('Replacement Battery Compatible For iPad Mini 7 (2024) (WiFi / 4G) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 96.04, 'iPad Mini 7 (2024) Parts', 12),
('Charging Port Flex Cable Compatible For iPad Mini 7 (2024) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 156.64, 'iPad Mini 7 (2024) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Starlight - Genuine OEM Part', 156.64, 'iPad Mini 7 (2024) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Blue - Genuine OEM Part', 156.64, 'iPad Mini 7 (2024) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) (Genuine OEM) (Purple)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Purple - Genuine OEM Part', 156.64, 'iPad Mini 7 (2024) Parts', 10),
('Front Camera Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 156.64, 'iPad Mini 7 (2024) Parts', 10),
('Front Camera Compatible For iPad Mini 7 (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 156.64, 'iPad Mini 7 (2024) Parts', 10),
('Back Camera Compatible For iPad Mini 7 (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 196.64, 'iPad Mini 7 (2024) Parts', 8),
('Back Camera Compatible For iPad Mini 7 (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 236.64, 'iPad Mini 7 (2024) Parts', 6),
('Back Camera Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 196.64, 'iPad Mini 7 (2024) Parts', 8),
('Back Camera Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 236.64, 'iPad Mini 7 (2024) Parts', 6),
('Loudspeaker Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 15),
('Loudspeaker Compatible For iPad Mini 7 (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 15),
('Power Button Flex Cable Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad Mini 7 (2024) - WiFi Only - Purple - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Flex Cable Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad Mini 7 (2024) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Flex Cable Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad Mini 7 (2024) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Flex Cable Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Power Button Flex Cable Compatible For iPad Mini 7 (2024) - WiFi Only - Starlight - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Microphone Flex Cable Compatible For iPad Mini 7 (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Microphone Flex Cable Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Microphone Flex Cable Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Microphone Flex Cable Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Display Adhesive Tape Compatible For iPad Mini 7 (WiFi Version) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Mini 7 (2024) - WiFi Only - Genuine OEM Part', 14.12, 'iPad Mini 7 (2024) Parts', 20),
('Display Adhesive Tape Compatible For iPad Mini 7 (WiFi / 4G Version) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Genuine OEM Part', 17.65, 'iPad Mini 7 (2024) Parts', 20),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Starlight - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Purple)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Purple - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi Only - Purple - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi Only - Starlight - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Volume Button Compatible For iPad Mini 7 (2024) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Mini 7 (2024) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Purple)', 'Quality Apple Genuine Power Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Purple - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12),
('Power Button Compatible For iPad Mini 7 (2024) (WiFi / Celluar) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Power Button Compatible For iPad Mini 7 (2024) - WiFi / Cellular - Starlight - Genuine OEM Part', 70.09, 'iPad Mini 7 (2024) Parts', 12);

-- Insert iPad Pro 11" 5th Gen (2024) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 591.51, 'iPad Pro 11" 5th Gen (2024) Parts', 4),
('OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 626.51, 'iPad Pro 11" 5th Gen (2024) Parts', 3),
('OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 591.51, 'iPad Pro 11" 5th Gen (2024) Parts', 4),
('OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 626.51, 'iPad Pro 11" 5th Gen (2024) Parts', 3),
('Display Assembly (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 554.86, 'iPad Pro 11" 5th Gen (2024) Parts', 4),
('Display Assembly (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 554.86, 'iPad Pro 11" 5th Gen (2024) Parts', 4),
('Display Assembly (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 589.86, 'iPad Pro 11" 5th Gen (2024) Parts', 3),
('Replacement Battery Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Pro 11" 5th Gen (2024) - Genuine OEM Part', 140.47, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Charging Port Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM) (Gray)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) - Gray - Genuine OEM Part', 261.74, 'iPad Pro 11" 5th Gen (2024) Parts', 8),
('Charging Port (I/O) Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM) (Silver)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) - Silver - Genuine OEM Part', 261.74, 'iPad Pro 11" 5th Gen (2024) Parts', 8),
('Back Camera Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Genuine OEM Part', 301.74, 'iPad Pro 11" 5th Gen (2024) Parts', 6),
('Back Camera Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Genuine OEM Part', 341.74, 'iPad Pro 11" 5th Gen (2024) Parts', 4),
('Back Camera Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 263.20, 'iPad Pro 11" 5th Gen (2024) Parts', 6),
('Back Camera Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 303.20, 'iPad Pro 11" 5th Gen (2024) Parts', 4),
('Front Camera Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Pro 11" 5th Gen (2024) - Genuine OEM Part', 261.74, 'iPad Pro 11" 5th Gen (2024) Parts', 8),
('Bottom Speaker Compatible For iPad Pro 11" 5th Gen (2024) (Wifi Only) (Genuine OEM)', 'Quality Apple Genuine Bottom Speaker Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 12),
('Top Speaker Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Top Speaker Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 12),
('Top Speaker Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Top Speaker Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 12),
('Power Button Flex Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Power Button Flex Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Silver - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Display Adhesive Tape Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Genuine OEM Part', 9.33, 'iPad Pro 11" 5th Gen (2024) Parts', 15),
('Display Adhesive Tape Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 9.33, 'iPad Pro 11" 5th Gen (2024) Parts', 15),
('Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM) (Silver)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Silver - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Power Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Power Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM) (Silver)', 'Quality Apple Genuine Power Button Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Silver - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Silver - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 11" 5th Gen (2024) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10),
('Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 11" 5th Gen (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 11" 5th Gen (2024) Parts', 10);

-- Insert iPad Pro 13" 7th Gen (2024) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 731.94, 'iPad Pro 13" 7th Gen (2024) Parts', 3),
('OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 766.94, 'iPad Pro 13" 7th Gen (2024) Parts', 2),
('OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 731.94, 'iPad Pro 13" 7th Gen (2024) Parts', 3),
('OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 766.94, 'iPad Pro 13" 7th Gen (2024) Parts', 2),
('Display Assembly Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 731.94, 'iPad Pro 13" 7th Gen (2024) Parts', 3),
('Display Assembly Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 766.94, 'iPad Pro 13" 7th Gen (2024) Parts', 2),
('Display Assembly (Nano- Texture) Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer (Nano- Texture) Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 731.94, 'iPad Pro 13" 7th Gen (2024) Parts', 3),
('Display Assembly (Nano- Texture) Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine OLED Assembly With Digitizer (Nano- Texture) Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - All Colors - Genuine OEM Part', 766.94, 'iPad Pro 13" 7th Gen (2024) Parts', 2),
('Replacement Battery Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Pro 13" 7th Gen (2024) - Genuine OEM Part', 156.64, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM) (Gray)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Gray - Genuine OEM Part', 261.74, 'iPad Pro 13" 7th Gen (2024) Parts', 6),
('Charging Port (I/O) Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM) (Silver)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Silver - Genuine OEM Part', 261.74, 'iPad Pro 13" 7th Gen (2024) Parts', 6),
('Back Camera Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Genuine OEM Part', 301.74, 'iPad Pro 13" 7th Gen (2024) Parts', 5),
('Back Camera Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Genuine OEM Part', 341.74, 'iPad Pro 13" 7th Gen (2024) Parts', 3),
('Back Camera Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 263.20, 'iPad Pro 13" 7th Gen (2024) Parts', 5),
('Back Camera Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 303.20, 'iPad Pro 13" 7th Gen (2024) Parts', 3),
('Front Camera Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 261.74, 'iPad Pro 13" 7th Gen (2024) Parts', 6),
('Display Adhesive Tape Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 11.58, 'iPad Pro 13" 7th Gen (2024) Parts', 12),
('Earpiece Speaker Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Earpiece Speaker Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 10),
('Loud Speaker Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Loud Speaker Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 10),
('Loud Speaker Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Loud Speaker Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 10),
('Power Button Flex Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Silver - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Power Button Flex Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Display Adhesive Tape Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Genuine OEM Part', 9.33, 'iPad Pro 13" 7th Gen (2024) Parts', 12),
('Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi/ Cellular) (Genuine OEM) (Silver)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Silver - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Power Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Silver)', 'Quality Apple Genuine Power Button Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Silver - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Power Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Compatible For iPad Pro 13" 7th Gen (2024) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8),
('Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Volume Button Compatible For iPad Pro 13" 7th Gen (2024) - WiFi Only - Silver - Genuine OEM Part', 70.09, 'iPad Pro 13" 7th Gen (2024) Parts', 8);

-- Insert iPad Air 11" (2024) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) - WiFi Only - All Colors - Genuine OEM Part', 357.47, 'iPad Air 11" (2024) Parts', 6),
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) - WiFi Only - All Colors - Genuine OEM Part', 392.47, 'iPad Air 11" (2024) Parts', 5),
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 357.47, 'iPad Air 11" (2024) Parts', 6),
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 392.47, 'iPad Air 11" (2024) Parts', 5);

-- Insert iPad Air 13" (2024) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 497.89, 'iPad Air 13" (2024) Parts', 4),
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) - WiFi / Cellular - All Colors - Genuine OEM Part', 532.89, 'iPad Air 13" (2024) Parts', 3),
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) (WiFi Only ) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) - WiFi Only - All Colors - Genuine OEM Part', 497.89, 'iPad Air 13" (2024) Parts', 4),
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) (WiFi Only ) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) - WiFi Only - All Colors - Genuine OEM Part', 532.89, 'iPad Air 13" (2024) Parts', 3);

-- Insert iPad Air 11" (2025) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) - WiFi Only - All Colors - Genuine OEM Part', 357.47, 'iPad Air 11" (2025) Parts', 6),
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) - WiFi Only - All Colors - Genuine OEM Part', 392.47, 'iPad Air 11" (2025) Parts', 5),
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) - WiFi / Cellular - All Colors - Genuine OEM Part', 357.47, 'iPad Air 11" (2025) Parts', 6),
('LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 11" (2025) - WiFi / Cellular - All Colors - Genuine OEM Part', 392.47, 'iPad Air 11" (2025) Parts', 5),
('Replacement Battery Compatible For iPad Air 11" (2025) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Air 11" (2025) - Genuine OEM Part', 96.04, 'iPad Air 11" (2025) Parts', 12),
('Charging Port Flex Cable Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Gray)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) - WiFi Only - Gray - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Charging Port Flex Cable Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM) (Gray)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) - WiFi / Cellular - Gray - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM) (Silver)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) - WiFi / Cellular - Silver - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM) (Purple)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) - WiFi / Cellular - Purple - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) (WiFi) (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 11" (2025) - WiFi Only - Blue - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Front Camera Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Air 11" (2025) - WiFi Only - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Back Camera Compatible For iPad Air 11" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Air 11" (2025) - WiFi / Cellular - Genuine OEM Part', 237.06, 'iPad Air 11" (2025) Parts', 8),
('Back Camera Compatible For iPad Air 11" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Air 11" (2025) - WiFi / Cellular - Genuine OEM Part', 277.06, 'iPad Air 11" (2025) Parts', 6),
('Front Camera Compatible For iPad Air 11" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Air 11" (2025) - WiFi / Cellular - Genuine OEM Part', 197.06, 'iPad Air 11" (2025) Parts', 10),
('Loudspeaker Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPad Air 11" (2025) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 15),
('Loudspeaker Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPad Air 11" (2025) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 15),
('Power Button Flex Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 11" (2025) - WiFi Only - Starlight - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Flex Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 11" (2025) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Flex Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 11" (2025) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Flex Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 11" (2025) - WiFi Only - Purple - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Display Adhesive Tape Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Air 11" (2025) - WiFi Only - Genuine OEM Part', 9.33, 'iPad Air 11" (2025) Parts', 20),
('Display Adhesive Tape Compatible For iPad Air 11" (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Air 11" (2025) - WiFi / Cellular - Genuine OEM Part', 9.33, 'iPad Air 11" (2025) Parts', 20),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi Only - Starlight - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi Only - Purple - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Starlight - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Volume Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Purple)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Purple - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Power Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Starlight - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12),
('Power Button Compatible For iPad Air 11" (2025) (WiFi/ Celluar) (Genuine OEM) (Purple)', 'Quality Apple Genuine Power Button Compatible For iPad Air 11" (2025) - WiFi / Cellular - Purple - Genuine OEM Part', 70.09, 'iPad Air 11" (2025) Parts', 12);

-- Insert iPad Air 13" (2025) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) / Air 13" (2025) - WiFi Only - All Colors - Genuine OEM Part', 497.89, 'iPad Air 13" (2025) Parts', 4),
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) / Air 13" (2025) - WiFi Only - All Colors - Genuine OEM Part', 532.89, 'iPad Air 13" (2025) Parts', 3),
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2025) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) / Air 13" (2025) - WiFi / Cellular - All Colors - Genuine OEM Part', 497.89, 'iPad Air 13" (2025) Parts', 4),
('LCD Assembly With Digitizer Compatible For iPad Air 13" (2025) (WiFi / Cellular) (Genuine OEM) (All Color)', 'Quality Apple Genuine LCD Assembly With Digitizer Compatible For iPad Air 13" (2024) / Air 13" (2025) - WiFi / Cellular - All Colors - Genuine OEM Part', 532.89, 'iPad Air 13" (2025) Parts', 3),
('Replacement Battery Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Air 13" (2025) - WiFi Only - Genuine OEM Part', 116.21, 'iPad Air 13" (2025) Parts', 10),
('Replacement Battery Compatible For iPad Air 13" (2025) (Genuine OEM)', 'Quality Apple Genuine Replacement Battery Compatible For iPad Air 13" (2025) - WiFi / Cellular - Genuine OEM Part', 116.21, 'iPad Air 13" (2025) Parts', 10),
('Charging Port Flex Cable Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Gray)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) - WiFi Only - Space Gray - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Charging Port Flex Cable Compatible For iPad Air 13" (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) - WiFi / Cellular - Space Gray - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) - WiFi Only - Blue - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Silver)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) - WiFi Only - Starlight - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Charging Port (I/O) Flex Cable Compatible For iPad Air 13" (2025) - WiFi Only - Purple - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Back Camera Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Air 13" (2025) - WiFi / Cellular - Genuine OEM Part', 237.06, 'iPad Air 13" (2025) Parts', 6),
('Back Camera Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Air 13" (2025) - WiFi / Cellular - Genuine OEM Part', 277.06, 'iPad Air 13" (2025) Parts', 4),
('Back Camera Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Air 13" (2025) - WiFi Only - Genuine OEM Part', 237.06, 'iPad Air 13" (2025) Parts', 6),
('Back Camera Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPad Air 13" (2025) - WiFi Only - Genuine OEM Part', 277.06, 'iPad Air 13" (2025) Parts', 4),
('Front Camera Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Air 13" (2025) - WiFi Only - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Front Camera Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPad Air 13" (2025) - WiFi / Cellular - Genuine OEM Part', 197.06, 'iPad Air 13" (2025) Parts', 8),
('Loudspeaker Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPad Air 13" (2025) - WiFi Only - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 12),
('Loudspeaker Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM)', 'Quality Apple Genuine Loudspeaker Compatible For iPad Air 13" (2025) - WiFi / Cellular - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 12),
('Power Button Flex Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 13" (2025) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Power Button Flex Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 13" (2025) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Power Button Flex Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 13" (2025) - WiFi Only - Starlight - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Power Button Flex Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Power Button Flex Compatible For iPad Air 13" (2025) - WiFi Only - Purple - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Display Adhesive Tape Compatible For iPad Air 13" (2025) (WiFi / Cellular) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Air 13" (2025) - WiFi / Cellular - Genuine OEM Part', 10.67, 'iPad Air 13" (2025) Parts', 15),
('Display Adhesive Tape Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM)', 'Quality Apple Genuine Display Adhesive Tape Compatible For iPad Air 13" (2025) - WiFi Only - Genuine OEM Part', 10.67, 'iPad Air 13" (2025) Parts', 15),
('Power Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Purple)', 'Quality Apple Genuine Power Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Purple - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi Only - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi Only - Blue - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi Only - Starlight - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi Only) (Genuine OEM) (Purple)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi Only - Purple - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Blue)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Starlight)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Starlight - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Volume Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Purple)', 'Quality Apple Genuine Volume Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Purple - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Power Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Stalight)', 'Quality Apple Genuine Power Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Starlight - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Power Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Blue)', 'Quality Apple Genuine Power Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Blue - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10),
('Power Button Compatible For iPad Air 13" (2025) (WiFi / Celluar) (Genuine OEM) (Space Gray)', 'Quality Apple Genuine Power Button Compatible For iPad Air 13" (2025) - WiFi / Cellular - Space Gray - Genuine OEM Part', 70.09, 'iPad Air 13" (2025) Parts', 10);

-- Insert iPhone X Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('SIM Card Tray Compatible For iPhone X (Genuine OEM) (Gray)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone X - Gray - Genuine OEM Part', 10.67, 'iPhone X Parts', 20);

-- Insert iPhone XR Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('SIM Card Tray Compatible For iPhone XR (Genuine OEM) (Blue)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XR - Blue - Genuine OEM Part', 10.67, 'iPhone XR Parts', 20),
('SIM Card Tray Compatible For iPhone XR (Genuine OEM) (Red)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XR - Red - Genuine OEM Part', 10.67, 'iPhone XR Parts', 20),
('SIM Card Tray Compatible For iPhone XR (Genuine OEM) (Coral)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XR - Coral - Genuine OEM Part', 10.67, 'iPhone XR Parts', 20),
('SIM Card Tray Compatible For iPhone XR (Genuine OEM) (Yellow)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XR - Yellow - Genuine OEM Part', 10.67, 'iPhone XR Parts', 20);

-- Insert iPhone XS Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Display Assembly Compatible For iPhone XS (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone XS - Genuine OEM Part', 312.48, 'iPhone XS Parts', 8),
('SIM Card Tray Compatible For iPhone XS (Genuine OEM) (Gold)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XS - Gold - Genuine OEM Part', 10.67, 'iPhone XS Parts', 20);

-- Insert iPhone XS Max Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('SIM Card Tray Compatible For iPhone XS Max (Genuine OEM) (Silver)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XS Max - Silver - Genuine OEM Part', 10.67, 'iPhone XS Max Parts', 20),
('SIM Card Tray Compatible For iPhone XS Max (Genuine OEM) (Gray)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XS Max - Gray - Genuine OEM Part', 10.67, 'iPhone XS Max Parts', 20),
('SIM Card Tray Compatible For iPhone XS Max (Genuine OEM) (Gold)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone XS Max - Gold - Genuine OEM Part', 10.67, 'iPhone XS Max Parts', 20);

-- Insert iPhone 11 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Single SIM Card Tray Compatible For iPhone 11 (Genuine OEM) (Yellow)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 - Yellow - Genuine OEM Part', 10.67, 'iPhone 11 Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 (Genuine OEM) (Red)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 - Red - Genuine OEM Part', 10.67, 'iPhone 11 Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 (Genuine OEM) (White)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 - White - Genuine OEM Part', 10.67, 'iPhone 11 Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 (Genuine OEM) (Black)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 - Black - Genuine OEM Part', 10.67, 'iPhone 11 Parts', 20);

-- Insert iPhone 11 Pro Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('iPhone 11 Pro Rear Protective Cover for Broken Glass (Pack of 10)', 'Quality Apple Genuine Back Protective Cover Film Sheet For 5.8" iPhone 11 Pro - Genuine OEM - 10 Pack', 3.54, 'iPhone 11 Pro Parts', 15),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Green)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Green - Genuine OEM Part', 10.67, 'iPhone 11 Pro Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Gold)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Gold - Genuine OEM Part', 10.67, 'iPhone 11 Pro Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Silver)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Silver - Genuine OEM Part', 10.67, 'iPhone 11 Pro Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Gray)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Gray - Genuine OEM Part', 10.67, 'iPhone 11 Pro Parts', 20);

-- Insert iPhone 11 Pro Max Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('iPhone XS Max Rear Protective Cover for Broken Glass (Pack of 10)', 'Quality Apple Genuine Back Protective Cover Film Sheet For 6.5" iPhone 11 Pro Max - Genuine OEM - 10 Pack', 3.54, 'iPhone 11 Pro Max Parts', 15),
('Back Protective Cover Film Sheet For 6.5" iPhone 11 Pro Max (Genuine OEM) (10 Pack)', 'Quality Apple Genuine Back Protective Cover Film Sheet For 6.5" iPhone 11 Pro Max - Genuine OEM - 10 Pack', 3.54, 'iPhone 11 Pro Max Parts', 15),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Gray)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Gray - Genuine OEM Part', 10.67, 'iPhone 11 Pro Max Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Silver)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Silver - Genuine OEM Part', 10.67, 'iPhone 11 Pro Max Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Gold)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Gold - Genuine OEM Part', 10.67, 'iPhone 11 Pro Max Parts', 20),
('Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max (Genuine OEM) (Green)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 11 Pro / 11 Pro Max - Green - Genuine OEM Part', 10.67, 'iPhone 11 Pro Max Parts', 20);

-- Insert iPhone 12 Mini Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery With Adhesive For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 12 Mini - Genuine OEM Part', 49.74, 'iPhone 12 Mini Parts', 25),
('Front Camera Compatible For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 12 Mini - Genuine OEM Part', 123.18, 'iPhone 12 Mini Parts', 15),
('Back Camera For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Mini - Genuine OEM Part', 165.42, 'iPhone 12 Mini Parts', 12),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Purple)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Purple - Genuine OEM Part', 10.67, 'iPhone 12 Mini Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (White)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - White - Genuine OEM Part', 10.67, 'iPhone 12 Mini Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Red)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Red - Genuine OEM Part', 10.67, 'iPhone 12 Mini Parts', 20),
('SIM Card Tray Compatible For iPhone 12 Mini (Genuine OEM) (Blue)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Blue - Genuine OEM Part', 10.67, 'iPhone 12 Mini Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Green)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Green - Genuine OEM Part', 10.67, 'iPhone 12 Mini Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Black)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Black - Genuine OEM Part', 10.67, 'iPhone 12 Mini Parts', 20),
('Display Adhesive Compatible For iPhone 12 Mini (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Display Adhesive Compatible For iPhone 12 Mini - 30 Pack - Genuine OEM Part', 28.71, 'iPhone 12 Mini Parts', 12);

-- Insert iPhone 12 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 Mini - Genuine OEM Part', 237.02, 'iPhone 12 Parts', 8),
('OLED Assembly For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 Mini - Genuine OEM Part', 273.66, 'iPhone 12 Parts', 6),
('OLED Assembly For iPhone 12 (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 - Genuine OEM Part', 289.70, 'iPhone 12 Parts', 8),
('OLED Assembly For iPhone 12 (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 - Genuine OEM Part', 334.34, 'iPhone 12 Parts', 6),
('Replacement Battery With Adhesive For iPhone 12 / 12 Pro (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 12 / 12 Pro - Genuine OEM Part', 49.74, 'iPhone 12 Parts', 25),
('Replacement Battery With Adhesive For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 12 Mini - Genuine OEM Part', 49.74, 'iPhone 12 Parts', 25),
('Front Camera Compatible For iPhone 12 / 12 Pro (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 12 / 12 Pro - Genuine OEM Part', 123.18, 'iPhone 12 Parts', 15),
('Front Camera Compatible For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 12 Mini - Genuine OEM Part', 123.18, 'iPhone 12 Parts', 15),
('Back Camera For iPhone 12 (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 - Genuine OEM Part', 165.42, 'iPhone 12 Parts', 12),
('Back Camera For iPhone 12 (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 - Genuine OEM Part', 205.98, 'iPhone 12 Parts', 10),
('Back Camera For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Mini - Genuine OEM Part', 165.42, 'iPhone 12 Parts', 12),
('Back Camera For iPhone 12 Mini (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Mini - Genuine OEM Part', 205.98, 'iPhone 12 Parts', 10),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Green)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Green - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Single SIM Card Tray Compatible For iPhone 12 (Genuine OEM) (Black)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 - Black - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('SIM Card Tray Compatible For iPhone 12 Mini (Genuine OEM) (Blue)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Blue - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Black)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Black - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Purple)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Purple - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (White)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - White - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('SIM Card Tray For iPhone 12 Mini (Genuine OEM) (Red)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 12 Mini - Red - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Single SIM Card Tray For iPhone 12 (Genuine OEM) (White)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 - White - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Single SIM Card Tray For iPhone 12 (Genuine OEM) (Purple)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 - Purple - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Single SIM Card Tray For iPhone 12 (Genuine OEM) (Blue)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 - Blue - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Single SIM Card Tray For iPhone 12 (Genuine OEM) (Red)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 - Red - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Single SIM Card Tray For iPhone 12 (Genuine OEM) (Green)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 - Green - Genuine OEM Part', 10.67, 'iPhone 12 Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 12 (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 12 - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 12 Parts', 12),
('Display Adhesive Compatible For iPhone 12 Mini (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Display Adhesive Compatible For iPhone 12 Mini - 30 Pack - Genuine OEM Part', 28.71, 'iPhone 12 Parts', 12);

-- Insert iPhone 12 Pro Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 12 Pro (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 Pro - Genuine OEM Part', 289.70, 'iPhone 12 Pro Parts', 8),
('OLED Assembly For iPhone 12 Pro (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 Pro - Genuine OEM Part', 334.34, 'iPhone 12 Pro Parts', 6),
('Replacement Battery With Adhesive For iPhone 12 / 12 Pro (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 12 / 12 Pro - Genuine OEM Part', 49.74, 'iPhone 12 Pro Parts', 25),
('Front Camera Compatible For iPhone 12 / 12 Pro (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 12 / 12 Pro - Genuine OEM Part', 123.18, 'iPhone 12 Pro Parts', 15),
('Back Camera For iPhone 12 Pro (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Pro - Genuine OEM Part', 195.99, 'iPhone 12 Pro Parts', 12),
('Back Camera For iPhone 12 Pro (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Pro - Genuine OEM Part', 243.75, 'iPhone 12 Pro Parts', 10),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro Max (Genuine OEM) (Graphite)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro Max - Graphite - Genuine OEM Part', 10.67, 'iPhone 12 Pro Parts', 20),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro max (Genuine OEM) (Blue)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro max - Blue - Genuine OEM Part', 10.67, 'iPhone 12 Pro Parts', 20),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro max (Genuine OEM) (Gold)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro max - Gold - Genuine OEM Part', 10.67, 'iPhone 12 Pro Parts', 20),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro Max (Genuine OEM) (Silver)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro Max - Silver - Genuine OEM Part', 10.67, 'iPhone 12 Pro Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 12 Pro (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 12 Pro - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 12 Pro Parts', 12);

-- Insert iPhone 12 Pro Max Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 12 Pro Max (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 Pro Max - Genuine OEM Part', 342.38, 'iPhone 12 Pro Max Parts', 6),
('OLED Assembly For iPhone 12 Pro Max (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 12 Pro Max - Genuine OEM Part', 395.02, 'iPhone 12 Pro Max Parts', 5),
('Replacement Battery With Adhesive Compatible For iPhone 12 Pro Max (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 12 Pro Max - Genuine OEM Part', 49.74, 'iPhone 12 Pro Max Parts', 25),
('Front Camera For iPhone 12 Pro Max (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 12 Pro Max - Genuine OEM Part', 123.18, 'iPhone 12 Pro Max Parts', 15),
('Back Camera For iPhone 12 Pro Max (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Pro Max - Genuine OEM Part', 195.99, 'iPhone 12 Pro Max Parts', 12),
('Back Camera For iPhone 12 Pro Max (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 12 Pro Max - Genuine OEM Part', 243.75, 'iPhone 12 Pro Max Parts', 10),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro Max (Genuine OEM) (Graphite)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro Max - Graphite - Genuine OEM Part', 10.67, 'iPhone 12 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro max (Genuine OEM) (Blue)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro max - Blue - Genuine OEM Part', 10.67, 'iPhone 12 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro max (Genuine OEM) (Gold)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro max - Gold - Genuine OEM Part', 10.67, 'iPhone 12 Pro Max Parts', 20),
('Single SIM Card Tray For iPhone 12 Pro / 12 Pro Max (Genuine OEM) (Silver)', 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 12 Pro / 12 Pro Max - Silver - Genuine OEM Part', 10.67, 'iPhone 12 Pro Max Parts', 20),
('Waterproof Display Adhesive Tape Compatible For iPhone 12 Pro Max (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 12 Pro Max - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 12 Pro Max Parts', 12);

-- Insert iPhone 13 Mini Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly For iPhone 13 Mini (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 13 Mini - Genuine OEM Part', 237.02, 'iPhone 13 Mini Parts', 8),
('OLED Assembly For iPhone 13 Mini (Genuine OEM)', 'Quality Apple Genuine OLED Assembly Compatible For iPhone 13 Mini - Genuine OEM Part', 273.66, 'iPhone 13 Mini Parts', 6),
('Replacement Battery With Adhesive For iPhone 13 Mini (Genuine OEM)', 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 13 Mini - Genuine OEM Part', 49.74, 'iPhone 13 Mini Parts', 25),
('Front Camera For iPhone 13 Mini (Genuine OEM)', 'Quality Apple Genuine Front Camera Compatible For iPhone 13 Mini - Genuine OEM Part', 154.52, 'iPhone 13 Mini Parts', 15),
('Back Camera For iPhone 13 / 13 Mini (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 13 / 13 Mini - Genuine OEM Part', 165.42, 'iPhone 13 Mini Parts', 12),
('Back Camera For iPhone 13 / 13 Mini (Genuine OEM)', 'Quality Apple Genuine Back Camera Compatible For iPhone 13 / 13 Mini - Genuine OEM Part', 205.98, 'iPhone 13 Mini Parts', 10),
('SIM Card Tray Compatible For iPhone 13 Mini (Genuine OEM) (Green)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 13 Mini - Green - Genuine OEM Part', 10.67, 'iPhone 13 Mini Parts', 20),
('SIM Card Tray For iPhone 13 Mini (Genuine OEM) (Blue)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 13 Mini - Blue - Genuine OEM Part', 10.67, 'iPhone 13 Mini Parts', 20),
('SIM Card Tray Compatible For iPhone 13 Mini (Genuine OEM) (Red)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 13 Mini - Red - Genuine OEM Part', 10.67, 'iPhone 13 Mini Parts', 20),
('SIM Card Tray For iPhone 13 Mini (Genuine OEM) (Pink)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 13 Mini - Pink - Genuine OEM Part', 10.67, 'iPhone 13 Mini Parts', 20),
('SIM Card Tray For iPhone 13 Mini (Genuine OEM) (Mint)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 13 Mini - Mint - Genuine OEM Part', 10.67, 'iPhone 13 Mini Parts', 20),
('SIM Card Tray For iPhone 13 Mini (Genuine OEM) (Starlight)', 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 13 Mini - Starlight - Genuine OEM Part', 10.67, 'iPhone 13 Mini Parts', 20),
('iPhone 5.4 -inch Display Protective Cover for Broken Glass (Pack of 10)', 'Quality Apple Genuine Front LCD Display Protective Cover Film Sheet For 5.4" iPhone 12 Mini / 13 mini - Genuine OEM - 10 Pack', 8.67, 'iPhone 13 Mini Parts', 15),
('Waterproof Display Adhesive Tape Compatible For iPhone 13 Mini (Genuine OEM) (30 Pack)', 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 Mini - 30 Pack - Genuine OEM Part', 27.06, 'iPhone 13 Mini Parts', 12);

-- Insert Apple Watch Series 10 (46MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 10 (46MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 10 - 46MM - Premium Part', 248.03, 'Apple Watch Series 10 (46MM) Parts', 5),
('Front Cover Glass Compatible For Watch Series 10 (46MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 10 - 46MM - Genuine OEM Part', 3.03, 'Apple Watch Series 10 (46MM) Parts', 25),
('Replacement Battery Compatible For Watch Series 10 (46MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 10 - 46MM - Premium Part', 23.82, 'Apple Watch Series 10 (46MM) Parts', 20),
('Speaker Noise Reduction Cable Compatible For Watch Series 10 (46MM)', 'Quality Apple Genuine Speaker Noise Reduction Cable Compatible For Apple Watch Series 10 - 46MM - Genuine OEM Part', 7.93, 'Apple Watch Series 10 (46MM) Parts', 15),
('Battery Flex Cable Compatible For Watch Series 10 (46MM)', 'Quality Apple Genuine Battery Flex Cable Compatible For Apple Watch Series 10 - 46MM - Genuine OEM Part', 7.48, 'Apple Watch Series 10 (46MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 10 (46MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 10 - 46MM - Genuine OEM Part', 8.87, 'Apple Watch Series 10 (46MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 10 (46MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 10 - 46MM - Genuine OEM Part', 10.91, 'Apple Watch Series 10 (46MM) Parts', 15),
('Waterproof LCD Adhesive Seal Compatible For Watch Series 10 (46MM)', 'Quality Apple Genuine Waterproof LCD Adhesive Seal Compatible For Apple Watch Series 10 - 46MM - Genuine OEM Part', 0.86, 'Apple Watch Series 10 (46MM) Parts', 30),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 10 (42MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 10 (42MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 10 - 42MM - Premium Part', 248.03, 'Apple Watch Series 10 (42MM) Parts', 5),
('Front Cover Glass Compatible For Watch Series 10 (42MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 10 - 42MM - Genuine OEM Part', 3.03, 'Apple Watch Series 10 (42MM) Parts', 25),
('Replacement Battery Compatible For Watch Series 10 (42MM) (GPS Version Only) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 10 - 42MM - GPS Version Only - Premium Part', 21.85, 'Apple Watch Series 10 (42MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 10 (42MM) (GPS / Cellular Version) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 10 - 42MM - GPS / Cellular Version - Premium Part', 23.82, 'Apple Watch Series 10 (42MM) Parts', 20),
('Battery Flex Cable Compatible For Watch Series 10 (42MM)', 'Quality Apple Genuine Battery Flex Cable Compatible For Apple Watch Series 10 - 42MM - Genuine OEM Part', 7.41, 'Apple Watch Series 10 (42MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 10 (42MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 10 - 42MM - Genuine OEM Part', 8.87, 'Apple Watch Series 10 (42MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 10 (42MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 10 - 42MM - Genuine OEM Part', 10.91, 'Apple Watch Series 10 (42MM) Parts', 15),
('Waterproof LCD Adhesive Seal Compatible For Watch Series 10 (42MM)', 'Quality Apple Genuine Waterproof LCD Adhesive Seal Compatible For Apple Watch Series 10 - 42MM - Genuine OEM Part', 0.57, 'Apple Watch Series 10 (42MM) Parts', 30),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 9 (45MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 9 (45MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 9 - 45MM - Premium Part', 138.03, 'Apple Watch Series 9 (45MM) Parts', 8),
('2 in 1 Front Cover Glass With OCA Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine 2 in 1 Front Cover Glass With OCA Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 1.65, 'Apple Watch Series 9 (45MM) Parts', 20),
('Loudspeaker Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 3.32, 'Apple Watch Series 9 (45MM) Parts', 15),
('Vibrator Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 2.71, 'Apple Watch Series 9 (45MM) Parts', 15),
('Replacement Battery Compatible For Watch Series 9 (45MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 9 - 45MM - Premium Part', 16.21, 'Apple Watch Series 9 (45MM) Parts', 18),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Starlight)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series 9 (45MM) Parts', 25),
('LCD Flex Cable Compatible For Watch Series 9 (45MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 9 - 45MM - Genuine OEM Part', 9.67, 'Apple Watch Series 9 (45MM) Parts', 15),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Black - Genuine OEM Part', 1.06, 'Apple Watch Series 9 (45MM) Parts', 25),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 / 9 (41MM / 45MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 / 9 - 41MM / 45MM - GPS Version - Silver - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 9 (41MM / 45MM) (GPS Version) (Rose Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 9 - 41MM / 45MM - GPS Version - Rose Gold - Genuine OEM Part', 2.97, 'Apple Watch Series 9 (45MM) Parts', 15),
('Power Button Compatible For Watch Series 9 (41MM / 45MM) (Rose Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 9 - 41MM / 45MM - Rose Gold - Genuine OEM Part', 2.97, 'Apple Watch Series 9 (45MM) Parts', 15),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 9 (45MM) Parts', 30),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 9 (41MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 9 (41MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Apple Watch Series 9 - 41MM - Used OEM Pull Grade B/C', 135.03, 'Apple Watch Series 9 (41MM) Parts', 6),
('OLED Assembly Compatible For Watch Series 9 (41MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 9 - 41MM - Premium Part', 140.03, 'Apple Watch Series 9 (41MM) Parts', 8),
('Front Cover Glass Compatible For Watch Series 7 /8 / 9 (41MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 7 /8 / 9 - 41MM - Genuine OEM Part', 1.65, 'Apple Watch Series 9 (41MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 9 (41MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 9 - 41MM - Premium Part', 15.13, 'Apple Watch Series 9 (41MM) Parts', 18),
('Loudspeaker Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 2.85, 'Apple Watch Series 9 (41MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 9 (41MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 9 - 41MM - Genuine OEM Part', 9.68, 'Apple Watch Series 9 (41MM) Parts', 15),
('Vibrator Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 2.72, 'Apple Watch Series 9 (41MM) Parts', 15),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Starlight)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series 9 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Black - Genuine OEM Part', 1.06, 'Apple Watch Series 9 (41MM) Parts', 25),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 / 9 (41MM / 45MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 / 9 - 41MM / 45MM - GPS Version - Silver - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 9 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 9 (41MM / 45MM) (GPS Version) (Rose Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 9 - 41MM / 45MM - GPS Version - Rose Gold - Genuine OEM Part', 2.97, 'Apple Watch Series 9 (41MM) Parts', 15),
('Power Button Compatible For Watch Series 9 (41MM / 45MM) (Rose Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 9 - 41MM / 45MM - Rose Gold - Genuine OEM Part', 2.97, 'Apple Watch Series 9 (41MM) Parts', 15),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 9 (41MM) Parts', 30),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert iMac 27" (A1862) (2017 - 2019) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Complete LCD Display Assembly Compatible For iMac Pro 27" 5K (A1862 / Late 2017) (LM270QQ1 SDD1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac Pro 27" 5K (A1862 / Late 2017) (LM270QQ1 SDD1) (Used OEM Pull: Grade A)', 319.53, 'iMac 27" (A1862) Parts', 5),
('LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 'Quality Aftermarket Plus LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 4.15, 'iMac 27" (A1862) Parts', 25);

-- Insert iMac 21.5" (A1418) (2012 - 2019) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Complete LCD Display Assembly Compatible For iMac 21.5" 2K (A1418 / Late 2015) (LM215WF3 SDD4 / D5) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 21.5" 2K (A1418 / Late 2015) (LM215WF3 SDD4 / D5) (Used OEM Pull: Grade A)', 175.16, 'iMac 21.5" (A1418) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 21.5" 2K (A1418 / Late 2012 / Late 2013 / Mid 2014) (LM215WF3 SDD1 / D2 / D3) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 21.5" 2K (A1418 / Late 2012 / Late 2013 / Mid 2014) (LM215WF3 SDD1 / D2 / D3) (Used OEM Pull: Grade A)', 176.63, 'iMac 21.5" (A1418) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 21.5" 4K (A1418 / Late 2015 / Early 2016) (LM215UH1 SDA1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 21.5" 4K (A1418 / Late 2015 / Early 2016) (LM215UH1 SDA1) (Used OEM Pull: Grade A)', 222.33, 'iMac 21.5" (A1418) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 21.5" 4K (A1418 / Mid 2017 / Early 2019) / (A2116 / 2019) (LM215UH1 SDB1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 21.5" 4K (A1418 / Mid 2017 / Early 2019) / (A2116 / 2019) (LM215UH1 SDB1) (Used OEM Pull: Grade A)', 300.07, 'iMac 21.5" (A1418) Parts', 5),
('LCD Pre-cut Adhesive Tape Compatible For iMac 21.5" (Compatible With All Years) (Aftermarket Plus)', 'Quality Aftermarket Plus LCD Pre-cut Adhesive Tape Compatible For iMac 21.5" (Compatible With All Years) (Aftermarket Plus)', 4.07, 'iMac 21.5" (A1418) Parts', 25),
('LCD Pre-cut Adhesive Tape Compatible For iMac 21.5" (Compatible With All Years) (Premium)', 'Quality Premium LCD Pre-cut Adhesive Tape Compatible For iMac 21.5" (Compatible With All Years) (Premium)', 5.16, 'iMac 21.5" (A1418) Parts', 25),
('Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 19.24, 'iMac 21.5" (A1418) Parts', 15),
('Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 26.03, 'iMac 21.5" (A1418) Parts', 12),
('Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 44.72, 'iMac 21.5" (A1418) Parts', 10),
('Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 83.94, 'iMac 21.5" (A1418) Parts', 8),
('LCD Display Connector Compatible For MacBook Air 11" / Pro Unibody 13" / Pro Retina 13" / 15" (A1370 / A1369 / A1465 / A1466 / A1278 / A1425 / A1502 / A1398 / A1418 / Mid 2010 To Mid 2015) (518S0787/J900: 30 Pin)', 'LCD Display Connector Compatible For MacBook Air 11" / Pro Unibody 13" / Pro Retina 13" / 15" (A1370 / A1369 / A1465 / A1466 / A1278 / A1425 / A1502 / A1398 / A1418 / Mid 2010 To Mid 2015) (518S0787/J900: 30 Pin)', 1.63, 'iMac 21.5" (A1418) Parts', 20);

-- Insert iMac 27" (A1419) (2014 - 2019) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A1419 / Late 2015 / Early 2016) (LM270QQ1 SDB1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A1419 / Late 2015 / Early 2016) (LM270QQ1 SDB1) (Used OEM Pull: Grade A)', 295.09, 'iMac 27" (A1419) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A1419 / Mid 2017) (LM270QQ1 SDC1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A1419 / Mid 2017) (LM270QQ1 SDC1) (Used OEM Pull: Grade A)', 295.09, 'iMac 27" (A1419) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A1419 / Late 2014 / Mid 2015) (LM270QQ1 SDA1 / A2) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A1419 / Late 2014 / Mid 2015) (LM270QQ1 SDA1 / A2) (Used OEM Pull: Grade A)', 298.44, 'iMac 27" (A1419) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 27" Retina 2K (A1419 / Late 2012 / Late 2013) (LM270WQ1 SDF1 / F2) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 27" Retina 2K (A1419 / Late 2012 / Late 2013) (LM270WQ1 SDF1 / F2) (Used OEM Pull: Grade A)', 329.52, 'iMac 27" (A1419) Parts', 5),
('LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 'Quality Aftermarket Plus LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 4.15, 'iMac 27" (A1419) Parts', 25),
('LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Premium)', 'Quality Premium LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Premium)', 5.16, 'iMac 27" (A1419) Parts', 25),
('5K LVDS Connector Compatible For IMAC 27" A1419 (Mid 2015-Late 2017) (60 Pin)', '5K LVDS Connector Compatible For IMAC 27" A1419 (Mid 2015-Late 2017) (60 Pin)', 4.49, 'iMac 27" (A1419) Parts', 15),
('Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 19.24, 'iMac 27" (A1419) Parts', 15),
('Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 26.03, 'iMac 27" (A1419) Parts', 12),
('Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 44.72, 'iMac 27" (A1419) Parts', 10),
('Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 83.94, 'iMac 27" (A1419) Parts', 8),
('LCD FPC Connector Compatible For iMac 27" (A1419 / Late 2012 / 2013) (40 Pin)', 'LCD FPC Connector Compatible For iMac 27" (A1419 / Late 2012 / 2013) (40 Pin)', 1.89, 'iMac 27" (A1419) Parts', 20);

-- Insert Mac Mini Replacement Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('240W USB-C To USB-C Cable (6ft.) (Braided) Compatible For MacBook / iMac / Mac (OEM Grade A) (Bulk Packaging)', 'Quality OEM Grade A 240W USB-C To USB-C Cable (6ft.) (Braided) Compatible For MacBook / iMac / Mac (OEM Grade A) (Bulk Packaging)', 15.03, 'Mac Mini Accessories', 25),
('Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 19.24, 'Mac Mini Parts', 15),
('Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 26.03, 'Mac Mini Parts', 12),
('Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 44.72, 'Mac Mini Parts', 10),
('Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)', 83.94, 'Mac Mini Parts', 8),
('Hard Drive FPC Connector (Long) Compatible For Mac Mini (40 Pin)', 'Hard Drive FPC Connector (Long) Compatible For Mac Mini (A1347) (2014) (40 Pin)', 1.60, 'Mac Mini Parts', 20);

-- Insert iMac 27" (A1862, Late 2017) Replacement Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Complete LCD Display Assembly Compatible For iMac Pro 27" 5K (A1862 / Late 2017) (LM270QQ1 SDD1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac Pro 27" 5K (A1862 / Late 2017) (LM270QQ1 SDD1) (Used OEM Pull: Grade A)', 319.53, 'iMac 27" (A1862) Parts', 5),
('LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 'Quality Aftermarket Plus LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 4.15, 'iMac 27" (A1862) Parts', 25);

-- Insert iMac 24" (A2438) (2021 - 2022) Replacement Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Complete LCD Display Assembly Compatible For iMac 24" (A2438 / M1 / 2021) (Genuine OEM) (Silver)', 'Quality Apple Genuine Complete LCD Display Assembly Compatible For iMac 24" (A2438 / M1 / 2021) (Genuine OEM) (Silver)', 555.59, 'iMac 24" (A2438) Parts', 3),
('Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 / A2438 / A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Green)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 / A2438 / A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Green)', 344.44, 'iMac 24" (A2438) Parts', 4),
('Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874/ A2438 /A2873/ A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Silver)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874/ A2438 /A2873/ A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Silver)', 355.33, 'iMac 24" (A2438) Parts', 4),
('Complete LCD Display Assembly Compatible For iMac 24" M1 M3( A2874 / A2438 / A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Yellow)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 24" M1 M3( A2874 / A2438 / A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Yellow)', 355.62, 'iMac 24" (A2438) Parts', 4),
('Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 /A2438 /A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Blue)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 /A2438 /A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Blue)', 437.74, 'iMac 24" (A2438) Parts', 3),
('Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 / A2438 / A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Purple)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 / A2438 / A2873 / A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Purple)', 438.69, 'iMac 24" (A2438) Parts', 3),
('Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 /A2438 / A2873/ A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Pink)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 24" M1 M3 (A2874 /A2438 / A2873/ A2439) (LG204A-215 LM235UH1 SDD1) (Used OEM Pull: Grade A) (Pink)', 496.75, 'iMac 24" (A2438) Parts', 3);

-- Insert iMac 27" (A2115) (2019 - 2020) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A2115 / Early 2019) (LM270QQ1 SDE1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A2115 / Early 2019) (LM270QQ1 SDE1) (Used OEM Pull: Grade A)', 285.70, 'iMac 27" (A2115) Parts', 5),
('Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A2115 / Mid 2020) (LM270QQ1 SDF1) (Used OEM Pull: Grade A)', 'Quality OEM Pull A Complete LCD Display Assembly Compatible For iMac 27" Retina 5K (A2115 / Mid 2020) (LM270QQ1 SDF1) (Used OEM Pull: Grade A)', 287.54, 'iMac 27" (A2115) Parts', 5),
('LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 'Quality Aftermarket Plus LCD Pre-cut Adhesive Tape Compatible For iMac 27" (Compatible With All Years) (Aftermarket Plus)', 4.15, 'iMac 27" (A2115) Parts', 25);

-- Insert iPod Touch 6 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (White)', 'Quality Premium LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (White)', 13.67, 'iPod Touch 6 Parts', 10),
('LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (Black)', 'Quality Premium LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (Black)', 14.66, 'iPod Touch 6 Parts', 10),
('Replacement Battery Compatible For iPod Touch 5 / Touch 6 / Touch 7 (AmpSentrix Pro)', 'Replacement Battery Compatible For iPod Touch 5 / Touch 6 / Touch 7 (AmpSentrix Pro)', 6.49, 'iPod Touch 6 Parts', 25),
('Back Camera Compatible For iPod Touch 6', 'Back Camera Compatible For iPod Touch 6', 3.06, 'iPod Touch 6 Parts', 15),
('Front Camera Compatible For iPod Touch 6', 'Front Camera Compatible For iPod Touch 6', 3.16, 'iPod Touch 6 Parts', 15),
('Power & Volume Flex Compatible For iPod Touch 6', 'Power & Volume Flex Compatible For iPod Touch 6', 1.50, 'iPod Touch 6 Parts', 20),
('Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (Black)', 'Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (Black)', 2.08, 'iPod Touch 6 Parts', 15),
('Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (White)', 'Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (White)', 2.09, 'iPod Touch 6 Parts', 15),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull: Grade A) (Bulk Pack) (10 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (10 Pack)', 0.00, 'iPod Touch Accessories', 50),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull) (Bulk Pack) (50 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (50 Pack)', 0.00, 'iPod Touch Accessories', 20);

-- Insert iPod Touch 7 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (White)', 'Quality Premium LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (White)', 13.67, 'iPod Touch 7 Parts', 0),
('LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (Black)', 'Quality Premium LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (Black)', 14.66, 'iPod Touch 7 Parts', 0),
('Replacement Battery Compatible For iPod Touch 5 / Touch 6 / Touch 7 (AmpSentrix Pro)', 'Replacement Battery Compatible For iPod Touch 5 / Touch 6 / Touch 7 (AmpSentrix Pro)', 6.49, 'iPod Touch 7 Parts', 0),
('Power & Volume Flex Compatible For iPod Touch Nano 7 (Black)', 'Power & Volume Flex Compatible For iPod Touch Nano 7 (Black)', 1.89, 'iPod Touch 7 Parts', 0),
('Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (Black)', 'Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (Black)', 2.08, 'iPod Touch 7 Parts', 0),
('Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (White)', 'Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 6 / iPod Touch 7 (White)', 2.09, 'iPod Touch 7 Parts', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull: Grade A) (Bulk Pack) (10 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (10 Pack)', 0.00, 'iPod Touch Accessories', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull) (Bulk Pack) (50 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (50 Pack)', 0.00, 'iPod Touch Accessories', 0);

-- Insert iPod Nano 7 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Only Compatible For iPod Nano 7 (Premium)', 'Quality Premium LCD Only Compatible For iPod Nano 7 (Premium)', 4.35, 'iPod Nano 7 Parts', 0),
('Digitizer Compatible For iPod Nano 7 (White)', 'WHITE Digitizer Compatible For iPod Nano 7 (White)', 4.06, 'iPod Nano 7 Parts', 0),
('Digitizer Compatible For iPod Nano 7 (Black)', 'Black Digitizer Compatible For iPod Nano 7 (Black)', 4.09, 'iPod Nano 7 Parts', 0),
('Replacement Battery Compatible For iPod Nano 7', 'Replacement Battery Compatible For iPod Nano 7', 3.86, 'iPod Nano 7 Parts', 0),
('Home Button Compatible For iPod Nano 7 (Black)', 'Black Home Button Compatible For iPod Nano 7 (Black)', 1.89, 'iPod Nano 7 Parts', 0),
('Home Button Compatible For iPod Nano 7 (White)', 'WHITE Home Button Compatible For iPod Nano 7 (White)', 1.89, 'iPod Nano 7 Parts', 0),
('Power & Volume Flex Compatible For iPod Touch Nano 7 (White)', 'WHITE Power & Volume Flex Compatible For iPod Touch Nano 7 (White)', 1.48, 'iPod Nano 7 Parts', 0),
('Power & Volume Flex Compatible For iPod Touch Nano 7 (Black)', 'Black Power & Volume Flex Compatible For iPod Touch Nano 7 (Black)', 1.89, 'iPod Nano 7 Parts', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull: Grade A) (Bulk Pack) (10 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (10 Pack)', 0.00, 'iPod Accessories', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull) (Bulk Pack) (50 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (50 Pack)', 0.00, 'iPod Accessories', 0);

-- Insert iPod Nano 6 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly Compatible For iPod Nano 6 (Black) (Premium)', 'Black LCD Assembly Compatible For iPod Nano 6 (Black) (Premium)', 9.64, 'iPod Nano 6 Parts', 0);

-- Insert iPod Nano 5 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For iPod Nano 5', 'Replacement Battery Compatible For iPod Nano 5', 4.54, 'iPod Nano 5 Parts', 0);

-- Insert iPod Video Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For iPod Video (30GB) (580mAh)', 'Replacement Battery Compatible For iPod Video (30GB) (580mAh)', 3.41, 'iPod Video Parts', 0),
('Replacement Battery Compatible For iPod Video (60GB / 80GB) (850mAh)', 'Replacement Battery Compatible For iPod Video (60GB / 80GB) (850mAh)', 4.65, 'iPod Video Parts', 0);

-- Insert iPod Classic Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery (Thin) Compatible For iPod Classic (80GB / 120GB / 160GB) (650mAh)', 'Replacement Battery (Thin) Compatible For iPod Classic 6th & 7th Generation (80GB / 120GB / 160GB) (650mAh)', 4.76, 'iPod Classic Parts', 0),
('Replacement Battery (Thick) Compatible For iPod Classic (160GB) (850mAh)', 'Replacement Battery (Thick) Compatible For iPod Classic 6th & 7th Generation(160GB) (850mAh)', 5.23, 'iPod Classic Parts', 0),
('Charging Port Only Compatible For iPod Classic (White)', 'WHITE Charging Port Only Compatible For iPod Classic (White)', 4.63, 'iPod Classic Parts', 0),
('Headphone Jack Flex Cable Compatible For iPod Classic (White)', 'WHITE Headphone Jack Flex Cable Compatible For iPod Classic (White)', 8.52, 'iPod Classic Parts', 0),
('Headphone Jack Flex Cable Compatible For iPod Classic (Black)', 'Black Headphone Jack Flex Cable Compatible For iPod Classic (Black)', 8.95, 'iPod Classic Parts', 0);

-- Insert AirPods Max 2nd Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Charging Port Compatible For AirPods Max 2st Gen (2020) (Sky Blue)(USB-C)', 'SKY BLUE Charging Port Compatible For AirPods Max 2st Gen (2020) (Sky Blue)(USB-C)', 14.85, 'AirPods Max 2nd Gen Parts', 0),
('Charging Port Compatible For AirPods Max 2st Gen (2020) (Silver)(USB-C)', 'SILVER Charging Port Compatible For AirPods Max 2st Gen (2020) (Silver)(USB-C)', 14.85, 'AirPods Max 2nd Gen Parts', 0);

-- Insert AirPods Max 1st Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For AirPods Max', 'Replacement Battery Compatible For AirPods Max 1st Gen (2020)', 14.32, 'AirPods Max 1st Gen Parts', 0),
('Charging Port Compatible For AirPods Max(Pink)', 'PINK Charging Port Compatible For AirPods Max 1st Gen (2020) (Pink)', 11.25, 'AirPods Max 1st Gen Parts', 0),
('Charging Port Compatible For AirPods Max(Green)', 'GREEN Charging Port Compatible For AirPods Max 1st Gen (2020) (Green)', 11.25, 'AirPods Max 1st Gen Parts', 0),
('Charging Port Compatible For AirPods Max(Sky Blue)', 'SKY BLUE Charging Port Compatible For AirPods Max 1st Gen (2020) (Sky Blue)', 11.88, 'AirPods Max 1st Gen Parts', 0),
('Charging Port Compatible For AirPods Max(Silver)', 'SILVER Charging Port Compatible For AirPods Max 1st Gen (2020) (Silver)', 11.90, 'AirPods Max 1st Gen Parts', 0),
('Charging Port Compatible For AirPods Max(Space Gray)', 'SPACE GRAY Charging Port Compatible For AirPods Max 1st Gen (2020) (Space Gray)', 11.90, 'AirPods Max 1st Gen Parts', 0),
('Left & Right Loudspeaker Compatible For AirPods Max', 'Left / Right Loudspeaker Compatible For AirPods Max 1st Gen (2020)', 17.53, 'AirPods Max 1st Gen Parts', 0),
('Right Noise Reduction Extension Cable Compatible For AirPods Max', 'Right Noise Reduction Extension Cable Compatible For AirPods Max 1st Gen (2020)', 17.31, 'AirPods Max 1st Gen Parts', 0),
('Left Noise Reduction Extension Cable Compatible For AirPods Max', 'Left Noise Reduction Extension Cable Compatible For AirPods Max 1st Gen (2020)', 17.96, 'AirPods Max 1st Gen Parts', 0),
('Microphone Compatible For AirPods Max(821-01917A)', 'Microphone Compatible For AirPods Max 1st Gen (2020) (821-01917A)', 8.13, 'AirPods Max 1st Gen Parts', 0),
('Microphone Compatible For AirPods Max(821-03518A)', 'Microphone Compatible For AirPods Max 1st Gen (2020) (821-03518A)', 8.13, 'AirPods Max 1st Gen Parts', 0),
('Hinge Touchpoints Compatible For AirPods Max', 'Hinge Touchpoints Compatible For AirPods Max 1st Gen (2020)', 4.42, 'AirPods Max 1st Gen Parts', 0),
('Left Kickstand Hinge Compatible For AirPods Max', 'Left Kickstand Hinge Compatible For AirPods Max 1st Gen (2020)', 32.74, 'AirPods Max 1st Gen Parts', 0),
('Right Kickstand Hinge Compatible For AirPods Max', 'Right Kickstand Hinge Compatible For AirPods Max 1st Gen (2020)', 32.74, 'AirPods Max 1st Gen Parts', 0);

-- Insert AirPods Pro 2nd Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For Airpods Pro (2nd Gen / Late 2022) Charging Case (A2931 / A2699 / A2698)', 'Charging Case Replacement Battery Compatible For Airpods Pro 2nd Gen (2022)', 10.36, 'AirPods Pro 2nd Gen Parts', 0),
('Charging Case Charging Port With Flex Cable Compatible For Airpods Pro 2nd Gen (2022)(Lightning)', 'Charging Case Charging Port With Flex Cable Compatible For Airpods Pro 2nd Gen (2022)(Lightning)', 3.15, 'AirPods Pro 2nd Gen Parts', 0),
('Charging Case Charging Port With Flex Cable Compatible For Airpods Pro 2nd Gen (2022)(USB-C)', 'Charging Case Charging Port With Flex Cable Compatible For Airpods Pro 2nd Gen (2022)(USB-C)', 4.20, 'AirPods Pro 2nd Gen Parts', 0);

-- Insert AirPods Pro 1st Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For Airpods Pro Charging Case', 'Charging Case Replacement Battery Compatible For AirPods Pro 1st Gen (2019)', 5.18, 'AirPods Pro 1st Gen Parts', 0),
('Replacement Battery Compatible For Airpods Pro (Left or Right)', 'Replacement Battery Compatible For AirPods Pro 1st Gen (2019) (Left / Right)', 6.17, 'AirPods Pro 1st Gen Parts', 0),
('Charging Case Charging Port With Flex Cable Compatible For Airpods Pro 2nd Gen (2022)(USB-C)', 'Charging Case Charging Port With Flex Cable Compatible For AirPods Pro 1st Gen (2019)', 2.29, 'AirPods Pro 1st Gen Parts', 0);

-- Insert AirPods 3rd Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Charging Case Replacement Battery Compatible For AirPods (3rd Gen,Late 2021) (A2565 / A2564)', 'Charging Case Replacement Battery Compatible For AirPods 3rd Gen (2021)', 4.40, 'AirPods 3rd Gen Parts', 0),
('Replacement Battery Compatible For Airpods (3rd Gen) (Left or Right)', 'Replacement Battery Compatible For AirPods 3rd Gen (2021) (Left / Right)', 5.38, 'AirPods 3rd Gen Parts', 0),
('Earpiece Speaker Compatible For AirPods (3rd Gen) (2 Piece Set)', 'Earpiece Speaker Compatible For AirPods 3rd Gen (2021) (2 Piece Set)', 7.95, 'AirPods 3rd Gen Parts', 0),
('Precision Earphone Repair Holder Tool For AirPods 1st (2016) / 2nd (2019) / 3rd Gen (2021) (MaAnt)', 'Precision Earphone Repair Holder Tool For AirPods 1st (2016) / 2nd (2019) / 3rd Gen (2021) (MaAnt)', 36.68, 'AirPods Accessories', 0);

-- Insert AirPods 2nd Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For Airpods 1st / 2nd Gen (Left or Right)', 'Replacement Battery Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019) (Left / Right)', 3.33, 'AirPods 2nd Gen Parts', 0),
('Replacement Battery Compatible For Airpods 1st / 2nd Gen Charging Case', 'Charging Case Replacement Battery Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019)', 3.36, 'AirPods 2nd Gen Parts', 0),
('Charging Case Charging Port With Flex Cable Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019)(Lightning)', 'Charging Case Charging Port With Flex Cable Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019)(Lightning)', 2.15, 'AirPods 2nd Gen Parts', 0),
('Precision Earphone Repair Holder Tool For AirPods 1st (2016) / 2nd (2019) / 3rd Gen (2021) (MaAnt)', 'Precision Earphone Repair Holder Tool For AirPods 1st (2016) / 2nd (2019) / 3rd Gen (2021) (MaAnt)', 36.68, 'AirPods Accessories', 0);

-- Insert AirPods 1st Gen Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('Replacement Battery Compatible For Airpods 1st / 2nd Gen (Left or Right)', 'Replacement Battery Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019) (Left / Right)', 3.33, 'AirPods 1st Gen Parts', 0),
('Replacement Battery Compatible For Airpods 1st / 2nd Gen Charging Case', 'Charging Case Replacement Battery Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019)', 3.36, 'AirPods 1st Gen Parts', 0),
('Charging Case Charging Port With Flex Cable Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019)(Lightning)', 'Charging Case Charging Port With Flex Cable Compatible For Airpods 1st Gen (2016) / 2nd Gen (2019)(Lightning)', 2.15, 'AirPods 1st Gen Parts', 0),
('Precision Earphone Repair Holder Tool For AirPods 1st (2016) / 2nd (2019) / 3rd Gen (2021) (MaAnt)', 'Precision Earphone Repair Holder Tool For AirPods 1st (2016) / 2nd (2019) / 3rd Gen (2021) (MaAnt)', 36.68, 'AirPods Accessories', 0);

-- Insert iPod Touch 4 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly Compatible For iPod Touch 4 (Premium) (White)', 'Quality Premium LCD Assembly Compatible For iPod Touch 4 (Premium) (White)', 13.16, 'iPod Touch 4 Parts', 0),
('LCD Assembly Compatible For iPod Touch 4 (Premium) (Black)', 'Quality Premium LCD Assembly Compatible For iPod Touch 4 (Premium) (Black)', 13.80, 'iPod Touch 4 Parts', 0),
('Replacement Battery Compatible For iPod Touch 4 (Premium)', 'Quality Premium Replacement Battery Compatible For iPod Touch 4 (Premium)', 4.33, 'iPod Touch 4 Parts', 0),
('Loudspeaker Compatible For iPod Touch 4', 'Loudspeaker Compatible For iPod Touch 4', 1.86, 'iPod Touch 4 Parts', 0),
('Headphone Jack With Flex Cable Compatible For iPod Touch 4', 'Headphone Jack With Flex Cable Compatible For iPod Touch 4', 1.44, 'iPod Touch 4 Parts', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull: Grade A) (Bulk Pack) (10 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (10 Pack)', 0.00, 'iPod Touch Accessories', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull) (Bulk Pack) (50 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (50 Pack)', 0.00, 'iPod Touch Accessories', 0);

-- Insert iPod Touch 5 Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (White)', 'Quality Premium LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (White)', 13.67, 'iPod Touch 5 Parts', 0),
('LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (Black)', 'Quality Premium LCD Assembly Compatible For iPod Touch 5 / iPod Touch 6 / iPod Touch 7 (Premium) (Black)', 14.66, 'iPod Touch 5 Parts', 0),
('Replacement Battery Compatible For iPod Touch 5 / Touch 6 / Touch 7 (AmpSentrix Pro)', 'Replacement Battery Compatible For iPod Touch 5 / Touch 6 / Touch 7 (AmpSentrix Pro)', 6.49, 'iPod Touch 5 Parts', 0),
('Front Camera Compatible For iPod Touch 5', 'Front Camera Compatible For iPod Touch 5', 3.02, 'iPod Touch 5 Parts', 0),
('Back Camera Compatible For iPod Touch 5', 'Back Camera Compatible For iPod Touch 5', 3.05, 'iPod Touch 5 Parts', 0),
('Loudspeaker Compatible For iPod Touch 5', 'Loudspeaker Compatible For iPod Touch 5', 1.46, 'iPod Touch 5 Parts', 0),
('Power & Volume Flex Compatible For iPod Touch 5 (16GB)', 'Power & Volume Flex Compatible For iPod Touch 5 (16GB)', 0.47, 'iPod Touch 5 Parts', 0),
('Power & Volume Flex Compatible For iPod Touch 5 (32 GB / 64 GB)', 'Power & Volume Flex Compatible For iPod Touch 5 (32 GB / 64 GB)', 1.44, 'iPod Touch 5 Parts', 0),
('WiFi Flex Cable Compatible For iPod Touch 5', 'WiFi Flex Cable Compatible For iPod Touch 5', 0.25, 'iPod Touch 5 Parts', 0),
('Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 5 (White)', 'Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 5 (White)', 2.09, 'iPod Touch 5 Parts', 0),
('Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 5 (Black)', 'Headphone Jack With Charging Port Flex Cable Compatible For iPod Touch 5 (Black)', 2.27, 'iPod Touch 5 Parts', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull: Grade A) (Bulk Pack) (10 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (10 Pack)', 0.00, 'iPod Touch Accessories', 0),
('USB-A To Lightning Cable (3ft.) For iPhone / iPad / iPod (Used OEM Pull) (Bulk Pack) (50 Pack)', 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (OEM Grade A/B) (Bulk Packaging) (50 Pack)', 0.00, 'iPod Touch Accessories', 0);

-- Insert Apple Watch Series 1 (42MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 1 (42MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Watch Series 1 (42MM) (Used OEM Pull: Grade B/C)', 12.03, 'Apple Watch Series 1 (42MM) Parts', 0),
('OLED Assembly Compatible For Watch Series 1 (42MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Watch Series 1 (42MM) (Premium)', 18.03, 'Apple Watch Series 1 (42MM) Parts', 0),
('Digitizer Compatible For Watch Series 1 (42MM) (Glass Separation Required)', 'Digitizer Compatible For Watch Series 1 (42MM) (Glass Separation Required)', 4.81, 'Apple Watch Series 1 (42MM) Parts', 0),
('Front Cover Glass Compatible For Watch Series 1 (42MM)', 'Front Cover Glass Compatible For Watch Series 1 (42MM)', 1.66, 'Apple Watch Series 1 (42MM) Parts', 0),
('Replacement Battery Compatible For Watch Series 1 (42MM) (AmpSentrix Pro)', 'Replacement Battery Compatible For Watch Series 1 (42MM) (AmpSentrix Pro)', 5.19, 'Apple Watch Series 1 (42MM) Parts', 0),
('Replacement Battery Compatible For Watch Series 1 (42MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Watch Series 1 (42MM) (Premium)', 4.74, 'Apple Watch Series 1 (42MM) Parts', 0),
('Power Button Flex Cable With Metal Bracket Compatible For Watch Series 1 (42MM)', 'Power Button Flex Cable With Metal Bracket Compatible For Watch Series 1 (42MM)', 2.15, 'Apple Watch Series 1 (42MM) Parts', 0),
('Microphone Flex Compatible For Watch Series 1 (42MM)', 'Microphone Flex Compatible For Watch Series 1 (42MM)', 0.74, 'Apple Watch Series 1 (42MM) Parts', 0),
('LCD Flex Cable Compatible For Watch Series 1 (42MM)', 'LCD Flex Cable Compatible For Watch Series 1 (42MM)', 0.88, 'Apple Watch Series 1 (42MM) Parts', 0),
('Crown Flex Cable Compatible For Watch Series 2 (42MM)', 'Crown Flex Cable Compatible For Watch Series 2 (42MM)', 3.66, 'Apple Watch Series 1 (42MM) Parts', 0),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Button Springs Compatible For iWatch Series (100 Pack)', 10.57, 'Apple Watch Series 1 (42MM) Parts', 0),
('Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Silver)', 'SILVER Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Silver)', 0.60, 'Apple Watch Series 1 (42MM) Parts', 0),
('Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Black)', 'Black Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Black)', 0.60, 'Apple Watch Series 1 (42MM) Parts', 0),
('Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Silver)', 'SILVER Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Silver)', 0.60, 'Apple Watch Series 1 (42MM) Parts', 0),
('Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Black)', 'Black Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Black)', 0.60, 'Apple Watch Series 1 (42MM) Parts', 0),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 1.10, 'Apple Watch Series 1 (42MM) Parts', 0),
('LCD Adhesive Tape Compatible For Watch Series 1 / 2 / 3 (42MM)', 'LCD Adhesive Tape Compatible For Watch Series 1 / 2 / 3 (42MM)', 0.68, 'Apple Watch Series 1 (42MM) Parts', 0),
('Force Touch Sensor With Adhesive Compatible For Watch Series 1 (42MM)', 'Force Touch Sensor With Adhesive Compatible For Watch Series 1 (42MM)', 1.86, 'Apple Watch Series 1 (42MM) Parts', 0),
('OCA Compatible For Watch Series 1 / 2 / 3 (42MM) (10 Pack)', 'OCA Compatible For Watch Series 1 / 2 / 3 (42MM) (10 Pack)', 1.73, 'Apple Watch Series 1 (42MM) Parts', 0),
('Polarizer Compatible For Watch Series 1 / 2 / 3 (42MM) (10 Pack)', 'Polarizer Compatible For Watch Series 1 / 2 / 3 (42MM) (10 Pack)', 1.89, 'Apple Watch Series 1 (42MM) Parts', 0),
('Tester Cable Compatible For Watch Series 1 (38MM / 42MM)', 'Tester Cable Compatible For Watch Series 1 (38MM / 42MM)', 1.89, 'Apple Watch Series 1 (42MM) Parts', 0);

-- Insert Apple Watch Series 1 (38MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 1 (38MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Watch Series 1 (38MM) (Used OEM Pull: Grade B/C)', 8.25, 'Apple Watch Series 1 (38MM) Parts', 0),
('OLED Assembly Compatible For Watch Series 1 (38MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Watch Series 1 (38MM) (Premium)', 15.50, 'Apple Watch Series 1 (38MM) Parts', 0),
('Digitizer Compatible For Watch Series 1 (38MM) (Glass Separation Required)', 'Digitizer Compatible For Watch Series 1 (38MM) (Glass Separation Required)', 3.92, 'Apple Watch Series 1 (38MM) Parts', 0),
('Front Cover Glass Compatible For Watch Series 1 (38MM)', 'Front Cover Glass Compatible For Watch Series 1 (38MM)', 1.21, 'Apple Watch Series 1 (38MM) Parts', 0),
('Replacement Battery Compatible For Watch Series 1 (38MM) (Aftermarket)', 'Quality Aftermarket Replacement Battery Compatible For Watch Series 1 (38MM) (Aftermarket)', 4.29, 'Apple Watch Series 1 (38MM) Parts', 0),
('Replacement Battery Compatible For Watch Series 1 (38MM) (AmpSentrix Pro)', 'Replacement Battery Compatible For Watch Series 1 (38MM) (AmpSentrix Pro)', 5.46, 'Apple Watch Series 1 (38MM) Parts', 0),
('Power Button Flex Cable With Metal Bracket Compatible For Watch Series 1 (38MM)', 'Power Button Flex Cable With Metal Bracket Compatible For Watch Series 1 (38MM)', 3.52, 'Apple Watch Series 1 (38MM) Parts', 0),
('Microphone Flex Compatible For Watch Series 1 (38MM)', 'Microphone Flex Compatible For Watch Series 1 (38MM)', 0.86, 'Apple Watch Series 1 (38MM) Parts', 0),
('LCD Flex Cable Compatible For Watch Series 1 (38MM)', 'LCD Flex Cable Compatible For Watch Series 1 (38MM)', 0.88, 'Apple Watch Series 1 (38MM) Parts', 0),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Button Springs Compatible For iWatch Series (100 Pack)', 10.57, 'Apple Watch Series 1 (38MM) Parts', 0),
('Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Silver)', 'SILVER Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Silver)', 0.60, 'Apple Watch Series 1 (38MM) Parts', 0),
('Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Black)', 'Black Power Button Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM)(Black)', 0.60, 'Apple Watch Series 1 (38MM) Parts', 0),
('Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Silver)', 'SILVER Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Silver)', 0.60, 'Apple Watch Series 1 (38MM) Parts', 0),
('Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Black)', 'Black Crown Nut Compatible For Watch Series 1 / 2 / 3 (38MM / 42MM) (GPS Version) (Black)', 0.60, 'Apple Watch Series 1 (38MM) Parts', 0),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 1.10, 'Apple Watch Series 1 (38MM) Parts', 0),
('LCD Adhesive Tape Compatible For Watch Series 1 / 2 / 3 (38MM)', 'LCD Adhesive Tape Compatible For Watch Series 1 / 2 / 3 (38MM)', 0.71, 'Apple Watch Series 1 (38MM) Parts', 0),
('Force Touch Sensor With Adhesive Compatible For Watch Series 1 (38MM)', 'Force Touch Sensor With Adhesive Compatible For Watch Series 1 (38MM)', 1.86, 'Apple Watch Series 1 (38MM) Parts', 0),
('Polarizer Compatible For Watch Series 1 / 2 / 3 (38MM) (10 Pack)', 'Polarizer Compatible For Watch Series 1 / 2 / 3 (38MM) (10 Pack)', 1.44, 'Apple Watch Series 1 (38MM) Parts', 0),
('OCA Compatible For Watch Series 1 / 2 / 3 (38MM) (10 Pack)', 'OCA Compatible For Watch Series 1 / 2 / 3 (38MM) (10 Pack)', 1.59, 'Apple Watch Series 1 (38MM) Parts', 0),
('Tester Cable Compatible For Watch Series 1 (38MM / 42MM)', 'Tester Cable Compatible For Watch Series 1 (38MM / 42MM)', 1.89, 'Apple Watch Series 1 (38MM) Parts', 0);

-- Insert Apple Watch Series 5 (44MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 5 / SE (1st Gen) (44MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Used OEM Pull Grade B/C', 70.03, 'Apple Watch Series 5 (44MM) Parts', 8),
('OLED Assembly Compatible For Watch Series 5 / SE (1st Gen) (44MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Premium Part', 92.03, 'Apple Watch Series 5 (44MM) Parts', 8),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Glass Separation Required - Aftermarket Part', 4.28, 'Apple Watch Series 5 (44MM) Parts', 15),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Glass Separation Required - Premium Part', 12.73, 'Apple Watch Series 5 (44MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.26, 'Apple Watch Series 5 (44MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Premium Part', 5.14, 'Apple Watch Series 5 (44MM) Parts', 18),
('NFC Wireless Antenna Pad Compatible For Watch Series 5 (44MM)', 'Quality Apple Genuine NFC Wireless Antenna Pad Compatible For Apple Watch Series 5 - 44MM - Genuine OEM Part', 8.76, 'Apple Watch Series 5 (44MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 5 / SE (1st Gen) (40MM / 44MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM / 44MM - Genuine OEM Part', 1.92, 'Apple Watch Series 5 (44MM) Parts', 15),
('Power Button Flex Cable Compatible For Watch Series 5 (44MM)', 'Quality Apple Genuine Power Button Flex Cable Compatible For Apple Watch Series 5 - 44MM - Genuine OEM Part', 1.67, 'Apple Watch Series 5 (44MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 5 (44MM) / SE (1st Gen) (44MM)', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 5 - 44MM / SE - 1st Gen - 44MM - Genuine OEM Part', 1.46, 'Apple Watch Series 5 (44MM) Parts', 15),
('Mainboard Flex Cable Compatible For Watch Series 5 / SE (1st Gen) (44MM)', 'Quality Apple Genuine Mainboard Flex Cable Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Genuine OEM Part', 1.77, 'Apple Watch Series 5 (44MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 5 (44MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 5 - 44MM - Genuine OEM Part', 2.08, 'Apple Watch Series 5 (44MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 5 / SE (1st Gen) (44MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Genuine OEM Part', 3.03, 'Apple Watch Series 5 (44MM) Parts', 15),
('Vibrator Compatible For Watch Series 5 / SE (1st Gen) (44MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Genuine OEM Part', 1.86, 'Apple Watch Series 5 (44MM) Parts', 15),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Gold - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 (40MM / 44MM) (GPS Version) (Silver / White)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 - 40MM / 44MM - GPS Version - Silver / White - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.73, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 (40MM / 44MM) (LTE Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 - 40MM / 44MM - LTE Version - Gray - Genuine OEM Part', 0.94, 'Apple Watch Series 5 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 1.10, 'Apple Watch Series 5 (44MM) Parts', 25),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 5 (44MM) Parts', 5),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 5 (44MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/White)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/White - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (44MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Black - Genuine OEM Part', 0.68, 'Apple Watch Series 5 (44MM) Parts', 25),
('Power Button Compatible For Watch Series 4 (40MM / 44MM) / Series 5 (40MM / 44MM) / Series 6 (40MM / 44MM) (Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Red - Genuine OEM Part', 1.29, 'Apple Watch Series 5 (44MM) Parts', 20),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 5 (44MM) Parts', 30),
('LCD Adhesive Tape Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine LCD Adhesive Tape Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 0.71, 'Apple Watch Series 5 (44MM) Parts', 30),
('Force Touch Sensor With Adhesive Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Force Touch Sensor With Adhesive Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.23, 'Apple Watch Series 5 (44MM) Parts', 15),
('Polarizer Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) (44MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen - 44MM - 10 Pack - Genuine OEM Part', 1.51, 'Apple Watch Series 5 (44MM) Parts', 10),
('OCA Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) / Series 6 (44MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen / Series 6 - 44MM - 10 Pack - Genuine OEM Part', 1.52, 'Apple Watch Series 5 (44MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 5 (44MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (6 ft.) For All Watch Series (OEM Pull Grade: A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 6 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 22.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 5 (40MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 5 / SE (1st Gen) (40MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM - Used OEM Pull Grade B/C', 45.03, 'Apple Watch Series 5 (40MM) Parts', 8),
('OLED Assembly Compatible For Watch Series 5 / SE (1st Gen) (40MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM - Premium Part', 80.03, 'Apple Watch Series 5 (40MM) Parts', 8),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (40MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 40MM - Glass Separation Required - Aftermarket Part', 4.23, 'Apple Watch Series 5 (40MM) Parts', 15),
('Digitizer Compatible For Watch Series 5 / SE (1st and 2nd Gen) (40MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 40MM - Glass Separation Required - Premium Part', 12.61, 'Apple Watch Series 5 (40MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st and 2nd Gen) (40MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 40MM - Genuine OEM Part', 2.17, 'Apple Watch Series 5 (40MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 5 / SE (40MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 5 / SE - 40MM - Premium Part', 5.12, 'Apple Watch Series 5 (40MM) Parts', 18),
('NFC Wireless Antenna Pad Compatible For Watch Series 5 (40MM)', 'Quality Apple Genuine NFC Wireless Antenna Pad Compatible For Apple Watch Series 5 - 40MM - Genuine OEM Part', 8.76, 'Apple Watch Series 5 (40MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 5 / SE (1st Gen) (40MM / 44MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM / 44MM - Genuine OEM Part', 1.92, 'Apple Watch Series 5 (40MM) Parts', 15),
('Power Button Flex Cable Compatible For Watch Series 5 (40MM)', 'Quality Apple Genuine Power Button Flex Cable Compatible For Apple Watch Series 5 - 40MM - Genuine OEM Part', 1.54, 'Apple Watch Series 5 (40MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 5 (40MM) / SE (1st Gen)（40MM）', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 5 - 40MM / SE - 1st Gen - 40MM - Genuine OEM Part', 1.46, 'Apple Watch Series 5 (40MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 5 (40MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 5 - 40MM - Genuine OEM Part', 2.09, 'Apple Watch Series 5 (40MM) Parts', 15),
('Mainboard Flex Cable Compatible For Watch Series 5 / SE (1st Gen) (40MM)', 'Quality Apple Genuine Mainboard Flex Cable Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM - Genuine OEM Part', 2.09, 'Apple Watch Series 5 (40MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 5 / SE 1st (40MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM - Genuine OEM Part', 3.02, 'Apple Watch Series 5 (40MM) Parts', 15),
('Vibrator Compatible For Watch Series 5 / SE (1st Gen) (40MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM - Genuine OEM Part', 1.86, 'Apple Watch Series 5 (40MM) Parts', 15),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 (40MM / 44MM) (GPS Version) (Silver / White)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 - 40MM / 44MM - GPS Version - Silver / White - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Gold - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.73, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 (40MM / 44MM) (LTE Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 - 40MM / 44MM - LTE Version - Gray - Genuine OEM Part', 0.94, 'Apple Watch Series 5 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 1.10, 'Apple Watch Series 5 (40MM) Parts', 25),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 5 (40MM) Parts', 5),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 5 (40MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/White)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/White - Genuine OEM Part', 0.58, 'Apple Watch Series 5 (40MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Black - Genuine OEM Part', 0.68, 'Apple Watch Series 5 (40MM) Parts', 25),
('Power Button Compatible For Watch Series 4 (40MM / 44MM) / Series 5 (40MM / 44MM) / Series 6 (40MM / 44MM) (Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Red - Genuine OEM Part', 1.29, 'Apple Watch Series 5 (40MM) Parts', 20),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 5 (40MM) Parts', 30),
('LCD Adhesive Tape Compatible For Watch Series 4 / Series 5 / SE 1st and 2nd Gen (40MM)', 'Quality Apple Genuine LCD Adhesive Tape Compatible For Apple Watch Series 4 / Series 5 / SE 1st and 2nd Gen - 40MM - Genuine OEM Part', 0.74, 'Apple Watch Series 5 (40MM) Parts', 30),
('Force Touch Sensor With Adhesive Compatible For Watch Series 5 / SE (1st / 2nd Gen) (40MM)', 'Quality Apple Genuine Force Touch Sensor With Adhesive Compatible For Apple Watch Series 5 / SE - 2nd Gen - 40MM - Genuine OEM Part', 2.15, 'Apple Watch Series 5 (40MM) Parts', 15),
('Polarizer Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) (40MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen - 40MM - 10 Pack - Genuine OEM Part', 1.51, 'Apple Watch Series 5 (40MM) Parts', 10),
('OCA Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) / Series 6 (40MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen / Series 6 - 40MM - 10 Pack - Genuine OEM Part', 1.91, 'Apple Watch Series 5 (40MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 5 (40MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (6 ft.) For All Watch Series (OEM Pull Grade: A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 6 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 22.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 4 (44MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 4 (44MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 4 - 44MM - Premium Part', 68.03, 'Apple Watch Series 4 (44MM) Parts', 8),
('Digitizer Compatible For Watch Series 4 (44MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 4 - 44MM - Glass Separation Required - Aftermarket Part', 4.63, 'Apple Watch Series 4 (44MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.26, 'Apple Watch Series 4 (44MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 4 (44MM) (AmpSentrix Pro)', 'Quality AmpSentrix Pro Replacement Battery Compatible For Apple Watch Series 4 - 44MM - AmpSentrix Pro Part', 6.53, 'Apple Watch Series 4 (44MM) Parts', 18),
('NFC Wireless Antenna Pad Compatible For Watch Series 4 (44MM)', 'Quality Apple Genuine NFC Wireless Antenna Pad Compatible For Apple Watch Series 4 - 44MM - Genuine OEM Part', 3.06, 'Apple Watch Series 4 (44MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 4 (40MM / 44MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 4 - 40MM / 44MM - Genuine OEM Part', 1.46, 'Apple Watch Series 4 (44MM) Parts', 15),
('Power Button Flex Cable Compatible For Watch Series 4 (44MM)', 'Quality Apple Genuine Power Button Flex Cable Compatible For Apple Watch Series 4 - 44MM - Genuine OEM Part', 1.86, 'Apple Watch Series 4 (44MM) Parts', 15),
('Mainboard Flex Cable Compatible For Watch Series 4 (44MM)', 'Quality Apple Genuine Mainboard Flex Cable Compatible For Apple Watch Series 4 - 44MM - Genuine OEM Part', 1.91, 'Apple Watch Series 4 (44MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 4 (44MM) (GPS + Cellular Version)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 4 - 44MM - GPS + Cellular Version - Genuine OEM Part', 2.09, 'Apple Watch Series 4 (44MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 4 (40MM / 44MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 4 - 40MM / 44MM - Genuine OEM Part', 3.77, 'Apple Watch Series 4 (44MM) Parts', 15),
('Vibrator Compatible For Watch Series 4 (44MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 4 - 44MM - Genuine OEM Part', 1.91, 'Apple Watch Series 4 (44MM) Parts', 15),
('Crown Nut Compatible For Watch Series 4 (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 (40MM / 44MM) (GPS Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 - 40MM / 44MM - GPS Version - Gold - Genuine OEM Part', 0.58, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 (40MM / 44MM) (GPS Version) (Silver / Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 - 40MM / 44MM - GPS Version - Silver / Black - Genuine OEM Part', 0.58, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Gold - Genuine OEM Part', 0.58, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.73, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 (40MM / 44MM) (GPS Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 - 40MM / 44MM - GPS Version - Gray - Genuine OEM Part', 0.74, 'Apple Watch Series 4 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 1.10, 'Apple Watch Series 4 (44MM) Parts', 25),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 4 (44MM) Parts', 5),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Gold - Genuine OEM Part', 0.

-- Insert Apple Watch Series 7 (41MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly With Bracket Compatible For Watch Series 7 (41MM) (Premium)', 'Quality Premium OLED Assembly With Bracket Compatible For Apple Watch Series 7 - 41MM - Premium Part', 52.97, 'Apple Watch Series 7 (41MM) Parts', 8),
('2 in 1 Front Cover Glass With OCA Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine 2 in 1 Front Cover Glass With OCA Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 1.65, 'Apple Watch Series 7 (41MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 7 (41MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 7 - 41MM - Premium Part', 15.94, 'Apple Watch Series 7 (41MM) Parts', 18),
('Loudspeaker Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 2.85, 'Apple Watch Series 7 (41MM) Parts', 15),
('Bluetooth Connector Flex Cable Compatible For Watch Series 7 (41MM)', 'Quality Apple Genuine Bluetooth Connector Flex Cable Compatible For Apple Watch Series 7 - 41MM - Genuine OEM Part', 1.73, 'Apple Watch Series 7 (41MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 7 (41MM)', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 7 - 41MM - Genuine OEM Part', 1.77, 'Apple Watch Series 7 (41MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 7 (41MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 7 - 41MM - Genuine OEM Part', 2.29, 'Apple Watch Series 7 (41MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 7 (41MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 7 - 41MM - Genuine OEM Part', 3.78, 'Apple Watch Series 7 (41MM) Parts', 15),
('Vibrator Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 2.72, 'Apple Watch Series 7 (41MM) Parts', 15),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 7 (41MM) Parts', 5),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Starlight)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 (41MM / 45MM) (Aluminum/Blue)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 - 41MM / 45MM - Aluminum/Blue - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 (41MM / 45MM) (Aluminum/Green)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 - 41MM / 45MM - Aluminum/Green - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 (41MM / 45MM) (Aluminum/Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 - 41MM / 45MM - Aluminum/Red - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Black - Genuine OEM Part', 1.06, 'Apple Watch Series 7 (41MM) Parts', 25),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (GPS Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - GPS Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (GPS Version) (Black / Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - GPS Version - Black / Blue - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (GPS Version) (Black / Gary)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - GPS Version - Black / Gray - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (LTE Version) (Black / Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - LTE Version - Black / Blue - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (LTE Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - LTE Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (41MM) Parts', 20),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 7 (41MM) Parts', 30),
('Bottom Adhesive Compatible For Watch Series 7 (41MM)', 'Quality Apple Genuine Bottom Adhesive Compatible For Apple Watch Series 7 - 41MM - Genuine OEM Part', 0.62, 'Apple Watch Series 7 (41MM) Parts', 30),
('OCA Compatible For Watch Series 7 (41MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 7 - 41MM - 10 Pack - Genuine OEM Part', 1.88, 'Apple Watch Series 7 (41MM) Parts', 10),
('Polarizer Compatible For Watch Series 7 / 8 (41MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 7 / 8 - 41MM - 10 Pack - Genuine OEM Part', 1.91, 'Apple Watch Series 7 (41MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 7 (41MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (6 ft.) For All Watch Series (OEM Pull Grade: A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 6 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 22.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 6 (44MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For iWatch Series 6 (44MM) (Used OEM Pull: Cosmetic Grade:B)', 'Quality OEM Pull B/C OLED Assembly Compatible For Apple Watch Series 6 - 44MM - Used OEM Pull Grade B/C', 40.03, 'Apple Watch Series 6 (44MM) Parts', 8),
('OLED Assembly Compatible For Watch Series 6 (44MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 6 - 44MM - Premium Part', 94.03, 'Apple Watch Series 6 (44MM) Parts', 8),
('Digitizer Compatible For Watch Series 6 (44MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 6 - 44MM - Glass Separation Required - Aftermarket Part', 4.76, 'Apple Watch Series 6 (44MM) Parts', 15),
('Digitizer Compatible For Watch Series 6 (44MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 6 - 44MM - Glass Separation Required - Premium Part', 16.15, 'Apple Watch Series 6 (44MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.26, 'Apple Watch Series 6 (44MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 6 (44MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 6 - 44MM - Premium Part', 9.19, 'Apple Watch Series 6 (44MM) Parts', 18),
('NFC Wireless Antenna Pad Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine NFC Wireless Antenna Pad Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 2.60, 'Apple Watch Series 6 (44MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 6 (40MM / 44MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 6 - 40MM / 44MM - Genuine OEM Part', 2.02, 'Apple Watch Series 6 (44MM) Parts', 15),
('Power Button Flex Cable Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine Power Button Flex Cable Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 2.08, 'Apple Watch Series 6 (44MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 1.77, 'Apple Watch Series 6 (44MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 1.88, 'Apple Watch Series 6 (44MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 6 (40MM / 44MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 6 - 40MM / 44MM - Genuine OEM Part', 3.42, 'Apple Watch Series 6 (44MM) Parts', 15),
('Vibrator Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 2.17, 'Apple Watch Series 6 (44MM) Parts', 15),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (LTE Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - LTE Version - Black / Red - Genuine OEM Part', 0.51, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (GPS Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - GPS Version - Black / Red - Genuine OEM Part', 0.56, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (GPS Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - GPS Version - Gray - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Gold - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.73, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (LTE Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - LTE Version - Gray - Genuine OEM Part', 0.86, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (GPS Version) (Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - GPS Version - Blue - Genuine OEM Part', 0.86, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 1.10, 'Apple Watch Series 6 (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (LTE Version) (Black / Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - LTE Version - Black / Blue - Genuine OEM Part', 1.19, 'Apple Watch Series 6 (44MM) Parts', 25),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 6 (44MM) Parts', 5),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 6 (44MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/White)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/White - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (44MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Black - Genuine OEM Part', 0.68, 'Apple Watch Series 6 (44MM) Parts', 25),
('Sidekey Button Compatible For Watch Series 6 (40MM / 44MM) (Red)', 'Quality Apple Genuine Sidekey Button Compatible For Apple Watch Series 6 - 40MM / 44MM - Red - Genuine OEM Part', 1.17, 'Apple Watch Series 6 (44MM) Parts', 20),
('Power Button Compatible For Watch Series 4 (40MM / 44MM) / Series 5 (40MM / 44MM) / Series 6 (40MM / 44MM) (Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Red - Genuine OEM Part', 1.29, 'Apple Watch Series 6 (44MM) Parts', 20),
('Sidekey Button Compatible For Watch Series 6 (40MM / 44MM) (Blue)', 'Quality Apple Genuine Sidekey Button Compatible For Apple Watch Series 6 - 40MM / 44MM - Blue - Genuine OEM Part', 1.29, 'Apple Watch Series 6 (44MM) Parts', 20),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 6 (44MM) Parts', 30),
('Bottom Adhesive Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine Bottom Adhesive Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 0.60, 'Apple Watch Series 6 (44MM) Parts', 30),
('Waterproof LCD Adhesive Seal Compatible For Watch Series 6 (44MM)', 'Quality Apple Genuine Waterproof LCD Adhesive Seal Compatible For Apple Watch Series 6 - 44MM - Genuine OEM Part', 0.60, 'Apple Watch Series 6 (44MM) Parts', 30),
('OCA Compatible For Watch Series 4 / Series 5 / Series SE 1st and 2nd Gen / Series 6 (44MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen / Series 6 - 44MM - 10 Pack - Genuine OEM Part', 1.52, 'Apple Watch Series 6 (44MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 6 (44MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (6 ft.) For All Watch Series (OEM Pull Grade: A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 6 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 22.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 6 (40MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 6 (40MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 6 - 40MM - Premium Part', 44.24, 'Apple Watch Series 6 (40MM) Parts', 8),
('Digitizer Compatible For Watch Series 6 (40MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 6 - 40MM - Glass Separation Required - Aftermarket Part', 4.79, 'Apple Watch Series 6 (40MM) Parts', 15),
('Digitizer Compatible For Watch Series 6 (40MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 6 - 40MM - Glass Separation Required - Premium Part', 19.03, 'Apple Watch Series 6 (40MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st and 2nd Gen) (40MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 40MM - Genuine OEM Part', 2.17, 'Apple Watch Series 6 (40MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 6 (40MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 6 - 40MM - Premium Part', 8.87, 'Apple Watch Series 6 (40MM) Parts', 18),
('NFC Wireless Antenna Pad Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine NFC Wireless Antenna Pad Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 2.55, 'Apple Watch Series 6 (40MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 6 (40MM / 44MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 6 - 40MM / 44MM - Genuine OEM Part', 2.02, 'Apple Watch Series 6 (40MM) Parts', 15),
('Power Button Flex Cable Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine Power Button Flex Cable Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 2.14, 'Apple Watch Series 6 (40MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 1.77, 'Apple Watch Series 6 (40MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 2.26, 'Apple Watch Series 6 (40MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 6 (40MM / 44MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 6 - 40MM / 44MM - Genuine OEM Part', 3.42, 'Apple Watch Series 6 (40MM) Parts', 15),
('Vibrator Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 2.14, 'Apple Watch Series 6 (40MM) Parts', 15),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (LTE Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - LTE Version - Black / Red - Genuine OEM Part', 0.51, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (GPS Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - GPS Version - Black / Red - Genuine OEM Part', 0.56, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (GPS Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - GPS Version - Gray - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 5 / Series 6 - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Gold - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.73, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (LTE Version) (Gray)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - LTE Version - Gray - Genuine OEM Part', 0.86, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (GPS Version) (Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - GPS Version - Blue - Genuine OEM Part', 0.86, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 1.10, 'Apple Watch Series 6 (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series 6 (40MM / 44MM) (LTE Version) (Black / Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 6 - 40MM / 44MM - LTE Version - Black / Blue - Genuine OEM Part', 1.19, 'Apple Watch Series 6 (40MM) Parts', 25),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 6 (40MM) Parts', 5),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Gold)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Gold - Genuine OEM Part', 0.55, 'Apple Watch Series 6 (40MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/White)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/White - Genuine OEM Part', 0.58, 'Apple Watch Series 6 (40MM) Parts', 25),
('Power Button Compatible For Watch Series 4 / Series 5 / Series 6 (40MM / 44MM) (Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Aluminum/Black - Genuine OEM Part', 0.68, 'Apple Watch Series 6 (40MM) Parts', 25),
('Sidekey Button Compatible For Watch Series 6 (40MM / 44MM) (Red)', 'Quality Apple Genuine Sidekey Button Compatible For Apple Watch Series 6 - 40MM / 44MM - Red - Genuine OEM Part', 1.17, 'Apple Watch Series 6 (40MM) Parts', 20),
('Power Button Compatible For Watch Series 4 (40MM / 44MM) / Series 5 (40MM / 44MM) / Series 6 (40MM / 44MM) (Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 4 / Series 5 / Series 6 - 40MM / 44MM - Red - Genuine OEM Part', 1.29, 'Apple Watch Series 6 (40MM) Parts', 20),
('Sidekey Button Compatible For Watch Series 6 (40MM / 44MM) (Blue)', 'Quality Apple Genuine Sidekey Button Compatible For Apple Watch Series 6 - 40MM / 44MM - Blue - Genuine OEM Part', 1.29, 'Apple Watch Series 6 (40MM) Parts', 20),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 6 (40MM) Parts', 30),
('Bottom Adhesive Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine Bottom Adhesive Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 0.60, 'Apple Watch Series 6 (40MM) Parts', 30),
('Waterproof LCD Adhesive Seal Compatible For Watch Series 6 (40MM)', 'Quality Apple Genuine Waterproof LCD Adhesive Seal Compatible For Apple Watch Series 6 - 40MM - Genuine OEM Part', 0.60, 'Apple Watch Series 6 (40MM) Parts', 30),
('OCA Compatible For Watch Series 4 / Series 5 / Series SE 1st and 2nd Gen / Series 6 (40MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen / Series 6 - 40MM - 10 Pack - Genuine OEM Part', 1.91, 'Apple Watch Series 6 (40MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 6 (40MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (6 ft.) For All Watch Series (OEM Pull Grade: A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 6 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 22.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series SE (1st Gen) (44MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series 5 / SE (1st Gen) (44MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Used OEM Pull Grade B/C', 70.03, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 8),
('OLED Assembly Compatible For Watch Series 5 / SE (1st Gen) (44MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Premium Part', 92.03, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 8),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Glass Separation Required - Aftermarket Part', 4.28, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 15),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Glass Separation Required - Premium Part', 12.73, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.26, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Premium Part', 5.14, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 18),
('Loudspeaker Compatible For Watch Series 5 / SE (1st Gen) (40MM / 44MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 5 / SE - 1st Gen - 40MM / 44MM - Genuine OEM Part', 1.92, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 5 (44MM) / SE (1st Gen) (44MM)', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 5 - 44MM / SE - 1st Gen - 44MM - Genuine OEM Part', 1.46, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 15),
('Mainboard Flex Cable Compatible For Watch Series 5 / SE (1st Gen) (44MM)', 'Quality Apple Genuine Mainboard Flex Cable Compatible For Apple Watch Series 5 / SE - 1st Gen - 44MM - Genuine OEM Part', 1.77, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series SE (44MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series SE - 44MM - Genuine OEM Part', 2.09, 'Apple Watch Series SE (1st Gen) (44MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 5 /

-- Insert Apple Watch Series SE 2nd Gen (44MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series SE (2nd Gen) (44MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series SE - 2nd Gen - 44MM - Premium Part', 93.03, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 8),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Glass Separation Required - Aftermarket Part', 4.28, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 15),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Glass Separation Required - Premium Part', 12.73, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.26, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Premium Part', 5.14, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 18),
('LCD Flex Cable Compatible For Watch SE 2nd Gen (44MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch SE - 2nd Gen - 44MM - Genuine OEM Part', 4.90, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 15),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 5),
('Crown Nut Compatible For Watch Series SE (1st / 2nd Gen) (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 1st / 2nd Gen - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Power Button Compatible For Watch Series SE (1st Gen) / SE (2nd Gen) (40MM / 44MM) (Silver)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series SE - 1st Gen / SE - 2nd Gen - 40MM / 44MM - Silver - Genuine OEM Part', 0.60, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (1st / 2nd Gen) (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 1st / 2nd Gen - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.62, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - GPS Version - Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - LTE Version - Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('Power Button Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - Black - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 25),
('LCD Adhesive Tape Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine LCD Adhesive Tape Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 0.71, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 30),
('Force Touch Sensor With Adhesive Compatible For Watch Series 5 / SE (1st / 2nd Gen) (44MM)', 'Quality Apple Genuine Force Touch Sensor With Adhesive Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 44MM - Genuine OEM Part', 2.23, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 15),
('Polarizer Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) (44MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen - 44MM - 10 Pack - Genuine OEM Part', 1.51, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 10),
('OCA Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) / Series 6 (44MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen / Series 6 - 44MM - 10 Pack - Genuine OEM Part', 1.52, 'Apple Watch Series SE 2nd Gen (44MM) Parts', 10),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series SE 2nd Gen (40MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series SE (2nd Gen) (40MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly Compatible For Apple Watch Series SE - 2nd Gen - 40MM - Used OEM Pull Grade B/C', 51.03, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 8),
('OLED Assembly Compatible For Watch Series SE (2nd Gen) (40MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series SE - 2nd Gen - 40MM - Premium Part', 79.03, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 8),
('Digitizer Compatible For Watch Series 5 / SE (1st / 2nd Gen) (40MM) (Glass Separation Required) (Aftermarket)', 'Quality Aftermarket Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 40MM - Glass Separation Required - Aftermarket Part', 4.23, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 15),
('Digitizer Compatible For Watch Series 5 / SE (1st and 2nd Gen) (40MM) (Glass Separation Required) (Premium)', 'Quality Premium Digitizer Compatible For Apple Watch Series 5 / SE - 1st / 2nd Gen - 40MM - Glass Separation Required - Premium Part', 12.61, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 15),
('Front Cover Glass Compatible For Watch Series 4 / Series 5 / Series 6 / Series SE (1st and 2nd Gen) (40MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 4 / Series 5 / Series 6 / Series SE - 1st / 2nd Gen - 40MM - Genuine OEM Part', 2.17, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 20),
('Replacement Battery Compatible For Watch Series SE (2nd Gen) (40MM) (GPS Version Only) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series SE - 2nd Gen - 40MM - GPS Version Only - Premium Part', 8.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 18),
('LCD Flex Cable Compatible For Watch SE 2nd Gen (40MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch SE - 2nd Gen - 40MM - Genuine OEM Part', 4.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 15),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 5),
('Crown Nut Compatible For Watch Series SE (1st / 2nd Gen) (40MM / 44MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 1st / 2nd Gen - 40MM / 44MM - LTE Version - Silver - Genuine OEM Part', 0.58, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Power Button Compatible For Watch Series SE (1st Gen) / SE (2nd Gen) (40MM / 44MM) (Silver)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series SE - 1st Gen / SE - 2nd Gen - 40MM / 44MM - Silver - Genuine OEM Part', 0.60, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (1st / 2nd Gen) (40MM / 44MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 1st / 2nd Gen - 40MM / 44MM - GPS Version - Silver - Genuine OEM Part', 0.62, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - GPS Version - Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - LTE Version - Black - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - GPS Version - Black - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Crown Nut Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - LTE Version - Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('Power Button Compatible For Watch Series SE (2nd Gen) (40MM / 44MM) (Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series SE - 2nd Gen - 40MM / 44MM - Black - Genuine OEM Part', 0.88, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 25),
('LCD Adhesive Tape Compatible For Watch Series 4 / Series 5 / SE 1st and 2nd Gen (40MM)', 'Quality Apple Genuine LCD Adhesive Tape Compatible For Apple Watch Series 4 / Series 5 / SE 1st and 2nd Gen - 40MM - Genuine OEM Part', 0.74, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 30),
('Force Touch Sensor With Adhesive Compatible For Watch Series 5 / SE (1st / 2nd Gen) (40MM)', 'Quality Apple Genuine Force Touch Sensor With Adhesive Compatible For Apple Watch Series 5 / SE - 2nd Gen - 40MM - Genuine OEM Part', 2.15, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 15),
('Polarizer Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) (40MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen - 40MM - 10 Pack - Genuine OEM Part', 1.51, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 10),
('OCA Compatible For Watch Series 4 / 5 / SE (1st / 2nd Gen) / Series 6 (40MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 4 / 5 / SE - 1st / 2nd Gen / Series 6 - 40MM - 10 Pack - Genuine OEM Part', 1.91, 'Apple Watch Series SE 2nd Gen (40MM) Parts', 10),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 7 (45MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly With Bracket Compatible For Watch Series 7 (45MM) (Premium)', 'Quality Premium OLED Assembly With Bracket Compatible For Apple Watch Series 7 - 45MM - Premium Part', 55.03, 'Apple Watch Series 7 (45MM) Parts', 8),
('2 in 1 Front Cover Glass With OCA Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine 2 in 1 Front Cover Glass With OCA Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 1.65, 'Apple Watch Series 7 (45MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 7 (45MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 7 - 45MM - Premium Part', 15.12, 'Apple Watch Series 7 (45MM) Parts', 18),
('Loudspeaker Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 3.32, 'Apple Watch Series 7 (45MM) Parts', 15),
('Bluetooth Connector Flex Cable Compatible For Watch Series 7 (45MM)', 'Quality Apple Genuine Bluetooth Connector Flex Cable Compatible For Apple Watch Series 7 - 45MM - Genuine OEM Part', 1.73, 'Apple Watch Series 7 (45MM) Parts', 15),
('GPS Small Connector Flex Cable Compatible For Watch Series 7 (45MM)', 'Quality Apple Genuine GPS Small Connector Flex Cable Compatible For Apple Watch Series 7 - 45MM - Genuine OEM Part', 1.77, 'Apple Watch Series 7 (45MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 7 (45MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 7 - 45MM - Genuine OEM Part', 2.15, 'Apple Watch Series 7 (45MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 7 (45MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 7 - 45MM - Genuine OEM Part', 3.06, 'Apple Watch Series 7 (45MM) Parts', 15),
('Vibrator Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 2.71, 'Apple Watch Series 7 (45MM) Parts', 15),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 7 (45MM) Parts', 5),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Starlight)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (45MM) Parts', 25),
('Power Button Compatible For Watch Series 7 (41MM / 45MM) (Aluminum/Blue)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 - 41MM / 45MM - Aluminum/Blue - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (45MM) Parts', 25),
('Power Button Compatible For Watch Series 7 (41MM / 45MM) (Aluminum/Green)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 - 41MM / 45MM - Aluminum/Green - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (45MM) Parts', 25),
('Power Button Compatible For Watch Series 7 (41MM / 45MM) (Aluminum/Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 - 41MM / 45MM - Aluminum/Red - Genuine OEM Part', 0.88, 'Apple Watch Series 7 (45MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Black - Genuine OEM Part', 1.06, 'Apple Watch Series 7 (45MM) Parts', 25),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (GPS Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - GPS Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (GPS Version) (Black / Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - GPS Version - Black / Blue - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (GPS Version) (Black / Gary)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - GPS Version - Black / Gray - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (LTE Version) (Black / Blue)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - LTE Version - Black / Blue - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (LTE Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - LTE Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 7 (45MM) Parts', 20),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 7 (45MM) Parts', 30),
('Bottom Adhesive Compatible For Watch Series 7 (45MM)', 'Quality Apple Genuine Bottom Adhesive Compatible For Apple Watch Series 7 - 45MM - Genuine OEM Part', 0.62, 'Apple Watch Series 7 (45MM) Parts', 30),
('Polarizer Compatible For Watch Series 7 / 8 (45MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 7 / 8 - 45MM - 10 Pack - Genuine OEM Part', 1.46, 'Apple Watch Series 7 (45MM) Parts', 10),
('OCA Compatible For Watch Series 7 (45MM) (10 Pack)', 'Quality Apple Genuine OCA Compatible For Apple Watch Series 7 - 45MM - 10 Pack - Genuine OEM Part', 1.48, 'Apple Watch Series 7 (45MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 7 (45MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (6 ft.) For All Watch Series (OEM Pull Grade: A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 6 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 22.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series Ultra 2nd Gen (49MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series Ultra (2nd Gen) (49MM) (Used OEM Pull: Grade A)', 'Quality OEM Pull A OLED Assembly Compatible For Apple Watch Series Ultra - 2nd Gen - 49MM - Used OEM Pull Grade A', 170.03, 'Apple Watch Series Ultra 2nd Gen (49MM) Parts', 3),
('OLED Assembly Compatible For Watch Series Ultra (2nd Gen) (49MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series Ultra - 2nd Gen - 49MM - Premium Part', 190.03, 'Apple Watch Series Ultra 2nd Gen (49MM) Parts', 3),
('Power Button Compatible For Watch Series Ultra (2nd Gen) (49MM) (Aluminum/Black) (2 Pieces Set)', 'Quality Aftermarket Plus Power Button Compatible For Apple Watch Series Ultra - 2nd Gen - 49MM - Aluminum/Black - 2 Pieces Set', 4.93, 'Apple Watch Series Ultra 2nd Gen (49MM) Parts', 10),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series Ultra 1st Gen (49MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly Compatible For Watch Series Ultra (1st Gen) (49MM) (Used OEM Pull: Grade A)', 'Quality OEM Pull A OLED Assembly Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Used OEM Pull Grade A', 185.03, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 3),
('OLED Assembly Compatible For Watch Series Ultra (1st Gen) (49MM) (Premium)', 'Quality Premium OLED Assembly Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Premium Part', 238.03, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 3),
('Front Cover Glass Compatible For Watch Series Ultra(1st Gen) (49MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 2.09, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 15),
('Replacement Battery Compatible For Watch Series Ultra (1st Gen / 2nd Gen) (49MM) (Used OEM Pull)', 'Quality OEM Pull Replacement Battery Compatible For Apple Watch Series Ultra - 1st Gen / 2nd Gen - 49MM - Used OEM Pull', 10.89, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 12),
('Replacement Battery Compatible For Watch Series Ultra (1st Gen / 2nd Gen) (49MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series Ultra - 1st Gen / 2nd Gen - 49MM - Premium Part', 22.17, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 12),
('Loudspeaker Compatible For Watch Series Ultra (1st Gen) (49MM) (Silver)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Silver - Genuine OEM Part', 3.75, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 10),
('Power Button Flex Cable Compatible For Watch Series Ultra (1st Gen) (49MM)', 'Quality Apple Genuine Power Button Flex Cable Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 3.71, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 12),
('Mainboard Flex Cable Compatible For Watch Series Ultra 1st Gen (49MM)', 'Quality Apple Genuine Mainboard Flex Cable Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 3.63, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 12),
('Battery Flex Cable Compatible For Watch Series Ultra (1st Gen) (49MM)', 'Quality Apple Genuine Battery Flex Cable Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 3.67, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 12),
('Chassis Flex Cable Compatible For Watch Series Ultra 1st Gen (49MM)', 'Quality Apple Genuine Chassis Flex Cable Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 3.71, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 12),
('Crown With Flex Cable Compatible For Watch Series Ultra (1st Gen) (49MM) (Silver)', 'Quality Apple Genuine Crown With Flex Cable Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Silver - Genuine OEM Part', 16.19, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 8),
('Vibrator Compatible For Watch Series Ultra(1st Gen) (49MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 6.14, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 10),
('Full Set Small Metal Bracket And Screw Set Compatible For Watch Series Ultra 1st Gen (49MM)', 'Quality Apple Genuine Full Set Small Metal Bracket And Screw Set Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 7.43, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 8),
('Sidekey Button Set Compatible For Watch Series Ultra(1st Gen) (49MM) (Orange / Silver) (5 Piece Set)', 'Quality Apple Genuine Sidekey Button Set Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Orange / Silver - 5 Piece Set - Genuine OEM Part', 7.24, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 8),
('Waterproof LCD Adhesive Seal Compatible For Watch Series Ultra 1st Gen (49MM)', 'Quality Apple Genuine Waterproof LCD Adhesive Seal Compatible For Apple Watch Series Ultra - 1st Gen - 49MM - Genuine OEM Part', 1.16, 'Apple Watch Series Ultra 1st Gen (49MM) Parts', 20),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 8 (45MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly With Bracket Compatible For Watch Series 8 (45MM) (Used OEM Pull: Grade B/C)', 'Quality OEM Pull B/C OLED Assembly With Bracket Compatible For Apple Watch Series 8 - 45MM - Used OEM Pull Grade B/C', 96.03, 'Apple Watch Series 8 (45MM) Parts', 6),
('OLED Assembly With Bracket Compatible For Watch Series 8 (45MM) (Used OEM Pull: Grade A)', 'Quality OEM Pull A OLED Assembly With Bracket Compatible For Apple Watch Series 8 - 45MM - Used OEM Pull Grade A', 109.03, 'Apple Watch Series 8 (45MM) Parts', 6),
('OLED Assembly With Bracket Compatible For Watch Series 8 (45MM) (Premium)', 'Quality Premium OLED Assembly With Bracket Compatible For Apple Watch Series 8 - 45MM - Premium Part', 137.03, 'Apple Watch Series 8 (45MM) Parts', 6),
('2 in 1 Front Cover Glass With OCA Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine 2 in 1 Front Cover Glass With OCA Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 1.65, 'Apple Watch Series 8 (45MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 8 (45MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 8 - 45MM - Premium Part', 15.09, 'Apple Watch Series 8 (45MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 3.32, 'Apple Watch Series 8 (45MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 8 (45MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 8 - 45MM - Genuine OEM Part', 3.31, 'Apple Watch Series 8 (45MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 8 (45MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 8 - 45MM - Genuine OEM Part', 4.42, 'Apple Watch Series 8 (45MM) Parts', 15),
('Vibrator Compatible For Watch Series 7 / 8 / 9 (45MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 7 / 8 / 9 - 45MM - Genuine OEM Part', 2.71, 'Apple Watch Series 8 (45MM) Parts', 15),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 8 (45MM) Parts', 5),
('Power Button Compatible For Watch Series 8 (41MM / 45MM)(Aluminum/Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 8 - 41MM / 45MM - Aluminum/Red - Genuine OEM Part', 0.88, 'Apple Watch Series 8 (45MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Starlight)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series 8 (45MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Black - Genuine OEM Part', 1.06, 'Apple Watch Series 8 (45MM) Parts', 25),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 / 9 (41MM / 45MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 / 9 - 41MM / 45MM - LTE Version - Silver - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 (41MM / 45MM) (LTE Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 - 41MM / 45MM - LTE Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 / 9 (41MM / 45MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 / 9 - 41MM / 45MM - GPS Version - Silver - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 (41MM / 45MM) (GPS Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 - 41MM / 45MM - GPS Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (45MM) Parts', 20),
('Crown Nut Compatible For Watch Series 9 (41MM / 45MM) (LTE Version) (Rose Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 9 - 41MM / 45MM - LTE Version - Rose Gold - Genuine OEM Part', 2.97, 'Apple Watch Series 8 (45MM) Parts', 15),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 8 (45MM) Parts', 30),
('Polarizer Compatible For Watch Series 7 / 8 (45MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 7 / 8 - 45MM - 10 Pack - Genuine OEM Part', 1.46, 'Apple Watch Series 8 (45MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 8 (45MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);

-- Insert Apple Watch Series 8 (41MM) Genuine OEM Parts
INSERT INTO public.parts (name, description, price, category, stock_quantity) VALUES
('OLED Assembly With Bracket Compatible For Watch Series 8 (41MM) (Premium)', 'Quality Premium OLED Assembly With Bracket Compatible For Apple Watch Series 8 - 41MM - Premium Part', 81.69, 'Apple Watch Series 8 (41MM) Parts', 6),
('Front Cover Glass Compatible For Watch Series 7 /8 / 9 (41MM)', 'Quality Apple Genuine Front Cover Glass Compatible For Apple Watch Series 7 /8 / 9 - 41MM - Genuine OEM Part', 1.65, 'Apple Watch Series 8 (41MM) Parts', 20),
('Replacement Battery Compatible For Watch Series 8 (41MM) (Premium)', 'Quality Premium Replacement Battery Compatible For Apple Watch Series 8 - 41MM - Premium Part', 15.09, 'Apple Watch Series 8 (41MM) Parts', 15),
('Loudspeaker Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine Loudspeaker Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 2.85, 'Apple Watch Series 8 (41MM) Parts', 15),
('Crown Flex Cable Compatible For Watch Series 8 (41MM)', 'Quality Apple Genuine Crown Flex Cable Compatible For Apple Watch Series 8 - 41MM - Genuine OEM Part', 3.06, 'Apple Watch Series 8 (41MM) Parts', 15),
('LCD Flex Cable Compatible For Watch Series 8 (41MM)', 'Quality Apple Genuine LCD Flex Cable Compatible For Apple Watch Series 8 - 41MM - Genuine OEM Part', 6.64, 'Apple Watch Series 8 (41MM) Parts', 15),
('Housing Assembly Compatible For Watch Series 8 (41MM) (GPS Version) (Used OEM Pull: Grade B/C) (Aluminum/Starlight)', 'Quality OEM Pull B/C Housing Assembly Compatible For Apple Watch Series 8 - 41MM - GPS Version - Used OEM Pull Grade B/C - Aluminum/Starlight', 2.73, 'Apple Watch Series 8 (41MM) Parts', 10),
('Housing Assembly Compatible For Watch Series 8 (41MM) (GPS Version) (Used OEM Pull: Grade A) (Aluminum/Starlight)', 'Quality OEM Pull A Housing Assembly Compatible For Apple Watch Series 8 - 41MM - GPS Version - Used OEM Pull Grade A - Aluminum/Starlight', 2.11, 'Apple Watch Series 8 (41MM) Parts', 10),
('Housing Assembly Compatible For Watch Series 8 (41MM) (GPS Version) (Used OEM Pull: Grade A) (Aluminum/Silver)', 'Quality OEM Pull A Housing Assembly Compatible For Apple Watch Series 8 - 41MM - GPS Version - Used OEM Pull Grade A - Aluminum/Silver', 2.11, 'Apple Watch Series 8 (41MM) Parts', 10),
('Vibrator Compatible For Watch Series 7 / 8 / 9 (41MM)', 'Quality Apple Genuine Vibrator Compatible For Apple Watch Series 7 / 8 / 9 - 41MM - Genuine OEM Part', 2.72, 'Apple Watch Series 8 (41MM) Parts', 15),
('Button Springs Compatible For iWatch Series (100 Pack)', 'Quality Apple Genuine Button Springs Compatible For iWatch Series - 100 Pack - Genuine OEM Part', 10.57, 'Apple Watch Series 8 (41MM) Parts', 5),
('Power Button Compatible For Watch Series 8 (41MM / 45MM)(Aluminum/Red)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 8 - 41MM / 45MM - Aluminum/Red - Genuine OEM Part', 0.88, 'Apple Watch Series 8 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Starlight)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Starlight - Genuine OEM Part', 0.88, 'Apple Watch Series 8 (41MM) Parts', 25),
('Power Button Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM)(Aluminum/Black)', 'Quality Apple Genuine Power Button Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - Aluminum/Black - Genuine OEM Part', 1.06, 'Apple Watch Series 8 (41MM) Parts', 25),
('Crown Nut Compatible For Watch Series 8 (41MM / 45MM) (GPS Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 - 41MM / 45MM - GPS Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (GPS Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - GPS Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 / 9 (41MM / 45MM) (GPS Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 / 9 - 41MM / 45MM - GPS Version - Silver - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Black)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Black - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 7 / 8 / 9 (41MM / 45MM) (LTE Version) (Starlight)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 7 / 8 / 9 - 41MM / 45MM - LTE Version - Starlight - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 (41MM / 45MM) (LTE Version) (Black / Red)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 - 41MM / 45MM - LTE Version - Black / Red - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 8 / 9 (41MM / 45MM) (LTE Version) (Silver)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 8 / 9 - 41MM / 45MM - LTE Version - Silver - Genuine OEM Part', 1.18, 'Apple Watch Series 8 (41MM) Parts', 20),
('Crown Nut Compatible For Watch Series 9 (41MM / 45MM) (LTE Version) (Rose Gold)', 'Quality Apple Genuine Crown Nut Compatible For Apple Watch Series 9 - 41MM / 45MM - LTE Version - Rose Gold - Genuine OEM Part', 2.97, 'Apple Watch Series 8 (41MM) Parts', 15),
('Shaft screw Compatible For Watch Series 4 / 5 / 6 / 7 / 8 / 9', 'Quality Apple Genuine Shaft screw Compatible For Apple Watch Series 4 / 5 / 6 / 7 / 8 / 9 - Genuine OEM Part', 1.10, 'Apple Watch Series 8 (41MM) Parts', 30),
('Polarizer Compatible For Watch Series 7 / 8 (41MM) (10 Pack)', 'Quality Apple Genuine Polarizer Compatible For Apple Watch Series 7 / 8 - 41MM - 10 Pack - Genuine OEM Part', 1.91, 'Apple Watch Series 8 (41MM) Parts', 10),
('Motherboard Battery FPC Connector for Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8', 'Quality Apple Genuine Motherboard Battery FPC Connector for Apple Watch Series 4 / Series 5 / Series 6 / Series 7 / Series 8 - Genuine OEM Part', 0.60, 'Apple Watch Series 8 (41MM) Parts', 25),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 15.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3ft.) For All Watch Series (OEM Grade A)', 'Quality OEM Grade A USB-C Magnetic Watch Charging Cable - 3.3ft. - Compatible For All Apple Watch Series - OEM Grade A - Bulk Packaging', 17.99, 'Apple Watch Accessories', 50),
('USB-A Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-A Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 19.99, 'Apple Watch Accessories', 50),
('USB-C Magnetic Watch Charging Cable (3.3 ft.) For All Watch Series (OEM Grade New)', 'Quality OEM Grade New USB-C Magnetic Watch Charging Cable - 3.3 ft. - Compatible For All Apple Watch Series - OEM Grade New - Bulk Packaging', 21.99, 'Apple Watch Accessories', 50);
