import { Form } from "./form.resource";
import {
  filterUnpublishedRetired,
  filterByFormsUuid,
  filterByEncounterType,
  filterByText
} from "./form-list-filter";
describe("Form Processor", () => {
  const forms: Array<Form> = [
    {
      uuid: "uuid1",
      name: "POC Adult Return",
      published: false,
      retired: false,
      encounterTypeUuid: "type1",
      encounterTypeName: "Blue Card Encounter"
    },
    {
      uuid: "uuid2",
      name: "POC Youth Initial",
      published: true,
      retired: false,
      encounterTypeUuid: "type2",
      encounterTypeName: "MOH 756 Encounter"
    },
    {
      uuid: "uuid3",
      name: "POC GREEN Card",
      published: true,
      retired: true,
      encounterTypeUuid: "type3",
      encounterTypeName: "Green Card Encounter"
    },
    {
      uuid: "uuid4",
      name: "MOH 756 Form",
      published: true,
      retired: true,
      encounterTypeUuid: "type4",
      encounterTypeName: "Yellow Card Encounter"
    }
  ];

  it("filters out unpublished and retired forms", () => {
    const filtered = filterUnpublishedRetired(forms);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(forms[1]);
  });

  it("filters out forms not in the a list of forms uuid", () => {
    const filtered = filterByFormsUuid(forms, ["uuid3"]);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(forms[2]);
  });

  it("filters out forms not in a list of encounter types", () => {
    const filtered = filterByEncounterType(forms, ["type3"]);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(forms[2]);
  });

  it("filters forms by search text", () => {
    // case 1: Filters by Form Name
    let filtered = filterByText(forms, "green");
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(forms[2]);

    // case 2: Filters by encounter type name
    filtered = filterByText(forms, "yellow");
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(forms[3]);

    // case 2: Filters by both name and type, but prioritizes name
    filtered = filterByText(forms, "MOH 756");
    expect(filtered.length).toEqual(2);
    expect(filtered[0]).toBe(forms[3]);
  });
});
