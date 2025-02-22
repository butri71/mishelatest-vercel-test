import cocktailsJson from "../../data/CocktailBlog.json";
import posts from "../../data/posts.json";

export function getCocktailPostData(slug, lang) {
  // Find the article where the current language has the matching slug
  const post = Object.values(posts).find((post) => post[lang]?.slug === slug);
  if (!post) {
    return null; // Handle missing post gracefully
  }

  // Find matching cocktail data using cocktailId
  const cocktailData = Object.values(cocktailsJson).find(
    (cocktail) => parseInt(cocktail.all.drinkId) === parseInt(post.cocktailId)
  );

  // Extract data from cocktails JSON in the local language
  const source = cocktailData?.[lang]?.origin || "";
  const iba = cocktailData?.all.tagsSelected.includes("iba") || "";
  const abv = cocktailData?.all.abv || "";
  const country = cocktailData?.all.country || "";
  const calories = Math.round(cocktailData?.all?.calories || 0).toString();  
  const ratingVotes = cocktailData?.all?.ratingCount || 0;
  const ratingAverage = cocktailData?.all?.ratingAvg || 0;
  const tagline = cocktailData?.all?.taglineSelected || [];
  const tags = tagline.split(",").map((tag) => tag.trim());
  const ingredients = cocktailData?.[lang]?.ingredientsLocale || [];

  // Group dietary information
  const dietaryInfo = {
    vegetarian: cocktailData?.all.vegetarian || false,
    vegan: cocktailData?.all.vegan || false,
    dairyFree: cocktailData?.all.dairy_free || false,
    glutenFree: cocktailData?.all.gluten_free || false,
  };

  const preparation =
    cocktailData?.[lang]?.preparation?.map((step) => step.preparationStep) || [];

  // Create dosage array combining quantities with localized ingredients
  const dosage =
    cocktailData?.all?.dosage
      ?.map((item, index) =>
        item.main !== "garnish"
          ? {
            measurement: item.quantity,
            unit: item.unit,
            ingredient: ingredients[index],
          }
          : null
      )
      .filter(Boolean) || [];

  // const garnish =
  //   cocktailData?.all?.dosage
  //     ?.map((item, index) =>
  //       item.main === "garnish"
  //         ? {
  //           measurement: item.unit === 'none' ? "" : `${item.quantity} ${item.unit}`,
  //           // ingredient: item.dosageIngredient,
  //           ingredient: ingredients[index],
  //         }
  //         : null
  //     )
  //     .filter(Boolean) || [];

  const garnish= cocktailData?.all?.garnish?.map(item => item.value) || [];

  // const overallName = post.name.replace(/\b\w/g, (c) => c.toUpperCase());
  const overallName = post.name;
  const article = post[lang];

  // Return structured data
  return {
    post,
    cocktailData,
    source,
    iba,
    abv,
    calories,
    dietaryInfo, // Grouped dietary information  
    tagline,
    tags,
    ingredients,
    preparation,
    dosage,
    garnish,
    overallName,
    article,
    country,
    ratingAverage,
    ratingVotes
  };
}
