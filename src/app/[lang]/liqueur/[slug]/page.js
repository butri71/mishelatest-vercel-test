// LIQUEUR POST SCREEN

// 'use client'
// import { useState } from 'react'

import Image from "next/image";
import { FaArrowDownShortWide } from "react-icons/fa6";
import initTranslations from '@/i18n'
import { getBaseUrl } from "@/utils/urls";

// import BlogTabs from "../../components/TabsSection";
import AppBannerSmall from "../../components/AppBannerSmall";
import FaqList from "../../components/FaqList";
import CocktailLiqueurCard from "../../components/CocktailLiqueurCard";
import Quote from "../../components/Quote";
import liqueurs from "../../../../../data/liqueurs";
import liqueursExtra from "../../../../../data/liqueurs-extra";
import cocktails from "../../../../../data/CocktailBlog";
import { country } from "../../components/translations/countries";
import { formatIntDate } from "../../../../utils/utils";
import MarkdownParagraph from "../../../../utils/MarkdownParagraph";
import LineHeaderLeft from "../../components/LineHeaderLeft";
import "./components/liqueur.css";

// export const dynamicParams = true;
// export const revalidate = 604800; // Cache for 7 days
// export const dynamic = "force-static";
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "it" }];
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const { t } = await initTranslations(lang, ['blog'])

  const post = Object.values(liqueurs).find((post) => post[lang].slug === slug);
  if (!post) return {};

  function cleanString(str) {
    return str
      .replace(/\[|\]/g, "") // Remove square brackets
      .replace(/\*\*/g, "") // Remove double asterisks
      .replace(/\n+/g, " ") // Replace multiple newlines with single space
      .trim(); // Remove leading/trailing whitespace
  }

  const article = post[lang];
  const cleanTitle = cleanString(article.title);
  const cleanDescription = cleanString(article.description);
  const seoTitle = `${cleanTitle}`;
  const seoDescription = cleanDescription.slice(0, 160);
  // console.log("keywords: ",article.ingredients)
  const baseKeywords = [
    `${post.name}`,
    `${post.name} cocktail`,
    `${t('cities.mixology')} ${country[lang]?.[post.country]}`,   
  ];
  const baseUrl = getBaseUrl();

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: baseKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      locale: lang,
      url: `${baseUrl}/${lang}/liqueur/${slug}`, // Add full URL when env vairable are ready
      images: [
        {
          url: `${baseUrl}/images/blog/${post.image}`,
          width: 900,
          height: 600,
          alt: article.title,
          type: "image/jpeg",
        },
      ],
      siteName: "Mishela Cocktail Recipes",
    },
    alternates: {
      // canonical: `${baseUrl}/${lang}/liqueur/${slug}`,
      languages: {
        en: `${baseUrl}/en/liqueur/${article.slugs.en}`,
        es: `${baseUrl}/es/liqueur/${article.slugs.es}`,
        it: `${baseUrl}/it/liqueur/${article.slugs.it}`,
        'x-default': `${baseUrl}/en/liqueur/${article.slugs.en}`
      },
    },
  };
}

const tabs = [
  {
    id: 'fullblog',
    label: 'Full blog',
  },
  {
    id: 'article',
    label: 'Article',
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
  },
  {
    id: 'faqs',
    label: 'FAQs',
  },
]

