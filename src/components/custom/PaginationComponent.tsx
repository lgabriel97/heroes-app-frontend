import { ChevronLeft, MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
  siblings?: number; // cuántas páginas mostrar a cada lado de la actual
}

function getPageRange(
  current: number,
  total: number,
  siblings: number,
): (number | "dots")[] {
  const range: (number | "dots")[] = [];

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  // Siempre página 1
  range.push(1);

  // Dots o páginas entre 1 y el bloque central
  if (left > 2) {
    range.push("dots");
  } else {
    for (let i = 2; i < left; i++) range.push(i);
  }

  // Bloque central
  for (let i = left; i <= right; i++) range.push(i);

  // Dots o páginas entre el bloque central y la última
  if (right < total - 1) {
    range.push("dots");
  } else {
    for (let i = right + 1; i < total; i++) range.push(i);
  }

  // Siempre última página (si hay más de 1)
  if (total > 1) range.push(total);

  return range;
}

export default function PaginationComponent({
  totalPages,
  siblings = 1,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") ?? 1);

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  }

  const pages = getPageRange(page, totalPages, siblings);

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {pages.map((item, index) =>
        item === "dots" ? (
          <Button key={`dots-${index}`} variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            key={item}
            variant={page === item ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(item)}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
