-- These queries are the core of the Week 2 API.
-- Every hardcoded user_id becomes $1 (or $2, $3...) in the parameterized version.
-- e.g. pool.query('SELECT * FROM transactions WHERE user_id = $1', [req.user.id])
-- The SQL string never changes — only the bound value changes per request.
-- Separation of SQL string from values is what prevents SQL injection.

-- ─── CRUD queries ────────────────────────────────────────────────────────────

-- 1. List all transactions for a user, newest first (GET /api/transactions)
SELECT *
FROM transactions
WHERE user_id = 'f2e194b2-39d5-4444-9700-ef2c7cf9d423'
ORDER BY date DESC;

-- 2. Insert a transaction, return the created row (POST /api/transactions)
--    RETURNING * gives back the DB-generated id and created_at in one round trip.
INSERT INTO transactions (user_id, amount, merchant, date)
VALUES ('f2e194b2-39d5-4444-9700-ef2c7cf9d423', 200, 'Dunzo', '2026-06-20')
RETURNING *;

-- 3. Delete a transaction scoped by both id AND user_id (DELETE /api/transactions/:id)
--    Scoping by user_id prevents a user from deleting another user's row
--    even if they guess a valid transaction id — object-level authorization.
DELETE FROM transactions
WHERE id = 'f2e194b2-39d5-4444-9700-ef2c7cf9d423'   -- replace with a real transaction id
  AND user_id = 'f2e194b2-39d5-4444-9700-ef2c7cf9d423';

-- ─── Summary / aggregation queries ───────────────────────────────────────────
-- Used by GET /api/summary. Note: WHERE user_id scopes aggregation per user —
-- without it, this endpoint would leak all users' spending totals.

-- 4. Total spent and transaction count per merchant
SELECT
  merchant,
  SUM(amount)  AS total_spent,
  COUNT(*)     AS transaction_count
FROM transactions
WHERE user_id = 'f2e194b2-39d5-4444-9700-ef2c7cf9d423'
GROUP BY merchant
ORDER BY total_spent DESC;

-- 5. Overall account stats — one summary row
SELECT
  COUNT(*)        AS total_transactions,
  SUM(amount)     AS total_spent,
  ROUND(AVG(amount), 2) AS avg_per_transaction,
  MIN(amount)     AS smallest,
  MAX(amount)     AS largest
FROM transactions
WHERE user_id = 'f2e194b2-39d5-4444-9700-ef2c7cf9d423';

-- 6. Merchants with total spend above a threshold (HAVING demo)
SELECT
  merchant,
  SUM(amount) AS total_spent
FROM transactions
WHERE user_id = 'f2e194b2-39d5-4444-9700-ef2c7cf9d423'
GROUP BY merchant
HAVING SUM(amount) > 300
ORDER BY total_spent DESC;