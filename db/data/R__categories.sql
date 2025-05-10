TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

INSERT INTO categories (category)
VALUES 
  ('Animals'),
  ('Colours'),
  ('Numbers'),
  ('Shapes'),
  ('Body Parts')
ON CONFLICT (category) DO NOTHING;