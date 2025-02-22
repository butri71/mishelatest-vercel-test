// utils/comments.js

//FILTER FROM ALL ALL RELEVANT COMMENTS WITH cocktailId AND RETURNS THEM
export async function getUserReviews(comments, cocktailId, lang) {
    const commentList = Object.values(comments).filter(
      comment => comment.cocktailId === String(cocktailId) && comment.active === true
    );
  
    commentList.sort((a, b) => b.id - a.id);
  
    return commentList.filter(
      comment => comment[`${lang}-text`] && comment[`${lang}-text`].trim() !== ""
    );
  }
  