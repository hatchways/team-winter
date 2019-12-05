import React, { Fragment, useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import CloudIcon from '@material-ui/icons/Cloud';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import CustomizedButton from '../features/CustomizedButton';
import OutlinedButton from '../features/OutlinedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import CustomizedDialog from '../features/CustomizedDialog'
import GmailDialog from '../features/GmailDialog';
import { getJWT } from '../utils';
import SidePanel from '../features/SidePanel';

const useStyles = makeStyles((theme) => ({
  importButton: {
    backgroundColor: "#EDECF2",
    width: 150,
    height: 50,
  },
  newProspectButton: {
    width: 210,
    fontSize: 14,
  },
  seperationLine: {
    height: 26,
    borderLeft: "#EDECF2 0.08rem solid",
    margin: "1px 10px 0px 10px",
  },
  arrow: {
    marginTop: 6,
  },
  icon: {
    margin: "16px 17px 0px 14px",
  },
  featuresContainer: {
    padding: "100px 35px 0px",
    height: 105,
  },
  titleContainer: {
    paddingBottom: 10,
  },
  prospectList: {
    overflow: "auto",
    width: "100%",
    height: 600,
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
  tableContainer: {
    width: '95%'
  }
}));

const Prospects = () => {
  const classes = useStyles();
  const actionType = ['Add to Campaign']

  const [data, handleData] = useState([{}]);
  const [filteredData, handlefilteredData] = useState([{}]);
  const [dialog, handleDialog] = useState(null);
  const [listOfCampaigns, handleCampaigns] = useState(null);
  const [campaignId, setCampaignId] = useState('');
  const [selectedProspects, handleSelectedProspects] = useState([]);

  useEffect(() => {
    getAllCampaigns();
    getAllProspects();
  }, [])

  const handleSearch = (query) => {
    const filteredData = data.filter(prospect => {
      if (prospect.imported_from === query) {
        return prospect;
      }
    })
    handlefilteredData(filteredData);
  }

  const gmailDialogShouldOpen = () => {
    const qs = queryString.parse(window.location.search);
    if(qs['gmail_dialog']) return true;
    return false;
  }

  const getAllProspects = () => {
    fetch(`/prospects`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getJWT()}`
      }
    })
    .then(res => res.json())
      .then(result => {
        const listOfProspects = [];
        const cloudIcon = <CloudIcon className="fas fa-cloud" style={{color: "grey"}} />

        result.Prospects.map(prospect => {
          const prospectObj = {
            'id': prospect.id,
            'check': 'check',
            'Email': prospect.email,
            cloudIcon,
            'Status': 'working',
            'Owner': prospect.name,
            'Campaigns': prospect.campaigns,
            'Last Contacted': prospect.lastContacted,
            'Emails...': prospect.emails,
            'imported_from': prospect.imported_from
          }
          return listOfProspects.push(prospectObj)
        })
        handleData(listOfProspects)
      })
    .catch(err => {
      console.log(err.message);
    });
  }

  const getAllCampaigns = () => {
    fetch(`/campaigns`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getJWT()}`
      }
    })
    .then(res => res.json())
      .then(data => {
        handleCampaigns(data.Campaigns)
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const handleCloseDialogAndSaveProspects = () => {
    handleDialog(false)
    saveProspectsToCampaign()
  } 

  const saveProspectsToCampaign = () => {
    const data = {
      "prospect_ids": selectedProspects,
    };

    fetch(`/campaign/${campaignId}/prospects`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${getJWT()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
      .then(data => {
        console.log(data.message);
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  //handle select all row on DataTable.js
  const handleClickOnAllRows = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id);
      handleSelectedProspects(newSelecteds);
      return;
    }
    handleSelectedProspects([]);
  };

  //handle select one row on DataTable.js
  const handleClickOnRow = (event, id) => {
    const selectedIndex = selectedProspects.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProspects, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProspects.slice(1));
    } else if (selectedIndex === selectedProspects.length - 1) {
      newSelected = newSelected.concat(selectedProspects.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProspects.slice(0, selectedIndex),
        selectedProspects.slice(selectedIndex + 1),
      );
    }
    handleSelectedProspects(newSelected);
  };

  let listOfProspects = data;

  if (filteredData.length > 1) {
    listOfProspects = filteredData
  }

  const propsForDataTable = {
    data: listOfProspects,
    handleClickOnAllRows,
    handleClickOnRow,
    selectedProspects,
  }

  return (
    <Fragment>
      <NavBar />
      <Grid container id="container">
        <Grid item xs={12} lg={2} id='sidePanel' className="halfContainer">
          <Box>
          <SidePanel handleSearch={handleSearch}> </SidePanel>
          </Box>
        </Grid>
        <Grid item xs={12} lg={10} className="halfContainer">
          <Box id='ContainerWrapper' display="flex" flexDirection="row" justifyContent="center">
            <Box id="FeatureContainerAndDataTable" display="flex" flexDirection="column" width='100%'>
              <Box id="FeaturesContainer">
                  <Box
                  className={classes.featuresContainer}
                  display="flex">
                  <Box flexGrow={1}>
                    <Box className={classes.titleContainer}>
                      <Typography variant="h5"> Prospects </Typography>
                    </Box>
                    <Box>
                      {selectedProspects.length > 0 &&
                      <CustomizedButton
                        onClick={() => handleDialog(true)}>
                        {actionType}
                      </CustomizedButton>}
                    </Box>
                  </Box>
                    {dialog === true &&
                      <CustomizedDialog
                      actionType={actionType}
                      dataList={listOfCampaigns}
                      setValue={setCampaignId}
                      currentValue={campaignId}
                      dialog={dialog}
                      handleCloseDialogAndSaveProspects={handleCloseDialogAndSaveProspects}
                      handleDialog={handleDialog}
                      />}
                  <Box className={classes.icon}>
                    <FlashOnIcon fontSize="small" style={{color: "grey"}} />
                  </Box>
                  <Box className={classes.icon}>
                    <MailIcon fontSize="small" style={{color: "grey"}} />
                  </Box>
                  <Box pl={2}>
                    <OutlinedButton className={classes.importButton}> Imports </OutlinedButton>
                  </Box>
                  <Box pl={1}>
                    <CustomizedButton 
                      className={classes.newProspectButton}>
                      Add New Prospect
                      <div className={classes.seperationLine}></div>
                      <div className={classes.arrow} >
                        <ArrowDropDownIcon fontSize="small" style={{color: "white"}} pt={3} />
                      </div>
                    </CustomizedButton>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" id="DataTable" >
              <Box className={classes.tableContainer}>
                <UserInputContainer className={classes.prospectList}>
                  <DataTable props={propsForDataTable}></DataTable>
                </UserInputContainer>
            </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <GmailDialog open={gmailDialogShouldOpen()} />
    </Fragment>
  )
}

export default Prospects;