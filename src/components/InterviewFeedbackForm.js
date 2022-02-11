import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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

const FORM_VALIDATION = yup.object().shape({
  dateOfInterview: yup.date().required("Required"),
  candidate: yup.string().required("Required"),
  interviewer: yup.string().required("Required"),
  technology: yup.string().required("Required"),
  experience: yup.string().required("Required"),
  round: yup.string().required("Required"),
  communication: yup.string().when(["round"], {
    is: (round) => round === "Technical",
    then: yup.string().required("Required"),
  }),

  Practical: yup.number().when(["round"], {
    is: (round) => round === "Practical",
    then: yup
      .number()
      .integer()
      .typeError("Please enter a valid value")
      .required("Required"),
  }),

  codingStandard: yup.number().when(["round"], {
    is: (round) => round === "Practical",
    then: yup
      .number()
      .integer()
      .typeError("Please enter a valid value")
      .required("Required"),
  }),

  technicalRound: yup.number().when(["round"], {
    is: (round) => round === "Technical",
    then: yup
      .number()
      .integer()
      .typeError("Please enter a valid value")
      .required("Required"),
  }),

  note: yup.string().required("Required"),
});

function InterviewFeedbackForm({
  showResultTable,
  selectedResult,
  clearField,
  title,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (result) => {
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
        <Grid container spacing={2} style={{ padding: "30px 100px 0px 100px" }}>
          <Grid item xs={12}>
            {title ? (
              <Typography variant="h4">Add Interview Result</Typography>
            ) : (
              <Typography variant="h4">Edit Interview Result</Typography>
            )}
          </Grid>
          <Grid item xs={12} style={{ margin: "0.5rem 0rem" }}>
            <DatePicker label="Date" name="dateOfInterview" />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <TextFieldwrapper name="candidate" label="Name" />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <SelectWrapper
              name="interviewer"
              label="Interviewer"
              options={interviewers}
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <SelectWrapper
              name="technology"
              label="Technology name"
              options={technology}
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <TextFieldwrapper name="experience" label="Experience" />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <SelectWrapper name="round" label="Round" options={round} />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <SelectWrapper
              name="communication"
              label="Communication"
              options={communication}
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <TextFieldwrapper
              name="Practical"
              label="Practical completion(0-100%)"
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <TextFieldwrapper
              name="codingStandard"
              label="Coding standard(0-100%)"
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <TextFieldwrapper
              name="technicalRound"
              label="Technical Round(0-100%)"
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "0.5rem 0rem" }}>
            <TextFieldwrapper name="note" label="Notes" />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleExit}>
              Exit
            </Button>
            &nbsp;
            <ButtonWrapper>Submit </ButtonWrapper>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default InterviewFeedbackForm;
