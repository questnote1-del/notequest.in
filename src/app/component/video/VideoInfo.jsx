"use client";

export default function VideoInfo({ video }) {
  if (!video) return null;

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold leading-tight text-white">
        {video.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <span>{video.views} views</span>

        <span>•</span>

        <span>{video.publishedAt}</span>

        <span>•</span>

        <span className="text-blue-400">{video.category}</span>
      </div>

      <div className="mt-5 rounded-xl bg-white/[0.03] p-4">
        <p className="text-sm leading-6 text-gray-300">
          {video.description}
        </p>
      </div>
    </div>
  );
}