import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import { HivDashBoard } from "./dashboards/hiv-dashboard.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
export { backendDependencies } from "./openmrs-backend-dependencies";
export const name = "@ampath/esm-patient-chart-widgets";
export const widgets = {
  forms: HivDashBoard
};

export const patientChartConfigFile = require("./config/patient-chart-config.json");
