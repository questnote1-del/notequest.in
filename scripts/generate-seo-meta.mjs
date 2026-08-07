#!/usr/bin/env node
/**
 * Handcrafted SEO meta for all NoteQuest pages.
 * Title: 55–60 chars (absolute SERP title)
 * Description: 155–160 chars
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const len = (s) => [...s].length;

function must(title, desc, label) {
  const t = len(title);
  const d = len(desc);
  if (t < 55 || t > 60) throw new Error(`[${label}] title ${t}: ${title}`);
  if (d < 155 || d > 160) throw new Error(`[${label}] desc ${d}: ${desc}`);
  return { title, description: desc, titleLen: t, descLen: d };
}

/** Build absolute title in 55–60 with optional brand suffix using one natural expander */
function title(core, { brand = true } = {}) {
  const suffix = brand && !core.includes("NoteQuest") ? " | NoteQuest" : "";
  const direct = `${core}${suffix}`;
  if (len(direct) >= 55 && len(direct) <= 60) return direct;

  // Prefer expanders that land exactly in range; avoid repeating whole phrases already present
  const expanders = [
    " Online",
    " Today",
    " Hub",
    " Tips",
    " Path",
    " Notes",
    " Index",
    " List",
    " Roundup",
    " for Devs",
    " Overview",
    " in Depth",
    " Made Clear",
    " Explained",
    " for Developers",
    " with Examples",
    " Made Simple",
    " Step by Step",
    " Learning Path",
    " Practical Tips",
    " in Plain English",
    " for Beginners",
    " Explained Clearly",
    " Complete Walkthrough",
    " Skills Path",
    " Study Guide",
    " Resource Hub",
    " Collection",
  ];

  const lower = core.toLowerCase();
  const hasPhrase = (e) => lower.includes(e.trim().toLowerCase());

  for (const e of expanders) {
    if (hasPhrase(e)) continue;
    const candidate = `${core}${e}${suffix}`;
    if (len(candidate) >= 55 && len(candidate) <= 60) return candidate;
  }

  // Combine two short expanders if still short
  const shorts = [" Hub", " Tips", " Path", " Notes", " Online", " Today", " List"];
  for (const a of shorts) {
    if (hasPhrase(a)) continue;
    for (const b of shorts) {
      if (a === b || hasPhrase(b)) continue;
      const candidate = `${core}${a}${b}${suffix}`;
      if (len(candidate) >= 55 && len(candidate) <= 60) return candidate;
    }
  }

  // Try trimming core if too long with suffix
  if (len(direct) > 60) {
    const maxCore = 60 - len(suffix);
    let c = core.slice(0, maxCore).replace(/\s+\S*$/, "").replace(/[:,\-–—|/]+$/, "").trim();
    const candidate = `${c}${suffix}`;
    if (len(candidate) >= 55 && len(candidate) <= 60) return candidate;
    for (const e of expanders) {
      const cand = `${c}${e}${suffix}`;
      if (len(cand) >= 55 && len(cand) <= 60) return cand;
    }
  }

  throw new Error(`Cannot craft title from: ${core} (direct=${len(direct)})`);
}

/** Keep description inside 155–160 without awkward padding */
function desc(text, closer) {
  let d = text.replace(/\s+/g, " ").trim();
  if (len(d) >= 155 && len(d) <= 160) return d;

  const pool = [
    closer,
    "Learn with clear examples.",
    "Follow practical examples.",
    "Study step by step.",
    "Built for real learners.",
    "Clear and practical writing.",
    "Start learning today.",
    "Read the full guide.",
    "Practice as you go.",
    "Improve skills with focus.",
    "Apply ideas in real projects.",
    "Useful for beginners and pros.",
    "Written in plain English.",
    "Updated for modern workflows.",
  ].filter(Boolean);

  const tryClosers = (base) => {
    // single closer
    for (const c of pool) {
      const cand = `${base} ${c}`.replace(/\s+/g, " ").trim();
      if (len(cand) >= 155 && len(cand) <= 160) return cand;
      for (let i = c.length; i > 6; i--) {
        let piece = c.slice(0, i).replace(/\s+\S*$/, "").trim();
        if (!piece) continue;
        if (!/[.!?]$/.test(piece)) piece += ".";
        const cand2 = `${base} ${piece}`.replace(/\s+/g, " ").trim();
        if (len(cand2) >= 155 && len(cand2) <= 160) return cand2;
      }
    }
    // stack closers until in range
    let acc = base;
    for (const c of pool) {
      const next = `${acc} ${c}`.replace(/\s+/g, " ").trim();
      if (len(next) > 160) {
        // partial last closer
        for (let i = c.length; i > 6; i--) {
          let piece = c.slice(0, i).replace(/\s+\S*$/, "").trim();
          if (!piece) continue;
          if (!/[.!?]$/.test(piece)) piece += ".";
          const cand2 = `${acc} ${piece}`.replace(/\s+/g, " ").trim();
          if (len(cand2) >= 155 && len(cand2) <= 160) return cand2;
        }
        continue;
      }
      acc = next;
      if (len(acc) >= 155 && len(acc) <= 160) return acc;
    }
    return null;
  };

  if (len(d) < 155) {
    const hit = tryClosers(d);
    if (hit) return hit;
  }

  if (len(d) > 160) {
    // Remove words from the end until <= 160, then ensure 155–160
    const words = d.split(" ");
    while (words.length > 3 && len(words.join(" ")) > 160) {
      words.pop();
    }
    let cut = words.join(" ").replace(/[,:;–—-]+$/, "").trim();
    if (!/[.!?]$/.test(cut)) {
      if (len(cut) < 160) cut += ".";
      else {
        words.pop();
        cut = words.join(" ").replace(/[,:;–—-]+$/, "").trim() + ".";
      }
    }
    if (len(cut) >= 155 && len(cut) <= 160) return cut;
    if (len(cut) < 155) {
      const hit = tryClosers(cut.replace(/\.$/, "."));
      if (hit) return hit;
      const hit2 = tryClosers(cut.replace(/\.$/, ""));
      if (hit2) return hit2;
    }
    // Fine-tune: if 161–164, drop a short filler word
    if (len(d) <= 170) {
      let tuned = d
        .replace(/\band\b/, "")
        .replace(/\s{2,}/g, " ")
        .replace(/\s+\./g, ".")
        .trim();
      if (len(tuned) > 160) {
        const w = tuned.split(" ");
        while (w.length > 3 && len(w.join(" ")) > 160) w.pop();
        tuned = w.join(" ").replace(/[,:;–—-]+$/, "").trim();
        if (!/[.!?]$/.test(tuned)) tuned += ".";
      }
      if (len(tuned) >= 155 && len(tuned) <= 160) return tuned;
      if (len(tuned) < 155) {
        const hit = tryClosers(tuned.replace(/\.$/, ""));
        if (hit) return hit;
      }
    }
  }

  throw new Error(`Cannot craft desc (${len(d)}): ${d}`);
}

const pages = [];
const titleSet = new Set();
const descSet = new Set();

function add(url, primary, secondary, titleCore, descCore, opts = {}) {
  const t = title(titleCore, opts);
  const d = desc(descCore, opts.closer);
  if (titleSet.has(t)) throw new Error(`Dup title: ${t} @ ${url}`);
  if (descSet.has(d)) throw new Error(`Dup desc @ ${url}`);
  titleSet.add(t);
  descSet.add(d);
  const m = must(t, d, url);
  pages.push({ url, primary, secondary, ...m });
}

// ===================== HOME & STATIC =====================
add(
  "https://notequest.in/",
  "programming tutorials",
  "computer science guides",
  "Learn Programming and Computer Science Today",
  "Learn programming and computer science with clear tutorials on JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview prep skills."
);

add(
  "https://notequest.in/about",
  "about NoteQuest",
  "programming education",
  "About NoteQuest Mission Topics and Teaching Style",
  "Discover NoteQuest, an educational blog that teaches programming and computer science through clear practical guides on JavaScript, React, Node.js, and DSA.",
  { brand: false, closer: "See our approach." }
);

