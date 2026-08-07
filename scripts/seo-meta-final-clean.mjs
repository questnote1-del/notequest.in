#!/usr/bin/env node
/**
 * Clean SEO meta generator — exact lengths, no truncated closings.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const len = (s) => [...s].length;
const site = "https://notequest.in";

function must(title, desc, url) {
  const t = len(title);
  const d = len(desc);
  if (t < 55 || t > 60) throw new Error(`Title ${t} @ ${url}: ${title}`);
  if (d < 155 || d > 160) throw new Error(`Desc ${d} @ ${url}: ${desc}`);
  if (/["“”]/.test(title + desc)) throw new Error(`Quotes @ ${url}`);
  if (!/[.!?]$/.test(desc)) throw new Error(`No end punct @ ${url}`);
  return { title, description: desc, titleLen: t, descLen: d };
}

const ENDINGS = [
  "Now.",
  "Next.",
  "More.",
  "Go on.",
  "Try it.",
  "Read on.",
  "Code on.",
  "Dive in.",
  "See more.",
  "Start now.",
  "Go deeper.",
  "Learn more.",
  "Keep going.",
  "Keep practicing.",
  "Stay curious.",
  "Learn by doing.",
  "Review often.",
  "Try the examples.",
  "Code with clarity.",
  "Practice deliberately.",
  "Build something small.",
  "Read related guides.",
  "Ask better questions.",
  "Ship small improvements.",
  "Refactor with care.",
  "Prefer clear naming.",
  "Measure what matters.",
  "Share what you learn.",
  "Study focused examples.",
  "Apply ideas in projects.",
  "Improve with practice.",
  "Keep building skills.",
  "Grow coding confidence.",
  "Follow practical examples.",
  "Use patterns at work.",
  "Master the basics first.",
  "Refine your approach.",
  "Explore related guides next.",
  "Make progress in small steps.",
  "Write cleaner code over time.",
  "Level up with practice.",
  "Stay consistent while learning.",
  "Focus on clarity first.",
  "Choose simple solutions.",
  "Review examples carefully.",
  "Compare approaches thoughtfully.",
  "Bookmark this for revision.",
  "Learn with clear examples.",
  "Follow practical coding examples.",
  "Build confidence with explanations.",
  "Strengthen skills with practice.",
  "Apply ideas in real projects.",
  "Study clear learner-focused writing.",
  "Improve with concise guidance.",
  "Continue with related guides.",
  "Practice patterns until natural.",
  "Prepare with more confidence.",
  "Learn with clear practical examples throughout.",
  "Follow along with practical coding examples.",
  "Build confidence with step-by-step explanations.",
  "Strengthen skills with focused practice problems.",
  "Apply these ideas in real development work.",
  "Study clear explanations written for learners.",
  "Improve faster with concise practical guidance.",
  "Continue learning with related NoteQuest guides.",
  "Practice the patterns until they feel natural.",
  "Use this guide to prepare with more confidence.",
];

/** Pad using ONLY complete endings that fit. Never truncate body mid-sentence. */
function fitDesc(body, endings = ENDINGS) {
  let d = body.replace(/\s+/g, " ").trim();
  if (!/[.!?]$/.test(d)) d += ".";
  if (len(d) >= 155 && len(d) <= 160) return d;

  if (len(d) > 160) {
    // Trim whole words only to land in 155–160 with a complete ending period
    const words = d.replace(/[.!?]$/, "").split(" ");
    while (words.length > 8 && len(`${words.join(" ")}.`) > 160) words.pop();
    d = `${words.join(" ").replace(/[,:;–—-]+$/, "")}.`;
    if (len(d) >= 155 && len(d) <= 160) return d;
    if (len(d) > 160) throw new Error(`Body too long (${len(d)}); rewrite shorter: ${d}`);
    // if now short, continue to pad below
  }

  // If gap is tiny, expand body with natural phrases first (prefer longer closings)
  const expanders = [
    " with clarity",
    " in practice",
    " step by step",
    " for real projects",
    " with useful examples",
    " for working developers",
  ];
  let base = d.replace(/[.!?]$/, "").trim();
  for (const exp of expanders) {
    if (base.toLowerCase().includes(exp.trim().toLowerCase())) continue;
    const expanded = `${base}${exp}.`;
    if (len(expanded) >= 155 && len(expanded) <= 160) return expanded;
    if (len(expanded) < 155) {
      // try ending on expanded
      for (let total = 155; total <= 160; total++) {
        const need = total - len(expanded) - 1;
        const matches = endings.filter((e) => len(e) === need);
        // Prefer longer endings (>= 15) when possible
        const preferred = matches.filter((e) => len(e) >= 15);
        const pool = preferred.length ? preferred : matches;
        if (pool.length) return `${expanded} ${pool[0]}`;
      }
    }
  }

  base = `${base}.`;
  // Exact gap fill — prefer longer endings; allow short only as last resort
  for (let minLen of [20, 15, 12, 10, 8, 4]) {
    for (let total = 155; total <= 160; total++) {
      const need = total - len(base) - 1;
      if (need < minLen) continue;
      const matches = endings.filter((e) => len(e) === need);
      if (matches.length) return `${base} ${matches[0]}`;
    }
  }
  throw new Error(`fitDesc failed for (${len(d)}): ${d}`);
}

