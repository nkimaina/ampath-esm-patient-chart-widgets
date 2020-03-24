import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  SummaryCard,
  SummaryCardFooter
} from "@openmrs/esm-patient-chart-widgets";
import { useTranslation } from "react-i18next";
import { getCurrentPatientUuid } from "@openmrs/esm-api";
import useObs, { ObsParams } from "../hooks/use-obs";
import styles from "./hiv-lab-summary.component.css";
import { Subscription } from "rxjs";
import { formatDate } from "../utils/omrs-dates";
import useOrders, { OrdersParams } from "../hooks/use-orders";
import { Sort } from "../utils/sort-enum";
import { Order } from "../openmrs-resource/orders.resource";

export default function HivLabSummary(props: any) {
  const CD4_COUNT_CONCEPT = "a8a8bb18-1350-11df-a1f1-0026b9348838";
  const VIRAL_LOAD_COUNT_CONCEPT = "a8982474-1350-11df-a1f1-0026b9348838";
  const { t } = useTranslation();
  const [obsParams, setObsParams] = useState<ObsParams>();
  const [ordersParams, setOrdersParams] = useState<OrdersParams>();
  const [obsByConcept, errorFetchingObs] = useObs(obsParams);
  const [ordersByConcept, setOrdersByConcept] = useOrders(ordersParams);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
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
        setOrdersParams({
          patientUuid: uuid,
          conceptUuids: [VIRAL_LOAD_COUNT_CONCEPT, CD4_COUNT_CONCEPT],
          orderByDateActivated: Sort.DESC,
          top: 1
        });
      });
    }
    return () => sub && sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (obsByConcept && ordersByConcept) {
      let pending: Array<Order> = [];
      [CD4_COUNT_CONCEPT, VIRAL_LOAD_COUNT_CONCEPT].forEach(conceptUuid => {
        if (ordersByConcept[conceptUuid].length > 0) {
          if (obsByConcept[conceptUuid].length > 0) {
            if (
              ordersByConcept[conceptUuid][0].dateActivated.valueOf() >
              obsByConcept[conceptUuid][0].obsDatetime.valueOf()
            ) {
              pending.push(ordersByConcept[conceptUuid][0]);
            }
          } else {
            pending.push(ordersByConcept[conceptUuid][0]);
          }
        }
      });
      setPendingOrders(pending);
    }
  }, [ordersByConcept, obsByConcept]);

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
              {pendingOrders.length > 0 &&
                pendingOrders.map((order, index) => {
                  let ord: string;
                  if (order.concept.uuid === CD4_COUNT_CONCEPT) {
                    ord = "CD4 Count";
                  }
                  if (order.concept.uuid === VIRAL_LOAD_COUNT_CONCEPT) {
                    ord = "Viral Load";
                  }
                  if (index < pendingOrders.length - 1) {
                    ord = ord.concat(", ");
                  }
                  return ord;
                })}
              {pendingOrders.length === 0 &&
                ordersByConcept !== null &&
                "None Found"}
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
