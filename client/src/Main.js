import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";

const Main = () => {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default Main;