const pages = [];
const titleSet = new Set();
const descSet = new Set();

function add(url, primary, secondary, title, descBody) {
  const description = fitDesc(descBody, ENDINGS);
  if (titleSet.has(title)) throw new Error(`Dup title: ${title}`);
  if (descSet.has(description)) {
    // try alternate endings for uniqueness
    let fixed = null;
    for (const end of ENDINGS) {
      const base = descBody.replace(/[.!?]$/, "");
      const cand = fitDesc(base, [end, ...ENDINGS.filter((e) => e !== end)]);
      if (!descSet.has(cand)) {
        fixed = cand;
        break;
      }
    }
    if (!fixed) throw new Error(`Dup desc: ${url}`);
    descSet.add(fixed);
    titleSet.add(title);
    pages.push({ url, primary, secondary, ...must(title, fixed, url) });
    return;
  }
  titleSet.add(title);
  descSet.add(description);
  pages.push({ url, primary, secondary, ...must(title, description, url) });
}

// ========== CORE PAGES (handcrafted absolute titles 55–60) ==========
add(`${site}/`, "programming tutorials", "computer science guides",
  "Learn Programming and Computer Science Today | NoteQuest",
  "Learn programming and computer science with clear tutorials on JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview prep skills.");

add(`${site}/about`, "about NoteQuest", "programming education",
  "About NoteQuest Mission and Teaching Approach Explained",
  "Discover NoteQuest, an educational blog that teaches programming and computer science through clear practical guides on JavaScript, React, Node.js, and DSA.");

add(`${site}/contact`, "contact NoteQuest", "feedback and partnerships",
  "Contact NoteQuest for Questions Topics and Partnerships",
  "Contact the NoteQuest team to ask questions, suggest tutorial topics, report corrections, or discuss content partnerships for programming education projects.");

add(`${site}/articles`, "programming articles", "coding tutorials library",
  "Browse All Programming Articles and Tutorials | NoteQuest",
  "Browse every NoteQuest programming tutorial in one library covering JavaScript, React, Next.js, Node.js, SQL, MongoDB, DSA, system design, and tech interviews.");

add(`${site}/categories`, "programming categories", "coding topic directory",
  "Explore Programming Categories and Topic Guides | NoteQuest",
  "Explore NoteQuest categories spanning JavaScript, TypeScript, React, Next.js, Node.js, databases, DSA, system design, networks, operating systems, and careers.");

add(`${site}/search`, "search tutorials", "find programming guides",
  "Search NoteQuest Programming and Computer Science Guides",
  "Search NoteQuest tutorials by title, topic, or tag across JavaScript, React, Next.js, Node.js, DSA, databases, system design, and interview preparation paths.");

add(`${site}/editorial-policy`, "editorial policy", "content quality standards",
  "NoteQuest Editorial Policy and Content Quality Standards",
  "Read the NoteQuest editorial policy on accuracy, originality, updates, corrections, and educational quality standards for publishing programming tutorials.");

add(`${site}/privacy-policy`, "privacy policy", "data protection",
  "NoteQuest Privacy Policy for Site Visitors and Data Use",
  "Read the NoteQuest Privacy Policy to understand how we collect, use, store, and protect your information while you browse our programming tutorial library.");

add(`${site}/disclaimer`, "disclaimer", "educational content notice",
  "NoteQuest Disclaimer for Educational Content and Advice",
  "Review the NoteQuest disclaimer covering educational content accuracy, external links, and advice limits so you can use our programming tutorials responsibly.");

add(`${site}/terms`, "terms and conditions", "website usage terms",
  "NoteQuest Terms and Conditions for Educational Site Use",
  "Review the Terms and Conditions for using NoteQuest, including access rules, acceptable use, intellectual property, and educational content responsibilities.");

add(`${site}/cookie-policy`, "cookie policy", "cookies and analytics",
  "NoteQuest Cookie Policy for Analytics Ads and Preferences",
  "Learn how NoteQuest uses cookies and similar technologies for preferences, analytics, and advertising so you can manage browsing choices on our learning site.");

add(`${site}/programming`, "programming tutorials", "JavaScript TypeScript Git",
  "Programming Tutorials for Modern Developers | NoteQuest",
  "Learn programming with practical tutorials on JavaScript, TypeScript, Git, and GitHub. Build stronger coding foundations with clear examples and real workflows.");

