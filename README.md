# Nox Metals App
# Full-Stack Authentication & Product Management App

This project is a full-stack application built with React, TypeScript, and Express. It demonstrates user authentication and product management functionalities, highlighting skills in frontend and backend development, secure data handling, and clean architectural design.

## Features

- User Authentication (Sign Up / Log In / Log Out)
- Product Management (Create, Read, Update, Delete)
- RESTful API with Express
- Frontend built with React and TypeScript
- Backend built with Node.js and Express
- Persistent data handling (e.g., in-memory or database)
- Modular codebase following best practices

## Tech Stack

- Frontend: React, TypeScript, Axios, CSS/Styled Components
- Backend: Node.js, Express, TypeScript
- Authentication: JWT (JSON Web Tokens)
- State Management: React Hooks or Context API

## Project Structure
root/
│
├── client/ # Frontend - React + TypeScript
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.tsx
│
├── server/ # Backend - Express + TypeScript
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ └── index.ts

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/nox-metals-app.git
cd nox-metals-app

2. Install dependencies:
# For client
cd client
npm install

# For server
cd ../server
npm install

3. Run the application:
# In one terminal
cd server
npm run dev

# In another terminal
cd client
npm start
The app should be running at http://localhost:3000

# Testing

Manual testing for authentication and product features
Add unit or integration tests if needed (e.g., Jest, React Testing Library)

# Future Improvements


Integrate a real database (e.g., MongoDB, PostgreSQL)
Add form validation and error handling
Implement user roles and permissions
Improve responsive design


---
