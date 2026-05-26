# NGO Assignment

This repository contains a simple full-stack app:

- `frontend/`: React + Vite UI
- `ngo/`: Node.js + Express backend API (MongoDB, JWT)

## Setup

### Backend (`ngo/`)
1. Go to `ngo/`
2. Create a `.env` file with:
   - `MONGO_URI` (MongoDB connection string)
   - `JWT_SECRET` (used to sign tokens)
3. Install and run:
   - `npm install`
   - `npm run dev` (defaults to port `5000`)

### Frontend (`frontend/`)
1. Go to `frontend/`
2. Install and run:
   - `npm install`
   - `npm run dev` (Vite dev server)

## Deployment

| Service  | URL |
|----------|-----|
| Frontend | https://ngoassignment.vercel.app |
| Backend  | https://ngoassignment.onrender.com |

The frontend calls `https://ngoassignment.onrender.com/api` in production (see `frontend/.env.production`). Local dev uses `http://localhost:5000/api` via `frontend/.env.development`.

**Render (backend):** set `MONGO_URI`, `JWT_SECRET`, and optionally `FRONTEND_URL=https://ngoassignment.vercel.app`.

**Vercel (frontend):** optional override — `VITE_API_URL=https://ngoassignment.onrender.com/api` (already set in `.env.production` for builds).

## API Routes (backend)
- `GET/POST/PUT/DELETE /api/auth`
- `GET/POST/PUT/DELETE /api/submissions`

