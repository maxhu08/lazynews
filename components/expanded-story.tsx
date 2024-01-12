import { FC } from "react";
import { Story } from "~/types";

interface ExpandedStoryProps {
  story: Story;
}

export const ExpandedStory: FC<ExpandedStoryProps> = ({ story }) => {
  return (
    <div>
      <p>{story.title}</p>
    </div>
  );
};
