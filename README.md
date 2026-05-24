# DevPulse

A collaborative issue tracking system for software development teams to report bugs, request features, and manage project workflows.

> Internal tech issue & feature tracker with role‑based access control
> **Live API**: [https://rayhaanrakib-devpulse.vercel.app](https://rayhaanrakib-devpulse.vercel.app)

---

## 🎉 Features

- User authentication with JWT and bcrypt password hashing
- Role‑based access control (`contributor` and `maintainer`)
- Create, read, update, and delete bug reports and feature requests
- Filter and sort issues by type, status, and date
- Permission‑based editing:
  - Contributors: can edit their own **open** issues
  - Maintainers: can edit **all** issues

---

## 🛠️ Tech Stack

| Technology                     | Version | Purpose                          |
|--------------------------------|--------:|----------------------------------|
| Node.js                        | 24.x    | Server runtime                   |
| TypeScript                     | 5.x     | Type‑safe development            |
| Express.js                     | 5.x     | REST API framework               |
| PostgreSQL                     | 16.x    | Database                         |
| `@neondatabase/serverless`     | 1.x     | Serverless PostgreSQL driver     |
| `bcrypt`                       | 6.x     | Password hashing                 |
| `jsonwebtoken`                 | 9.x     | JWT authentication               |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24.x or higher
- PostgreSQL database (e.g. NeonDB)

### Installation

```bash
# Clone repository
git clone https://github.com/rayhaanrakib/B7A2.git
cd B7A2

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values
```

### Setup Database

Run the schema SQL file in your PostgreSQL client:

```sql
-- Run database/schema.sql in your PostgreSQL client
```

### Start Server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRY=24h
BCRYPT_ROUNDS=10
PORT=3000
```

---

## 🗄️ Database Schema

### `users` table

```sql
id          (SERIAL PRIMARY KEY)
name        (VARCHAR NOT NULL)
email       (VARCHAR UNIQUE NOT NULL)
password    (VARCHAR NOT NULL)
role        (VARCHAR DEFAULT 'contributor')
created_at  (TIMESTAMPTZ)
updated_at  (TIMESTAMPTZ)
```

### `issues` table

```sql
id            (SERIAL PRIMARY KEY)
title         (VARCHAR(150) NOT NULL)
description   (TEXT NOT NULL)
type          (VARCHAR: 'bug' | 'feature_request')
status        (VARCHAR: 'open' | 'in_progress' | 'resolved')
reporter_id   (INTEGER NOT NULL)
created_at    (TIMESTAMPTZ)
updated_at    (TIMESTAMPTZ)
```

---

## 🌐 API Endpoints

**Base URL**: `https://rayhaanrakib-devpulse.vercel.app`

### Authentication

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Issues

- `POST /api/issues` — Create an issue (auth required)
- `GET /api/issues` — Get all issues
  - Supports query params:
    - `?sort=newest`
    - `?type=bug`
    - `?status=open`
- `GET /api/issues/:id` — Get a single issue
- `PATCH /api/issues/:id` — Update an issue (auth + permissions)
- `DELETE /api/issues/:id` — Delete an issue (**maintainer only**)

---

## 👤 Author
Rayhan
GitHub: [@rayhaanrakib](https://github.com/rayhaanrakib)

**Built with TypeScript and PostgreSQL**