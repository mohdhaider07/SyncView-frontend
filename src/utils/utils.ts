export const getYouTubeVideoId = (url: string): string | undefined => {
  const standardUrlPattern =
    /(?:youtube\.com\/.*(?:\?|\&)v=|youtu\.be\/)([^&?\/]+)/;
  const match = url.match(standardUrlPattern);
  return match ? match[1] : undefined;
};
