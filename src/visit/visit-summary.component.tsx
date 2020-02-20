import React from "react";

import StartVisitComponent from "./start-visit.component";
import styles from "../summary-card.css";

export default function VisitSummaryComponent(props: any) {
  const visitToStart: VisitTypeProp = {
    visitTypeUuid: "6b338817-8a12-4ef3-8263-4d952dee2de3",
    visitDisplay: "Outpatient Visit"
  };

  const [startingVisit, setStartingVisit] = React.useState(false);
  const [startedVisit, setStartedVisit] = React.useState();

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
      style={{ margin: "1.25rem, 1.5rem", minWidth: "20rem" }}
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
        {startingVisit && (
          <StartVisitComponent
            visitType={visitToStart}
            onVisitStarted={onVisitStarted}
            onCanceled={onVisitStartingCancelled}
          />
        )}
        {!startingVisit && !startedVisit && (
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
              <use xlinkHref="#omrs-icon-access-time"></use>
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
