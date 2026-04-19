import { Badge } from "@/components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";

import HeroStatsCard from "./HeroStatsCard";
import useSummary from "../hooks/useSummary";
import { use } from "react";
import { FavoriteHeroContext } from "../context/FavouriteHeroContext";

export default function HeroStats() {
  const { summary } = useSummary();
  const { favoritesCount } = use(FavoriteHeroContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatsCard
        title="Personajes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        mainContent={summary?.totalHeroes.toString() ?? ""}
        fontSize="text-2xl"
      >
        <Badge variant="secondary" className="text-xs">
          {summary?.heroCount} Héroes
        </Badge>
        <Badge variant="destructive" className="text-xs">
          {summary?.villainCount} Villanos
        </Badge>
      </HeroStatsCard>

      {summary && (
        <HeroStatsCard
          title="Favoritos"
          icon={<Heart className="h-4 w-4 text-muted-foreground" />}
          mainContent={favoritesCount.toString()}
          secondaryContent={`${((favoritesCount / summary.totalHeroes) * 100).toFixed()}% del total`}
          accented={true}
        />
      )}

      <HeroStatsCard
        title="Más fuerte"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
        mainContent={summary?.strongestHero.alias ?? ""}
        secondaryContent={`Fuerza: ${summary?.strongestHero.strength}/10`}
      />

      <HeroStatsCard
        title="Más inteligente"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        mainContent={summary?.smartestHero.alias ?? ""}
        secondaryContent={`Inteligencia: ${summary?.smartestHero.intelligence}/10`}
      />
    </div>
  );
}
