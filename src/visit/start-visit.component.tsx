import React from "react";
import { VisitTypeProp } from "./visit-summary.component";
import { getCurrentPatientUuid } from "@openmrs/esm-api";
import dayjs from "dayjs";
import { NewVisitPayload, saveVisit } from "../openmrs-resource/visit.resource";
import { FetchResponse } from "@openmrs/esm-api/dist/openmrs-fetch";

export default function StartVisitComponent(props: StartVisitProps) {
  // TODO: Move Styling
  const buttonStyle = {
    width: "44%"
  };

  const inputStyle = {
    width: "98%"
  };

  const inputLabelStyle = {
    color: "var(--omrs-color-ink-medium-contrast)"
  };

  const defaultDateTime = new Date();

  const [patientUuid, setPatientUuid] = React.useState();
  const [visitStartDate, setVisitStartDate] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [visitStartTime, setVisitStartTime] = React.useState(
    dayjs(new Date()).format("HH:mm")
  );
  const [locationUuid, setLocationUuid] = React.useState(
    "18c343eb-b353-462a-9139-b16606e6b6c2"
  );

  // events
  const startVisit = () => {
    let visitPayload: NewVisitPayload = {
      patient: patientUuid,
      startDatetime: dayjs(
        new Date(`${visitStartDate} ${visitStartTime}:00`)
      ).format("YYYY-MM-DD HH:mm:00"),
      visitType: props.visitType.visitTypeUuid,
      location: locationUuid
    };
    saveVisit(visitPayload, new AbortController()).subscribe(
      (response: FetchResponse<any>) => {
        props.onVisitStarted(response.data);
      },
      error => {
        console.error("error", error);
      }
    );
  };

  const onStartDateChanged = event => {
    setVisitStartDate(event.target.value);
  };

  const onStartTimeChanged = event => {
    setVisitStartTime(event.target.value);
  };

  const onLocationChanged = event => {
    setLocationUuid(event.target.value);
  };

  if (!patientUuid) {
    getCurrentPatientUuid().subscribe(uuid => {
      setPatientUuid(uuid);
    });
  }

  return (
    <div className="omrs-padding-8">
      <div
        className="omrs-type-body-regular omrs-margin-left-8 omrs-padding-4"
        style={{ ...inputLabelStyle, borderBottom: "1px solid lightgray" }}
      >
        {props.visitType.visitDisplay}
      </div>
      <div className="omrs-margin-12">
        <label
          htmlFor="visitStartDate"
          style={inputLabelStyle}
          className="omrs-type-body-regular"
        >
          Start Date/Time:
        </label>
        <div style={{ width: "100%" }}>
          <input
            style={{ width: "60%" }}
            id="visitStartDate"
            type="date"
            name="visitStartDate"
            defaultValue={visitStartDate}
            onChange={onStartDateChanged}
            className="omrs-type-body-regular omrs-padding-4 omrs-margin-4"
          />
          <input
            style={{ width: "34%" }}
            id="visitStartTime"
            type="time"
            name="visitStartTime"
            defaultValue={visitStartTime}
            onChange={onStartTimeChanged}
            className="omrs-type-body-regular omrs-padding-4 omrs-margin-4"
          />
        </div>
      </div>
      <div className="omrs-margin-12">
        <label
          htmlFor="visitLocation"
          style={inputLabelStyle}
          className="omrs-type-body-regular"
        >
          Location:
        </label>
        <select
          style={{ ...inputStyle, height: "34px" }}
          name="visitLocation"
          id="visitLocation"
          className="omrs-type-body-regular"
          onChange={onLocationChanged}
        >
          <option
            value="18c343eb-b353-462a-9139-b16606e6b6c2"
            className="omrs-padding-8"
          >
            MTRH Module 1
          </option>
          <option
            value="18c343eb-b353-462a-9139-b16606e6b6c4"
            className="omrs-padding-8"
          >
            MTRH Module 2
          </option>
        </select>
      </div>
      <div style={{ width: "100%" }}>
        <button
          className="omrs-link omrs-outlined-neutral omrs-rounded omrs-padding-8 omrs-margin-8 omrs-type-body-regular"
          style={buttonStyle}
          onClick={() => props.onCanceled()}
        >
          Cancel
        </button>
        <button
          className="omrs-link omrs-outlined-action omrs-rounded omrs-padding-8 omrs-type-body-regular omrs-margin-8"
          style={buttonStyle}
          onClick={() => startVisit()}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export type StartVisitProps = {
  visitType: VisitTypeProp;
  onVisitStarted(visit: any): void;
  onCanceled(): void;
};
