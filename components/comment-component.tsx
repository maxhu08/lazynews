import Link from "next/link";
import { FC } from "react";
import { Content } from "~/components/content";
import { ExistingComment } from "~/types";
import { formatTimeAgo } from "~/utils/format-time";

interface CommentComponentProps {
  comment: ExistingComment;
}

export const CommentComponent: FC<CommentComponentProps> = ({ comment }) => {
  return (
    <div className="grid grid-flow-row">
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        by{" "}
        <Link
          href={`/users/${comment.by}`}
          className="hover:text-black dark:hover:text-white transition"
        >
          {comment.by}
        </Link>{" "}
        • {formatTimeAgo(comment.time)}
      </span>
      <div className="break-words overflow-auto">
        <Content text={comment.text} />
      </div>
    </div>
  );
};
