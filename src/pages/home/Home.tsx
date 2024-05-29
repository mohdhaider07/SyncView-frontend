import { Input } from "@/components/ui/input";
import { publicRequest } from "@/requestMethods";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://www.youtube.com/watch?v=F8bEEsCNPw8"
  );
  // publicRequest.post request to the server to create the room the funtion will take string url of the video
  // and will return the roomId of the room created
  const navigate = useNavigate();
  const createRoom = async (videoUrl: string) => {
    try {
      const { data } = await publicRequest.post("/rooms", { videoUrl });
      console.log(data);
      navigate(`/room/${data.roomId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-800">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <div className="flex flex-col items-center justify-center w-1/3 p-4 mt-8 bg-gray-700 rounded-lg">
        <Input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter Video URL"
        />
        <button
          onClick={() => createRoom(videoUrl)}
          className="px-4 py-2 mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Create Room
        </button>
      </div>
    </div>
  );
}

export default Home;
