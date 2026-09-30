import Link from "next/link";
import { getLatestArticles } from "@/lib/articles";

export default function LatestArticles() {
  const articles = getLatestArticles(4);

  return (
    <section className="border-t border-slate-200 py-16 dark:border-slate-800">
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              Latest Articles
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Learn something new
            </h2>
          </div>

          <Link
            href="/articles"
            className="hidden border-b border-slate-400 pb-1 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 sm:block dark:border-slate-600 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            View all articles
          </Link>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Discover practical programming knowledge, tutorials and ideas to
          improve your development skills.
        </p>
      </div>

      {/* FEATURED ARTICLE */}
      {articles.length > 0 && (
        <Link
          href={`/articles/${articles[0].slug}`}
          className="group relative mb-10 block overflow-hidden border border-slate-200 bg-slate-50 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        >
          <div className="grid md:grid-cols-2">
            <div className="h-64 overflow-hidden md:h-[320px]">
              <img
                src={articles[0].coverImage}
                alt={articles[0].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Featured article
              </span>

              <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:text-3xl dark:text-white dark:group-hover:text-blue-400">
                {articles[0].title}
              </h3>

              <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>{articles[0].publishedAt}</span>
                <span>•</span>
                <span>{articles[0].readingTime}</span>
              </div>

              <span className="mt-7 text-sm font-semibold text-blue-600 dark:text-blue-400">
                Read article →
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* OTHER ARTICLES */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(1).map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            {/* IMAGE */}
            <div className="overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img
                src={article.coverImage}
                alt={article.title}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {article.categoryName}
              </p>

              <h3 className="mt-2 text-lg font-bold leading-6 text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {article.title}
              </h3>

              <div className="mt-4 flex gap-2 text-xs text-slate-500 dark:text-slate-500">
                <span>{article.publishedAt}</span>
                <span>•</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* MOBILE LINK */}
      <Link
        href="/articles"
        className="mt-8 inline-block text-sm font-semibold text-blue-600 sm:hidden dark:text-blue-400"
      >
        View all articles →
      </Link>
    </section>
  );
}