"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function SearchClient({ articles }) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") || "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles.filter((article) => {
      const haystack = [
        article.title,
        article.description,
        article.categoryName,
        ...(article.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, query]);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Search
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        Find tutorials by title, topic, or tag.
      </p>

      <form
        role="search"
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          const url = new URL(window.location.href);
          if (query.trim()) url.searchParams.set("q", query.trim());
          else url.searchParams.delete("q");
          window.history.replaceState({}, "", url);
        }}
      >
        <label htmlFor="search-input" className="sr-only">
          Search articles
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search JavaScript, React, DSA..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-blue-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          autoFocus
        />
      </form>

      <div className="mt-8">
        {!query.trim() ? (
          <p className="text-slate-500">Start typing to search articles.</p>
        ) : results.length === 0 ? (
          <p className="text-slate-500">
            No results for &ldquo;{query}&rdquo;. Try a different keyword.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-500">
              {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;
              {query}&rdquo;
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
