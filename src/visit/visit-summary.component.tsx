import React, { useState } from "react";

import StartVisitComponent from "./start-visit.component";
import useStartedVisit from "./use-started-visit";
import styles from "../summary-card.css";

export default function VisitSummaryComponent(props: any) {
  const visitToStart: VisitTypeProp = {
    // visitTypeUuid: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
    visitTypeUuid: "6b338817-8a12-4ef3-8263-4d952dee2de3",
    visitDisplay: "Outpatient Visit"
  };

  const [startingVisit, setStartingVisit] = useState(false);
  const [startedVisit, setStartedVisit] = useStartedVisit({
    visitTypeUuid: visitToStart.visitTypeUuid
  });

  const startVisit = visitType => {
    setStartingVisit(true);
  };

  const onVisitStarted = (visit: any) => {
    // console.log();
    setStartedVisit(visit);
    setStartingVisit(false);
  };

  const onVisitStartingCancelled = () => {
    setStartingVisit(false);
  };

  return (
    <div
      style={{
        // margin: "1.25rem, 1.5rem",
        minWidth: "20rem",
        textAlign: "left"
      }}
      className={`omrs-card ${styles.card}`}
    >
      <div className={styles.header}>
        <div className={`${styles.headerTitle}`}>
          <h2 className="omrs-padding-left-16">
            {startedVisit
              ? "Today's Outpatient Visit"
              : "Start New Clinical Visit"}
          </h2>
        </div>
      </div>
      <div
        style={{ maxHeight: "320px", minHeight: "90px", overflow: "scroll" }}
      >
        {!startingVisit && startedVisit === undefined && <div>Loading...</div>}
        {startingVisit && (
          <StartVisitComponent
            visitType={visitToStart}
            onVisitStarted={onVisitStarted}
            onCanceled={onVisitStartingCancelled}
          />
        )}
        {!startingVisit && startedVisit === null && (
          <div
            className="omrs-padding-top-4 omrs-padding-bottom-4"
            style={{
              borderBottom: "1px solid var(--omrs-color-bg-low-contrast)",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row"
            }}
          >
            <div style={{}}>
              <button
                className="omrs-btn omrs-text-action"
                onClick={() => startVisit(null)}
              >
                Start {visitToStart.visitDisplay}
              </button>
            </div>
            <div
              className="omrs-margin-right-4 omrs-padding-top-4"
              style={{ marginLeft: "auto" }}
            >
              <svg
                className="omrs-icon"
                fill="var(--omrs-color-ink-low-contrast)"
              >
                <use xlinkHref="#omrs-icon-chevron-right"></use>
              </svg>
            </div>
          </div>
        )}

        {startedVisit && (
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
      </div>
    </div>
  );
}

export type VisitTypeProp = {
  visitTypeUuid: string;
  visitDisplay: string;
};
