import React from 'react';
import { Lightbulb, Info, MessageCircleQuestion } from "lucide-react";

import MarkdownParagraph from "../../../../../utils/MarkdownParagraph";

// import './cocktail.css';

export default function HistoryCard({ cocktail, quote, invented, headerInvented, headerGuess, lang="en" }) {
    return (
        <div className="history-container">
            {/* <div className="card-grid"> */}
            <div className="history-card-grid">
                <div className="history-card first-card">
                    <div className="history-card-header">
                        <MessageCircleQuestion className="history-icon history" />
                        <h3 className="history-title history">{headerGuess}{cocktail}...</h3>
                    </div>
                    <div className="history-content">
                        <MarkdownParagraph language={lang}>{quote}</MarkdownParagraph>
                        {/* <p>
                            <span className='history-content-cocktail'>{cocktail}</span>
                        </p> */}
                    </div>
                </div>

                <div className="history-card second-card">
                    <div className="history-card-header">
                        <Lightbulb className="history-icon invented" />
                        <h3 className="history-title invented">{headerInvented}</h3>
                    </div>
                    <div className="history-content">
                        <MarkdownParagraph language={lang}>{invented}</MarkdownParagraph>
                    </div>
                </div>
            </div>
        </div>
    );
}

