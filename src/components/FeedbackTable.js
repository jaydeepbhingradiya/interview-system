import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { TableSortLabel, TableRow, TableCell, Paper } from "@mui/material";
import { Button, TableFooter, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { CustomTablePagination } from "./pagination/index";
import AlertDialog from "./alertDialog/AlertDialog";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const result = useSelector((state) => state);

  const addHandler = () => {
    addTitle();
    showForm();
  };

  const editHandler = (data) => {
    getselectedData(data);
    editTitle();
    showForm();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      {(rowsPerPage > 0
        ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : searchData
      ).map((row) => (
        <StyledTableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.candidate || "-"}
          </TableCell>

          <TableCell align="center">{row.dateOfInterview || "-"}</TableCell>

          <TableCell align="center">{row.interviewer || "-"}</TableCell>

          <TableCell align="center">{row.technology || "-"}</TableCell>

          <TableCell align="center">{row.experienceInYear || "-"}</TableCell>

          <TableCell align="center">{row.experienceInMonth || "-"}</TableCell>

          <TableCell align="center">{row.round || "-"}</TableCell>

          <TableCell align="center">{row.communication || "-"}</TableCell>

          <TableCell align="center">{row.Practical || "-"}</TableCell>

          <TableCell align="center">{row.codingStandard || "-"}</TableCell>

          <TableCell align="center">{row.technicalRound || "-"}</TableCell>

          <TableCell style={{ width: "30%" }} align="center">
            {row.note || "-"}
          </TableCell>

          <TableCell align="center">
            <Button onClick={() => editHandler(row)}>
              <ModeEditIcon />
            </Button>
            {/* <Button
              sx={{ color: "red" }}
              onClick={() => deleteHandler(row.id)}
            > */}
            <AlertDialog id={row.id} />
            {/* <DeleteIcon /> */}
            {/* </Button> */}
          </TableCell>
        </StyledTableRow>
      ))}
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
        sx={{ minWidth: 700, marginTop: "1rem", textAlign: "center" }}
        aria-label="customized table"
      >
        <TableHead
          style={{
            backgroundColor: "grey",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            <TableCell>Name</TableCell>

            <TableCell align="center">
              <TableSortLabel>Date</TableSortLabel>
            </TableCell>

            <TableCell align="center">Tnterviewer</TableCell>

            <TableCell align="center">Technology</TableCell>

            <TableCell align="center" colSpan={2}>
              Experience
              <TableCell>Years</TableCell>
              <TableCell>Months</TableCell>
            </TableCell>

            <TableCell align="center">Round</TableCell>

            <TableCell align="center">Communication</TableCell>

            <TableCell align="center">Practical completion</TableCell>

            <TableCell align="center">Coding standard</TableCell>

            <TableCell align="center">Technical round</TableCell>

            <TableCell align="center">Notes</TableCell>

            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        {tablebody}
      </Table>
      {searchData.length === 0 && (
        <Typography variant="h4">No data found</Typography>
      )}
      <Table>
        <TableFooter>
          <TableRow>
            <CustomTablePagination
              rowsPerPageOptions={[2, 5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={searchData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              componentsProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default FeedbackTable;
