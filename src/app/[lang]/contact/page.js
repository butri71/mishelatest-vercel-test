import React from "react";
import { Megaphone, Users, MessageSquare, Mail } from "lucide-react";
import initTranslations from '@/i18n'
// import { getBaseUrl } from "@/utils/urls";

import "./GetInTouch.css";

// export async function generateMetadata({ params }) {
//   const { lang } = await params;
//   const { t  } = await initTranslations(lang, ['contact'])     
//   const baseUrl = getBaseUrl();

//   return {
//     title: `${t('contact.title')}`, 
//     description: t('contact.seoDescription'),
//     keywords: t('contact.seoKeywords'),
//     openGraph: {
//       title: `${t('contact.title')}`, 
//       description: t('contact.seoDescription'),
//       type: 'website',
//       locale: lang
//     },
//     alternates: {
//       // canonical: `/${lang}/contact`,
//       languages: {
//         'en': `${baseUrl}/en/contact`,
//         'es': `${baseUrl}/es/contact`,
//         'it': `${baseUrl}/it/contact`,
//         'x-default': `${baseUrl}/en/contact`,
//       }
//     }
//   };
// }
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
    { lang: 'it' },
  ]
}

export default async function GetInTouch({ params }) {
  const { lang } = await params;
  const { t  } = await initTranslations(lang, ['contact'])   

  const contactCategories = [
    { title: t('contact.advertising'), icon: Megaphone }, 
    { title: t('contact.collaboration'), icon: Users },
    { title: t('contact.feedback'), icon: MessageSquare },
    { title: t('contact.general'), icon: Mail },    
  ];

  return (
    <div className="container">
      {/* <h1 className="title">Contact us</h1> */}
      <h1 className="title">{t('contact.title')}</h1>
      <p className="subtitle">{t('contact.subtitle')}</p>
      <div className="categories-grid">
        {contactCategories.map((category) => (
          <div key={category.title} className="category-card">
            <div className="card-content">
              <div className="icon-wrapper">
                {React.createElement(category.icon, { className: "icon" })}
              </div>
              <h2 className="category-title">{category.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="contact-section">
        <p className="contact-text">{t('contact.text')}</p>
        <a href="mailto:mishela.app@gmail.com" className="email-link">
          mishela.app@gmail.com
        </a>
      </div>
    </div>
  );
}
