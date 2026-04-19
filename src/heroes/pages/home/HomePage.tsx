import { use, useMemo } from "react";
import { Navigate, useSearchParams } from "react-router";

import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Jumbotron from "@/components/custom/Jumbotron";
import HeroStats from "@/heroes/components/HeroStats";
import HeroGrid from "@/heroes/components/HeroGrid";
import PaginationComponent from "@/components/custom/PaginationComponent";
import BreadcrumsComponents from "@/components/custom/BreadcrumsComponents";

import useSummary from "@/heroes/hooks/useSummary";
import usePaginatedHero from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavouriteHeroContext";

type Tabs = "all" | "favorites" | "heroes" | "villains";

export default function SuperheroApp() {
  const { favorites, favoritesCount } = use(FavoriteHeroContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab: Tabs = (searchParams.get("tab") ?? "all") as Tabs;
  const page = +(searchParams.get("page") ?? 1);
  const limit = +(searchParams.get("limit") ?? 6);
  const category = searchParams.get("category") ?? "all";

  const selectedTab: Tabs = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { heroes } = usePaginatedHero(page, limit, category);
  const { summary, isError } = useSummary();

  function changeTab(tab: string, category = "") {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      prev.set("category", category);
      prev.set("page", "1");

      return prev;
    });
  }

  if (isError) return <Navigate to="/" />;

  return (
    <>
      {/* Header */}
      <Jumbotron
        title="Super Hero Database"
        description="Descubre y administra personajes del mundo superheroíco"
      />
      <BreadcrumsComponents pageName="Inicio" isRoot={true} />
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => changeTab("all", "all")}>
            Todos ({summary?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            onClick={() => changeTab("favorites", "all")}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Favoritos ({favoritesCount})
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() => changeTab("heroes", "hero")}
          >
            Héroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => changeTab("villains", "villain")}
          >
            Villanos ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>
        {heroes && (
          <>
            <TabsContent value="all">
              <HeroGrid heroes={heroes?.heroes} />
            </TabsContent>
            <TabsContent value="favorites">
              <HeroGrid heroes={favorites} />
            </TabsContent>
            <TabsContent value="heroes">
              <HeroGrid heroes={heroes?.heroes} />
            </TabsContent>
            <TabsContent value="villains">
              <HeroGrid heroes={heroes?.heroes} />
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Pagination */}
      {selectedTab === "favorites" || (
        <PaginationComponent totalPages={heroes ? heroes.pages : 4} />
      )}
    </>
  );
}
