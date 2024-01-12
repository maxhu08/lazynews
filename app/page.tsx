"use client";

import { useContext } from "react";
import { AskStoriesFeed } from "~/components/feeds/ask-stories-feed";
import { BestStoriesFeed } from "~/components/feeds/best-stories-feed";
import { NewStoriesFeed } from "~/components/feeds/new-stories-feed";
import { NewestStoriesFeed } from "~/components/feeds/newest-stories-feed";
import { NewsToggle } from "~/components/news-toggle";
import { Context } from "~/context";

// prettier-ignore
const newsFeedMap = {
  "best-stories": <BestStoriesFeed />,
  "new-stories": <NewStoriesFeed />,
  "newest-stories": <NewestStoriesFeed />,
  "ask-stories": <AskStoriesFeed />
};

const Page = () => {
  const context = useContext(Context);

  return (
    <div className="mx-auto w-full sm:w-[60%] md:w-[40%] pt-12 md:pt-16 pb-10">
      <div className="mb-2">
        <NewsToggle />
      </div>
      {newsFeedMap[context.value.newsMode]}
    </div>
  );
};

export default Page;