add(
  "https://notequest.in/contact",
  "contact NoteQuest",
  "feedback and partnerships",
  "Contact NoteQuest for Questions Topics or Partners",
  "Contact the NoteQuest team to ask questions, suggest tutorial topics, report corrections, or discuss content partnerships for programming education.",
  { brand: false, closer: "We reply when we can." }
);

add(
  "https://notequest.in/articles",
  "programming articles",
  "coding tutorials library",
  "All Programming Articles and Tutorials",
  "Browse every NoteQuest programming tutorial in one library covering JavaScript, React, Next.js, Node.js, SQL, MongoDB, DSA, system design, and interviews.",
  { closer: "Start reading today." }
);

add(
  "https://notequest.in/categories",
  "programming categories",
  "coding topic directory",
  "Programming Topic Categories Directory",
  "Explore NoteQuest categories spanning JavaScript, TypeScript, React, Next.js, Node.js, databases, DSA, system design, networks, OS, and developer careers.",
  { closer: "Pick a topic to begin." }
);

add(
  "https://notequest.in/search",
  "search tutorials",
  "find programming guides",
  "Search NoteQuest Programming and CS Tutorials",
  "Search NoteQuest tutorials by title, topic, or tag across JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview preparation.",
  { brand: false, closer: "Find guides fast." }
);

add(
  "https://notequest.in/editorial-policy",
  "editorial policy",
  "content quality standards",
  "NoteQuest Editorial Policy and Quality Standards",
  "Read the NoteQuest editorial policy on accuracy, originality, updates, corrections, and educational quality standards for publishing programming tutorials.",
  { brand: false, closer: "Quality comes first." }
);

add(
  "https://notequest.in/privacy-policy",
  "privacy policy",
  "data protection",
  "NoteQuest Privacy Policy for Visitors and Data Use",
  "Read the NoteQuest Privacy Policy to understand how we collect, use, store, and protect your information while you browse our programming tutorials.",
  { brand: false, closer: "Your privacy matters." }
);

add(
  "https://notequest.in/disclaimer",
  "disclaimer",
  "educational content notice",
  "NoteQuest Disclaimer for Educational Site Content",
  "Review the NoteQuest disclaimer covering educational content accuracy, external links, and advice limits so you can use our programming tutorials responsibly.",
  { brand: false, closer: "Please read carefully." }
);

add(
  "https://notequest.in/terms",
  "terms and conditions",
  "website usage terms",
  "NoteQuest Terms and Conditions for Website Usage",
  "Review the Terms and Conditions for using NoteQuest, including access rules, acceptable use, intellectual property, and site responsibilities.",
  { brand: false, closer: "Know the rules before use." }
);

add(
  "https://notequest.in/cookie-policy",
  "cookie policy",
  "cookies and analytics",
  "NoteQuest Cookie Policy for Analytics and Ads",
  "Learn how NoteQuest uses cookies and similar technologies for preferences, analytics, and advertising so you can manage browsing choices on our site.",
  { brand: false, closer: "Manage cookies anytime." }
);

// ===================== PARENT HUBS =====================
const parents = [
  ["programming", "programming tutorials", "JavaScript TypeScript Git", "Programming Tutorials for Modern Developers", "Learn programming with practical tutorials on JavaScript, TypeScript, Git, and GitHub. Build stronger coding foundations with clear examples and real workflows.", { brand: false }],
  ["frontend", "frontend development", "React Next.js HTML CSS", "Frontend Development Tutorials", "Build modern user interfaces with frontend tutorials on HTML, CSS, React, and Next.js. Learn layouts, components, routing, and practical UI patterns.", { closer: "Start building UIs." }],
  ["backend", "backend development", "Node.js Express APIs", "Backend Development Tutorials", "Create reliable APIs and server apps with backend tutorials on Node.js and Express.js. Learn routing, middleware, error handling, and architecture basics.", { closer: "Build solid APIs." }],
  ["database", "database tutorials", "SQL MongoDB DBMS", "Database Tutorials for Developers", "Learn databases with practical guides on SQL, MongoDB, indexing, normalization, and DBMS concepts. Query data confidently and design schemas that scale.", { closer: "Improve your queries." }],
  ["computer-science", "computer science fundamentals", "DSA system design", "Computer Science Fundamentals Hub", "Strengthen computer science fundamentals with guides on DSA, system design, computer networks, and operating systems for coursework and interview success.", { closer: "Build a strong base." }],
  ["interview-questions", "interview questions", "coding interview prep", "Interview Questions and Prep Guides", "Practice technical interview questions across frontend, backend, databases, and system design. Prepare with clear answers, patterns, and explanations.", { closer: "Practice with focus." }],
  ["career", "developer career", "resume and portfolio", "Developer Career Advice and Growth Tips", "Grow your software engineering career with practical advice on resumes, portfolios, job search strategy, and skills that help developers stand out.", { closer: "Plan your next step." }],
];
for (const [slug, p, s, t, d, opts] of parents) {
  add(`https://notequest.in/${slug}`, p, s, t, d, opts || {});
}

// ===================== CATEGORIES =====================
const cats = [
  ["javascript", "JavaScript tutorials", "async programming", "JavaScript Tutorials from Basics to Advanced", "Master modern JavaScript with tutorials on fundamentals, async programming, array methods, closures, and the event loop for real projects.", { brand: false, closer: "Write clearer JS." }],
  ["typescript", "TypeScript tutorials", "types and generics", "TypeScript Tutorials for Safer JavaScript Apps", "Learn TypeScript types, interfaces, generics, and inference with practical tutorials that help you write safer, scalable JavaScript applications.", { brand: false, closer: "Type with confidence." }],
  ["react", "React tutorials", "hooks and state", "React Tutorials for Hooks Components and State", "Build interactive UIs with React tutorials on hooks, components, state management, and performance patterns you can apply in real projects today.", { brand: false, closer: "Ship better UI." }],
  ["nextjs", "Next.js tutorials", "App Router SSR", "Next.js Tutorials for App Router and Full Stack", "Create production-ready apps with Next.js tutorials on the App Router, server components, data fetching, SSR, and SSG patterns for React.", { brand: false, closer: "Go full stack." }],
  ["nodejs", "Node.js tutorials", "server-side JavaScript", "Node.js Tutorials for Scalable Backend Apps", "Build scalable server-side applications with Node.js tutorials on modules, streams, buffers, EventEmitter, and REST API patterns.", { brand: false, closer: "Level up backend skills." }],
  ["expressjs", "Express.js tutorials", "REST API middleware", "Express.js Tutorials for APIs and Middleware", "Design REST APIs with Express.js tutorials on middleware, routing, and error handling for maintainable Node.js backends.", { brand: false, closer: "Structure APIs better." }],
  ["mongodb", "MongoDB tutorials", "NoSQL aggregation", "MongoDB Tutorials for CRUD and Aggregation", "Work with MongoDB using tutorials on CRUD operations, aggregation pipelines, indexing, and document modeling for real NoSQL apps.", { brand: false, closer: "Query documents well." }],
  ["sql", "SQL tutorials", "joins and indexing", "SQL Tutorials for Queries Joins and Indexes", "Query relational databases with SQL tutorials on joins, indexes, transactions, and ACID properties that improve clarity and performance.", { brand: false, closer: "Write stronger SQL." }],
  ["html", "HTML tutorials", "semantic accessibility", "HTML Tutorials for Semantic Accessible Pages", "Build better web pages with HTML tutorials on semantic elements, forms, and accessibility using modern HTML5 best practices.", { brand: false, closer: "Improve page structure." }],
  ["css", "CSS tutorials", "Flexbox Grid responsive", "CSS Tutorials for Flexbox Grid and Layouts", "Style modern layouts with CSS tutorials on Flexbox, Grid, responsive design, and practical patterns for clean adaptable interfaces.", { brand: false, closer: "Layout with confidence." }],
  ["git", "Git tutorials", "branching and merging", "Git Tutorials for Branching Merge and Rebase", "Learn Git version control with tutorials on branching strategies, merge versus rebase, and collaborative workflows for cleaner history.", { brand: false, closer: "Collaborate with Git." }],
  ["github", "GitHub tutorials", "pull requests CI/CD", "GitHub Tutorials for PRs Actions and Workflows", "Collaborate on GitHub with tutorials on pull requests, code review, and GitHub Actions CI/CD used by modern development teams.", { brand: false, closer: "Ship with better workflow." }],
  ["dsa", "DSA tutorials", "data structures algorithms", "DSA Tutorials for Interviews and Problem Solving", "Learn data structures and algorithms with clear DSA tutorials on arrays, trees, hash tables, linked lists, and sorting patterns.", { brand: false, closer: "Practice interview patterns." }],
  ["system-design", "system design tutorials", "scalability architecture", "System Design Tutorials for Scalable Systems", "Design scalable systems with tutorials on load balancing, caching, URL shorteners, and architecture trade-offs for interviews and work.", { brand: false, closer: "Think in systems." }],
  ["computer-networks", "computer networks tutorials", "OSI HTTP TCP/IP", "Computer Networks Tutorials on OSI HTTP and TCP", "Understand networking fundamentals with tutorials on the OSI model, HTTP, HTTPS, TCP/IP, and DNS for web and backend work.", { brand: false, closer: "Know how data moves." }],
  ["operating-systems", "operating systems tutorials", "process memory threads", "Operating Systems Tutorials on Process Memory", "Explore operating system concepts including processes, threads, memory management, and virtual memory to strengthen CS fundamentals.", { brand: false, closer: "Learn OS the clear way." }],
  ["dbms", "DBMS tutorials", "normalization indexing", "DBMS Tutorials for Normalization and Indexing", "Learn database management concepts with DBMS tutorials on normalization, ACID, indexing, and transactions for correct fast databases.", { brand: false, closer: "Master core DBMS ideas." }],
  ["career", "developer career tutorials", "portfolio resume tips", "Career Tutorials for Developers and Job Growth", "Grow as a software developer with career tutorials on portfolios, resumes, soft skills, and job-search strategies that get you noticed.", { brand: false, closer: "Advance your career path." }],
  ["interview-questions", "technical interview questions", "coding interview answers", "Interview Question Tutorials with Clear Answers", "Prepare for technical interviews with curated questions and clear explanations across JavaScript, system design, databases, and CS.", { brand: false, closer: "Answer with confidence." }],
];
for (const [slug, p, s, t, d, opts] of cats) {
  add(`https://notequest.in/category/${slug}`, p, s, t, d, opts || {});
}

