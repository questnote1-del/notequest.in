"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        500
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        An unexpected error occurred. Please try again, or return to the homepage.
      </p>
      {process.env.NODE_ENV === "development" && error?.message && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-left text-xs text-red-700 dark:bg-red-950 dark:text-red-300">
          {error.message}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
