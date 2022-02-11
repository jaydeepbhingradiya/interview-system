import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";

function ButtonWrapper({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    variant: "contained",
    color: "primary",
    onClick: handleSubmit,
  };
  return <Button {...configButton}>{children}</Button>;
}

export default ButtonWrapper;
