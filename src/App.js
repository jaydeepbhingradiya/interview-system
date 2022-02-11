import { useState } from "react";
import "./App.css";
import FeedbackTable from "./components/FeedbackTable";
import InterviewFeedbackForm from "./components/InterviewFeedbackForm";

function App() {
  const [show, setShow] = useState(true);
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

  const onUpdate = () => {
    // const updatedData = this.state.items.map((x) =>
    //   x.id === item.id ? { ...x, firstname: item.newFirstname } : x
    // );
    // this.setState({ items: updatedData });
  };

  const handleClearField = () => {
    setSelectedResult({});
  };

  return (
    <div className="App">
      {show ? (
        <FeedbackTable
          showForm={formHandler}
          getselectedData={handleSelectedData}
        />
      ) : (
        <InterviewFeedbackForm
          showResultTable={resultTableHandler}
          selectedResult={selectedResult}
          onUpdate={onUpdate}
          clearField={handleClearField}
        />
      )}
    </div>
  );
}

export default App;
