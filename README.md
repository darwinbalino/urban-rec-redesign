# Urban Rec Website Redesign

A modern, mobile-first redesign concept for [urbanrec.ca](https://urbanrec.ca) – Vancouver's premier recreational sports league.

## 🔗 Live Demo

**[View Live Site](https://urban-rec-redesign.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff69b4)

## Overview

This project is a frontend redesign concept demonstrating modern web development practices. The site is built mobile-first, featuring smooth animations, clean UI, and optimized performance.

## Pages

### Home Page (`/`)
Landing page showcasing Urban Rec's sports leagues with hero carousel, about section, registration CTAs, and testimonials.

### Register League Page (`/register`)
Team registration page with filterable league listings. Features real data scraped from urbanrec.ca including sports, locations, dates, times, and pricing.

## Features

- **Floating Header** – Hides on scroll down, reveals on scroll up
- **Full-Page Mobile Menu** – Immersive navigation with animated transitions
- **Touch-Enabled Carousels** – Swipe gestures for hero and testimonial sections
- **Scroll Animations** – Content reveals as you scroll down the page
- **Responsive Design** – Optimized for mobile (375px+) and scales up for larger screens
- **Filterable League Listings** – Filter by sport, location, day, and skill level
- **Real-Time Filter Updates** – Instant results as filters change

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with static site generation |
| TypeScript | Type safety and better developer experience |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| Framer Motion | Declarative animations and gestures |
| Lucide React | Lightweight icon library |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/urban-rec-redesign.git
cd urban-rec-redesign

# Install dependencies
yarn add next@14 react react-dom framer-motion lucide-react
yarn add -D typescript @types/node @types/react @types/react-dom tailwindcss@latest @tailwindcss/postcss eslint eslint-config-next

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
yarn build
```

Static files will be generated in the `out` directory.

## Project Structure

```
urban-rec/
├── app/
│   ├── register/
│   │   └── page.tsx     # Register league page
│   ├── globals.css      # Global styles & Tailwind config
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Home page
├── components/
│   ├── Header.tsx       # Floating nav & mobile menu
│   ├── HeroCarousel.tsx # Sports image carousel
│   ├── AboutSection.tsx # About Urban Rec content
│   ├── CTASection.tsx   # Call-to-action buttons
│   ├── RegistrationSection.tsx  # Sport dropdown & registration
│   ├── ReasonsSection.tsx       # Top 5 reasons to join
│   ├── TestimonialsCarousel.tsx # Player testimonials
│   └── Footer.tsx       # Site footer
├── docs/
│   └── REGISTER_PAGE_REQUIREMENTS.md  # Register page specs
├── public/              # Images and static assets
├── next.config.mjs      # Next.js configuration
├── postcss.config.mjs   # PostCSS with Tailwind
└── tsconfig.json        # TypeScript configuration
```

## Design Decisions

**Mobile-First Approach** – Built for 375px-428px as the primary viewport, then enhanced for larger screens. Touch targets are minimum 44px for easy tapping.

**Limited Color Palette** – Three core brand colors create strong visual identity:
- `#c3343e` – Urban Rec Red
- `#262624` – Dark Grey
- `#f3f3f3` – Light Grey

**Typography** – Two fonts for clear hierarchy:
- Bebas Neue – Bold headlines
- DM Sans – Readable body text

**Subtle Animations** – Micro-interactions provide feedback without being distracting. Scroll-triggered reveals reduce initial page load.

## Screenshots

*Add screenshots of your build here*

## Author

**Darwin** – Frontend Developer

## License

This is a portfolio/concept project and is not affiliated with Urban Rec.
