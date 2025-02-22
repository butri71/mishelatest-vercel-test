import { formatIntDate } from "../../../utils/utils";

import translations from "./translations/comments";
import "./components.css";

const CommentList = ({ comments, lang }) => {
  const t = translations[lang] || translations.en;

  // Filter out comments that do not have text for the selected language
  const validComments = comments.filter(
    (comment) => comment[`${lang}-text`] && comment[`${lang}-text`].trim() !== ""
  );

  // If there are no valid comments, show the fallback message
  if (validComments.length === 0) {
    return <div className="comment-none">Be the first to comment, we'd love to hear from you!</div>;
  }

  // Show total valid comments count
  const totalComments = validComments.length;

  return (
    <div>
      {totalComments > 0 ? (
          <h3>
            {t.current_comment} {totalComments}
          </h3>
        ) : (
          <h3>{t.no_comments}</h3>
        )}     
      {validComments.map((comment) => (
        <div key={comment.id} className="comment-item-box">
          <div className="comment-item-name">{comment.name}</div>
          <div className="comment-item-date">{formatIntDate(comment.id, lang)}</div>
          {/* <div className="comment-item-text">{comment.text}</div> */}
          <div className="comment-item-text">{comment[`${lang}-text`]}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
