import { FC } from "react";
import { Comment } from "~/types";
import { formatTimeAgo } from "~/utils/format-time";

interface CommentComponentProps {
  comment: Comment;
}

export const CommentComponent: FC<CommentComponentProps> = ({ comment }) => {
  return (
    <div>
      <div className="grid grid-flow-row">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          by {comment.by} • {formatTimeAgo(comment.time)}
        </span>
        <p className="break-words overflow-auto">{comment.text}</p>
      </div>
    </div>
  );
};
