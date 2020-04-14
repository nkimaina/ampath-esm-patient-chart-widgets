import React, { useState } from "react";

export default function StartedVisitComponent(props: startedVisitProps) {
  return (
    <>
      {props.visit && (
        <div
          className="omrs-type-body-regular omrs-padding-top-4 omrs-margin-left-16"
          style={{ color: "var(--omrs-color-interaction)" }}
        >
          <svg
            className="omrs-icon"
            fill="var(--omrs-color-interaction)"
            style={{ height: "1rem", width: "1rem" }}
          >
            <use xlinkHref="#omrs-icon-check-circle"></use>
          </svg>{" "}
          Started Outpatient Visit
        </div>
      )}
    </>
  );
}

export type startedVisitProps = {
  visit: any;
};
