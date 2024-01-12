"use client";

import { FC, useEffect, useState } from "react";
import { CommentComponent } from "~/components/comment-component";
import { API_URL } from "~/constants/api-url";
import { Comment } from "~/types";
import { cn } from "~/utils/cn";

interface CommentsFeedProps {
  storyKids: number[];
  level?: number;
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ storyKids, level }) => {
  const [comments, setComments] = useState<Comment[]>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const commentIds = storyKids;

  useEffect(() => {
    const fetchComments = async () => {
      const commentRequests = commentIds.map(async commentId => {
        const response = await fetch(`${API_URL}/item/${commentId}.json`);
        const commentData = await response.json();
        return commentData;
      });

      const commentDataArray = await Promise.all(commentRequests);
      setComments(commentDataArray);
    };

    if (commentIds.length > 0) {
      fetchComments();
    }
  }, [commentIds]);

  const renderNestedComments = (comment: Comment) => {
    if (comment.kids && comment.kids.length > 0) {
      return (
        <div
          className={cn(
            "grid grid-cols-[max-content_auto] ml-2 py-4 gap-2",
            isCollapsed && "hidden"
          )}>
          <div className="bg-zinc-400 dark:bg-zinc-500 w-[1px] h-full"></div>
          <CommentsFeed storyKids={comment.kids} />
        </div>
      );
    }
    return null;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="grid grid-flow-row gap-4">
      {comments &&
        comments.map(comment => (
          <div key={comment.id}>
            <CommentComponent comment={comment} />
            <div className="grid grid-flow-col gap-2 w-max place-items-center">
              {/* in case no replies */}
              {comment.kids && (
                <>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {comment.kids.length} {comment.kids.length !== 1 ? "replies" : "reply"}
                  </span>
                  <button
                    onClick={toggleCollapse}
                    className="text-blue-500 hover:text-blue-700 duration-300 ease-in-out text-xs">
                    {isCollapsed ? (
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
              )}
            </div>
            {renderNestedComments(comment)}
          </div>
        ))}
    </div>
  );
};
