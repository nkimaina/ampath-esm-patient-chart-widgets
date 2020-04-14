import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Form, toFormObject } from "./form.resource";
import { toOmrsDateString } from "../utils/omrs-dates";

export function getPatientEncounters(
  patientUuid: string,
  startDate?: Date,
  endDate?: Date,
  v?: string
): Observable<Array<Encounter>> {
  if (!v) {
    v = `custom:(uuid,encounterDatetime,encounterType:(uuid,name),form:(uuid,name,encounterType:(uuid,name),version,published,retired,resources:(uuid,name,dataType,valueReference))`;
  }
  let url = `/ws/rest/v1/encounter?v=${v}&patient=${patientUuid}`;
  if (startDate) {
    url = `${url}&fromdate=${startDate.toISOString()}`;
  }
  if (endDate) {
    url = `${url}&todate=${endDate.toISOString()}`;
  }
  return openmrsObservableFetch(url).pipe(
    map(results => {
      const encounters: Encounter[] = results["data"][
        "results"
      ].map(encounter => toEncounterObject(encounter));
      return encounters;
    })
  );
}

export type Encounter = {
  uuid: string;
  encounterDateTime: Date;
  encounterTypeUuid?: string;
  encounterTypeName?: string;
  form?: Form;
};

export function toEncounterObject(openmrsRestEncounter: any): Encounter {
  return {
    uuid: openmrsRestEncounter.uuid,
    encounterDateTime: new Date(openmrsRestEncounter.encounterDatetime),
    encounterTypeUuid: openmrsRestEncounter.encounterType
      ? openmrsRestEncounter.encounterType.uuid
      : null,
    encounterTypeName: openmrsRestEncounter.encounterType
      ? openmrsRestEncounter.encounterType.name
      : null,
    form: openmrsRestEncounter.form
      ? toFormObject(openmrsRestEncounter.form)
      : null
  };
}
