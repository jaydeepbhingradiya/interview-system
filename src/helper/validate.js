export const validator = (value) => {
  let errors = {
    isValid: true,
  };

  if (!value.dateOfInterview) {
    errors.dateOfInterview = "Required";
    errors.isValid = false;
  }

  if (!value.candidate) {
    errors.candidate = "Required!";
    errors.isValid = false;
  }

  if (!value.interviewer) {
    errors.interviewer = "Required!";
    errors.isValid = false;
  }

  if (!value.technology) {
    errors.technology = "Required!";
    errors.isValid = false;
  }
  if (!value.experience) {
    errors.experience = "Required!";
    errors.isValid = false;
  }

  if (!value.round) {
    errors.round = "Required!";
    errors.isValid = false;
  }

  if (!value.communication) {
    errors.communication = "Required!";
    errors.isValid = false;
  }

  if (!value.Practical) {
    errors.Practical = "Required!";
    errors.isValid = false;
  }

  if (!value.codingStandard) {
    errors.codingStandard = "Required!";
    errors.isValid = false;
  }

  if (!value.technicalRound) {
    errors.technicalRound = "Required!";
    errors.isValid = false;
  }

  if (!value.note) {
    errors.note = "Required!";
    errors.isValid = false;
  }
  return errors;
};
