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
  metadataBase: new URL("https://yclazynews.vercel.app"),
  title: "lazynews",
  description: "Modern client for browsing Y Combinator's hackernews",
  openGraph: {
    title: "lazynews",
    description: "Modern client for browsing Y Combinator's hackernews",
    images: ["/logo.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContextProvider initalValue={defaultContextValue}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.className,
            "min-h-screen bg-neutral-200 dark:bg-neutral-900 antialiased"
          )}
          dir="ltr"
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="mx-auto w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] pb-10">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ContextProvider>
  );
}
