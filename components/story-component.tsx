import { FC } from "react";
import { Story } from "~/types";

interface StoryComponentProps {
  story: Story;
}

export const StoryComponent: FC<StoryComponentProps> = ({ story }) => {
  return (
    <div className="bg-neutral-800 sm:rounded-md p-2">
      <div>
        <div className="grid grid-flow-row">
          <span className="text-xs">
            {story.score} by {story.by} {story.time}
          </span>
          <span>story {story.title}</span>
        </div>
      </div>
    </div>
  );
};
