import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FormsList from "../forms/forms-list.component";
import VisitSummaryComponent from "../visit/visit-summary.component";

export function HivDashBoard(props) {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <VisitSummaryComponent />
      <FormsList props={props} />
    </BrowserRouter>
  );
}
