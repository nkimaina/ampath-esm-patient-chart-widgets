import { Form } from "../openmrs-resource/form.resource";

export function filterUnpublishedRetired(forms: Array<Form>): Array<Form> {
  let filtered = forms.filter(form => {
    return form.published && !form.retired;
  });
  return filtered;
}

export function filterByFormsUuid(
  forms: Array<Form>,
  formUuids: Array<string>
): Array<Form> {
  let filtered = forms.filter(form => {
    return formUuids.includes(form.uuid);
  });
  return filtered;
}

export function filterByEncounterType(
  forms: Array<Form>,
  encounterTypeUuids: Array<string>
): Array<Form> {
  let filtered = forms.filter(form => {
    return encounterTypeUuids.includes(form.encounterTypeUuid);
  });
  return filtered;
}

export function filterByText(
  forms: Array<Form>,
  searchText: string
): Array<Form> {
  searchText = searchText.trim().toLowerCase();
  let unfiltered: Array<Form> = forms;
  let filtered: Array<Form> = [];

  // filter first by name
  unfiltered = unfiltered.filter(form => {
    if (form.name.toLowerCase().includes(searchText)) {
      filtered.push(form);
      return false;
    }
    return true;
  });

  // then by encounter type name
  unfiltered = unfiltered.filter(form => {
    if (
      form.encounterTypeName &&
      form.encounterTypeName.toLowerCase().includes(searchText)
    ) {
      filtered.push(form);
      return false;
    }
    return true;
  });
  return filtered;
}

export function filterByFormAndEncounterType(
  forms: Array<Form>,
  encounterTypeUuid: string,
  formUuid: string = null
): Array<Form> {
  let filtered = forms.filter(form => {
    return (
      encounterTypeUuid === form.encounterTypeUuid &&
      (formUuid === null || formUuid === form.uuid)
    );
  });
  return filtered;
}

// chaining of filtering a.k.a builder pattern
export class FormsFilter {
  private _forms: Array<Form> = [];
  public get forms(): Array<Form> {
    return this._forms;
  }

  constructor(forms: Array<Form>) {
    this._forms = forms;
  }

  public filterUnpublishedRetired(): FormsFilter {
    return new FormsFilter(filterUnpublishedRetired(this.forms));
  }

  public filterByFormsUuid(formUuids: Array<string>): FormsFilter {
    return new FormsFilter(filterByFormsUuid(this.forms, formUuids));
  }

  public filterByEncounterType(encounterTypeUuids: Array<string>): FormsFilter {
    return new FormsFilter(
      filterByEncounterType(this.forms, encounterTypeUuids)
    );
  }

  public filterByText(searchText: string): FormsFilter {
    return new FormsFilter(filterByText(this.forms, searchText));
  }

  public filterByFormAndEncounterType(
    encounterTypeUuid: string,
    formUuid: string = null
  ): FormsFilter {
    return new FormsFilter(
      filterByFormAndEncounterType(this.forms, encounterTypeUuid, formUuid)
    );
  }
}
