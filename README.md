# Money Tracker (Frontend-Only Version)

> This repo is no longer under active development. For the current,
> deployed full-stack version — with a real backend, authentication, and
> multi-user support — see:
>
> - **Live app:** https://money-tracker-next-mu.vercel.app/login
> - **Frontend:** [`money-tracker-next`](https://github.com/dhruv-bamal/money-tracker-next)
> - **API:** [`money-tracker-api`](https://github.com/dhruv-bamal/money-tracker-api)

A frontend-only spending & subscription tracker for Indian students and
freelancers. All data lives in the browser's `localStorage` — no backend,
no accounts.

**Static demo:** https://money-tracker-drab-tau.vercel.app/

---

## Features

- Add expenses, auto-categorized by merchant name
- Recurring-subscription detection — flags repeated similar-amount charges
- Budget progress bar
- Data persisted via `localStorage` (single browser/device only)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript (strict) |
| Build tool | Vite |
| Styling | CSS Modules |
| Persistence | `localStorage` |
| Deployment | Vercel (static) |

---

## Why it was superseded

The current version replaces `localStorage` with a PostgreSQL database
behind a Node/Express API, adds bcrypt + JWT authentication with per-user
data isolation, and runs on Next.js instead of Vite.

The pure business-logic functions written here — `categorize()`,
`totalByCategory()`, `detectRecurring()` — carried over **unchanged** into
both later versions. They were written with zero dependency on React or
any framework specifically so they could move server-side and into
Next.js without modification.

---

## Running locally

```bash
git clone https://github.com/dhruv-bamal/money-tracker.git
cd money-tracker
npm install
npm run dev
```

No environment variables or backend required — fully self-contained,
runs entirely client-side.

---

## What I learned

Building this taught me how JavaScript actually executes (closures,
hoisting, the event loop), how to structure a real interactive React app
with typed props and controlled forms, and — the decision that mattered
most in hindsight — to keep business logic in plain, framework-free
functions rather than tangling it into components. That single habit is
why none of this logic had to be rewritten later.
