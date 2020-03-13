import React from "react";
import {
  SummaryCard,
  SummaryCardFooter
} from "@openmrs/esm-patient-chart-widgets";
import { useTranslation } from "react-i18next";
import styles from "./hiv-lab-summary.component.css";

export default function HivLabSummary(props: any) {
  const patientUuid = "";
  const { t } = useTranslation();
  return (
    <SummaryCard
      name={t("HIV - Labs", "HIV - Labs")}
      // styles={{ margin: "1.25rem, 1.5rem" }}
    >
      <div style={{ width: "100%" }}>
        <div className={styles.hivLabContainer}>
          <div
            className={`omrs-type-body-regular ${styles.rowTitle} ${styles.labItem}`}
          >
            CD4 Count
          </div>
          <div className={`${styles.labItem}`}>
            <div>
              <span className={`omrs-type-body-small ${styles.rowTitle}`}>
                496
              </span>
              <span className={`omrs-type-body-small ${styles.faintText}`}>
                {" "}
                cells/ul
              </span>
            </div>
            <div className={`omrs-type-body-small ${styles.faintText}`}>
              15-Mar-2015
            </div>
          </div>
          <div
            className={`omrs-type-body-regular ${styles.rowTitle} ${styles.labItem}`}
          >
            Viral Load
          </div>
          <div className={styles.labItem}>
            <div>
              <span className={`omrs-type-body-small ${styles.rowTitle}`}>
                Undetectable
              </span>
              <span
                className={`omrs-type-body-small ${styles.faintText}`}
              ></span>
            </div>
            <div className={`omrs-type-body-small ${styles.faintText}`}>
              21-Jan-2020
            </div>
          </div>
        </div>
        <div
          style={{
            borderBottom: "solid 1px lightgray",
            width: "100%",
            height: "1px"
          }}
        ></div>
        <div className={styles.hivLabContainer}>
          <div className={`${styles.alignLeft}`}>
            <div className={`omrs-type-body-small ${styles.faintText}`}>
              Pending Labs
            </div>
            <div className={`omrs-type-body-small ${styles.rowTitle}`}>
              CD4 Count, Viral Load
            </div>
          </div>
        </div>
      </div>

      <SummaryCardFooter linkTo={`/patient/${patientUuid}/chart/conditions`} />
    </SummaryCard>
  );
}
