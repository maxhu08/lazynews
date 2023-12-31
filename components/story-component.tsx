import { FC } from "react";
import { Story } from "~/types";
import { ExternalLink, MessagesSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { shortenUrl } from "~/utils/shorten-url";

interface StoryComponentProps {
  story: Story;
}

export const StoryComponent: FC<StoryComponentProps> = ({ story }) => {
  return (
    <div className="bg-neutral-300 dark:bg-neutral-800 sm:rounded-md p-2">
      <div className="grid grid-cols-[60px_auto] gap-1">
        <div className="grid place-items-center grid-flow-col">
          <span>{story.score}</span>
          <ThumbsUp className="w-4 h-4" />
        </div>
        <div className="grid grid-flow-row">
          <div className="grid grid-flow-row">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              by {story.by} {story.time}
            </span>
            <span className="font-semibold">{story.title}</span>
          </div>
          <div className="grid grid-flow-col gap-1 place-items-center w-max">
            {shortenUrl(story.url) && (
              <a className="cursor-pointer">
                <div className="grid grid-cols-[max-content_max-content] place-items-center gap-1 text-blue-500 hover:bg-blue-500/20 duration-300 ease-in-out p-1 w-max rounded-md">
                  <ExternalLink className="w-4 h-4" />
                  <span>{shortenUrl(story.url)}</span>
                </div>
              </a>
            )}
            <Link href={`/items/${story.id}`} className="cursor-pointer">
              <div className="grid grid-cols-[max-content_max-content] place-items-center gap-1 hover:bg-gray-500/20 dark:hover:bg-white/20 duration-300 ease-in-out p-1 w-max rounded-md">
                <MessagesSquare className="w-4 h-4" />
                <span>
                  {story.descendants} <span className="hidden sm:bloc">comments</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
