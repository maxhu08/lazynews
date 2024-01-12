import { FC } from "react";

interface CommentsFeedProps {
  storyId: number;
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ storyId }) => {
  return <div>comments</div>;
};
