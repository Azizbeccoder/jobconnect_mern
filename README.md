# JobConnect — MERN (V1)

A career platform that helps people find work. This is **V1**: the pure MERN version. V2 (Next.js + NestJS) and V3 (Next.js full‑stack) will live in sibling folders once this ships.

## Stack

- **Frontend:** React 18 + Vite + React Router + TailwindCSS + Axios
- **Backend:** Node.js + Express + Mongoose + JWT + bcrypt
- **Database:** MongoDB (Atlas in prod, local Docker in dev)

## Prerequisites

- Node.js 20+ and npm (or pnpm)
- A MongoDB connection string (either a free [Atlas](https://www.mongodb.com/atlas) cluster or local `mongodb://localhost:27017`)

## Quick start

```bash
# 1. Install server deps
cd server
npm install
cp .env.example .env        # then fill in MONGODB_URI + secrets
npm run dev                 # starts API on http://localhost:4000

# 2. In a second terminal, install client deps
cd client
npm install
cp .env.example .env        # VITE_API_URL defaults to localhost:4000
npm run dev                 # starts UI on http://localhost:5173
```

Open <http://localhost:5173>. You should see the landing page. The health check at <http://localhost:4000/api/health> should return `{ "ok": true }`.

## What's in the box

- `server/` — Express API with:
  - Mongoose connection bootstrap
  - User model with hashed password
  - `/api/auth/register` and `/api/auth/login` with JWT issued as an `httpOnly` cookie
  - `/api/users/me` protected route demonstrating auth middleware
  - Centralised error handler + async wrapper
- `client/` — React + Vite app with:
  - Router + basic page layout
  - Auth context and API client (axios with credentials)
  - Login + Register pages wired to the API
  - Tailwind configured and working

## Next steps (from the roadmap)

See `../JobConnect_Roadmap.md` for the full plan. The immediate path is:

1. Finish auth UX (form validation, error toasts, logout button).
2. Build the `User` profile page (`GET/PATCH /api/users/me`).
3. Add the `Job` model + CRUD for employers.
4. Add the `Application` flow.
5. Add the resume builder + kanban tracker.

## Project structure

```
jobconnect-mern/
├── README.md
├── server/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── config/db.js
│       ├── models/User.js
│       ├── middleware/auth.js
│       ├── middleware/errorHandler.js
│       ├── controllers/authController.js
│       ├── controllers/userController.js
│       └── routes/
│           ├── authRoutes.js
│           └── userRoutes.js
└── client/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/client.js
        ├── context/AuthContext.jsx
        ├── components/Navbar.jsx
        └── pages/
            ├── HomePage.jsx
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            └── DashboardPage.jsx
```
