import { notFound } from "next/navigation";

import { getVideoBySlug, getSuggestedVideos } from "@/data/videos";

import VideoPlayer from "@/app/component/video/VideoPlayer";
import SuggestedVideos from "@/app/component/video/SuggestedVideos";
import VideoInfo from "@/app/component/video/VideoInfo";
import VideoActions from "@/app/component/video/VideoActions";
import VideoDescription from "@/app/component/video/VideoDescription";
import Comment from "@/app/component/video/Comments";

export default async function VideoWatchPage({ params }) {
  const { slug } = await params;

  const video = getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const suggestedVideos = getSuggestedVideos(slug);

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main Video Section */}
          <section>
            {/* Video Player */}
            <VideoPlayer video={video} />

            {/* Video Information */}
            <VideoInfo video={video} />

            {/* Actions */}
            <VideoActions video={video} />

            {/* Description */}
            <VideoDescription video={video} />

            {/* Comments */}
            <Comment />
          </section>

          {/* Suggested Videos */}
          <aside>
            <SuggestedVideos
              videos={suggestedVideos}
              currentVideo={video}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}