"use client";

import Link from "next/link";
import { useContext } from "react";

import translations from "./components/translations";
import CookieConsentContext from "../../context/CookieConsentContext";

export default function Footer({ lang }) {
  const t = translations[lang] || translations.en;
  const {
    showCookiePopup,
    setShowCookiePopup,
    handleAcceptCookies,
    handleRejectCookies,
  } = useContext(CookieConsentContext);

  return (
    <footer className="footerbar">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
        </div>
        <div className="nav-links">
          {/* <Link href={`/${lang}/mishela-app`}>{t.app}</Link>
          <Link href={`/${lang}/blog`}>{t.blog}</Link> */}
          <Link href={`/${lang}/contact`}>{t.contact}</Link>
          {/* <Link href={`/${lang}/privacy`}>{t.privacy}</Link> */}
          <button
            // className="nav-link-button"
            onClick={() => {
              console.log("[Footer] Reopening cookie preferences...");
              setShowCookiePopup(true);
            }}
          >
            {t.cookie}
          </button>
        </div>
      </div>
    </footer>
  );
}
