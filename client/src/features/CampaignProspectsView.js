import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import StepsTabs from '../features/StepsTabs';
import DataTable from '../features/DataTable';
import UserInputContainer from '../features/UserInputContainer';

const useStyles = makeStyles((theme) => ({
  prospectList: {
    overflow: "auto",
    width: "100%",
    height: 500,
    marginTop: 0,
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 12,
      paddingRight: 15,
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    }
  },
}))

const CampaignProspectsView = (props) => {
  const { steps, data, handleClickOnAllRows, handleClickOnRow, selectedProspects } = props;
  const classes = useStyles();

  console.log('selectedProspects', selectedProspects)
  console.log('prospects', data)
  return (
    <Fragment>
      <StepsTabs steps={steps}/>
      <UserInputContainer className={classes.prospectList}>
        <DataTable
          data={data}
          handleClickOnAllRows={handleClickOnAllRows}
          handleClickOnRow={handleClickOnRow}
          selectedProspects={selectedProspects}
          ></DataTable>
      </UserInputContainer>
    </Fragment>
  )
}

export default CampaignProspectsView;