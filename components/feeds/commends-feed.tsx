"use client";

import { FC, useEffect, useState } from "react";
import { CommentComponent } from "~/components/comment-component";
import { Separator } from "~/components/separator";
import { API_URL } from "~/constants/api-url";
import { Comment } from "~/types";

interface CommentsFeedProps {
  storyKids: number[];
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ storyKids }) => {
  const [comments, setComments] = useState<Comment[]>();
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
        <div className="grid grid-cols-[max-content_auto] ml-2 py-4 gap-2">
          <div className="bg-zinc-400 dark:bg-zinc-500 w-[1px] h-full"></div>
          <CommentsFeed storyKids={comment.kids} />
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
            {renderNestedComments(comment)}
          </div>
        ))}
    </div>
  );
};
