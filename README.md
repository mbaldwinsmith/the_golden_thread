# The Golden Thread

*A garden of thirteen poems by Mark Oriel.*

An interactive React site where a scroll-driven golden thread connects thirteen poem nodes across a living canvas. Click any node to read the poem in a full-screen reader panel.

**Live site:** https://mbaldwinsmith.github.io/the_golden_thread/

---

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`. The dev server hot-reloads on save.

---

## How it works

Scroll down through the garden SVG canvas. As each poem node enters the viewport it fades in, and the golden thread draws itself toward it. Click a node to open the reader. Navigate between poems with the ← → buttons or arrow keys; close with Escape.

---

## Project structure

```
src/
  main.jsx              # React entry point
  App.jsx               # Compass bar + colophon overlay
  styles.css            # All visual styles
  data/poems.js         # Poem text, palette, and canvas positions
  components/
    Garden.jsx          # Scroll animation, thread, nodes, reader panel
    Motif.jsx           # SVG vignette illustrations (one per poem)
project/
  images/               # Poem images (served as static assets)
```

---

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml). No manual steps needed after the initial setup:

1. **Settings → Pages → Source: GitHub Actions** (one-time)
2. Merge to `main` — the rest is automatic
