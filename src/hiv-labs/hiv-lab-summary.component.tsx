import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  SummaryCard,
  SummaryCardFooter
} from "@openmrs/esm-patient-chart-widgets";
import { useTranslation } from "react-i18next";
import { getCurrentPatientUuid } from "@openmrs/esm-api";
import useObs, { ObsParams, Sort } from "../hooks/use-obs";
import styles from "./hiv-lab-summary.component.css";
import { Subscription } from "rxjs";
import { formatDate } from "../utils/omrs-dates";

export default function HivLabSummary(props: any) {
  const CD4_COUNT_CONCEPT = "a8a8bb18-1350-11df-a1f1-0026b9348838";
  const VIRAL_LOAD_COUNT_CONCEPT = "a8982474-1350-11df-a1f1-0026b9348838";
  const { t } = useTranslation();
  const [obsParams, setObsParams] = useState<ObsParams>();
  const [obsByConcept, errorFetchingObs] = useObs(obsParams);
  const convertViralLoad = (viralLoad: number) => {
    return viralLoad > 0 ? viralLoad : "Undetectable";
  };
  useEffect(() => {
    let sub: Subscription;
    if (!obsParams) {
      sub = getCurrentPatientUuid().subscribe(uuid => {
        setObsParams({
          patientUuid: uuid,
          conceptUuids: [VIRAL_LOAD_COUNT_CONCEPT, CD4_COUNT_CONCEPT],
          orderByObsDate: Sort.DESC,
          top: 1
        });
      });
    }
    return () => sub && sub.unsubscribe();
  }, []);

  return (
    <SummaryCard name={t("HIV - Labs", "HIV - Labs")}>
      <div style={{ width: "100%" }}>
        <div
          className={`${styles.alignLeft} omrs-margin-left-4 omrs-margin-top-4`}
        >
          <div className={`omrs-type-body-small ${styles.faintText}`}>
            Last Results
          </div>
        </div>
        {obsByConcept && (
          <div className={styles.hivLabContainer}>
            <div
              className={`omrs-type-body-regular ${styles.rowTitle} ${styles.labItem}`}
            >
              CD4 Count
            </div>

            {obsByConcept[CD4_COUNT_CONCEPT] &&
            obsByConcept[CD4_COUNT_CONCEPT].length > 0 ? (
              <div className={`${styles.labItem}`}>
                <div>
                  <span className={`omrs-type-body-small ${styles.rowTitle}`}>
                    {obsByConcept[CD4_COUNT_CONCEPT][0].value}
                  </span>
                  <span className={`omrs-type-body-small ${styles.faintText}`}>
                    {" "}
                    cells/ul
                  </span>
                </div>
                <div
                  className={`omrs-type-body-small ${styles.faintText} omrs-padding-top-4`}
                >
                  {formatDate(obsByConcept[CD4_COUNT_CONCEPT][0].obsDatetime)}
                </div>
              </div>
            ) : (
              <div className={styles.labItem}>
                <span className={`omrs-type-body-small ${styles.faintText}`}>
                  None Found
                </span>
              </div>
            )}

            <div
              className={`omrs-type-body-regular ${styles.rowTitle} ${styles.labItem}`}
            >
              Viral Load
            </div>

            {obsByConcept[VIRAL_LOAD_COUNT_CONCEPT] &&
            obsByConcept[VIRAL_LOAD_COUNT_CONCEPT].length > 0 ? (
              <div className={styles.labItem}>
                <div>
                  <span className={`omrs-type-body-small ${styles.rowTitle}`}>
                    {convertViralLoad(
                      obsByConcept[VIRAL_LOAD_COUNT_CONCEPT][0].value
                    )}
                  </span>
                  {obsByConcept[VIRAL_LOAD_COUNT_CONCEPT][0].value > 0 && (
                    <span
                      className={`omrs-type-body-small ${styles.faintText}`}
                    >
                      {" "}
                      copies/ml
                    </span>
                  )}
                </div>
                <div
                  className={`omrs-type-body-small ${styles.faintText} omrs-padding-top-4`}
                >
                  {formatDate(
                    obsByConcept[VIRAL_LOAD_COUNT_CONCEPT][0].obsDatetime
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.labItem}>
                <span className={`omrs-type-body-small ${styles.faintText}`}>
                  None Found
                </span>
              </div>
            )}
          </div>
        )}
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

      <SummaryCardFooter
        linkTo={`/patient/${obsParams?.patientUuid}/chart/conditions`}
      />
    </SummaryCard>
  );
}
