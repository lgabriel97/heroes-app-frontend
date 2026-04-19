import Jumbotron from "@/components/custom/Jumbotron";
import HeroStats from "@/heroes/components/HeroStats";
import SearchBox from "./components/SearchBox";
import BreadcrumsComponents from "@/components/custom/BreadcrumsComponents";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchHeroAction } from "@/heroes/actions/search-heroes.action";
import HeroGrid from "@/heroes/components/HeroGrid";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("query") || "";
  const strength = searchParams.get("strength") || "";

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroAction({ name, strength }),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <Jumbotron
        title="Búsqueda de Super Héroes"
        description="Descubre y administra personajes del mundo superheroíco"
      />
      <BreadcrumsComponents pageName="Buscar" />
      <HeroStats />
      <SearchBox />
      <HeroGrid heroes={heroes} />
    </>
  );
}
