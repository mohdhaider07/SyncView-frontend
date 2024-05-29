import { useSocket } from "@/context/SocketContext";
import { getYouTubeVideoId } from "@/utils/utils";
import { useEffect, useState, useRef, useCallback } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function VideoPlayer({
  selectedVideo,
  roomId,
  setSelectedVideo,
}: {
  selectedVideo: string;
  roomId: string;
  setSelectedVideo: (url: string) => void;
}) {
  console.log(selectedVideo, roomId);

  const socket = useSocket();
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const isProgrammaticRef = useRef<boolean>(false); // Use a ref for isProgrammatic flag

  const handlePlay = useCallback((time: number) => {
    // console.log("play", time);
    if (playerRef.current) {
      isProgrammaticRef.current = true; // Set the flag before programmatic actions

      playerRef.current.seekTo(time, true);
      playerRef.current.playVideo();
    }
    setCurrentTime(time);
  }, []);

  const handlePause = useCallback((time: number) => {
    if (playerRef.current) {
      isProgrammaticRef.current = true; // Set the flag before programmatic actions

      playerRef.current.seekTo(time, true);
      playerRef.current.pauseVideo();
    }
    setCurrentTime(time);
  }, []);

  const handleVideoChange = useCallback((selectedVideo: string) => {
    if (playerRef.current) {
      console.log("changing video", selectedVideo);
      setSelectedVideo(selectedVideo);
    }
    setCurrentTime(0);
  }, []);

  // useEffect to register and clean up socket event listeners
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("play", handlePlay);
    socket.on("pause", handlePause);

    socket.on("changeVideo", handleVideoChange);

    return () => {
      socket.off("play", handlePlay);
      socket.off("pause", handlePause);
    };
  }, [socket, roomId, handlePlay, handlePause]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const onPlay = (event: any) => {
    if (!isProgrammaticRef.current) {
      const time = event.target.getCurrentTime();
      socket.emit("play", roomId, time);
      setCurrentTime(time);
    }
    isProgrammaticRef.current = false; // Reset the flag after handling
  };

  const onPause = (event: any) => {
    if (!isProgrammaticRef.current) {
      const time = event.target.getCurrentTime();
      socket.emit("pause", roomId, time);
      setCurrentTime(time);
    }
    isProgrammaticRef.current = false; // Reset the flag after handling
  };
  // when ever selected video changes it should  emit the event to all the users in the room
  useEffect(() => {
    socket.emit("changeVideo", roomId, selectedVideo);
    console.log("changing video", selectedVideo);
  }, [selectedVideo]);

  return (
    <div>
      <YouTube
        className="w-full h-96"
        videoId={getYouTubeVideoId(selectedVideo)}
        opts={{ playerVars: { controls: 1 } }}
        onReady={onPlayerReady}
        onPause={onPause}
        onPlay={onPlay}
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
