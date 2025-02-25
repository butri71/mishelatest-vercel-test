import Image from "next/image";
import Link from 'next/link';

import * as dataAll from "../../../../data/all.json";
import "./components.css";

const locals = {
  en: "recipe",
  es: "receta",
  it: "ricetta",
};

export default function DrinkCard({ bg, glassImage, name, drinkId, locale }) {  
  const cocktailSlug =
    name
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") 
      .replace(/^-+|-+$/g, "") +
    "-" + locals[locale];

    // console.log("DrinkCard locale: ", locale);
  return (
    <div>
      <Link
        // href={`/${locale}/recipes/${cocktailSlug}?id=${drinkId}`}
        href={`/${locale}/recipes/${cocktailSlug}/${drinkId}`}
        className="recipe-card-link"
      >
        <div className="drink-card">
          <div className="drink-card-top">
            <div
              className="drink-card-img"
              style={{
                backgroundColor: dataAll[`rgb-${bg}`],
              }}
            />
            <Image
              src={`/images/glasses/${glassImage}`}
              alt={glassImage}
              className="drink-image"
              width={100}
              height={100}
              priority={false}
            />
          </div>
          <div
            className="drink-card-info"
            style={{
              backgroundColor: dataAll[`rgb-${bg}`],
            }}
          >
            <h3 className="drink-card-title">{name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
