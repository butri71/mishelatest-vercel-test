import React from 'react';

const FAQsList = ({ faqs }) => {
  return (
    <div className="faqs-container">   
      <ul className="faqs-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQsList;
