import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Campaigns from './pages/Campaigns';
import Campaign from './pages/Campaign';
import Prospects from './pages/Prospects';
import Templates from './pages/Templates';
import Reporting from './pages/Reporting';

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
        <Route path="/campaigns" component={Campaigns} >
          <Route path="/campaigns/:id" component={Campaign} />
        </Route>
        <Route path="/prospects" component={Prospects} />
        <Route path="/templates" component={Templates} />
        <Route path="/reporting" component={Reporting} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default Main;
