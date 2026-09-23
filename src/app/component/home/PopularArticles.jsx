import ArticleCard from "../article/ArticleCard";
import { popularArticles } from "../../data/homeData";

export default function PopularArticles() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-medium">Most Read</p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Popular Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
}