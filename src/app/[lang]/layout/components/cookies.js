import { useEffect, useState } from 'react';
import Link from "next/link";

import "./cookies.css";
import translations from "./translations";

const CookieConsent = ({ onAccept, onReject, lang }) => {
  const t = translations[lang] || translations.en;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const cookiePreference = localStorage.getItem('cookieConsent');
    // console.log('Cookie Consent Value:', cookiePreference);
    if (!cookiePreference) {
      // console.log('No cookie consent set. Displaying popup...');
      setShowPopup(true);
    } else if (cookiePreference === 'accepted') {
      // console.log('User accepted cookies.');
      setShowPopup(true);
      // Here you can initialize tracking or analytics scripts
    } else if (cookiePreference === 'rejected') {
      // console.log('User rejected cookies.');
      setShowPopup(true);
      // Optional: Take any specific actions for rejected state
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    onAccept();
    setShowPopup(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    onReject();
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <h3>{t.cookieHeader}</h3>
        <p>
        {t.cookieText1}{" "}
          <Link href={`${lang}/privacy`} className="partners-link">
          {t.cookiePrivacy}
          </Link>
          .
        </p>
        <p>{t.cookieText2}</p>
      </div>
      <div className="cookie-buttons">
        <button onClick={handleAccept} className="accept-button">
          {t.cookieAccept}
        </button>
        <button onClick={handleReject} className="reject-button">
        {t.cookieReject}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
