export const categories = [
  {
    slug: "javascript",
    name: "JavaScript",
    description:
      "Master modern JavaScript from fundamentals to advanced patterns, async programming, and real-world applications.",
    parent: "programming",
    color: "#F7DF1E",
    icon: "JS",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    description:
      "Learn TypeScript types, interfaces, generics, and how to build safer applications at scale.",
    parent: "programming",
    color: "#3178C6",
    icon: "TS",
  },
  {
    slug: "react",
    name: "React",
    description:
      "Build interactive user interfaces with React hooks, components, state management, and performance patterns.",
    parent: "frontend",
    color: "#61DAFB",
    icon: "RE",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    description:
      "Create production-ready full-stack apps with the Next.js App Router, SSR, SSG, and API routes.",
    parent: "frontend",
    color: "#000000",
    icon: "NX",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    description:
      "Build scalable server-side applications with Node.js, modules, streams, and best practices.",
    parent: "backend",
    color: "#339933",
    icon: "NO",
  },
  {
    slug: "expressjs",
    name: "Express.js",
    description:
      "Design REST APIs and middleware architectures with Express.js for Node.js backends.",
    parent: "backend",
    color: "#000000",
    icon: "EX",
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    description:
      "Work with document databases, aggregation pipelines, indexing, and MongoDB data modeling.",
    parent: "database",
    color: "#47A248",
    icon: "MG",
  },
  {
    slug: "sql",
    name: "SQL",
    description:
      "Query relational databases with SQL: joins, indexes, transactions, and query optimization.",
    parent: "database",
    color: "#336791",
    icon: "SQ",
  },
  {
    slug: "html",
    name: "HTML",
    description:
      "Build accessible, semantic web pages with modern HTML5 elements and best practices.",
    parent: "frontend",
    color: "#E34F26",
    icon: "HT",
  },
  {
    slug: "css",
    name: "CSS",
    description:
      "Style modern layouts with Flexbox, Grid, responsive design, and CSS architecture.",
    parent: "frontend",
    color: "#1572B6",
    icon: "CS",
  },
  {
    slug: "git",
    name: "Git",
    description:
      "Version control with Git: branching, merging, rebasing, and collaborative workflows.",
    parent: "programming",
    color: "#F05032",
    icon: "GT",
  },
  {
    slug: "github",
    name: "GitHub",
    description:
      "Collaborate on GitHub with pull requests, Actions, Issues, and open-source workflows.",
    parent: "programming",
    color: "#181717",
    icon: "GH",
  },
  {
    slug: "dsa",
    name: "DSA",
    description:
      "Learn data structures and algorithms with clear explanations, complexity analysis, and practice problems.",
    parent: "computer-science",
    color: "#2563EB",
    icon: "DS",
  },
  {
    slug: "system-design",
    name: "System Design",
    description:
      "Design scalable systems covering load balancing, caching, databases, and architecture patterns.",
    parent: "computer-science",
    color: "#7C3AED",
    icon: "SD",
  },
  {
    slug: "computer-networks",
    name: "Computer Networks",
    description:
      "Understand networking fundamentals: OSI model, TCP/IP, HTTP, DNS, and security basics.",
    parent: "computer-science",
    color: "#0891B2",
    icon: "CN",
  },
  {
    slug: "operating-systems",
    name: "Operating Systems",
    description:
      "Explore OS concepts including processes, threads, memory management, and file systems.",
    parent: "computer-science",
    color: "#059669",
    icon: "OS",
  },
  {
    slug: "dbms",
    name: "DBMS",
    description:
      "Database management concepts: normalization, ACID, indexing, transactions, and query planning.",
    parent: "database",
    color: "#DC2626",
    icon: "DB",
  },
  {
    slug: "career",
    name: "Career",
    description:
      "Career guidance for developers: portfolios, resumes, soft skills, and growth strategies.",
    parent: "career",
    color: "#EA580C",
    icon: "CR",
  },
  {
    slug: "interview-questions",
    name: "Interview Questions",
    description:
      "Prepare for technical interviews with curated questions, answers, and explanation guides.",
    parent: "interview-questions",
    color: "#DB2777",
    icon: "IQ",
  },
];

export const parentCategories = [
  {
    slug: "programming",
    name: "Programming",
    description:
      "Learn programming languages, tools, and development workflows with practical tutorials.",
    children: ["javascript", "typescript", "git", "github"],
  },
  {
    slug: "frontend",
    name: "Frontend",
    description:
      "Build modern user interfaces with HTML, CSS, React, and Next.js.",
    children: ["html", "css", "react", "nextjs"],
  },
  {
    slug: "backend",
    name: "Backend",
    description:
      "Create APIs and server applications with Node.js and Express.js.",
    children: ["nodejs", "expressjs"],
  },
  {
    slug: "database",
    name: "Database",
    description:
      "Store and query data with SQL, MongoDB, and database management concepts.",
    children: ["mongodb", "sql", "dbms"],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    description:
      "Strengthen CS fundamentals: DSA, system design, networks, and operating systems.",
    children: ["dsa", "system-design", "computer-networks", "operating-systems"],
  },
  {
    slug: "interview-questions",
    name: "Interview Questions",
    description:
      "Practice interview questions across frontend, backend, databases, and system design.",
    children: ["interview-questions"],
  },
  {
    slug: "career",
    name: "Career",
    description:
      "Grow your software engineering career with practical advice and strategies.",
    children: ["career"],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getParentCategoryBySlug(slug) {
  return parentCategories.find((c) => c.slug === slug);
}

export function getChildCategories(parentSlug) {
  const parent = getParentCategoryBySlug(parentSlug);
  if (!parent) return [];
  return parent.children
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean);
}
