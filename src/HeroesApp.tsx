import { RouterProvider } from "react-router";
import { router } from "./router/app.router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoriteHeroProvider } from "./heroes/context/FavouriteHeroContext";

const queryClient = new QueryClient();

export default function HeroesApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  );
}
