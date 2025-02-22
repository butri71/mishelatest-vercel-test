"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

import CustomAlert from "./CustomAlert";
import { getRatingItem } from "../../../utils/ratingsFetching";
import './components.css';

export default function RatingComponent({ fullRating, cocktailId, votes, message }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitError, setSubmitError] = useState(null);
    
  const fetchRating = () => {           
      // const ratingItem = cocktail ? cocktail.ratings : null;
      // const ratingItem = getRatingItem(cocktailId);    
      // const ratings = ratingItem || fullRating;
      // setRating(ratings);
      setRating(fullRating);

      const voted = localStorage.getItem(`voted-${cocktailId}`);
      if (voted) setHasVoted(true);   
  };

  useEffect(() => {
    fetchRating();
  }, [cocktailId]);  
  
  if (!rating) {
    return null;  }

  // console.log("RatingComponent fullRating:", fullRating);  
  // console.log("RatingComponent rating:", rating);  
  // console.log("RatingComponent cocktailId:", cocktailId);  
  return (
    <div className="rating-container">
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <button
              key={index}
              className={`star-button ${hasVoted ? "voted" : ""}`}
              // onClick={() => handleSubmitRating(ratingValue)}
              onClick={() => setShowAlert(true)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              disabled={hasVoted}
              style={{ position: "relative", padding: 0, border: "none" }}
            >
              {/* Base star (gray) */}
              <FaStar
                className="star"
                color="#e4e5e9"
                size={20}
              />

              {/* Partial or full star overlay (yellow) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  overflow: "hidden",
                  width: (() => {
                    const displayRating = hover || rating.ratingAvg;
                    if (ratingValue <= Math.floor(displayRating)) return "100%";
                    if (ratingValue > Math.ceil(displayRating)) return "0%";
                    return `${(displayRating % 1) * 100}%`;
                  })(),
                }}
              >
                <FaStar
                  className="star"
                  color="#ffc107"
                  size={20}
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="rating-stats">
        <span>{rating.ratingAvg || "0.0"} ({rating.ratingCount} {votes})</span>
        {/* <span>{rating.ratingAvg || "0.0"} ({rating.votes} {votes})</span> */}
      </div>
      { showAlert && <CustomAlert message={message} onClose={() => setShowAlert(false)} /> }
    </div>
  );
}