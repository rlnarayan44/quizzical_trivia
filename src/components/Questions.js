import React from "react";
import { nanoid } from "nanoid";
import "./Questions.css";

export default function Questions(props) {
  const triviaElements = props.triviaData.map((e, i) => {
    const trivia = e.shuffled_answers.map((e2, i2) => {
      return (
        <React.Fragment key={nanoid()}>
          <input
            type="radio"
            required
            id={`t${i}-o${i2}`}
            name={`t${i}`}
            value={e2}
            onChange={(event) => props.updateTriviaData(event, i)}
            checked={props.triviaData[i].selected_answer === e2}
          />
          <label htmlFor={`t${i}-o${i2}`}>{e2}</label>
        </React.Fragment>
      );
    });
    return (
      <div className="questions-trivia" key={nanoid()}>
        <div className="questions-qq">{e.question}</div>
        {trivia}
        <div className="questions-line"></div>
      </div>
    );
  });

  return (
    <div className="questions">
      <form>
        {triviaElements}
        <div className="questions-btn-container">
          <button
            type="submit"
            className="questions-btn"
            onClick={props.displayAnswers}
          >
            Check answers
          </button>
        </div>
      </form>
    </div>
  );
}
