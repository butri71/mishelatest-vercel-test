// app/not-found.js
"use client";

import { usePathname } from "next/navigation";
import Link from 'next/link'

import { translations } from '../../translations/system/translations';

export default function NotFound() {
    console.log("Root not-found.js triggered");

    const pathname = usePathname();
    const lang = pathname?.includes('/_not-found') ? 'en' : (pathname?.split("/")[1] || "en");
    const t = translations[lang];
    console.log("Root lang: ", lang);
    return (
        <div className="container-404">
            <div className="content-404">
                <h1 className="title-404">{t.notFound.title}</h1>
                <p className="message-404">{t.notFound.message}</p>
                <Link href={`/${lang}`} className="homeButton-404">
                    {t.notFound.home}
                </Link>
            </div>
        </div>        
    );
}