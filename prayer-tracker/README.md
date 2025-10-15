# Prayer Tracker - پیگیری خواندن دعاها

A single-page application for tracking daily reading of religious texts (Surah Fath, Dua Tawassul, and Dua 14 from Sahifa Sajjadiya).

## Features

- **Three-slide gallery** with religious texts
- **Reading tracking** with daily counters
- **Calendar view** showing reading statistics for each day
- **Responsive design** for mobile and desktop
- **Real-time statistics** showing how many people read each text today

## Tech Stack

### Frontend
- Vue 3
- TailwindCSS
- Vite
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd prayer-tracker/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prayer-tracker
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd prayer-tracker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/stats/today` - Get today's reading statistics
- `GET /api/stats/range?startDate&endDate&name` - Get statistics for a date range
- `GET /api/stats/month?year&month&name` - Get monthly statistics
- `POST /api/read` - Mark a prayer as read
- `GET /api/health` - Health check

## Database Schema

The `prayerReads` collection contains documents with:
- `name`: Prayer name (سوره فتح, دعای توسل, دعای چهاردهم)
- `date`: Date in YYYY-MM-DD format
- `count`: Number of readings for that day

## Usage

1. Open the application in your browser
2. Navigate between the three slides using arrow buttons
3. Read the religious text
4. Click "خواندم ✅" to mark as read
5. View daily statistics and calendar
6. Check how many people read each text today

## Contributing

Feel free to submit issues and enhancement requests!