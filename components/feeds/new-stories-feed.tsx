"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "~/constants/api-url";
import { StoryComponent } from "~/components/story-component";
import { Story } from "~/types";

export const NewStoriesFeed: FC = () => {
  const [bestStories, setBestStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchBestStories = async () => {
      const { data: bestStoryIds } = await axios.get(`${API_URL}/topstories.json`);

      for (let i = 0; i < 20; i++) {
        const { data: story } = await axios.get(`${API_URL}/item/${bestStoryIds[i]}.json`);

        setBestStories(prevStories => [...prevStories, story]);
      }
    };

    fetchBestStories();
  }, []);

  return (
    <div className="grid grid-flow-row gap-2">
      {bestStories.map(story => (
        <StoryComponent story={story} key={story.id} />
      ))}
    </div>
  );
};
