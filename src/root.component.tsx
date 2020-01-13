import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { BrowserRouter, Route } from "react-router-dom";

function Root(props) {
  return <div>Patient Chart Widgets</div>;
}

export default openmrsRootDecorator({ featureName: "home" })(Root);
