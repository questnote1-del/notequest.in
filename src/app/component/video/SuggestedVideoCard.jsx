"use client";

export default function SuggestedVideoCard({ video }) {
  if (!video) return null;

  return (
    <div className="group flex cursor-pointer gap-3 rounded-xl p-2 transition hover:bg-white/5">
      <div className="relative w-36 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
          {video.duration}
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-medium leading-5 text-white">
          {video.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {video.views} views
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {video.publishedAt}
        </p>
      </div>
    </div>
  );
}