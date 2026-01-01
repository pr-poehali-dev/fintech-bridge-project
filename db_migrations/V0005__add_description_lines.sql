-- Добавляем три отдельные строки для описания товара
ALTER TABLE services 
ADD COLUMN line1 TEXT,
ADD COLUMN line2 TEXT,
ADD COLUMN line3 TEXT;