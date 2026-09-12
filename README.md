# Triage

Full-stack starter using the latest stable versions verified from npm on 2026-05-02:

- Angular `21.2.11`
- NestJS `11.1.19`
- PostgreSQL `18-alpine`
- Prisma ORM `7.8.0`
- class-validator `0.15.1`
- TypeScript `5.9.3` (latest stable version supported by Angular 21)
- REST API with JWT access tokens
- Three Angular interfaces: `patient-ui`, `ioa-dashboard` and `landing`

## Requirements

- Node.js 22+
- Corepack
- Docker, for local PostgreSQL

## Setup

```bash
corepack pnpm install
cp apps/api/.env.example apps/api/.env
corepack pnpm db:up
corepack pnpm prisma:generate
corepack pnpm prisma:migrate
corepack pnpm dev
```

The API runs on `http://localhost:3000`, patient UI runs on `http://localhost:4200`, IOA dashboard runs on `http://localhost:4201`, and the landing page runs on `http://localhost:4202`.

See [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md) for where frontend code should live as the two Angular apps grow.
