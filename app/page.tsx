import { StoriesFeed } from "~/components/feeds/stories-feed";
import { NewsToggle } from "~/components/news-toggle";

const Page = () => {
  return (
    <>
      <div className="mb-2">
        <NewsToggle />
      </div>
      <StoriesFeed />
    </>
  );
};

export default Page;
