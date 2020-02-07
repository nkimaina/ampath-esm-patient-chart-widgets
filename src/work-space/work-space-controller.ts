export function addComponentToWorkSpace(opts: worksSpaceProps): Promise<any> {
  return System.import("@openmrs/esm-patient-chart").then(mod => {
    const newWorkspaceItem = mod.newWorkspaceItem;
    return newWorkspaceItem(opts);
  });
}

export type worksSpaceProps = {
  component: any;
  name: string;
  props: any;
  inProgress: boolean;
};
