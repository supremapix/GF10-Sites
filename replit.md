# Suprema Sites Curitiba

## Overview
A professional landing page website for a web design agency in Curitiba, Brazil. Built with React, TypeScript, Vite, and Tailwind CSS. Features comprehensive SEO optimization for all location pages.

## Project Structure
- `/` - Root contains main entry files (App.tsx, index.tsx, index.html)
- `/components/` - React components for each section of the site
  - EnhancedSEO.tsx - Advanced SEO component with full meta tags, structured data
  - HomePage.tsx - Main landing page with SEO
  - LocationPage.tsx - Dynamic location-based pages (bairros/cities)
  - Sitemap.tsx - Site map page with all locations
  - Hero, About, Services, Benefits, Portfolio, Testimonials, etc.
- `/public/` - Static files (robots.txt, _redirects, sitemap.xml)
- `/scripts/` - Build scripts (generate-sitemap.ts)

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS (via CDN)
- **Animation**: Framer Motion
- **Routing**: React Router DOM v6
- **SEO**: React Helmet Async + EnhancedSEO component

## Development
- **Port**: 5000
- **Dev Command**: `npm run dev`
- **Build Command**: `npm run build` (includes sitemap generation)

## Routes
- `/` - Home page with full SEO
- `/sitemap` - Site map with all locations
- `/bairro/:name` - Neighborhood pages (100+ bairros)
- `/cidade/:name` - City pages (29 cities in RMC)

## SEO Features
- Google site verification meta tag
- EnhancedSEO component with:
  - Complete meta tags (robots, author, geo)
  - Open Graph tags (og:title, og:description, og:image, etc.)
  - Twitter Cards
  - Structured Data (LocalBusiness, Service, BreadcrumbList, FAQ schemas)
  - Individual canonical URLs per page
- Auto-generated sitemap.xml with all location URLs
- robots.txt configured for search engines
- _redirects for SPA routing on static hosts

## Deployment
- Static deployment configured
- Build outputs to `/dist` folder
- Includes: sitemap.xml, robots.txt, _redirects

## Recent Changes
- 2025-12-15: Added comprehensive SEO optimization
  - Google site verification meta tag
  - EnhancedSEO component with structured data
  - Sitemap.xml generator script
  - Pre-rendering configuration
  - SPA routing with _redirects
