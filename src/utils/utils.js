export function formatIntDate(timestamp, locale) {
 
  // Convert timestamp to a number if it's a string
  if (typeof timestamp === "string") {
    timestamp = Number(timestamp);
  }
  const date = new Date(timestamp);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  let languageCode;
  switch (locale) {
    case "en":
      languageCode = "en-US";
      break;
    case "it":
      languageCode = "it-IT";
      options.month = "short"; // Use abbreviated month names for Italian
      break;
    case "es":
      languageCode = "es-ES";
      options.month = "short"; // Use abbreviated month names for Spanish
      break;
    default:
      languageCode = "en-US"; // Default to English
  }

  return new Intl.DateTimeFormat(languageCode, options).format(date);
}
