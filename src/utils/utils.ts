import axios from "axios";

export const getYouTubeVideoId = (url: string): string | undefined => {
  const standardUrlPattern =
    /(?:youtube\.com\/.*(?:\?|\&)v=|youtu\.be\/)([^&?\/]+)/;
  const match = url.match(standardUrlPattern);
  return match ? match[1] : undefined;
};
// get token from local storage and parse it then get the token from it and return it
export const getToken = (): string | null => {
  const authState = localStorage.getItem("authState");
  return authState ? JSON.parse(authState).token : null;
};
// funtion to store reidrect url in local storage
export const setRedirectUrl = (url: string): void => {
  // console.log("setting redirect url", url);
  localStorage.setItem("redirectUrl", url);
};
// function to get redirect url from local storage
export const getRedirectUrl = (): string | null => {
  const redirectUrl = localStorage.getItem("redirectUrl");
  // console.log("getting redirect url", redirectUrl);
  return redirectUrl ? redirectUrl : "/";
};

export const fetchVideoTitle = async (videoId: string, apiKey: string) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          key: apiKey,
          part: "snippet",
          id: videoId,
        },
      }
    );

    const title = response.data.items[0].snippet.title;
    return title;
  } catch (error) {
    console.log(error);
    return "";
  }
};
