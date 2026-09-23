import Link from "next/link";
import LatestArticles from "./LatestArticles";

const features = [
  {
    name: "Tech Blogs",
    description:
      "Read practical articles and stay updated with the latest technologies, tools, and programming concepts.",
    image: "/hero/blog.png",
  },
  {
    name: "Tutorial Videos",
    description:
      "Learn through easy-to-follow video tutorials and understand programming concepts step by step.",
    image: "/hero/video.png",
  },
  {
    name: "Take Notes",
    description:
      "Save important concepts and create your own notes while learning new programming topics.",
    image: "/hero/notes.png",
  },
  {
    name: "Track Progress",
    description:
      "Keep track of your learning journey and see how much you have completed over time.",
    image: "/hero/progress.png",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HERO CONTENT ================= */}
        <div className="grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-2">

          {/* ================= LEFT CONTENT ================= */}
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Learn • Build • Grow
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-white">
                Learn, Code
              </span>

              <br />

              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Grow, Together.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Your all-in-one platform for learning, building, and growing your
              skills. Join our community of learners and professionals to
              explore tutorials, guides, and resources that will help you
              achieve your goals.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Get Started Together
              </Link>

              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-3xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Explore Content
              </Link>
            </div>
          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative flex min-h-[400px] items-center justify-center">
            <div className="relative h-[420px] w-full max-w-[550px] overflow-hidden">
              <img
                src="https://calvarezg.github.io/assets/developer-using-ai-male.jpg"
                alt="Developer coding"
                className="h-full w-full object-cover opacity-50"
              />

              {/* LEFT FADE */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />

              {/* RIGHT FADE */}
              <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-transparent to-transparent" />

              {/* TOP FADE */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />

              {/* BOTTOM FADE */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* ================= FEATURE CARDS ================= */}
        <div className="grid grid-cols-4 gap-5 pb-10">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
            >
              {/* LOGO */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* NAME */}
              <h3 className="text-xl font-bold text-white">
                {feature.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* ================= LATEST ARTICLES ================= */}
        <LatestArticles />

      </div>
    </section>
  );
}