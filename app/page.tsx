import { NewsFeed } from "~/components/news-feed";

const Page = () => {
  return (
    <div className="mx-auto w-full sm:w-[60%] md:w-[40%] pt-12 md:pt-16 pb-10">
      <h1 className="font-semibold text-2xl p-2">Best Stories</h1>
      <NewsFeed />
    </div>
  );
};

export default Page;
