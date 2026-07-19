import { notFound } from "next/navigation";
import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getPaginatedByCategory } from "@/lib/articles";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return buildMetadata({
    title: `${category.name} Tutorials`,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Number(sp?.page) || 1;
  const { items, pagination } = getPaginatedByCategory(slug, page);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: category.name, href: `/category/${category.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
        {category.description}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {pagination.total} {pagination.total === 1 ? "article" : "articles"}
      </p>

      {items.length === 0 ? (
        <p className="mt-10 text-slate-600 dark:text-slate-400">
          No articles in this category yet. Check back soon.
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <Pagination
            pagination={pagination}
            basePath={`/category/${category.slug}`}
          />
        </>
      )}
    </div>
  );
}
