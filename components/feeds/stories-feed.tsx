"use client";

import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { StoryComponent } from "~/components/story-component";
import { API_URL } from "~/constants/api-url";
import type { NewsMode, Story } from "~/types";

interface StoriesFeedProps {
  type: NewsMode;
}

const storyFetchMap: { [key in NewsMode]: string } = {
  "best-stories": "beststories.json",
  "new-stories": "topstories.json",
  "newest-stories": "newstories.json",
  "ask-stories": "askstories.json"
};

export const StoriesFeed: FC<StoriesFeedProps> = ({ type }) => {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const fetchAmount = 20;
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchStoryIds = async () => {
      const { data } = await axios.get(`${API_URL}/${storyFetchMap[type]}`);
      setStoryIds(data);
    };

    fetchStoryIds();
  }, [type]);

  useEffect(() => {
    const fetchStories = async () => {
      for (let i = skip; i < skip + fetchAmount; i++) {
        if (storyIds[i]) {
          const { data: story } = await axios.get(`${API_URL}/item/${storyIds[i]}.json`);

          setStories(prevStories => [...prevStories, story]);
        }
      }
    };

    fetchStories();
  }, [storyIds, skip]);

  return (
    <div className="grid grid-flow-row gap-2">
      {stories.map(story => (
        <StoryComponent story={story} key={story.id} />
      ))}
      <div className="grid place-items-center py-4">
        <button
          onClick={() => setSkip(prevSkip => prevSkip + fetchAmount)}
          className="bg-indigo-500 hover:bg-indigo-700 duration-300 ease-in-out p-1 rounded-md">
          <div className="grid grid-cols-[max-content_max-content] gap-1 place-items-center text-white">
            <RefreshCcw className="w-4 h-4" />
            <span>Load more</span>
          </div>
        </button>
      </div>
    </div>
  );
};
