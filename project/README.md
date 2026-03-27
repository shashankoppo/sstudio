# Suraj Studio - Premium Photography Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/262020b7-ad97-42c0-8d6e-da19c3215089/deploy-status)](https://app.netlify.com/projects/sstudios/deploys)

A high-end, minimalistic, and cinematic portfolio website for Suraj Studio. Features include a sophisticated Cream and Espresso Brown editorial theme, centered brand logo, smooth GSAP animations, and Lenis smooth scrolling.

## 🌟 Key Features

- **Luxury Aesthetics**: Sophisticated Cream (`#FDFBFA`) and Espresso Brown (`#3E2723`) color palette.
- **Cinematic Experience**: Lenis smooth scrolling and GSAP `clip-path` image reveals.
- **Magnetic Cursor**: Custom interactive cursor that responds to hover states.
- **Premium Typography**: Using `Cormorant Garamond` and `Montserrat` for an editorial feel.
- **Admin Panel**: Full control over portfolio items, leads, and website settings.

## 🚀 Deployment

### Netlify (Frontend Only)
The project includes a `netlify.toml` file configured for single-page applications. 
1. Connect your repository to Netlify.
2. The build command is `npm run build` and the publish directory is `dist`.

### Docker (Full Stack)
Containerize the entire application (Vite Frontend + Node.js Backend) using Docker.
```bash
docker-compose up -d
```

### Ubuntu VPS
A dedicated deployment script is provided for quick setup on an Ubuntu server.
```bash
bash deploy-ubuntu.sh
```

## 🛠️ Development

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Animations**: GSAP, @gsap/react, Lenis
- **Backend**: Node.js, Express, SQLite (better-sqlite3)
- **Icons**: Lucide React
