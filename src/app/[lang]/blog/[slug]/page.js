// BLOG POST SCREEN
import Image from "next/image";
import { FaArrowDownShortWide, FaRegComment } from "react-icons/fa6";
import { getBaseUrl } from "@/utils/urls";
import initTranslations from '@/i18n'

import RatingComponent from "../../components/RatingComponent";
import CommentSection from "../../components/CommentSection";
import Quote from "../../components/Quote";
import { country as countryTranslations } from "../../components/translations/countries";
import AppBannerSmall from "../../components/AppBannerSmall";
import comments from "../../../../../data/comments.json";
import { formatIntDate } from "../../../../utils/utils";
import MarkdownParagraph from "../../../../utils/MarkdownParagraph";
import { getCocktailPostData } from "../../../../utils/cocktailPostFetching";
import { cleanString } from "../../../../utils/cleaningString";
import { getUserReviews } from "../../../../utils/commentsFetching";
import { getRatingItem } from "../../../../utils/ratingsFetching";
import LineHeaderLeft from "../../components/LineHeaderLeft";
import RecipeCard from "../../components/RecipeCard";
import HistoryCard from "./components/HistoryCard";
import "./components/cocktail.css";

// export const dynamicParams = true;
// export const revalidate = 604800; // Cache for 7 days
// export const dynamic = "force-static";
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "it" }];
}

