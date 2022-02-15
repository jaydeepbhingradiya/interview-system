import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { removeResult } from "../store/actions";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function FeedbackTable({ showForm, getselectedData, addTitle, editTitle }) {
  const [searchTerm, setSearchTerm] = useState("");
  const result = useSelector((state) => state);
  const dispatch = useDispatch();

  const addHandler = () => {
    addTitle();
    showForm();
  };

  const deleteHandler = (id) => {
    dispatch(removeResult(id));
  };

  const editHandler = (data) => {
    getselectedData(data);
    editTitle();
    showForm();
  };

  let searchData = result.filter((row) => {
    if (searchTerm === "") {
      return row;
    } else if (
      JSON.stringify(row.dateOfInterview)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      JSON.stringify(row.technology)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return row;
    }
  });

  let tablebody = (
    <TableBody>
      {searchData.length > 0
        ? searchData.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.candidate || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.dateOfInterview || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.interviewer || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.technology || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.experienceInYear || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.experienceInMonth || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.round || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.communication || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.Practical || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.codingStandard || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.technicalRound || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.note || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                <Button onClick={() => editHandler(row)}>
                  <ModeEditIcon />
                </Button>
                <Button
                  sx={{ color: "red" }}
                  onClick={() => deleteHandler(row.id)}
                >
                  <DeleteIcon />
                </Button>
              </StyledTableCell>

              {/* <StyledTableCell align="center">
                <Button
                  sx={{ color: "red" }}
                  onClick={() => deleteHandler(row.id)}
                >
                  <DeleteIcon />
                </Button>
              </StyledTableCell> */}
            </StyledTableRow>
          ))
        : "no data"}
    </TableBody>
  );

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4">Interview Result</Typography>
      <TextField
        sx={{ float: "left", marginBottom: "1rem", marginRight: "1rem" }}
        name="search"
        label="Search...."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button
        onClick={addHandler}
        sx={{ float: "right", marginBottom: "1rem" }}
      >
        <AddIcon />
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

            <StyledTableCell align="center" colSpan={2}>
              experience in year - month
            </StyledTableCell>

            {/* <StyledTableCell align="center">
              month of experience
            </StyledTableCell> */}

            <StyledTableCell align="center">Round</StyledTableCell>

            <StyledTableCell align="center">communication</StyledTableCell>

            <StyledTableCell align="center">
              Practical completion
            </StyledTableCell>

            <StyledTableCell align="center">Coding standard</StyledTableCell>

            <StyledTableCell align="center">Technical round</StyledTableCell>

            <StyledTableCell align="center">Notes</StyledTableCell>

            <StyledTableCell align="center">Action</StyledTableCell>

            {/* <StyledTableCell align="center">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        {tablebody}
      </Table>
    </TableContainer>
  );
}

export default FeedbackTable;
