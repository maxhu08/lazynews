import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { cn } from "~/utils/cn";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Navbar } from "~/components/navbar";
import ContextProvider from "~/components/providers/context-provider";
import { defaultContextValue } from "~/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lazynews",
  description: "Modern client for browsing Y Combinator's hackernews"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContextProvider initalValue={defaultContextValue}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "min-h-screen bg-neutral-200 dark:bg-neutral-900 antialiased")} dir="ltr">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ContextProvider>
  );
}
