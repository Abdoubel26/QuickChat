# QuickChat

A Full Stack MERN (MongoDB, Express, React, Node.js) application that enables users to create accounts and chat with each other in real-time.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure account creation and login functionality
- **Real-time Messaging**: Send and receive messages instantly
- **User Profiles**: Create and manage user profiles
- **Chat Interface**: Intuitive and responsive chat interface
- **Message History**: View previous conversations

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **TypeScript** (72.9%) - Ensures type safety and better code quality
- **CSS** - Styling for responsive design
- **HTML** - Markup structure

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express** - Web framework for building REST APIs
- **MongoDB** - NoSQL database for data persistence
- **JavaScript** (24.9%) - Backend logic and utilities

### Language Composition
- TypeScript: 72.9%
- JavaScript: 24.9%
- CSS: 1.1%
- HTML: 1.1%

## 📁 Project Structure

```
QuickChat/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   └── App.tsx        # Main App component
│   └── package.json
├── server/                # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── controllers/       # Business logic
│   └── server.js          # Entry point
├── package.json
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdoubel26/QuickChat.git
   cd QuickChat
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

## 🔐 Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickchat
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Create a `.env.local` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd client
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Production Mode

```bash
# Build the frontend
cd client
npm run build

# Start the backend in production
cd ../server
npm run start
```

## 💬 Usage

1. **Create an Account**: Sign up with your email and password
2. **Log In**: Use your credentials to access the chat application
3. **Find Users**: Browse and find other users to chat with
4. **Send Messages**: Start a conversation and send real-time messages
5. **View History**: Access your message history with other users

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Created by**: [Abdoubel26](https://github.com/Abdoubel26)

**Last Updated**: 2026-05-17
