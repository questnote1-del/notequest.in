import ContactForm from "./ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-meta";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <ContactForm />
    </>
  );
}
