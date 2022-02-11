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

  const handleSelectedData = (data) => {
    setSelectedResult(data);
  };

  const handleClearField = () => {
    setSelectedResult({});
  };
  const toggleTitle = () => {
    setFormTitle((prevState) => !prevState);
  };

  return (
    <div className="App">
      {show ? (
        <FeedbackTable
          showForm={formHandler}
          getselectedData={handleSelectedData}
          toggleTitle={toggleTitle}
        />
      ) : (
        <InterviewFeedbackForm
          showResultTable={resultTableHandler}
          selectedResult={selectedResult}
          clearField={handleClearField}
          title={formTitle}
        />
      )}
    </div>
  );
}

export default App;
