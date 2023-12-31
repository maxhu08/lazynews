export const shortenUrl = (url: string) => {
  if (typeof url === "undefined") return null;

  const urlObject = new URL(url);
  return urlObject.hostname;
};
