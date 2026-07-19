import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Editorial Policy",
  description:
    "NoteQuest editorial standards for accuracy, originality, updates, corrections, and educational quality.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Editorial Policy", href: "/editorial-policy" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Editorial Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 1, 2026</p>
      <div className="prose prose-slate mt-6 dark:prose-invert">
        <p>
          NoteQuest publishes original educational content designed to help
          learners build practical programming and computer science skills.
        </p>
        <h2>Content Standards</h2>
        <ul>
          <li>Articles must be original and written for human learners</li>
          <li>Explanations should be clear, accurate, and actionable</li>
          <li>Code examples should be correct and easy to follow</li>
          <li>We avoid duplicate, scraped, or doorway content</li>
        </ul>
        <h2>Fact-Checking & Updates</h2>
        <p>
          Authors verify technical claims against official documentation when
          possible. Articles include published and updated dates. Significant
          corrections are reflected in the updated date.
        </p>
        <h2>Corrections</h2>
        <p>
          If you spot an error, contact us via the{" "}
          <a href="/contact">Contact page</a>. We investigate and correct
          material mistakes promptly.
        </p>
        <h2>Sponsorship & Ads</h2>
        <p>
          Editorial content is independent of advertising. Ad placeholders are
          clearly labeled. Sponsored content, if ever published, will be
          disclosed.
        </p>
        <h2>Attribution</h2>
        <p>
          External references and documentation links are credited in article
          reference sections where applicable.
        </p>
      </div>
    </div>
  );
}
