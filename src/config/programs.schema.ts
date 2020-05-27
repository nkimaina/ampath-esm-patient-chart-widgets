import { validators } from "@openmrs/esm-module-config";
import { ChartWidgetConfig } from "@openmrs/esm-patient-chart-widgets";

export const programsConfigSchema = {
  programs: {
    arrayElements: {
      programUuid: { validators: [validators.isString] },
      programName: { validators: [validators.isString] },
      forms: {
        arrayElements: {
          encounterTypeUuid: { validators: [validators.isString] },
          formUuid: { validators: [validators.isString] },
          formName: { validators: [validators.isString] }
        }
      }
    },
    default: []
  }
};

export type ProgramFormsConfig = {
  programUuid: string;
  programName: string;
  forms: Array<FormSelector>;
};

export interface ProgramConfig extends ChartWidgetConfig {
  programs: ProgramFormsConfig[];
}

export type FormSelector = {
  encounterTypeUuid: string;
  formUuid?: string;
};
