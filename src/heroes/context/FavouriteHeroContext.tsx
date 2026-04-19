import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoritesCount: number;

  //Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext<FavoriteHeroContext>(
  {} as FavoriteHeroContext,
);

function getFavoritesFromLocalStorage() {
  const favoritesStorage = localStorage.getItem("favorites");
  return favoritesStorage ? JSON.parse(favoritesStorage) : [];
}

export function FavoriteHeroProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  function isFavorite(hero: Hero): boolean {
    return !!favorites.find((h) => h.slug === hero.slug);
  }

  function toggleFavorite(hero: Hero) {
    if (isFavorite(hero)) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }
    setFavorites([...favorites, hero]);
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoritesCount: favorites.length,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
}
