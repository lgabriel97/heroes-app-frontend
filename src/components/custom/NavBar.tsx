import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavBarItem from "./NavBarItem";
import { useLocation } from "react-router";

export function NavBar() {
  const { pathname } = useLocation();

  const isActive = (path: string): boolean => path === pathname;

  return (
    <NavigationMenu value="">
      <NavigationMenuList>
        <NavBarItem path="/" name="Inicio" isActive={isActive("/")} />
        <NavBarItem
          path="/search"
          name="Buscar"
          isActive={isActive("/search")}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
