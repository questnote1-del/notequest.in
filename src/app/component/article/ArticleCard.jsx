import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <Link href={`/articles/${article.slug}`} className="block">
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          {/* CATEGORY */}
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {article.category}
          </span>

          {/* TITLE */}
          <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-7 text-slate-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {article.title}
          </h3>

          {/* DESCRIPTION */}
          {article.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {article.description}
            </p>
          )}

          {/* META */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
            <span>{article.readTime}</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}