"use client";

import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { FC, useContext, useEffect, useState } from "react";
import { StoryComponent } from "~/components/story-component";
import { API_URL } from "~/constants/api-url";
import { Context } from "~/context";
import type { Story } from "~/types";

interface SubmissionsFeedProps {
  submissionIds: number[];
}

export const SubmissionsFeed: FC<SubmissionsFeedProps> = ({ submissionIds }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const fetchAmount = 20;
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const context = useContext(Context);

  useEffect(() => {
    const fetchStories = async () => {
      setFetch(false);
      setLoading(true);

      const storyRequests = submissionIds
        .slice(skip, skip + fetchAmount)
        .map(async (submissionId) => {
          const stories = await axios.get(`${API_URL}/item/${submissionId}.json`);
          return stories.data;
        });

      const storiesData: Story[] = await Promise.all(storyRequests);
      // works but should fix later
      setStories((prev) => [
        ...prev,
        ...storiesData.filter((story) => !prev.some((prevStory) => prevStory.id === story.id))
      ]);

      console.log(stories);

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
      {stories.map((story) => (
        <StoryComponent story={story} key={story.id} />
      ))}
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