// ===================== AUTHORS =====================
add(
  "https://notequest.in/author/notequest-team",
  "NoteQuest editorial team",
  "programming guides authors",
  "NoteQuest Editorial Team Author Profile Page",
  "Meet the NoteQuest Editorial Team and explore practical programming and computer science guides on JavaScript, React, Node.js, DSA, and system design.",
  { brand: false, closer: "Read team-written guides." }
);
add(
  "https://notequest.in/author/priya-sharma",
  "Priya Sharma frontend",
  "React Next.js articles",
  "Priya Sharma Frontend Author Profile on NoteQuest",
  "Read articles by Priya Sharma on React, Next.js, TypeScript, CSS, and frontend performance with modern UI patterns taught clearly.",
  { brand: false, closer: "Learn frontend from Priya." }
);
add(
  "https://notequest.in/author/arjun-mehta",
  "Arjun Mehta backend",
  "Node.js system design",
  "Arjun Mehta Backend Author Profile on NoteQuest",
  "Read articles by Arjun Mehta on Node.js, MongoDB, SQL, DBMS, and system design with scalable backend concepts in plain language.",
  { brand: false, closer: "Learn backend from Arjun." }
);
add(
  "https://notequest.in/author/neha-patel",
  "Neha Patel DSA coach",
  "interview preparation",
  "Neha Patel DSA and Interview Coach on NoteQuest",
  "Read articles by Neha Patel on data structures, algorithms, operating systems, and interview preparation with coaching-style clarity.",
  { brand: false, closer: "Prep interviews with Neha." }
);

