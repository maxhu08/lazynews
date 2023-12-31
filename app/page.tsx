"use client";

import { useContext } from "react";
import { BestStoriesFeed } from "~/components/feeds/best-stories-feed";
import { NewStoriesFeed } from "~/components/feeds/new-stories-feed";
import { NewestFeed } from "~/components/feeds/newest-feed";
import { NewsToggle } from "~/components/news-toggle";
import { Context } from "~/context";

const Page = () => {
  const context = useContext(Context);

  return (
    <div className="mx-auto w-full sm:w-[60%] md:w-[40%] pt-12 md:pt-16 pb-10">
      <div className="mb-2">
        <NewsToggle />
      </div>
      {context.value.newsMode === "best-stories" && <BestStoriesFeed />}
      {context.value.newsMode === "new-stories" && <NewStoriesFeed />}
      {context.value.newsMode === "newest" && <NewestFeed />}
    </div>
  );
};

export default Page;
