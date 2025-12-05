# Stranger Things Neon Portfolio

A fully interactive, Stranger Things–inspired portfolio for **Suman** (AI / ML Engineer). Built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and a subtle **react-three-fiber** Upside Down particle scene.

## Getting Started

```powershell
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`).

For a production build:

```powershell
npm run build
npm run preview
```

## Customize Content
- Update profile copy, experiences, skills, projects, and certifications in `src/data/content.js`.
- Drop your portrait image at `public/media/suman-portrait.jpg` (or update the `heroContent.portraitUrl` in `src/data/content.js` to match your preferred path) for the About section card.
- Adjust neon palette, fonts, and utilities via `tailwind.config.cjs` + `src/index.css`.

## Features
- Sticky neon navbar with smooth-scroll anchors and **Upside Down** theme toggle.
- Cinematic hero with glitch/flicker typography plus 3D floating spores.
- Scroll-triggered motion across About, Experience timeline, Skills matrix, Projects grid, Certifications, and Contact form.
- Glassmorphism UI building blocks (`glass-panel`, `neon-button`, terminal blocks) and global film-grain/vignette overlays.
