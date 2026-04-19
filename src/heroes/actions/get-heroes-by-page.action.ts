import { heroesAPI } from "../api/heroes.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function getHeroesByPageAction(
  page: number,
  limit: number = 6,
  category: string = "all",
): Promise<HeroesResponse> {
  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 6;

  const { data } = await heroesAPI.get<HeroesResponse>("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
      category,
    },
  });

  const heroes = data.heroes.map((h) => ({
    ...h,
    image: `${BASE_URL}/images/${h.id}.jpeg`,
  }));

  console.log(heroes[0].image);

  return { ...data, heroes };
}
