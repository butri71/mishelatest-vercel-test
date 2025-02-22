"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import DrinkCard from "./DrinkCard";
import "./recipes.css";

export default function CocktailLiqueurCard({ cocktails, locale, type }) {
  const scrollContainer = (direction) => {
    const container = document.querySelector(".drink-card-container");
    const scrollAmount = direction === "left" ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  
  return (
    <div className="navigation-container">
      <button
        className="nav-button left"
        onClick={() => scrollContainer("left")}
      >
        <ChevronLeft size={24} />
      </button>
      <div className="drink-card-container">
        {cocktails.map((post) => {
          const glassImage = `${
            post.all.glass?.value + "-" + post.all.image?.value + ".png"
          }`;
          return (
            <DrinkCard 
                key={post.all.drinkId} 
                bg={post.all.type.value} 
                glassImage={glassImage} 
                name={post.all.overallName}  
                drinkId={post.all.drinkId}                  
                locale={locale}       
            />           
          );
        })}
      </div>
      <button
        className="nav-button right"
        onClick={() => scrollContainer("right")}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
