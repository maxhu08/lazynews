"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "~/constants/api-url";
import { StoryComponent } from "~/components/story-component";
import { Story } from "~/types";

export const NewsFeed: FC = () => {
  const [bestStories, setBestStories] = useState([]);

  useEffect(() => {
    const fetchBestStories = async () => {
      const { data: bestStoryIds } = await axios.get(`${API_URL}/beststories.json`);

      for (let i = 0; i < 5; i++) {
        const { data: story } = await axios.get(`${API_URL}/item/${bestStoryIds[i]}.json`);
        // @ts-expect-error
        setBestStories(prevStories => [...prevStories, story]);
      }
    };

    fetchBestStories();
  }, []);

  return (
    <div className="grid grid-flow-row gap-2">
      {bestStories.map((story: Story) => (
        <StoryComponent story={story} key={story.id} />
      ))}
    </div>
  );
};
