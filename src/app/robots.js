export default function robots() {
  // const langs = ['en', 'es', 'it'];
  return {
    rules: [
      {
        userAgent: '*',
        // allow: '/',
        disallow: [
          '/'
          // '/api/',
          // '/_next/',
          // '/static/',
          // '/media/',
          // '/temp/',
          // '/cache/',
          // '/config/',
          // '/test/',
          // ...langs.map((lang) => `/src/app/${lang}/script`),
        ],
      },
    ],
    // sitemap: 'https://mishela.app/sitemap.xml',
  }
}