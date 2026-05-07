# NGMEE - Next Gen Media Extraction Engine

NGMEE is a premium, futuristic media downloader web application with a glassmorphism design system. It supports downloading publicly accessible media from YouTube, Instagram, TikTok, and Facebook.

## Features
- **Smart URL Detection:** Automatically identifies the platform from the pasted link.
- **Instant Metadata:** Fetches thumbnails, titles, and creator info instantly.
- **Glassmorphism UI:** Advanced dark-mode interface with neon glows and smooth animations.
- **Mobile-First:** Optimized for all screen sizes and touch targets.
- **Secure Streaming:** Streams media directly from the source through the backend.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS (v4), Framer Motion, Axios, React Icons.
- **Backend:** Node.js, Express.js.
- **Media Engine:** yt-dlp.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python (required for `yt-dlp`)
- `yt-dlp` is handled by the engine.

### Quick Start (One Command)
1. **Install All Dependencies:**
   ```bash
   npm run setup
   ```
2. **Start NGMEE (Frontend + Backend):**
   ```bash
   npm start
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## Project Structure
```
├── client/              # React + Vite Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── services/    # API Services
│   │   └── App.jsx      # Main Application logic
├── server/              # Express Backend
│   ├── controllers/     # Route Controllers
│   ├── routes/          # API Routes
│   └── server.js        # Entry point
```

## Important Note
- Only support publicly accessible content.
- Do not use for scraping restricted or private media.
- Respect the terms of service of the respective platforms.
