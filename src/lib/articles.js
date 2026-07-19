import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { ARTICLES_PER_PAGE } from "@/data/site";
import { getAuthorBySlug, getDefaultAuthor } from "@/data/authors";
import { getCategoryBySlug } from "@/data/categories";
import { extractHeadings, paginate, countWords } from "@/lib/utils";

const articlesDirectory = path.join(process.cwd(), "content/articles");

function ensureArticlesDir() {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
  }
}

export function getArticleSlugs() {
  ensureArticlesDir();
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getArticleBySlug(slug) {
  ensureArticlesDir();
  const mdxPath = path.join(articlesDirectory, `${slug}.mdx`);
  const mdPath = path.join(articlesDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const author = getAuthorBySlug(data.author) || getDefaultAuthor();
  const category = getCategoryBySlug(data.category);

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    categoryName: category?.name || data.category,
    tags: data.tags || [],
    author: data.author || author.slug,
    authorData: author,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt || data.publishedAt,
    featured: Boolean(data.featured),
    popular: Boolean(data.popular),
    draft: Boolean(data.draft),
    coverImage: data.coverImage || "/images/og-default.png",
    faqs: data.faqs || [],
    references: data.references || [],
    content,
    readingTime: stats.text,
    wordCount: countWords(content),
    headings: extractHeadings(content),
  };
}

export function getAllArticles({ includeDrafts = false } = {}) {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .filter((article) => includeDrafts || !article.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return articles;
}

export function getArticlesByCategory(categorySlug) {
  return getAllArticles().filter(
    (article) => article.category === categorySlug
  );
}

export function getArticlesByTag(tag) {
  const normalized = tag.toLowerCase();
  return getAllArticles().filter((article) =>
    article.tags.some((t) => t.toLowerCase() === normalized)
  );
}

export function getArticlesByAuthor(authorSlug) {
  return getAllArticles().filter((article) => article.author === authorSlug);
}

export function getFeaturedArticles(limit = 4) {
  const featured = getAllArticles().filter((a) => a.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return getAllArticles().slice(0, limit);
}

export function getPopularArticles(limit = 6) {
  const popular = getAllArticles().filter((a) => a.popular);
  if (popular.length >= limit) return popular.slice(0, limit);
  return getAllArticles().slice(0, limit);
}

export function getLatestArticles(limit = 6) {
  return getAllArticles().slice(0, limit);
}

export function getRelatedArticles(article, limit = 4) {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);
  const scored = all.map((a) => {
    let score = 0;
    if (a.category === article.category) score += 3;
    const sharedTags = a.tags.filter((t) =>
      article.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())
    );
    score += sharedTags.length;
    return { article: a, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

export function getAllTags() {
  const tagMap = new Map();
  getAllArticles().forEach((article) => {
    article.tags.forEach((tag) => {
      const key = tag.toLowerCase();
      if (!tagMap.has(key)) {
        tagMap.set(key, { name: tag, slug: key, count: 0 });
      }
      tagMap.get(key).count += 1;
    });
  });
  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
}

export function searchArticles(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  return getAllArticles().filter((article) => {
    const haystack = [
      article.title,
      article.description,
      article.categoryName,
      ...(article.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getPaginatedArticles(page = 1, perPage = ARTICLES_PER_PAGE) {
  return paginate(getAllArticles(), page, perPage);
}

export function getPaginatedByCategory(
  categorySlug,
  page = 1,
  perPage = ARTICLES_PER_PAGE
) {
  return paginate(getArticlesByCategory(categorySlug), page, perPage);
}

export function getPaginatedByTag(tag, page = 1, perPage = ARTICLES_PER_PAGE) {
  return paginate(getArticlesByTag(tag), page, perPage);
}
