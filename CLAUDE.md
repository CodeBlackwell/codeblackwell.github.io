# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A customizable portfolio website built on React (Create React App). Based on [masterPortfolio](https://github.com/ashutosh1919/masterPortfolio). Features multiple color themes, GitHub data integration, and a splash screen animation.

## Common Commands

```bash
npm install                 # Install dependencies
npm start                   # Start dev server (uses --openssl-legacy-provider)
npm run build               # Build for production
npm run deploy              # Build and deploy to gh-pages branch
npm test                    # Run tests
node git_data_fetcher.mjs   # Fetch GitHub data (PRs, issues, orgs, pinned repos)
```

## Architecture

### Configuration-Driven Content

All portfolio content is configured in `src/portfolio.js`:

- `settings.isSplash` - Toggle splash screen on/off
- `greeting`, `socialMediaLinks` - Home page content
- `skills` - Skills sections with icons (uses Iconify classes)
- `degrees`, `certifications` - Education page
- `experience` - Work, internships, volunteerships
- `contactPageData` - Contact page content
- `contactPageData.blogSection.posts` - Blog post cards with title, url, and image

### Theming System

- Themes defined in `src/theme.js` (14 themes: blue, brown, purple, green, red, black, pink, violet, teal, orange, yellow, materialDark, materialLight, materialTeal)
- Default theme: `blueTheme` (light) / `materialDarkTheme` (dark)
- Dark mode toggle persists to localStorage
- ThemeProvider wraps the app in `src/App.js`

### App-Level Components (src/App.js)

- **ThemeToggle** (`src/components/themeToggle/`) - Dark/light mode toggle, top-right position
- **MusicPlayer** (`src/components/musicPlayer/`) - Background music player, bottom-left position

### Music Player

Located in `src/components/musicPlayer/`:

- Uses SoundCloud Widget API for embedded playback
- Hidden iframe positioned off-screen (not 0x0 to avoid canvas errors)
- Glassmorphism button style matching ThemeToggle
- Features: autoplay, localStorage persistence, "Click to enable audio" prompt
- SoundCloud API script loaded in `public/index.html`

### Routing

`src/containers/Main.js` defines all routes using React Router v5:

- `/` - Splash or Home (based on `settings.isSplash`)
- `/home`, `/experience`, `/education`, `/opensource`, `/contact`, `/projects`

### GitHub Data Integration

1. Create `.env` from `env.example` with `GITHUB_TOKEN` and `GITHUB_USERNAME`
2. Run `node git_data_fetcher.mjs` to fetch data
3. Data saved to `src/shared/opensource/` as JSON files (pull_requests.json, issues.json, organizations.json, projects.json)

### Directory Structure

```
src/
├── App.js              # Root component with theme provider, toggle, music player
├── portfolio.js        # All content configuration
├── theme.js            # Theme definitions
├── global.js           # Global styled-components styles
├── pages/              # Page components (home, education, experience, etc.)
├── containers/         # Section containers (greeting, skills, certifications, etc.)
│   └── Main.js         # React Router configuration
├── components/         # Reusable UI components
│   ├── themeToggle/    # Dark/light mode toggle
│   ├── musicPlayer/    # Background music player (SoundCloud)
│   ├── blogCard/       # Blog post cards for contact page
│   └── ...             # Other components (cards, buttons, charts)
└── shared/opensource/  # Fetched GitHub data (JSON)

public/
├── index.html          # HTML template with external scripts
├── skills/             # Custom skill icons
└── icons/              # Favicon and app icons
```

### Icons

- Software skills use Iconify class names (e.g., `simple-icons:react`, `logos-python`)
- Browse icons at https://icon-sets.iconify.design/
- Custom images can be placed in `public/skills/` and referenced via `imageSrc`

### Deployment

GitHub Pages deployment to `<username>.github.io`:

- **GitHub Pages serves from `docs/` folder on `master` branch**
- Build outputs to `build/`, then copied to `docs/` for deployment
- Use `just deploy` to build, copy to docs/, and push to master
