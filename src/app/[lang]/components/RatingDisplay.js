"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

import CustomAlert from "./CustomAlert";

export default function RatingDisplay({ ratingAvg, votes, message }) {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="rating-container">
      <div onClick={() => setShowAlert(true)}>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: 0,
                }}
              >
                {/* Base star (gray) */}
                <FaStar className="star" color="#e4e5e9" size={20} />

                {/* Partial or full star overlay (yellow) */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    width: (() => {
                      if (ratingValue <= Math.floor(ratingAvg)) return "100%";
                      if (ratingValue > Math.ceil(ratingAvg)) return "0%";
                      return `${(ratingAvg % 1) * 100}%`;
                    })(),
                  }}
                >
                  <FaStar className="star" color="#ffc107" size={20} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="rating-stats">
          <span>
            {ratingAvg.toFixed(1)} ({votes} votes)
          </span>
        </div>
      </div>
      {showAlert && (
        <CustomAlert message={message} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
}
