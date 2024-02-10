"use client";

import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { CommentComponent } from "~/components/comment-component";
import { StoryComponent } from "~/components/story-component";
import { API_URL } from "~/constants/api-url";
import type { Submission } from "~/types";

interface SubmissionsFeedProps {
  submissionIds: number[];
}

export const SubmissionsFeed: FC<SubmissionsFeedProps> = ({ submissionIds }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const fetchAmount = 20;
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      setFetch(false);
      setLoading(true);

      const submissionRequestions = submissionIds
        .slice(skip, skip + fetchAmount)
        .map(async (submissionId) => {
          const stories = await axios.get(`${API_URL}/item/${submissionId}.json`);
          return stories.data;
        });

      const submissionsData: Submission[] = await Promise.all(submissionRequestions);
      // works but should fix later
      setSubmissions((prev) => [
        ...prev,
        ...submissionsData.filter((submission) => {
          return true;
        })
      ]);

      setInitialLoading(false);
      setLoading(false);
    };

    if (fetch && !loading && submissionIds.length !== 0) fetchStories();
  }, [skip, loading, fetch]);

  const handleFetchMore = () => {
    setSkip((prev) => prev + fetchAmount);
    setFetch(true);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      {submissions.map((submission) => {
        if (submission.type === "comment" && !submission.deleted) {
          return (
            <div className="bg-neutral-800 p-2 rounded-md">
              <CommentComponent comment={submission} />
            </div>
          );
        }
        if (submission.type === "story") {
          return <StoryComponent story={submission} />;
        }

        return null;
      })}
      <div className="grid place-items-center py-4">
        {loading || initialLoading ? (
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
