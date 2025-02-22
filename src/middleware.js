// src/middleware.js
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const CRAWLER_PATTERNS = [
    // Google
    /(googlebot|google-inspection|chrome-lighthouse|mobile-friendly|webmaster|snippet|pagespeed|adsbot-google|mediapartners-google|apis-google|feedfetcher-google)/i,
    // Bing/Microsoft
    /(bingbot|msnbot|bingpreview)/i,
    // Yahoo
    /(yahoo|slurp)/i,
    // DuckDuckGo
    /duckduckbot/i,
    // Yandex
    /yandex/i,
    // Baidu
    /baiduspider/i,
    // Social Media
    /(pinterest|twitterbot|facebookexternalhit|linkedinbot)/i,
    // Others
    /(bot|spider|crawler|http-client|URLTest|validator)/i,
  ];
  // Check if it's a crawler
  const userAgent = request.headers.get("user-agent") || "";
  const isCrawler = (userAgent) => {
    return CRAWLER_PATTERNS.some((pattern) => pattern.test(userAgent));
  };

  // Skip language redirect for crawlers on language paths  
  if (
    isCrawler &&
    (pathname === "/en" ||
     pathname === "/es" ||
     pathname === "/it" ||
     pathname.startsWith("/en/") ||
     pathname.startsWith("/es/") ||
     pathname.startsWith("/it/"))
  ) {
    return;
  }

  // Allow root URL to redirect to language version
  if (pathname === "/" || pathname === "") {
    if (isCrawler) {
      const newUrl = new URL("/en", request.url);
      return Response.redirect(newUrl);
    }
    const storedLang = request.cookies.get("selectedLanguage")?.value || "en";
    const newUrl = new URL(`/${storedLang}`, request.url);
    return Response.redirect(newUrl);
  }

  // Skip middleware for root URL and sitemap/robots
  if (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/redirect") ||
    pathname.startsWith("/cocktaillink") ||
    pathname.startsWith("/cocktail") ||
    pathname.startsWith("/test")
  ) {
    return;
  }   

  // Allow image paths to pass through
  if (pathname.startsWith("/images") || pathname.startsWith("/assets")) {
    return;
  }

  // #1 Check for stored language in local storage
  const storedLang = request.cookies.get("selectedLanguage")?.value;
  // console.log("middleware stored language: ", storedLang);

  // #2 If a language is stored, redirect to that language
  if (storedLang && !pathname.startsWith(`/${storedLang}`)) {
    const newPathname = pathname.replace(/^\/(en|es|it)/, ""); // Remove any existing language prefix
    const newUrl = new URL(`/${storedLang}${newPathname}`, request.url);
    // console.log("Redirecting to stored language URL:", newUrl.toString());
    return Response.redirect(newUrl);
  }

  // #3 If no language is stored, check the browser's preferred language
  if (!storedLang) {
    console.log("no stored language, lets check browser preferrred language");
    const acceptLanguage = request.headers.get("accept-language");
    console.log("browser preferrred language is: ", acceptLanguage);
    const preferredLang = acceptLanguage
      ? acceptLanguage.split(",")[0].split("-")[0]
      : "en";
    const supportedLanguages = ["en", "es", "it"];

    // Determine the language to redirect to
    const redirectLang = supportedLanguages.includes(preferredLang)
      ? preferredLang
      : "en";
    console.log("redirect language to: ", redirectLang);
    const newUrl = new URL(`/${redirectLang}${pathname}`, request.url);

    // Create a new response with the Set-Cookie header
    const response = Response.redirect(newUrl);
    const headers = new Headers(response.headers);
    headers.append("Set-Cookie", `selectedLanguage=${redirectLang}; Path=/;`);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });
  }

  // If the pathname starts with our supported languages, let it pass through
  if (
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/it")
  ) {
    // console.log("middleware the pathname starts with: ",pathname);
    return;
  }

  // Redirect to default language (English)
  const newUrl = new URL(`/en${pathname}`, request.url);
  // return Response.redirect(newUrl);
  // CSP implementation
  const response = Response.redirect(newUrl);
  const headers = new Headers(response.headers);

  // Add CSP header
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://www.google-analytics.com;"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

export const config = {  
  // matcher: [
  //   "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|^\\/redirect|^\\/cocktaillink^\\/cocktail|^\\/test|^\\/$).*)",
  // ],
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|^\\/redirect|^\\/cocktaillink^\\/cocktail|^\\/test|^\\/$)(.|\\$)",
  ],
};
