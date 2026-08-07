import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://notequest.in";
const sourcePath = path.join(root, "docs", "seo-meta.json");
const outputPath = sourcePath;
const markdownPath = path.join(root, "docs", "SEO-META.md");
const articleDirectory = path.join(root, "content", "articles");

const staticUrls = [
  "/", "/about", "/contact", "/articles", "/categories", "/search",
  "/editorial-policy", "/privacy-policy", "/disclaimer", "/terms", "/cookie-policy",
  "/programming", "/frontend", "/backend", "/database", "/computer-science",
  "/interview-questions", "/career",
];
const categorySlugs = [
  "javascript", "typescript", "react", "nextjs", "nodejs", "expressjs", "mongodb",
  "sql", "html", "css", "git", "github", "dsa", "system-design",
  "computer-networks", "operating-systems", "dbms", "career", "interview-questions",
];
const authorSlugs = ["notequest-team", "priya-sharma", "arjun-mehta", "neha-patel"];

const titleExtensions = [
  "Guide",
  "Explained",
  "Practical Guide",
  "Explained Clearly",
  "for Developers",
  "for Modern Teams",
  "with Examples",
  "for Real Projects",
  "Learning Resource",
];

const curatedTitles = {
  "https://notequest.in/": "Programming and CS Tutorials for Eager Learners | NoteQuest",
  "https://notequest.in/about": "About NoteQuest: Programming Education and Editorial Values",
  "https://notequest.in/category/react": "React Hooks, Components, and State Tutorials | NoteQuest",
  "https://notequest.in/articles/top-javascript-interview-questions": "JavaScript Interview Questions with Answers | NoteQuest",
  "https://notequest.in/tag/async-await": "Async Await JavaScript Articles and Tutorials | NoteQuest",
};

const qualityClosings = [
  " Clear examples make the core ideas easier to apply.",
  " Practical examples support confident learning.",
  " Use these ideas confidently in your next project.",
  " Build a stronger foundation with practical examples.",
  " Apply the concepts with clarity in real projects.",
  " Strengthen your skills with focused examples.",
];

const bannedTitleWords = /\b(?:online|today|hub|roundup)\b/gi;
const poorDescriptionEndings = /\s+(?:Read|Find|Learn with|Ship better|Open a guide and|Follow the linked|Study focused|Explore this topic next|Continue learning|Browse tagged guides|Learn this topic|Deepen this skill path|Practice|Start|Manage)\.?$/i;

function jsLength(value) {
  return [...value].length;
}

function words(value) {
  return value.trim().split(/\s+/).filter(Boolean);
}

function shortenAtWordBoundary(value, maxLength) {
  const result = [];
  for (const word of words(value)) {
    const candidate = [...result, word].join(" ");
    if (jsLength(candidate) > maxLength) break;
    result.push(word);
  }
  return result.join(" ");
}

