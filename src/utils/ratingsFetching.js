// import ratingsData from "../../data/ratings.json";
import ratingsData from "../../data/app-ratings.json";

// find ratings for cocktailId and render it back
export function getRatingItem(cocktailId) {
  // console.log("getRatingItem cocktailId: ",cocktailId);
  // const cocktail = Object.values(ratingsData).find(
  //   (item) => item.cocktailId === String(cocktailId)  );   
  // return cocktail ? cocktail.ratings : null;
  const cocktail = Object.values(ratingsData).find(
    (item) => String(item.drinkId) === String(cocktailId)
  );   
  // console.log("getRatingItem cocktail: ",cocktail);
  return cocktail ? {
    ratingAvg: Number(cocktail.ratingAvg.toFixed(1)),
    score: cocktail.rating,
    votes: cocktail.ratingCount
  } : null;
}
