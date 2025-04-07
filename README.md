This is a MERN (MongoDB, Express, React, Node.js) stack application with NGINX as a reverse proxy and load balancing and Redis for caching. The setup includes multiple backend services and a frontend React application.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or later)
npm or yarn
Docker
Redis Stack (via Docker)
NGINX

Getting Started
Follow these steps to set up and run the application:

1. Start the Frontend Application:
    cd frontend
    npm install
    npm start

  The React application will start on http://localhost:3000

2. Start the Backend Services
  Backend 1 (Port 8000):
    cd backend1
    npm install
    nodemon app.js or node app.js

3. Start the Backend Services
  Backend 2 (Port 8002):
    cd backend2
    npm install
    nodemon app.js or node app.js

4. Start Redis Stack with Docker
    Run the following command to start Redis Stack:
     docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

5. Configure and Start NGINX:
    cd nginx
    start nginx

This will start NGINX on port 80. You can access the application at:

http://localhost:80
