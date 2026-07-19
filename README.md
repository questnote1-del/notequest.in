# NoteQuest

Educational blog teaching programming, computer science, and technology — built for SEO, Core Web Vitals, and AdSense readiness.

**Domain:** [notequest.in](https://notequest.in)  
**Tagline:** Learn Programming, Computer Science & Technology with Practical Guides.

## Tech Stack

- Next.js 15 (App Router)
- JavaScript (no TypeScript)
- Tailwind CSS v4
- MDX articles with `next-mdx-remote`
- Static generation for articles, categories, and tags

## Getting Started

Requires **Node.js 20+**.

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## SEO & Indexing

Already included:

- `/robots.txt` — crawl rules + sitemap pointer
- `/sitemap.xml` — articles, categories, tags, authors, legal pages
- `/rss.xml` — RSS feed
- Unique titles, meta descriptions, canonical URLs
- Open Graph + Twitter cards
- Schema.org: Organization, WebSite, Article, Breadcrumb, Author, FAQ

After deploy to **notequest.in**:

1. Google Search Console → Add property → Submit `https://notequest.in/sitemap.xml`
2. Request indexing for the homepage
3. Keep publishing original articles regularly

## AdSense Setup

Legal pages and ad placeholders are ready. To go live:

1. Apply at [Google AdSense](https://www.google.com/adsense/) with domain `notequest.in`
2. After approval, edit `public/ads.txt` with your publisher ID:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. Edit `src/data/adsense.js`:
   ```js
   export const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";
   export const ADSENSE_ENABLED = true;
   ```
4. Replace `AdPlaceholder` components with real AdSense `<ins>` units

Contact email: **questnote1@gmail.com**

## Content

Articles live in `content/articles/*.mdx`.

```bash
npm run generate:articles
```

## Project Structure

```
content/articles/     # MDX posts (50+)
src/app/              # App Router pages
src/components/       # UI components
src/data/             # Site, categories, authors, adsense
src/lib/              # Articles loader, SEO, utils
public/               # logo, favicon, ads.txt, images
```

## License

All rights reserved © NoteQuest.
# notequest.in
