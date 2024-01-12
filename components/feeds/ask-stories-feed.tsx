"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "~/constants/api-url";
import { StoryComponent } from "~/components/story-component";
import { Story } from "~/types";
import { RefreshCcw } from "lucide-react";

export const AskStoriesFeed: FC = () => {
  const [askStoryIds, setAskStoryIds] = useState<number[]>([]);
  const [askStories, setAskStories] = useState<Story[]>([]);
  const fetchAmount = 20;
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchAskStoryIds = async () => {
      const { data } = await axios.get(`${API_URL}/askstories.json`);
      setAskStoryIds(data);
    };

    fetchAskStoryIds();
  }, []);

  useEffect(() => {
    const fetchBestStories = async () => {
      for (let i = skip; i < skip + fetchAmount; i++) {
        if (askStoryIds[i]) {
          const { data: story } = await axios.get(`${API_URL}/item/${askStoryIds[i]}.json`);

          setAskStories(prevStories => [...prevStories, story]);
        }
      }
    };

    fetchBestStories();
  }, [askStoryIds, skip]);

  return (
    <div className="grid grid-flow-row gap-2">
      {askStories.map(story => (
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
