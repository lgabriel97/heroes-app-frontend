import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  mainContent: string;
  icon: React.ReactNode;
  secondaryContent?: string;
  accented?: boolean;
  fontSize?: string;
}

export default function HeroStatsCard({
  title,
  icon,
  mainContent,
  secondaryContent,
  accented,
  fontSize,
  children,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {accented ? (
          <div className={`${fontSize ?? "text-2xl"} font-bold text-red-600`}>
            {mainContent}
          </div>
        ) : (
          <div className={`${fontSize ?? "text-lg"} font-bold`}>
            {mainContent}
          </div>
        )}
        <div className="flex gap-1 mt-2">{children}</div>

        <p className="text-xs text-muted-foreground">{secondaryContent}</p>
      </CardContent>
    </Card>
  );
}
