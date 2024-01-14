import { FC } from "react";
import ReactHtmlParser from "react-html-parser";

interface ContentProps {
  text: string;
}

export const Content: FC<ContentProps> = ({ text }) => {
  return <div>{ReactHtmlParser(text)}</div>;
};
