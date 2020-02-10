import { Form } from "./form.resource";

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
    if (form.encounterTypeName.toLowerCase().includes(searchText)) {
      filtered.push(form);
      return false;
    }
    return true;
  });
  return filtered;
}
