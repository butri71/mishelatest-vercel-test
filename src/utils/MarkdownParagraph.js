import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";

import { resolveInternalLink } from "./linkResolver";

function MarkdownParagraph({
  children,
  language = "en",
  className,
  mb = "1em",
  isListItem = false
}) {

  // console.log("MarkdownParagraph language: ", language)
  // console.log("MarkdownParagraph isListItem: ", isListItem)
  // console.log("MarkdownParagraph children: ", children)
  // const processContent = (text) => {
  //   if (typeof text !== "string") return String(text || "");
  //   return text.replace(/\[([^\]]+)\]/g, (match, linkText) => {
  //     const resolvedLink = resolveInternalLink(linkText, language);
  //     return resolvedLink ? `[${linkText}](${resolvedLink})` : match;
  //   });
  // };
  const processContent = (text) => {
    if (typeof text !== "string") return String(text || "");
    // Changed this line - added (?!\() 
    return text.replace(/\[([^\]]+)\](?!\()/g, (match, linkText) => {
      const resolvedLink = resolveInternalLink(linkText, language);
      return resolvedLink ? `[${linkText}](${resolvedLink})` : match;
    });
  };

  // Process the content before passing to ReactMarkdown
  const processedContent = processContent(children);

  return (
    <ReactMarkdown
      components={{
        // p: ({ node, children, ...props }) => (
        //   <p className={className} {...props} style={{ marginBottom: mb }}>
        //     {children}
        //   </p>
        // ),
        p: ({ node, children, ...props }) =>
          isListItem ? (
            <>{children}</>
          ) : (
            <p className={className} {...props} style={{ marginBottom: mb }}>
              {children}
            </p>
          ),
        a: ({ node, href, children, ...props }) => {          
          // External link check
          const isExternalLink =
            href.startsWith("http://") || href.startsWith("https://");

          if (isExternalLink) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          }

          return (
            <Link href={href} {...props}>
              {children}
            </Link>
          );
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}

export default MarkdownParagraph;
