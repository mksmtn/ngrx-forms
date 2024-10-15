import { CustomErrorStateMatcherDirective } from "./error-state-matcher";
import { NgrxMatSelectViewAdapter } from "./mat-select-view-adapter";

export const materialFixes = [
  NgrxMatSelectViewAdapter,
  CustomErrorStateMatcherDirective,
] as const;
