import React from "react";
import "./Answers.css"

export default function Answers(props) {
    let score = 0;
    const answerElements =props.triviaData.map((e, i) => {
      if(e.selected_answer===e.correct_answer) score+=1
      const answers=e.shuffled_answers.map((e2, i2) => {
        let clsName="clear";
        if(e2===e.correct_answer) clsName="green"
        else if(e2===e.selected_answer) clsName="red"

        return (
            <React.Fragment>
                <input
                  type="radio" 
                  name={`a${i}`}
                  id={`a${i}-o${i2}`}
                  value={e2}
                  onChange={props.showStartScreen}
                  checked={props.triviaData[i].selected_answer===e2}
                />
                <label
                  htmlFor={`a${i}-o${i2}`}
                  className={clsName}>
                  {e2}
                </label>
            </React.Fragment>
        )
      });
        return (
          <div className="answers-trivia">
            <div className="answers-qq">{e.question}</div>
            {answers}
            <div className="answers-line"></div>
          </div>
        )
    });

    return (
      <div className="answers">
        <form>
          {answerElements}
          <div className="answers-btn-container">
            <div className="answers-score">
              You scored {score}/5 correct answers
            </div>
            <button
              type="submit"
              className="answers-btn"
              onClick={props.showStartScreen}>
              Play again!
            </button>
          </div>
        </form>
      </div>
    )
}
