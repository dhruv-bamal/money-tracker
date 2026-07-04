-- Seed data for local development and testing.
-- Run AFTER schema.sql on a fresh database.
-- user_id below belongs to test@example.com — copy the returned id
-- from the users INSERT and replace if recreating from scratch.

INSERT INTO users (email, password_hash)
VALUES ('test@example.com', 'placeholder')
RETURNING id;

-- Replace the user_id below with the id returned above if recreating.
INSERT INTO transactions (user_id, amount, merchant, date)
VALUES
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 450,  'Swiggy',            '2026-06-01'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 650,  'Zomato',            '2026-06-02'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 199,  'Netflix',           '2026-06-03'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 250,  'Uber',              '2026-06-04'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 1200, 'Amazon',            '2026-06-05'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 99,   'Spotify',           '2026-06-05'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 500,  'Electricity Bill',  '2026-06-08'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 650,  'Swiggy',            '2026-06-10'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 199,  'Netflix',           '2026-07-03'),
  ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 99,   'Spotify',           '2026-07-05');