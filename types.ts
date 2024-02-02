export type NewsMode =
  | "top-stories"
  | "best-stories"
  | "new-stories"
  | "newest-stories"
  | "ask-stories"
  | "show-stories"
  | "job-stories";

export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
  text?: string;
};

export type Comment = ExistingComment | DeletedComment;

export type ExistingComment = {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
};

export type DeletedComment = {
  deleted: true;
  id: number;
  parent: number;
  time: number;
  type: "comment";
};

export type User = {
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};
