import React from "react";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
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
import { addResult, updateResult } from "../store/actions";

const FORM_VALIDATION = yup.object().shape({
  dateOfInterview: yup.date().required("Please enter interview date"),
  candidate: yup.string().required("Please enter candidate name"),
  interviewer: yup.string().required("Please enter interviewer name"),
  technology: yup
    .array()
    .min(1, "You can't leave this blank.")
    .required("You can't leave this blank."),
  experienceInYear: yup
    .number()
    .integer()
    .typeError("Please enter a valid value")
    .required("Please enter experience"),
  experienceInMonth: yup
    .number()
    .min(0, "Min value 0.")
    .max(12, "Max value 12.")
    .integer()
    .typeError("Please enter a valid value")
    .required("Please enter experience"),
  round: yup.string().required("Please select round name"),
  communication: yup.string().when(["round"], {
    is: (round) => round === "Technical",
    then: yup.string().required("Please select communication"),
  }),
  Practical: yup.number().when(["round"], {
    is: (round) => round === "Practical",
    then: yup
      .number()
      .min(0, "Min value 0.")
      .max(100, "Max value 100.")
      .integer()
      .typeError("Please enter a valid value")
      .required("Please enter practical completion in %"),
  }),
  codingStandard: yup.number().when(["round"], {
    is: (round) => round === "Practical",
    then: yup
      .number()
      .min(0, "Min value 0.")
      .max(100, "Max value 100.")
      .integer()
      .typeError("Please enter a valid value")
      .required("Please enter coding Standard in %"),
  }),
  technicalRound: yup.number().when(["round"], {
    is: (round) => round === "Technical",
    then: yup
      .number()
      .min(0, "Min value 0.")
      .max(100, "Max value 100.")
      .integer()
      .typeError("Please enter a valid value")
      .required("Plaease enter technical round in %"),
  }),
  note: yup.string().required("Please add notes"),
});

function InterviewFeedbackForm({
  showResultTable,
  selectedResult,
  clearField,
  title,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  let INITAIL_VALUE = {
    dateOfInterview: selectedResult.dateOfInterview || "",
    candidate: selectedResult.candidate || "",
    interviewer: selectedResult.interviewer || "",
    technology: selectedResult.technology || [],
    experienceInYear: selectedResult.experienceInYear || "",
    experienceInMonth: selectedResult.experienceInMonth || "",
    round: selectedResult.round || "",
    communication: selectedResult.communication || "",
    Practical: selectedResult.Practical || "",
    codingStandard: selectedResult.codingStandard || "",
    technicalRound: selectedResult.technicalRound || "",
    note: selectedResult.note || "",
    id: selectedResult.id || "",
  };

  const handleSubmit = (result) => {
    let found = state.find((element) => element.id === selectedResult.id);

    if (found) {
      dispatch(updateResult(result));
      clearField();
    } else {
      dispatch(addResult(result));
    }
    showResultTable();
  };

  const handleExit = () => {
    showResultTable();
    clearField();
  };

  return (
    <Formik
      initialValues={INITAIL_VALUE}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <Grid
              container
              spacing={2}
              style={{ padding: "30px 100px 0px 100px" }}
            >
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
                  SelectProps={{
                    multiple: true,
                  }}
                  name="technology"
                  label="Technology name"
                  options={technology}
                />
              </Grid>
              <Grid item xs={3} style={{ margin: "0.5rem 0rem" }}>
                <TextFieldwrapper
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">years</InputAdornment>
                    ),
                  }}
                  name="experienceInYear"
                  label="Experience"
                />
              </Grid>
              <Grid item xs={3} style={{ margin: "0.5rem 0rem" }}>
                <TextFieldwrapper
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">months</InputAdornment>
                    ),
                  }}
                  name="experienceInMonth"
                  label="Experience"
                />
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
                <ButtonWrapper disabled={!(formik.isValid && formik.dirty)}>
                  Submit
                </ButtonWrapper>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default InterviewFeedbackForm;
