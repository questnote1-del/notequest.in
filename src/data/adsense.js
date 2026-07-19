/**
 * Google AdSense configuration for NoteQuest.
 */
export const ADSENSE_CLIENT = "ca-pub-7940657688703813";
export const ADSENSE_ENABLED = true;

/** Ad unit slot IDs from AdSense. */
export const AD_SLOTS = {
  /** Responsive display — after 2–3 sections */
  display: {
    slot: "7008827676",
    style: { display: "block" },
    attrs: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true",
    },
  },
  /** In-article — every 2–3 paragraphs on blog posts */
  inArticle: {
    slot: "5535395685",
    style: { display: "block", textAlign: "center" },
    attrs: {
      "data-ad-layout": "in-article",
      "data-ad-format": "fluid",
    },
  },
  /** Multiplex — above footer on all pages */
  multiplex: {
    slot: "8984374460",
    style: { display: "block" },
    attrs: {
      "data-ad-format": "autorelaxed",
    },
  },
  /** Vertical — blog right sidebar */
  sidebar: {
    slot: "1951942118",
    style: { display: "block" },
    attrs: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true",
    },
  },
};
