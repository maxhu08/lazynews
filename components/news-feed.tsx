"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "~/constants/api-url";

export const NewsFeed: FC = () => {
  const [stories, setStories] = useState<number[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await axios.get(`${API_URL}/v0/beststories.json`);
      setStories(data);
    };

    fetchStories();
  }, []);

  return <div>{JSON.stringify(stories, null, 2)}</div>;
};
