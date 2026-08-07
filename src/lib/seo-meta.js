import seoMeta from "@/data/seo-meta.json";
import { buildMetadata } from "@/lib/seo";

const byPath = new Map(
  seoMeta.map((item) => {
    let path = item.url.replace(/^https?:\/\/[^/]+/, "");
    if (!path) path = "/";
    return [path, item];
  })
);

/**
 * Look up optimized SEO title/description for a site path.
 * @param {string} path e.g. "/", "/about", "/articles/slug"
 */
export function getPageSeo(path = "/") {
  const normalized =
    !path || path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return byPath.get(normalized) || null;
}

/**
 * Build Next.js metadata from the SEO catalog, with optional fallbacks/extras.
 */
export function pageMetadata(path, extras = {}) {
  const seo = getPageSeo(path);
  const { title: fallbackTitle, description: fallbackDescription, ...rest } =
    extras;

  return buildMetadata({
    title: seo?.title || fallbackTitle || "NoteQuest",
    description: seo?.description || fallbackDescription || "",
    path,
    ...rest,
  });
}
