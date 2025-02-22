// BLOG SINGLE RECIPE SCREEN
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import initTranslations from "@/i18n";

import { country as countryTranslations } from "../../components/translations/countries";
import { getBaseUrl } from "@/utils/urls";
import AppBannerSmall from "../../components/AppBannerSmall";
// import RatingDisplay from "../../components/RatingDisplay";
import QrCodeGenerator from "../../components/QrCodeGenerator";
import * as dataAll from "../../../../../data/all.json";
import posts from "../../../../../data/posts.json";
import { getCocktailData } from "../../../../utils/cocktailDataFetching";
import { getRatingItem } from "../../../../utils/ratingsFetching";
import { capitalizeWords } from "../../../../utils/capitalizeString";
import MarkdownParagraph from "../../../../utils/MarkdownParagraph";
import RecipeCard from "../../components/RecipeCard";
import "../../components/recipes.css";

// export const dynamicParams = true;
// export const revalidate = 604800;
// export const dynamic = "force-static";

// Helper function to generate SEO content
function generateSEOContent(
  cocktailData,
  source = "",
  abv = "",
  calories = "",
  dietaryInfo = [],
  ingredients = [],
  preparation = [],
  dosage = [],
  glassImage = "",
  postImage = "",
  country = "",
  lang,
  slug,
  ratingAverage,
  ratingVotes
) {
  const cocktailId = cocktailData?.all.drinkId;
  const cocktailName = cocktailData?.all.overallName;
  const recipeImage =
    postImage !== ""
      ? `${getBaseUrl()}/images/blog/${postImage}`
      : `${getBaseUrl()}/images/glasses/${glassImage}`;

  const ing1 = capitalizeWords(ingredients[0], lang);
  const ing2 = capitalizeWords(ingredients[1], lang);
  const upperCocktail = capitalizeWords(cocktailName, lang);
  const localeTitles = {
    en: (cocktailName) => `${upperCocktail} recipe`,
    es: (cocktailName) => `${upperCocktail} | receta original`,
    it: (cocktailName) => `${upperCocktail} | ricetta originale`,
  };
  const localsIngredients = {
    en: "ingredients of",
    es: "ingredientes de",
    it: "ingredienti del",
  };
  const localsCalories = {
    en: "how many calories has",
    es: "cuantas calorías tiene",
    it: "quante calorie ha",
  };
  const localeKeywords = {
    en: (cocktailName) => `How to Make the cocktail ${upperCocktail}`,
    es: (cocktailName) => `Como hacer el cóctel ${upperCocktail}`,
    it: (cocktailName) => `Come si fa il cocktail ${upperCocktail}`,
  };
  const pageTitle = localeTitles[lang](cocktailName);
  const seoDescriptions = {
    en: `Learn how to make the classic cocktail ${upperCocktail} in minutes with ${ing1} and ${ing2}. Follow our easy ${preparation.length} steps recipe for a great drink at home.`,
    es: `Aprende a preparar el clásico cóctel ${upperCocktail} en unos minutos con ${ing1} y ${ing2}. Sigue nuestra sencilla receta de ${preparation.length} pasos para preparar una bebida profesional en casa.`,
    it: `Impara a preparare il cocktail ${upperCocktail} con ${ing1} e ${ing2} in pochi minuti. Segui la nostra ricetta in ${preparation.length} passaggi semplici per preparare un ottimo drink a casa.`,
  };

  const baseKeywords = [
    localeKeywords[lang]?.(cocktailName),
    `${ingredients[0]} cocktail`, // Primary ingredient cocktail
    ...(source ? [source] : []),
    `${localsIngredients[lang]} ${upperCocktail}`,
    `${localsCalories[lang]} ${upperCocktail}`,
    ...ingredients,
    // ...(country ? [`cocktail ${country}`] : []),
  ];
  const recipePreparation = preparation.map((tip, index) => ({
    "@type": "HowToStep",
    text: tip,
    position: index + 1,
    name: `Step ${index + 1}`,
  }));

  const ratingItem = getRatingItem(cocktailId);
  // console.log("generateSEOContent ratingItem: ", ratingItem)

  // Map dietary info to RestrictedDiet values
  const dietaryMapping = {
    vegetarian: "https://schema.org/VegetarianDiet",
    vegan: "https://schema.org/VeganDiet",
    dairyFree: "https://schema.org/LowLactoseDiet",
    glutenFree: "https://schema.org/GlutenFreeDiet",
  };

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
    title: pageTitle,
    description: seoDescriptions[lang],
    // description: articleData.intro || articleData.description.slice(0, 160),
    keywords: baseKeywords,
    // Schema markup for cocktail recipe
    schema: {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: pageTitle,
      description: seoDescriptions[lang],
      // description: articleData.intro || articleData.description.slice(0, 160),
      recipeCategory: "Cocktail",
      prepTime: formatTime(prepTimeMinutes),
      totalTime: formatTime(totalTimeMinutes),
      keywords: baseKeywords,
      recipeIngredient: dosage.map(
        (item) => `${item.measurement} ${item.unit} ${item.ingredient}`
      ),
      recipeInstructions: recipePreparation,
      // Additional beneficial fields for recipes
      // image: `${getBaseUrl()}/images/glasses/${glassImage}`,
      image: recipeImage,
      author: {
        "@type": "Person",
        name: "Mishela Cocktail App",
      },
      nutrition: {
        "@type": "NutritionInformation",
        calories: calories,
        alcoholContent: Number(abv).toFixed(1) + " Alc. Un.",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingItem?.ratingAvg || ratingAverage, // Calculated average
        bestRating: 5,
        ratingCount: ratingItem?.votes || ratingVotes,
        // reviewCount: ratingItem.votes, // Number of reviews
      },
      // recipeCuisine: country,
      recipeCuisine: country && country.trim() ? country : "USA",
      suitableForDiet: suitableForDiet.length > 0 ? suitableForDiet : undefined,
      url: `${getBaseUrl()}/${lang}/recipes/${slug}?id=${cocktailId}`,
      recipeYield: "1 cocktail",
    },
  };
}

