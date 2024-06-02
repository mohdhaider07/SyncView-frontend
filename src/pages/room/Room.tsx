import { publicRequest, userRequest } from "@/requestMethods";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import { SocketProvider } from "@/context/SocketContext";
import VideoList from "./components/VideoList";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

function Room() {
  const { toast } = useToast();
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [videoList, setVideoList] = useState<string[]>([]);
  // thisis the variable to store the new url
  const [newUrl, setNewUrl] = useState<string>("");
  // url which is removed
  const [urlRemoved, setUrlRemoved] = useState<string>("");
  // loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // thisis the the flag to check url is added
  const [newUrlAdded, setNewUrlAdded] = useState<boolean>(false);
  // this is the flag to check if the url is removed
  const [isUrlRemoved, setIsUrlRemoved] = useState<boolean>(false);

  const [isGettingRoom, setIsGettingRoom] = useState<boolean>(false);

  const routeParams = useParams();
  const roomId = routeParams.roomId;
  const getRoom = async (roomId: string) => {
    setIsGettingRoom(true);
    console.log("getting room");
    try {
      const { data } = await publicRequest.get(`/room/${roomId}`);
      if (data.videoUrl.length > 0) {
        setSelectedVideo(data.videoUrl[0]);
      } else {
        setSelectedVideo("");
      }
      setVideoList(data.videoUrl);
      setIsGettingRoom(false);
    } catch (err: any) {
      setIsGettingRoom(false);
      console.log(err);
      toast({
        title: "Error",
        description:
          err.message || "Something went wrong while getting the room",
        variant: "destructive",
      });
    }
  };

  const addVideoUrl = async (url: string) => {
    // check for empty url
    setIsLoading(true);
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
      await userRequest.put(`/room/${roomId}/addVideo`, { videoUrl: url });
      setVideoList([...videoList, url]);
      toast({
        title: "Video Added Successfully",
        variant: "default",
      });
      setNewUrlAdded(true);
      setIsLoading(false);
    } catch (err: any) {
      toast({
        title: "Error Adding Video",
        description: err.message || "Please try again",
        variant: "destructive",
      });
      setIsLoading(false);
      console.log(err);
    }
  };

  // useEffect to call getRoom function
  useEffect(() => {
    if (roomId) getRoom(roomId);
  }, [roomId]);

  // console.log(selectedVideo, roomId);
  return (
    <div className="flex flex-col w-full h-full min-h-screen gap-8 p-12 overflow-hidden bg-gray-100 lg:flex-row">
      {/* left div video will go inside of it */}
      <div className="h-full overflow-hidden lg:w-3/4">
        {roomId && !isGettingRoom ? (
          <SocketProvider>
            <VideoPlayer
              newUrlAdded={newUrlAdded}
              setNewUrlAdded={setNewUrlAdded}
              newUrl={newUrl}
              setNewUrl={setNewUrl}
              videoUrls={videoList}
              setVideoUrls={setVideoList}
              // for removing the url
              setUrlRemoved={setUrlRemoved}
              setIsUrlRemoved={setIsUrlRemoved}
              urlRemoved={urlRemoved}
              isUrlRemoved={isUrlRemoved}
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
      <div className="h-full p-4 overflow-y-auto bg-white lg:w-1/4 rounded-xl">
        {/* heading video list */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg">
          <Input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter Video URL"
            className="placeholder:text-slate-400"
          />
          <Button
            onClick={() => addVideoUrl(newUrl)}
            disabled={isLoading}
            className="w-full px-4 py-1 text-white rounded-md "
          >
            {isLoading ? "Adding Video..." : "Add Video"}
          </Button>
        </div>
        {/* video list component */}
        <hr className="my-4"></hr>
        <VideoList
          selectedVideo={selectedVideo}
          videoUrls={videoList}
          roomId={roomId!}
          setUrlRemoved={setUrlRemoved}
          setIsUrlRemoved={setIsUrlRemoved}
          setVideoList={setVideoList}
          setSelectedVideo={setSelectedVideo}
        />
      </div>
    </div>
  );
}

export default Room;
