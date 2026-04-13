# 🚀 AxleHost - High-Performance Game Hosting

AxleHost is a modern, high-performance web platform for game server hosting. It features a premium neon-dark aesthetic with glassmorphism components, interactive dashboards, and full-stack authentication.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion (Animations), Lucide React (Icons).
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Auth**: JWT (JSON Web Tokens), Bcrypt.js (Password Hashing).

## 📂 Project Structure

```text
/AxleHost
├── client/              # Frontend React application
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View pages (Home, Plans, Dashboard, etc.)
│   │   ├── App.jsx     # Router & Shared layout
│   │   └── index.css   # Tailored design system & global styles
│   ├── tailwind.config # Modern neon-dark theme configuration
│   └── package.json    # React dependencies
└── server/             # Backend API
    ├── models/         # Database schemas
    ├── routes/         # API endpoints (Auth, etc.)
    ├── server.js       # Main server entry point
    └── package.json    # Backend dependencies
```

## ⚙️ Installation & Usage

### 1. Setup Backend
```bash
cd server
npm install
# Create a .env file with:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
# PORT=5000
npm run dev
```

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev
```

## ✨ Key Features
- **Premium UI**: 100% custom styling for a "wow" first impression.
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile.
- **Glassmorphism**: Backdrop blur effects and translucent borders for a state-of-the-art feel.
- **Interactive Dashboard**: A high-tech mockup of a real server management panel.
- **SEO Ready**: Semantic HTML and performance-first structure.
- **Smooth Animations**: Integrated Framer Motion transitions across all sections.

---
Built with ❤️ by Antigravity
