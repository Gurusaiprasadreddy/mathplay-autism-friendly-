# 🦁 MathPlay - Kids Learning Platform

**MathPlay** is an interactive, autism-friendly web application designed to help children learn basic mathematics through fun tutorials and engaging games.

![MathPlay Home Screenshot](https://via.placeholder.com/800x450?text=MathPlay+Home+Preview) 
*(Note: Replace with actual screenshot)*

## ✨ Features

- **🎓 Interactive Tutorials**: Visual learning for Counting, Addition, Subtraction, Multiplication, Division, Sequences, and Comparison.
- **🎮 Fun Games**: Gamified practice with immediate positive reinforcement (colors, sounds, confetti).
- **🎨 Beautiful UI**: Designed with calming pastel colors, large typography, and gentle animations (using Framer Motion).
- **💾 Progress Tracking**: Saves scores and streaks locally using a custom Node.js JSON database.
- **🗣️ Feedback System**: Child-friendly feedback form with emoji-based ratings.
- **📱 Responsive**: Works beautifully on tablets and desktops.

## 🛠️ Tech Stack

### Frontend (Client)
- **React 18** (Vite)
- **Tailwind CSS** (Styling & Design System)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **React Router DOM** (Navigation)

### Backend (Server)
- **Node.js**
- **Express.js**
- **File System (fs)** (Custom JSON Database)
- **CORS**

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher) installed.

### 2. Installation

#### Backend Setup
Open a terminal in the `server` directory:
```bash
cd server
npm install
```

#### Frontend Setup
Open a new terminal in the `client` directory:
```bash
cd client
npm install
```

### 3. Running the App

You need to run **both** the backend and frontend servers.

**Terminal 1 (Backend):**
```bash
cd server
node index.js
```
*Server runs on port 5000.*

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
*Client runs on http://localhost:5173*

## 📂 Project Structure

```
MathPlay/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (GameView, tutorial, etc.)
│   │   ├── data/           # Static learning data (topics.js)
│   │   ├── pages/          # Main pages (Home, TopicView, etc.)
│   │   └── index.css       # Tailwind & Global styles
│   └── ...
├── server/                 # Express Backend
│   ├── data/               # Local Database storage
│   │   └── db.json         # Stores scores & feedback
│   ├── db.js               # Database utility
│   └── index.js            # Server entry point
└── ...
```

## 👨‍💻 Developed By

**Guru Sai Prasad Reddy**
*Full Stack Developer*

---

*"Where learning math feels like magic!"* ✨
