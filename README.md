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

## API Routes (backend)
- `GET/POST/PUT/DELETE /api/auth`
- `GET/POST/PUT/DELETE /api/submissions`

