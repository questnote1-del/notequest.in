"use client";

import { useState } from "react";

export default function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "code";
  const code = typeof children === "string" ? children : children?.props?.children || "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(code).replace(/\n$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="not-prose group relative my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-block-pre m-0 overflow-x-auto bg-slate-950 p-4 text-sm leading-relaxed text-slate-100">
        <code className={`code-block-code text-slate-100 ${className || ""}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
