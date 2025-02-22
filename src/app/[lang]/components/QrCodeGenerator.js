"use client";

import React from "react";
import QRCode from "react-qr-code";

const CocktailQRCode = ({ drinkId, size = 150 }) => {
  // const qrLink = `http://192.168.1.118:4000/redirect?cocktail=${drinkId}`;
  const qrLink = `https://mishela.app/redirect?cocktail=${drinkId}`;

  // console.log('QR Link:', qrLink);

  return (
    <>
      {/* <style jsx>{`
        @media (max-width: 768px) {
          div {
            width: 60px;
            height: 60px;
          }
        }
        @media (min-width: 769px) {
          div {
            width: 150px;
            height: 150px;
          }
        }
      `}</style> */}
      <style jsx>{`
        /* Base styles for the container */
        div {
          width: 150px; /* Set the default larger size */
          height: 150px;
          /* Add margin to center the QR code if its parent is using flex centering */
          margin: 0 auto;
        }

        /* We can remove the small-screen size reduction since we don't need it anymore */
        /* If you still want some size reduction, but not as dramatic, you could use something like: */
        @media (max-width: 768px) {
          div {
            width: 120px; /* A more moderate size reduction */
            height: 120px; /* Still easily scannable */
          }
        }

        /* Keep the larger size for bigger screens */
        @media (min-width: 769px) {
          div {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
      <div>
        {/* <div>QR Link: {qrLink}</div> */}
        <QRCode
          value={qrLink}
          style={{ width: "100%", height: "100%" }}
          fgColor="#285A48"
          level="Q"
        />
      </div>
    </>
  );
};

export default CocktailQRCode;
