"use client";

import { BellRing, Newspaper, Sliders, Sun, Trophy } from "lucide-react";
import { FC, useContext } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Context } from "~/context";
import { NewsMode } from "~/types";

const map = {
  "best-stories": { text: "Best Stories", icon: <Trophy className="w-4 h-4" /> },
  "new-stories": { text: "News Stories", icon: <Newspaper className="w-4 h-4" /> },
  newest: { text: "Newest", icon: <BellRing className="w-4 h-4" /> }
};

export const NewsToggle: FC = () => {
  const context = useContext(Context);

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-gray-500/20 dark:hover:bg-white/20 duration-300 ease-in-out rounded-md" asChild>
          <div className="grid grid-cols-[max-content_max-content] place-items-center w-max p-2 gap-2">
            <Sliders className="w-6 h-6" />
            <h1 className="font-semibold text-2xl w-max">{map[context.value.newsMode].text}</h1>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {Object.keys(map).map(item => {
            const mode = map[item as NewsMode];

            return (
              <DropdownMenuItem onClick={() => context.setValue({ ...context.value, newsMode: item as NewsMode })} className="cursor-pointer" key={`mode-${item}`}>
                <div className="flex place-items-center w-full gap-2">
                  <span>{mode.text}</span>
                  <div className="ml-auto">{mode.icon}</div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
