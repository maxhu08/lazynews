"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "~/constants/api-url";
import { StoryComponent } from "~/components/story-component";
import { Story } from "~/types";

export const NewestStoriesFeed: FC = () => {
  const [newStories, setNewStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchBestStories = async () => {
      const { data: newStoryIds } = await axios.get(`${API_URL}/newstories.json`);

      for (let i = 0; i < 20; i++) {
        const { data: story } = await axios.get(`${API_URL}/item/${newStoryIds[i]}.json`);

        setNewStories(prevStories => [...prevStories, story]);
      }
    };

    fetchBestStories();
  }, []);

  return (
    <div className="grid grid-flow-row gap-2">
      {newStories.map(story => (
        <StoryComponent story={story} key={story.id} />
      ))}
    </div>
  );
};
