import {
  ProgramFormsConfig,
  ProgramForms,
  groupFormsByProgram
} from "./form-grouper";
import { Form } from "../openmrs-resource/form.resource";
describe("Form Grouper", () => {
  const programFormsConfig: Array<ProgramFormsConfig> = [
    {
      programUuid: "hiv-uuid",
      programName: "HIV",
      forms: [
        {
          encounterTypeUuid: "poc-init-uuid"
        },
        {
          encounterTypeUuid: "blue-card-uuid",
          formUuid: "uuid4"
        }
      ]
    },
    {
      programUuid: "tb-uuid",
      programName: "TB",
      forms: [
        {
          encounterTypeUuid: "tb-enrol-uuid"
        }
      ]
    }
  ];

  const forms: Array<Form> = [
    {
      uuid: "uuid1",
      name: "POC Adult Return",
      published: false,
      retired: false,
      encounterTypeUuid: "blue-card-uuid",
      encounterTypeName: "Blue Card Encounter"
    },
    {
      uuid: "uuid2",
      name: "POC Youth Initial",
      published: true,
      retired: false,
      encounterTypeUuid: "poc-init-uuid",
      encounterTypeName: "POC INIT ENC"
    },
    {
      uuid: "uuid3",
      name: "POC TB Enrolment",
      published: true,
      retired: true,
      encounterTypeUuid: "tb-enrol-uuid",
      encounterTypeName: "TB INIT ENC"
    },
    {
      uuid: "uuid4",
      name: "MOH 756 Form",
      published: true,
      retired: false,
      encounterTypeUuid: "blue-card-uuid",
      encounterTypeName: "Blue Card Encounter"
    }
  ];

  it("groups forms by programs given Program Form Config", () => {
    let grouped: Array<ProgramForms> = groupFormsByProgram(
      forms,
      programFormsConfig
    );
    expect(grouped.length).toEqual(2);
    expect(grouped[0].programName).toEqual("HIV");
    expect(grouped[0].programUuid).toEqual("hiv-uuid");
    expect(grouped[1].programName).toEqual("TB");

    expect(grouped[0].programForms.length).toBe(2);
    expect(grouped[0].programForms[0]).toBe(forms[1]);
    expect(grouped[0].programForms[1]).toBe(forms[3]);

    expect(grouped[1].programForms.length).toEqual(1);
    expect(grouped[1].programForms[0]).toBe(forms[2]);
  });
});
