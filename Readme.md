# BetKZ — Online Sportsbook Platform

## 📌 Project Overview

**BetKZ** is a full-stack sportsbook web application developed using **Node.js, Express, MongoDB Atlas, and React**.

The platform demonstrates:

* Secure authentication using JWT
* Role-Based Access Control (RBAC)
* Sports event management
* Betting system with odds
* Automatic bet resolution
* Balance tracking
* Leaderboard system
* Admin control panel
* Docker-based deployment

This project was developed as part of the **Final Project Assignment** and follows all required architectural and security standards.

---

# 🧱 System Architecture

The application follows a **client-server architecture**:

Frontend (React + Vite)
⬇ REST API
Backend (Node.js + Express)
⬇
MongoDB Atlas (Cloud Database)

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* RBAC middleware
* Docker

## Frontend

* React
* Vite
* REST API integration
* Responsive layout

---

# 📁 Project Structure

```
betkz/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── app.js
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── vite.config.js
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Setup Instructions

---

## 🔹 1. Clone Repository

```bash
git clone https://github.com/your-repo/betkz.git
cd betkz
```

---

## 🔹 2. MongoDB Atlas Setup

1. Create cluster at [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create database user
3. Add Network Access:

   ```
   0.0.0.0/0
   ```
4. Copy connection string

---

## 🔹 3. Environment Variables

Create:

```
backend/.env
```

Add:

```
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/betkz
JWT_SECRET=supersecretkey
```

---

## 🔹 4. Run Locally (Without Docker)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔹 5. Run with Docker

```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

App runs at:

```
http://localhost:5000
```

---

# 🔐 Authentication & Security

* Passwords hashed using **bcrypt**
* JWT tokens for authentication
* Private routes protected via middleware
* Role-based access control
* Secrets stored in `.env`

---

# 👥 Role-Based Access Control (RBAC)

| Role  | Permissions                                   |
| ----- | --------------------------------------------- |
| user  | Place bets, deposit, view history             |
| admin | Create events, resolve matches, manage events |

---

# 📡 API Documentation

Base URL:

```
http://localhost:5000/api
```

---

# 🔐 AUTH ENDPOINTS

---

## 🟢 Register

### POST `/api/auth/register`

Request:

```json
{
  "username": "user1",
  "email": "user@mail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "User created successfully"
}
```

---

## 🟢 Login

### POST `/api/auth/login`

Request:

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 👤 USER ENDPOINTS

---

## 🔒 Get Profile

### GET `/api/users/profile`

Headers:

```
Authorization: Bearer TOKEN
```

Response:

```json
{
  "_id": "...",
  "username": "user1",
  "email": "user@mail.com",
  "balance": 1000,
  "role": "user"
}
```

---

## 🔒 Deposit

### POST `/api/users/deposit`

Request:

```json
{
  "amount": 500
}
```

Response:

```json
{
  "balance": 1500
}
```

---

## 🟢 Leaderboard

### GET `/api/users/leaderboard`

Response:

```json
[
  {
    "username": "user1",
    "balance": 2000
  }
]
```

---

# ⚽ EVENTS

---

## 🔒 Create Event (Admin)

### POST `/api/events`

```json
{
  "title": "Real Madrid vs Barcelona",
  "odds": {
    "home": 1.8,
    "draw": 3.2,
    "away": 2.4
  }
}
```

---

## 🟢 Get Events

### GET `/api/events`

Response:

```json
[
  {
    "_id": "...",
    "title": "Real vs Barca",
    "status": "active",
    "odds": {
      "home": 1.8,
      "draw": 3.2,
      "away": 2.4
    }
  }
]
```

---

## 🔒 Resolve Event (Admin)

### PUT `/api/events/:id/result`

```json
{
  "result": "home"
}
```

---

# 🎯 BETS

---

## 🔒 Place Bet

### POST `/api/bets`

```json
{
  "eventId": "EVENT_ID",
  "outcome": "home",
  "amount": 100
}
```

---

## 🔒 Get Bet History

### GET `/api/bets`

Response:

```json
[
  {
    "event": {
      "title": "Real vs Barca"
    },
    "outcome": "home",
    "amount": 100,
    "status": "won",
    "payout": 180
  }
]
```

---

# 🏆 Advanced Features

* Role-Based Access Control
* Automatic bet resolution
* Balance updates
* Leaderboard system
* Admin match control
* Docker deployment

---

# 🚀 Deployment Guide (Render / Railway)

1. Push project to GitHub
2. Create new Web Service
3. Add environment variables
4. Set start command:

```
node backend/src/server.js
```

---

# 📸 Screenshots

Include:

* Login page
* Dashboard
* Admin panel
* Bet history
* Leaderboard
* Wallet

(Add screenshots here)

---

# 🧪 Validation & Error Handling

* Joi validation for input
* 400 — Bad request
* 401 — Unauthorized
* 403 — Forbidden
* 404 — Not found
* 500 — Internal server error
* Global error middleware



