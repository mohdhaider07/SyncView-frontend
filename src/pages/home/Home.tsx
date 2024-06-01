import { Input } from "@/components/ui/input";
import { userRequest } from "@/requestMethods";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext";

function Home() {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://www.youtube.com/watch?v=F8bEEsCNPw8"
  );
  const [roomId, setRoomId] = useState<string>("");
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);
  const navigate = useNavigate();
  const createRoom = async (videoUrl: string) => {
    setIsCreatingRoom(true);
    try {
      if (!videoUrl) {
        toast({
          title: "Video URL is empty",
          description: "Please enter a video URL",
          variant: "destructive",
        });
      }
      const { data } = await userRequest.post("/room/create", { videoUrl });
      toast({
        title: "Created Room Successfully",
        variant: "default",
      });
      navigate(`/room/${data.roomId}`);
      setIsCreatingRoom(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Login to create a room",
        variant: "destructive",
      });
      setIsCreatingRoom(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-transparent">
      <video
        src="video.mp4"
        className="fixed inset-0 object-cover w-full h-full -z-10 backdrop-blur-sm"
        loop
        muted
        autoPlay
      ></video>
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <div className="flex flex-col items-center justify-center w-1/3 p-4 mt-8 bg-transparent rounded-lg">
        <Input
          type="text"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
          }}
          placeholder="Enter Video URL"
          className="text-white placeholder:text-slate-300"
        />
        <div className="flex w-full gap-8">
          <Button
            disabled={isCreatingRoom}
            onClick={() => createRoom(videoUrl)}
            className="w-full px-4 py-2 mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isCreatingRoom ? "Creating Room..." : "Create Room"}
          </Button>
        </div>
      </div>
      <p>OR</p>
      <div className="flex flex-col items-center justify-center w-1/3 p-4 bg-transparent rounded-lg">
        <Input
          type="text"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          placeholder="Enter room id"
          className="text-white placeholder:text-slate-300"
        />
        <div className="flex w-full gap-8">
          <Button
            onClick={() => navigate(`/room/${roomId}`)}
            className="w-full px-4 py-2 mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
