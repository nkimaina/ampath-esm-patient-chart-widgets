import React from "react";
import { useConfig } from "@openmrs/esm-module-config";
import {
  PatientChartConfig,
  ExternalPatientChartConfig
} from "@openmrs/esm-patient-chart-widgets";

export default function useWidgetConfig<T extends ExternalPatientChartConfig>(
  key: string
): T {
  const config = (useConfig<PatientChartConfig>() as PatientChartConfig)
    .externalPatientChartConfigs[key] as T;
  return config;
}
