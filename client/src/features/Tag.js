import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function OutlinedChips({name, handleDelete}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip
        onDelete={handleDelete}
        variant="outlined">
        {name}
      </Chip>
    </div>
  );
}