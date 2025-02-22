"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels = {
  en: {
    home: "Home",
    blog: "Blog",
    city: "City",
    specials: "Cocktail categories",
    recipes: "Recipes"
  },
  es: {
    home: "Home",
    blog: "Blog",
    city: "City",
    specials: "Categorías de cócteles",
    recipes: "Recetas"
  },
  it: {
    home: "Home",
    blog: "Blog",
    city: "City",
    specials: "Categorie cocktail",
    recipes: "Ricette"
  },
};

export default function Breadcrumb({ lang }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");
  paths.shift();

  if (paths.length === 0) {
    return null;
  }

  const formatLabel = (path) => {
    if (labels[lang][path]) {
      return labels[lang][path];
    }
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        <li>
          <Link href={`/${lang}`}>
            <span className="previous-page">{labels[lang].home}</span>
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${lang}/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;

          return (
            <li key={path}>
              <span className="separator">/</span>
              {isLast ? (
                <span className="current-page">{formatLabel(path)}</span>
              ) : (
                <Link href={href}>
                  <span>{formatLabel(path)}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
