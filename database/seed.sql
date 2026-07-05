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
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 450,  'Swiggy',            '2026-06-01'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 650,  'Zomato',            '2026-06-02'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 199,  'Netflix',           '2026-06-03'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 250,  'Uber',              '2026-06-04'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 1200, 'Amazon',            '2026-06-05'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 99,   'Spotify',           '2026-06-05'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 500,  'Electricity Bill',  '2026-06-08'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 650,  'Swiggy',            '2026-06-10'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 199,  'Netflix',           '2026-07-03'),
  ('d5dde641-b803-4b8c-94fa-e3a8c9157722', 99,   'Spotify',           '2026-07-05');