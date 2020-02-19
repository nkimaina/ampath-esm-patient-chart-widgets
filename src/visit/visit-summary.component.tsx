import React from "react";

import StartVisitComponent from "./start-visit.component";
import styles from "../summary-card.css";

export default function VisitSummaryComponent(props: any) {
  const visitToStart: VisitTypeProp = {
    visitTypeUuid: "6b338817-8a12-4ef3-8263-4d952dee2de3",
    visitDisplay: "Outpatient Visit"
  };

  const onVisitStarted = (visit: any) => {
    // console.log();
  };

  return (
    <div
      style={{ margin: "1.25rem, 1.5rem", minWidth: "20rem" }}
      className={`omrs-card ${styles.card}`}
    >
      <div className={styles.header}>
        <div className={`${styles.headerTitle}`}>
          <h2 className="omrs-padding-left-16">Start New Clinical Visit</h2>
        </div>
      </div>
      <div style={{ maxHeight: "320px", overflow: "scroll" }}>
        <StartVisitComponent
          visitType={visitToStart}
          onVisitStarted={onVisitStarted}
        />
      </div>
    </div>
  );
}

export type VisitTypeProp = {
  visitTypeUuid: string;
  visitDisplay: string;
};
