#!/usr/bin/env node
/**
 * Polish SEO meta to remove truncated closers and awkward titles.
 * Input/output: docs/seo-meta.json + docs/SEO-META.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = path.join(root, "docs", "seo-meta.json");
const mdPath = path.join(root, "docs", "SEO-META.md");
const len = (s) => [...s].length;

const SHORT_CLOSINGS = [
  "Keep practicing.",
  "Stay curious.",
  "Code daily.",
  "Try it now.",
  "Learn by doing.",
  "Review often.",
  "Ask better questions.",
  "Ship small improvements.",
  "Read related guides.",
  "Build something small.",
  "Refactor with care.",
  "Measure what matters.",
  "Prefer clear naming.",
  "Document key decisions.",
  "Share what you learn.",
  "Practice with clear examples.",
  "Study with focused examples.",
  "Build skills with each lesson.",
  "Apply ideas in real projects.",
  "Improve with steady practice.",
  "Keep building useful skills.",
  "Grow confidence as you code.",
  "Read on and try the examples.",
  "Use these patterns at work.",
  "Master the basics with care.",
  "Refine your approach over time.",
  "Ship clearer code with practice.",
  "Strengthen fundamentals each day.",
  "Continue learning with purpose.",
  "Explore related guides next.",
  "Follow along with the examples.",
  "Make progress with small steps.",
  "Write cleaner code as you learn.",
  "Level up with deliberate practice.",
  "Stay consistent and keep shipping.",
  "Focus on clarity before clever tricks.",
  "Choose simple solutions that scale.",
  "Review examples until they feel natural.",
  "Compare approaches and pick what fits.",
  "Bookmark this guide for later revision.",
  "Clear examples make ideas easier to apply.",
  "Practical examples support confident learning.",
  "Use these ideas in your next coding project.",
  "Build a stronger foundation with practice.",
  "Apply concepts with clarity in real projects.",
  "Strengthen skills with focused examples.",
  "Keep learning with developer-focused tutorials.",
  "Continue with related NoteQuest topic guides.",
  "Study at your pace with trustworthy explanations.",
  "Improve faster with lessons for busy learners.",
];

// Complete closings indexed by character length (including final period)
const CLOSING_BY_LEN = (() => {
  const map = {};
  const add = (s) => {
    const n = [...s].length;
    map[n] = map[n] || [];
    if (!map[n].includes(s)) map[n].push(s);
  };
  for (const s of SHORT_CLOSINGS) add(s);
  for (const a of SHORT_CLOSINGS) {
    for (const b of SHORT_CLOSINGS) {
      if (a === b) continue;
      const c = `${a} ${b}`;
      if ([...c].length <= 55) add(c);
    }
  }
  return map;
})();

const CLOSINGS = SHORT_CLOSINGS;

/** Split on sentence enders, ignoring common tech abbreviations like Node.js */
function splitSentences(text) {
  const protectedText = text
    .replace(/Node\.js/g, "Node_js")
    .replace(/Next\.js/g, "Next_js")
    .replace(/Express\.js/g, "Express_js");
  const parts = protectedText.match(/[^.!?]+[.!?]+/g) || [protectedText];
  return parts.map((p) =>
    p
      .replace(/Node_js/g, "Node.js")
      .replace(/Next_js/g, "Next.js")
      .replace(/Express_js/g, "Express.js")
      .trim()
  );
}

function lastSentence(text) {
  const parts = splitSentences(text);
  return parts[parts.length - 1].trim();
}

function stripLastSentence(text) {
  const parts = splitSentences(text);
  if (parts.length < 2) return text.trim();
  return parts.slice(0, -1).join(" ").replace(/\s+/g, " ").trim();
}

function isFragmentEnding(sentence) {
  const s = sentence.trim();
  // Known complete short closings are fine
  if (SHORT_CLOSINGS.some((c) => c.toLowerCase() === s.toLowerCase())) return false;
  // Ends mid-phrase
  if (/\b(with|the|and|for|to|your|a|an|as|in|on|of|your)\.?$/i.test(s)) return true;
  // Ultra-short incomplete leftovers
  if (/^(We reply|Read|Find|Learn|Start|Manage|Practice|Write cleaner|Ship better|Practical|Continue|Apply the|Build a stronger|Keep learning|Study at your pace|Improve faster|Use these ideas|Clear examples|Strengthen your)\.?$/i.test(s)) {
    return true;
  }
  // Truncated longer closings
  if (/^Clear examples make the ideas\.?$/i.test(s)) return true;
  if (s.length < 12) return true;
  // Incomplete if it looks like a cut-off closing phrase
  if (/^(Clear examples|Practical examples|Use these ideas|Build a stronger|Apply concepts|Strengthen skills|Keep learning|Continue with|Study at your|Improve faster)\b/i.test(s)
    && !SHORT_CLOSINGS.some((c) => c.toLowerCase() === s.toLowerCase())) {
    return true;
  }
  return false;
}

