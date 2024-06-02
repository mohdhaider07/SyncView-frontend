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
  /*   setUrlRemoved={setUrlRemoved}
              setIsUrlRemoved={setIsUrlRemoved}
              urlRemoved={urlRemoved}
              isUrlRemoved={isUrlRemoved} */
  setUrlRemoved,
  setIsUrlRemoved,
  urlRemoved,
  isUrlRemoved,
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
}) {
  // console.log(selectedVideo, roomId);

  const socket = useSocket();
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const isProgrammaticRef = useRef<boolean>(false); // Use a ref for isProgrammatic flag

  const handlePlay = useCallback((time: number) => {
    // console.log("play", time);
    if (playerRef.current) {
      // console.log("handle play before", isProgrammaticRef.current);

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
      console.log("handle pause before", isProgrammaticRef.current);
      isProgrammaticRef.current = true; // Set the flag before programmatic actions
      console.log("handle pause after", isProgrammaticRef.current);
      playerRef.current.seekTo(time, true);
      console.log("handle play after seek", isProgrammaticRef.current);
      playerRef.current.pauseVideo();
      console.log("handle play after pause", isProgrammaticRef.current);
    }
    setCurrentTime(time);
  }, []);

  const handleVideoChange = useCallback((selectedVideo: string) => {
    if (playerRef.current) {
      isProgrammaticRef.current = true; // Set the flag before programmatic actions
      console.log("changing video", selectedVideo);
      setSelectedVideo(selectedVideo);
    }
    setCurrentTime(0);
  }, []);

  // const handleNewUrlAdded = (newUrl: string) => {
  //   console.log("video list length into another user", videoUrls.length + 1);
  //   console.log(videoUrls, newUrl);
  //   setVideoUrls([...videoUrls, newUrl]);
  // };

  const handleNewUrlAdded = useCallback(
    (newUrl: string) => {
      setVideoUrls((prevVideoUrls: string[]) => [...prevVideoUrls, newUrl]);
    },
    [setVideoUrls]
  );

  const handleUrlRemoved = (urlRemoved: string) => {
    console.log("url removed", urlRemoved);
    setVideoUrls(videoUrls.filter((video) => video !== urlRemoved));
    if (selectedVideo === urlRemoved) {
      const remainingVideos = videoUrls.filter((video) => video !== urlRemoved);
      if (remainingVideos.length > 0) {
        setSelectedVideo(remainingVideos[0]);
      } else {
        setSelectedVideo("");
      }
    }
  };
  // const handleUrlRemoved = useCallback((urlRemoved: string) => {
  //   console.log("url removed", urlRemoved);
  //   setVideoList(videoList.filter((video) => video !== urlRemoved));

  //   if (selectedVideo === urlRemoved) {
  //     const remainingVideos = videoList.filter((video) => video !== urlRemoved);
  //     if (remainingVideos.length > 0) {
  //       setSelectedVideo(remainingVideos[0]);
  //     } else {
  //       setSelectedVideo("");
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (newUrlAdded && newUrl.length > 0) {
      socket.emit("newUrlAdded", roomId, newUrl);
      console.log("emited from this user", newUrl);
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

  // useEffect to register and clean up socket event listeners
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("play", handlePlay);
    socket.on("pause", handlePause);
    socket.on("changeVideo", handleVideoChange);
    socket.on("newUrlAdded", handleNewUrlAdded);
    socket.on("urlRemoved", handleUrlRemoved);

    return () => {
      socket.off("play", handlePlay);
      socket.off("pause", handlePause);
      socket.off("changeVideo", handleVideoChange);
    };
  }, [socket, roomId, handlePlay, handlePause]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const onPlay = (event: any) => {
    console.log("onPlay before", isProgrammaticRef.current);
    if (!isProgrammaticRef.current) {
      console.log("onPlay inside if", isProgrammaticRef.current);
      const time = event.target.getCurrentTime();
      socket.emit("play", roomId, time);
      setCurrentTime(time);
    }
    isProgrammaticRef.current = false; // Reset the flag after handling
    console.log("onPlay after changed to false", isProgrammaticRef.current);
  };

  const onPause = (event: any) => {
    console.log("on Pause before", isProgrammaticRef.current);

    if (!isProgrammaticRef.current) {
      const time = event.target.getCurrentTime();
      console.log("pause inside if", isProgrammaticRef.current);

      socket.emit("pause", roomId, time);
      setCurrentTime(time);
    }
    setTimeout(() => {
      isProgrammaticRef.current = false; // Reset the flag after handling
      console.log("onPause after changed to false", isProgrammaticRef.current);
    }, 700); // Adjust the timeout as necessary// Reset the flag after handling
  };

  useEffect(() => {
    if (!isProgrammaticRef.current) {
      socket.emit("changeVideo", roomId, selectedVideo);
      console.log("changing video", selectedVideo);
    } else {
      isProgrammaticRef.current = false; // Reset the flag after handling
    }
  }, [selectedVideo]);

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
          <p>Current Time: {currentTime}s</p>
        </>
      ) : (
        <h1 className="text-2xl font-bold text-gray-600">Select a Video</h1>
      )}
    </div>
  );
}

export default VideoPlayer;