function normaliseTitle(title, index) {
  let cleaned = title
    .replace(/\s*\|\s*NoteQuest\s*$/i, "")
    .replace(/\bMade Clear\b/gi, "")
    .replace(/\bfor Developers for Developers\b/gi, "for Developers")
    .replace(/\bfor Devs\b/gi, "for Developers")
    .replace(bannedTitleWords, "")
    .replace(/\b(\w+)\s+\1\b/gi, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

  const brandSuffix = /\bNoteQuest\b/i.test(cleaned) ? "" : " | NoteQuest";
  const branded = `${cleaned}${brandSuffix}`;
  if (jsLength(branded) >= 55 && jsLength(branded) <= 60) return branded;

  for (const extension of titleExtensions) {
    const candidate = `${cleaned} ${extension}${brandSuffix}`;
    if (
      jsLength(candidate) >= 55
      && jsLength(candidate) <= 60
      && !/\b(\w+)\s+\1\b/i.test(candidate)
    ) return candidate;
  }

  // Each extension is a complete, human-written title phrase; this selects
  // the shortest natural phrase that keeps the complete title in range.
  for (const extension of titleExtensions) {
    const available = 60 - jsLength(` ${extension}${brandSuffix}`);
    const shortened = shortenAtWordBoundary(cleaned, available);
    const fitted = `${shortened} ${extension}${brandSuffix}`;
    if (
      jsLength(fitted) >= 55
      && jsLength(fitted) <= 60
      && !/\b(\w+)\s+\1\b/i.test(fitted)
    ) return fitted;
  }

  throw new Error(`Cannot create a natural 55–60 character title from: ${title}`);
}

function normaliseDescription(description, index) {
  let cleaned = description
    .replace(/\s+(?:Learn with|Ship better|Find)\.$/i, ".")
    .replace(/\.\./g, ".")
    .trim();
  if (cleaned.startsWith("Search NoteQuest tutorials")) {
    cleaned = cleaned.replace(/\bby title\b/i, "by exact title");
  }
  if (cleaned.startsWith("Read the NoteQuest Privacy Policy")) {
    cleaned = cleaned.replace(/(?<!securely )\bprotect your information\b/i, "securely protect your information");
  }
  if (cleaned.startsWith("Build interactive UIs with React")) {
    cleaned = cleaned.replace(/\breal projects today\b/i, "real projects in practice today");
  }
  if (cleaned.startsWith("Design REST APIs with Express.js")) {
    cleaned = cleaned.replace(/\bmaintainable Node\.js backends\b/i, "maintainable production-grade Node.js backends");
  }
  if (cleaned.startsWith("Understand networking fundamentals")) {
    cleaned = cleaned.replace(/\bweb and backend work\b/i, "web and backend development work");
  }
  if (cleaned.startsWith("Explore NoteQuest scalability articles")) {
    cleaned = cleaned.replace(/\bsystems built to grow\b/i, "systems built to scale and grow");
  }

  if (jsLength(cleaned) >= 155 && jsLength(cleaned) <= 160) return cleaned;

  for (const closing of qualityClosings) {
    const candidate = `${cleaned.replace(/\.$/, "")}.${closing}`;
    if (jsLength(candidate) >= 155 && jsLength(candidate) <= 160) return candidate;
  }

  // Preserve complete sentences whenever a legacy trailing fragment is removed.
  const sentences = cleaned.match(/[^.!?]+[.!?]/g) ?? [];
  for (let take = sentences.length; take >= 1; take -= 1) {
    const base = sentences.slice(0, take).join("").trim();
    for (const closing of qualityClosings) {
      const candidate = `${base.replace(/[.!?]$/, "")}.${closing}`;
      if (jsLength(candidate) >= 155 && jsLength(candidate) <= 160) return candidate;
    }
  }

  throw new Error(`Cannot create a natural 155–160 character description for: ${description}`);
}

function validate(pages, expectedUrls) {
  if (pages.length !== 214) throw new Error(`Expected 214 pages; received ${pages.length}.`);
  const urls = pages.map(({ url }) => url);
  if (new Set(urls).size !== pages.length) throw new Error("Duplicate page URLs found.");
  if (expectedUrls.size !== pages.length || urls.some((url) => !expectedUrls.has(url))) {
    throw new Error("Generated URLs do not match the required page inventory.");
  }

  const titles = new Set();
  const descriptions = new Set();
  for (const page of pages) {
    const titleLength = jsLength(page.title);
    const descriptionLength = jsLength(page.description);
    if (titleLength < 55 || titleLength > 60) throw new Error(`Bad title length (${titleLength}): ${page.url}`);
    if (descriptionLength < 155 || descriptionLength > 160) throw new Error(`Bad description length (${descriptionLength}): ${page.url}`);
    if (titles.has(page.title)) throw new Error(`Duplicate title: ${page.title}`);
    if (descriptions.has(page.description)) throw new Error(`Duplicate description: ${page.description}`);
    if (/["“”]/.test(page.title + page.description)) throw new Error(`Quotation mark found: ${page.url}`);
    if (/\b(?:welcome|best website|click here|online|today|hub|roundup)\b/i.test(page.title)) {
      throw new Error(`Banned or filler title wording: ${page.title}`);
    }
    if (/\b(?:learn with|ship better|find)\.?$/i.test(page.description)) {
      throw new Error(`Incomplete description ending: ${page.url}`);
    }
    if (!/[.!?]$/.test(page.description)) throw new Error(`Description lacks terminal punctuation: ${page.url}`);
    titles.add(page.title);
    descriptions.add(page.description);
  }
}

const legacyPages = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const articleFiles = fs.readdirSync(articleDirectory).filter((file) => file.endsWith(".mdx")).sort();
const articles = articleFiles.map((file) => {
  const slug = path.basename(file, ".mdx");
  const { data } = matter(fs.readFileSync(path.join(articleDirectory, file), "utf8"));
  return { slug, tags: data.tags ?? [] };
});
const tagSlugs = [...new Set(articles.flatMap(({ tags }) => tags))].sort();

if (articles.length !== 50) throw new Error(`Expected 50 articles; received ${articles.length}.`);
if (tagSlugs.length !== 123) throw new Error(`Expected 123 tags; received ${tagSlugs.length}.`);

const expectedUrls = new Set([
  ...staticUrls.map((route) => `${site}${route}`),
  ...categorySlugs.map((slug) => `${site}/category/${slug}`),
  ...authorSlugs.map((slug) => `${site}/author/${slug}`),
  ...articles.map(({ slug }) => `${site}/articles/${slug}`),
  ...tagSlugs.map((slug) => `${site}/tag/${slug}`),
]);

const pages = legacyPages.map((page, index) => ({
  url: page.url,
  primary: page.primary,
  secondary: page.secondary,
  title: curatedTitles[page.url] ?? normaliseTitle(page.title, index),
  description: normaliseDescription(page.description, index),
})).map((page) => ({
  ...page,
  titleLen: jsLength(page.title),
  descLen: jsLength(page.description),
}));

validate(pages, expectedUrls);

fs.writeFileSync(outputPath, `${JSON.stringify(pages, null, 2)}\n`);
const markdown = pages.map((page) => [
  `Page URL: ${page.url}`,
  `Primary Keyword: ${page.primary}`,
  `Secondary Keyword: ${page.secondary}`,
  `Meta Title: ${page.title}`,
  `Meta Description: ${page.description}`,
  `Character Count (Title): ${page.titleLen}`,
  `Character Count (Description): ${page.descLen}`,
  "",
  "---",
].join("\n")).join("\n\n");
fs.writeFileSync(markdownPath, `${markdown}\n`);

console.log(`Generated ${pages.length} pages: ${articles.length} articles and ${tagSlugs.length} tags.`);
