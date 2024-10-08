import { Action, combineReducers, createAction, props } from "@ngrx/store";
import {
  createFormGroupState,
  createFormStateReducerWithUpdate,
  FormGroupState,
  updateGroup,
  validate,
} from "ngrx-forms";
import { greaterThan, required } from "ngrx-forms/validation";

import { State as RootState } from "../app.reducer";

export interface FormValue {
  searchTerm: string;
  numberOfResultsToShow: number;
}

export interface State extends RootState {
  asyncValidation: {
    formState: FormGroupState<FormValue>;
    searchResults: string[];
  };
}

export const setSearchResultAction = createAction(
  "asyncValidation/SET_SEARCH_RESULT",
  props<{ results: string[] }>()
);

export const FORM_ID = "asyncValidation";

export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
  searchTerm: "",
  numberOfResultsToShow: 5,
});

const formGroupReducerWithUpdate = createFormStateReducerWithUpdate<FormValue>(
  updateGroup<FormValue>({
    searchTerm: validate(required),
    numberOfResultsToShow: validate(required, greaterThan(0)),
  })
);

const reducers = combineReducers<State["asyncValidation"]>({
  formState(s = INITIAL_STATE, a: Action) {
    return formGroupReducerWithUpdate(s, a);
  },
  searchResults(s: string[] = [], a: Action) {
    if (a.type === setSearchResultAction.type) {
      return (a as ReturnType<typeof setSearchResultAction>).results;
    }

    return s;
  },
});

export function reducer(s: State["asyncValidation"], a: Action) {
  return reducers(s, a);
}
