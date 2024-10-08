import { Action, combineReducers, createAction, props } from "@ngrx/store";
import {
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
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
  simpleForm: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
  };
}

export const setSubmittedValueAction = createAction(
  "simpleForm/SET_SUBMITTED_VALUE",
  props<{
    submittedValue: FormValue;
  }>()
);

export const FORM_ID = "simpleForm";

export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
  firstName: "",
  lastName: "",
  email: "",
  sex: "",
  favoriteColor: "",
  employed: false,
  notes: "",
});

const reducers = combineReducers<State["simpleForm"], any>({
  formState(s = INITIAL_STATE, a: Action) {
    return formGroupReducer(s, a);
  },
  submittedValue(
    s: FormValue | undefined,
    a: ReturnType<typeof setSubmittedValueAction>
  ) {
    switch (a.type) {
      case setSubmittedValueAction.type:
        return a.submittedValue;

      default:
        return s;
    }
  },
});

export function reducer(s: State["simpleForm"], a: Action) {
  return reducers(s, a);
}
