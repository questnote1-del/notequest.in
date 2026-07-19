import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using NoteQuest educational content and website services.",
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Terms & Conditions
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 1, 2026</p>
      <div className="prose prose-slate mt-6 dark:prose-invert">
        <p>
          By accessing {siteConfig.domain}, you agree to these Terms &
          Conditions. If you do not agree, please do not use the site.
        </p>
        <h2>Use of Content</h2>
        <p>
          All original content on NoteQuest is owned by {siteConfig.name} unless
          otherwise stated. You may read and share links for personal,
          non-commercial learning. Reproducing articles in full without
          permission is not allowed.
        </p>
        <h2>Acceptable Use</h2>
        <ul>
          <li>Do not attempt to disrupt or abuse the website</li>
          <li>Do not scrape content at a scale that harms service availability</li>
          <li>Do not misrepresent affiliation with NoteQuest</li>
        </ul>
        <h2>User Submissions</h2>
        <p>
          Messages sent via contact forms should be lawful and respectful. We
          may use feedback to improve the site.
        </p>
        <h2>Advertising</h2>
        <p>
          The site may display third-party advertisements. Ad content is the
          responsibility of the respective advertisers.
        </p>
        <h2>Disclaimer of Warranties</h2>
        <p>
          The website is provided &quot;as is&quot; without warranties of any
          kind, express or implied.
        </p>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of India, without regard to
          conflict of law principles.
        </p>
        <h2>Contact</h2>
        <p>
          For questions about these terms, email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
