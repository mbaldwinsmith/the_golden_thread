# The Golden Thread

A garden of thirteen poems by Mark Oriel. An interactive React site with a scroll-driven golden thread connecting each poem node.

**Live site:** https://mbaldwinsmith.github.io/the_golden_thread/

---

## Deploy to GitHub Pages

Follow these steps once to enable automatic deployment on every push to `main`.

### 1. Enable GitHub Pages in the repository settings

1. Go to your repository on GitHub: `https://github.com/mbaldwinsmith/the_golden_thread`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

That's it. The workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) handles the rest.

### 2. Push this code

```bash
git add .
git commit -m "Add React site with GitHub Pages deployment"
git push
```

The Actions workflow will run automatically. After ~1–2 minutes the site will be live at:

```
https://mbaldwinsmith.github.io/the_golden_thread/
```

You can watch the deployment progress under the **Actions** tab in the repository.

---

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173/the_golden_thread/`.

---

## Project structure

```
src/
  main.jsx              # React entry point
  App.jsx               # Top-level layout (compass bar, colophon)
  styles.css            # All visual styles
  data/poems.js         # Poem text, images, palette, positions
  components/
    Garden.jsx          # Main canvas: scroll animation, thread, nodes, reader
    Motif.jsx           # SVG vignette illustrations for each poem
project/
  images/               # Poem images (served as public assets)
  index.html            # Original design prototype (reference only)
```

Images in `project/images/` are served directly as static assets by Vite (via `publicDir: 'project'`).
