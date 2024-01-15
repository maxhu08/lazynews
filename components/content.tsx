import { FC } from "react";
import ReactHtmlParser from "react-html-parser";

interface ContentProps {
  text: string;
}

export const Content: FC<ContentProps> = ({ text }) => {
  const transform = (node: any) => {
    if (node.type === "tag" && node.name === "p") {
      const pClasses = "pt-6";

      if (!node.attribs.class) {
        node.attribs.class = pClasses;
      } else {
        node.attribs.class += ` ${pClasses}`;
      }
    }
    // <a> tag
    if (node.type === "tag" && node.name === "a") {
      const aClasses = "text-blue-500 hover:text-blue-600 transition underline";

      if (!node.attribs.class) {
        node.attribs.class = aClasses;
      } else {
        node.attribs.class += ` ${aClasses}`;
      }
    }
    // <i> tag
    if (node.type === "tag" && node.name === "i") {
      const iClasses = "inline";

      if (!node.attribs.class) {
        node.attribs.class = iClasses;
      } else {
        node.attribs.class += ` ${iClasses}`;
      }
    }

    return undefined;
  };

  return <div className="">{ReactHtmlParser(text, { transform })}</div>;
};
