import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Prospects from "./pages/Prospects";

import "./Main.css";

const Main = () => {
  
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/prospects" component={Prospects} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default Main;
