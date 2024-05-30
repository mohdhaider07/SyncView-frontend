import { getYouTubeVideoId } from "@/utils/utils";

function VideoList({
  videoUrls,
  setSelectedVideo,
}: {
  videoUrls: string[];
  setSelectedVideo: (url: string) => void;
}) {
  return (
    <div>
      {videoUrls.map((url, index) => (
        <div
          onClick={() => setSelectedVideo(url)}
          key={index}
          className="flex items-center cursor-pointer "
        >
          <img
            className="object-contain w-20 h-12 mr-2"
            src={`https://img.youtube.com/vi/${getYouTubeVideoId(
              url
            )}/default.jpg`}
            alt="Video Thumbnail"
          />
          <p className="w-48 text-sm text-gray-600 truncate">{url}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
