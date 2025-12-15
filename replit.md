# Suprema Sites Curitiba

## Overview
A professional landing page website for a web design agency in Curitiba, Brazil. Built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure
- `/` - Root contains main entry files (App.tsx, index.tsx, index.html)
- `/components/` - React components for each section of the site
  - Hero, About, Services, Benefits, Portfolio, Testimonials, etc.
  - LocationPage.tsx - Dynamic location-based pages
  - Sitemap.tsx - Site map page

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS (via CDN)
- **Animation**: Framer Motion
- **Routing**: React Router DOM v6
- **SEO**: React Helmet Async

## Development
- **Port**: 5000
- **Dev Command**: `npm run dev`
- **Build Command**: `npm run build`

## Routes
- `/` - Home page
- `/sitemap` - Site map
- `/bairro/:name` - Neighborhood pages
- `/cidade/:name` - City pages

## Recent Changes
- 2025-12-15: Imported from GitHub, configured for Replit environment
  - Fixed React version conflicts (React 18)
  - Updated Vite config for Replit proxy compatibility
  - Set up development workflow and deployment config
