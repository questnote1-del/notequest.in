"use client";

import { useState } from "react";

export default function FAQ({ items, title = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.question}
                </span>
                <span className="shrink-0 text-blue-600" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
