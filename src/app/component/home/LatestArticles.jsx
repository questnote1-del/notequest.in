const articles = [
  {
    category: "Web Development",
    title: "Understanding React Server Components",
    description:
      "Learn how React Server Components work and how they can improve modern web applications.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    date: "Sep 22, 2025",
    readTime: "8 min read",
  },
  {
    category: "JavaScript",
    title: "Modern JavaScript Concepts You Should Know",
    description:
      "Explore important JavaScript concepts that help you write cleaner and more efficient applications.",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
    date: "Sep 20, 2025",
    readTime: "6 min read",
  },
  {
    category: "Next.js",
    title: "Building Modern Applications with Next.js",
    description:
      "Understand the fundamentals of Next.js and learn how to build fast modern web applications.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    date: "Sep 18, 2025",
    readTime: "10 min read",
  },
  {
    category: "React",
    title: "Getting Started with React Hooks",
    description:
      "Learn the fundamentals of React Hooks and use them to build better components.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    date: "Sep 16, 2025",
    readTime: "7 min read",
  },
];

export default function LatestArticles() {
  return (
    <section className="py-12">
      {/* SECTION TITLE */}
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">
        Latest Articles
      </h2>

      {/* ARTICLE CARDS */}
      <div className="grid grid-cols-4 gap-5">
        {articles.map((article) => (
          <article
            key={article.title}
            className="group overflow-hidden rounded-2xl border-slate-800 bg-slate-900/70 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl"
          >
            {/* IMAGE */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {/* CATEGORY */}
              <p className="inline-flex rounded-3xl border-blue-500/50 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                {article.category}
              </p>
              {/* TITLE */}
              <h3 className="mt-2 text-lg font-bold leading-6 text-gray-100">
                {article.title}
              </h3>

              {/* DESCRIPTION
              <p className="mt-2 text-sm font-semibold leading-5 text-gray-600">
                {article.description}
              </p> */}

              {/* DATE + READ TIME */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-500">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}