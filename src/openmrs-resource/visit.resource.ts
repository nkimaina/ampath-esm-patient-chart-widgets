import { openmrsObservableFetch } from "@openmrs/esm-api";

import { Observable } from "rxjs";

export function saveVisit(
  payload: NewVisitPayload,
  abortController: AbortController
): Observable<any> {
  return openmrsObservableFetch(`/ws/rest/v1/visit`, {
    signal: abortController.signal,
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: payload
  });
}

export function updateVisit(
  uuid: string,
  payload: UpdateVisitPayload,
  abortController: AbortController
): Observable<any> {
  return openmrsObservableFetch(`/ws/rest/v1/visit/${uuid}`, {
    signal: abortController.signal,
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: payload
  });
}

export type NewVisitPayload = {
  location: string;
  patient: string;
  startDatetime: string;
  visitType: string;
};

export type UpdateVisitPayload = NewVisitPayload & {};
