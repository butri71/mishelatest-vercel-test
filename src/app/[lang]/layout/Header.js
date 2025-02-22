import Link from "next/link";
import Image from "next/image";

import LanguageSwitcher from "./components/LanguageSwitcher";

export default async function HeaderLayout({ lang }) {
  return (
    <nav className="navbar">
      <div className="header-container">
        {/* LOGO */}
        <div className="logo">
          <Link href={`/${lang}`} className="logoLink">
            <Image
              src="/assets/logo.png"
              alt="Mishela Cocktails App"
              width={50}
              height={50}
              priority
            />
            <span className="logoFontClass">Mishela Cocktails</span>
          </Link>
        </div>
        {/* <div className="nav-links">         
          <Link href={`/${lang}/script`}>Scripts</Link>
        </div> */}
        {/* Language Switcher */}
        <LanguageSwitcher currentLang={lang} />{" "}       
      </div>
    </nav>
  );
}
