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
  createData('abc1', 'open', 'Alex', '1', '2019-01-01', '1'),
  createData('abc2', 'working', 'Elena', '1', '2019-09-21', '1'),
  createData('abc3', 'open', 'Kevin', '1', '2019-06-11', '1'),
  createData('abc4', 'working', 'Janny', '1', '2019-04-04', '1'),
  createData('abc5', 'working', 'Jayce', '1', '2019-06-07', '1'),
  createData('abc6', 'open', 'Koa', '1', '2019-09-08', '1'),
  createData('abc7', 'working', 'Dan', '1', '2019-11-19', '1'),
  createData('abc8', 'working', 'Mike', '1', '2019-10-14', '1'),
  createData('abc9', 'open', 'Shasta', '1', '2019-02-18', '1'),
  createData('abc10', 'open', 'Tan', '1', '2019-06-12', '1'),
  createData('abc11', 'working', 'Jeff', '1', '2019-09-21', '1'),
  createData('abc12', 'working', 'Lauren', '1', '2019-10-25', '1'),
  createData('abc13', 'open', 'Ben', '1', '2019-11-11', '1'),
  createData('abc14', 'open', 'Sarah', '1', '2019-12-23', '1'),
  createData('abc15', 'open', 'Phil', '1', '2019-12-29', '1'),
  createData('abc16', 'open', 'Steph', '1', '2019-08-16', '1'),
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
