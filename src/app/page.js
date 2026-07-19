import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/article/ArticleCard";
import CategoryCard from "@/components/ui/CategoryCard";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/ui/FAQ";
import AdUnit from "@/components/ui/AdUnit";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { categories, parentCategories } from "@/data/categories";
import {
  getFeaturedArticles,
  getLatestArticles,
  getPopularArticles,
  getArticlesByCategory,
} from "@/lib/articles";

const homeFaqs = [
  {
    question: "What is NoteQuest?",
    answer:
      "NoteQuest is an educational blog that teaches programming, computer science, and technology through practical, beginner-friendly guides. We cover JavaScript, React, Next.js, Node.js, databases, DSA, system design, and interview preparation.",
  },
  {
    question: "Is NoteQuest free to use?",
    answer:
      "Yes. All tutorials and guides on NoteQuest are free to read. Our goal is to make high-quality technical education accessible to everyone.",
  },
  {
    question: "Who writes the articles on NoteQuest?",
    answer:
      "Articles are written by the NoteQuest Editorial Team and contributing engineers with real-world experience in frontend, backend, and computer science education.",
  },
  {
    question: "How often is new content published?",
    answer:
      "We regularly publish new tutorials and update existing guides to keep content accurate and useful for learners preparing for jobs and interviews.",
  },
  {
    question: "Can I suggest a topic?",
    answer:
      "Absolutely. Use the Contact page to suggest topics or share feedback. We prioritize requests that help learners build practical skills.",
  },
];

export default function HomePage() {
  const featured = getFeaturedArticles(4);
  const latest = getLatestArticles(6);
  const popular = getPopularArticles(6);
  const interviewArticles = getArticlesByCategory("interview-questions").slice(0, 4);
  const trending = getLatestArticles(8).filter((a) =>
    ["javascript", "react", "nextjs", "nodejs", "dsa"].includes(a.category)
  ).slice(0, 4);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-white dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.12),_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Image
            src="/logo.png"
            alt="NoteQuest"
            width={320}
            height={81}
            priority
            className="h-auto w-[220px] sm:w-[280px] lg:w-[320px]"
          />
          <h1 className="mt-6 max-w-3xl text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Practical tutorials on JavaScript, React, Next.js, Node.js, databases,
            DSA, and system design — written for learners who want clarity and real skills.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Articles
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Featured Articles
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Editor picks to start your learning journey.
              </p>
            </div>
            <Link href="/articles" className="hidden text-sm font-medium text-blue-600 hover:underline sm:block">
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} featured />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Fresh guides published for learners and professionals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Popular Articles
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Most-read tutorials trusted by our community.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <AdUnit type="display" />

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Programming Categories
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Explore topics across frontend, backend, databases, and CS fundamentals.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {parentCategories.map((parent) => (
              <Link
                key={parent.slug}
                href={`/${parent.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {parent.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                  {parent.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={getArticlesByCategory(category.slug).length}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Trending Tutorials
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              High-demand topics in modern web development.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Interview Questions
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Prepare for technical interviews with clear explanations.
              </p>
            </div>
            <Link
              href="/interview-questions"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {interviewArticles.length
              ? interviewArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))
              : popular.slice(0, 2).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
          </div>
        </section>

        <AdUnit type="display" />
        <Newsletter />
        <FAQ items={homeFaqs} />
      </div>
    </>
  );
}
