import React, { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import StepsTabs from '../features/StepsTabs';
import DataTable from '../features/DataTable';
import UserInputContainer from '../features/UserInputContainer';

const useStyles = makeStyles((theme) => ({
  prospectList: {
    overflow: "auto",
    width: "100%",
    height: 590,
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
  let { steps, data, handleClickOnAllRows, handleClickOnRow, selectedProspects } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState(0);
  const [currentStepId, setCurrentStepId] = useState(0);

  const handleCurrentStepId = (idx, step) => {
    if (idx === 0) {
      setSelected(0);
      setCurrentStepId(0)
    } else {
      setSelected(idx);
      setCurrentStepId(step.id)
    }
  }

  data = data.filter(prospect => prospect.steps[currentStepId])

  return (
    <Fragment>
      <StepsTabs
        steps={steps}
        selected={selected}
        setSelected={setSelected}
        value={value}
        setValue={setValue}
        handleCurrentStepId={handleCurrentStepId}
        >
      </StepsTabs>
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