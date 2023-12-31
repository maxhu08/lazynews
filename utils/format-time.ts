export const formatTimeAgo = (timestamp: number) => {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;
  const units = ["yr", "mo", "wk", "d", "hr", "m", "s"];
  const intervals = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

  for (let i = 0; i < intervals.length; i++) {
    const value = Math.floor(seconds / intervals[i]);
    if (value >= 1) return `${value}${units[i]} ago`;
  }

  return "just now";
};
