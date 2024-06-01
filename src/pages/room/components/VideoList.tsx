import { getYouTubeVideoId } from "@/utils/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { userRequest } from "@/requestMethods";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
function VideoList({
  videoUrls,
  setSelectedVideo,
  selectedVideo,
  roomId,
  setVideoList,
}: {
  videoUrls: string[];
  roomId: string;
  setSelectedVideo: (url: string) => void;
  selectedVideo: string;
  setVideoList: (videoUrls: string[]) => void;
}) {
  const { toast } = useToast();
  // isDeleting
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  // delete request room/delete-video/zlw6qzfye
  const deleteVideo = async (url: string) => {
    setIsDeleting(true);
    try {
      await userRequest.delete(`/room/delete-video/${roomId}`, {
        data: { videoUrl: url },
      });
      setVideoList(videoUrls.filter((video) => video !== url));
      toast({
        title: "Video Removed Successfully",
        variant: "default",
      });
      if (selectedVideo === url) {
        if (videoUrls.length > 0 && videoUrls[0] !== url) {
          setSelectedVideo(videoUrls[0]);
        } else {
          setSelectedVideo("");
        }
      }
      setIsDeleting(false);
    } catch (err: any) {
      toast({
        title: "Error Removing Video",
        description: err.message || "Please try again",
        variant: "destructive",
      });
      setIsDeleting(false);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {videoUrls.map((url, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between gap-1 cursor-pointer lg:flex-col xl:flex-row gap-x-4"
        >
          <div onClick={() => setSelectedVideo(url)} className="flex ">
            <img
              className="object-fill rounded w-24 aspect-[16/10] mr-2"
              src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                url
              )}/default.jpg`}
              alt="Video Thumbnail"
            />
            <p className="w-48 text-xs text-gray-600 break-all text-wrap">
              {url}
            </p>
          </div>
          {/* rght side of the div */}
          <div className="w-fit xl:w-fit lg:w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full px-2 py-1 text-xs text-white bg-blue-600 hover:bg-blue-800">
                  Options
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2 w-44">
                <Button
                  disabled={isDeleting}
                  onClick={() => setSelectedVideo(url)}
                  className="w-full text-white "
                >
                  Play Video
                </Button>
                <Button
                  disabled={isDeleting}
                  onClick={() => deleteVideo(url)}
                  className="w-full bg-red-600 hover:bg-red-800"
                >
                  {isDeleting ? "Deleting..." : "Delete Video"}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
