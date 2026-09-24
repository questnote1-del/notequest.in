import Link from "next/link";
import { getLatestArticles } from "@/lib/articles";

export default function LatestArticles() {
  const articles = getLatestArticles(4);

  return (
    <section className="py-12">
      {/* SECTION TITLE */}
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">
        Latest Articles
      </h2>

      {/* ARTICLE CARDS */}
      <div className="grid grid-cols-4 gap-5">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl"
          >
            {/* IMAGE */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {/* CATEGORY */}
              <p className="inline-flex rounded-3xl border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                {article.categoryName}
              </p>

              {/* TITLE */}
              <h3 className="mt-2 text-lg font-bold leading-6 text-gray-100">
                {article.title}
              </h3>

              {/* DATE + READ TIME */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-500">
                <span>{article.publishedAt}</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
