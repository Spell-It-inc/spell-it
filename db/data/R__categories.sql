TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

INSERT INTO categories (name)
VALUES 
  ('Animals'),
  ('Colours'),
  ('Numbers'),
  ('Shapes'),
  ('Body Parts')
ON CONFLICT (name) DO NOTHING;