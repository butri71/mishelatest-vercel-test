import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

export default async function initTranslations(locale, namespaces) {
  const i18nInstance = createInstance()
  
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: locale,
      fallbackLng: 'en',
      supportedLngs: ['en', 'es', 'it'],
      ns: namespaces,
      defaultNS: namespaces[0],
      returnObjects: true, // Allow arrays to be returned properly
      resources: {
        en: {
          blog: await import('../../translations/blog/en.json'),
          // cocktails: await import('../../translations/cocktails/en.json'),
          application: await import('../../translations/application/en.json'),
          contact: await import('../../translations/contact/en.json'), 
          privacy: await import('../../translations/privacy/en.json'),
          homepage: await import('../../translations/homepage/en.json')  
        },
        es: {
          blog: await import('../../translations/blog/es.json'),
          // cocktails: await import('../../translations/cocktails/es.json'),
          application: await import('../../translations/application/es.json'),
          contact: await import('../../translations/contact/es.json'),
          privacy: await import('../../translations/privacy/es.json'),
          homepage: await import('../../translations/homepage/es.json')   
        },
        it: {
          blog: await import('../../translations/blog/it.json'),
          // cocktails: await import('../../translations/cocktails/it.json'),
          application: await import('../../translations/application/it.json'),
          contact: await import('../../translations/contact/it.json'),
          privacy: await import('../../translations/privacy/it.json'),
          homepage: await import('../../translations/homepage/it.json')     
        }
      }
    })

  return i18nInstance
}