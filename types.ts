export type NewsMode = "best-stories" | "new-stories" | "newest";

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: string;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