export async function generateMetadata({ params, searchParams }) {
  const { lang, slug } = await params;
  const cocktailId = searchParams.id;

  const locals = {
    en: "recipe",
    es: "receta",
    it: "ricetta",
    // Add other languages here
  };
  const getCanonicalSlug = (name, language) => {
    return (
      name
        ?.normalize("NFD") // Normalize to decompose accented characters
        .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
        .replace(/^-+|-+$/g, "") + // Remove leading and trailing dashes
      "-" +
      locals[language]
    );
  };

  const {
    cocktailData,
    source,
    abv,
    calories,
    dietaryInfo,
    ingredients,
    preparation,
    dosage,
    glassImage,
    postImage,
    // garnish,
    // overallName,
    country,
    ratingAverage,
    ratingVotes,
  } = getCocktailData(cocktailId, lang);
  // console.log("generateMetadata glassImage: ",glassImage)

  const cocktailName = cocktailData?.all?.overallName;

  const ing1 = capitalizeWords(ingredients[0], lang);
  const ing2 = capitalizeWords(ingredients[1], lang);
  const upperCocktail = capitalizeWords(cocktailName, lang);
  const localeTitles = {
    en: (cocktailName) => `${upperCocktail} drink recipe`,
    es: (cocktailName) => `${upperCocktail} | receta cóctel original`,
    it: (cocktailName) => `${upperCocktail} | ricetta cocktail originale`,
  };
  // const localeTitles = {
  //     "en": (cocktailName) => `How to Make the cocktail ${upperCocktail}`,
  //     "es": (cocktailName) => `Como preparar el cóctel ${upperCocktail}`,
  //     "it": (cocktailName) => `Come preparare il cocktail ${upperCocktail}`,
  // };

  const pageTitle = localeTitles[lang](cocktailName);
  const seoDescriptions = {
    en: `Learn how to make the classic cocktail ${upperCocktail} in minutes with ${ing1} and ${ing2}. Follow our easy ${preparation.length} steps recipe for a great drink at home, checking ingredients and calories.`,
    es: `Aprende a preparar el clásico cóctel ${upperCocktail} en unos minutos con ${ing1} y ${ing2}. Sigue nuestra sencilla receta de ${preparation.length} pasos para preparar una bebida profesional en casa comprobando ingredientes y calorías.`,
    it: `Impara a preparare il cocktail ${upperCocktail} con ${ing1} e ${ing2} in pochi minuti. Segui la nostra ricetta in ${preparation.length} passaggi semplici per preparare un ottimo drink a casa con ingredienti e calorie.`,
  };

  const seoContent = generateSEOContent(
    cocktailData,
    source,
    abv,
    calories,
    dietaryInfo,
    ingredients,
    preparation,
    dosage,
    glassImage,
    postImage,
    country,
    lang,
    slug,
    ratingAverage,
    ratingVotes
  );
  const baseUrl = getBaseUrl();

  return {
    title: pageTitle,
    description: seoDescriptions[lang],
    keywords: seoContent.keywords,
    openGraph: {
      title: pageTitle,
      description: seoDescriptions[lang],
      // type: "article",
      locale: lang,
      url: `${baseUrl}/${lang}/recipes/${slug}?id=${cocktailId}`,
      // images: [
      //     {
      //         url: `${baseUrl}/images/blog/${post.image}`,
      //         width: 900,
      //         height: 600,
      //         alt: article.title,
      //         type: "image/jpeg",
      //     },
      // ],
      siteName: "Mishela Cocktail Recipes",
    },
    alternates: {
      // canonical: `${baseUrl}/${lang}/recipes/${slug}?id=${cocktailId}`,
      languages: {
        ...Object.keys(locals).reduce((acc, language) => {
          acc[language] = `${baseUrl}/${language}/recipes/${getCanonicalSlug(
            cocktailName,
            language
          )}?id=${cocktailId}`;
          return acc;
        }, {}),
        "x-default": `${baseUrl}/en/recipes/${getCanonicalSlug(
          cocktailName,
          "en"
        )}?id=${cocktailId}`,
      },
      // languages: Object.keys(locals).reduce((acc, language) => {
      //     acc[language] = `/${language}/recipes/${getCanonicalSlug(cocktailName, language)}?id=${cocktailId}`;
      //     return acc;
      // }, {}),
    },
    // Add this so it can be used in BlogPost
    schema: seoContent.schema,
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "it" }];
}

