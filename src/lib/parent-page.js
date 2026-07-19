import Link from "next/link";
import ArticleCard from "@/components/article/ArticleCard";
import CategoryCard from "@/components/ui/CategoryCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  getParentCategoryBySlug,
  getChildCategories,
} from "@/data/categories";
import { getArticlesByCategory, getAllArticles } from "@/lib/articles";

function createParentPage(slug) {
  const parent = getParentCategoryBySlug(slug);

  async function Page() {
    if (!parent) return null;
    const children = getChildCategories(slug);
    const childSlugs = children.map((c) => c.slug);
    const articles = getAllArticles()
      .filter((a) => childSlugs.includes(a.category) || a.category === slug)
      .slice(0, 12);

    const breadcrumbs = [
      { name: "Home", href: "/" },
      { name: parent.name, href: `/${parent.slug}` },
    ];

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <JsonLd data={breadcrumbSchema(breadcrumbs)} />
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {parent.name}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          {parent.description}
        </p>

        {children.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Topics
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  count={getArticlesByCategory(category.slug).length}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Latest in {parent.name}
            </h2>
            <Link
              href="/articles"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              All articles
            </Link>
          </div>
          {articles.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">
              Articles coming soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return {
    Page,
    metadata: buildMetadata({
      title: parent?.name || slug,
      description: parent?.description || "",
      path: `/${slug}`,
    }),
  };
}

export { createParentPage };
