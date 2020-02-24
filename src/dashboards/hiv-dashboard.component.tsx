import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FormsList from "../forms/forms-list.component";

export function HivDashBoard(props) {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <FormsList props={props} match={null} location={null} />
    </BrowserRouter>
  );
}
