# Microservices Application – README

This project is a distributed application composed of several microservices developed during the course.
Each service has its own responsibility, environment variables, and can be deployed independently or via Kubernetes.

---

## Microservices Architecture

The application consists of the following services:

---

### 1. **Auth Service – FastAPI**

Handles authentication (login, signup, token generation).

- **Tech stack:** FastAPI
- **Folder:** `auth-service`

**Environment variables (.env):**
Please create the .env file based on the .env.example

```.env
# JWT variables
JWT_SECRET=CHANGEME
JWT_ALGO=CHANGEME
ACCESS_TOKEN_EXPIRES_MIN=CHANGEME
REFRESH_TOKEN_EXPIRES_MIN=CHANGEME

# Build variables
CORS_ORIGINS=CHANGEME

# SQLite variables
DATABASE_URL=CHANGEME
```

---

### 2. **Order Service – Nuxt**

Manages customer orders.

- **Tech stack:** Nuxt
- **Folder:** `order-service`

**Environment variables (.env):**
Please create the .env file based on the .env.example

```.env
# JWT variables
JWT_SECRET=CHANGEME

# Build variables
PORT=CHANGEME

# SQLite variables
DATABASE_URL=CHANGEME
```

---

### 3. **Frontend – Next.js**

Main user interface of the application.

- **Tech stack:** Next.js
- **Folder:** `frontend`

**Environment variables (.env):**
Please create the .env file based on the .env.example

```.env
NEXT_PUBLIC_API_BASE=CHANGEME
AUTH_SERVICE_URL=CHANGEME
ORDER_SERVICE_URL=CHANGEME
MOVIE_SERVICE_URL=CHANGEME
```

---

### 4. **Movies Service – FastAPI**

Consumes the public **TheMovieDB** API and uses a PostgreSQL database.
You can access the openapi documentation at the `/docs` route.

- **Tech stack:** FastAPI + PostgreSQL
- **Folder:** `movies-service`

**Environment variables (.env):**
Please create the .env file based on the .env.example

```.env
API_TOKEN=CHANGEME
API_KEY=CHANGEME

DATABASE_URL=CHANGEME

MOVIE_API_URL=CHANGEME

SECRET_KEY=CHANGEME

ALGORITHM=CHANGEME

CORS_ORIGINS=CHANGEME
```

---

## Kubernetes Deployment

The `k8s` folder contains all Kubernetes manifests required to deploy the entire application.

To apply all manifests:

```bash
kubectl apply -f k8s/ --recursive
```

---

## Local Development

Each service can be run individually:

### Auth service

```bash
python init_db.py && uvicorn main:app --host 0.0.0.0 --port 8000
```

### Movies service

```bash
python main.py
```

### order-service

```bash
npm install
npm run dev
```

### frontend

```bash
npm install
npm run dev
```

---
