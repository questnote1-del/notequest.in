import { notFound } from "next/navigation";
import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-meta";
import { getAllTags, getPaginatedByTag } from "@/lib/articles";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find((t) => t.slug === slug || slugify(t.name) === slug);
  if (!tag) return { title: "Tag Not Found" };
  return pageMetadata(`/tag/${tag.slug}`, {
    title: `Articles tagged ${tag.name}`,
    description: `Browse NoteQuest articles tagged with ${tag.name}. Practical programming and computer science tutorials.`,
  });
}

export default async function TagPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const tags = getAllTags();
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) notFound();

  const page = Number(sp?.page) || 1;
  const { items, pagination } = getPaginatedByTag(tag.name, page);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: `#${tag.name}`, href: `/tag/${tag.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        #{tag.name}
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        {pagination.total} articles tagged with {tag.name}.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      <Pagination pagination={pagination} basePath={`/tag/${tag.slug}`} />
    </div>
  );
}
