import React from "react";
import useLocations from "./use-locations";
import { Location } from "../openmrs-resource/location.resource";

export default function LocationSelectComponent(props: LocationSelectProps) {
  const [locations] = useLocations();
  const onLocationsChanged = event => {
    props.onLocationChanged(
      locations.find(loc => loc.uuid == event.target.value)
    );
  };
  return (
    <>
      <select
        style={{ width: "98%", height: "34px" }}
        name="visitLocation"
        id="visitLocation"
        className="omrs-type-body-regular"
        onChange={onLocationsChanged}
      >
        {locations.map(location => {
          return (
            <option
              key={location.uuid}
              value={location.uuid}
              className="omrs-padding-8"
            >
              {location.display}
            </option>
          );
        })}
        <option
          key="f76c0c8e-2c3a-443c-b26d-96a9f3847764"
          value="f76c0c8e-2c3a-443c-b26d-96a9f3847764"
          className="omrs-padding-8"
        >
          Mosoriot Pharmacy
        </option>
      </select>
    </>
  );
}

export type LocationSelectProps = {
  onLocationChanged: (selected: Location) => any;
};
