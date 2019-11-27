import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const HeaderRow = ({ onSelectAllClick, numSelected, rowCount, header }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
          {header.map((headCell, index) => (
          <TableCell
            key={index}
            align={"center"}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
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

const DataTable = ({header, data}) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = email => selected.indexOf(email) !== -1;

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
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={Object.keys(data).length}
            header={header}
          />
          <TableBody>
          {data.map((row, index) => {
            const isItemSelected = isSelected(row.email)
            const labelId = `table-checkbox-${index}`;
            return (
              <TableRow
                hover
                onClick={(event) => {handleClick(event, row.email)}}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.email}
                selected={isItemSelected}
                > 
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                {Object.entries(row).map((each, index )=> {
                  if (each[0] === "email") {
                    return <TableCell key={index} component="th" id={labelId}  scope="row" padding="none"> {each[1]} </TableCell>
                  } else if (each[0] === "cloud") {
                    return <TableCell key={index} align="center">{header[1]}</TableCell>
                  } else {
                    return <TableCell key={index} align="center">{each[1]}</TableCell>
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