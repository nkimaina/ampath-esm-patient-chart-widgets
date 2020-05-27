import React from "react";
import { useConfig } from "@openmrs/esm-module-config";
import {
  PatientChartConfig,
  ChartWidgetConfig
} from "@openmrs/esm-patient-chart-widgets";

export default function useWidgetConfig<T extends ChartWidgetConfig>(
  key: string
): T {
  const config = (useConfig<PatientChartConfig>() as PatientChartConfig)
    .widgetsConfigs[key] as T;
  return config;
}