export default async function BlogPost({ params, searchParams }) {
  const { lang, slug } = params;
  const cocktailId = searchParams.id;
  // console.log("cocktailId:", cocktailId)

  // Find matching cocktail data using cocktailId
  const postRecord = Object.values(posts).find(
    (post) => parseInt(post.cocktailId) === parseInt(cocktailId)
  );

  const { t } = await initTranslations(lang, ["blog"]);

  const {
    cocktailData,
    source,
    iba,
    abv,
    calories,
    dietaryInfo,
    glass,
    glassImage,
    postImage,
    tagline,
    tags,
    ingredients,
    preparation,
    dosage,
    garnish,
    overallName,
    country,
    type,
    origin,
    ratingAverage,
    ratingVotes,
    description,
  } = getCocktailData(cocktailId, lang);
  const ratingItem = getRatingItem(cocktailId);

  // RETRIEVE AND FORMAT COUNTRY IN LOCAL LANGUAGE TO BE PASSED ON TO RECIPE
  const cleanedCountry = country?.trim().toLowerCase();
  const localeCountry = countryTranslations[lang]?.[cleanedCountry];
  const upperCocktail = capitalizeWords(overallName, lang);
  const title = `${t("recipe.seoRecipe")} ${upperCocktail}`;
  const isQRcode = cocktailData?.all.qrcode;

  // RETRIEVE AND FORMAT PREP TIME TO BE PASSED ON TO RECIPE AND SEO SCHEMA
  const prepTime = Math.max(0, preparation.length - 1);
  const totalTime = preparation.length + 1;
  const ratingAvg = ratingItem?.ratingAvg || ratingAverage;
  const ratingCount = ratingItem?.votes || ratingVotes;

  const seoContent = generateSEOContent(
    cocktailData,
    source,
    abv,
    calories,
    dietaryInfo,
    ingredients,
    preparation,
    dosage,
    glassImage,
    postImage,
    country,
    lang,
    slug,
    ratingAverage,
    ratingVotes
  );

  // console.log("Recipe description: ", description)
  return (
    <>
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoContent.schema),
          }}
        />
        <div className="recipe-post-container">
          <div className="recipe-title">
            <h1>
              {t("recipe.headerRecipeH1")} {upperCocktail}
            </h1>
          </div>
          <div className="recipe-content">
            <MarkdownParagraph language={lang}>{description}</MarkdownParagraph>
          </div>
          {/* <div className="top-recipe-container">
            <div
              className="recipe-image-container"
              style={{ backgroundColor: dataAll[`rgb-${type.value}`] }}
            >
              <Image
                src={`/images/glasses/${glassImage}`}
                alt={title}
                className="recipe-image"
                width={400}
                height={400}
                priority={true}
              />
            </div>
            <div className="glass-side-wrapper">
              
              <div className="cocktail-tags">
                {tags && (
                  <div>
                    {tags.map((tag, index) => (
                      <span key={index} className="recipe-tag-item">
                        {t(`recipe.${tag}`)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="middle-right">
                <div className="side-image-container">
                  {iba && (
                    // <div className="dietary-icons-box">
                    <div className="main-info-container">
                      <div className="main-info-label">
                        {t("recipe.recognition")}
                      </div>
                      <div className="main-info-box">{t("recipe.iba")}</div>
                    </div>
                  )}
                  {glass && (
                    <div className="main-info-container">
                      <div className="main-info-label">{t("recipe.glass")}</div>
                      <div className="main-info-box">{glass}</div>
                    </div>
                  )}
                  {source && (
                    <div className="main-info-container">
                      <div className="main-info-label">
                        {t("recipe.source")}
                      </div>
                      <div className="main-info-box">
                        {source
                          ? source
                          : origin
                          ? origin
                          : t("recipe.unknown")}
                      </div>
                    </div>
                  )}
                  <RatingDisplay
                    ratingAvg={ratingAvg}
                    votes={ratingCount}
                    message={t("blog.alert_rating_msm")}
                  /> 
                </div>
                
                <div className="side-image-container">
                  {isQRcode && <QrCodeGenerator drinkId={cocktailId} />}
                </div>
              </div>
            </div>
          </div> */}
          {/* BLOG LINK BUTTON */}
          {/* {postRecord && postRecord[lang]?.slug && (
            <div className="blog-banner-container">
              <div className="btnBanner">
                <Link
                  href={`/${lang}/blog/${postRecord[lang].slug}`}
                  className="cta-button-red"
                >
                  {t("recipe.blog-link")}
                </Link>
              </div>
            </div>
          )} */}

          {/* RECIPE*/}
          <div id="recipe-section">
            <Suspense fallback={<div>Loading Recipe Card...</div>}>
              <RecipeCard
                cocktail={overallName}
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
                img={glassImage}
                caller={"glasses"}
              />
            </Suspense>
          </div>

          {/* APP PROMO SECTION */}
          <AppBannerSmall lang={lang} />
        </div>
      </div>
    </>
  );
}
