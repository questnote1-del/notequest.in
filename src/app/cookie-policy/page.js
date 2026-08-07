import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-meta";
import { siteConfig } from "@/data/site";

export const metadata = pageMetadata("/cookie-policy");

export default function CookiePolicyPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 1, 2026</p>
      <div className="prose prose-slate mt-6 dark:prose-invert">
        <p>
          This Cookie Policy explains how {siteConfig.name} uses cookies and
          similar technologies on {siteConfig.domain}.
        </p>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help sites remember preferences and understand traffic.
        </p>
        <h2>Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Essential cookies:</strong> required for basic site
            functionality (e.g., theme preference)
          </li>
          <li>
            <strong>Analytics cookies:</strong> help us understand how visitors
            use the site
          </li>
          <li>
            <strong>Advertising cookies:</strong> used by partners such as Google
            AdSense to deliver relevant ads
          </li>
        </ul>
        <h2>Managing Cookies</h2>
        <p>
          You can control cookies through your browser settings. Blocking some
          cookies may affect site features. For Google ads personalization,
          visit Google&apos;s Ads Settings.
        </p>
        <h2>More Information</h2>
        <p>
          See our <a href="/privacy-policy">Privacy Policy</a> for broader data
          practices, or contact{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
