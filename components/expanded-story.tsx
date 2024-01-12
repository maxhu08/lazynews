import { FC } from "react";
import { CommentsFeed } from "~/components/feeds/commends-feed";
import { Separator } from "~/components/separator";
import { Story } from "~/types";
import { formatTimeAgo } from "~/utils/format-time";

interface ExpandedStoryProps {
  story: Story;
}

export const ExpandedStory: FC<ExpandedStoryProps> = ({ story }) => {
  return (
    <div className="bg-neutral-300 dark:bg-neutral-800 sm:rounded-md p-2">
      <div className="grid grid-flow-row">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          by {story.by} • {formatTimeAgo(story.time)}
        </span>
        <p className="font-semibold break-words">{story.title}</p>
      </div>
      <div className="mt-2">
        <p>{story.text}</p>
      </div>
      <Separator orientation="horizontal" className="bg-zinc-400 dark:bg-zinc-500 my-2" />
      <p className="font-semibold">
        {story.descendants} comment{story.descendants !== 1 && "s"}
      </p>
      <CommentsFeed storyKids={story.kids} />
    </div>
  );
};
