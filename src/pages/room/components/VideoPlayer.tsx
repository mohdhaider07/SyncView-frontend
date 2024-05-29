import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function VideoPlayer({
  selectedVideo,
  roomId,
}: {
  selectedVideo: string;
  roomId: string;
}) {
  console.log(selectedVideo, roomId);

  const socket = useSocket();

  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("play", (time: number) => {
      if (player) {
        player.seekTo(time, true);
        player.playVideo();
      }
      setCurrentTime(time);
    });

    socket.on("pause", (time: number) => {
      if (player) {
        player.seekTo(time, true);
        player.pauseVideo();
      }
      setCurrentTime(time);
    });

    socket.on("seek", (time: number) => {
      if (player) {
        player.seekTo(time, true);
      }
      setCurrentTime(time);
    });

    return () => {
      socket.off("play");
      socket.off("pause");
      socket.off("seek");
    };
  }, [player]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onPlay = (event: any) => {
    const time = event.target.getCurrentTime();
    socket.emit("play", roomId, time);
    setCurrentTime(time);
  };

  const onPause = (event: any) => {
    const time = event.target.getCurrentTime();
    socket.emit("pause", roomId, time);
    setCurrentTime(time);
  };
  const onSeek = (event: any) => {
    const time = event.target.getCurrentTime();
    socket.emit("seek", roomId, time);
    setCurrentTime(time);
  };

  return (
    <div>
      <h1>Video Room: {roomId}</h1>
      <YouTube
        videoId={"L1TTNOBbN2k" || undefined}
        opts={{ playerVars: { controls: 1 } }}
        onReady={onPlayerReady}
        onPlay={onPlay}
        onPause={onPause}
        // onStateChange={(event) => {
        //   if (event.data === 1) onPlay(event); // 1 is the code for playing
        //   if (event.data === 2) onPause(event); // 2 is the code for paused
        // }}
      />
      <p>Current Time: {currentTime}s</p>
    </div>
  );
}

export default VideoPlayer;
