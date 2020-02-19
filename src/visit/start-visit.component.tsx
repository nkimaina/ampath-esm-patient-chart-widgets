import React from "react";
import { VisitTypeProp } from "./visit-summary.component";

export default function StartVisitComponent(props: StartVisitProps) {
  // console.log("Today Visit", props);
  const buttonStyle = {
    width: "48%"
  };

  const inputStyle = {
    width: "100%"
  };

  const inputLabelStyle = {
    color: "var(--omrs-color-ink-medium-contrast)"
  };
  const startVisit = (visit: VisitTypeProp) => {
    // console.log("starting visit ", visit.visitDisplay);
  };

  return (
    <div className="omrs-padding-8">
      <div
        className="omrs-type-title-5 omrs-margin-left-8"
        style={{ ...inputLabelStyle }}
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
        <input
          style={inputStyle}
          id="visitStartDate"
          type="datetime-local"
          name="visitStartDate"
          className="omrs-type-body-regular omrs-padding-4"
        />
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
      <div>
        <button
          className="omrs-link omrs-outlined-neutral omrs-rounded omrs-padding-8 omrs-margin-8 omrs-type-body-regular"
          style={buttonStyle}
        >
          Cancel
        </button>
        <button
          className="omrs-link omrs-outlined-action omrs-rounded omrs-padding-8 omrs-type-body-regular omrs-margin-8"
          style={buttonStyle}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export type StartVisitProps = {
  visitType: VisitTypeProp;
  onVisitStarted: Function;
};
