import cocktailsJson from "../../data/CocktailBlog.json";
import posts from "../../data/posts.json";

export function getCocktailData(cocktailId, lang) {

  // Find matching cocktail data using cocktailId
  const cocktailData = Object.values(cocktailsJson).find(
    (cocktail) => parseInt(cocktail.all.drinkId) === parseInt(cocktailId)
  );
  // Find matching cocktail data using cocktailId
  const postData = Object.values(posts).find(
    (post) => parseInt(post.cocktailId) === parseInt(cocktailId)
  );

  // Extract data from cocktails JSON in the local language
  const source = cocktailData?.all.source || "";
  const iba = cocktailData?.all.tagsSelected.includes("iba") || "";
  const abv = cocktailData?.all.abv || "";
  const country = cocktailData?.all.country || "";
  const glass = cocktailData?.all.glass.label || "";
  const glassImage = `${cocktailData?.all?.glass.value + "-" + cocktailData?.all.image.value + ".png"}`;
  const postImage = postData?.image || "";
  const calories = Math.round(cocktailData?.all?.calories || 0).toString();
  const tagline = cocktailData?.all?.taglineSelected || [];
  const ratingVotes = cocktailData?.all?.ratingCount || 0;
  const ratingAverage = cocktailData?.all?.ratingAvg || 0;  
  const type = cocktailData?.all?.type || [];
  const ingredients = cocktailData?.[lang]?.ingredientsLocale || [];
  const origin = cocktailData?.[lang]?.origin || "";
  const description = cocktailData?.[lang]?.description || "";
  const tags = String(tagline || "").split(",").map((tag) => tag.trim());
  // const tags = tagline?.split(",").map((tag) => tag.trim()) || [];

  // Group dietary information
  const dietaryInfo = {
    vegetarian: cocktailData?.all.vegetarian || false,
    vegan: cocktailData?.all.vegan || false,
    dairyFree: cocktailData?.all.dairy_free || false,
    glutenFree: cocktailData?.all.gluten_free || false,
  };

  const preparation =
    cocktailData?.[lang]?.preparation?.map((step) => step.preparationStep) || [];

  // console.log("getCocktailData before cocktailData?.all?.dosage: ", cocktailData?.all?.dosage)
  // Create dosage array combining quantities with localized ingredients
  const dosage =
    cocktailData?.all?.dosage
      ?.map((item, index) =>
        item.main !== "garnish"
          ? {
            measurement: item.quantity,
            unit: item.unit,
            ingredient: ingredients[index] || item.dosageIngredient,
          }
          : null
      )
      .filter(Boolean) || [];
  // console.log("getCocktailData dosage: ", dosage)
  const garnish = cocktailData?.all?.garnish?.map(item => item.value) || [];
  const overallName = cocktailData?.all?.overallName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // const overallName = cocktailData?.all?.overallName.replace(/\b\w/g, (c) => c.toUpperCase()); 

  // Return structured data
  return {
    // post,
    cocktailData,
    source,
    iba,
    abv,
    calories,
    dietaryInfo, // Grouped dietary information    
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
    description
  };
}
