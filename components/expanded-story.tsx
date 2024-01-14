import { MessagesSquare, ThumbsUp } from "lucide-react";
import { FC } from "react";
import { Content } from "~/components/content";
import { CommentsFeed } from "~/components/feeds/comments-feed";
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
      <Content text={story.text ? story.text : ""} />
      <div className="w-max grid place-items-center grid-flow-col gap-1">
        <span>{story.score}</span>
        <ThumbsUp className="w-4 h-4" />
      </div>
      <Separator orientation="horizontal" className="bg-zinc-400 dark:bg-zinc-500 my-2" />
      <div className="w-max grid place-items-center grid-flow-col gap-1">
        <MessagesSquare className="w-4 h-4" />
        <span className="font-semibold">
          {story.descendants} comment{story.descendants !== 1 && "s"}
        </span>
      </div>
      <CommentsFeed storyKids={story.kids} level={1} />
    </div>
  );
};
