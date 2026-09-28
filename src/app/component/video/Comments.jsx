"use client";

import { useState } from "react";

export default function Comment() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: comment.trim(),
      },
    ]);

    setComment("");
  };

  return (
    <section className="mt-8 border-t border-white/10 pt-8">
      <h2 className="text-xl font-semibold text-white">
        Comments
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500/50"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Comment
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-white/[0.03] p-4"
          >
            <p className="text-sm leading-6 text-gray-300">
              {item.text}
            </p>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment.
          </p>
        )}
      </div>
    </section>
  );
}