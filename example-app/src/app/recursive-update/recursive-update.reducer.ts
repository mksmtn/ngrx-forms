import { Action, createAction, createReducer, on } from "@ngrx/store";
import {
  createFormGroupState,
  disable,
  enable,
  FormGroupState,
  onNgrxForms,
  setUserDefinedProperty,
  updateGroup,
  updateRecursive,
} from "ngrx-forms";

import { State as RootState } from "../app.reducer";

export interface FormValue {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  favoriteColor: string;
  employed: boolean;
  notes: string;
}

export interface State extends RootState {
  recursiveUpdate: {
    formState: FormGroupState<FormValue>;
  };
}

export const blockUIAction = createAction("recursiveUpdate/BLOCK_UI");

export const unblockUIAction = createAction("dynamic/UNBLOCK_UI");

export const FORM_ID = "recursiveUpdate";

export const INITIAL_STATE = updateGroup<FormValue>(
  createFormGroupState<FormValue>(FORM_ID, {
    firstName: "",
    lastName: "",
    email: "",
    sex: "",
    favoriteColor: "",
    employed: false,
    notes: "",
  }),
  {
    employed: disable,
    notes: disable,
    sex: disable,
  }
);

const reducers = createReducer<State["recursiveUpdate"]>(
  { formState: INITIAL_STATE },
  onNgrxForms(),
  on(blockUIAction, (state) => {
    const updatedFormState = updateRecursive(state.formState, (s) =>
      setUserDefinedProperty(s, "wasDisabled", s.isDisabled)
    );
    return { ...state, formState: disable(updatedFormState) };
  }),
  on(unblockUIAction, (state) => {
    const enabledFormState = enable(state.formState);
    return {
      ...state,
      formState: updateRecursive(enabledFormState, (s) =>
        s.userDefinedProperties.wasDisabled ? disable(s) : s
      ),
    };
  })
);

export function reducer(s: State["recursiveUpdate"], a: Action) {
  return reducers(s, a);
}
