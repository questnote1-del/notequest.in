const articles = [
  {
    slug: "understanding-react-server-components",
    category: "Web Development",
    title: "Understanding React Server Components",
    description:
      "Learn how React Server Components work and how they can improve modern web applications.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    date: "Sep 22, 2025",
    readTime: "8 min read",
    author: "Vishal",
    sections: [
      {
        heading: "What are React Server Components?",
        paragraphs: [
          "React Server Components are a modern React architecture that allows components to render on the server.",
          "They can help reduce the amount of JavaScript sent to the browser and improve application performance.",
        ],
      },
      {
        heading: "How Server Components Work",
        paragraphs: [
          "Server Components are rendered on the server and their result is sent to the client.",
          "This allows applications to keep server-side logic away from the browser while still building interactive interfaces with Client Components.",
        ],
      },
      {
        heading: "Benefits of Server Components",
        paragraphs: [
          "Server Components can reduce client-side JavaScript and improve initial page loading.",
          "They are especially useful when working with data fetching, databases, APIs, and large server-side dependencies.",
        ],
      },
    ],
    code: `export default async function Page() {
  const data = await getData();

  return <Article data={data} />;
}`,
  },

  {
    slug: "modern-javascript-concepts",
    category: "JavaScript",
    title: "Modern JavaScript Concepts You Should Know",
    description:
      "Explore important JavaScript concepts that help you write cleaner and more efficient applications.",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1200&q=80",
    date: "Sep 20, 2025",
    readTime: "6 min read",
    author: "Vishal",
    sections: [
      {
        heading: "Modern JavaScript",
        paragraphs: [
          "Modern JavaScript provides many features that make application development easier and more maintainable.",
          "Features such as arrow functions, destructuring, modules, promises, and async/await are commonly used in modern applications.",
        ],
      },
      {
        heading: "Arrow Functions",
        paragraphs: [
          "Arrow functions provide a shorter syntax for writing functions.",
          "They are frequently used with array methods such as map, filter, and reduce.",
        ],
      },
      {
        heading: "Async and Await",
        paragraphs: [
          "Async and await make asynchronous JavaScript code easier to read and understand.",
          "They are commonly used when working with APIs and other asynchronous operations.",
        ],
      },
    ],
    code: `async function getUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();

  return users;
}`,
  },

  {
    slug: "building-modern-applications-with-nextjs",
    category: "Next.js",
    title: "Building Modern Applications with Next.js",
    description:
      "Understand the fundamentals of Next.js and learn how to build fast modern web applications.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    date: "Sep 18, 2025",
    readTime: "10 min read",
    author: "Vishal",
    sections: [
      {
        heading: "What is Next.js?",
        paragraphs: [
          "Next.js is a React framework for building modern full-stack web applications.",
          "It provides features such as routing, server rendering, static generation, API endpoints, and optimized application performance.",
        ],
      },
      {
        heading: "Next.js App Router",
        paragraphs: [
          "The App Router uses the app directory to organize pages, layouts, loading states, and dynamic routes.",
          "Dynamic routes can be created using folders such as [slug].",
        ],
      },
      {
        heading: "Why Use Next.js?",
        paragraphs: [
          "Next.js provides a structured way to build production-ready React applications.",
          "Its routing and server-side capabilities make it suitable for blogs, dashboards, ecommerce applications, and many other types of websites.",
        ],
      },
    ],
    code: `export default function Page() {
  return <h1>Welcome to Next.js</h1>;
}`,
  },

  {
    slug: "getting-started-with-react-hooks",
    category: "React",
    title: "Getting Started with React Hooks",
    description:
      "Learn the fundamentals of React Hooks and use them to build better components.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    date: "Sep 16, 2025",
    readTime: "7 min read",
    author: "Vishal",
    sections: [
      {
        heading: "What are React Hooks?",
        paragraphs: [
          "React Hooks allow functional components to use state and other React features.",
          "They were introduced to make it easier to reuse logic between components.",
        ],
      },
      {
        heading: "useState Hook",
        paragraphs: [
          "The useState Hook allows a component to store and update local state.",
          "Whenever the state changes, React can re-render the component with the updated value.",
        ],
      },
      {
        heading: "useEffect Hook",
        paragraphs: [
          "The useEffect Hook is used for side effects such as data fetching, subscriptions, and interacting with external systems.",
          "It runs after React has rendered the component.",
        ],
      },
    ],
    code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
  },
];

export default articles;