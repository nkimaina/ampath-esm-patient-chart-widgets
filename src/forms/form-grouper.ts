import { Form } from "./form.resource";
import { FormsFilter } from "./form-list-filter";

export function groupFormsByProgram(
  forms: Array<Form>,
  programsConfig: Array<ProgramFormsConfig>
): Array<ProgramForms> {
  let grouped: Array<ProgramForms> = programsConfig.map(config => {
    let formFilter = new FormsFilter(forms);
    let programForms: Array<Form> = [];
    config.forms.forEach(selector => {
      programForms = programForms.concat(
        formFilter.filterByFormAndEncounterType(
          selector.encounterTypeUuid,
          selector.formUuid || null
        ).forms
      );
    });
    let program: ProgramForms = {
      programUuid: config.programUuid,
      programName: config.programName,
      programForms: programForms
    };
    return program;
  });

  return grouped;
}

export type ProgramForms = {
  programName: string;
  programUuid: string;
  programForms: Array<Form>;
  availableForms?: Array<Form>;
  completedForms?: Array<Form>;
};

export type ProgramFormsConfig = {
  programUuid: string;
  programName: string;
  forms: Array<FormSelector>;
};

export type FormSelector = {
  encounterTypeUuid: string;
  formUuid?: string;
};
