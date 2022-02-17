import * as React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeResult } from "../../store/actions";

function AlertDialog({ id }) {
  const dispatch = useDispatch();

  console.log(id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteHandler = () => {
    dispatch(removeResult(id));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{ color: "red" }} onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button variant="contained" onClick={deleteHandler} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default AlertDialog;
