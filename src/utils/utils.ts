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
