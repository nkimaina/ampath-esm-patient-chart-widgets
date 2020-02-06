import React from "react";
import { AppProps, ParcelConfig } from "single-spa";

export function FormRenderer(props: FormRenderProps) {
  React.useEffect(() => {
    System.import("@ampath/esm-angular-form-entry").then(
      (config: ParcelConfig) => {
        const domElement = document.getElementById(props.formUuid);
        const parcelProps = {
          domElement,
          formUuid: "27406390-a255-4936-9415-e8d8685c6304"
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
};
