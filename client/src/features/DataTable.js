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

const createData = (email, status, owner, campaigns, lastContacted) => {
  return { email, status, owner, campaigns, lastContacted};
}

const rows = [
  createData('abc1', 'open', 'Alex', '1', '2019-01-01'),
  createData('abc2', 'working', 'Elena', '1', '2019-09-21'),
  createData('abc3', 'open', 'Kevin', '1', '2019-06-11'),
  createData('abc4', 'working', 'Janny', '1', '2019-04-04'),
  createData('abc5', 'working', 'Jayce', '1', '2019-06-07'),
  createData('abc6', 'open', 'Koa', '1', '2019-09-08'),
  createData('abc7', 'working', 'Dan', '1', '2019-11-19'),
  createData('abc8', 'working', 'Mike', '1', '2019-10-14'),
  createData('abc9', 'open', 'Shasta', '1', '2019-02-18'),
  createData('abc10', 'open', 'Tan', '1', '2019-06-12'),
  createData('abc11', 'working', 'Jeff', '1', '2019-09-21'),
  createData('abc12', 'working', 'Lauren', '1', '2019-10-25'),
  createData('abc13', 'open', 'Ben', '1', '2019-11-11'),
  createData('abc14', 'open', 'Sarah', '1', '2019-12-23'),
  createData('abc15', 'open', 'Phil', '1', '2019-12-29'),
  createData('abc16', 'open', 'Steph', '1', '2019-08-16'),
  createData('abc17', 'working', 'RJ', '1', '2019-05-14'),
  createData('abc18', 'open', 'Rich', '1', '2019-03-17'),
  createData('abc19', 'working', 'Adriana', '1', '2019-04-27'),
  createData('abc20', 'working', 'Pam', '1', '2019-05-30'),
];

const cloudIcon = <i className="fas fa-cloud" style={{color: "grey"}}></i>

const useStyles = makeStyles(theme => ({
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
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="right"><i className="fas fa-cloud" style={{color: "white"}}></i></StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Campaigns</StyledTableCell>
            <StyledTableCell align="right">Last Contacted</StyledTableCell>
            <StyledTableCell align="right">Emails...</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{cloudIcon}</StyledTableCell>
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
