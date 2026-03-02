export const formatDateTime = (dateString, showTime = true) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const options = showTime
    ? {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    : {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

  const formatted = date
    .toLocaleString("en-GB", options)
    .replace(",", "")
    .replace(/\//g, "-");

  return showTime ? formatted : formatted.split(" ")[0];
};
