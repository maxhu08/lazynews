"use client";

import { FC, useEffect, useState } from "react";
import { API_URL } from "~/constants/api-url";

interface CommentsFeedProps {
  storyKids: number[];
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ storyKids }) => {
  const [comments, setComments] = useState<any[]>();
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

  return (
    <div>{comments && comments.map((comment, index) => <div key={index}>{comment.text}</div>)}</div>
  );
};
