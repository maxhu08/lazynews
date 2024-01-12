import { FC } from "react";

interface CommentsFeedProps {
  storyKids: number[];
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ storyKids }) => {
  return <div>{storyKids.length}</div>;
};
