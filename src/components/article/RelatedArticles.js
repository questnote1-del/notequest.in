import Link from "next/link";
import ArticleCard from "@/components/article/ArticleCard";

export default function RelatedArticles({ articles }) {
  if (!articles?.length) return null;

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Related Articles
        </h2>
        <Link
          href="/articles"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
