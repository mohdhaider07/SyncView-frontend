import { getYouTubeVideoId } from "@/utils/utils";

function VideoList({
  videoUrls,
  setSelectedVideo,
}: {
  videoUrls: string[];
  setSelectedVideo: (url: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {videoUrls.map((url, index) => (
        <div
          onClick={() => setSelectedVideo(url)}
          key={index}
          className="flex cursor-pointer"
        >
          <img
            className="object-fill rounded w-24 aspect-[16/10] mr-2"
            src={`https://img.youtube.com/vi/${getYouTubeVideoId(
              url
            )}/default.jpg`}
            alt="Video Thumbnail"
          />
          <p className="w-48 text-sm text-gray-600 break-all text-wrap">{url}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
