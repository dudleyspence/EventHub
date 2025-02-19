export function FormatDateToReadable(utcDateString: Date) {
  const date = new Date(utcDateString);

  return date.toLocaleString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}
