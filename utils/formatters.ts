export function formatSeconds(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (seconds >= 86400) {
    return `${days < 10 ? "0" : ""}${minutes} ds ${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes} hs`;
  }
  if (seconds < 3600) {
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds} m`;
  } else {
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes} hs`;
  }
}

export const formatDecimal = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});
