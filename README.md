# LeadFlow CRM

A complete lead management CRM built with React, Express, MongoDB, and Recharts. The app supports lead creation, editing, deletion, filtering, analytics, and a responsive dashboard for tracking pipeline health.

## Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=white)

## Features

- Lead dashboard with status cards, conversion rate, and charts.
- Full CRUD API for leads with search, filtering, sorting, and pagination.
- Responsive lead table with view, edit, and delete actions.
- Add, edit, and detail pages with reusable form validation.
- Custom toast notifications and delete confirmation modal.
- Fixed sidebar and top navbar with a mobile-friendly layout.
- CSS variable driven design system with no UI library.

## Screenshots

Add screenshots here after running the app locally.

- Dashboard screenshot placeholder
- Leads table screenshot placeholder
- Lead detail screenshot placeholder

## Prerequisites

- Node.js 18 or newer
- MongoDB running locally or a MongoDB Atlas connection string

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd crm-app
```

### 2. Install dependencies

Install backend and frontend dependencies separately.

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure environment variables

Backend `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm_leads
NODE_ENV=development
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the backend

```bash
cd backend
npm run dev
```

### 5. Run the frontend

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

The frontend runs on Vite's default port and talks to the backend at `http://localhost:5000`.

## API Reference

| Method | Endpoint | Description | Body / Params |
| --- | --- | --- | --- |
| POST | `/api/leads` | Create a new lead | Body: `name`, `email`, `phone`, `company`, `status`, `notes` |
| GET | `/api/leads` | Get paginated leads | Query: `page`, `limit`, `status`, `sort`, `order`, `search` |
| GET | `/api/leads/:id` | Get one lead by id | Params: `id` |
| PUT | `/api/leads/:id` | Update one lead | Params: `id`, Body: lead fields |
| DELETE | `/api/leads/:id` | Delete one lead | Params: `id` |
| GET | `/api/leads/search` | Search leads by name, email, or company | Query: `q` |
| GET | `/api/leads/stats` | Get dashboard stats | None |

## Folder Structure

```text
crm-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── leadController.js
│   ├── models/
│   │   └── Lead.js
│   ├── routes/
│   │   └── leadRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── logger.js
│   ├── .env
│   └── server.js
└── frontend/
    ├── index.html
    ├── public/
    └── src/
        ├── api/
        │   └── leadApi.js
        ├── components/
        ├── context/
        ├── pages/
        ├── styles/
        ├── utils/
        ├── App.jsx
        └── main.jsx
```

## Deployment Guide

### Backend on Render

1. Create a new Web Service on Render.
2. Point it at the backend folder.
3. Set build command to `npm install`.
4. Set start command to `npm start`.
5. Add environment variables for `MONGO_URI`, `PORT`, and `NODE_ENV`.

### Frontend on Vercel

1. Import the frontend folder into Vercel.
2. Set the framework preset to Vite.
3. Add `VITE_API_URL` pointing to the deployed backend URL.
4. Deploy the app and verify API requests from the browser.

## Notes

- The backend uses MongoDB indexes for email, status, company, and name.
- The frontend relies on React Context and `useReducer` for lead list state and filtering.
- Toasts, modal transitions, and responsive navigation are implemented without external UI libraries.
