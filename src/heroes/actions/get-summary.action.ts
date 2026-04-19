import { heroesAPI } from "../api/heroes.api";
import type { SummaryResponse } from "../types/get-summary.response";

export async function getSummaryAction(): Promise<SummaryResponse> {
  const { data } = await heroesAPI.get<SummaryResponse>("/summary");

  return data;
}
