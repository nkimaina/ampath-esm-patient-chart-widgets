import { validators } from "@openmrs/esm-module-config";

export const esmPatientChartWidgetsSchema = {
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
