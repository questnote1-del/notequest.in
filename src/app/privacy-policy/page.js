import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the NoteQuest Privacy Policy to understand how we collect, use, and protect your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 1, 2026</p>
      <div className="prose prose-slate mt-6 dark:prose-invert">
        <p>
          This Privacy Policy explains how {siteConfig.name} (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
          information when you visit {siteConfig.domain}.
        </p>
        <h2>Information We Collect</h2>
        <p>We may collect:</p>
        <ul>
          <li>Information you provide voluntarily (name, email via contact or newsletter forms)</li>
          <li>Usage data such as pages visited, referral sources, and device/browser type</li>
          <li>Cookies and similar technologies for analytics and advertising</li>
        </ul>
        <h2>How We Use Information</h2>
        <ul>
          <li>To operate and improve the website</li>
          <li>To respond to inquiries and send requested newsletters</li>
          <li>To understand content performance and user experience</li>
          <li>To display relevant advertisements (e.g., Google AdSense)</li>
        </ul>
        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics and Google
          AdSense. These providers may use cookies to serve ads based on prior
          visits. You can manage ad personalization via Google Ads Settings.
        </p>
        <h2>Cookies</h2>
        <p>
          Cookies help us remember preferences and measure traffic. See our{" "}
          <a href="/cookie-policy">Cookie Policy</a> for details. You can
          disable cookies in your browser settings.
        </p>
        <h2>Data Retention</h2>
        <p>
          We retain personal information only as long as needed for the purposes
          described in this policy, or as required by law.
        </p>
        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may request access, correction, or
          deletion of your personal data. Contact us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
        <h2>Children&apos;s Privacy</h2>
        <p>
          NoteQuest is not directed at children under 13. We do not knowingly
          collect personal information from children.
        </p>
        <h2>Changes</h2>
        <p>
          We may update this policy periodically. The &quot;Last updated&quot;
          date at the top reflects the latest revision.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
