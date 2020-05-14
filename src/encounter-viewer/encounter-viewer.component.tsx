import React from "react";
import { match } from "react-router-dom";
import { SummaryCard } from "@openmrs/esm-patient-chart-widgets";
import { useTranslation } from "react-i18next";
import Parcel from "single-spa-react/parcel";

export default function EncounterViewerComponent(props: EncounterViewerProps) {
  const { t } = useTranslation();
  return (
    <SummaryCard name={t("Encounter Details", "Encounter Details")}>
      <div className="omrs-padding-20">
        <Parcel
          config={System.import("@ampath/esm-angular-form-entry")}
          view="encounter-viewer"
          encounterUuid={props.match.params.encounterUuid}
          handleError={err => console.error(err)}
          wrapWith="div"
          mountParcel={props.props.singleSpaContext.mountParcel}
        ></Parcel>
      </div>
    </SummaryCard>
  );
}

type routeParams = {
  encounterUuid: string;
};

export type EncounterViewerProps = {
  match?: match<routeParams>;
  location?: any;
  props: any;
  singleSpaContext?: any;
};
