import React from "react";
import { Switch, Route, BrowserRouter, useParams } from "react-router-dom";
import FormsListComponent, {
  FormsListProps
} from "../forms/forms-list.component";
import EncounterViewerComponent, {
  EncounterViewerProps
} from "../encounter-viewer/encounter-viewer.component";

export default function FormEncounterNavigator(
  props: FormsListProps | EncounterViewerProps
) {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Switch>
        <Route
          exact
          path={"/patient/:patientUuid/chart/hiv-dashboard"}
          render={routeProps => (
            <FormsListComponent props={props} {...routeProps} />
          )}
        />
        <Route
          exact
          path={
            "/patient/:patientUuid/chart/hiv-dashboard/encounter-viewer/:encounterUuid"
          }
          render={routeProps => (
            <EncounterViewerComponent props={props} {...routeProps} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
