"use client";

import { ChevronLeft, Terminal, Webhook, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Separator } from "~/components/separator";
import { ThemeToggle } from "~/components/theme-toggle";
import { cn } from "~/utils/cn";

export const Navbar: FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigationControls = () => {
    if (pathname === "/") {
      return (
        <div className="grid grid-cols-[max-content_max-content] gap-1 text-indigo-500 place-items-center select-none">
          <Terminal className="w-4 h-4" />
          <span>news</span>
        </div>
      );
    } else {
      return (
        <Link href="/">
          <div className="grid grid-cols-[max-content_max-content] gap-1 text-blue-500 hover:text-blue-700 duration-300 ease-in-out place-items-center cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            <span>Home</span>
          </div>
        </Link>
      );
    }
  };

  return (
    <nav className="fixed z-20 w-full top-0 ease-in-out backdrop-blur-2xl">
      <div className="py-2 px-2 md:px-4 grid grid-cols-[1fr_auto_1fr] w-full">
        <div className="w-max">{navigationControls()}</div>
        <div></div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <Separator orientation="horizontal" className={cn("transition-all duration-500 mx-auto bg-gray-300 dark:bg-border", scrolled ? "w-full visible" : "w-0 invisible")} />
    </nav>
  );
};