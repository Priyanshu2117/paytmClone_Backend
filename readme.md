# Paytm Clone - Backend

A RESTful API backend for a Paytm-like payment application built with Express and MongoDB.

## Tech Stack

- Express v5
- MongoDB (Mongoose)
- JWT Authentication
- Zod Validation
- Bcrypt Password Hashing

## Project Structure

```
Backend/
├── controller/        # Route handlers
├── db/                # Database connection
├── middlewares/        # Auth middleware
├── routes/            # API route definitions
├── services/          # Business logic
├── utils/             # Helper functions
├── validations/       # Request validation schemas
├── config.js          # App configuration
└── index.js           # Entry point
```

## API Routes

Base URL: `/api/v1`

| Prefix       | Description          |
| ------------ | -------------------- |
| `/user`      | User authentication & profile |
| `/account`   | Account & transactions |

## Getting Started

```bash
# Install dependencies
npm install

# Create a .env file with required variables
cp .env.example .env

# Run in development
npm run dev
```

The server starts on `http://localhost:3000`.
