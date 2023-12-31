import { FC } from "react";
import { Story } from "~/types";
import { ThumbsUp } from "lucide-react";

interface StoryComponentProps {
  story: Story;
}

export const StoryComponent: FC<StoryComponentProps> = ({ story }) => {
  return (
    <div className="bg-neutral-800 sm:rounded-md p-2">
      <div className="grid grid-cols-[60px_auto] gap-1">
        <div className="grid place-items-center grid-flow-col">
          <span>{story.score}</span>
          <ThumbsUp className="w-4 h-4" />
        </div>
        <div className="grid grid-flow-row">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            by {story.by} {story.time}
          </span>
          <span>story {story.title}</span>
        </div>
      </div>
    </div>
  );
};
