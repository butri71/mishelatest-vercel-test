
export function cleanString(str) {
  return str
    .replace(/\[|\]/g, "") // Remove square brackets
    .replace(/\*\*/g, "") // Remove double asterisks
    .replace(/\n+/g, " ") // Replace multiple newlines with single space
    .trim(); // Remove leading/trailing whitespace
}
