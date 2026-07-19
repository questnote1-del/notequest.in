"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("NoteQuest newsletter signup");
    const body = encodeURIComponent(
      `Please add this email to the NoteQuest newsletter list:\n\n${email.trim()}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 dark:border-blue-900 dark:from-blue-950/40 dark:to-slate-900 sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Stay updated with NoteQuest
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Get practical programming tutorials and interview tips delivered to your inbox.
          No spam — unsubscribe anytime.
        </p>

        {status === "success" ? (
          <p
            className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
            role="status"
          >
            Your email app should open so you can confirm the signup request.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-blue-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
