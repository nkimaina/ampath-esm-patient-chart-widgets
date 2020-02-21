import React from "react";
import { match } from "react-router";
import styles from "../summary-card.css";
import { FormRenderer } from "./form-renderer.component";
import { searchForms, Form } from "../openmrs-resource/form.resource";
import { addComponentToWorkSpace } from "../work-space/work-space-controller";
import { FormsFilter } from "./form-list-filter";
import {
  getPatientEncounters,
  Encounter
} from "../openmrs-resource/encounter.resource";
import { getCurrentPatientUuid } from "@openmrs/esm-api";
import { filterAvailableCompletedForms } from "./form-grouper";

export default function FormsList(props: FormsListProps) {
  let formFilter: FormsFilter;

  const [forms, setForms] = React.useState(new Array<Form>());
  const [encounters, setEncounters] = React.useState(new Array<Encounter>());
  const [completedForms, setCompletedForms] = React.useState(
    new Array<Encounter>()
  );
  const [allForms, setAllForms] = React.useState(new Array<Form>());
  const [searchTerm, setSearchTerm] = React.useState("");

  const formItemStyle = {
    paddingTop: "2px",
    paddingBottom: "2px",
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
    let filter = new FormsFilter(allForms).filterUnpublishedRetired();
    let availability = filterAvailableCompletedForms(filter.forms, encounters);
    // console.log('availability', availability);
    formFilter = new FormsFilter(availability.available);
    setCompletedForms(availability.completed);
  };

  React.useEffect(() => {
    if (allForms.length === 0) {
      getCurrentPatientUuid().subscribe(uuid => {
        getPatientEncounters(uuid).subscribe(encounters => {
          searchForms("POC").subscribe(forms => {
            setEncounters(encounters.slice(0, 2));
            setAllForms(forms);
          });
        });
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

  return (
    <div
      style={{ margin: "1.25rem, 1.5rem", minWidth: "20rem" }}
      className={`omrs-card ${styles.card}`}
    >
      <div className={styles.header}>
        <div className={`${styles.headerTitle}`}>
          <h2 className="omrs-padding-left-16">
            Forms List{" "}
            <input
              className={`omrs-type-body-regular`}
              placeholder="Search form"
              aria-label="Search form"
              onChange={$event => handleFormSearchInput($event.target.value)}
            />
          </h2>
        </div>
      </div>
      <div style={{ maxHeight: "320px", overflow: "scroll" }}>
        {completedForms &&
          completedForms.map(encounter => {
            return (
              <div
                role="button"
                key={encounter.form.uuid}
                tabIndex={-1}
                style={{
                  borderBottom: "0.5px solid lightgray",
                  ...formItemStyle
                }}
                onClick={$event => handleFormSelected(encounter.form.uuid)}
              >
                <button className="omrs-btn omrs-text-action">
                  {" "}
                  {encounter.form.name}{" "}
                </button>
                {/* <svg className="omrs-icon omrs-type-body-regular" fill="var(--omrs-color-ink-low-contrast)">
                  <use xlinkHref="#omrs-icon-chevron-right"></use>
                </svg> */}
                <br />
                <span
                  className="omrs-type-body-regular omrs-padding-left-24"
                  style={{
                    color: "var(--omrs-color-ink-medium-contrast)",
                    fontFamily: "Work Sans"
                  }}
                >
                  Completed on{" "}
                  {encounter.encounterDateTime.toLocaleDateString()}{" "}
                </span>
              </div>
            );
          })}
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
                <button className="omrs-btn omrs-text-action">
                  {" "}
                  {form.name}{" "}
                </button>
                {/* <svg className="omrs-icon" style={{height: "2rem", width: "2rem"}} fill="var(--omrs-color-ink-low-contrast)">
                  <use xlinkHref="#omrs-icon-chevron-right"></use>
                </svg> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

type FormsListProps = {
  // match: match;
  // location: any;
  props: any;
};
