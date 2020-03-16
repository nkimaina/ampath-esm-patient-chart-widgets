import { toObs } from "./obs.resource";
import { openmrsObservableFetch } from "@openmrs/esm-api";

jest.mock("@openmrs/esm-api", () => ({
  useCurrentPatient: jest.fn(),
  openmrsFetch: jest.fn(),
  openmrsObservableFetch: jest.fn()
}));

describe("Obs Resource", () => {
  it("converts openmrs payload to obs type", () => {
    // CASE 1: value numeric
    const obs1 = {
      uuid: "cc923747-a01c-43ee-8f62-d0e2a96e94df",
      display: "HIV VIRAL LOAD, QUANTITATIVE: 571.0",
      obsDatetime: "2018-03-19T00:00:00.000+0300",
      encounter: null,
      value: 571.0,
      concept: {
        uuid: "a8982474-1350-11df-a1f1-0026b9348838",
        display: "HIV VIRAL LOAD, QUANTITATIVE"
      }
    };

    expect(JSON.stringify(toObs(obs1))).toEqual(
      '{"uuid":"cc923747-a01c-43ee-8f62-d0e2a96e94df","display":"HIV VIRAL LOAD, QUANTITATIVE: 571.0","concept":{"uuid":"a8982474-1350-11df-a1f1-0026b9348838","display":"HIV VIRAL LOAD, QUANTITATIVE"},"obsDatetime":"2018-03-18T21:00:00.000Z","value":571}'
    );

    // CASE 2: value text
    const obs2 = {
      uuid: "cc923747-a01c-43ee-8f62-d0e2a96e94df",
      display: "HIV VIRAL LOAD, QUANTITATIVE: 571.0",
      obsDatetime: "2018-03-19T00:00:00.000+0300",
      encounter: null,
      value: "some text",
      concept: {
        uuid: "a8982474-1350-11df-a1f1-0026b9348838",
        display: "HIV VIRAL LOAD, QUANTITATIVE"
      }
    };
    expect(JSON.stringify(toObs(obs2))).toEqual(
      '{"uuid":"cc923747-a01c-43ee-8f62-d0e2a96e94df","display":"HIV VIRAL LOAD, QUANTITATIVE: 571.0","concept":{"uuid":"a8982474-1350-11df-a1f1-0026b9348838","display":"HIV VIRAL LOAD, QUANTITATIVE"},"obsDatetime":"2018-03-18T21:00:00.000Z","value":"some text"}'
    );

    // CASE 3: value text
    const obs3 = {
      uuid: "cc923747-a01c-43ee-8f62-d0e2a96e94df",
      display: "HIV VIRAL LOAD, QUANTITATIVE: 571.0",
      obsDatetime: "2018-03-19T00:00:00.000+0300",
      encounter: null,
      value: true,
      concept: {
        uuid: "a8982474-1350-11df-a1f1-0026b9348838",
        display: "HIV VIRAL LOAD, QUANTITATIVE"
      }
    };
    expect(JSON.stringify(toObs(obs3))).toEqual(
      '{"uuid":"cc923747-a01c-43ee-8f62-d0e2a96e94df","display":"HIV VIRAL LOAD, QUANTITATIVE: 571.0","concept":{"uuid":"a8982474-1350-11df-a1f1-0026b9348838","display":"HIV VIRAL LOAD, QUANTITATIVE"},"obsDatetime":"2018-03-18T21:00:00.000Z","value":true}'
    );

    // CASE 4: value datetime
    const obs4 = {
      uuid: "cc923747-a01c-43ee-8f62-d0e2a96e94df",
      display: "HIV VIRAL LOAD, QUANTITATIVE: 571.0",
      obsDatetime: "2018-03-19T00:00:00.000+0300",
      encounter: null,
      value: "2018-03-19T00:00:00.000+0300",
      concept: {
        uuid: "a8982474-1350-11df-a1f1-0026b9348838",
        display: "HIV VIRAL LOAD, QUANTITATIVE"
      }
    };
    expect(JSON.stringify(toObs(obs4))).toEqual(
      '{"uuid":"cc923747-a01c-43ee-8f62-d0e2a96e94df","display":"HIV VIRAL LOAD, QUANTITATIVE: 571.0","concept":{"uuid":"a8982474-1350-11df-a1f1-0026b9348838","display":"HIV VIRAL LOAD, QUANTITATIVE"},"obsDatetime":"2018-03-18T21:00:00.000Z","value":"2018-03-18T21:00:00.000Z"}'
    );

    // CASE 5: value datetime
    const obs5 = {
      uuid: "cc923747-a01c-43ee-8f62-d0e2a96e94df",
      display: "ARV Regimen: Drug A",
      obsDatetime: "2018-03-19T00:00:00.000+0300",
      encounter: null,
      value: {
        uuid: "some-long-uuid",
        display: "Drug A"
      },
      concept: {
        uuid: "a8982474-1350-11df-a1f1-0026b9348838",
        display: "HIV VIRAL LOAD, QUANTITATIVE"
      }
    };
    expect(JSON.stringify(toObs(obs5))).toEqual(
      '{"uuid":"cc923747-a01c-43ee-8f62-d0e2a96e94df","display":"ARV Regimen: Drug A","concept":{"uuid":"a8982474-1350-11df-a1f1-0026b9348838","display":"HIV VIRAL LOAD, QUANTITATIVE"},"obsDatetime":"2018-03-18T21:00:00.000Z","value":{"uuid":"some-long-uuid","display":"Drug A"}}'
    );
  });
});
