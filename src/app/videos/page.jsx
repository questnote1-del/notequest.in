import Link from "next/link";
import { videos } from "@/data/videos";

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-cyan-400">
            NoteQuest Videos
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Learn with Videos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Learn React, JavaScript and other development concepts through
            beginner-friendly video lessons.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="group overflow-hidden rounded-2xl bg-[#111827] transition duration-300 hover:-translate-y-1 hover:bg-[#151f32]"
            >
              <div className="relative aspect-video overflow-hidden bg-[#1a2233]">
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl text-gray-500 transition group-hover:text-cyan-400">
                    ▶
                  </span>
                </div>

                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium">
                  {video.duration}
                </span>
              </div>

              <div className="p-4">
                <div className="mb-2 text-xs font-medium text-cyan-400">
                  {video.category}
                </div>

                <h2 className="line-clamp-2 text-base font-semibold leading-6 transition group-hover:text-cyan-400">
                  {video.title}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.publishedAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}