export default async function BlogPost({ params }) {
// export default function BlogPost({ params }) {
  const { lang, slug } = await params;  
  const { t  } = await initTranslations(lang, ['blog']) 

  // Find the article where the current language has the matching slug
  const post = Object.values(liqueurs).find(
    (post) => post[lang]?.slug === slug
  );

  // Find the article where the current language has the matching slug
  const extra = Object.values(liqueursExtra).find(
    (item) => item?.id === post.id  );
  const faqs = extra ? extra[lang]?.faqs : null;

  if (!post) {
    // console.log("Post not found for slug:", slug); // Log the slug that was not found
    return <div>Post not found</div>; // Handle 404
  }

  const { title, name, description, sections, statement, conclusion } =
    post[lang];

  // First split and clean up the post.cocktails array
  const searchValues = post.cocktails.map(value => value.toLowerCase());
  const cocktailData = Object.values(cocktails).filter((cocktail) => {
    const ingredients = cocktail?.all?.ingredients?.map((i) => {
      if (typeof i === "string") {
        return i.toLowerCase();
      }
      return "";
    });

    // Check if any of the searchValues are included in the ingredients
    return searchValues.some((searchValue) =>
      ingredients?.includes(searchValue)
    );
  });

  const sortedCocktailData = cocktailData.sort((a, b) =>
    a.all.overallName.localeCompare(b.all.overallName)
  );

  // console.log("post: ", post.name);
  // console.log("cocktailData is: ", cocktailData[0]);
  return (
    <>
      <div>
        <article className="blog-post-container">
          <h1 className="upper">{title}</h1>
          <div className="article-meta use-geist-mono">
            <p className="author">
              {t('blog.by')}
              {post.author}
            </p>
            <span className="separator">•</span>
            <p className="publish-date">
              <span>{t('blog.published')}</span>{" "}
              <span>{formatIntDate(post.published, lang)}</span>
            </p>
            <span className="separator">•</span>
            <a href="#cocktails-section" className="jump-to-recipe">
              <FaArrowDownShortWide className="icon" /> {t('liqueurs.jump_cocktails')}
            </a>
          </div>

          <div className="detail-image-container">
            <Image
              src={`/images/blog/${post.image}`}
              alt={title}
              className="blog-image"
              fill={true}
              sizes="(max-width: 768px) 100vw, 900px"
              priority={true}
            />
          </div>

          {/* TAB NAVIGATION */}
          {/* <BlogTabs tabs={tabs} activeTab={activeSection} onTabChange={setActiveSection} /> */}

          <div className="article-plain-content use-geist">
            <MarkdownParagraph language={lang}>{description}</MarkdownParagraph>
          </div>

          {/* QUOTE */}
          <Quote data={statement} type="plain" />
          {/* HISTORY */}
          {sections.map((section, index) => (
            <div key={index}>
              {section.heading === "Signature Cocktails" ? (
                <>
                  {/* activeSection === 'cocktails' || 'fullblog' && ( */}
                  <LineHeaderLeft title={t('liqueurs.signatureCocktails')} />
                  <div id="cocktails-section" className="article-content use-geist mb-30">
                    <MarkdownParagraph language={lang}>
                      {section.content}
                    </MarkdownParagraph>
                    {section.bullet_points && (
                      <ul className="ingredients-list mb-20">
                        {section.bullet_points.map(
                          (cocktail, cocktailIndex) => (
                            <li key={cocktailIndex}>
                              <MarkdownParagraph
                                language={lang}
                                className="cocktail-link"
                                mb="0px"
                              >
                                {cocktail.name}
                              </MarkdownParagraph>
                              <MarkdownParagraph
                                language={lang}
                                // className="cocktail-link"
                                mb="0px"
                              >
                                {cocktail.description}
                              </MarkdownParagraph>
                              {/* <p>{cocktail.description}</p> */}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                  {/* ) */}
                  {/* LIQUEUR RECIPES */}
                  {sortedCocktailData.length > 0 && (
                    <>
                      <LineHeaderLeft
                        title={`${t('liqueurs.recipes_tab')} ${String(post.name)}`}
                      />
                      <CocktailLiqueurCard
                        cocktails={sortedCocktailData}
                        locale={lang}
                        type={"recipes"}
                      />

                      {/* APP PROMO SECTION */}
                      <AppBannerSmall lang={lang} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <LineHeaderLeft title={section.heading} />
                  <div className="article-content use-geist mb-30">
                    <MarkdownParagraph language={lang}>
                      {section.content}
                    </MarkdownParagraph>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* NEXT */}
          <LineHeaderLeft title={t('liqueurs.next_tab')} />
          {conclusion && (
            <div className="article-content use-geist mb-30">
              <MarkdownParagraph language={lang}>
                {conclusion}
              </MarkdownParagraph>
            </div>
          )}

          {/* FAQS */}
          <LineHeaderLeft title={`${t('blog.faqs')} ${String(post.name)}`} />          
          {faqs && (
            <div className="article-content use-geist mb-30">        
              <FaqList faqs={faqs} />                     
            </div>
          )}
        </article>
      </div>
    </>
  );
}
