"use client";

import { FC, useState } from "react";
import { CommentComponent } from "~/components/comment-component";
import { CommentsFeed } from "~/components/feeds/comments-feed";
import { Comment } from "~/types";
import { cn } from "~/utils/cn";

interface CollapsibleCommentProps {
  comment: Comment;
  level: number;
}

export const CollapsibleComment: FC<CollapsibleCommentProps> = ({ comment, level }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div>
      <CommentComponent comment={comment} />
      {comment.kids && (
        <div>
          <div className="grid grid-flow-col gap-2 w-max place-items-center">
            {/* in case no replies */}
            <>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {comment.kids.length} {comment.kids.length !== 1 ? "replies" : "reply"}
              </span>
              <button
                onClick={toggleCollapse}
                className="text-blue-500 hover:text-blue-700 duration-300 ease-in-out text-xs">
                {collapsed ? (
                  <div>
                    <span>expand</span>
                  </div>
                ) : (
                  <div>
                    <span>collapse</span>
                  </div>
                )}
              </button>
            </>
          </div>
          <div
            className={cn(
              "grid grid-cols-[max-content_auto] ml-1 sm:ml-2 py-4 gap-1 sm:gap-2",
              collapsed && "hidden"
            )}>
            <div className="grid grid-rows-[max-content_auto] gap-1 place-items-center">
              <span className="text-sm">{level}</span>
              <div className="bg-zinc-400 dark:bg-zinc-500 w-[1px] h-full"></div>
            </div>
            <CommentsFeed level={level + 1} storyKids={comment.kids} />
          </div>
        </div>
      )}
    </div>
  );
};
