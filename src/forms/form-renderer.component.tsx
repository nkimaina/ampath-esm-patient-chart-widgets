import React from "react";
import { AppProps, ParcelConfig } from "single-spa";

export function FormRenderer(props: FormRenderProps) {
  React.useEffect(() => {
    System.import("@ampath/esm-angular-form-entry").then(
      (config: ParcelConfig) => {
        const domElement = document.getElementById(props.formUuid);
        const parcelProps = {
          domElement,
          formUuid: props.formUuid,
          encounterUuid: props.encounterUuid,
          entryStarted: props.entryStarted,
          entrySubmitted: props.entrySubmitted,
          entryCancelled: props.entryCancelled,
          closeComponent: props.closeComponent
        };
        props.mountParcel(config, parcelProps);
      }
    );
  }, []);
  return (
    <div key={props.formUuid} id={props.formUuid}>
      Loading form widget..
    </div>
  );
}

export type FormRenderProps = AppProps & {
  formUuid: string;
  encounterUuid?: string;
  entryStarted?: Function;
  entrySubmitted?: Function;
  entryCancelled?: Function;
  closeComponent?: Function;
};
