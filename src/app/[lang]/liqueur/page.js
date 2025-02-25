// BLOG LIQUEUR SCREEN
import { getBaseUrl } from "@/utils/urls";
import initTranslations from '@/i18n'

import liqueurs from "../../../../data/liqueurs.json";
import LineHeaderMiddle from "../components/LineHeaderMiddle";
import PopularPosts from "../components/PopularPosts";

// export const dynamicParams = true;
// export const revalidate = 604800; // Cache for 7 days
// export const dynamic = "force-static";
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "it" }];
}

export async function generateMetadata({ params }) {  
  const { lang } = await params;
  const { t } = await initTranslations(lang, ['blog'])
 
  const baseUrl = getBaseUrl();

  return {
    title: t('liqueurs.seoLiqueursTitle'), 
    description: t('liqueurs.seoLiqueursDescription'), 
    keywords: t('liqueurs.seoLiqueursKeywords'), 
    openGraph: {
      title: t('liqueurs.seoLiqueursTitle'),
      description: t('liqueurs.seoLiqueursDescription'),
      type: "website",
      locale: lang,
    },
    alternates: {
      // canonical: `${baseUrl}/${lang}/liqueur`,
      languages: {
        en: `${baseUrl}/en/liqueur`,
        es: `${baseUrl}/es/liqueur`,
        it: `${baseUrl}/it/liqueur`,
        'x-default': `${baseUrl}/en/liqueur`
      },
    },
  };
}

export default async function LiqueurList({ params }) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ['blog'])  

  const blogPosts = Object.values(liqueurs)    
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
    
  const sortedLiqueurs = blogPosts.sort((a, b) => a.name.localeCompare(b.name))

  //  console.log("blogPosts: ",blogPosts)
  return (
    <div className="blog-container">
      <LineHeaderMiddle title={t('liqueurs.headerLiqueurs')} isH1={true}/> 

      {/* List of most popular posts sorted by most recent*/}
      <PopularPosts articles={sortedLiqueurs} locale={lang} type={"liqueur"} />
    </div>
  );
}
