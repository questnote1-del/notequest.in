import CategoryCard from "@/components/ui/CategoryCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-meta";
import { categories } from "@/data/categories";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata = pageMetadata("/categories");

export default function CategoriesPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Categories
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
        Choose a topic and start learning with structured, practical tutorials.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            count={getArticlesByCategory(category.slug).length}
          />
        ))}
      </div>
    </div>
  );
}