function appendExactClosing(base, salt = 0) {
  const body = base.replace(/[.!?]$/, "").trim() + ".";
  // Prefer longer complete closings (more natural in SERPs)
  const attempts = [];
  for (let total = 155; total <= 160; total++) {
    const need = total - len(body) - 1; // space + closing
    if (need < 1) continue;
    const options = CLOSING_BY_LEN[need] || [];
    for (const opt of options) attempts.push({ total, need, opt });
  }
  // Sort: longer closings first, then by salt rotation
  attempts.sort((a, b) => b.need - a.need || a.total - b.total);
  if (!attempts.length) return null;
  // Prefer need >= 24 when available
  const preferred = attempts.filter((a) => a.need >= 24);
  const pool = preferred.length ? preferred : attempts;
  const pick = pool[salt % pool.length].opt;
  return `${body} ${pick}`;
}

function fixDescription(desc, salt = 0) {
  let d = desc.replace(/\s+/g, " ").trim();

  // Strip fragment endings / overly short generic closings
  const tinyClosings = new Set(
    SHORT_CLOSINGS.filter((c) => len(c) < 24).map((c) => c.toLowerCase())
  );
  for (let i = 0; i < 3; i++) {
    const last = lastSentence(d);
    const tiny = tinyClosings.has(last.toLowerCase());
    if ((isFragmentEnding(last) || tiny) && splitSentences(d).length > 1) {
      d = stripLastSentence(d);
      if (!/[.!?]$/.test(d)) d += ".";
    } else break;
  }

  if (
    len(d) >= 155
    && len(d) <= 160
    && !isFragmentEnding(lastSentence(d))
    && !tinyClosings.has(lastSentence(d).toLowerCase())
  ) {
    return d;
  }

  if (len(d) > 160) {
    const words = d.replace(/[.!?]$/, "").split(" ");
    while (words.length > 8 && len(`${words.join(" ")}.`) > 160) words.pop();
    d = `${words.join(" ").replace(/[,:;–—-]+$/, "")}.`;
    if (len(d) >= 155 && len(d) <= 160) return d;
  }

  // Short: shrink base until gap fits a longer complete closing (>=24 chars)
  let words = d.replace(/[.!?]$/, "").split(" ");
  while (words.length >= 8) {
    const base = `${words.join(" ")}.`;
    // Only accept a hit if closing portion is substantial OR no better option
    const bodyLen = len(base);
    const minClosing = 24;
    const maxClosing = 50;
    // If current gap can fit a long closing, try that first
    for (let total = 160; total >= 155; total--) {
      const need = total - bodyLen - 1;
      if (need < minClosing || need > maxClosing) continue;
      const options = CLOSING_BY_LEN[need] || [];
      if (!options.length) continue;
      const pick = options[salt % options.length];
      return `${base} ${pick}`;
    }
    // Fallback: any exact closing
    const hit = appendExactClosing(base, salt);
    if (hit && len(hit) >= 155 && len(hit) <= 160) {
      const closing = hit.slice(base.length + 1);
      if (len(closing) >= minClosing) return hit;
    }
    // shrink base by one word to enlarge the gap for a better closing
    words.pop();
  }

  // Expand base with neutral whole words, then close
  const fillers = ["clearly", "effectively", "step by step", "with confidence", "in practice"];
  let base = d.replace(/[.!?]$/, "").trim();
  for (const f of fillers) {
    const expanded = `${base} ${f}.`;
    const hit = appendExactClosing(expanded, salt);
    if (hit && len(hit) >= 155 && len(hit) <= 160) return hit;
  }

  throw new Error(`Cannot fix desc (${len(d)}): ${d}`);
}

