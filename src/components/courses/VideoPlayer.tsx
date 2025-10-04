interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  return (
    <div className="video-container rounded-lg overflow-hidden bg-black aspect-video">
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
