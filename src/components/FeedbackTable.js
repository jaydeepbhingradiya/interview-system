import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function FeedbackTable({ showForm }) {
  const result = useSelector((state) => state.results);
  const dispatch = useDispatch();

  const handleBack = () => {
    showForm();
  };

  const deleteHandler = (id) => {
    console.log(id);
    dispatch({ type: "REMOVE_RESULT", payload: id });
  };
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4">Interview Result</Typography>

      <Button onClick={handleBack} variant="contained">
        Back
      </Button>
      <Table
        sx={{ minWidth: 700, marginTop: "1rem" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">interviewer</StyledTableCell>
            <StyledTableCell align="center">technology</StyledTableCell>
            <StyledTableCell align="center">experience</StyledTableCell>
            <StyledTableCell align="center">Round</StyledTableCell>
            <StyledTableCell align="center">communication</StyledTableCell>
            <StyledTableCell align="center">
              Practical completion
            </StyledTableCell>
            <StyledTableCell align="center">Coding standard</StyledTableCell>
            <StyledTableCell align="center">Technical round</StyledTableCell>
            <StyledTableCell align="center">Notes</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.candidate}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.dateOfInterview}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.interviewer}
              </StyledTableCell>
              <StyledTableCell align="center">{row.technology}</StyledTableCell>
              <StyledTableCell align="center">{row.experience}</StyledTableCell>
              <StyledTableCell align="center">{row.round}</StyledTableCell>
              <StyledTableCell align="center">
                {row.communication}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Practical}</StyledTableCell>
              <StyledTableCell align="center">
                {row.codingStandard}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.technicalRound}
              </StyledTableCell>
              <StyledTableCell align="center">{row.note}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  sx={{ color: "red" }}
                  onClick={() => deleteHandler(row.id)}
                >
                  <DeleteIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FeedbackTable;
