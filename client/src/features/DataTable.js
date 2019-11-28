import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const createData = (email, status, owner, campaigns, lastContacted, emails) => {
  return { email, status, owner, campaigns, lastContacted, emails};
}

// To-Do: Replace sample data using passed down data on props

const rows = [
  createData('abc17', 'working', 'RJ', '1', '2019-05-14', '1'),
  createData('abc18', 'open', 'Rich', '1', '2019-03-17', '1'),
  createData('abc19', 'working', 'Adriana', '1', '2019-04-27', '1'),
  createData('abc20', 'working', 'Pam', '1', '2019-05-30', '1'),
];

const cloudIcon = <i className="fas fa-cloud" style={{color: "grey"}}></i>

const useStyles = makeStyles( () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: "100%",
    marginTop: 10,
  },
}));


export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Prospects</StyledTableCell>
            <StyledTableCell align="right">Replies</StyledTableCell>
            <StyledTableCell align="right">Steps</StyledTableCell>
            <StyledTableCell align="right">Due</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.campaigns}</StyledTableCell>
              <StyledTableCell align="right">{row.lastContacted}</StyledTableCell>
              <StyledTableCell align="right">{row.emails}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
