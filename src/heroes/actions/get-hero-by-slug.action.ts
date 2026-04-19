import { heroesAPI } from "../api/heroes.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function getHeroBySlugAction(slug: string): Promise<Hero> {
  const { data } = await heroesAPI.get<Hero>("/" + slug);

  return { ...data, image: `${BASE_URL}/images/${data.id}.jpeg` };
}
