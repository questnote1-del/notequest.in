import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "NoteQuest disclaimer regarding educational content accuracy, external links, and professional advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 1, 2026</p>
      <div className="prose prose-slate mt-6 dark:prose-invert">
        <p>
          The information on {siteConfig.name} is provided for general
          educational purposes only.
        </p>
        <h2>Educational Content</h2>
        <p>
          While we strive for accuracy, technology changes quickly. Code
          examples, APIs, and best practices may become outdated. Always verify
          critical information against official documentation before using it in
          production.
        </p>
        <h2>No Professional Advice</h2>
        <p>
          Content related to careers, interviews, or learning paths is
          informational and does not constitute professional career, legal, or
          financial advice.
        </p>
        <h2>External Links</h2>
        <p>
          Our articles may link to third-party websites. We are not responsible
          for the content, privacy practices, or availability of external sites.
        </p>
        <h2>Errors and Omissions</h2>
        <p>
          Despite careful editing, mistakes can occur. If you find an error,
          please <a href="/contact">contact us</a> so we can correct it.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          {siteConfig.name} and its authors are not liable for any damages
          arising from the use of information on this website.
        </p>
      </div>
    </div>
  );
}
