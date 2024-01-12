export type NewsMode =
  | "best-stories"
  | "new-stories"
  | "newest-stories"
  | "ask-stories"
  | "show-stories"
  | "job-stories";

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  text?: string;
}
