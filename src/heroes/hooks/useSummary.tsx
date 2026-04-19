import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export default function useSummary() {
  const query = useQuery({
    queryKey: ["summary"],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5,
  });

  return {
    // Data
    summary: query.data,
    isError: query.isError,
  };
}
