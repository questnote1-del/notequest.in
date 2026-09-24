import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Articles
        </h1>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Explore our latest articles, tutorials, and insights.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="p-5">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {article.categoryName}
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                {article.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                {article.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <span>{article.publishedAt}</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}