// ===================== ARTICLES =====================
const articles = [
  ["async-await-in-javascript-explained", "async await JavaScript", "promises error handling", "Async Await in JavaScript Explained", "Learn how async/await works in JavaScript, how it builds on Promises, and how to handle errors, run tasks in parallel, and avoid common pitfalls.", { closer: "Write cleaner async code." }],
  ["building-a-developer-portfolio", "developer portfolio", "job search projects", "Build a Developer Portfolio That Gets Noticed", "Learn how to build a developer portfolio recruiters notice, with guidance on project selection, presentation, README quality, and impact.", { brand: false, closer: "Showcase work that hires." }],
  ["building-rest-apis-with-nodejs", "REST APIs Node.js", "backend routing", "Building REST APIs with Node.js", "Build REST APIs with Node.js using clear routing, request parsing, status codes, validation, and project structure for maintainable backends.", { closer: "Ship reliable APIs." }],
  ["closures-in-javascript-complete-guide", "JavaScript closures", "lexical scope", "Closures in JavaScript Complete Guide", "Understand JavaScript closures through lexical scope and the scope chain, then see how closures enable data privacy, memoization, and factories.", { closer: "Master a core JS concept." }],
  ["css-flexbox-complete-guide", "CSS Flexbox", "responsive layout", "CSS Flexbox Complete Guide for Layouts", "Master CSS Flexbox with a practical guide to axes, justify-content, align-items, flex-grow, shrink, and basis plus responsive layout patterns.", { closer: "Build flexible layouts." }],
  ["css-grid-layout-explained", "CSS Grid layout", "two-dimensional layouts", "CSS Grid Layout Explained for Modern Pages", "Learn CSS Grid from the ground up, including template columns, fr units, grid areas, and when Grid beats Flexbox for two-dimensional layouts.", { brand: false, closer: "Design stronger page grids." }],
  ["database-indexing-concepts", "database indexing", "query performance", "Database Indexing Concepts Explained", "Understand database indexing including clustered and non-clustered indexes, selectivity, and how indexes trade write cost for faster reads.", { closer: "Speed up your queries." }],
  ["database-normalization-guide", "database normalization", "1NF 2NF 3NF", "Database Normalization Practical Guide", "Learn database normalization with clear 1NF, 2NF, and 3NF examples, then decide when denormalization helps performance without messy models.", { closer: "Design cleaner schemas." }],
  ["dsa-arrays-and-strings", "arrays and strings DSA", "coding interview patterns", "Arrays and Strings for Coding Interviews", "Master arrays and strings for coding interviews with patterns like two pointers, sliding window, and prefix sums plus complexity analysis.", { brand: false, closer: "Practice core DSA patterns." }],
  ["dsa-binary-trees-for-beginners", "binary trees beginners", "tree traversal BST", "Binary Trees for Beginners DSA Guide", "Learn binary trees from scratch, including traversals, binary search trees, common operations, and recursive patterns for DSA interviews.", { closer: "Start trees with clarity." }],
  ["dsa-hash-tables-explained", "hash tables explained", "hashing interview patterns", "Hash Tables Explained for DSA Interviews", "Understand how hash tables deliver near-constant lookups, how hash functions and collisions work, and interview patterns that rely on hashing.", { brand: false, closer: "Use hashing effectively." }],
  ["dsa-linked-lists-explained", "linked lists DSA", "cycle detection reverse", "Linked Lists Explained for Coding Interviews", "Learn singly and doubly linked lists, core operations, and classic interview patterns like cycle detection and reversal with clear complexity notes.", { brand: false, closer: "Solve list problems better." }],
  ["dsa-sorting-algorithms-explained", "sorting algorithms", "merge sort quicksort", "Sorting Algorithms Explained with Complexity", "Compare core sorting algorithms including bubble sort, merge sort, and quicksort. Learn time complexity trade-offs and when each makes sense.", { brand: false, closer: "Pick the right sort." }],
  ["express-error-handling-best-practices", "Express error handling", "middleware best practices", "Express Error Handling Best Practices", "Handle errors in Express with centralized middleware, custom error classes, async-safe patterns, and consistent API responses for Node backends.", { closer: "Debug APIs with less pain." }],
  ["expressjs-middleware-deep-dive", "Express.js middleware", "request response cycle", "Express.js Middleware Deep Dive", "Explore Express.js middleware from the request-response cycle to custom middleware and correct ordering for cleaner Node.js APIs.", { closer: "Order middleware correctly." }],
  ["getting-started-with-typescript-types", "TypeScript types beginners", "interfaces unions", "Getting Started with TypeScript Types", "Start TypeScript with a clear intro to primitives, interfaces, unions, and type inference, plus tips for typing existing JavaScript codebases.", { closer: "Add types without fear." }],
  ["git-branching-strategies", "Git branching strategies", "Git Flow trunk-based", "Git Branching Strategies Explained", "Compare Git Flow, GitHub Flow, and trunk-based development, then choose a branching strategy that fits team size and release cadence.", { closer: "Pick a workflow that fits." }],
  ["git-merge-vs-rebase-explained", "git merge vs rebase", "commit history", "Git Merge vs Rebase Explained Clearly", "Understand git merge versus git rebase, when to use each, and how rebasing rewrites history compared with merge commits for safer teamwork.", { closer: "Keep history intentional." }],
  ["github-actions-cicd-basics", "GitHub Actions CI/CD", "workflow automation", "GitHub Actions CI/CD Basics for Developers", "Learn GitHub Actions CI/CD basics including workflow syntax, jobs, steps, and triggers, then build a pipeline that tests and deploys code.", { brand: false, closer: "Automate your releases." }],
  ["github-pull-request-workflow", "GitHub pull request workflow", "code review merge", "GitHub Pull Request Workflow Explained", "Walk through the GitHub pull request workflow from opening PRs and requesting reviews to resolving comments and choosing merge strategies.", { closer: "Collaborate cleanly on PRs." }],
  ["html-forms-and-accessibility", "HTML forms accessibility", "labels fieldsets UX", "HTML Forms and Accessibility Practical Guide", "Build accessible HTML forms with proper labels, fieldsets, input types, and error handling that work for users who rely on screen readers.", { brand: false, closer: "Make forms inclusive." }],
  ["http-and-https-deep-dive", "HTTP and HTTPS", "TLS status codes", "HTTP and HTTPS Deep Dive for Web Developers", "Learn how HTTP and HTTPS work, including request and response structure, methods, status codes, headers, and how TLS secures web traffic.", { brand: false, closer: "Understand the web better." }],
  ["javascript-array-methods-deep-dive", "JavaScript array methods", "map filter reduce", "JavaScript Array Methods Deep Dive", "Master everyday JavaScript array methods including map, filter, reduce, find, and sort with practical examples and performance notes.", { closer: "Transform data with ease." }],
  ["javascript-event-loop-explained", "JavaScript event loop", "call stack microtasks", "JavaScript Event Loop Explained Clearly", "Understand the JavaScript event loop, call stack, task queue, and microtask queue with clear explanations that demystify async behavior.", { closer: "Reason about async JS." }],
  ["mongodb-aggregation-pipeline-tutorial", "MongoDB aggregation pipeline", "match group lookup", "MongoDB Aggregation Pipeline Tutorial", "Learn the MongoDB aggregation pipeline with stages like match, group, sort, project, and lookup, then build reporting-style queries.", { closer: "Shape documents into insights." }],
  ["mongodb-crud-operations-guide", "MongoDB CRUD operations", "insert find update delete", "MongoDB CRUD Operations Guide for Beginners", "Practice MongoDB CRUD with insertOne, find operators, updateOne, updateMany, deleteOne, and deleteMany using clear practical examples.", { brand: false, closer: "Handle documents confidently." }],
  ["nextjs-app-router-beginner-guide", "Next.js App Router", "file-based routing", "Next.js App Router Beginner Guide", "Learn the Next.js App Router with file-based routing, layouts, loading and error states, and a clear comparison with the Pages Router.", { closer: "Adopt App Router faster." }],
  ["nextjs-data-fetching-strategies", "Next.js data fetching", "SSR SSG ISR", "Next.js Data Fetching Strategies Explained", "Compare Next.js data fetching strategies including SSG, SSR, and ISR. Learn when to use each so pages stay fast, fresh, and ready.", { brand: false, closer: "Choose the right strategy." }],
  ["nextjs-server-components-explained", "Next.js server components", "React rendering", "Next.js Server Components Explained", "Understand React Server Components in Next.js, what runs on the server versus the client, how they shrink bundles, and Client Components.", { closer: "Render smarter in Next.js." }],
  ["nodejs-event-emitter-patterns", "Node.js EventEmitter", "event-driven patterns", "Node.js Event Emitter Patterns Explained", "Learn Node.js EventEmitter and practical event-driven patterns for modules, including error handling and memory-leak prevention tips.", { brand: false, closer: "Design event-driven modules." }],
  ["nodejs-streams-and-buffers", "Node.js streams buffers", "backpressure files", "Node.js Streams and Buffers Explained", "Learn Node.js streams and buffers, including readable, writable, and transform streams, backpressure, and patterns for large files.", { closer: "Process data efficiently." }],
  ["os-memory-management-basics", "OS memory management", "virtual memory paging", "OS Memory Management Basics Explained", "Learn operating system memory management basics, including virtual memory, paging, stack versus heap, and how memory leaks happen.", { closer: "See how memory really works." }],
  ["osi-model-explained", "OSI model explained", "networking layers", "OSI Model Explained for Networking Beginners", "Explore the OSI model seven layers, what each layer does, and how real protocols like HTTP, TCP, and Ethernet map onto them daily.", { brand: false, closer: "Connect theory to the web." }],
  ["process-vs-thread-explained", "process vs thread", "OS concurrency", "Process vs Thread Explained for OS Learners", "Understand processes versus threads in operating systems, including memory isolation, context switching, and when each model fits best.", { brand: false, closer: "Clarify concurrency basics." }],
  ["react-hooks-complete-guide", "React hooks beginners", "useState useEffect", "React Hooks Complete Guide for Beginners", "Learn React hooks for beginners, including useState, useEffect, useContext, useRef, and useMemo, with practical interactive UI examples.", { brand: false, closer: "Use hooks the right way." }],
  ["react-performance-optimization", "React performance optimization", "memoization rendering", "React Performance Optimization Techniques", "Optimize React app performance with memoization, code splitting, list virtualization, and correct render profiling for faster interfaces.", { brand: false, closer: "Keep React apps snappy." }],
  ["react-state-management-patterns", "React state management", "context Redux patterns", "React State Management Patterns Explained", "Explore React state management from local component state to Context and external stores. Learn when each approach fits your app size.", { brand: false, closer: "Choose state wisely." }],
  ["react-useeffect-hook-guide", "useEffect React hook", "dependency array cleanup", "Complete Guide to useEffect in React", "Master React useEffect with dependency arrays, cleanup functions, common pitfalls, and guidance on when you do not need an effect.", { closer: "Avoid effect footguns." }],
  ["responsive-design-patterns-css", "responsive design CSS", "media queries mobile-first", "Responsive Design Patterns with CSS", "Learn responsive design patterns in CSS, including mobile-first media queries, fluid typography, responsive images, and container queries.", { closer: "Adapt layouts to any screen." }],
  ["resume-tips-for-developers", "resume tips developers", "software engineer CV", "Resume Tips for Developers Seeking Tech Jobs", "Improve your developer resume with tips on impact-focused bullets, clean formatting, and what to leave off so managers see your value.", { brand: false, closer: "Make every line count." }],
  ["semantic-html-guide", "semantic HTML", "accessibility SEO", "Semantic HTML Practical Guide for Better Pages", "Learn why semantic HTML matters and how to use header, nav, main, article, and section correctly for accessibility, SEO, and clarity.", { brand: false, closer: "Markup with meaning." }],
  ["sql-indexing-for-performance", "SQL indexing performance", "B-tree composite indexes", "SQL Indexing for Performance Practical Guide", "Learn how SQL indexes speed up queries, how B-tree indexes work, when composite indexes help, and mistakes that slow databases down.", { brand: false, closer: "Index with intention." }],
  ["sql-joins-explained", "SQL joins", "INNER LEFT RIGHT JOIN", "SQL Joins Explained with Clear Query Examples", "Learn SQL joins including INNER, LEFT, RIGHT, and FULL OUTER JOIN with example tables and queries that show exactly what each returns.", { brand: false, closer: "Combine tables correctly." }],
  ["sql-transactions-and-acid-properties", "SQL transactions ACID", "commit rollback isolation", "SQL Transactions and ACID Properties Guide", "Understand SQL transactions and ACID properties—atomicity, consistency, isolation, and durability—with commit, rollback, and isolation examples.", { brand: false, closer: "Keep data trustworthy." }],
  ["system-design-caching-strategies", "caching strategies system design", "cache-aside invalidation", "Caching Strategies for System Design Prep", "Explore system design caching strategies including cache-aside, write-through, write-back, and invalidation with scalability trade-offs.", { brand: false, closer: "Cache with clear trade-offs." }],
  ["system-design-interview-prep-guide", "system design interview prep", "architecture interviews", "System Design Interview Preparation Guide", "Prepare for system design interviews with a clear framework, core topics to study, and communication tips for structuring strong answers.", { brand: false, closer: "Interview with a plan." }],
  ["system-design-load-balancing-basics", "load balancing system design", "layer 4 layer 7", "Load Balancing Basics for System Design", "Learn load balancing for system design, including algorithms, health checks, Layer 4 versus Layer 7, and failure modes in scalable systems.", { brand: false, closer: "Distribute traffic wisely." }],
  ["system-design-url-shortener", "URL shortener system design", "scalability encoding", "System Design URL Shortener Walkthrough Guide", "Design a URL shortener like bit.ly step by step, covering requirements, encoding strategies, database schema, and scaling for interviews.", { brand: false, closer: "Practice a classic design." }],
  ["top-javascript-interview-questions", "JavaScript interview questions", "closures event loop", "Top JavaScript Interview Questions and Answers", "Practice common JavaScript interview questions with clear answers on closures, hoisting, the event loop, prototypes, and equality checks.", { brand: false, closer: "Explain JS with confidence." }],
  ["typescript-generics-practical-guide", "TypeScript generics", "generic functions constraints", "TypeScript Generics Practical Guide", "Learn TypeScript generics with practical examples of generic functions, constraints, default types, and reusable utilities for safer code.", { closer: "Reuse types the right way." }],
];

