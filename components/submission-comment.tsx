import Link from "next/link";
import { FC } from "react";
import { Content } from "~/components/content";
import { ExistingComment } from "~/types";
import { formatTimeAgo } from "~/utils/format-time";

interface SubmissionCommentProps {
  comment: ExistingComment;
}

export const SubmissionComment: FC<SubmissionCommentProps> = ({ comment }) => {
  return (
    <div className="bg-neutral-800 p-2 rounded-md">
      <div className="grid grid-flow-row">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          <Link
            href={`/users/${comment.by}`}
            className="hover:text-black dark:hover:text-white transition"
          >
            {comment.by}
          </Link>{" "}
          commented on{" "}
          <Link
            className="text-emerald-500 hover:text-emerald-600 transition"
            href={`/items/${comment.parent}`}
          >
            {comment.parent}
          </Link>
          • {formatTimeAgo(comment.time)}
        </span>
        <div className="break-words overflow-auto">
          <Content text={comment.text} />
        </div>
      </div>
    </div>
  );
};
