import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export function searchForms(searchText: string): Observable<Array<Form>> {
  let filter = "";
  if (searchText && searchText !== null && searchText.trim().length > 0) {
    filter = `&q=${searchText.trim()}`;
  }
  return openmrsObservableFetch(
    `/ws/rest/v1/form?v=custom:(uuid,name,encounterType:(uuid,name),version,published,retired,resources:(uuid,name,dataType,valueReference))${filter}`
  ).pipe(
    map(results => {
      const forms: Form[] = results["data"]["results"].map(form => {
        const transformed: Form = {
          uuid: form.uuid,
          name: form.name
        };
        return transformed;
      });
      return forms;
    })
  );
}

export type Form = {
  uuid: string;
  name: string;
};
