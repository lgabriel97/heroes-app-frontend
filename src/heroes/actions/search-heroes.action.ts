import { heroesAPI } from "../api/heroes.api";
import type { Hero } from "../types/hero.interface";

const API_URL = import.meta.env.VITE_API_URL;

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export async function searchHeroAction(opt: Options) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(opt)) {
    if (value) {
      params.set(key, value);
    }
  }

  const { data } = await heroesAPI.get<Hero[]>(`/search?${params.toString()}`);

  return data.map((h) => ({ ...h, image: `${API_URL}/images/${h.image}` }));
}
