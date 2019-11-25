import React, { Fragment }  from "react";

import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../features/NavBar'
import ProspectsUpload from "../features/ProspectsUpload";
import Sidebar from "../features/Sidebar";
 
const useStyles = makeStyles(theme => ({
  
}));

const Prospects = () => {
  
  const classes = useStyles();

  

  return (
    <Fragment>
      <NavBar />
      <Sidebar>
        <ProspectsUpload />
      </Sidebar>
    </Fragment>
  );

}

export default Prospects;



