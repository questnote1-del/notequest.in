export default function TableOfContents({ headings }) {
  if (!headings?.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
        Table of Contents
      </h2>
      <ol className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
