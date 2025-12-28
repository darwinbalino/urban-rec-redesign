# Urban Rec Website Redesign

A modern full-stack redesign of [urbanrec.ca](https://urbanrec.ca) – Vancouver's recreational sports league platform.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Payload CMS](https://img.shields.io/badge/Payload-v3-purple)

## 🔗 Live Demo

**[View Live Site](https://urban-rec-redesign.vercel.app/)**

## Features

- **Full Authentication System** – Sign up, sign in, and protected routes with session-based auth via Payload CMS
- **Dynamic League Registration** – Browse leagues with real-time filters, register teams with 5-15 players, captain management
- **Admin Dashboard** – Create, edit, and delete leagues with dropdowns for sports, locations, and skill levels
- **Responsive Design** – Mobile-first approach with desktop table views, sticky headers, and optimized touch targets
- **Smooth Animations** – Scroll-triggered reveals, touch carousels, and micro-interactions powered by Framer Motion

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | App Router, Server Components, API Routes |
| **Payload CMS v3** | Headless CMS, Auth, MongoDB adapter |
| **TypeScript** | Type safety across frontend and backend |
| **Tailwind CSS v4** | Utility-first styling with CSS variables |
| **Framer Motion** | Animations and gesture handling |
| **MongoDB Atlas** | Cloud database |

## Project Structure

```
├── app/
│   ├── admin/              # Custom admin panel
│   ├── api/[...payload]/   # Payload REST API
│   ├── dashboard/          # User dashboard (protected)
│   ├── register/           # League listing + team registration
│   ├── sign-in/            # Authentication
│   └── sign-up/
├── components/             # Reusable UI components
├── payload/
│   ├── collections/        # Users, Sports, Locations, Leagues, Teams
│   └── seed/               # Database seed data
└── public/                 # Static assets
```

## Design Decisions

### Why Custom Admin vs Payload Admin?
Built a custom `/admin` page for a streamlined league management experience. Simple credential auth, dropdown selects for relationships, and a focused UI—no Payload admin complexity.

### Why Session Storage for Admin?
Admin auth uses `sessionStorage` with hardcoded credentials for simplicity. The main user auth flows through Payload's built-in system with HTTP-only cookies.

### Why CSS Grid for Tables?
League listings use CSS Grid (`grid-cols-12`) instead of `<table>` elements for consistent column alignment across grouped sections with sticky headers.

### Why Mobile-First?
80%+ of recreational sports signups happen on mobile. Every component is built for 375px first, then enhanced for desktop with responsive breakpoints.

### Color System
Three brand colors for strong visual identity:
- `#c3343e` – Urban Red (CTAs, accents)
- `#262624` – Dark (headers, text)
- `#f3f3f3` – Light (backgrounds)

## Getting Started

```bash
# Install
yarn install

# Environment setup
cp .env.example .env.local

# Required variables:
# MONGODB_URI=mongodb+srv://...
# PAYLOAD_SECRET=your-secret
# NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Seed database
curl -X POST "http://localhost:3000/api/seed?secret=YOUR_PAYLOAD_SECRET"

# Run dev server
yarn dev
```

**URLs:**
- Site: [localhost:3000](http://localhost:3000)
- Admin: [localhost:3000/admin](http://localhost:3000/admin) (username: `user`, password: `password`)