add(`${site}/frontend`, "frontend development", "React Next.js HTML CSS",
  "Frontend Development Tutorials and UI Guides | NoteQuest",
  "Build modern user interfaces with frontend tutorials on HTML, CSS, React, and Next.js. Learn layouts, components, routing, and practical UI patterns clearly.");

add(`${site}/backend`, "backend development", "Node.js Express APIs",
  "Backend Development Tutorials and API Guides | NoteQuest",
  "Create reliable APIs and server apps with backend tutorials on Node.js and Express.js. Learn routing, middleware, error handling, and architecture basics well.");

add(`${site}/database`, "database tutorials", "SQL MongoDB DBMS",
  "Database Tutorials for SQL MongoDB and DBMS | NoteQuest",
  "Learn databases with practical guides on SQL, MongoDB, indexing, normalization, and DBMS concepts. Query data confidently and design schemas that scale well.");

add(`${site}/computer-science`, "computer science fundamentals", "DSA system design",
  "Computer Science Fundamentals and Core Topics | NoteQuest",
  "Strengthen computer science fundamentals with guides on DSA, system design, computer networks, and operating systems for coursework and interview success paths.");

add(`${site}/interview-questions`, "interview questions", "coding interview prep",
  "Interview Questions and Technical Prep Guides | NoteQuest",
  "Practice technical interview questions across frontend, backend, databases, and system design. Prepare with clear answers, patterns, and practical explanations.");

add(`${site}/career`, "developer career", "resume and portfolio",
  "Developer Career Advice and Growth Strategies | NoteQuest",
  "Grow your software engineering career with practical advice on resumes, portfolios, job search strategy, and skills that help developers stand out when hiring.");

// Categories
const cats = [
  ["javascript", "JavaScript tutorials", "async programming", "JavaScript Tutorials from Basics to Advanced | NoteQuest", "Master modern JavaScript with tutorials on fundamentals, async programming, array methods, closures, and the event loop for real projects."],
  ["typescript", "TypeScript tutorials", "types and generics", "TypeScript Tutorials for Safer JavaScript Apps | NoteQuest", "Learn TypeScript types, interfaces, generics, and inference with practical tutorials that help you write safer, scalable JavaScript applications."],
  ["react", "React tutorials", "hooks and state", "React Hooks, Components, and State Tutorials | NoteQuest", "Build interactive UIs with React tutorials on hooks, components, state management, and performance patterns you can apply in real projects daily."],
  ["nextjs", "Next.js tutorials", "App Router SSR", "Next.js App Router and Full Stack Tutorials | NoteQuest", "Create production-ready apps with Next.js tutorials on the App Router, server components, data fetching, SSR, and SSG patterns for React."],
  ["nodejs", "Node.js tutorials", "server-side JavaScript", "Node.js Tutorials for Scalable Backend Apps | NoteQuest", "Build scalable server-side applications with Node.js tutorials on modules, streams, buffers, EventEmitter, and REST API patterns."],
  ["expressjs", "Express.js tutorials", "REST API middleware", "Express.js Tutorials for APIs and Middleware | NoteQuest", "Design REST APIs with Express.js tutorials on middleware, routing, and error handling for maintainable Node.js backend services."],
  ["mongodb", "MongoDB tutorials", "NoSQL aggregation", "MongoDB Tutorials for CRUD and Aggregation Work | NoteQuest", "Work with MongoDB using tutorials on CRUD operations, aggregation pipelines, indexing, and document modeling for real NoSQL apps."],
  ["sql", "SQL tutorials", "joins and indexing", "SQL Tutorials for Queries Joins and Indexes | NoteQuest", "Query relational databases with SQL tutorials on joins, indexes, transactions, and ACID properties that improve clarity and performance."],
  ["html", "HTML tutorials", "semantic accessibility", "HTML Tutorials for Semantic Accessible Pages | NoteQuest", "Build better web pages with HTML tutorials on semantic elements, forms, and accessibility using modern HTML5 best practices."],
  ["css", "CSS tutorials", "Flexbox Grid responsive", "CSS Tutorials for Flexbox Grid and Page Layouts | NoteQuest", "Style modern layouts with CSS tutorials on Flexbox, Grid, responsive design, and practical patterns for clean adaptable interfaces."],
  ["git", "Git tutorials", "branching and merging", "Git Tutorials for Branching Merge and Rebase | NoteQuest", "Learn Git version control with tutorials on branching strategies, merge versus rebase, and collaborative workflows for cleaner history."],
  ["github", "GitHub tutorials", "pull requests CI/CD", "GitHub Tutorials for PRs Actions and Workflows | NoteQuest", "Collaborate on GitHub with tutorials on pull requests, code review, and GitHub Actions CI/CD used by modern development teams."],
  ["dsa", "DSA tutorials", "data structures algorithms", "DSA Tutorials for Interviews and Problem Solving | NoteQuest", "Learn data structures and algorithms with clear DSA tutorials on arrays, trees, hash tables, linked lists, and sorting patterns."],
  ["system-design", "system design tutorials", "scalability architecture", "System Design Tutorials for Scalable Systems | NoteQuest", "Design scalable systems with tutorials on load balancing, caching, URL shorteners, and architecture trade-offs for interviews and work."],
  ["computer-networks", "computer networks tutorials", "OSI HTTP TCP/IP", "Computer Networks Tutorials on OSI HTTP TCP | NoteQuest", "Understand networking fundamentals with tutorials on the OSI model, HTTP, HTTPS, TCP/IP, and DNS for web and backend development."],
  ["operating-systems", "operating systems tutorials", "process memory threads", "Operating Systems Tutorials on Process Memory | NoteQuest", "Explore operating system concepts including processes, threads, memory management, and virtual memory to strengthen CS fundamentals."],
  ["dbms", "DBMS tutorials", "normalization indexing", "DBMS Tutorials for Normalization and Indexing | NoteQuest", "Learn database management concepts with DBMS tutorials on normalization, ACID, indexing, and transactions for correct fast databases."],
  ["career", "developer career tutorials", "portfolio resume tips", "Career Tutorials for Developers and Job Growth | NoteQuest", "Grow as a software developer with career tutorials on portfolios, resumes, soft skills, and job-search strategies that get you noticed."],
  ["interview-questions", "technical interview questions", "coding interview answers", "Interview Question Tutorials with Clear Answers | NoteQuest", "Prepare for technical interviews with curated questions and clear explanations across JavaScript, system design, databases, and CS."],
];

