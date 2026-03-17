# Microservices Application – README

This project is a distributed microservices application developed as part of the course.
Each service is designed to be independent, scalable, and deployable both locally or on Kubernetes.

---

## Table of Contents

1. [Project Description](#project-description)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Running with Docker Compose](#running-with-docker-compose)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [Environment Variables](#environment-variables)
7. [Main API Endpoints](#main-api-endpoints)

---

## Project Description

This application simulates a multi-service platform that handles user authentication, movie data consumption, and customer orders, all served via a frontend interface.

---

## Architecture

The system follows a microservices architecture:

| Service        | Responsibility                                | Tech Stack           | Folder           |
| -------------- | --------------------------------------------- | -------------------- | ---------------- |
| Auth Service   | User authentication, login/signup, JWT tokens | FastAPI              | `auth-service`   |
| Movies Service | Consume TheMovieDB API, manage movie database | FastAPI + PostgreSQL | `movies-service` |
| Order Service  | Manage customer orders                        | Nuxt.js              | `order-service`  |
| Frontend       | Main user interface                           | Next.js              | `frontend`       |
| k8s       | kubernetes manifests                       | yaml            | `k8q`       |


---

## Installation

### Prerequisites

* Python 3.11+
* Node.js 20+
* PostgreSQL (for Movies Service)
* Docker & Docker Compose
* Kubectl (for Kubernetes deployment)

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/SyraxTarg/devops-microservices.git
cd devops-microservices
```

2. Copy `.env.example` files to `.env` in each service folder and fill in your values.

3. Install dependencies for each service:

* **Auth Service**

```bash
cd auth-service
pip install -r requirements.txt
```

* **Movies Service**

```bash
cd movies-service
pip install -r requirements.txt
```

* **Order Service**

```bash
cd order-service
npm install
```

* **Frontend**

```bash
cd frontend
npm install
```

---

## Running with Docker Compose

Start all services with:

```bash
docker-compose up --build
```

* Auth Service: `http://localhost:8000`
* Movies Service: `http://localhost:8082`
* Order Service: `http://localhost:4000`
* Frontend: `http://localhost:3000`

Stop services:

```bash
docker-compose down -v
```

---

## Kubernetes Deployment

This part of the project was realised on a cloud kubernetes cluster and not on minikube, you should still be able to run it on minikube.
All manifests are located in the `k8s/` folder.
Before applying, replace placeholder values in secrets and configmaps.
The app will be accessible at `http://miti.local/`, dont forget to modify your hosts file if you need it.


Apply manifests recursively:

```bash
kubectl apply -f k8s/ --recursive
```

---

## Environment Variables

Each service uses environment variables defined in its `.env` file. Example:

### Auth Service

```
JWT_SECRET=CHANGEME
JWT_ALGO=CHANGEME
ACCESS_TOKEN_EXPIRES_MIN=CHANGEME
REFRESH_TOKEN_EXPIRES_MIN=CHANGEME
CORS_ORIGINS=CHANGEME
DATABASE_URL=CHANGEME
```

### Movies Service

```
API_TOKEN=CHANGEME
API_KEY=CHANGEME
DATABASE_URL=CHANGEME
MOVIE_API_URL=CHANGEME
SECRET_KEY=CHANGEME
ALGORITHM=CHANGEME
CORS_ORIGINS=CHANGEME
```

### Order Service

```
JWT_SECRET=CHANGEME
PORT=CHANGEME
DATABASE_URL=CHANGEME
```

### Frontend

```
NEXT_PUBLIC_API_BASE=CHANGEME
AUTH_SERVICE_URL=CHANGEME
ORDER_SERVICE_URL=CHANGEME
MOVIE_SERVICE_URL=CHANGEME
```

---

## Main API Endpoints

### Auth Service

* `POST /register` – Register a new user
* `POST /login` – Login a user
* `POST /refresh` – Refresh the token


### Movies Service

* `GET /genres` – Get all genres
* `GET /movies/popular` – Get popular movies
* `GET /movies/recommandations` – Get recommandations for a user
* `GET /movies/{genre_id}}` – Get popular movies by genre

### Order Service

* `GET /orders` – List all orders for a connected user
* `POST /orders` – Create a new order for a connected user
* `GET /orders/{id}` – Retrieve a specific order for a connected user
* `DELETE /orders/{id}` – Delete a specific order for a connected user

### Frontend

* Acts like a proxy and uses the microservices's routes

---

## Local Development Commands

* **Auth Service:**

```bash
python init_db.py && uvicorn main:app --host 0.0.0.0 --port 8000
```

* **Movies Service:**

```bash
python main.py
```

* **Order Service:**

```bash
npm run dev
```

* **Frontend:**

```bash
npm run dev
```

---
