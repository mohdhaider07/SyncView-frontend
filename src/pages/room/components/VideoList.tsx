import { getYouTubeVideoId } from "@/utils/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { userRequest } from "@/requestMethods";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
function VideoList({
  videoUrls,
  setSelectedVideo,
  selectedVideo,
  roomId,
  setVideoList,
  /**  setUrlRemoved={setUrlRemoved}
          setIsUrlRemoved={setIsUrlRemoved} */
  setUrlRemoved,
  setIsUrlRemoved,
}: {
  videoUrls: string[];
  roomId: string;
  setSelectedVideo: (url: string) => void;
  selectedVideo: string;
  setVideoList: (videoUrls: string[]) => void;
  setUrlRemoved: (url: string) => void;
  setIsUrlRemoved: (value: boolean) => void;
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
      toast({
        title: "Video Removed Successfully",
        variant: "default",
      });
      setVideoList(videoUrls.filter((video) => video !== url));

      if (selectedVideo == url) {
        const remainingVideos = videoUrls.filter((video) => video != url);

        if (remainingVideos.length > 0) {
          setSelectedVideo(remainingVideos[0]);
        } else {
          setSelectedVideo("");
        }
      }
      setIsDeleting(false);
      // for the url removed
      setUrlRemoved(url);
      setIsUrlRemoved(true);
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

  useEffect(() => {
    console.log("videoUrls in video list components", videoUrls);
  }, [videoUrls]);

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
          <div key={index} className="w-fit xl:w-fit lg:w-full">
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