for (const [slug, p, s, t, d, opts] of articles) {
  add(`https://notequest.in/articles/${slug}`, p, s, t, d, opts || {});
}

// ===================== TAGS =====================
// Unique readable label + intent-specific description
const tagData = [
  ["accessibility", "web accessibility", "a11y tutorials", "Web Accessibility Articles and Guides", "Browse NoteQuest articles on web accessibility covering semantic HTML, accessible forms, and inclusive UX practices for every user."],
  ["acid", "ACID properties", "database transactions", "ACID Properties Articles for Databases", "Explore NoteQuest articles on ACID properties and database transactions, including atomicity, consistency, isolation, and durability."],
  ["advanced", "advanced programming", "deeper coding topics", "Advanced Programming Topic Articles Hub", "Browse advanced NoteQuest programming articles that go beyond basics with deeper patterns, architecture choices, and engineering techniques."],
  ["aggregation", "MongoDB aggregation", "data aggregation pipeline", "MongoDB Aggregation Articles and Guides", "Find NoteQuest tutorials on aggregation pipelines and data grouping, including MongoDB match, group, project, and lookup stages."],
  ["algorithms", "algorithms tutorials", "algorithm complexity", "Algorithms Articles for Problem Solving", "Browse NoteQuest algorithms articles covering sorting, complexity analysis, and problem-solving patterns for interviews and CS study."],
  ["app-router", "Next.js App Router", "file-based routing", "Next.js App Router Articles and Guides", "Explore NoteQuest articles on the Next.js App Router, including file-based routing, layouts, loading states, and full-stack React patterns."],
  ["architecture", "software architecture", "app architecture patterns", "Software Architecture Articles and Guides", "Browse NoteQuest articles on software architecture from frontend state design to backend structure and system design for maintainable apps."],
  ["arrays", "arrays DSA", "array interview patterns", "Arrays Articles for Coding and DSA Prep", "Explore NoteQuest articles on arrays, including JavaScript array methods and DSA patterns like two pointers and sliding window."],
  ["async-await", "async await", "asynchronous JavaScript", "Async Await Articles for JavaScript Devs", "Browse NoteQuest articles on async/await and asynchronous JavaScript, including Promises, error handling, and readable async patterns."],
  ["asynchronous", "asynchronous programming", "async concurrency", "Asynchronous Programming Articles Hub", "Explore NoteQuest guides on asynchronous programming covering the event loop, Promises, async/await, and concurrency in JS and Node."],
  ["automation", "CI/CD automation", "workflow automation", "Automation and CI/CD Articles Hub", "Browse NoteQuest articles on automation and CI/CD workflows, including GitHub Actions pipelines that test, build, and deploy code."],
  ["backend", "backend development", "server-side engineering", "Backend Development Articles and Guides", "Explore NoteQuest backend articles on Node.js, Express, APIs, streams, and server-side patterns for reliable application backends."],
  ["beginners", "beginner programming", "learn to code basics", "Beginner Friendly Programming Articles Hub", "Browse beginner-friendly NoteQuest tutorials that explain programming and computer science concepts with practical examples for new learners."],
  ["binary-trees", "binary trees", "tree data structures", "Binary Trees DSA Articles and Tutorials", "Explore NoteQuest articles on binary trees, including traversals, binary search trees, recursion, and beginner-friendly DSA explanations."],
  ["branching", "Git branching", "branching strategies", "Git Branching Articles and Workflow Guides", "Browse NoteQuest articles on Git branching strategies and workflows, including Git Flow, GitHub Flow, and trunk-based development."],
  ["buffers", "Node.js buffers", "binary data streams", "Node.js Buffers Articles and Learning Guides", "Explore NoteQuest articles on Node.js buffers and binary data handling, including how buffers work with streams for files and payloads."],
  ["caching", "caching strategies", "system design cache", "Caching Strategies Articles for System Design", "Browse NoteQuest articles on caching strategies for system design, including cache-aside, write-through, write-back, and invalidation."],
  ["career", "developer career", "tech career growth", "Developer Career Articles and Advice Hub", "Explore NoteQuest career articles for developers covering resumes, portfolios, interview prep, and growth strategies for engineering roles."],
  ["ci-cd", "CI/CD pipelines", "continuous deployment", "CI/CD Pipeline Articles and Tutorials Hub", "Browse NoteQuest tutorials on CI/CD pipelines, including GitHub Actions workflows, automated testing, and reliable deployment patterns."],
  ["closures", "JavaScript closures", "lexical scope", "JavaScript Closures Articles and Guides", "Explore NoteQuest articles on JavaScript closures and lexical scope, including patterns for data privacy, memoization, and factories."],
  ["code-review", "code review", "pull request reviews", "Code Review Articles and PR Best Practices", "Browse NoteQuest articles on code review and pull request practices that help teams give clearer feedback and ship higher-quality changes."],
  ["collaboration", "developer collaboration", "team workflows", "Developer Collaboration Articles and Tips", "Explore NoteQuest articles on developer collaboration, including GitHub workflows, pull requests, and team practices for smoother shipping."],
  ["complexity-analysis", "complexity analysis", "Big O notation", "Complexity Analysis Articles for DSA Prep", "Browse NoteQuest articles on complexity analysis and Big-O thinking that help you evaluate algorithm performance in coding interviews."],
  ["computer-networks", "computer networks", "networking fundamentals", "Computer Networks Articles and Tutorials", "Explore NoteQuest computer networks articles covering the OSI model, HTTP, HTTPS, and networking ideas every developer should know."],
  ["concurrency", "concurrency concepts", "threads and async", "Concurrency Concepts Articles and Guides", "Browse NoteQuest articles on concurrency, including processes, threads, the event loop, and asynchronous patterns in OS and JavaScript."],
  ["context", "React context", "context API state", "React Context Articles and State Guides", "Explore NoteQuest articles on React Context and shared state patterns, including when Context helps and when simpler state is better."],
  ["crud", "CRUD operations", "create read update delete", "CRUD Operations Articles for Databases", "Browse NoteQuest tutorials on CRUD operations across databases, including MongoDB create, read, update, and delete patterns for backends."],
  ["css", "CSS tutorials", "styling layouts", "CSS Articles for Layout and Styling Work", "Explore NoteQuest CSS articles on Flexbox, Grid, responsive design, and practical styling patterns for clean adaptable web layouts."],
  ["data-fetching", "data fetching Next.js", "SSR SSG strategies", "Data Fetching Articles for Next.js Apps", "Browse NoteQuest articles on data fetching strategies in Next.js, including SSR, SSG, ISR, and guidance for fast full-stack pages."],
  ["data-structures", "data structures", "DSA fundamentals", "Data Structures Articles for DSA Learners", "Explore NoteQuest data structures articles covering arrays, linked lists, trees, hash tables, and patterns for interviews and CS basics."],
  ["database", "database tutorials", "SQL NoSQL guides", "Database Articles for SQL and NoSQL Work", "Browse NoteQuest database articles on SQL, MongoDB, indexing, normalization, and data modeling for reliable high-performance applications."],
  ["database-design", "database design", "schema modeling", "Database Design Articles and Schema Guides", "Explore NoteQuest articles on database design, including normalization, indexing choices, and schema modeling for consistent queryable data."],
  ["dbms", "DBMS concepts", "database management", "DBMS Concept Articles and Tutorials Hub", "Browse NoteQuest DBMS articles covering normalization, ACID, indexing, and transactions so you understand how databases stay correct."],
  ["design-patterns", "design patterns", "software patterns", "Design Patterns Articles for Developers", "Explore NoteQuest articles on design patterns used in real codebases, including event-driven Node.js patterns and maintainable architecture."],
  ["dsa", "DSA practice", "data structures algorithms", "DSA Articles for Coding Interview Prep", "Browse NoteQuest DSA articles on arrays, trees, hash tables, linked lists, and sorting with interview-ready patterns and complexity notes."],
  ["error-handling", "error handling", "Express Node errors", "Error Handling Articles for Backend Apps", "Explore NoteQuest articles on error handling in Express and Node.js, including middleware patterns, custom errors, and cleaner API failures."],
  ["event-loop", "JavaScript event loop", "async runtime", "JavaScript Event Loop Articles and Guides", "Browse NoteQuest articles on the JavaScript event loop, call stack, task queues, and microtasks so async behavior is easier to reason about."],
  ["eventemitter", "EventEmitter Node.js", "event-driven modules", "Node.js EventEmitter Articles and Patterns", "Explore NoteQuest articles on Node.js EventEmitter and event-driven module design, including error handling and memory-leak prevention."],
  ["events", "events programming", "event-driven design", "Event Driven Programming Articles Hub", "Browse NoteQuest articles on events and event-driven design in Node.js and JavaScript with patterns for responsive decoupled modules."],
  ["expressjs", "Express.js tutorials", "Node.js APIs", "Express.js Articles for API Development", "Explore NoteQuest Express.js articles on middleware, routing, and error handling so you can build cleaner REST APIs on Node.js."],
  ["filter", "JavaScript filter", "array filter method", "JavaScript Filter Method Articles Hub", "Browse NoteQuest articles covering the JavaScript filter method and related array techniques for selecting and transforming data cleanly."],
  ["flexbox", "CSS Flexbox", "flex layout", "CSS Flexbox Articles and Layout Guides", "Explore NoteQuest CSS Flexbox articles covering axes, alignment, grow, shrink, and basis plus practical patterns for responsive UI."],
  ["forms", "HTML forms", "form accessibility", "HTML Forms Articles and Accessibility Tips", "Browse NoteQuest articles on HTML forms and accessibility, including labels, fieldsets, input types, and error handling for all users."],
  ["functions", "JavaScript functions", "function patterns", "JavaScript Functions Articles and Guides", "Explore NoteQuest articles on JavaScript functions and related patterns, including closures, factories, and techniques for reusable code."],
  ["fundamentals", "programming fundamentals", "CS basics", "Programming Fundamentals Articles and Guides", "Browse NoteQuest fundamentals articles that explain core programming and computer science ideas clearly before you move to advanced topics."],
  ["generics", "TypeScript generics", "generic types", "TypeScript Generics Articles and Tutorials", "Explore NoteQuest TypeScript generics articles covering generic functions, constraints, defaults, and reusable typed utilities."],
  ["git", "Git tutorials", "version control", "Git Version Control Articles and Guides", "Browse NoteQuest Git articles on branching, merge versus rebase, and team workflows that help you manage history with less friction."],
  ["github", "GitHub tutorials", "collaboration workflows", "GitHub Collaboration Articles and Guides", "Explore NoteQuest GitHub articles on pull requests, Actions, and collaboration workflows that help teams review and ship code better."],
  ["github-actions", "GitHub Actions", "workflow CI/CD", "GitHub Actions Articles and CI/CD Guides", "Browse NoteQuest GitHub Actions articles covering workflow syntax, jobs, triggers, and practical CI/CD pipelines for testing and deploy."],
  ["grid", "CSS Grid", "grid layout", "CSS Grid Layout Articles and Tutorials", "Explore NoteQuest CSS Grid articles on template columns, fr units, grid areas, and when Grid is better than Flexbox for layouts."],
  ["hash-tables", "hash tables", "hashing DSA", "Hash Tables DSA Articles and Tutorials", "Browse NoteQuest hash table articles covering hash functions, collisions, near-constant lookups, and interview patterns that use hashing."],
  ["hooks", "React hooks", "useState useEffect", "React Hooks Articles and Practical Guides", "Explore NoteQuest React hooks articles on useState, useEffect, useContext, and more with examples for state and side effects."],
  ["html", "HTML tutorials", "semantic HTML", "HTML Articles for Semantic Web Pages Hub", "Browse NoteQuest HTML articles on semantic markup, accessible forms, and modern HTML5 practices that improve SEO and accessibility."],
  ["http", "HTTP protocol", "web requests", "HTTP Protocol Articles for Web Developers", "Explore NoteQuest HTTP articles covering request and response structure, methods, status codes, and headers for client-server communication."],
  ["https", "HTTPS security", "TLS encryption", "HTTPS and TLS Security Articles Hub", "Browse NoteQuest articles on HTTPS and TLS, including how encryption protects HTTP traffic for modern web applications and APIs."],
  ["indexing", "database indexing", "query indexes", "Database Indexing Articles and Speed Tips", "Explore NoteQuest indexing articles covering SQL indexes, B-trees, composite indexes, and practical ways to speed up queries safely."],
  ["interview-prep", "interview prep", "tech interview practice", "Interview Prep Articles for Developers Hub", "Browse NoteQuest interview prep articles covering JavaScript questions, DSA patterns, system design frameworks, and focused career tips."],
  ["interview-questions", "interview questions", "technical Q&A", "Interview Questions Articles with Answers", "Explore NoteQuest interview question articles with clear explanations across JavaScript, system design, and core CS topics for practice."],
  ["javascript", "JavaScript tutorials", "JS fundamentals", "JavaScript Articles and Practical Tutorials", "Browse NoteQuest JavaScript articles on closures, async/await, the event loop, array methods, and fundamentals for clearer reliable JS."],
  ["job-search", "developer job search", "tech hiring", "Developer Job Search Articles and Tips Hub", "Explore NoteQuest job search articles for developers, including portfolio advice, resume tips, and guidance for presenting skills to hire."],
  ["joins", "SQL joins", "relational joins", "SQL Joins Articles with Practical Examples", "Browse NoteQuest SQL joins articles covering INNER, LEFT, RIGHT, and FULL OUTER joins with examples of how related table data combines."],
  ["layout", "CSS layout", "page layout patterns", "CSS Layout Articles for Modern Interfaces", "Explore NoteQuest CSS layout articles on Flexbox, Grid, and responsive patterns that structure modern interfaces without fragile hacks."],
  ["linked-lists", "linked lists", "DSA linked list", "Linked Lists DSA Articles and Tutorials", "Browse NoteQuest linked list articles covering singly and doubly linked lists, core operations, and patterns like cycle detection."],
  ["load-balancing", "load balancing", "system design scaling", "Load Balancing Articles for System Design", "Explore NoteQuest load balancing articles covering algorithms, health checks, Layer 4 versus Layer 7, and failure modes for scale."],
  ["map", "JavaScript map", "array map method", "JavaScript Map Method Articles and Guides", "Browse NoteQuest articles on the JavaScript map method and related array techniques for transforming collections cleanly and efficiently."],
  ["media-queries", "CSS media queries", "responsive breakpoints", "CSS Media Queries Articles and Guides Hub", "Explore NoteQuest articles on CSS media queries and responsive breakpoints, including mobile-first patterns across device sizes."],
  ["memoization", "memoization", "performance caching", "Memoization Articles for Faster Performance", "Browse NoteQuest articles on memoization in JavaScript and React, including when caching computed results helps and when it does not."],
  ["memory-management", "memory management OS", "virtual memory", "Memory Management OS Articles and Guides", "Explore NoteQuest memory management articles covering virtual memory, paging, stack versus heap, and how leaks occur in programs."],
  ["merge", "git merge", "merge commits", "Git Merge Articles and Version Control Tips", "Browse NoteQuest articles on git merge and related workflows, including how merge commits differ from rebase when integrating history."],
  ["middleware", "Express middleware", "request pipeline", "Express Middleware Articles and Deep Dives", "Explore NoteQuest Express middleware articles covering the request-response cycle, custom middleware, ordering, and clean API patterns."],
  ["mobile-first", "mobile-first design", "responsive CSS", "Mobile First Design Articles and CSS Tips", "Browse NoteQuest articles on mobile-first responsive design with CSS, including media queries and layouts that start from small screens."],
  ["mongodb", "MongoDB tutorials", "NoSQL documents", "MongoDB Articles for NoSQL Developers Hub", "Explore NoteQuest MongoDB articles on CRUD operations, aggregation pipelines, and document modeling for real NoSQL applications."],
  ["networking", "networking basics", "web networking", "Networking Basics Articles for Developers", "Browse NoteQuest networking articles that explain how data moves across the web, including OSI layers, HTTP, HTTPS, and core ideas."],
  ["nextjs", "Next.js tutorials", "React full stack", "Next.js Articles for Full Stack React Apps", "Explore NoteQuest Next.js articles on the App Router, server components, and data fetching for production-ready full-stack React apps."],
  ["nodejs", "Node.js tutorials", "server JavaScript", "Node.js Articles for Backend Development", "Browse NoteQuest Node.js articles on streams, buffers, EventEmitter, and REST APIs for scalable server-side JavaScript applications."],
  ["normalization", "database normalization", "normal forms", "Database Normalization Articles and Guides", "Explore NoteQuest normalization articles covering 1NF, 2NF, and 3NF with examples, plus when denormalization helps performance."],
  ["nosql", "NoSQL databases", "document databases", "NoSQL Database Articles and Tutorials Hub", "Browse NoteQuest NoSQL articles focused on MongoDB and document modeling, including CRUD and aggregation for flexible backends."],
  ["operating-systems", "operating systems", "OS fundamentals", "Operating Systems Articles and CS Guides", "Explore NoteQuest operating systems articles on processes, threads, and memory management to strengthen CS fundamentals for interviews."],
  ["osi-model", "OSI model", "network layers", "OSI Model Articles for Networking Basics", "Browse NoteQuest OSI model articles that explain all seven layers and map protocols like HTTP, TCP, and Ethernet to daily networking."],
  ["performance", "web performance", "app optimization", "Performance Optimization Articles and Tips", "Explore NoteQuest performance articles covering React rendering, SQL indexing, caching, and techniques that keep applications fast."],
  ["portfolio", "developer portfolio", "project showcase", "Developer Portfolio Articles and Tips Hub", "Browse NoteQuest portfolio articles that help developers choose projects, present work clearly, and create a site recruiters notice."],
  ["process", "OS process", "process vs thread", "Operating System Process Articles Hub", "Explore NoteQuest articles on operating system processes, including isolation, context switching, and how processes differ from threads."],
  ["promises", "JavaScript promises", "async promises", "JavaScript Promises Articles and Guides Hub", "Browse NoteQuest articles on JavaScript Promises and related async patterns, including how Promises connect to async/await cleanly."],
  ["pull-requests", "pull requests", "GitHub PR workflow", "Pull Request Workflow Articles and Guides", "Explore NoteQuest pull request articles covering opening PRs, requesting reviews, resolving comments, and merge strategies on GitHub."],
  ["react", "React tutorials", "React components hooks", "React Articles for Components and Hooks", "Browse NoteQuest React articles on hooks, state management, performance, and component patterns for interactive user interfaces."],
  ["rebase", "git rebase", "history rewriting", "Git Rebase Articles and Workflow Guidance", "Explore NoteQuest articles on git rebase, including when rewriting history helps, how rebase differs from merge, and safer linear history."],
  ["recursion", "recursion DSA", "recursive patterns", "Recursion Articles for DSA and Interviews", "Browse NoteQuest recursion articles with clear explanations of recursive patterns used in trees and other DSA interview problems."],
  ["reduce", "JavaScript reduce", "array reduce method", "JavaScript Reduce Method Articles Hub", "Explore NoteQuest articles covering JavaScript reduce and related array methods with examples for accumulating and transforming data."],
  ["redux", "Redux state", "React Redux patterns", "Redux and React State Articles Hub", "Browse NoteQuest articles that discuss Redux-related state ideas alongside React patterns so you know when external stores help."],
  ["relational-databases", "relational databases", "SQL databases", "Relational Database Articles and SQL Guides", "Explore NoteQuest relational database articles covering SQL joins, transactions, indexing, and design for consistent structured data."],
  ["rendering", "React rendering", "UI render performance", "React Rendering Articles and Performance Tips", "Browse NoteQuest articles on React rendering and performance techniques, including when memoization and profiling reduce UI updates."],
  ["responsive-design", "responsive design", "adaptive layouts", "Responsive Design Articles with CSS Patterns", "Explore NoteQuest responsive design articles covering mobile-first CSS, media queries, fluid typography, and container queries."],
  ["rest-api", "REST API", "API design Node.js", "REST API Articles for Backend Developers", "Browse NoteQuest REST API articles covering Node.js routing, status codes, validation, and maintainable structure for HTTP services."],
  ["resume", "developer resume", "software engineer CV", "Developer Resume Tips Articles and Guides", "Explore NoteQuest resume articles for software developers, including impact-focused bullets, formatting advice, and what to omit."],
  ["routing", "web routing", "Next.js routing", "Web Routing Articles for Modern App Structure", "Browse NoteQuest routing articles covering Next.js App Router concepts, layouts, and file-based routes for clearer React apps."],
  ["scalability", "scalability system design", "scaling architecture", "Scalability Articles for System Design Prep", "Explore NoteQuest scalability articles on load balancing, caching, and architecture trade-offs for systems built to grow."],
  ["scope", "JavaScript scope", "lexical scope", "JavaScript Scope Articles and Fundamentals", "Browse NoteQuest articles on JavaScript scope and lexical scoping, including how scope chains enable closures in real applications."],
  ["semantic-html", "semantic HTML", "HTML semantics", "Semantic HTML Articles for Accessibility SEO", "Explore NoteQuest semantic HTML articles covering header, nav, main, article, and section usage for accessibility and SEO clarity."],
  ["seo", "SEO basics", "HTML SEO", "SEO Friendly HTML Articles and Guides Hub", "Browse NoteQuest articles related to SEO-friendly HTML practices, including semantic structure that helps search engines and users."],
  ["server-components", "React server components", "Next.js RSC", "Server Components Articles for Next.js React", "Explore NoteQuest server components articles explaining server versus client rendering, bundle-size benefits, and mixing component types."],
  ["side-effects", "React side effects", "useEffect side effects", "React Side Effects Articles and useEffect Tips", "Browse NoteQuest articles on React side effects and useEffect patterns, including dependency arrays, cleanup, and when to skip effects."],
  ["sorting", "sorting algorithms", "sort complexity", "Sorting Algorithms Articles for DSA Prep", "Explore NoteQuest sorting algorithm articles covering bubble sort, merge sort, quicksort, and complexity comparisons for interviews."],
  ["sql", "SQL tutorials", "relational SQL", "SQL Articles for Queries Joins and Indexes", "Browse NoteQuest SQL articles on joins, indexing, transactions, and ACID properties for clearer, more efficient relational queries."],
  ["ssg", "static site generation", "Next.js SSG", "Static Site Generation Articles Hub", "Explore NoteQuest articles on static site generation in Next.js, including when SSG fits and how it compares with SSR and ISR."],
  ["ssr", "server-side rendering", "Next.js SSR", "Server Side Rendering Articles and Guides", "Browse NoteQuest articles on server-side rendering in Next.js, including when SSR improves freshness among data fetching options."],
  ["state-management", "state management React", "app state patterns", "React State Management Articles Hub", "Explore NoteQuest state management articles covering local state, Context, and external stores for choosing the right React pattern."],
  ["streams", "Node.js streams", "stream processing", "Node.js Streams Articles and Performance Tips", "Browse NoteQuest Node.js streams articles covering readable, writable, and transform streams, backpressure, and large file processing."],
  ["strings", "strings DSA", "string interview patterns", "Strings DSA Articles for Coding Interviews", "Explore NoteQuest string articles for coding interviews, including patterns that pair with arrays for common string problems."],
  ["system-design", "system design", "architecture interviews", "System Design Articles and Interview Guides", "Browse NoteQuest system design articles on caching, load balancing, URL shorteners, and frameworks for scalable architecture answers."],
  ["thread", "OS threads", "multithreading", "Operating System Threads Articles Hub", "Explore NoteQuest articles on threads in operating systems, including how threads differ from processes and when multithreading helps."],
  ["transactions", "SQL transactions", "database transactions", "SQL Transactions Articles and ACID Guides", "Browse NoteQuest SQL transaction articles covering commit, rollback, isolation, and ACID properties for reliable concurrent data access."],
  ["types", "TypeScript types", "type system basics", "TypeScript Types Articles for Safer Code", "Explore NoteQuest TypeScript types articles covering primitives, interfaces, unions, inference, and ways to type JavaScript gradually."],
  ["typescript", "TypeScript tutorials", "typed JavaScript", "TypeScript Articles and Practical Guides Hub", "Browse NoteQuest TypeScript articles on types and generics that help you write safer JavaScript with clearer contracts and tooling."],
  ["url-shortener", "URL shortener design", "system design case study", "URL Shortener System Design Articles Hub", "Explore NoteQuest URL shortener system design articles covering requirements, encoding, database schema, and scaling for interviews."],
  ["usecontext", "useContext React", "React context hook", "React useContext Articles and Guides Hub", "Browse NoteQuest articles on React useContext and state sharing patterns, including guidance for avoiding prop drilling carefully."],
  ["useeffect", "useEffect React", "effect hook guide", "React useEffect Articles and Best Practices", "Explore NoteQuest useEffect articles covering dependency arrays, cleanup functions, common pitfalls, and when you can skip effects."],
  ["usestate", "useState React", "React state hook", "React useState Articles and Beginner Guides", "Browse NoteQuest articles on React useState and related hooks, with beginner-friendly examples of local state for interactive UI."],
  ["ux", "UX for developers", "form UX accessibility", "UX Focused Web Development Articles Hub", "Explore NoteQuest articles that connect development and UX, including accessible forms and inclusive practices that improve user experience."],
  ["version-control", "version control", "Git workflows", "Version Control Articles for Git Teams Hub", "Browse NoteQuest version control articles on Git branching, merge, rebase, and collaboration practices for safer team shipping."],
  ["virtual-memory", "virtual memory", "OS paging", "Virtual Memory OS Articles and Explanations", "Explore NoteQuest virtual memory articles covering paging and related OS memory concepts for programs that exceed physical RAM."],
  ["web", "web development", "web fundamentals", "Web Development Fundamentals Articles Hub", "Browse NoteQuest web development articles covering HTTP, HTML, and fundamentals that explain how modern websites and APIs work."],
  ["web-development", "web development career", "building for the web", "Web Development Career and Skill Articles", "Explore NoteQuest web development articles that connect coding skills, portfolios, and frontend knowledge for builders on the web."],
  ["workflow", "developer workflow", "Git team workflow", "Developer Workflow Articles and Guides Hub", "Browse NoteQuest workflow articles on Git branching strategies and collaboration practices that match release speed and quality goals."],
];

