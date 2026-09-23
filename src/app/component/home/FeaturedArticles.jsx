import ArticleCard from "../article/ArticleCard";
import { featuredArticles } from "../../data/homeData";

export default function FeaturedArticles() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium">Editor's Picks</p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Featured Articles
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
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