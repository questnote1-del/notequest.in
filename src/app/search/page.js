import { Suspense } from "react";
import SearchClient from "./SearchClient";
import { pageMetadata } from "@/lib/seo-meta";
import { getAllArticles } from "@/lib/articles";

export const metadata = pageMetadata("/search");

export default function SearchPage() {
  const articles = getAllArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category,
    categoryName: a.categoryName,
    tags: a.tags,
    publishedAt: a.publishedAt,
    readingTime: a.readingTime,
    authorData: { name: a.authorData?.name },
  }));

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-slate-500">
          Loading search...
        </div>
      }
    >
      <SearchClient articles={articles} />
    </Suspense>
  );
}
