Task Manager App

A full-stack task management web application built with React.js (client) and Node.js + Express + MongoDB (server).

Features

User authentication (login/register)

Create, update, delete, and track tasks

Responsive UI with modern design

Technology Choices & Architecture

Client (Frontend): React.js, Tailwind CSS — handles UI and communicates with server APIs

Server (Backend): Node.js, Express.js — handles authentication, task management, and database operations

Database: MongoDB (Atlas or local)

Architecture: Client-Server model; RESTful APIs connect client and server

Local Setup

Clone the repository

git clone https://github.com/Hariprashanth2005/TASK_MANAGER_APP.git
cd TASK_MANAGER_APP


Install server dependencies

cd server
npm install


Install client dependencies

cd ../client
npm install


Set up environment variables
Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run the server

cd server
npm run dev


Run the client

cd client
npm start


Open http://localhost:3000
 to view the app.
