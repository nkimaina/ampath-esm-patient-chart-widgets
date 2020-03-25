import { useState, useEffect } from "react";
import { Subscription } from "rxjs";
import {
  Order,
  getOrders,
  TestType
} from "../openmrs-resource/orders.resource";
import { Sort } from "../utils/sort-enum";

export default function useOrders(
  props: OrdersParams
): [OrdersByConceptMap, Function] {
  const [orderByConcept, setOrdersByConcept] = useState<OrdersByConceptMap>();
  useEffect(() => {
    let sub: Subscription;
    if (props) {
      sub = getOrders(
        props.patientUuid,
        props.conceptUuids,
        TestType.Test
      ).subscribe(results => {
        let orders: OrdersByConceptMap = {};
        orders["all"] = results;
        props.conceptUuids.forEach(conceptUuid => {
          let conceptOrders: Order[] = results.filter(
            o => o.concept.uuid === conceptUuid
          );
          if (props.orderByDateActivated === Sort.ASC) {
            conceptOrders = conceptOrders.sort(
              (a, b) => a.dateActivated.valueOf() - b.dateActivated.valueOf()
            );
          }
          if (props.orderByDateActivated === Sort.DESC) {
            conceptOrders = conceptOrders.sort(
              (a, b) => b.dateActivated.valueOf() - a.dateActivated.valueOf()
            );
          }
          if (props.top > 0) {
            conceptOrders = conceptOrders.slice(0, props.top);
          }
          orders[conceptUuid] = conceptOrders;
        });
        setOrdersByConcept(orders);
      });
    }
    return () => sub && sub.unsubscribe();
  }, [props]);
  return [orderByConcept, setOrdersByConcept];
}

export type OrdersParams = {
  conceptUuids: string[];
  patientUuid: string;
  orderByDateActivated?: Sort;
  top?: number;
};

export interface OrdersByConceptMap {
  [conceptUuid: string]: Order[];
}