for (const [slug, p, s, title, d] of cats) {
  if (len(title) < 55 || len(title) > 60) throw new Error(`Cat title ${slug}: ${len(title)} ${title}`);
  add(`${site}/category/${slug}`, p, s, title, d);
}

// Authors
add(`${site}/author/notequest-team`, "NoteQuest editorial team", "programming guides authors",
  "NoteQuest Editorial Team Author Profile and Published Guides",
  "Meet the NoteQuest Editorial Team and explore practical programming and computer science guides on JavaScript, React, Node.js, DSA, system design, and careers.");

add(`${site}/author/priya-sharma`, "Priya Sharma frontend", "React Next.js articles",
  "Priya Sharma Frontend Guides Author Profile on NoteQuest",
  "Read articles by Priya Sharma on React, Next.js, TypeScript, CSS, and frontend performance with modern UI patterns taught clearly for working developers today.");

add(`${site}/author/arjun-mehta`, "Arjun Mehta backend", "Node.js system design",
  "Arjun Mehta Backend Systems Author Profile on NoteQuest",
  "Read articles by Arjun Mehta on Node.js, MongoDB, SQL, DBMS, and system design with scalable backend concepts explained in plain practical language today.");

add(`${site}/author/neha-patel`, "Neha Patel DSA coach", "interview preparation",
  "Neha Patel DSA Interview Coach Author Profile on NoteQuest",
  "Read articles by Neha Patel on data structures, algorithms, operating systems, and interview preparation with coaching-style clarity for coding interviews.");

