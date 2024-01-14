import { FC } from "react";
import { Story } from "~/types";
import { ExternalLink, MessagesSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { shortenUrl } from "~/utils/shorten-url";
import { formatTimeAgo } from "~/utils/format-time";

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
              by {story.by} • {formatTimeAgo(story.time)}
            </span>
            <p className="font-semibold break-words">{story.title}</p>
          </div>
          <div className="grid grid-flow-col gap-1 place-items-center w-max">
            {shortenUrl(story.url) && (
              <a href={story.url} target="_blank" className="cursor-pointer">
                <div className="grid grid-cols-[max-content_max-content] place-items-center gap-1 text-blue-500 hover:bg-blue-500/20 duration-300 ease-in-out p-1 w-max rounded-md">
                  <ExternalLink className="w-4 h-4" />
                  <p className="max-w-[100px] sm:max-w-[160px] md:max-w-none truncate">
                    {shortenUrl(story.url)}
                  </p>
                </div>
              </a>
            )}
            <Link href={`/items/${story.id}`} className="cursor-pointer">
              <div className="grid grid-cols-[max-content_max-content] place-items-center gap-1 hover:bg-gray-500/20 dark:hover:bg-white/20 duration-300 ease-in-out p-1 w-max rounded-md">
                <MessagesSquare className="w-4 h-4" />
                <span>
                  {story.descendants} <span className="hidden sm:inline-block">comments</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
