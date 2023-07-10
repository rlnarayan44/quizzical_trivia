import React from "react";
import "./Welcome.css";

export default function Welcome(props) {
  return (
    <div className="welcome">
      <div className="welcome-title">Quizzical</div>
      <div className="welcome-desc">Small trivia game</div>
      <button className="welcome-start" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
