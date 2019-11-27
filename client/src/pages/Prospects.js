import React, { Fragment } from "react";

import NavBar from "../features/NavBar";
import GmailDialog from "../features/GmailDialog";
import GmailAuthorizationHandler from "../features/GmailAuthorizationHandler";
import ProspectsUpload from "../features/ProspectsUpload";


function Prospects(props) {
  

  return (
    <Fragment>
      <NavBar />
      <ProspectsUpload />
      <GmailDialog open={true} />
      <GmailAuthorizationHandler />
    </Fragment>
  )

}

export default Prospects;
