// BLOG SCREEN
import { getBaseUrl } from "@/utils/urls";
import initTranslations from '@/i18n'

import posts from "../../../../data/posts";
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
    title: `${t('blog.seoTitle')}`,
    description: t('blog.seoDescription'),
    keywords: t('blog.seoKeywords'),
    openGraph: {
      title: `${t('blog.seoTitle')}`,
      description: t('blog.seoDescription'),
      type: "website",
      locale: lang,
    },
    alternates: {
      // canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        es: `${baseUrl}/es/blog`,
        it: `${baseUrl}/it/blog`,
        'x-default': `${baseUrl}/en/blog`
      },
    },
  };
}

export default async function BlogList({ params }) {
  const { lang, slug } = await params;
  const { t } = await initTranslations(lang, ['blog'])
  
  const blogPosts = Object.values(posts)
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort by published date 
    .map((post) => {
      const langPost = post[lang];
      if (!langPost) {
        return null; // Or return a default post object
      }

      return {
        slug: langPost.slug,
        title: langPost.title,
        content: langPost.shortIntro,
        // content: langPost.description,
        image: post.image,
        cocktailId: post.cocktailId,
        cocktail: post.name,
      };
    })
    .filter((post) => post !== null);   

  return (
    <div className="blog-container">    
      <LineHeaderMiddle title={t('blog.header')} isH1={true} />    

      {/* List of most popular posts sorted by most recent*/}
      <PopularPosts articles={blogPosts} locale={lang} type={"blog"} />
    </div>
  );
}