// Articles — exact titles (with brand) and strong descriptions
const articles = [
  ["async-await-in-javascript-explained", "async await JavaScript", "promises error handling", "Async Await in JavaScript Explained Clearly | NoteQuest", "Learn how async/await works in JavaScript, how it builds on Promises, and how to handle errors, run tasks in parallel, and avoid common async pitfalls."],
  ["building-a-developer-portfolio", "developer portfolio", "job search projects", "Build a Developer Portfolio That Gets Recruiter Notice", "Learn how to build a developer portfolio recruiters notice, with guidance on project selection, presentation, README quality, and showcasing real impact."],
  ["building-rest-apis-with-nodejs", "REST APIs Node.js", "backend routing", "Building REST APIs with Node.js Practical Guide Notes", "Build REST APIs with Node.js using clear routing, request parsing, status codes, validation, and project structure for maintainable backend services."],
  ["closures-in-javascript-complete-guide", "JavaScript closures", "lexical scope", "Closures in JavaScript Complete Practical Guide Notes", "Understand JavaScript closures through lexical scope and the scope chain, then see how closures enable data privacy, memoization, and function factories."],
  ["css-flexbox-complete-guide", "CSS Flexbox", "responsive layout", "CSS Flexbox Complete Guide for Modern Layout Design", "Master CSS Flexbox with a practical guide to axes, justify-content, align-items, flex-grow, shrink, and basis plus responsive layout patterns that work."],
  ["css-grid-layout-explained", "CSS Grid layout", "two-dimensional layouts", "CSS Grid Layout Explained for Modern Page Design Work", "Learn CSS Grid from the ground up, including template columns, fr units, grid areas, and when Grid beats Flexbox for two-dimensional page layouts."],
  ["database-indexing-concepts", "database indexing", "query performance", "Database Indexing Concepts Explained for Faster Queries", "Understand database indexing including clustered and non-clustered indexes, selectivity, and how indexes trade write cost for much faster read performance."],
  ["database-normalization-guide", "database normalization", "1NF 2NF 3NF", "Database Normalization Practical Guide for Clean Schemas", "Learn database normalization with clear 1NF, 2NF, and 3NF examples, then decide when denormalization helps performance without creating messy data models."],
  ["dsa-arrays-and-strings", "arrays and strings DSA", "coding interview patterns", "Arrays and Strings for Coding Interviews Practice Guide", "Master arrays and strings for coding interviews with patterns like two pointers, sliding window, and prefix sums plus complexity analysis you can apply."],
  ["dsa-binary-trees-for-beginners", "binary trees beginners", "tree traversal BST", "Binary Trees for Beginners DSA Guide with Traversals", "Learn binary trees from scratch, including traversals, binary search trees, common operations, and recursive patterns for DSA interview preparation."],
  ["dsa-hash-tables-explained", "hash tables explained", "hashing interview patterns", "Hash Tables Explained for DSA and Coding Interviews", "Understand how hash tables deliver near-constant lookups, how hash functions and collisions work, and interview patterns that rely on hashing efficiently."],
  ["dsa-linked-lists-explained", "linked lists DSA", "cycle detection reverse", "Linked Lists Explained for Coding Interview Practice", "Learn singly and doubly linked lists, core operations, and classic interview patterns like cycle detection and reversal with clear complexity notes."],
  ["dsa-sorting-algorithms-explained", "sorting algorithms", "merge sort quicksort", "Sorting Algorithms Explained with Time Complexity Notes", "Compare core sorting algorithms including bubble sort, merge sort, and quicksort. Learn time complexity trade-offs and when each algorithm makes sense."],
  ["express-error-handling-best-practices", "Express error handling", "middleware best practices", "Express Error Handling Best Practices for Node APIs", "Handle errors in Express with centralized middleware, custom error classes, async-safe patterns, and consistent API responses for Node.js backends."],
  ["expressjs-middleware-deep-dive", "Express.js middleware", "request response cycle", "Express.js Middleware Deep Dive for API Developers", "Explore Express.js middleware from the request-response cycle to custom middleware and correct ordering for cleaner maintainable Node.js APIs."],
  ["getting-started-with-typescript-types", "TypeScript types beginners", "interfaces unions", "Getting Started with TypeScript Types for Beginners", "Start TypeScript with a clear intro to primitives, interfaces, unions, and type inference, plus tips for typing existing JavaScript codebases safely."],
  ["git-branching-strategies", "Git branching strategies", "Git Flow trunk-based", "Git Branching Strategies Explained for Modern Teams", "Compare Git Flow, GitHub Flow, and trunk-based development, then choose a branching strategy that fits your team size and release cadence well."],
  ["git-merge-vs-rebase-explained", "git merge vs rebase", "commit history", "Git Merge vs Rebase Explained for Cleaner Histories", "Understand git merge versus git rebase, when to use each, and how rebasing rewrites history compared with merge commits for safer team collaboration."],
  ["github-actions-cicd-basics", "GitHub Actions CI/CD", "workflow automation", "GitHub Actions CI/CD Basics for Developer Automation", "Learn GitHub Actions CI/CD basics including workflow syntax, jobs, steps, and triggers, then build a pipeline that tests and deploys your code."],
  ["github-pull-request-workflow", "GitHub pull request workflow", "code review merge", "GitHub Pull Request Workflow Explained for Teams", "Walk through the GitHub pull request workflow from opening PRs and requesting reviews to resolving comments and choosing merge strategies carefully."],
  ["html-forms-and-accessibility", "HTML forms accessibility", "labels fieldsets UX", "HTML Forms and Accessibility Practical Builder Guide", "Build accessible HTML forms with proper labels, fieldsets, input types, and error handling that work for users who rely on assistive screen readers."],
  ["http-and-https-deep-dive", "HTTP and HTTPS", "TLS status codes", "HTTP and HTTPS Deep Dive for Modern Web Developers", "Learn how HTTP and HTTPS work, including request and response structure, methods, status codes, headers, and how TLS secures modern web traffic."],
  ["javascript-array-methods-deep-dive", "JavaScript array methods", "map filter reduce", "JavaScript Array Methods Deep Dive with Real Examples", "Master everyday JavaScript array methods including map, filter, reduce, find, and sort with practical examples and performance notes you can reuse."],
  ["javascript-event-loop-explained", "JavaScript event loop", "call stack microtasks", "JavaScript Event Loop Explained with Clear Mental Models", "Understand the JavaScript event loop, call stack, task queue, and microtask queue with clear explanations that demystify asynchronous program behavior."],
  ["mongodb-aggregation-pipeline-tutorial", "MongoDB aggregation pipeline", "match group lookup", "MongoDB Aggregation Pipeline Tutorial with Real Stages", "Learn the MongoDB aggregation pipeline with stages like match, group, sort, project, and lookup, then build reporting-style queries for real apps."],
  ["mongodb-crud-operations-guide", "MongoDB CRUD operations", "insert find update delete", "MongoDB CRUD Operations Guide for Everyday Database Work", "Practice MongoDB CRUD with insertOne, find operators, updateOne, updateMany, deleteOne, and deleteMany using clear practical document examples."],
  ["nextjs-app-router-beginner-guide", "Next.js App Router", "file-based routing", "Next.js App Router Beginner Guide for New Projects", "Learn the Next.js App Router with file-based routing, layouts, loading and error states, and a clear comparison with the older Pages Router model."],
  ["nextjs-data-fetching-strategies", "Next.js data fetching", "SSR SSG ISR", "Next.js Data Fetching Strategies Explained Clearly", "Compare Next.js data fetching strategies including SSG, SSR, and ISR. Learn when to use each so pages stay fast, fresh, and production ready."],
  ["nextjs-server-components-explained", "Next.js server components", "React rendering", "Next.js Server Components Explained for React Devs", "Understand React Server Components in Next.js, what runs on the server versus the client, how they shrink bundles, and when to use Client Components."],
  ["nodejs-event-emitter-patterns", "Node.js EventEmitter", "event-driven patterns", "Node.js Event Emitter Patterns for Module Design Work", "Learn Node.js EventEmitter and practical event-driven patterns for modules, including error handling and memory-leak prevention for cleaner backends."],
  ["nodejs-streams-and-buffers", "Node.js streams buffers", "backpressure files", "Node.js Streams and Buffers Explained for Performance", "Learn Node.js streams and buffers, including readable, writable, and transform streams, backpressure, and patterns for processing large files well."],
  ["os-memory-management-basics", "OS memory management", "virtual memory paging", "OS Memory Management Basics Explained for CS Learners", "Learn operating system memory management basics, including virtual memory, paging, stack versus heap, and how memory leaks happen in real programs."],
  ["osi-model-explained", "OSI model explained", "networking layers", "OSI Model Explained for Networking Beginners and Devs", "Explore the OSI model seven layers, what each layer does, and how real protocols like HTTP, TCP, and Ethernet map onto them in everyday networking."],
  ["process-vs-thread-explained", "process vs thread", "OS concurrency", "Process vs Thread Explained for Operating System Basics", "Understand processes versus threads in operating systems, including memory isolation, context switching, and when each concurrency model fits best."],
  ["react-hooks-complete-guide", "React hooks beginners", "useState useEffect", "React Hooks Complete Guide for New Beginners | NoteQuest", "Learn React hooks for beginners, including useState, useEffect, useContext, useRef, and useMemo, with practical examples for interactive UI features."],
  ["react-performance-optimization", "React performance optimization", "memoization rendering", "React Performance Optimization Techniques That Matter", "Optimize React app performance with memoization, code splitting, list virtualization, and correct render profiling for faster growing interfaces."],
  ["react-state-management-patterns", "React state management", "context Redux patterns", "React State Management Patterns Explained with Tradeoffs", "Explore React state management from local component state to Context and external stores. Learn when each approach fits your application size."],
  ["react-useeffect-hook-guide", "useEffect React hook", "dependency array cleanup", "Complete Guide to useEffect in React for Clean Effects", "Master React useEffect with dependency arrays, cleanup functions, common pitfalls, and guidance on when you do not need an effect in components."],
  ["responsive-design-patterns-css", "responsive design CSS", "media queries mobile-first", "Responsive Design Patterns with CSS for Modern Layouts", "Learn responsive design patterns in CSS, including mobile-first media queries, fluid typography, responsive images, and container queries for layouts."],
  ["resume-tips-for-developers", "resume tips developers", "software engineer CV", "Resume Tips for Developers Seeking Better Tech Roles", "Improve your developer resume with tips on impact-focused bullets, clean formatting, and what to leave off so hiring managers see your real value."],
  ["semantic-html-guide", "semantic HTML", "accessibility SEO", "Semantic HTML Practical Guide for Better Accessible Pages", "Learn why semantic HTML matters and how to use header, nav, main, article, and section correctly for accessibility, SEO, and long-term clarity."],
  ["sql-indexing-for-performance", "SQL indexing performance", "B-tree composite indexes", "SQL Indexing for Performance Practical Database Guide", "Learn how SQL indexes speed up queries, how B-tree indexes work, when composite indexes help, and mistakes that slow databases down in production."],
  ["sql-joins-explained", "SQL joins", "INNER LEFT RIGHT JOIN", "SQL Joins Explained with Clear Query Examples | NoteQuest", "Learn SQL joins including INNER, LEFT, RIGHT, and FULL OUTER JOIN with example tables and queries that show exactly what each join returns and why."],
  ["sql-transactions-and-acid-properties", "SQL transactions ACID", "commit rollback isolation", "SQL Transactions and ACID Properties Explained Clearly", "Understand SQL transactions and ACID properties—atomicity, consistency, isolation, and durability—with commit, rollback, and isolation level examples."],
  ["system-design-caching-strategies", "caching strategies system design", "cache-aside invalidation", "Caching Strategies for System Design Interview Prep", "Explore system design caching strategies including cache-aside, write-through, write-back, and invalidation with clear scalability and freshness trade-offs."],
  ["system-design-interview-prep-guide", "system design interview prep", "architecture interviews", "System Design Interview Preparation Guide for Engineers", "Prepare for system design interviews with a clear framework, core topics to study, and communication tips for structuring strong answers under pressure."],
  ["system-design-load-balancing-basics", "load balancing system design", "layer 4 layer 7", "Load Balancing Basics for System Design Interview Prep", "Learn load balancing for system design, including algorithms, health checks, Layer 4 versus Layer 7, and failure modes in scalable production systems."],
  ["system-design-url-shortener", "URL shortener system design", "scalability encoding", "System Design URL Shortener Walkthrough for Interviews", "Design a URL shortener like bit.ly step by step, covering requirements, encoding strategies, database schema, and scaling ideas for system design interviews."],
  ["top-javascript-interview-questions", "JavaScript interview questions", "closures event loop", "Top JavaScript Interview Questions and Clear Answers", "Practice common JavaScript interview questions with clear answers on closures, hoisting, the event loop, prototypes, and equality checks for interviews."],
  ["typescript-generics-practical-guide", "TypeScript generics", "generic functions constraints", "TypeScript Generics Practical Guide for Reusable Types", "Learn TypeScript generics with practical examples of generic functions, constraints, default types, and reusable utilities that make typed codebases safer."],
];

