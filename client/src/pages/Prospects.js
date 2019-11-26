import React, { Fragment } from "react";

import NavBar from "../features/NavBar";
import GmailDialog from "../features/GmailDialog";


function Prospects(props) {
  

  return (
    <Fragment>
      <NavBar />
      <GmailDialog open={true} />
    </Fragment>
  )

}

export default Prospects;
