export default function AdPlaceholder({ slot = "in-article", className = "" }) {
  return (
    <aside
      className={`flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-slate-900 ${className}`}
      aria-label="Advertisement placeholder"
      data-ad-slot={slot}
    >
      <div className="px-4 py-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Advertisement
        </p>
        <p className="mt-1 text-xs text-slate-400">
          AdSense placeholder — {slot}
        </p>
      </div>
    </aside>
  );
}
