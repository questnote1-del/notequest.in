import Link from "next/link";

export default function AuthorBox({ author }) {
  if (!author) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {author.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Written by
          </p>
          <Link
            href={`/author/${author.slug}`}
            className="mt-1 text-lg font-bold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            {author.name}
          </Link>
          <p className="text-sm text-blue-600 dark:text-blue-400">{author.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {author.bio}
          </p>
        </div>
      </div>
    </aside>
  );
}
