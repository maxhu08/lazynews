import { StoriesFeed } from "~/components/feeds/stories-feed";
import { NewsToggle } from "~/components/news-toggle";

const Page = () => {
  return (
    <div className="pt-12 md:pt-16 ">
      <div className="mb-2">
        <NewsToggle />
      </div>
      <StoriesFeed />
    </div>
  );
};

export default Page;
