"use client";

import axios from "axios";
import { FC, use, useEffect, useState } from "react";
import { CommentComponent } from "~/components/comment-component";
import { API_URL } from "~/constants/api-url";
import { Comment } from "~/types";
import { cn } from "~/utils/cn";

interface CommentsFeedProps {
  level: number;
  storyKids: number[];
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ level, storyKids }) => {
  const [comments, setComments] = useState<Comment[]>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const commentIds = storyKids;

  useEffect(() => {
    const fetchComments = async () => {
      const commentRequests = commentIds.map(async commentId => {
        const comments = await axios.get(`${API_URL}/item/${commentId}.json`);
        return comments.data;
      });

      const commentsData = await Promise.all(commentRequests);
      setComments(commentsData);
    };

    fetchComments();
  }, [commentIds]);

  const renderNestedComments = (comment: Comment) => {
    if (comment.kids && comment.kids.length > 0) {
      return (
        <div
          className={cn(
            "grid grid-cols-[max-content_auto] ml-1 sm:ml-2 py-4 gap-1 sm:gap-2",
            isCollapsed && "hidden"
          )}>
          <div className="grid grid-rows-[max-content_auto] gap-1 place-items-center">
            <span className="text-sm">{level}</span>
            <div className="bg-zinc-400 dark:bg-zinc-500 w-[1px] h-full"></div>
          </div>
          <CommentsFeed level={level + 1} storyKids={comment.kids} />
        </div>
      );
    }
    return null;
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