function fitTitle(core) {
  let t = core.replace(/\s+/g, " ").trim();
  if (len(t) >= 55 && len(t) <= 60) return t;

  const candidates = [];
  const base = t.replace(/\s*\|\s*NoteQuest$/i, "").trim();
  const pads = ["", " Tips", " Notes", " Path", " Skills", " Basics", " Overview", " Guide", " Explained", " Walkthrough", " for Devs", " Deep Dive"];
  for (const pad of pads) {
    const token = pad.trim().toLowerCase();
    if (token && base.toLowerCase().includes(token)) continue;
    candidates.push(`${base}${pad}`);
    candidates.push(`${base}${pad} | NoteQuest`);
  }
  const hit = candidates.find((c) => len(c) >= 55 && len(c) <= 60 && !/\b(\w+)\s+\1\b/i.test(c));
  if (hit) return hit;
  throw new Error(`fitTitle failed (${len(core)}): ${core}`);
}

for (const [slug, p, s, t, d] of articles) {
  add(`${site}/articles/${slug}`, p, s, fitTitle(t), d);
}

// Tags — unique titles/descriptions from slug
const articleFiles = fs.readdirSync(path.join(root, "content/articles")).filter((f) => f.endsWith(".mdx"));
const tagSlugs = [...new Set(articleFiles.flatMap((file) => {
  const { data } = matter(fs.readFileSync(path.join(root, "content/articles", file), "utf8"));
  return data.tags || [];
}))].sort();

