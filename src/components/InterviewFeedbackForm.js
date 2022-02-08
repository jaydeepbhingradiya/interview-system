import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { validator } from "./../helper/validate";
import { v4 as uuid } from "uuid";

let details = {};

function InterviewFeedbackForm({ showResultTable }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState(details);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    dispatch({ type: "ADD_RESULT", payload: { ...result, id: uuid() } });
    showResultTable();
  };

  const handleExit = () => {
    showResultTable();
  };

  const hanaleChange = (e) => {
    const { name, value } = e.target;
    let curState = { ...result };
    curState[name] = value;
    setResult(curState);
    // let validateRespone = validator(result);
    // setErrors(validateRespone);
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "90%" },
      }}
      noValidate
      // autoComplete="off"
    >
      <Typography variant="h4">Add Interview Result</Typography>
      <TextField
        onChange={hanaleChange}
        name="dateOfInterview"
        type="date"
        label="Date"
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errors.dateOfInterview}
        helperText={errors.dateOfInterview}
      />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45%" },
        }}
        noValidate
        // autoComplete="off"
      >
        <TextField
          onChange={hanaleChange}
          name="candidate"
          label="Candidate name"
          error={!!errors.candidate}
          helperText={errors.candidate}
        />
        <TextField
          onChange={hanaleChange}
          name="interviewer"
          label=" Interviewer name"
          error={!!errors.interviewer}
          helperText={errors.interviewer}
        />
        <TextField
          onChange={hanaleChange}
          name="technology"
          label="Technology"
          error={!!errors.technology}
          helperText={errors.technology}
        />
        <TextField
          onChange={hanaleChange}
          name="experience"
          label="Experience"
          error={!!errors.experience}
          helperText={errors.experience}
        />
        <TextField
          error={!!errors.round}
          helperText={errors.round}
          onChange={hanaleChange}
          name="round"
          label="Round"
        />
        <TextField
          onChange={hanaleChange}
          name="communication"
          label="Communication"
          error={!!errors.communication}
          helperText={errors.communication}
        />
        <TextField
          onChange={hanaleChange}
          name="Practical"
          label="Practical completion"
          error={!!errors.Practical}
          helperText={errors.Practical}
        />
        <TextField
          onChange={hanaleChange}
          name="codingStandard"
          label="Coding standard"
          error={!!errors.codingStandard}
          helperText={errors.codingStandard}
        />
        <TextField
          onChange={hanaleChange}
          name="technicalRound"
          label="Technical round"
          error={!!errors.technicalRound}
          helperText={errors.technicalRound}
        />
        <TextField
          error={!!errors.note}
          helperText={errors.note}
          onChange={hanaleChange}
          name="note"
          label="Notes "
        />
      </Box>
      <Box sx={{ flex: "1 1 auto" }} style={{ border: "1px" }}>
        <Button
          onClick={handleExit}
          color="inherit"
          sx={{ mr: 1, bgcolor: "red", color: "white" }}
        >
          exit
        </Button>

        <Button
          // disabled={!errors.isValid}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default InterviewFeedbackForm;
