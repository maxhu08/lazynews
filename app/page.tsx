import { StoriesFeed } from "~/components/feeds/stories-feed";
import { NewsToggle } from "~/components/news-toggle";

const Page = () => {
  return (
    <div className="mx-auto w-full sm:w-[60%] md:w-[40%] pt-12 md:pt-16 pb-10">
      <div className="mb-2">
        <NewsToggle />
      </div>
      <StoriesFeed />
    </div>
  );
};

export default Page;
