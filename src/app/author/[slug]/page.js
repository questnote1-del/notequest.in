import { notFound } from "next/navigation";
import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, authorSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-meta";
import { authors, getAuthorBySlug } from "@/data/authors";
import { getArticlesByAuthor } from "@/lib/articles";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };
  return pageMetadata(`/author/${author.slug}`, {
    title: `${author.name} — Author`,
    description: author.bio,
  });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const articles = getArticlesByAuthor(author.slug);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: author.name, href: `/author/${author.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), authorSchema(author)]} />
      <Breadcrumb items={breadcrumbs} />

      <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {author.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {author.name}
            </h1>
            <p className="mt-1 text-blue-600 dark:text-blue-400">{author.role}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-400">
              {author.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {author.expertise.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Articles by {author.name}
        </h2>
        <p className="mt-2 text-sm text-slate-500">{articles.length} articles</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
