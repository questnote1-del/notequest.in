import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function ArticleCard({ article, featured = false }) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 ${
        featured ? "sm:p-6" : ""
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Link
          href={`/category/${article.category}`}
          className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        >
          {article.categoryName}
        </Link>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {article.readingTime}
        </span>
      </div>

      <h3
        className={`font-bold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400 ${
          featured ? "text-xl leading-snug" : "text-lg leading-snug"
        }`}
      >
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">
        {article.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>{article.authorData?.name}</span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </div>
    </article>
  );
}
