import {
  ShoppingBasket,
  Clock,
  AlarmClock,
  Leaf,
  Citrus,
  Scale,
  HandPlatter,
} from "lucide-react";

import initTranslations from "@/i18n";
// import SocialShare from "../components/SocialShare";
import MarkdownParagraph from "../../../utils/MarkdownParagraph";
import "./recipes.css";

const ML_TO_OZ_MAP = {
  5: "⅙", // or '0.17'
  7.5: "¼",
  10: "⅓",
  15: "½",
  20: "⅔",
  22.5: "¾",
  25: "¾", // rounded to nearest common fraction
  30: "1",
  40: "1⅓",
  45: "1½",
  50: "1⅔",
  60: "2",
  75: "2½",
  90: "3",
  100: "3⅓",
  120: "4",
  150: "5",
};

export default async function RecipeCard({
  cocktail,
  tags,
  dosage,
  garnish,
  preparation,
  vegetarian,
  vegan,
  glutenfree,
  dairyfree,
  calories,
  prepTime,
  totalTime,
  abv,
  country,
  lang,
  img,
  caller,
}) {
  const { t } = await initTranslations(lang, ["blog"]);
  const totalVolume = dosage
    .filter((item) => item.unit.includes("ml")) // Include only liquid ingredients
    .reduce((sum, item) => {
      const value = parseFloat(item.measurement); // Extract numeric part
      return sum + (isNaN(value) ? 0 : value); // Add if valid number
    }, 0);

  // INDIVIDUAL INGREDIENT ITEM
  const renderMeasurement = (item, unit) => {
    // First check if quantity is 'none' or empty
    // console.log("renderMeasurement.item: ",item)
    if (item.unit === "none") {
      return `${item.measurement} ${item.ingredient.toUpperCase()}`;
      // return `${item.measurement} ${item.ingredient.toUpperCase()}`;
    }

    if (item.unit === "ml" || item.unit === "oz") {
      if (unit === "oz") {
        // Use mapping for oz conversion
        const ozValue =
          ML_TO_OZ_MAP[item.measurement] || (item.measurement / 30).toFixed(2);
        return `${ozValue} oz ${item.ingredient.toUpperCase()}`;
      }
      // Keep as ml    {t('cocktails.item.unit')}
      return `${item.measurement} ml ${item.ingredient.toUpperCase()}`;
      // return `${item.measurement} ml ${item.ingredient.toUpperCase()}`;
    }
    // Leave as-is if unit is not "ml" or "oz"
    return `${item.measurement} ${t(
      `cocktails.${item.unit}`
    )} ${item.ingredient.toUpperCase()}`;
    // return `${item.measurement} ${item.unit} ${item.ingredient}`;
  };
  const recipeTitle =
    lang === "en"
      ? `${cocktail} ${t("recipe.recipe")}`
      : `${t("recipe.recipe")} ${cocktail}`;
  const abvRate = (abv * 1000) / totalVolume;
  const proofRate = abvRate?.toFixed(0) * 2;
  const isDietaryAvailable = vegan || vegetarian || glutenfree || dairyfree;

  // console.log("RecipeCard img: ", img)
  return (
    <div className="recipe-container">
      <div className="recipe-inner-container">
        <div className="card-recipe-header">
          <div className="header-recipe-content">
            {/* <h2 className="title">{cocktail} {content.recipe}</h2> */}
            <h2 className="title">{recipeTitle}</h2>
          </div>
          {tags && (
            <div className="tags-recipe">
              {/* <div>
                {tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    {content[tag]}
                  </span>
                ))}
              </div> */}
              <div className="prep-recipe-box">
                <span>
                  <AlarmClock className="icon" />
                  {t("recipe.prepTime")} <strong>{prepTime} min</strong>
                </span>
                <span>
                  <HandPlatter className="icon" style={{ marginLeft: 20 }} />
                  {t("recipe.totalTime")} <strong>{totalTime} min</strong>
                </span>
              </div>
              <div className="prep-recipe-box">
                {/* <SocialShare title={recipeTitle} img={img} caller={caller} /> */}
              </div>
            </div>
          )}
        </div>
        <div className="card-content">
          <hr className="recipe-separator" />
          <div className="recipe-grid">
            <div className="recipe-section">
              <h3 className="recipe-section-title">
                <ShoppingBasket className="icon" /> {t("recipe.tabIngredients")}
              </h3>
              {/* Unit Toggle */}
              <div className="unit-toggle">
                <input type="radio" id="ml" name="unit" defaultChecked />
                <label htmlFor="ml">ml</label>
                <input type="radio" id="oz" name="unit" />
                <label htmlFor="oz">oz</label>

                {/* INGREDIENTS LIST */}
                <div className="ingredient-view">
                  <ul className="ingredient-list ml-view">
                    {dosage.map((item, index) => (
                      <li key={index}>{renderMeasurement(item, "ml")}</li>
                    ))}
                  </ul>
                  <ul className="ingredient-list oz-view">
                    {dosage.map((item, index) => (
                      <li key={index}>{renderMeasurement(item, "oz")}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* GARNISH INFO */}
              {garnish.length > 0 && garnish[0] !== "none" && (
                <div style={{ marginTop: 20 }}>
                  <h3 className="recipe-section-title">
                    <Citrus className="icon" /> {t("recipe.tabGarnish")}
                  </h3>
                  <ul className="garnish-list">
                    {garnish.map((item, index) => {
                      return (
                        <li key={index}>
                          {t(`cocktails.${item}`).toUpperCase()}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* PREPARATION INFO */}
            <div className="recipe-section">
              <h3 className="recipe-section-title">
                <Clock className="icon" /> {t("recipe.tabPreparation")}
                {/* {content.tabPreparation} */}
              </h3>
              <ol className="preparation-list">
                {preparation.map((step, index) => (
                  <li key={index}>
                    {/* {step} */}
                    <MarkdownParagraph language={lang} mb={0}>
                      {step}
                    </MarkdownParagraph>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <hr className="recipe-separator" />
          <div className="recipe-grid">
            {/* ENERGY INFO */}
            <div className="recipe-section">
              <h3 className="recipe-section-title">
                <Scale className="icon" /> {t("recipe.tabNutri")}
                {/* {content.tabNutri} */}
              </h3>
              <ul className="info-list">
                <li>
                  {/* <span>{content.calories}</span> */}
                  <span>{t("recipe.calories")}</span>
                  <span>{calories} kcal</span>
                </li>
                <li>
                  {/* <span>{content.alcUnits}</span> */}
                  <span>{t("recipe.alcUnits")}</span>
                  <span>
                    {Number(abv || 0).toFixed(1)} {t("recipe.units")}
                    {/* {content.units} */}
                  </span>
                </li>
                <li>
                  {/* <span>{content.abv}</span> */}
                  <span>{t("cocktails.ABV")}</span>
                  <span>~{abvRate?.toFixed(0)}% ({proofRate} proof)</span>
                </li>
              </ul>
            </div>

            {/* DIETARY INFO */}
            <div className="recipe-section">
              {isDietaryAvailable && (
                <h3 className="recipe-section-title">
                  <Leaf className="icon" /> {t("recipe.tabDietary")}
                </h3>
              )}
              <div className="badge-container">
                {vegan && <span className="badge">{t("recipe.vegan")}</span>}
                {vegetarian && (
                  <span className="badge">{t("recipe.vegetarian")}</span>
                )}
                {glutenfree && (
                  <span className="badge">{t("recipe.gluten_free")}</span>
                )}
                {dairyfree && (
                  <span className="badge">{t("recipe.dairy_free")}</span>
                )}
              </div>
              {country && (
                <div className="info-item">
                  <span>
                    {t("recipe.country")} <strong>{country}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
