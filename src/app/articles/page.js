import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getPaginatedArticles } from "@/lib/articles";

export const metadata = buildMetadata({
  title: "All Articles",
  description:
    "Browse all NoteQuest programming tutorials covering JavaScript, React, Next.js, Node.js, databases, DSA, system design, and interview preparation.",
  path: "/articles",
});

export default async function ArticlesPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { items, pagination } = getPaginatedArticles(page);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        All Articles
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
        Explore our complete library of practical programming and computer science guides.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {pagination.total} articles
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <Pagination pagination={pagination} basePath="/articles" />
    </div>
  );
}
