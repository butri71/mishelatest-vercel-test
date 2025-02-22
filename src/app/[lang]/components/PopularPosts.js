'use client'

import Image from "next/image";
// import Link from "next/link";

import MarkdownParagraph from "../../../utils/MarkdownParagraph";
import "./blog.css";

export default function PopularPosts({ articles, locale, type }) {
  // console.log('PopularPosts articles: ',articles[0])
  return (
    <div className="blog-grid">
      {articles.map((post) => {       
        const shortPostContent = post?.content?.slice(0,145);
        // console.log("content: ",post.content)
        // console.log("shortPostContent: ",shortPostContent)
        return (         
          <article
            className="blog-card"
            onClick={() => window.location.href = `/${locale}/${type}/${post.slug}`}
            style={{ cursor: 'pointer' }}
            key={post.slug}
          >
            <div className="blog-image-container">
              <Image
                src={`/images/blog/${post.image}`}
                alt={post.title}
                className="blog-image"
                width={300}
                height={200}
                priority={false} // Load lazily for card view
              />
              <h2 className="blog-city-name">{post.title}</h2>              
            </div>
            <div className="blog-content">             
              <div className="blog-description">
                <MarkdownParagraph language={locale}>           
                  {shortPostContent}
                </MarkdownParagraph>
              </div>
            </div>
          </article>    
        );
      })}
    </div >
  );
}
