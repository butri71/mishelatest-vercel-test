import React from 'react';
import './components.css';

const Quote = ({ data, type = "" }) => {
  // console.log("quote received: ",data)
  return (
    <div className="quote-wrapper">
      <div className="quote-left">“</div>

      {type === "plain" ? (
        <div className="quote-content">
          <h2 className="quote-text">{data}</h2>        
        </div>
      ) : (
        <div className="quote-content">
          <h2 className="quote-text">{data.text}</h2>
          <div className="quote-author">{data.author}, {data.role}, {data.year}</div>
        </div>
      )}
      <div className="quote-right">”</div>
    </div>
  );
};

export default Quote;