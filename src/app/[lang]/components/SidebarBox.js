// import Image from "next/image";
import Link from "next/link";

export default function SidebarBox({
  lang,
  btn,
  title,
  text,
  bgcolor,
  ticker,
  link,
}) {
  return (
    <div
      className="featured-box"
      style={{
        backgroundColor: bgcolor || "#e4e7e3",
        "--ticker-color": ticker || "#8A4FFF", // Add the ticker color as a CSS variable
      }}
    >
      <div>
        <h3>{title}</h3>
        <p className="sidebar-description">{text}...</p>
      </div>      
        
      <div className="box-learn-more">
        <Link href={`${lang}/${link}`}>{btn}</Link>
      </div>
    </div>
  );
}