const tagClosers = [
  "Browse tagged guides.",
  "Explore this topic next.",
  "Find related tutorials.",
  "Continue learning here.",
  "See practical examples.",
  "Study focused articles.",
  "Open a guide and practice.",
  "Learn this topic clearly.",
  "Follow the linked tutorials.",
  "Deepen this skill path.",
];

tagData.forEach(([slug, p, s, t, d], i) => {
  add(
    `https://notequest.in/tag/${slug}`,
    p,
    s,
    t,
    d,
    { closer: tagClosers[i % tagClosers.length] }
  );
});

// ===================== OUTPUT =====================
const outDir = path.join(root, "docs");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "seo-meta.json"), JSON.stringify(pages, null, 2));

const lines = [
  "# NoteQuest SEO Meta Titles & Descriptions",
  "",
  `Total pages: ${pages.length}`,
  "",
  "Rules applied:",
  "- Meta Title: 55–60 characters (absolute SERP title)",
  "- Meta Description: 155–160 characters",
  "- Unique title and description per page",
  "- Brand (NoteQuest) at end of title when appropriate",
  "",
  "Implementation note: `buildMetadata()` appends `| NoteQuest` unless the title already contains `NoteQuest`. Use the Meta Title below as the **final absolute** `<title>`.",
  "",
  "---",
  "",
];

for (const p of pages) {
  lines.push(`Page URL: ${p.url}`);
  lines.push(`Primary Keyword: ${p.primary}`);
  lines.push(`Secondary Keyword: ${p.secondary}`);
  lines.push(`Meta Title: ${p.title}`);
  lines.push(`Meta Description: ${p.description}`);
  lines.push(`Character Count (Title): ${p.titleLen}`);
  lines.push(`Character Count (Description): ${p.descLen}`);
  lines.push("");
  lines.push("---");
  lines.push("");
}

fs.writeFileSync(path.join(outDir, "SEO-META.md"), lines.join("\n"));
console.log(`OK ${pages.length} pages → docs/SEO-META.md + docs/seo-meta.json`);
