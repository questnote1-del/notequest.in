import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-meta";
import { siteConfig } from "@/data/site";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), organizationSchema()]} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        About NoteQuest
      </h1>
      <div className="prose prose-slate mt-6 dark:prose-invert">
        <p>
          <strong>NoteQuest</strong> ({siteConfig.domain}) is an educational
          website dedicated to teaching programming, computer science, and
          technology through practical, human-readable guides.
        </p>
        <h2>Our Mission</h2>
        <p>
          We believe high-quality technical education should be free, clear, and
          actionable. Whether you are learning JavaScript for the first time,
          preparing for system design interviews, or building your first API with
          Node.js, NoteQuest is built to help you learn with confidence.
        </p>
        <h2>What We Cover</h2>
        <ul>
          <li>Frontend: HTML, CSS, JavaScript, TypeScript, React, Next.js</li>
          <li>Backend: Node.js, Express.js</li>
          <li>Databases: MongoDB, SQL, DBMS</li>
          <li>Computer Science: DSA, System Design, Networks, Operating Systems</li>
          <li>Career & Interviews: preparation guides and practical advice</li>
        </ul>
        <h2>Editorial Standards</h2>
        <p>
          Every article is written to be original, helpful, and accurate. We
          prioritize clarity over jargon, include working code examples, and
          update content when technologies change. Read our{" "}
          <Link href="/editorial-policy">Editorial Policy</Link> for details.
        </p>
        <h2>Contact</h2>
        <p>
          Reach us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or via
          our <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </div>
  );
}
