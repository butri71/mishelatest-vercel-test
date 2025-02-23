// BLOG RECIPES SCREEN
import { getBaseUrl } from "@/utils/urls";
import initTranslations from "@/i18n";

import cocktails from "../../../../data/CocktailBlog";
import LineHeaderMiddle from "../components/LineHeaderMiddle";
import CocktailCard from "../components/CocktailCard";
import "../components/recipes.css";

// export const dynamicParams = true;
// export const revalidate = 604800; // Cache for 7 days
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "it" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, ["blog"]);

  const baseUrl = getBaseUrl();

  return {
    title: `${t("recipe.seoRecipesTitle")}`,
    description: t("recipe.seoRecipesDescription"),
    keywords: t("recipe.seoRecipesKeywords"),
    openGraph: {
      title: `${t("recipe.seoRecipesTitle")}`,
      description: t("recipe.seoRecipesDescription"),
      type: "website",
      locale: lang,
    },
    alternates: {
      // canonical: `${baseUrl}/${lang}/recipes`,
      languages: {
        en: `${baseUrl}/en/recipes`,
        es: `${baseUrl}/es/recipes`,
        it: `${baseUrl}/it/recipes`,
        "x-default": `${baseUrl}/en/recipes`,
      },
    },
  };
}

export default async function BlogList({ params }) {
  const { lang, slug } = await params;
  const { t } = await initTranslations(lang, ["blog"]);

  const cocktailRecipes = Object.values(cocktails)
    .sort((a, b) => a.all.overallName.localeCompare(b.all.overallName)) // Sort by published date
    .map((cocktail) => {
      const allCocktail = cocktail["all"];
      const langCocktail = cocktail[lang];

      if (!langCocktail) {
        return null; // Or return a default post object
      }

      const cocktailSlug =
        allCocktail.overallName
          .normalize("NFD") // Normalize to decompose accented characters
          .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
          .replace(/^-+|-+$/g, "") +
        "-" +
        t("recipe.slugRecipe");
      // .replace(/^-+|-+$/g, '') + '-' + content.slugRecipe;

      return {
        slug: cocktailSlug,
        ingredients: langCocktail.ingredientsLocale,
        glass: allCocktail.glass,
        colour: allCocktail.image,
        cocktailId: allCocktail.drinkId,
        cocktail: allCocktail.overallName,
      };
    })
    .filter((cocktail) => cocktail !== null);

  // console.log("cocktails", cocktailRecipes.length)
  return (
    <div className="recipes-container">
      <LineHeaderMiddle title={t("recipe.headerRecipes")} isH1={true} />

      {/* List of most popular cocktails sorted by most recent*/}
      <CocktailCard
        cocktails={cocktailRecipes}
        locale={lang}
        type={"recipes"}
        caller={"recipes"}
      />
    </div>
  );
}
