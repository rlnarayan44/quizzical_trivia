import React from "react";
import { decode } from "he";
import Welcome from "./components/Welcome";
import Questions from "./components/Questions";
import Answers from "./components/Answers";
import "./App.css";

export default function App() {
  const [page, setPage] = React.useState(0);
  const [triviaData, setTriviaData] = React.useState([]);

  React.useEffect(() => {
    function shuffle(arr) {
      if (arr.length === 1) return arr;
      const n = Math.floor(Math.random() * arr.length);
      return [arr[n], ...shuffle(arr.filter((_, i) => i !== n))];
    }

    async function getTrivia() {
      const resp = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
      );
      const data = await resp.json();
      setTriviaData(
        data.results.map((e) => ({
          ...e,
          question: decode(e.question),
          shuffled_answers: shuffle([...e.incorrect_answers.map(e2=>decode(e2)), decode(e.correct_answer)]),
          selected_answer: "",
        }))
      );
    }
    if (page === 0) getTrivia();
  }, [page]);

  //   console.log(triviaData);

  function startQuiz() {
    setPage(1);
  }

  function updateTriviaData(event, idx) {
    setTriviaData((pv) =>
      pv.map((e, i) =>
        i === idx ? { ...e, selected_answer: event.target.value } : e
      )
    );
  }

  function displayAnswers(event) {
    event.preventDefault();
    setPage(2)
  }

  function showStartScreen() {
    setPage(0)
  }

  return (
    <div className="app">
      <div className="blob1"></div>
      {page === 0 && <Welcome startQuiz={startQuiz} />}
      {page === 1 && (
        <Questions
          triviaData={triviaData}
          updateTriviaData={updateTriviaData}
          displayAnswers={displayAnswers}
        />
      )}
      {page === 2 && (
        <Answers
          triviaData={triviaData}
          showStartScreen={showStartScreen}
        />
      )}
      <div className="blob2"></div>
    </div>
  );
}
