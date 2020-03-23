import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Concept, toConcept } from "./obs.resource";
import { toDateObjectStrict } from "../utils/omrs-dates";

export function getOrders(
  patientUuid: string,
  conceptUuids: string[],
  testType: TestType,
  v?: string
): Observable<Array<Order>> {
  const custom =
    v ||
    "custom:(uuid,display,action,orderNumber,dateActivated,encounter:(uuid,encounterDatetime),concept:(uuid,display),orderer:ref,orderType:(name,javaClassName))";
  const url = `/ws/rest/v1/order?patient=${patientUuid}&v=${custom}`;
  return openmrsObservableFetch(url).pipe(
    map(results => {
      let orders: Order[] = results["data"]["results"].map(o => toOrder(o));
      // filter by test type
      orders = orders.filter(o => o.orderType.name === testType.valueOf());
      // filter by conceptuuids
      if (conceptUuids.length > 0) {
        orders = orders.filter(o => conceptUuids.includes(o.concept.uuid));
      }
      return orders;
    })
  );
}

export type Order = {
  uuid: string;
  display: string;
  action: string;
  orderNumber: string;
  dateActivated: Date;
  encounter: {
    uuid: string;
    encounterDatetime: Date;
  };
  concept: Concept;
  orderer: {
    uuid: string;
    display: string;
  };
  orderType: {
    name: string;
    javaClassName: string;
  };
};

export enum TestType {
  Test = "Test",
  Drug = "Drug Order"
}

export function toOrder(omrsPayload: any): Order {
  const order: Order = {
    uuid: omrsPayload.uuid,
    display: omrsPayload.display,
    action: omrsPayload.action,
    orderNumber: omrsPayload.orderNumber,
    dateActivated: toDateObjectStrict(omrsPayload.obsDatetime),
    encounter: {
      uuid: omrsPayload.encounter.uuid,
      encounterDatetime: toDateObjectStrict(
        omrsPayload.encounter.encounterDatetime
      )
    },
    concept: toConcept(omrsPayload.concept),
    orderer: omrsPayload.orderer,
    orderType: omrsPayload.orderType
  };
  return order;
}
