# TalentBridge — Task 4: PostgreSQL + Prisma

Full-stack TalentBridge internship platform using React + TypeScript on the frontend and Express + Prisma + PostgreSQL on the backend.

## Structure

- `frontend/` — Vite React application
- `backend/src/` — Express server, routes, controllers, services, middleware and Prisma client
- `backend/prisma/` — Prisma schema, seed and migration history
- `docs/` — API and SQL notes
- `docker-compose.yml` — local PostgreSQL

## Run

1. Start PostgreSQL: `docker compose up -d`
2. Copy `backend/.env.example` to `backend/.env`
3. In `backend`: `npm install && npm run prisma:generate && npm run prisma:deploy && npm run prisma:seed && npm run dev`
4. Copy `frontend/.env.example` to `frontend/.env`
5. In `frontend`: `npm install && npm run dev`

The API defaults to `http://localhost:4000`; the frontend uses `VITE_API_BASE_URL=http://localhost:4000/api`.
