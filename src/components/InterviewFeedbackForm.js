import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pracValidator, techValidator, validator } from "./../helper/validate";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TextFieldwrapper from "./formUI/textfield/TextFieldwrapper";
import SelectWrapper from "./formUI/select/index";
import DatePicker from "./formUI/date";
import interviewers from "./../data/interviewers.json";
import round from "./../data/round.json";
import communication from "./../data/communication.json";
import technology from "./../data/technology.json";
import ButtonWrapper from "./formUI/button";

let details = {};

const FORM_VALIDATION = yup.object().shape({
  dateOfInterview: yup.date().required("Required"),
  candidate: yup.string().required("Required"),
  interviewer: yup.string().required("Required"),
  technology: yup.string().required("Required"),
  experience: yup
    .number()
    .integer()
    .typeError("Please enter a valid experience")
    .required("Required"),
  round: yup.string().required("Required"),
  communication: yup.string().required("Required"),
  Practical: yup.string().required("Required"),
  codingStandard: yup.string().required("Required"),
  technicalRound: yup.string().required("Required"),
  note: yup.string().required("Required"),
});

function InterviewFeedbackForm({
  showResultTable,
  selectedResult,
  clearField,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = useState(details);
  const [errors, setErrors] = useState({});

  const handleSubmit = (result) => {
    console.log(result);
    let found = state.find((element) => element.id === selectedResult.id);

    if (found) {
      dispatch({ type: "UPDATE_RESULT", payload: result });
      clearField();
    } else {
      dispatch({ type: "ADD_RESULT", payload: result });
    }
    showResultTable();
  };

  const handleExit = () => {
    showResultTable();
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let curState = { ...result, ...selectedResult };
  //   curState[name] = value;
  //   setResult(curState);

  //   if (value === "Technical") {
  //     let validateRespone = techValidator(result);
  //     setErrors(validateRespone);
  //   } else if (value === "Prectical") {
  //     let validateRespone = pracValidator(result);
  //     setErrors(validateRespone);
  //   } else {
  //     let validateRespone = validator(result);
  //     setErrors(validateRespone);
  //   }
  // };

  return (
    <Formik
      initialValues={{
        dateOfInterview: selectedResult.dateOfInterview || "",
        candidate: selectedResult.candidate || "",
        interviewer: selectedResult.interviewer || "",
        technology: selectedResult.technology || "",
        experience: selectedResult.experience || "",
        round: selectedResult.round || "",
        communication: selectedResult.communication || "",
        Practical: selectedResult.Practical || "",
        codingStandard: selectedResult.codingStandard || "",
        technicalRound: selectedResult.technicalRound || "",
        note: selectedResult.note || "",
        id: selectedResult.id || "",
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(data) => handleSubmit(data)}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Add Interview Result</Typography>
          </Grid>
          <Grid item xs={12}>
            <DatePicker label="Date" name="dateOfInterview" />
          </Grid>
          <Grid item xs={6}>
            <TextFieldwrapper name="candidate" label="Name" />
          </Grid>
          <Grid item xs={6}>
            <SelectWrapper
              name="interviewer"
              label="Interviewer"
              options={interviewers}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectWrapper
              name="technology"
              label="Technology name"
              options={technology}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldwrapper name="experience" label="Experience" />
          </Grid>
          <Grid item xs={6}>
            <SelectWrapper name="round" label="Round" options={round} />
          </Grid>
          <Grid item xs={6}>
            <SelectWrapper
              name="communication"
              label="Communication"
              options={communication}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldwrapper name="Practical" label="Practical" />
          </Grid>
          <Grid item xs={6}>
            <TextFieldwrapper name="codingStandard" label="CodingStandard" />
          </Grid>
          <Grid item xs={6}>
            <TextFieldwrapper name="technicalRound" label="TechnicalRound" />
          </Grid>
          <Grid item xs={6}>
            <TextFieldwrapper name="note" label="Note" />
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{ mr: 1, bgcolor: "red", color: "white" }}
              onClick={handleExit}
            >
              Exit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <ButtonWrapper>Submit </ButtonWrapper>
          </Grid>
        </Grid>
      </Form>
    </Formik>

    // <Box
    //   component="form"
    //   sx={{
    //     "& .MuiTextField-root": { m: 1, width: "90%" },
    //   }}
    //   noValidate
    //   // autoComplete="off"
    // >
    //   <Typography variant="h4">Add Interview Result</Typography>

    //   <TextField
    //     onChange={handleChange}
    //     name="dateOfInterview"
    //     type="date"
    //     label="Date"
    //     InputLabelProps={{
    //       shrink: true,
    //     }}
    //     error={!!errors.dateOfInterview}
    //     helperText={errors.dateOfInterview}
    //   />

    //   <Box
    //     component="form"
    //     sx={{
    //       "& .MuiTextField-root": { m: 1, width: "45%" },
    //     }}
    //     noValidate
    //     // autoComplete="off"
    //   >
    //     <TextField
    //       onChange={handleChange}
    //         selectedResult.candidate ? selectedResult.candidate : ""
    //       }
    //       name="candidate"
    //       label="Candidate name"
    //       error={!!errors.candidate}
    //       helperText={errors.candidate}
    //     />

    //     <FormControl
    //       sx={{ width: "45%", marginTop: "8px" }}
    //       error={errors.interviewer}
    //     >
    //       <InputLabel id="demo-simple-select-label">Interviewer</InputLabel>
    //       <Select
    //         name="interviewer"
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={selectedResult.interviewer}
    //         label="Interviewer"
    //         onChange={handleChange}
    //       >
    //         <MenuItem value="Riddhi">Riddhi ma'am</MenuItem>
    //         <MenuItem value="Dhaval">Dhaval bhai</MenuItem>
    //         <MenuItem value="Renish">Renish bhai</MenuItem>
    //       </Select>
    //     </FormControl>

    //     <FormControl
    //       error={!!errors.technology}
    //       sx={{ width: "45%", marginTop: "8px", marginLeft: "10px" }}
    //     >
    //       <InputLabel id="demo-simple-select-label">Technology</InputLabel>
    //       <Select
    //         name="technology"
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={selectedResult.technology}
    //         label="Technology"
    //         onChange={handleChange}
    //       >
    //         <MenuItem value="React">React JS</MenuItem>
    //         <MenuItem value="Node">Node JS</MenuItem>
    //         <MenuItem value="Angular">Angular JS</MenuItem>
    //       </Select>
    //     </FormControl>

    //     <TextField
    //       onChange={handleChange}
    //       name="experience"
    //       label="Experience"
    //       error={!!errors.experience}
    //       helperText={errors.experience}
    //     />

    //     <FormControl
    //       sx={{ width: "45%", marginTop: "8px" }}
    //       error={!!errors.round}
    //     >
    //       <InputLabel id="demo-simple-select-label">Round</InputLabel>
    //       <Select
    //         name="round"
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={selectedResult.round}
    //         label="Round"
    //         onChange={handleChange}
    //       >
    //         <MenuItem value="Technical">Technical</MenuItem>
    //         <MenuItem value="Prectical">Prectical</MenuItem>
    //       </Select>
    //     </FormControl>

    //     <FormControl
    //       sx={{ width: "45%", marginTop: "8px", marginLeft: "10px" }}
    //       error={!!errors.communication}
    //     >
    //       <InputLabel id="demo-simple-select-label">Coummunication</InputLabel>
    //       <Select
    //         name="communication"
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={selectedResult.communication}
    //         label="Communication"
    //         onChange={handleChange}
    //       >
    //         <MenuItem value="Excellent">Excellent</MenuItem>
    //         <MenuItem value="Good">Good</MenuItem>
    //         <MenuItem value="Bad">Bad</MenuItem>
    //       </Select>
    //     </FormControl>

    //     <TextField
    //       onChange={handleChange}
    //       name="Practical"
    //       label="Practical completion"
    //       error={!!errors.Practical}
    //       helperText={errors.Practical}
    //     />

    //     <TextField
    //       onChange={handleChange}
    //       name="codingStandard"
    //       label="Coding standard"
    //       error={!!errors.codingStandard}
    //       helperText={errors.codingStandard}
    //     />

    //     <TextField
    //       onChange={handleChange}
    //       name="technicalRound"
    //       label="Technical round"
    //       error={!!errors.technicalRound}
    //       helperText={errors.technicalRound}
    //     />

    //     <TextareaAutosize
    //       name="note"
    //       helperText={errors.note}
    //       error={!!errors.note}
    //       value={selectedResult.note}
    //       onChange={handleChange}
    //       aria-label="minimum height"
    //       maxRows={3}
    //       minRows={3}
    //       placeholder="Note"
    //       style={{ width: "45%", marginTop: "10px" }}
    //     />
    //   </Box>
    //   <Box sx={{ flex: "1 1 auto" }} style={{ border: "1px" }}>
    //     <Button
    //       onClick={handleExit}
    //       color="inherit"
    //       sx={{ mr: 1, bgcolor: "red", color: "white" }}
    //     >
    //       exit
    //     </Button>

    //     <Button
    //       disabled={!errors.isValid}
    //       variant="contained"
    //       onClick={handleSubmit}
    //     >
    //       Submit
    //     </Button>
    //   </Box>
    // </Box>
  );
}

export default InterviewFeedbackForm;
