import type { JobReadinessAnalysis } from "../shared/analysisSchemas";
import type { DemoScenario } from "./demoScenarios";
import {
  emptyProfileForm,
  formValuesFromRequest,
  type ProfileFormValues,
} from "./form/profileForm";

export interface FrontendContentState {
  formValues: ProfileFormValues;
  activeDemo: number | null;
  analysis: JobReadinessAnalysis | null;
  isDemoResult: boolean;
}

export function selectDemoContent(
  scenarios: DemoScenario[],
  index: number,
  showResult: boolean,
): FrontendContentState {
  const scenario = scenarios[index];

  return {
    formValues: formValuesFromRequest(scenario.request),
    activeDemo: index,
    analysis: showResult ? scenario.analysis : null,
    isDemoResult: showResult,
  };
}

export function resetFrontendContent(): FrontendContentState {
  return {
    formValues: emptyProfileForm,
    activeDemo: null,
    analysis: null,
    isDemoResult: false,
  };
}
