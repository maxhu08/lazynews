"use client";

import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { CollapsibleComment } from "~/components/collapsible-comment";
import { API_URL } from "~/constants/api-url";
import { Comment } from "~/types";

interface CommentsFeedProps {
  level: number;
  storyKids: number[];
}

export const CommentsFeed: FC<CommentsFeedProps> = ({ level, storyKids }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const commentIds = storyKids;
  const [skip, setSkip] = useState(0);
  const fetchAmount = 4;
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (level > 2) return;
    const fetchComments = async () => {
      setLoading(true);
      const commentIdsToFetch = commentIds.slice(skip, skip + 1);
      const commentRequests = commentIdsToFetch.map(async (commentId) => {
        const comments = await axios.get(`${API_URL}/item/${commentId}.json`);
        return comments.data;
      });

      const commentsData: Comment[] = await Promise.all(commentRequests);
      setComments((prev) => [...prev, ...commentsData]);
      setLoading(false);
      setFetch(false);
    };

    if (fetch && !loading) fetchComments();
  }, [commentIds, skip, fetch, loading, level]);

  const handleFetchMore = () => {
    setSkip((prev) => prev + fetchAmount);
    setFetch(true);
  };

  return (
    <div className="grid grid-flow-row gap-4">
      {comments &&
        comments.map((comment) => (
          <CollapsibleComment comment={comment} level={level} key={comment.id} />
        ))}
      <div className="grid place-items-center py-4">
        {loading ? (
          <p>loading...</p>
        ) : (
          <button
            onClick={handleFetchMore}
            className="bg-indigo-500 hover:bg-indigo-700 duration-300 ease-in-out p-1 rounded-md"
          >
            <div className="grid grid-cols-[max-content_max-content] gap-1 place-items-center text-white">
              <RefreshCcw className="w-4 h-4" />
              <span>Load more</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
