#!/bin/bash

# Prayer Tracker Startup Script

echo "Starting Prayer Tracker Application..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Warning: MongoDB is not running. Please start MongoDB first."
    echo "You can start MongoDB with: sudo systemctl start mongod"
    echo "Or install MongoDB if not installed."
fi

# Start backend
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Application started!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait