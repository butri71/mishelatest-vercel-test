// HOMEPAGE SCREEN
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDownload } from "react-icons/md";
import { getBaseUrl } from "@/utils/urls";
import initTranslations from "@/i18n";

import AppBanner from "./components/AppBanner";
import PopularPosts from "./components/PopularPosts";
// import SidebarBox from "./components/SidebarBox";
import posts from "../../../data/posts.json";
import liqueurs from "../../../data/liqueurs.json";
import MarkdownParagraph from "../../utils/MarkdownParagraph";
import "./css/homepage.css";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["homepage"]);

  const baseUrl = getBaseUrl();

  return {
    title: t("homepage.homeTitle"),
    description: t("homepage.homeDescription"),
    keywords: t("homepage.keywords"),
    openGraph: {
      title: t("homepage.homeTitle"),
      description: t("homepage.homeDescription"),
      type: "website",
      locale: lang,
    },
    alternates: {
      // canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        it: `${baseUrl}/it`,
        "x-default": `${baseUrl}/en`,
      },
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "it" }];
}

export default async function Home({ params }) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["homepage"]);

  // Fetch random liqueurs
  const randomPosts = Object.values(posts)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const latestPosts = Object.values(randomPosts)
    .map((post) => {
      const langPost = post[lang];
      if (!langPost) {
        return null; // Or return a default post object
      }
      return {
        slug: langPost.slug,
        title: langPost.title,
        content: langPost.description,
        image: post.image,
      };
    })
    .filter((post) => post !== null)
    .sort((a, b) => new Date(b.published) - new Date(a.published));

  // Fetch random liqueurs
  const randomLiqueurs = Object.values(liqueurs)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const blogLiqueur = Object.values(randomLiqueurs)
    .map((post) => {
      const langPost = post[lang];
      if (!langPost) {
        return null; // Or return a default post object
      }

      return {
        slug: langPost.slug,
        title: langPost.title,
        content: langPost.description,
        image: post.image,
        // cityId: post.cityId,
        name: post.name,
      };
    })
    .filter((post) => post !== null);

  // console.log('latestPosts: ',latestPosts.slice(0, 3))
  // console.log("cityMonth: ",cityMonth)
  return (
    <div className="home-container">
      <div className="header">
        {/* <div className="logo">Cocktail Connoisseur</div>    */}
        <h1 className="logo">{t("homepage.slogan")}</h1>
        <div className="app-container">
          {/* <Link href={`/${lang}/mishela-app`} className="app-button"> */}
          <MdDownload style={{ width: 20, marginRight: 5 }} size={20} />{" "}
          {t("homepage.btn_getapp")}
          {/* </Link> */}
        </div>
      </div>
      <main>
        {/* MAIN IMAGE SECTION */}
        <div className="main-home">
          <section className="hero">
            <div className="hero-image">
              <Image
                src="/images/free-cocktail-app-mishela.jpg"
                alt="Bartender double straining a cocktail"
                width={900}
                height={600}
                priority={true}
              />
            </div>
            <div className="hero-content">
              <h2>{t("homepage.header")}</h2>
              <p>{t("homepage.subheader")}</p>
              <div style={{ flexDirection: "row" }}>
                <Link href={`/${lang}/blog`} className="cta-button">
                  {/* <div className="cta-button">{t("homepage.image_cta")}</div> */}
                  {t("homepage.image_cta")}
                </Link>
              </div>
            </div>
          </section>

          {/* SIDEBAR SECTION */}
          <section className="featured-boxes">
            <div className="featured-box-img">
              {/* <Link href={`/${lang}/city`} className="cta-city-button"> */}
              <div href={`/${lang}/city`} className="cta-city-button">
                <Image
                  src="/images/blog/home-city.jpg"
                  alt="cocktails with city background"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }} // ratio 1.3
                  priority={true}
                />
                <span className="city-content">
                  <span className="cta-city-button">
                    {t("homepage.sidebarTitle2")}
                  </span>
                </span>
              </div>
              {/* </Link> */}
            </div>

            <div className="featured-box-img">
              {/* <Link href={`/${lang}/blog/${cocktailMonth.slug}`}> */}
              <Link href={`/${lang}/recipes`}>
                <Image
                  src="/images/blog/cocktail-month.jpg"
                  alt="three cocktails city blog"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
                <div className="city-content">
                  <div className="cta-city-button">
                    {t("homepage.sidebarTitle4")}
                  </div>
                </div>
              </Link>
            </div>

            <div className="featured-box-img">
              {/* <Link href={`/${lang}/mishela-app#academy-section`}> */}
              {/* <Link href={`/${lang}/specials`}> */}
              <Image
                src="/images/blog/valentine-day-cocktail.jpg"
                alt="Cocktails Special Events"
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
              <div className="city-content">
                <div className="cta-city-button">
                  {t("homepage.sidebarTitle5")}
                </div>
              </div>
              {/* <div className="academy-content">
                  <div className="cta-academy-button">
                    {t('homepage.sidebarTitle3')}
                  </div>
                </div> */}
              {/* </Link> */}
            </div>
          </section>
        </div>

        {/* LATEST ARTICLES SECTION */}
        <section className="latest-articles">
          <div className="gallery-title">
            {/* <Link href={`/${lang}/blog`}>{t("homepage.articles_header")}</Link> */}
            <div>{t("homepage.articles_header")}</div>
          </div>
          <div className="article-grid">
            {latestPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="article-card">
                <Image
                  // src={`/article-${post}.jpg`}
                  src={`/images/blog/${post.image}`}
                  alt={`Article ${post.title}`}
                  width={300}
                  height={200}
                  priority={false} // Load lazily for card view
                />
                <h3 className="article-card-title">{post.title}</h3>
                <div className="article-description">
                  <MarkdownParagraph language={lang}>
                    {post.content}
                  </MarkdownParagraph>
                </div>
                {/* <p className="article-description">{post.content}...</p> */}
                {/* <Link href={`/${lang}/blog/${post.slug}`}>
                  {t("homepage.btn_read")}
                </Link> */}
              </article>
            ))}
          </div>
        </section>

        {/* LIQUEURS SECTION */}
        <div className="gallery-title">
          {/* <Link href={`/${lang}/liqueur`}>{t("homepage.headerLiqueurs")}</Link> */}
          <div>{t("homepage.headerLiqueurs")}</div>
        </div>
        <PopularPosts articles={blogLiqueur} locale={lang} type={"liqueur"} />

        {/* APP PROMO SECTION */}
        <AppBanner lang={lang} />
      </main>
    </div>
  );
}
