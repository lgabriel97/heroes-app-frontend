import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  pageName: string;
  route?: Breadcrumb[];
  isRoot?: boolean;
}

export default function BreadcrumsComponents({
  pageName,
  route,
  isRoot,
}: Props) {
  return (
    <Breadcrumb className="m-5">
      <BreadcrumbList>
        {!isRoot && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Link to="/">Inicio</Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <>
          {route &&
            route.map((r) => (
              <div key={r.label}>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link to={r.to}>{r.label}</Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ))}
          <>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        </>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
