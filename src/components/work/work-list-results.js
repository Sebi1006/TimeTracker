import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const WorkListResults = ({ work, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell align="left"><b>Date</b></TableCell>
                <TableCell align="left"><b>Working Hours</b></TableCell>
                <TableCell align="left"><b>Projects</b></TableCell>
                <TableCell align="left"><b>Tags</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {work.slice(page * limit, page * limit + limit).map((row) => (
                <Row key={row.id} row={row}/>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={work.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const sumOfWorkingHours = (data) => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      sum += data[i].workingHours;
    }

    return sum;
  };

  const projects = (data) => {
    const uniqueProjects = Array.from(new Set(data.map((element) => element.project)));
    let str = '';

    for (let i = 0; i < uniqueProjects.length; i++) {
      if (i === uniqueProjects.length - 1) {
        str += uniqueProjects[i];
      } else {
        str += uniqueProjects[i] + ', ';
      }
    }

    return str;
  };

  const tags = (data) => {
    const uniqueTags = Array.from(new Set(data.map((element) => element.tag)));
    let str = '';

    for (let i = 0; i < uniqueTags.length; i++) {
      if (i === uniqueTags.length - 1) {
        str += uniqueTags[i];
      } else {
        str += uniqueTags[i] + ', ';
      }
    }

    return str;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell align="left"><b>{row.date}</b></TableCell>
        <TableCell align="left"><b>{sumOfWorkingHours(row.workPackages)}</b></TableCell>
        <TableCell align="left"><b>{projects(row.workPackages)}</b></TableCell>
        <TableCell align="left"><b>{tags(row.workPackages)}</b></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Working Hours</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.workPackages.map((current) => (
                    <TableRow key={current.project}>
                      <TableCell>{current.project}</TableCell>
                      <TableCell>{current.workingHours}</TableCell>
                      <TableCell>{current.tag}</TableCell>
                      <TableCell>{current.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

WorkListResults.propTypes = {
  work: PropTypes.array.isRequired
};
