CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  cta TEXT NOT NULL,
  background_image TEXT,
  logo_svg TEXT,
  accepts_visa BOOLEAN DEFAULT FALSE,
  accepts_mastercard BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);