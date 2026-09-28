"use client";

export default function VideoPlayer({ video }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-black">
      <video
        className="w-full aspect-video object-cover"
        controls
        playsInline
        poster={video?.thumbnail}
      >
        <source src={video?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}