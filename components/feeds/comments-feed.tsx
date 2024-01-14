"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { CollapsibleComment } from "~/components/collapsible-comment";
import { API_URL } from "~/constants/api-url";
import { Comment } from "~/types";

interface CommentsFeedProps {
  level: number;
  storyKids: number[];
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ level, storyKids }) => {
  const [comments, setComments] = useState<Comment[]>();
  const commentIds = storyKids;

  useEffect(() => {
    const fetchComments = async () => {
      const commentRequests = commentIds.map(async (commentId) => {
        const comments = await axios.get(`${API_URL}/item/${commentId}.json`);
        return comments.data;
      });

      const commentsData = await Promise.all(commentRequests);
      setComments(commentsData);
    };

    fetchComments();
  }, [commentIds]);

  return (
    <div className="grid grid-flow-row gap-4">
      {comments &&
        comments.map((comment) => (
          <CollapsibleComment comment={comment} level={1} key={comment.id} />
        ))}
    </div>
  );
};
