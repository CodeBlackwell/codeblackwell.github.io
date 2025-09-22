# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + TypeScript portfolio website built with Vite, featuring React Router for navigation and styled-components for styling. The project uses React Three Fiber for 3D graphics and Framer Motion for animations.

## Common Commands

```bash
# Development
yarn dev          # Start development server with hot reload

# Build & Production
yarn build        # Type check and build for production
yarn preview      # Preview production build locally

# Code Quality
yarn lint         # Run ESLint on .js,.jsx,.ts,.tsx files
yarn format       # Format code with Prettier
```

## Architecture

### Routing Structure
- Main entry: `src/main.tsx` - Sets up React Router with BrowserRouter
- Layout component: `src/App.tsx` - Provides Navbar/Footer wrapper with Outlet for page content
- Pages in `src/pages/`:
  - Home, About, Projects, TechStack, Contact, Resume
  - All routes are defined flat under the root path

### Tech Stack
- **Build**: Vite with React plugin
- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM v7
- **Styling**: styled-components + Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber/Drei
- **Animations**: Framer Motion
- **State Management**: TanStack React Query
- **Package Manager**: Yarn 4.9.2

### Development Notes
- TypeScript configuration split between `tsconfig.app.json` (app code) and `tsconfig.node.json` (build configs)
- ESLint and Prettier configured for code quality
- Component structure follows single-purpose pages pattern with shared Navbar/Footer components