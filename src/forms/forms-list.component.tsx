import React from "react";
import { match } from "react-router";
import styles from "../summary-card.css";
import { FormRenderer } from "./form-renderer.component";

export default function FormsList(props: FormsListProps) {
  let newWorkspaceItem;
  System.import("@openmrs/esm-patient-chart").then(mod => {
    newWorkspaceItem = mod.newWorkspaceItem;
  });

  const formItemStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    minHeight: "30px",
    cursor: "pointer"
  };

  const handleFormSelected = selectedForm => {
    newWorkspaceItem({
      component: FormRenderer,
      name: "Form",
      props: { ...props.props, formUuid: selectedForm, match: { params: {} } },
      inProgress: false
    });
  };
  return (
    <div
      style={{ margin: "1.25rem, 1.5rem", minWidth: "20rem" }}
      className={`omrs-card ${styles.card}`}
    >
      <div className={styles.header}>
        <div className={styles.headerTitle}>Forms List</div>
      </div>

      <div
        role="button"
        tabIndex={-1}
        style={{
          borderBottom: "0.5px solid lightgray",
          ...formItemStyle
        }}
        onClick={$event => handleFormSelected("greenCard")}
      >
        HIV Green Card Form
      </div>

      <div
        role="button"
        tabIndex={-1}
        style={formItemStyle}
        onClick={$event => handleFormSelected("blueCard")}
      >
        HIV Blue Card Form
      </div>
    </div>
  );
}

type FormsListProps = {
  match: match;
  location: any;
  props: any;
};
