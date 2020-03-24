import { useState, useEffect } from "react";
import { Subscription } from "rxjs";
import { getObs, Obs } from "../openmrs-resource/obs.resource";
import { Sort } from "../utils/sort-enum";

export default function useObs(props: ObsParams) {
  const [obsByConcept, setObsByConcept] = useState<ObsByConceptMap>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    let obsSub: Subscription;
    if (props) {
      obsSub = getObs(props.patientUuid, props.conceptUuids).subscribe(
        results => {
          let obs: ObsByConceptMap = {};
          obs["all"] = results;
          props.conceptUuids.forEach(conceptUuid => {
            let conceptObs: Obs[] = results.filter(
              o => o.concept.uuid === conceptUuid
            );
            if (props.orderByObsDate === Sort.ASC) {
              conceptObs = conceptObs.sort(
                (a, b) => a.obsDatetime.valueOf() - b.obsDatetime.valueOf()
              );
            }
            if (props.orderByObsDate === Sort.DESC) {
              conceptObs = conceptObs.sort(
                (a, b) => b.obsDatetime.valueOf() - a.obsDatetime.valueOf()
              );
            }
            if (props.top > 0) {
              conceptObs = conceptObs.slice(0, props.top);
            }
            obs[conceptUuid] = conceptObs;
          });
          setObsByConcept(obs);
        },
        err => {
          setError(err);
          setObsByConcept(null);
        }
      );
    }
    return () => obsSub && obsSub.unsubscribe();
  }, [props]);
  return [obsByConcept, error];
}

export type ObsParams = {
  conceptUuids: string[];
  patientUuid: string;
  orderByObsDate?: Sort;
  top?: number;
};

export interface ObsByConceptMap {
  [conceptUuid: string]: Obs[];
}
