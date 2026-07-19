import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AuthorBox from "@/components/article/AuthorBox";
import TableOfContents from "@/components/article/TableOfContents";
import RelatedArticles from "@/components/article/RelatedArticles";
import CommentPlaceholder from "@/components/article/CommentPlaceholder";
import ReadingProgress from "@/components/article/ReadingProgress";
import AdUnit from "@/components/ui/AdUnit";
import FAQ from "@/components/ui/FAQ";
import MDXContent from "@/components/article/MDXContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildMetadata,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  authorSchema,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.draft) {
    return { title: "Article Not Found" };
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    image: article.coverImage,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.authorData?.name],
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.draft) notFound();

  const related = getRelatedArticles(article, 4);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: article.categoryName, href: `/category/${article.category}` },
    { name: article.title, href: `/articles/${article.slug}` },
  ];

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          articleSchema(article, article.authorData),
          breadcrumbSchema(breadcrumbs),
          authorSchema(article.authorData),
          ...(article.faqs?.length ? [faqSchema(article.faqs)] : []),
        ]}
      />

      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbs} />

        <header className="mx-auto max-w-3xl">
          <Link
            href={`/category/${article.category}`}
            className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            {article.categoryName}
          </Link>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {article.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <Link
              href={`/author/${article.author}`}
              className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200"
            >
              {article.authorData?.name}
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              Published {formatDate(article.publishedAt)}
            </time>
            {article.updatedAt !== article.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={article.updatedAt}>
                  Updated {formatDate(article.updatedAt)}
                </time>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>
          {article.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="mx-auto mt-10 grid max-w-7xl gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <MDXContent source={article.content} />

            {article.faqs?.length > 0 && (
              <div className="my-10">
                <FAQ items={article.faqs} title="Article FAQ" />
              </div>
            )}

            {article.references?.length > 0 && (
              <section className="my-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  References
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
                  {article.references.map((ref) => (
                    <li key={ref.url}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {ref.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="my-10">
              <AuthorBox author={article.authorData} />
            </div>
            <CommentPlaceholder />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <TableOfContents headings={article.headings} />
            <AdUnit type="sidebar" className="min-h-[250px]" />
          </aside>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <RelatedArticles articles={related} />
        </div>
      </article>
    </>
  );
}
