import { Input } from "@/components/ui/input";
import { publicRequest } from "@/requestMethods";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function Home() {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://www.youtube.com/watch?v=F8bEEsCNPw8"
  );
  // publicRequest.post request to the server to create the room the funtion will take string url of the video
  // and will return the roomId of the room created
  const navigate = useNavigate();
  const createRoom = async (videoUrl: string) => {
    try {
      if (!videoUrl) {
        toast({
          title: "Video URL is empty",
          description: "Please enter a video URL",
          variant: "destructive",
        });
      }
      const { data } = await publicRequest.post("/rooms", { videoUrl });
      console.log(data);
      navigate(`/room/${data.roomId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-transparent">
      <video
        src="video.mp4"
        className="fixed inset-0 w-full h-full object-cover -z-10 backdrop-blur-sm"
        loop
        muted
        autoPlay
      ></video>
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <div className="flex flex-col items-center justify-center w-1/3 p-4 mt-8  bg-transparent rounded-lg">
        <Input
          type="text"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
          }}
          placeholder="Enter Video URL"
          className="placeholder:text-slate-300 text-white"
        />
        <div className="flex w-full gap-8">
          <button
            onClick={() => createRoom(videoUrl)}
            className="px-4 py-2 w-full mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Create Room
          </button>
          {/* <button
            onClick={() => createRoom(videoUrl)}
            className="px-4 py-2 w-full mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button> */}
        </div>
      </div>
      <p>OR</p>
      <div className="flex flex-col items-center justify-center w-1/3 p-4 bg-transparent rounded-lg">
        <Input
          type="text"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
          }}
          placeholder="Enter room id"
          className="placeholder:text-slate-300 text-white"
        />
        <div className="flex w-full gap-8">
          {/* <button
            onClick={() => createRoom(videoUrl)}
            className="px-4 py-2 w-full mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Create Room
          </button> */}
          <button
            onClick={() => createRoom(videoUrl)}
            className="px-4 py-2 w-full mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
