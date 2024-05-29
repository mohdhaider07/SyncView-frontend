import { publicRequest } from "@/requestMethods";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import { SocketProvider } from "@/context/SocketContext";
function Room() {
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  const routeParams = useParams();
  const roomId = routeParams.roomId;
  const getRoom = async (roomId: string) => {
    try {
      const { data } = await publicRequest.get(`/rooms/${roomId}`);
      setSelectedVideo(data.videoUrl[0]);
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
    <div>
      {/* left div video will go inside of it */}
      <div>
        {roomId && selectedVideo ? (
          <SocketProvider>
            <VideoPlayer selectedVideo={selectedVideo} roomId={roomId!} />
          </SocketProvider>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {/* right div here we will show all the videos */}
      <div></div>
    </div>
  );
}

export default Room;
