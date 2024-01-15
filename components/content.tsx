import { FC } from "react";
import ReactHtmlParser from "react-html-parser";

interface ContentProps {
  text: string;
}

export const Content: FC<ContentProps> = ({ text }) => {
  const transform = (node: any) => {
    if (node.type === "tag" && node.name === "a") {
      const aClasses = "text-blue-500 hover:text-blue-600 transition underline";

      if (!node.attribs.class) {
        node.attribs.class = aClasses;
      } else {
        node.attribs.class += ` ${aClasses}`;
      }
    }
    return undefined;
  };

  return <div className="grid grid-flow-row gap-6">{ReactHtmlParser(text, { transform })}</div>;
};
