"use client";
import { useState } from "react";

// import comments from "../../../../data/comments.json";
import CommentList from "./CommentList";
import CustomAlert from "./CustomAlert";
import translations from "./translations/comments";
import "./components.css";

const CommentSection = ({ cocktailComments, cocktailId, lang, cocktail }) => {
  const t = translations[lang] || translations.en;

  // console.log("cocktailComments: ",cocktailComments)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [newComment, setNewComment] = useState({
    text: "",
    name: "",
    email: "",
    reply: false,
    active: false,
  });

  // resetting comments form
  const clearCommentForm = () => {
    setNewComment({ text: "", name: "", email: "" });
  };

  // NEW handleSubmitComment USING API
  const handleSubmitComment = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare the comment data
      const timestamp = Date.now();
      const commentData = {
        id: timestamp,
        cocktailId: cocktailId,
        cocktail: cocktail,
        locale: lang,
        // Set the text for the selected language, and empty strings for others
        [`${lang}-text`]: newComment.text,
        "en-text": lang === "en" ? newComment.text : "",
        "es-text": lang === "es" ? newComment.text : "",
        "it-text": lang === "it" ? newComment.text : "",
        name: newComment.name,
        email: newComment.email,
        reply: false,
        active: false, // All new comments start as inactive for moderation
      };

      const response = await fetch('/api/submit-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) throw new Error('Comment submission failed');

      clearCommentForm();
      // alert(t.alert_submission);   
      setShowAlert(true);
      

    } catch (error) {
      console.error("Error submitting comment:", error);
      setSubmitError("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // console.log("Comment list: ", cocktailComments)
  return (
    <div>
      <div className="comment-section">
        <div>
          <div className="comment-header-box">
            <h3>{t.leave_comment}</h3>
            <span className="text-note">
              <p>{t.comment_text1}</p>
              <p>{t.comment_text2}</p>
            </span>
          </div>
          <div className="comment-form">
            <label htmlFor="comment">
              {t.comment} <span className="required">*</span>
            </label>
            <textarea
              id="comment"
              value={newComment.text}
              onChange={(e) =>
                setNewComment({ ...newComment, text: e.target.value })
              }
              rows={8}
              minLength={20}
              required
            // style={{ maxWidth: 600 }}
            />
            <div className="comment-name-container">
              <div>
                <div>
                  <label htmlFor="name">
                    {t.name} <span className="required">*</span>
                  </label>
                </div>
                <div style={{ marginTop: 10 }}>
                  <input
                    id="name"
                    type="text"
                    value={newComment.name}
                    onChange={(e) =>
                      setNewComment({ ...newComment, name: e.target.value })
                    }
                    minLength={3}
                    required
                    style={{ marginBottom: 20, marginRight: 30, width: 285 }}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                </div>
                <div style={{ marginTop: 10 }}>
                  <input
                    id="email"
                    type="email"
                    value={newComment.email}
                    onChange={(e) =>
                      setNewComment({ ...newComment, email: e.target.value })
                    }
                    minLength={8}
                    required
                    style={{ width: 285 }}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSubmitComment}>{t.post_comment}</button>
          </div>
        </div>
      </div>
      <div className="comments-container">  
        <CommentList comments={cocktailComments} lang={lang} />
      </div>
      { showAlert && <CustomAlert message={t.alert_submission} onClose={() => setShowAlert(false)} /> }
    </div>
  );
};

export default CommentSection;
