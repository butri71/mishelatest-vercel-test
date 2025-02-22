// utils/url.js
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Fallback for production
  if (process.env.NODE_ENV === "production") {
    return "https://mishela.app.com";
  }

  // Fallback for development
  return "http://localhost:8000";
}