function labelize(slug) {
  return slug.split("-").map((w) => {
    if (["css", "html", "sql", "dsa", "api", "ci", "cd", "os", "js", "ui", "ux", "ssr", "ssg", "isr", "dbms", "acid", "http", "https", "tcp", "dns", "crud", "rest"].includes(w)) return w.toUpperCase();
    if (w === "nodejs") return "Node.js";
    if (w === "nextjs") return "Next.js";
    if (w === "expressjs") return "Express.js";
    if (w === "mongodb") return "MongoDB";
    if (w === "typescript") return "TypeScript";
    if (w === "javascript") return "JavaScript";
    if (w === "github") return "GitHub";
    if (w === "usecase" ) return "Use Case";
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(" ");
}

const tagDescTemplates = [
  (l) => `Browse NoteQuest articles about ${l}, with clear explanations and practical examples that help you learn faster and apply concepts in projects.`,
  (l) => `Explore NoteQuest guides on ${l} covering core ideas, practical patterns, and examples written for developers who want clarity without fluff.`,
  (l) => `Find NoteQuest tutorials tagged ${l}, featuring focused lessons, useful examples, and explanations that support steady skill building over time.`,
  (l) => `Read NoteQuest content on ${l} to strengthen fundamentals, review key patterns, and practice concepts with beginner-friendly technical writing.`,
  (l) => `Study ${l} with NoteQuest articles that emphasize practical understanding, clear structure, and reusable examples for interviews and projects.`,
];

function tagTitle(label, salt = 0) {
  const templates = [
    `${label} Articles and Practical Tutorials | NoteQuest`,
    `${label} Guides and Learning Articles | NoteQuest`,
    `Browse ${label} Articles and Guides | NoteQuest`,
    `${label} Topic Articles for Developers | NoteQuest`,
    `${label} Tutorials and Explainer Articles | NoteQuest`,
    `${label} Learning Path Articles on NoteQuest`,
    `NoteQuest ${label} Articles and Study Guides`,
    `${label} Articles for Developers and Learners | NoteQuest`,
    `${label} Practical Guides and Tutorials | NoteQuest`,
    `Learn ${label} with NoteQuest Articles and Guides`,
    `${label} Tagged Articles and Tutorials | NoteQuest`,
    `Developer Guides on ${label} Topics | NoteQuest`,
    `${label} Study Guides and Tutorials | NoteQuest`,
    `NoteQuest Learning Guides about ${label} Topics`,
    `${label} Resources and Tutorials on NoteQuest`,
    // Longer templates for short labels (e.g. ACID, UX, SSR)
    `${label} Articles and Practical Developer Guides | NoteQuest`,
    `${label} Learning Guides for Modern Developers | NoteQuest`,
    `Browse ${label} Tutorials and Study Guides | NoteQuest`,
    `${label} Explained through NoteQuest Learning Articles`,
    `NoteQuest Articles Covering ${label} Concepts Clearly`,
    `${label} Concepts Articles and Tutorials | NoteQuest`,
    `Practical ${label} Articles and Guides | NoteQuest`,
    `${label} Fundamentals Articles and Guides | NoteQuest`,
    `Learn ${label} Concepts with NoteQuest Tutorials`,
    `${label} Topic Guides for Coding Interviews | NoteQuest`,
  ];
  const ordered = [...templates.slice(salt % templates.length), ...templates];
  for (const candidate of ordered) {
    if (len(candidate) >= 55 && len(candidate) <= 60 && !titleSet.has(candidate)) return candidate;
  }

  // Programmatic fit: grow/shrink around label until 55–60
  const prefixes = ["", "Browse ", "Learn ", "Practical ", "Explore "];
  const middles = [
    " Articles and Tutorials",
    " Guides and Tutorials",
    " Learning Articles",
    " Study Guides",
    " Developer Guides",
    " Concept Guides",
    " Topic Articles",
  ];
  const suffixes = [
    " | NoteQuest",
    " on NoteQuest",
    " for Developers | NoteQuest",
    " Explained | NoteQuest",
    " with Examples | NoteQuest",
    " Learning Path | NoteQuest",
  ];
  for (const pre of prefixes) {
    for (const mid of middles) {
      for (const suf of suffixes) {
        const candidate = `${pre}${label}${mid}${suf}`.replace(/\s+/g, " ").trim();
        if (len(candidate) >= 55 && len(candidate) <= 60 && !titleSet.has(candidate)) return candidate;
      }
    }
  }
  throw new Error(`Tag title fail (${label}): tried templates, none in 55–60`);
}

tagSlugs.forEach((slug, i) => {
  const label = labelize(slug);
  const title = tagTitle(label, i);
  const descBody = tagDescTemplates[i % tagDescTemplates.length](label);
  add(`${site}/tag/${slug}`, `${label} tutorials`, `${label} guides`, title, descBody);
});

// Output
if (pages.length !== 214) throw new Error(`Expected 214, got ${pages.length}`);

const outDir = path.join(root, "docs");
fs.writeFileSync(path.join(outDir, "seo-meta.json"), `${JSON.stringify(pages, null, 2)}\n`);

const md = [
  "# NoteQuest SEO Meta Titles & Descriptions",
  "",
  `Total pages: ${pages.length}`,
  "",
  "Constraints: Meta Title 55–60 · Meta Description 155–160 · All unique",
  "",
  "Implementation note: `buildMetadata()` appends `| NoteQuest` unless the title already contains NoteQuest. Use Meta Title as the final absolute title.",
  "",
  "---",
  "",
];
for (const p of pages) {
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
fs.writeFileSync(path.join(outDir, "SEO-META.md"), md.join("\n"));
console.log(`OK ${pages.length} pages written to docs/SEO-META.md`);
