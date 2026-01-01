-- Add card_billing_countries column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS card_billing_countries TEXT[];

-- Create countries table for managing available countries
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  code VARCHAR(2) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  flag VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert popular countries for card billing
INSERT INTO countries (code, name, flag) VALUES
  ('US', 'США', '🇺🇸'),
  ('GB', 'Великобритания', '🇬🇧'),
  ('DE', 'Германия', '🇩🇪'),
  ('FR', 'Франция', '🇫🇷'),
  ('IT', 'Италия', '🇮🇹'),
  ('ES', 'Испания', '🇪🇸'),
  ('NL', 'Нидерланды', '🇳🇱'),
  ('PL', 'Польша', '🇵🇱'),
  ('TR', 'Турция', '🇹🇷'),
  ('AE', 'ОАЭ', '🇦🇪'),
  ('SG', 'Сингапур', '🇸🇬'),
  ('CA', 'Канада', '🇨🇦'),
  ('AU', 'Австралия', '🇦🇺')
ON CONFLICT (code) DO NOTHING;

COMMENT ON COLUMN services.card_billing_countries IS 'Array of country codes where cards can be billed';
COMMENT ON TABLE countries IS 'Available countries for card billing addresses';