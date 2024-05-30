import { publicRequest } from "@/requestMethods";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import { SocketProvider } from "@/context/SocketContext";
import VideoList from "./components/VideoList";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

function Room() {
  const { toast } = useToast();
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [videoList, setVideoList] = useState<string[]>([]);

  const [tempVideoUrl, setTempVideoUrl] = useState<string>("");

  const routeParams = useParams();
  const roomId = routeParams.roomId;
  const getRoom = async (roomId: string) => {
    try {
      const { data } = await publicRequest.get(`/rooms/${roomId}`);
      setSelectedVideo(data.videoUrl[0]);
      setVideoList(data.videoUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const addVideoUrl = async (url: string) => {
    // check for empty url
    if (!url) {
      toast({
        title: "Video URL is empty",
        description: "Please enter a video URL",
        variant: "destructive",
      });
      return;
    }
    // rooms/roomId  put request to this
    try {
      await publicRequest.put(`/rooms/${roomId}`, { videoUrl: url });
      setVideoList([...videoList, url]);
      setTempVideoUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to call getRoom function
  useEffect(() => {
    if (roomId) getRoom(roomId);
  }, [roomId]);

  // console.log(selectedVideo, roomId);
  return (
    <div className="flex gap-8 p-12 min-h-screen w-full h-full overflow-hidden bg-gray-100">
      {/* left div video will go inside of it */}
      <div className="w-3/4 h-full overflow-hidden">
        {roomId && selectedVideo ? (
          <SocketProvider>
            <VideoPlayer
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              roomId={roomId!}
            />
          </SocketProvider>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-600">
              Loading Video...
            </h1>
          </div>
        )}
      </div>
      {/* right div here we will show all the videos */}
      <div className="p-4 w-1/4 h-full overflow-y-auto bg-white rounded-xl">
        {/* heading video list */}
        <div className="flex flex-col gap-4 items-center justify-center rounded-lg">
          <Input
            type="text"
            value={tempVideoUrl}
            onChange={(e) => setTempVideoUrl(e.target.value)}
            placeholder="Enter Video URL"
            className="placeholder:text-slate-400"
          />
          <button
            onClick={() => addVideoUrl(tempVideoUrl)}
            className="w-full text-white px-4 py-1 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add new
          </button>
        </div>
        {/* video list component */}
        <hr className="my-4"></hr>
        <VideoList videoUrls={videoList} setSelectedVideo={setSelectedVideo} />
      </div>
    </div>
  );
}

export default Room;
