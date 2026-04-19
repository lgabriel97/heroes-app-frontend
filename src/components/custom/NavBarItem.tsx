import { Link } from "react-router";
import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Props {
  path: string;
  name: string;
  isActive?: boolean;
}

export default function NavBarItem({ path, name, isActive }: Props) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        active={false}
        className={cn(
          // navigationMenuTriggerStyle(),

          "rounded-md p-2",
          isActive && "bg-slate-200",
        )}
      >
        <Link to={path}>{name}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
