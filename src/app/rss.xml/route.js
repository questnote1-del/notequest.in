import { Feed } from "feed";
import { siteConfig } from "@/data/site";
import { getAllArticles } from "@/lib/articles";

export async function GET() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.language,
    image: `${siteConfig.url}/logo.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.email,
      link: siteConfig.author.url,
    },
  });

  getAllArticles()
    .slice(0, 50)
    .forEach((article) => {
      feed.addItem({
        title: article.title,
        id: `${siteConfig.url}/articles/${article.slug}`,
        link: `${siteConfig.url}/articles/${article.slug}`,
        description: article.description,
        content: article.description,
        author: [
          {
            name: article.authorData?.name || siteConfig.author.name,
            email: siteConfig.email,
          },
        ],
        date: new Date(article.publishedAt),
        category: [{ name: article.categoryName }],
      });
    });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
