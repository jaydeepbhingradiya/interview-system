import { useState } from "react";
import "./App.css";
import FeedbackTable from "./components/FeedbackTable";
import InterviewFeedbackForm from "./components/InterviewFeedbackForm";

function App() {
  const [show, setShow] = useState(true);
  const [formTitle, setFormTitle] = useState(false);
  const [selectedResult, setSelectedResult] = useState({});

  const resultTableHandler = () => {
    setShow(true);
  };

  const formHandler = () => {
    setShow(false);
  };

  const selectedDataHandler = (data) => {
    setSelectedResult(data);
  };

  const clearFieldHanlder = () => {
    setSelectedResult({});
  };

  const addTitleHandler = () => {
    setFormTitle(true);
  };

  const editTitleHandler = () => {
    setFormTitle(false);
  };

  return (
    <div className="App">
      {show ? (
        <FeedbackTable
          showForm={formHandler}
          getselectedData={selectedDataHandler}
          addTitle={addTitleHandler}
          editTitle={editTitleHandler}
        />
      ) : (
        <InterviewFeedbackForm
          showResultTable={resultTableHandler}
          selectedResult={selectedResult}
          clearField={clearFieldHanlder}
          title={formTitle}
        />
      )}
    </div>
  );
}

export default App;
