"use client";

import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { FC, useContext, useEffect, useState } from "react";
import { StoryComponent } from "~/components/story-component";
import { API_URL } from "~/constants/api-url";
import { Context } from "~/context";
import type { NewsMode, Story } from "~/types";

const storyFetchMap: { [key in NewsMode]: string } = {
  "best-stories": "beststories.json",
  "new-stories": "topstories.json",
  "newest-stories": "newstories.json",
  "ask-stories": "askstories.json",
  "show-stories": "showstories.json",
  "job-stories": "jobstories.json"
};

export const StoriesFeed: FC = () => {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const fetchAmount = 20;
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(true);
  const [prevNewsMode, setPrevNewsMode] = useState<NewsMode>("best-stories");

  const context = useContext(Context);

  useEffect(() => {
    const fetchStoryIds = async () => {
      const { data } = await axios.get(`${API_URL}/${storyFetchMap[context.value.newsMode]}`);
      setStoryIds(data);

      setLoading(false);

      // reset if change news mode
      if (context.value.newsMode !== prevNewsMode) {
        setPrevNewsMode(context.value.newsMode);
        setStories([]);
        setFetch(true);
      }
    };
    fetchStoryIds();
  }, [context.value.newsMode, prevNewsMode]);

  useEffect(() => {
    const fetchStories = async () => {
      setFetch(false);
      setLoading(true);

      const storyRequests = storyIds.slice(skip, skip + fetchAmount).map(async storyId => {
        const stories = await axios.get(`${API_URL}/item/${storyId}.json`);
        return stories.data;
      });

      const storiesData: Story[] = await Promise.all(storyRequests);
      setStories(prev => [...prev, ...storiesData]);
      setLoading(false);
    };

    if (fetch && !loading && storyIds.length !== 0) fetchStories();
  }, [storyIds, skip, loading, fetch]);

  const handleFetchMore = () => {
    setSkip(prev => prev + fetchAmount);
    setFetch(true);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      {stories.map(story => (
        <StoryComponent story={story} key={story.id} />
      ))}
      <div className="grid place-items-center py-4">
        {loading ? (
          <p>loading...</p>
        ) : (
          <button
            onClick={handleFetchMore}
            className="bg-indigo-500 hover:bg-indigo-700 duration-300 ease-in-out p-1 rounded-md">
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
