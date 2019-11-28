import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import NavBar from '../features/NavBar/MainBody';
import CampaignSummary from '../features/CampaignSummary';

const useStyles = makeStyles( () => ({
  container: {
    marginTop: '100px'
  }
}));

const Campaign = (props) => {

  const classes = useStyles();

  const title = "Campaign Title";
  const userName=  "John Doe";
  const prospectsTotal = 234;
  const prospectsContacted = 123;
  const prospectsReplied = 12;
  const steps = [
    {
      'templateId': 1,
      'templateName': 'A template name',
      'emailTemplate': '<p>One giant leap for mankind</p>',
      'sent': 123,
      'replied': 12
    }
  ]

  return (
    <Fragment>
      <NavBar />
      <Container className={classes.container}>
        <CampaignSummary title={title}
                         userName={userName}
                         prospects={prospectsTotal}
                         contacted={prospectsContacted}
                         replied={prospectsReplied}
                         steps={steps}
        />
      </Container>
    </Fragment>
  )
}

export default Campaign;