import { Action, combineReducers, createAction, props } from "@ngrx/store";
import {
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
  setValue,
  updateGroup,
} from "ngrx-forms";

export const getManufacturersAction = createAction(
  "localStateAdvanced/GET_MANUFACTURERS",
  props<{ countryCode: string }>()
);

export const setManufacturersAction = createAction(
  "localStateAdvanced/SET_MANUFACTURERS",
  props<{ manufacturers: string[] }>()
);

export interface FormValue {
  countryCode: string;
  manufacturer: string;
}

export interface LocalState {
  manufacturers: string[];
  formState: FormGroupState<FormValue>;
}

export const FORM_ID = "localStateForm";

export const INITIAL_FORM_STATE = createFormGroupState<FormValue>(FORM_ID, {
  countryCode: "",
  manufacturer: "",
});

export const INITIAL_LOCAL_STATE: LocalState = {
  manufacturers: [],
  formState: INITIAL_FORM_STATE,
};

const reducers = combineReducers<LocalState>({
  manufacturers(manufacturers = [], a: Action) {
    // update from loaded data
    if (a.type === setManufacturersAction.type) {
      return (a as ReturnType<typeof setManufacturersAction>).manufacturers;
    }
    return manufacturers;
  },
  formState(fs = INITIAL_FORM_STATE, a: Action) {
    return formGroupReducer(fs, a);
  },
});

export function reducer(
  oldState: LocalState = INITIAL_LOCAL_STATE,
  action: Action
) {
  // each reducer takes care of its individual state
  let state = reducers(oldState, action);

  if (state === oldState) {
    return state;
  }

  // one overarching reducer handles inter-dependencies
  const formState = updateGroup<FormValue>({
    manufacturer: (manufacturer) => {
      if (!state.manufacturers.includes(manufacturer.value)) {
        return setValue("")(manufacturer);
      }
      return manufacturer;
    },
  })(state.formState);

  if (formState !== state.formState) {
    state = { ...state, formState };
  }

  return state;
}
