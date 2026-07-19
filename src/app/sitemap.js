import { siteConfig } from "@/data/site";
import { categories, parentCategories } from "@/data/categories";
import { authors } from "@/data/authors";
import { getAllArticles, getAllTags } from "@/lib/articles";

export default function sitemap() {
  const base = siteConfig.url;
  const now = new Date().toISOString();
  const seen = new Set();

  function add(path, options = {}) {
    const url = path === "/" || path === "" ? `${base}/` : `${base}${path}`;
    if (seen.has(url)) return null;
    seen.add(url);
    return {
      url,
      lastModified: options.lastModified || now,
      changeFrequency: options.changeFrequency || "weekly",
      priority: options.priority ?? 0.7,
    };
  }

  const entries = [
    add("/", { changeFrequency: "daily", priority: 1 }),
    add("/articles", { priority: 0.9 }),
    add("/categories", { priority: 0.85 }),
    add("/about", { priority: 0.7 }),
    add("/contact", { priority: 0.7 }),
    add("/privacy-policy", { priority: 0.5 }),
    add("/disclaimer", { priority: 0.5 }),
    add("/terms", { priority: 0.5 }),
    add("/cookie-policy", { priority: 0.5 }),
    add("/editorial-policy", { priority: 0.5 }),
    ...parentCategories.map((c) =>
      add(`/${c.slug}`, { priority: 0.8 })
    ),
    ...categories.map((c) =>
      add(`/category/${c.slug}`, { priority: 0.75 })
    ),
    ...getAllArticles().map((article) =>
      add(`/articles/${article.slug}`, {
        lastModified: article.updatedAt || article.publishedAt,
        changeFrequency: "monthly",
        priority: article.featured ? 0.9 : 0.8,
      })
    ),
    ...getAllTags().map((tag) =>
      add(`/tag/${tag.slug}`, { priority: 0.6 })
    ),
    ...authors.map((author) =>
      add(`/author/${author.slug}`, {
        changeFrequency: "monthly",
        priority: 0.65,
      })
    ),
  ].filter(Boolean);

  return entries;
}
