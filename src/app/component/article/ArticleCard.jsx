import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <article className="group border rounded-2xl overflow-hidden">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative h-56">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="p-5">
          <span className="text-sm font-medium">
            {article.category}
          </span>

          <h3 className="text-xl font-semibold mt-2">
            {article.title}
          </h3>

          {article.description && (
            <p className="mt-3 text-sm line-clamp-2">
              {article.description}
            </p>
          )}

          <div className="flex justify-between mt-5 text-sm">
            <span>{article.readTime}</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}