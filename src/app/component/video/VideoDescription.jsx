"use client";

import { useState } from "react";

export default function VideoDescription({ video }) {
  const [expanded, setExpanded] = useState(false);

  if (!video) return null;

  return (
    <div className="mt-5 rounded-xl bg-white/[0.03] p-4">
      <div
        className={`text-sm leading-6 text-gray-300 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {video.description}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-3 text-sm font-medium text-white transition hover:text-blue-400"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}