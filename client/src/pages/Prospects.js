import React, { Fragment } from "react";

import NavBar from "../features/NavBar";
import GmailDialog from "../features/GmailDialog";
import GmailAuthorizationHandler from "../features/GmailAuthorizationHandler";


function Prospects(props) {
  

  return (
    <Fragment>
      <NavBar />
      <GmailDialog open={true} />
      <GmailAuthorizationHandler />
    </Fragment>
  )

}

export default Prospects;
