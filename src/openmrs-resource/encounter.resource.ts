import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Form, toFormObject } from "./form.resource";

export function getPatientEncounters(
  patientUuid: string
): Observable<Array<Encounter>> {
  return openmrsObservableFetch(
    `/ws/rest/v1/encounter?v=full&patient=${patientUuid}`
  ).pipe(
    map(results => {
      const encounters: Encounter[] = results["data"]["results"].map(
        encounter => toEncounterObject(encounter)
      );
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
