import { Action, createAction, props } from "@ngrx/store";
import { KeyValue, NgrxFormControlId, ValidationErrors } from "./state";

export const setValueAction = createAction(
  "ngrx/forms/SET_VALUE",
  props<{
    controlId: NgrxFormControlId;
    // TODO: can be better typed?
    value: unknown;
  }>()
);

export const setErrorsAction = createAction(
  "ngrx/forms/SET_ERRORS",
  props<{
    controlId: NgrxFormControlId;
    errors: ValidationErrors;
  }>()
);

export const setAsyncErrorAction = createAction(
  "ngrx/forms/SET_ASYNC_ERROR",
  props<{
    controlId: NgrxFormControlId;
    name: string;
    value: unknown;
  }>()
);

export const clearAsyncErrorAction = createAction(
  "ngrx/forms/CLEAR_ASYNC_ERROR",
  props<{
    controlId: NgrxFormControlId;
    name: string;
  }>()
);

export const startAsyncValidationAction = createAction(
  "ngrx/forms/START_ASYNC_VALIDATION",
  props<{
    controlId: NgrxFormControlId;
    name: string;
  }>()
);

export const markAsDirtyAction = createAction(
  "ngrx/forms/MARK_AS_DIRTY",
  props<{
    controlId: NgrxFormControlId;
  }>()
);

export const markAsPristineAction = createAction(
  "ngrx/forms/MARK_AS_PRISTINE",
  props<{
    controlId: NgrxFormControlId;
  }>()
);

export const enableAction = createAction(
  "ngrx/forms/ENABLE",
  props<{
    controlId: NgrxFormControlId;
  }>()
);

export const disableAction = createAction(
  "ngrx/forms/DISABLE",
  props<{
    controlId: NgrxFormControlId;
  }>()
);

export const markAsTouchedAction = createAction(
  "ngrx/forms/MARK_AS_TOUCHED",
  props<{ controlId: NgrxFormControlId }>()
);

export const markAsUntouchedAction = createAction(
  "ngrx/forms/MARK_AS_UNTOUCHED",
  props<{ controlId: NgrxFormControlId }>()
);

export const focusAction = createAction(
  "ngrx/forms/FOCUS",
  props<{ controlId: NgrxFormControlId }>()
);

export const unfocusAction = createAction(
  "ngrx/forms/UNFOCUS",
  props<{ controlId: NgrxFormControlId }>()
);

export const markAsSubmittedAction = createAction(
  "ngrx/forms/MARK_AS_SUBMITTED",
  props<{ controlId: NgrxFormControlId }>()
);

export const markAsUnsubmittedAction = createAction(
  "ngrx/forms/MARK_AS_UNSUBMITTED",
  props<{ controlId: NgrxFormControlId }>()
);

export const addArrayControlAction = createAction(
  "ngrx/forms/ADD_ARRAY_CONTROL",
  props<{
    controlId: NgrxFormControlId;
    // todo: better typing?
    value: unknown;
    index?: number;
  }>()
);

export const addGroupControlAction = createAction(
  "ngrx/forms/ADD_GROUP_CONTROL",
  props<{
    controlId: NgrxFormControlId;
    name: keyof KeyValue;
    // todo: better typing?
    value: unknown;
  }>()
);

export const removeArrayControlAction = createAction(
  "ngrx/forms/REMOVE_ARRAY_CONTROL",
  props<{
    controlId: NgrxFormControlId;
    index: number;
  }>()
);

export const swapArrayControlAction = createAction(
  "ngrx/forms/SWAP_ARRAY_CONTROL",
  props<{
    controlId: NgrxFormControlId;
    fromIndex: number;
    toIndex: number;
  }>()
);

export const moveArrayControlAction = createAction(
  "ngrx/forms/MOVE_ARRAY_CONTROL",
  props<{
    controlId: NgrxFormControlId;
    fromIndex: number;
    toIndex: number;
  }>()
);

export const removeGroupControlAction = createAction(
  "ngrx/forms/REMOVE_CONTROL",
  props<{
    controlId: NgrxFormControlId;
    // todo: better typing?
    name: keyof KeyValue;
  }>()
);

export const setUserDefinedPropertyAction = createAction(
  "ngrx/forms/SET_USER_DEFINED_PROPERTY",
  props<{
    controlId: NgrxFormControlId;
    name: string;
    value: unknown;
  }>()
);

export const resetAction = createAction(
  "ngrx/forms/RESET",
  props<{
    controlId: NgrxFormControlId;
  }>()
);

// todo: better typing?
export type Actions =
  | typeof setValueAction
  | typeof setErrorsAction
  | typeof setAsyncErrorAction
  | typeof clearAsyncErrorAction
  | typeof startAsyncValidationAction
  | typeof markAsDirtyAction
  | typeof markAsPristineAction
  | typeof enableAction
  | typeof disableAction
  | typeof markAsTouchedAction
  | typeof markAsUntouchedAction
  | typeof focusAction
  | typeof unfocusAction
  | typeof markAsSubmittedAction
  | typeof markAsUnsubmittedAction
  | typeof addGroupControlAction
  | typeof removeGroupControlAction
  | typeof addArrayControlAction
  | typeof removeArrayControlAction
  | typeof setUserDefinedPropertyAction
  | typeof resetAction
  | typeof swapArrayControlAction
  | typeof moveArrayControlAction;

export function isNgrxFormsAction(action: Action) {
  return !!action.type && action.type.startsWith("ngrx/forms/");
}

export const ALL_NGRX_FORMS_ACTION_TYPES: Actions["type"][] = [
  setValueAction.type,
  setErrorsAction.type,
  setAsyncErrorAction.type,
  clearAsyncErrorAction.type,
  startAsyncValidationAction.type,
  markAsDirtyAction.type,
  markAsPristineAction.type,
  enableAction.type,
  disableAction.type,
  markAsTouchedAction.type,
  markAsUntouchedAction.type,
  focusAction.type,
  unfocusAction.type,
  markAsSubmittedAction.type,
  markAsUnsubmittedAction.type,
  addGroupControlAction.type,
  removeGroupControlAction.type,
  addArrayControlAction.type,
  removeArrayControlAction.type,
  setUserDefinedPropertyAction.type,
  resetAction.type,
  swapArrayControlAction.type,
  moveArrayControlAction.type,
];
