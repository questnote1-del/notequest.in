"use client";

export default function VideoActions({ video }) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: video?.title,
          text: video?.description,
          url,
        });
      } catch (error) {
        // User cancelled the share dialog.
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Video link copied!");
    }
  };

  const handleDownload = () => {
    if (!video?.videoUrl) return;

    const link = document.createElement("a");
    link.href = video.videoUrl;
    link.download = `${video.title}.mp4`;
    link.target = "_blank";
    link.click();
  };

  const handlePlaylist = () => {
    alert("Add to playlist feature coming soon.");
  };

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
      <button
        onClick={handleShare}
        className="rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
      >
        Share
      </button>

      <button
        onClick={handlePlaylist}
        className="rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
      >
        Add to playlist
      </button>

      <button
        onClick={handleDownload}
        className="rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
      >
        Download
      </button>
    </div>
  );
}