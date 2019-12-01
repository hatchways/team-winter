import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CloudIcon from '@material-ui/icons/Cloud';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const HeaderRow = ({ handleClickOnAllRows, numSelected, rowCount, data }) => {
  const header = Object.keys(data[0]);

  return (
    <TableHead>
      <TableRow>
          {header.map((headCell, index) => {
            if (headCell === 'check') {
              return <TableCell padding="checkbox" key={index}>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={handleClickOnAllRows}
              />
            </TableCell>
            } else if (headCell === 'cloudIcon') {
              return <TableCell
                key={index}
                align={"center"}
                >
                <CloudIcon className="fas fa-cloud" style={{color: "grey"}} />
              </TableCell>
            } else if (headCell === 'id') {
              return null;
            } else {
              return <TableCell
                key={index}
                align={"center"}
                >
                {headCell}
              </TableCell>
            }
          })}
      </TableRow>
    </TableHead>
  );
}

const DataTable = ({props}) => {
  const classes = useStyles();

  let { data, handleClickOnAllRows, handleClickOnRow, selectedProspects} = props;
  selectedProspects = selectedProspects || [];
  const isSelected = id => selectedProspects.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="table"
            >
            <HeaderRow
              classes={classes}
              numSelected={selectedProspects.length}
              handleClickOnAllRows={handleClickOnAllRows}
              rowCount={Object.keys(data).length}
              data={data}
            />
            <TableBody>
              {data.map((row, idx) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `table-checkbox-${idx}`;
                return (
                <TableRow
                  hover
                  onClick={event => handleClickOnRow(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={idx}
                  selected={isItemSelected}
                  > 
                  {Object.entries(row).map((eachCell, idx )=> {
                    if (eachCell[0] === 'check') {
                      return <TableCell padding="checkbox" key={idx}>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    } else if (eachCell[0] === "Email") {
                      return <TableCell key={idx} component="th" id={labelId} scope="row" p={1}> {eachCell[1]}</TableCell>
                    } else if (eachCell[0] === 'id') {
                      return null;
                    } else {
                      return <TableCell key={idx} id={labelId} align="center">{eachCell[1]}</TableCell>
                    }
                  })}
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}

export default DataTable;