"use client";

import { useState, useEffect } from "react";
// import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { usePathname, redirect } from "next/navigation";

import CookieConsentContext from "./context/CookieConsentContext";
import CookieConsent from "./[lang]/layout/components/cookies";
import "./globals.css";

const GA_TRACKING_ID = "G-HVC6VZ0SPD";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  // console.log('Before RootLayout return');
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "en";
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const [hasConsented, setHasConsented] = useState(null);

  const closeTranslations = {
    en: "Close",
    es: "Cerrar",
    it: "Chiudi",
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    // console.log("Cookie Consent Value:", consent);
    if (consent === "accepted") {
      // console.log("User accepted cookies.");
      setHasConsented(true);
      setShowCookiePopup(false);
      // initializeGoogleAnalytics();
    } else if (consent === "rejected") {
      // console.log("User rejected cookies.");
      setHasConsented(false);
      setShowCookiePopup(false);
      // Here you can initialize tracking or analytics scripts
    } else {
      // console.log("No cookie consent set. Displaying popup...");
      setHasConsented(null);
      setShowCookiePopup(true); // Show popup if no consent is given     
      // setShowPopup(true);
    }
  }, []);

  const initializeGoogleAnalytics = () => {
    // console.log("[RootLayout] Initializing Google Analytics...");
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag; // Make gtag available globally
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID, {
      page_path: window.location.pathname,
      cookie_flags: 'SameSite=Strict; Secure',
      cookie_expire: 'max' // Optional: set max expiration
    });
    // Restore your custom event tracking function
    window.logEvent = function (action, params) {
      gtag("event", action, params);
    };
  };

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setHasConsented(true);
    setShowCookiePopup(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setHasConsented(false);
    setShowCookiePopup(false);
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleCloseCookiePopup = () => {
    setShowCookiePopup(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsented,
        showCookiePopup,
        setShowCookiePopup,
        handleAcceptCookies,
        handleRejectCookies,
      }}
    >
      <html lang={lang}>
        <head>
          <meta name="robots" content="index, nofollow" />
          <meta name="author" content="Mishela Test App" />
          <meta name="referrer" content="strict-origin-when-cross-origin" />         
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Mishela Test App",
                "description": "Cocktail recipe app for bartenders and mixologists",
                "applicationCategory": "Lifestyle",
                "operatingSystem": "Multiple"
              })
            }}
          />
          {/* ADD GA SCRIPTS IF USER HAS ACCEPTED COOKIES */}
          {hasConsented && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
              />
            </>
          )}
        </head>
        <body className={`${montserrat.variable}`}>          
          {children}
          {showCookiePopup && (
            <div className="cookie-popup-overlay">
              <CookieConsent
                onAccept={handleAcceptCookies}
                onReject={handleRejectCookies}
                lang={lang}
              />
              <button onClick={handleCloseCookiePopup} className="close-popup">
                {closeTranslations[lang] || closeTranslations.en}
              </button>
            </div>
          )}
        </body>
      </html>
    </CookieConsentContext.Provider>
  );
}
