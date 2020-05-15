import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { HivDashBoard } from "./dashboards/hiv-dashboard.component";
import FormsList from "./forms/forms-list.component";
import VisitSummary from "./visit/visit-summary.component";
import HivLabSummary from "./hiv-labs/hiv-lab-summary.component";
import FormEncounterNavigator from "./routing/form-encounter-navigator";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: VisitSummary
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
export { backendDependencies } from "./openmrs-backend-dependencies";
export const name = "@ampath/esm-patient-chart-widgets";

export const hivWidget = HivDashBoard;
export const todaysVisitWidget = VisitSummary;
export const formsListWidget = FormsList;
export const hivLabSummaryWidget = HivLabSummary;
export const formEncounterNavigatorWidget = FormEncounterNavigator;