// Helper function to generate SEO content
function generateSEOContent(
  post,
  articleData,
  userReviews,
  source = "",
  abv = "",
  calories = "",
  dietaryInfo = [],
  dosage = [],
  preparation = [],
  ingredients = [],
  localeCountry = "",
  lang,
  slug,
  ratingAverage,
  ratingVotes
) {

  const localeRecipe = {
    en: "recipe",
    es: "receta",
    it: "ricetta",
  };
  const localeIngredients = {
    en: "ingredients",
    es: "ingredientes",
    it: "ingredienti",
  };

  const baseKeywords = [
    `${post.name} ${localeRecipe[lang]}`,
    `${post.name} ${localeIngredients[lang]}`,
    `${post.name} cocktail`,
    `${ingredients[0]} cocktail`, // Primary ingredient cocktail
    `cocktail ${localeRecipe[lang]}`,
    ...ingredients,
    source,
  ];
  const recipePreparation = preparation.map((tip, index) => ({
    "@type": "HowToStep",
    text: tip,
    position: index + 1,
    name: `Step ${index + 1}`,
  }));
  const ratingItem = getRatingItem(post.cocktailId);
  // console.log("ratingItem: ", ratingItem)

  // Map dietary info to RestrictedDiet values
  const dietaryMapping = {
    vegetarian: "https://schema.org/VegetarianDiet",
    vegan: "https://schema.org/VeganDiet",
    dairyFree: "https://schema.org/LowLactoseDiet",
    glutenFree: "https://schema.org/GlutenFreeDiet",
  };

  //cleanup title and description
  const cleanTitle = cleanString(articleData.title);
  const cleanDescription = cleanString(articleData.description);
  // Calculate prepTime and totalTime
  const prepTimeMinutes = Math.max(0, recipePreparation.length - 1); // Minimum of 0
  const totalTimeMinutes = recipePreparation.length + 1;
  // Format time in ISO 8601 duration format
  const formatTime = (minutes) => `PT${minutes}M`;

  // Filter and map dietaryInfo to schema-compatible values
  const suitableForDiet = Object.entries(dietaryInfo)
    .filter(([, value]) => value) // Keep only true values
    .map(([key]) => dietaryMapping[key]) // Map to RestrictedDiet values
    .filter(Boolean); // Remove any undefined mappings

  return {
    // Use existing content where possible    
    title: `${cleanTitle}`,
    description: cleanDescription.slice(0, 160),
    keywords: baseKeywords,
    // Schema markup for cocktail recipe
    schema: {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: articleData.title,
      description: articleData.intro || articleData.description.slice(0, 160),
      recipeCategory: "Cocktail",
      prepTime: formatTime(prepTimeMinutes),
      totalTime: formatTime(totalTimeMinutes),
      keywords: baseKeywords,
      recipeIngredient: dosage.map(
        (item) => `${item.measurement} ${item.unit} ${item.ingredient}`
      ),
      recipeInstructions: recipePreparation,
      // Additional beneficial fields for recipes
      // image: `${getBaseUrl()}/images/blog/${imageName}`,
      image: `${getBaseUrl()}/images/blog/${post.image}`,
      author: {
        "@type": "Person",
        name: source || "Mishela Blog Team",
      },
      nutrition: {
        "@type": "NutritionInformation",
        calories: calories,
        alcoholContent: abv + " Alc. Un.",
      },
      review: userReviews.map((review) => ({
        "@type": "Review",
        author: { "@type": "Person", name: review.name },
        datePublished: formatIntDate(review.id, lang),
        reviewBody:
          review[`${lang}-text`].length > 250
            ? `${review[`${lang}-text`].slice(0, 250)}...`
            : review[`${lang}-text`],
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingItem?.ratingAvg || ratingAverage, // Calculated average
        reviewCount: ratingVotes || userReviews?.length // Number of reviews
      },
      recipeCuisine: localeCountry && localeCountry.trim() ? localeCountry : "USA",
      suitableForDiet: suitableForDiet.length > 0 ? suitableForDiet : undefined,
      url: `${getBaseUrl()}/${lang}/blog/${slug}`,
      recipeYield: "1 cocktail",
    },
  };
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const {
    post,
    article,
    overallName,
    source,
    abv,
    calories,
    dosage,
    garnish,
    dietaryInfo,
    ingredients,
    preparation,
    localeCountry,
    ratingAverage,
    ratingVotes
  } = getCocktailPostData(slug, lang);
  // const post = Object.values(posts).find((post) => post[lang].slug === slug);

  // RETRIEVE AND FORMAT COMMENTS TO BE PASSED ON
  const validComments = await getUserReviews(comments, post.cocktailId, lang);

  if (!post) return {}; // Optional: handle case when post is not found

  const seoContent = generateSEOContent(
    post,
    article,
    validComments,
    source,
    abv,
    calories,
    dietaryInfo,
    dosage,
    preparation,
    ingredients,
    localeCountry,
    lang,
    slug,
    ratingAverage,
    ratingVotes
  );
  const baseUrl = getBaseUrl();
  // console.log("ratingItem: ", ratingItem) 
  return {
    title: seoContent.title,
    description: seoContent.description,
    keywords: seoContent.keywords, // From your JSON
    openGraph: {
      title: article.title,
      description: seoContent.description,
      type: "article",
      locale: lang,
      url: `${baseUrl}/${lang}/blog/${slug}`,
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
      // canonical: `${baseUrl}/${lang}/blog/${slug}`,
      languages: {
        en: `${baseUrl}/en/blog/${article.slugs.en}`,
        es: `${baseUrl}/es/blog/${article.slugs.es}`,
        it: `${baseUrl}/it/blog/${article.slugs.it}`,
        'x-default': `${baseUrl}/en/blog/${article.slugs.en}`
      },
    },
    // Add this so it can be used in BlogPost
    schema: seoContent.schema,
  };
}

export default async function BlogPost({ params }) {
  const { lang, slug } = await params;
  const { t } = await initTranslations(lang, ['blog'])

  const {
    post,
    article,
    overallName,
    source,
    iba,
    tags,
    abv,
    calories,
    dosage,
    garnish,
    dietaryInfo,
    ingredients,
    preparation,
    country,
    ratingAverage,
    ratingVotes
  } = getCocktailPostData(slug, lang);
  const ratingItem = getRatingItem(post.cocktailId);
  // console.log("BlogPost ratingAverage: ", ratingAverage)
  // console.log("BlogPost ratingVotes: ", ratingVotes)

  // console.log("getCocktailData garnish:", garnish);
  if (!post) {
    // console.log("Post not found for slug:", slug); // Log the slug that was not found
    return <div>Post not found</div>; // Handle 404
  }

  // RETRIEVE AND FORMAT COMMENTS TO BE PASSED ON
  const validComments = await getUserReviews(comments, post.cocktailId, lang);
  // console.log("validComments is: ", validComments);

  // RETRIEVE AND FORMAT COUNTRY IN LOCAL LANGUAGE TO BE PASSED ON TO RECIPE
  const cleanedCountry = country.trim().toLowerCase();
  const localeCountry = countryTranslations[lang]?.[cleanedCountry];

  // RETRIEVE AND FORMAT PREP TIME TO BE PASSED ON TO RECIPE AND SEO SCHEMA
  const prepTime = Math.max(0, preparation.length - 1);
  const totalTime = preparation.length + 1;
  const ratingAvg = ratingItem?.ratingAvg || ratingAverage;
  const ratingCount = ratingItem?.votes || ratingVotes;
  const fullRating = { ratingAvg, ratingCount }
  // console.log("ratingItem: ", ratingItem)
  // console.log("ratingAverage: ", ratingAverage)
  // console.log("fullRating: ", fullRating)

  const {
    title,
    intro,
    description,
    statement,
    history,
    invented,
    variations,
    quote,
    closing,
    tips,
  } = post[lang];

  const seoContent = generateSEOContent(
    post,
    article,
    validComments,
    source,
    abv,
    calories,
    dietaryInfo,
    dosage,
    preparation,
    ingredients,
    localeCountry,
    lang,
    slug,
    ratingAvg,
    ratingCount
  );

  // console.log("ratingAvg: ",ratingAvg)
  return (
    <>
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoContent.schema),
          }}
        />
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
            <a href="#recipe-section" className="jump-to-recipe">
              <FaArrowDownShortWide className="icon" /> {t('blog.jump_recipe')}
            </a>
          </div>
          <div className="article-plain-content use-geist">
            <div className="rating-box">
              <div style={{ marginRight: 30 }}>
                {/* <RatingComponent
                  fullRating={fullRating}
                  cocktailId={post.cocktailId}
                  votes={t('blog.ratings')}
                  message={t('blog.alert_rating_msm')}
                /> */}
              </div>
              <div>
                <a href="#comment-section">
                  <FaRegComment className="icon" /> {t('blog.comment')}
                </a>
              </div>
              {iba && (
                <div className="dietary-icons-box">
                  <div className="iba-box">{t('blog.iba')}</div>
                </div>
              )}
            </div>
          </div>
          <div className="article-plain-content use-geist">
            <MarkdownParagraph language={lang}>{intro}</MarkdownParagraph>
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
          <div className="article-plain-content use-geist">
            <MarkdownParagraph language={lang}>{description}</MarkdownParagraph>            
          </div>

          {/* QUOTE */}
          <Quote data={statement} type="plain" />

          {/* DID YOU KNOW... INVENTED BOXES */}
          <div style={{ marginBottom: 20 }}>
            <HistoryCard
              cocktail={overallName}
              quote={quote}
              invented={invented}
              headerInvented={t('blog.who_invented')}
              headerGuess={t('blog.did_you_know')}
              lang={lang}
            />
          </div>

          {/* HISTORY */}
          <LineHeaderLeft
            title={`${t('blog.history_tab')} "${overallName}"`}
            icon={"History"}
          />
          <div className="article-content use-geist mb-30">
            <MarkdownParagraph language={lang}>{history}</MarkdownParagraph>
            {/* <p>{history}</p> */}
          </div>

          {/* APP PROMO SECTION */}
          <AppBannerSmall lang={lang} />

          {/* BARTENDER TIPS */}
          <LineHeaderLeft title={`${t('blog.tips_tab')}  "${overallName}"`} />
          <div className="article-content use-geist">
            {tips?.intro && <div className="mb-10">{tips.intro}</div>}
            <ul className="ingredients-list">
              {tips?.items.map((item, index) => (
                <li key={index}>
                  <MarkdownParagraph language={lang} isListItem>
                    {item}
                  </MarkdownParagraph>
                </li>
              ))}
            </ul>
          </div>

          {/* RECIPE*/}
          <div id="recipe-section">
            <RecipeCard
              cocktail={overallName}
              statement={post[lang].statement}
              tags={tags}
              dosage={dosage}
              garnish={garnish}
              preparation={preparation}
              vegetarian={dietaryInfo.vegetarian}
              vegan={dietaryInfo.vegan}
              glutenfree={dietaryInfo.glutenFree}
              dairyfree={dietaryInfo.dairyFree}
              calories={calories}
              prepTime={prepTime}
              totalTime={totalTime}
              abv={abv}
              country={localeCountry}
              lang={lang}
              img={post.image}
              caller={"blog"}
            />
          </div>

          {/* VARIATIONS */}
          {variations.length > 0 &&
            <LineHeaderLeft
              title={
                lang === "en"
                  ? `"${overallName}" ${t('blog.variations_tab')}`
                  : `${t('blog.variations_tab')} "${overallName}"`
              }
            />}
          <div className="article-content use-geist">
            <ul className="ingredients-list">
              {variations.map((item, index) => (
                <li key={index}>
                  <MarkdownParagraph language={lang} isListItem>
                    {item}
                  </MarkdownParagraph>
                </li>
              ))}
            </ul>
            <div className="mt-20">
              <MarkdownParagraph language={lang}>{closing}</MarkdownParagraph>
            </div>
          </div>

          <div id="comment-section" style={{ marginTop: 50, marginBottom: 50 }}>
            <CommentSection
              cocktailComments={validComments}
              cocktailId={post.cocktailId}
              lang={lang}
              cocktail={overallName}
            />
          </div>
        </article>
      </div>
    </>
  );
}
