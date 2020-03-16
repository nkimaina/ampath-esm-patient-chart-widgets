import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { isOmrsDateStrict, toDateObjectStrict } from "../utils/omrs-dates";

export function getObs(
  patientUuid: string,
  conceptUuids: string[],
  v?: string
): Observable<Array<Obs>> {
  const custom =
    v ||
    "custom:(uuid,display,obsDatetime,encounter:(encounterDatetime),value,concept:(uuid,display))";

  let concepts = "";
  conceptUuids.forEach(e => {
    if (concepts.length === 0) {
      concepts = concepts.concat(e);
    } else {
      concepts = concepts.concat(",").concat(e);
    }
  });
  let url = `/ws/rest/v1/obs?patient=${patientUuid}&v=${custom}`;
  if (concepts.length > 0) {
    url += `&concepts=${concepts}`;
  }

  return openmrsObservableFetch(url).pipe(
    map(results => {
      const obs: Obs[] = results["data"]["results"].map(obs => toObs(obs));
      return obs;
    })
  );
}

export type Obs = {
  uuid: string;
  display: string;
  concept: Concept;
  obsDatetime: Date;
  value: number | string | Date | Concept | boolean;
};

export type Concept = {
  uuid: string;
  display: string;
};

export function toObs(omrsPayload: any): Obs {
  const obs = {
    uuid: omrsPayload.uuid,
    display: omrsPayload.display,
    concept: toConcept(omrsPayload.concept),
    obsDatetime: toDateObjectStrict(omrsPayload.obsDatetime),
    value: null
  };

  if (omrsPayload.value && omrsPayload.value.uuid) {
    obs.value = toConcept(omrsPayload.value);
    return obs;
  }

  if (
    typeof omrsPayload.value === "number" ||
    typeof omrsPayload.value === "boolean"
  ) {
    obs.value = omrsPayload.value;
    return obs;
  }

  if (typeof omrsPayload.value === "string") {
    if (!isOmrsDateStrict(omrsPayload.value)) {
      obs.value = omrsPayload.value;
      return obs;
    }
    obs.value = toDateObjectStrict(omrsPayload.value);
    return obs;
  }
  return obs;
}

export function toConcept(omrsPayload: any): Concept {
  return {
    uuid: omrsPayload.uuid,
    display: omrsPayload.display
  };
}
