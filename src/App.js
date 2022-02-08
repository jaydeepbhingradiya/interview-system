import { useState } from "react";
import "./App.css";
import FeedbackTable from "./components/FeedbackTable";
import InterviewFeedbackForm from "./components/InterviewFeedbackForm";

function App() {
  const [show, setShow] = useState(false);
  const resultTableHandler = () => {
    setShow(true);
  };

  const formHandler = () => {
    setShow(false);
  };

  return (
    <div className="App">
      {show ? (
        <FeedbackTable showForm={formHandler} />
      ) : (
        <InterviewFeedbackForm showResultTable={resultTableHandler} />
      )}
    </div>
  );
}

export default App;
