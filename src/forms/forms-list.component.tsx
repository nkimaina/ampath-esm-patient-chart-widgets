import React from "react";
import { match } from "react-router";
import styles from "../summary-card.css";
import { FormRenderer } from "./form-renderer.component";
import { searchForms, Form } from "../openmrs-resource/form.resource";
import { addComponentToWorkSpace } from "../work-space/work-space-controller";
import { FormsFilter } from "./form-list-filter";
import { getPatientEncounters } from "../openmrs-resource/encounter.resource";
import { getCurrentPatientUuid } from "@openmrs/esm-api";

export default function FormsList(props: FormsListProps) {
  let formFilter: FormsFilter;

  const [forms, setForms] = React.useState(new Array<Form>());
  const [allForms, setAllForms] = React.useState(new Array<Form>());
  const [searchTerm, setSearchTerm] = React.useState("");

  const formItemStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    minHeight: "30px",
    cursor: "pointer"
  };

  const handleFormSelected = selectedForm => {
    addComponentToWorkSpace({
      component: FormRenderer,
      name: "Form",
      props: { ...props.props, formUuid: selectedForm, match: { params: {} } },
      inProgress: false
    }).then(
      success => {},
      error => {
        console.error(error);
      }
    );
  };

  const handleFormSearchInput = searchTerm => {
    setSearchTerm(searchTerm);
  };

  const applyDefaultFilter = () => {
    formFilter = new FormsFilter(allForms).filterUnpublishedRetired();
  };

  React.useEffect(() => {
    if (allForms.length === 0) {
      searchForms("POC").subscribe(forms => {
        setAllForms(forms);
      });
    }
  }, []);

  React.useEffect(() => {
    if (!formFilter) {
      applyDefaultFilter();
    }
    if (searchTerm && searchTerm.trim() !== "") {
      formFilter = formFilter.filterByText(searchTerm);
    }
    setForms(formFilter.forms);
  }, [searchTerm, allForms]);

  getCurrentPatientUuid().subscribe(uuid => {
    getPatientEncounters(uuid).subscribe(results => {
      // console.log("encounters", results);
    });
  });

  return (
    <div
      style={{ margin: "1.25rem, 1.5rem", minWidth: "20rem" }}
      className={`omrs-card ${styles.card}`}
    >
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>
            Forms List{" "}
            <input
              className={`omrs-type-title-5`}
              placeholder="Search form"
              aria-label="Search form"
              onChange={$event => handleFormSearchInput($event.target.value)}
            />
          </h2>
        </div>
      </div>
      <div style={{ maxHeight: "320px", overflow: "scroll" }}>
        {forms &&
          forms.map(form => {
            return (
              <div
                role="button"
                key={form.uuid}
                tabIndex={-1}
                style={{
                  borderBottom: "0.5px solid lightgray",
                  ...formItemStyle
                }}
                onClick={$event => handleFormSelected(form.uuid)}
              >
                {form.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}

type FormsListProps = {
  match: match;
  location: any;
  props: any;
};
