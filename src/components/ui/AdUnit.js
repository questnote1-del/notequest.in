"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_ENABLED,
  AD_SLOTS,
} from "@/data/adsense";

/**
 * Renders a live AdSense unit. Script is loaded once from the root layout.
 * @param {"display"|"inArticle"|"multiplex"|"sidebar"} type
 */
export default function AdUnit({ type = "display", className = "" }) {
  const insRef = useRef(null);
  const config = AD_SLOTS[type];

  useEffect(() => {
    if (!ADSENSE_ENABLED || !config || !insRef.current) return;
    if (insRef.current.getAttribute("data-adsbygoogle-status")) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may throw if the script is blocked or not yet ready.
    }
  }, [config]);

  if (!ADSENSE_ENABLED || !config) return null;

  return (
    <aside
      className={`overflow-hidden ${className}`}
      aria-label="Advertisement"
      data-ad-type={type}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={config.slot}
        {...config.attrs}
      />
    </aside>
  );
}