/** Curated absolute titles — already 55–60 chars */
const TITLE_FIXES = {
  "https://notequest.in/": "Learn Programming and Computer Science Today | NoteQuest",
  "https://notequest.in/about": "About NoteQuest Mission and Teaching Approach Explained",
  "https://notequest.in/contact": "Contact NoteQuest for Questions Topics and Partnerships",
  "https://notequest.in/articles": "Browse All Programming Articles and Tutorials | NoteQuest",
  "https://notequest.in/categories": "Explore Programming Categories and Topic Guides | NoteQuest",
  "https://notequest.in/search": "Search NoteQuest Programming and Computer Science Guides",
  "https://notequest.in/editorial-policy": "NoteQuest Editorial Policy and Content Quality Standards",
  "https://notequest.in/privacy-policy": "NoteQuest Privacy Policy for Site Visitors and Data Use",
  "https://notequest.in/disclaimer": "NoteQuest Disclaimer for Educational Content and Advice",
  "https://notequest.in/terms": "NoteQuest Terms and Conditions for Educational Site Use",
  "https://notequest.in/cookie-policy": "NoteQuest Cookie Policy for Analytics Ads and Preferences",
  "https://notequest.in/programming": "Programming Tutorials for Modern Developers | NoteQuest",
  "https://notequest.in/frontend": "Frontend Development Tutorials and UI Guides | NoteQuest",
  "https://notequest.in/backend": "Backend Development Tutorials and API Guides | NoteQuest",
  "https://notequest.in/database": "Database Tutorials for SQL MongoDB and DBMS | NoteQuest",
  "https://notequest.in/computer-science": "Computer Science Fundamentals and Core Topics | NoteQuest",
  "https://notequest.in/interview-questions": "Interview Questions and Technical Prep Guides | NoteQuest",
  "https://notequest.in/career": "Developer Career Advice and Growth Strategies | NoteQuest",
  "https://notequest.in/author/notequest-team": "NoteQuest Editorial Team Author Profile and Published Guides",
  "https://notequest.in/author/priya-sharma": "Priya Sharma Frontend Guides Author Profile on NoteQuest",
  "https://notequest.in/author/arjun-mehta": "Arjun Mehta Backend Systems Author Profile on NoteQuest",
  "https://notequest.in/author/neha-patel": "Neha Patel DSA Interview Coach Author Profile on NoteQuest",
};

const DESC_FIXES = {
  "https://notequest.in/":
    "Learn programming and computer science with clear tutorials on JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview prep skills.",
  "https://notequest.in/about":
    "Discover NoteQuest, an educational blog that teaches programming and computer science through clear practical guides on JavaScript, React, Node.js, and DSA.",
  "https://notequest.in/contact":
    "Contact the NoteQuest team to ask questions, suggest tutorial topics, report corrections, or discuss content partnerships for programming education projects.",
  "https://notequest.in/articles":
    "Browse every NoteQuest programming tutorial in one library covering JavaScript, React, Next.js, Node.js, SQL, MongoDB, DSA, system design, and tech interviews.",
  "https://notequest.in/categories":
    "Explore NoteQuest categories spanning JavaScript, TypeScript, React, Next.js, Node.js, databases, DSA, system design, networks, operating systems, and careers.",
  "https://notequest.in/search":
    "Search NoteQuest tutorials by title, topic, or tag across JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview preparation paths.",
  "https://notequest.in/editorial-policy":
    "Read the NoteQuest editorial policy on accuracy, originality, updates, corrections, and educational quality standards for publishing programming tutorials.",
  "https://notequest.in/privacy-policy":
    "Read the NoteQuest Privacy Policy to understand how we collect, use, store, and protect your information while you browse our programming tutorial library.",
  "https://notequest.in/disclaimer":
    "Review the NoteQuest disclaimer covering educational content accuracy, external links, and advice limits so you can use our programming tutorials responsibly.",
  "https://notequest.in/terms":
    "Review the Terms and Conditions for using NoteQuest, including access rules, acceptable use, intellectual property, and educational content responsibilities.",
  "https://notequest.in/cookie-policy":
    "Learn how NoteQuest uses cookies and similar technologies for preferences, analytics, and advertising so you can manage browsing choices on our learning site.",
  "https://notequest.in/programming":
    "Learn programming with practical tutorials on JavaScript, TypeScript, Git, and GitHub. Build stronger coding foundations with clear examples and real workflows.",
  "https://notequest.in/frontend":
    "Build modern user interfaces with frontend tutorials on HTML, CSS, React, and Next.js. Learn layouts, components, routing, and practical UI patterns clearly.",
  "https://notequest.in/backend":
    "Create reliable APIs and server apps with backend tutorials on Node.js and Express.js. Learn routing, middleware, error handling, and architecture basics well.",
  "https://notequest.in/database":
    "Learn databases with practical guides on SQL, MongoDB, indexing, normalization, and DBMS concepts. Query data confidently and design schemas that scale well.",
  "https://notequest.in/computer-science":
    "Strengthen computer science fundamentals with guides on DSA, system design, computer networks, and operating systems for coursework and interview success paths.",
  "https://notequest.in/interview-questions":
    "Practice technical interview questions across frontend, backend, databases, and system design. Prepare with clear answers, patterns, and practical explanations.",
  "https://notequest.in/career":
    "Grow your software engineering career with practical advice on resumes, portfolios, job search strategy, and skills that help developers stand out when hiring.",
};

