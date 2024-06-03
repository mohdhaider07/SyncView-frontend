import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketContext";
import { getYouTubeVideoId } from "@/utils/utils";
import { useEffect, useState, useRef, useCallback } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function VideoPlayer({
  selectedVideo,
  roomId,
  setSelectedVideo,

  newUrlAdded,
  setNewUrlAdded,
  newUrl,
  setNewUrl,
  videoUrls,
  setVideoUrls,
  // for removing the url
  setUrlRemoved,
  setIsUrlRemoved,
  urlRemoved,
  isUrlRemoved,
  // for toggle the control to other user
  isRoomCreator,
}: {
  selectedVideo: string;
  roomId: string;
  setSelectedVideo: (url: string) => void;
  newUrlAdded: boolean;
  setNewUrlAdded: (value: boolean) => void;
  newUrl: string;
  setNewUrl: (value: string) => void;
  videoUrls: string[];
  setVideoUrls: (value: string[] | ((prev: string[]) => string[])) => void;
  setUrlRemoved: (value: string) => void;
  setIsUrlRemoved: (value: boolean) => void;
  urlRemoved: string;
  isUrlRemoved: boolean;
  isRoomCreator: boolean;
}) {
  // console.log(selectedVideo, roomId);

  const socket = useSocket();
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isControlEnabled, setIsControlEnabled] = useState<boolean>(true);

  const isProgrammaticRef = useRef<boolean>(false); // Use a ref for isProgrammatic flag

  const handlePlay = useCallback((time: number) => {
    // console.log("play", time);
    if (playerRef.current) {
      console.log("handle play before", isProgrammaticRef.current);

      isProgrammaticRef.current = true; // Set the flag before programmatic actions
      // console.log("handle play after", isProgrammaticRef.current);
      playerRef.current.seekTo(time, true);
      // console.log("handle play after seek", isProgrammaticRef.current);
      // isProgrammaticRef.current = true;
      playerRef.current.playVideo();
      // console.log("handle play after playvideo", isProgrammaticRef.current);
    }
    setCurrentTime(time);
  }, []);

  const handlePause = useCallback((time: number) => {
    if (playerRef.current) {
      // console.log("handle pause before", isProgrammaticRef.current);
      isProgrammaticRef.current = true; // Set the flag before programmatic actions
      // console.log("handle pause after", isProgrammaticRef.current);
      playerRef.current.seekTo(time, true);
      // console.log("handle play after seek", isProgrammaticRef.current);
      playerRef.current.pauseVideo();
      // console.log("handle play after pause", isProgrammaticRef.current);
    }
    setCurrentTime(time);
  }, []);

  const handleVideoChange = useCallback((selectedVideo: string) => {
    if (playerRef.current) {
      isProgrammaticRef.current = true; // Set the flag before programmatic actions
      // console.log("changing video", selectedVideo);
      setSelectedVideo(selectedVideo);
    }
    setCurrentTime(0);
  }, []);
  const handleNewUrlAdded = useCallback((newUrl: string) => {
    // console.log("video list length into another user", videoUrls.length),
    setVideoUrls((prevVideoUrls: string[]) => [...prevVideoUrls, newUrl]);
  }, []);

  const handleUrlRemoved = useCallback(
    (urlRemoved: string) => {
      // console.log("url removed", urlRemoved);

      setVideoUrls((prevVideoUrls: string[]) =>
        prevVideoUrls.filter((video) => video !== urlRemoved)
      );

      if (selectedVideo === urlRemoved) {
        const remainingVideos = videoUrls.filter(
          (video) => video !== urlRemoved
        );
        if (remainingVideos.length > 0) {
          setSelectedVideo(remainingVideos[0]);
        } else {
          setSelectedVideo("");
        }
      }
    },
    [selectedVideo, setSelectedVideo, videoUrls, setVideoUrls]
  );

  useEffect(() => {
    if (newUrlAdded && newUrl.length > 0) {
      // console.log("new url socket getting emit", newUrl);
      socket.emit("newUrlAdded", roomId, newUrl);
      setNewUrl("");
      setNewUrlAdded(false);
    }
  }, [newUrlAdded]);

  useEffect(() => {
    if (isUrlRemoved) {
      socket.emit("urlRemoved", roomId, urlRemoved);
      setUrlRemoved("");
      setIsUrlRemoved(false);
    }
  }, [isUrlRemoved]);

  // handle to the toggle control
  const handleControlToggled = useCallback((controlState: boolean) => {
    setIsControlEnabled(controlState);
  }, []);

  // useEffect to register and clean up socket event listeners
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("play", handlePlay);
    socket.on("pause", handlePause);
    socket.on("changeVideo", handleVideoChange);
    socket.on("newUrlAdded", handleNewUrlAdded);
    socket.on("urlRemoved", handleUrlRemoved);
    socket.on("toggleControl", handleControlToggled);

    return () => {
      socket.off("play", handlePlay);
      socket.off("pause", handlePause);
      socket.off("changeVideo", handleVideoChange);
      socket.off("newUrlAdded", handleNewUrlAdded);
      socket.off("urlRemoved", handleUrlRemoved);
      socket.off("toggleControl", handleControlToggled);
    };
  }, [socket, roomId, handlePlay, handlePause]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const onPlay = (event: any) => {
    // console.log("onPlay before", isProgrammaticRef.current);

    if ((isControlEnabled || isRoomCreator) && !isProgrammaticRef.current) {
      // console.log("onPlay inside if", isProgrammaticRef.current);
      const time = event.target.getCurrentTime();
      socket.emit("play", roomId, time);
      setCurrentTime(time);
    }
    isProgrammaticRef.current = false; // Reset the flag after handling
    // console.log("onPlay after changed to false", isProgrammaticRef.current);
  };

  const onPause = (event: any) => {
    // console.log("on Pause before", isProgrammaticRef.current);

    if ((isControlEnabled || isRoomCreator) && !isProgrammaticRef.current) {
      const time = event.target.getCurrentTime();
      // console.log("pause inside if", isProgrammaticRef.current);

      socket.emit("pause", roomId, time);
      setCurrentTime(time);
    }
    setTimeout(() => {
      isProgrammaticRef.current = false; // Reset the flag after handling
      // console.log("onPause after changed to false", isProgrammaticRef.current);
    }, 700); // Adjust the timeout as necessary// Reset the flag after handling
  };

  useEffect(() => {
    if ((isControlEnabled || isRoomCreator) && !isProgrammaticRef.current) {
      socket.emit("changeVideo", roomId, selectedVideo);
      // console.log("changing video", selectedVideo);
    } else {
      isProgrammaticRef.current = false; // Reset the flag after handling
    }
  }, [selectedVideo]);

  //
  const toggleControl = () => {
    console.log("toggle control");
    socket.emit("toggleControl", roomId, !isControlEnabled); // Emit the state change
    setIsControlEnabled((prev) => !prev);
  };

  console.log("Last time video synced at", currentTime);

  return (
    <div>
      {selectedVideo.length > 0 ? (
        <>
          <YouTube
            className="rounded aspect-video"
            iframeClassName="w-full h-full rounded-xl"
            videoId={getYouTubeVideoId(selectedVideo)}
            opts={{ playerVars: { controls: 1 } }}
            onReady={onPlayerReady}
            onPause={onPause}
            onPlay={onPlay}
          />
          {/* show current time */}

          <div>
            {isRoomCreator && (
              <Button
                variant={isControlEnabled ? "destructive" : "default"}
                className="w-full"
                onClick={toggleControl}
              >
                {isControlEnabled
                  ? "Disable Control for Other People"
                  : "Enable Control for All"}
              </Button>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-2xl font-bold text-gray-600">Select a Video</h1>
      )}
    </div>
  );
}

export default VideoPlayer;
