// DownloadButton.js
"use client"; // This line enables client-side interactivity

import Image from "next/image";
import { useContext } from "react";

import './components.css';
import CookieConsentContext from "../../context/CookieConsentContext";

const DownloadButton = ({ platform, url }) => {
  const { hasConsented } = useContext(CookieConsentContext);
  const logEvent = typeof window !== "undefined" && typeof window.logEvent === "function" ? window.logEvent : null;

  const handleClick = () => {
    console.log("platform: ", platform);
    console.log("url: ", url);
    console.log("logEvent: ", logEvent);

    if (hasConsented && logEvent) {
      logEvent("app_download", {
        event_category: "engagement",
        event_label: platform,
        value: 1,
      });
    } else if (!hasConsented) {
      console.log("User has not consented to analytics");
    } else {
      console.error("logEvent is not defined at the time of click. Ensure GA is loaded correctly.");
    }

    window.open(url, "_blank");
  };

  return (
    <div
      className="home-download-container"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={
          platform === "Android"
            ? "/images/android.png"
            : "/images/ios.png"
        }
        alt={`download mishela app from ${platform.toLowerCase()}`}
        fill={true}
        sizes="(max-width: 350px) 100vw, 170px"
      />
    </div>
  );
};

export default DownloadButton;
