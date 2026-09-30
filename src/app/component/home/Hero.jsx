import Link from "next/link";
import LatestArticles from "./LatestArticles";

const features = [
  {
    name: "Tech Blogs",
    description:
      "Read practical articles and stay updated with the latest technologies, tools, and programming concepts.",
    image: "/hero/blog.png",
    href: "/articles",
  },
  {
    name: "Tutorial Videos",
    description:
      "Learn through easy-to-follow video tutorials and understand programming concepts step by step.",
    image: "/hero/video.png",
    href: "/videos",
  },
  {
    name: "Take Notes",
    description:
      "Save important concepts and create your own notes while learning new programming topics.",
    image: "/hero/notes.png",
    href: "/notes",
  },
  {
    name: "Track Progress",
    description:
      "Keep track of your learning journey and see how much you have completed over time.",
    image: "/hero/progress.png",
    href: "/progress",
  },
];

export default function Hero() {
  return (
    <section className="bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      {/* HERO */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[560px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          {/* LEFT */}
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Learn • Build • Grow
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Learn the skills.
              <br />
              <span className="text-blue-600 dark:text-blue-400">
                Build your future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
              Learn programming through practical articles, tutorials, notes,
              and developer-focused resources designed to help you build
              real-world skills.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>

              <Link
                href="/articles"
                className="inline-flex items-center justify-center border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                Explore Courses
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Practical learning</span>
              <span>Developer focused</span>
              <span>Learn at your pace</span>
            </div>
          </div>

          {/* RIGHT */}
          
<div className="relative flex items-center justify-center lg:-mr-20">
  <div className="relative w-full max-w-[620px]">
    <img
      src="https://calvarezg.github.io/assets/developer-using-ai-male.jpg"
      alt="Developer learning and coding"
      className="h-[380px] w-full object-cover object-center sm:h-[440px]"
    />

    {/* Blend into page */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent dark:from-slate-950 dark:via-slate-950/10 dark:to-transparent" />

    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950" />

    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-slate-950/20" />
  </div>
</div>
        </div>

        {/* LEARNING AREAS */}
        <div className="border-t border-slate-200 py-12 dark:border-slate-800">
          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore learning areas
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Choose how you want to learn and start building your skills.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-slate-800">
            {features.map((feature) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="group bg-white p-6 transition-colors hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center bg-blue-50 dark:bg-blue-500/10">
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {feature.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <LatestArticles />
      </div>
    </section>
  );
}