function fixAwkwardTitle(title, url) {
  if (TITLE_FIXES[url]) return TITLE_FIXES[url];

  let t = title.trim();

  // Fix known awkward patterns
  t = t
    .replace(/\bfor Modern Practical Guide\b/i, "for Modern Developers")
    .replace(/\bon NoteQuest Guide$/i, "on NoteQuest")
    .replace(/\bNoteQuest Guide$/i, "NoteQuest")
    .replace(/\bPractical Guide \| NoteQuest$/i, "Guide | NoteQuest")
    .replace(/\bGuide Guide\b/gi, "Guide")
    .replace(/\bExplained Explained\b/gi, "Explained")
    .replace(/\bTutorials Tutorials\b/gi, "Tutorials")
    .replace(/\bArticles Articles\b/gi, "Articles")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Ensure brand handling
  const hasBrand = /NoteQuest/i.test(t);
  if (!hasBrand && !t.includes("|")) {
    // will add brand if needed for length
  }

  // If already in range, keep
  if (len(t) >= 55 && len(t) <= 60) return t;

  // If missing brand and adding it helps
  if (!hasBrand) {
    const withBrand = `${t.replace(/\s*\|\s*NoteQuest$/i, "")} | NoteQuest`;
    if (len(withBrand) >= 55 && len(withBrand) <= 60) return withBrand;

    // Adjust core to fit with brand
    const coreMax = 48; // 60-12
    const coreMin = 43;
    let core = t.replace(/\s*\|\s*NoteQuest$/i, "").trim();
    if (len(core) > coreMax) {
      const words = core.split(" ");
      while (words.length > 3 && len(words.join(" ")) > coreMax) words.pop();
      core = words.join(" ");
    }
    const naturalPads = [
      " Guide",
      " Explained",
      " for Developers",
      " with Examples",
      " Learning Path",
      " Skills Guide",
      " Study Notes",
      " Walkthrough",
      " Essentials",
      " Fundamentals",
    ];
    for (const pad of naturalPads) {
      if (core.toLowerCase().includes(pad.trim().toLowerCase())) continue;
      const candidate = `${core}${pad} | NoteQuest`;
      if (len(candidate) >= 55 && len(candidate) <= 60) return candidate;
    }
    // pad core with words until in range
    while (len(`${core} | NoteQuest`) < 55) {
      core += " Guide";
      if (len(`${core} | NoteQuest`) > 60) {
        core = core.replace(/ Guide$/, "");
        break;
      }
    }
    const branded = `${core} | NoteQuest`;
    if (len(branded) >= 55 && len(branded) <= 60) return branded;
  } else {
    // Has NoteQuest but wrong length — pad or trim carefully
    if (len(t) < 55) {
      const pads = [" Explained", " Overview", " and Guides", " for Learners", " Resource"];
      for (const p of pads) {
        const cand = `${t}${p}`;
        if (len(cand) >= 55 && len(cand) <= 60) return cand;
      }
    }
    if (len(t) > 60) {
      const words = t.split(" ");
      while (words.length > 4 && len(words.join(" ")) > 60) words.pop();
      let cut = words.join(" ");
      if (len(cut) >= 55 && len(cut) <= 60) return cut;
    }
  }

  throw new Error(`Cannot fix title (${len(t)}): ${t} @ ${url}`);
}

// Validate curated fixes first
for (const [url, title] of Object.entries(TITLE_FIXES)) {
  if (len(title) < 55 || len(title) > 60) {
    throw new Error(`Curated title bad length ${len(title)}: ${url} :: ${title}`);
  }
}
for (const [url, desc] of Object.entries(DESC_FIXES)) {
  if (len(desc) < 155 || len(desc) > 160) {
    throw new Error(`Curated desc bad length ${len(desc)}: ${url} :: ${desc}`);
  }
}

