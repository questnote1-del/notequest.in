import Link from "next/link";

export default function CategoryCard({ category, count }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
    >
      <span
        className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: category.color === "#000000" || category.color === "#181717" ? "#2563EB" : category.color }}
      >
        {category.icon}
      </span>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
        {category.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">
        {category.description}
      </p>
      {typeof count === "number" && (
        <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          {count} {count === 1 ? "article" : "articles"}
        </p>
      )}
    </Link>
  );
}
