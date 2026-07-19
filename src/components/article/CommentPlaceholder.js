export default function CommentPlaceholder() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Comments</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Comments are coming soon. Meanwhile, share your feedback via our{" "}
        <a href="/contact" className="font-medium text-blue-600 hover:underline">
          contact page
        </a>
        .
      </p>
    </section>
  );
}
