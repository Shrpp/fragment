# Fragment — Personal Portfolio

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-white?style=flat-square)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black?style=flat-square&logo=vercel)

Personal portfolio with a Tron × Marathon visual aesthetic. Live GitHub repo stats, Medium blog feed, and a contact form — all without a backend.

---

## Stack

- **Framework** — React 18 + Vite 5
- **Styling** — Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`)
- **Fonts** — Syne + JetBrains Mono via Fontsource (self-hosted, zero Google tracking)
- **Package manager** — pnpm

## Features

- Cursor-reactive multi-layer parallax in the hero section
- Custom HUD crosshair cursor with particle trail
- JS glitch + CSS flicker/VHS animations
- Live GitHub repos sorted by stars via GitHub REST API
- Live Medium posts via RSS2JSON
- Contact form via Formspree with honeypot spam protection
- Security headers via `vercel.json` (CSP, X-Frame-Options, Referrer-Policy)
- Self-hosted fonts — no Google Fonts requests

## Getting Started

```bash
pnpm install
pnpm dev
```

## Customization

All hardcoded content lives in `const` blocks at the top of each component.

### Identity — `src/components/Hero.jsx`

```js
const NAME_LINE1 = 'YOUR FIRST NAME'
const NAME_LINE2 = 'YOUR LAST NAME'
const TAG_LINE   = 'Your role — Your city'
const ROLE_LINE  = 'Skill · Skill · Skill'
const BIO        = 'Your bio here.'
```

### GitHub repos — `src/components/Projects.jsx`

```js
const GITHUB_USERNAME = 'your-github-handle'
```

Fetches your top 6 public repos sorted by stars. Falls back to mock data if the API is unreachable.

### Medium posts — `src/components/Blog.jsx` and `src/components/Stats.jsx`

```js
const MEDIUM_USERNAME = '@your-medium-handle'
```

Set the same handle in both files. Falls back to mock posts if the feed is unavailable.

### Contact form — `src/components/Contact.jsx`

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ID'
```

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and paste your endpoint URL above

### About section — `src/components/About.jsx`

Update `BIO`, `LINKS`, and `STACK` arrays with your real info. Age is computed automatically from `BIRTH_YEAR`, `BIRTH_MONTH`, and `BIRTH_DAY`.

### Experience counter — `src/components/Stats.jsx`

```js
const CAREER_START = new Date('YYYY-MM-DD')
```

Years of experience are calculated automatically from this date.

### Photo — `HUDPhoto` component

Drop your photo at `/public/photo.jpg`. The component shows a placeholder automatically if the file is missing.

## Project Structure

```
src/
├── components/
│   ├── Cursor.jsx       ← HUD crosshair cursor + particle trail
│   ├── Nav.jsx          ← Fixed nav with live clock
│   ├── Hero.jsx         ← Parallax + glitch name animation
│   ├── Stats.jsx        ← Live counters (GitHub + Medium + career)
│   ├── Projects.jsx     ← GitHub repos sorted by stars
│   ├── Blog.jsx         ← Medium posts via RSS
│   ├── About.jsx        ← Bio, links, HUD photo, skill grid
│   ├── Contact.jsx      ← Formspree contact form
│   ├── HUDPhoto.jsx     ← Marathon-style framed photo
│   └── Footer.jsx
├── hooks/
│   └── index.js         ← useClock, useGitHubRepos, useGitHubStats, useMediumPosts
├── App.jsx
├── main.jsx
└── index.css            ← Tailwind theme + keyframes + utilities
```

## Design Tokens

Defined in `src/index.css` under `@theme {}`:

| Token | Value | Use |
|---|---|---|
| `--color-neon` | `#FFFFFF` | Primary accent |
| `--color-bg` | `#07080C` | Base background |
| `--color-surface` | `#0B0D13` | Elevated surfaces |
| `--color-text` | `#D8DCE8` | Primary text |
| `--color-muted` | `#4A5068` | Secondary text |
| `--font-sans` | Syne | Headings / UI |
| `--font-mono` | JetBrains Mono | Code / metadata |

## Deploy

```bash
pnpm build   # outputs to /dist
```

Deploy `/dist` to Vercel using the **Vite** preset. The `vercel.json` at the root applies security headers automatically — no dashboard configuration needed.

| Vercel setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |
| Node.js Version | 20.x |

## License

MIT
