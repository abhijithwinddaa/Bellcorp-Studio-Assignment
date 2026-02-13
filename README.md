# Bellcorp Event Management Application

A full-stack MERN event management platform where users can discover, browse, and register for events. Built with a clean black & white theme for a professional, minimal look.

## Tech Stack

- **Frontend**: React.js (Vite), React Router, Axios, React Icons, React Toastify
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT + bcryptjs
- **Styling**: Custom CSS with CSS variables (black & white theme)

## Features

- **User Authentication** — Signup, login, protected routes with JWT
- **Event Discovery** — Browse events with search, filter by category/location, pagination
- **Event Details** — View full event info, available seats, register/cancel
- **User Dashboard** — View registered events split into Upcoming & Past
- **Performance Optimized** — Lazy-loaded routes, debounced search, React.memo, server-side pagination, MongoDB indexes

## Database Schema

```
User ←──── Registration ────→ Event
 (1)         (many)           (1)

User: { name, email, password (hashed) }
Event: { name, organizer (→User), location, date, description, capacity, registeredCount, category, tags }
Registration: { userId (→User), eventId (→Event) } — compound unique index
```

## Project Structure

```
├── server/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Auth, Event, Registration logic
│   ├── middleware/            # JWT auth, error handler, validation
│   ├── models/               # User, Event, Registration schemas
│   ├── routes/               # API route definitions
│   ├── validators/           # express-validator chains
│   ├── utils/                # Token generation
│   ├── seed.js               # Database seeder (17 mock events)
│   ├── app.js                # Express app config
│   └── server.js             # Entry point
├── client/
│   ├── src/
│   │   ├── api/axios.js      # Axios instance with interceptors
│   │   ├── components/       # Navbar, Footer, EventCard, EventList, etc.
│   │   ├── context/          # AuthContext (global auth state)
│   │   ├── hooks/            # useAuth, useDebounce, useEvents
│   │   ├── pages/            # Home, Login, Signup, EventDetails, Dashboard
│   │   ├── styles/           # CSS variables, global styles, component CSS
│   │   └── utils/            # Date formatting utilities
│   └── vercel.json           # SPA rewrite for Vercel
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- npm

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Bellcorp Studio Assignment"
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bellcorp-events
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

### 4. Test Login

After seeding, use these credentials:

- **Email**: test@example.com
- **Password**: password123

## API Endpoints

### Auth

| Method | Endpoint           | Description       | Auth |
| ------ | ------------------ | ----------------- | ---- |
| POST   | `/api/auth/signup` | Register new user | No   |
| POST   | `/api/auth/login`  | Login user        | No   |
| GET    | `/api/auth/me`     | Get current user  | Yes  |

### Events

| Method | Endpoint                 | Description                            | Auth |
| ------ | ------------------------ | -------------------------------------- | ---- |
| GET    | `/api/events`            | List events (search, filter, paginate) | No   |
| GET    | `/api/events/:id`        | Get event details                      | No   |
| GET    | `/api/events/categories` | Get distinct categories                | No   |
| GET    | `/api/events/locations`  | Get distinct locations                 | No   |

### Registrations

| Method | Endpoint                            | Description               | Auth |
| ------ | ----------------------------------- | ------------------------- | ---- |
| POST   | `/api/registrations/:eventId`       | Register for event        | Yes  |
| DELETE | `/api/registrations/:eventId`       | Cancel registration       | Yes  |
| GET    | `/api/registrations/my`             | Get user's registrations  | Yes  |
| GET    | `/api/registrations/check/:eventId` | Check registration status | Yes  |

## Deployment

- **Frontend**: Deploy `client/` to Vercel (framework: Vite)
- **Backend**: Deploy `server/` to Render (Web Service)
- Set environment variables on both platforms

## License

MIT