const pages = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const titleSet = new Set();
const descSet = new Set();
const out = [];

pages.forEach((page, index) => {
  let title = fixAwkwardTitle(page.title, page.url);
  let description = DESC_FIXES[page.url] || fixDescription(page.description, index);

  // Uniqueness repair for titles
  if (titleSet.has(title)) {
    const variants = [
      title.replace(" | NoteQuest", " Guide | NoteQuest"),
      title.replace(" | NoteQuest", " Notes | NoteQuest"),
      title.replace("Tutorials", "Guides"),
      title.replace("Guides", "Tutorials"),
      title.replace("Articles", "Guides"),
      `${title.replace(/ \| NoteQuest$/, "")} Tips | NoteQuest`,
    ];
    let fixed = null;
    for (const v of variants) {
      if (len(v) >= 55 && len(v) <= 60 && !titleSet.has(v)) {
        fixed = v;
        break;
      }
    }
    if (!fixed) throw new Error(`Dup title unresolved: ${title}`);
    title = fixed;
  }

  // Uniqueness repair for descriptions
  if (descSet.has(description)) {
    const base = description.replace(/[.!?]$/, "");
    let fixed = null;
    for (const c of CLOSINGS) {
      // replace last sentence
      const stripped = stripLastSentence(description);
      const cand = `${stripped} ${c}`.replace(/\s+/g, " ").trim();
      if (len(cand) >= 155 && len(cand) <= 160 && !descSet.has(cand)) {
        fixed = cand;
        break;
      }
      const cand2 = `${base}. ${c}`.replace(/\s+/g, " ").trim();
      if (len(cand2) >= 155 && len(cand2) <= 160 && !descSet.has(cand2)) {
        // maybe too long — try stripped
      }
    }
    if (!fixed) {
      // append tiny unique phrase by trimming and using different closing
      for (let i = 0; i < CLOSINGS.length; i++) {
        const stripped = stripLastSentence(description);
        const cand = fixDescription(`${stripped} ${CLOSINGS[(index + i) % CLOSINGS.length]}`, index + i);
        if (!descSet.has(cand)) {
          fixed = cand;
          break;
        }
      }
    }
    if (!fixed) throw new Error(`Dup desc unresolved: ${page.url}`);
    description = fixed;
  }

  if (len(title) < 55 || len(title) > 60) throw new Error(`Title len ${len(title)}: ${title}`);
  if (len(description) < 155 || len(description) > 160) {
    throw new Error(`Desc len ${len(description)}: ${page.url} :: ${description}`);
  }

  // Quality checks
  if (/Roundup|Guide Guide|Hub Today|Welcome|Click Here|Best Website/i.test(title)) {
    throw new Error(`Weak title: ${title}`);
  }
  const last = lastSentence(description);
  if (isFragmentEnding(last)) {
    throw new Error(`Fragment ending (${last.length}): ${page.url} :: ${last}`);
  }

  titleSet.add(title);
  descSet.add(description);

  out.push({
    url: page.url,
    primary: page.primary,
    secondary: page.secondary,
    title,
    description,
    titleLen: len(title),
    descLen: len(description),
  });
});

fs.writeFileSync(jsonPath, `${JSON.stringify(out, null, 2)}\n`);

const md = [
  "# NoteQuest SEO Meta Titles & Descriptions",
  "",
  `Total pages: ${out.length}`,
  "",
  "Constraints: Meta Title 55–60 chars · Meta Description 155–160 chars · All unique",
  "",
  "Implementation note: `buildMetadata()` appends `| NoteQuest` unless the title already contains NoteQuest. Use Meta Title below as the final absolute title.",
  "",
  "---",
  "",
];

for (const p of out) {
  md.push(`Page URL: ${p.url}`);
  md.push(`Primary Keyword: ${p.primary}`);
  md.push(`Secondary Keyword: ${p.secondary}`);
  md.push(`Meta Title: ${p.title}`);
  md.push(`Meta Description: ${p.description}`);
  md.push(`Character Count (Title): ${p.titleLen}`);
  md.push(`Character Count (Description): ${p.descLen}`);
  md.push("");
  md.push("---");
  md.push("");
}

fs.writeFileSync(mdPath, md.join("\n"));
console.log(`Polished ${out.length} pages → docs/SEO-META.md`);
