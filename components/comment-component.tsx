import { FC } from "react";
import { Content } from "~/components/content";
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
        <div className="break-words overflow-auto">
          <Content text={comment.text} />
        </div>
      </div>
    </div>
  );
};
