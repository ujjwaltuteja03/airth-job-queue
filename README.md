# Mini Job Queue Dashboard

A full-stack job queue management dashboard built with React, NestJS, TypeScript, and PostgreSQL.

## Features

- Create and delete jobs
- View and filter jobs by status
- Update jobs through their allowed lifecycle
- Loading and API error handling
- Server-side request validation
- PostgreSQL persistence
- Concurrent update protection

## Job Lifecycle

pending → running → completed
                  ↘ failed


Completed and failed jobs are terminal and cannot be restarted. These rules are enforced by the backend, so they cannot be bypassed by directly calling the API.

For concurrent requests, status updates also check the job's current database state:

```sql
UPDATE jobs
SET status = $1
WHERE id = $2 AND status = $3
RETURNING *;
```

If two requests try to update the same state simultaneously, only one succeeds. The other receives a `409 Conflict`.

## Local Setup

Backend:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL=<postgres-url>
FRONTEND_URL=http://localhost:5173
```

Then:

```bash
npm run start:dev
```

Frontend:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Then:

```bash
npm run dev
```

## Notes

The UI and state management were intentionally kept simple to focus on API design, validation, and edge cases. PostgreSQL is hosted on Neon, while the frontend and backend are deployed separately on Vercel.

With more time, I would add automated tests, pagination, authentication, and structured logging.