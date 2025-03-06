Travel Booking System

📌 Project Overview

The Travel Booking System is a web application that allows users to book travel tickets, manage bookings, and view booking history. The project consists of a React.js frontend and a GraphQL-based backend using MongoDB Atlas.

🛠️ Tech Stack

Frontend: React.js, Apollo Client, Bootstrap

Backend: Node.js, Express.js, GraphQL, MongoDB Atlas

Deployment: GitHub, Vercel (Frontend), Railway/Render (Backend)

📂 Folder Structure

travel-booking/
│── frontend/                # React.js Frontend
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Page components
│   │   ├── apolloClient.js  # GraphQL Apollo Client
│   │   ├── App.js           # Main React App
│   │   ├── index.js         # Entry point
│   ├── package.json         # Frontend dependencies
│   ├── .env                 # Environment variables
│   ├── .gitignore           # Ignore unnecessary files
│
│── backend/                 # Node.js Backend
│   ├── models/              # MongoDB Models
│   ├── resolvers/           # GraphQL Resolvers
│   ├── schema/              # GraphQL Schema
│   ├── server.js            # Main Express Server
│   ├── config.js            # MongoDB Connection
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables
│   ├── .gitignore           # Ignore unnecessary files
│
│── README.md                # Project Documentation

🔧 Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/your-username/travel-booking.git
cd travel-booking

2️⃣ Backend Setup

cd backend
npm install

➤ Create a .env file inside backend/

MONGO_URI=your_mongodb_connection_string
PORT=5000

➤ Run Backend Server

npm start

The backend will be running at http://localhost:5000/.

3️⃣ Frontend Setup

cd frontend
npm install

➤ Create a .env file inside frontend/

REACT_APP_GRAPHQL_ENDPOINT=http://localhost:5000/graphql

➤ Run Frontend Server

npm start

The frontend will be running at http://localhost:3000/.

🚀 Deployment Guide

📌 Deploy Frontend to Vercel

Push your code to GitHub.

Go to Vercel and log in with GitHub.

Click New Project → Import GitHub Repo.

Set the Root Directory to frontend/.

Set Build Settings:

Build Command: npm run build

Output Directory: build

Click Deploy and wait for the process to complete.

🔗 After deployment, your site will be live at:

https://your-project-name.vercel.app

📌 Deploy Backend to Railway/Render

Push your code to GitHub.

Go to Railway or Render.

Create a new project and connect your GitHub repo.

Add Environment Variables:

MONGO_URI

PORT (5000 or any port)

Deploy the project.

🔗 After deployment, update frontend .env:

REACT_APP_GRAPHQL_ENDPOINT=https://your-backend-url/graphql

🔥 Features

✅ User can book a travel ticket✅ Booking list with delete & update functionality✅ GraphQL-based API for efficient data fetching✅ Responsive UI with Bootstrap

🛠️ Troubleshooting

❌ Vercel Deployment Error: Missing build script

Solution: Ensure package.json in frontend/ contains:

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}

❌ 404 Not Found on Vercel Deployment

Solution: Set Root Directory to frontend/ when deploying on Vercel.

❌ MongoDB Connection Error

Solution: Ensure your MongoDB URI is correct and accessible.



