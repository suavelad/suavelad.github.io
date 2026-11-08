# Sunday Ajayi — Portfolio

React + Vite + TypeScript + Tailwind CSS. Static site for GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Edit content

All text lives in **`src/data/site.ts`**: profile, links, experience, projects,
research, publications, education, community and volunteering. Pages read from it.

- Add a publication: append to `publications` (status: Published / Accepted / Under review / Preprint / In progress).
- Profile photo: put it in `public/images/` and set `profile.photo`.
- CV: put the PDF at `public/documents/sunday-ajayi-cv.pdf`.

## Pages

| Route | Content |
|---|---|
| `/` | Hero, experience, products, research & publications, projects, certifications & awards, community & mentorship |
| `/professional` | Career timeline, products, projects, skills |
| `/research` | Statement, current work, interests, publications |
| `/publications` | Full publication list + Scholar / ORCID |
| `/education` | Degrees, certifications, awards |
| `/community` | Leadership, volunteering, ADPList mentorship |
| `/contact` | Email, socials, CV |

Theme: dark by default; the toggle in the header switches to light and the choice is remembered.

## SEO

Page titles and descriptions live in **`src/seo.ts`** (also `SITE_URL` — change it if you add a custom domain).
At build time a small Vite plugin (`vite.config.ts`) writes:

- `dist/<page>/index.html` for every route, each with its own title, description, canonical URL,
  Open Graph / Twitter tags and schema.org JSON-LD (Person + ScholarlyArticle)
- `sitemap.xml`, `robots.txt` and a `404.html` SPA fallback

The social preview image is `public/og-image.jpg` (1200×630).

After the first deploy, submit `https://suavelad.github.io/sitemap.xml` in Google Search Console.

## Deploy to GitHub Pages

1. Create a repo named `<your-username>.github.io` and push this folder to `main`.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`.

If you use a different repo name (e.g. `portfolio`), set `base: '/portfolio/'` in `vite.config.ts`.
