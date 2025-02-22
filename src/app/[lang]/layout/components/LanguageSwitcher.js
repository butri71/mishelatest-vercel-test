"use client"; 

import { useState } from "react";

export default function LanguageSwitcher({ currentLang }) {
  const [selectedLang, setSelectedLang] = useState(currentLang);  

  const handleChange = (e) => {
    const newLang = e.target.value;
    setSelectedLang(newLang); // Update the selected language state

    // window.location.href = `/${newLang}`; // Redirect to the new language
    // Update the selected language in cookies
    document.cookie = `selectedLanguage=${newLang}; Path=/;`;

    // Redirect to the new language
    window.location.href = `/${newLang}`;
    // window.location.href = `/${newLang}${window.location.pathname.replace(/^\/(en|es|it)/, '')}`;
  }; 

  return (
    <div className="language-switcher">
      <select value={selectedLang} onChange={handleChange}>     
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="it">IT</option>
      </select>
    </div>
  );
}
