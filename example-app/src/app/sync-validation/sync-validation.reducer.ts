import { Action, combineReducers, createAction, props } from "@ngrx/store";
import {
  createFormGroupState,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  updateGroup,
  validate,
  ValidationErrors,
} from "ngrx-forms";
import { minLength, required, requiredTrue } from "ngrx-forms/validation";

import { State as RootState } from "../app.reducer";

export interface PasswordValue {
  password: string;
  confirmPassword: string;
}

export interface FormValue {
  userName: string;
  createAccount: boolean;
  password: PasswordValue;
  dayOfBirth: number;
  monthOfBirth: string;
  yearOfBirth: number;
  agreeToTermsOfUse: boolean;
}

export interface State extends RootState {
  syncValidation: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
  };
}

export const setSubmittedValueAction = createAction(
  "syncValidation/SET_SUBMITTED_VALUE",
  props<{ submittedValue: FormValue }>()
);

export const FORM_ID = "syncValidation";

export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
  userName: "",
  createAccount: true,
  password: {
    password: "",
    confirmPassword: "",
  },
  dayOfBirth: 1,
  monthOfBirth: "January",
  yearOfBirth: 1970,
  agreeToTermsOfUse: false,
});

// @ts-ignore
declare module "ngrx-forms" {
  interface ValidationErrors {
    passwordMatch?: PasswordValue;
  }
}

function validatePasswordsMatch(value: PasswordValue): ValidationErrors {
  if (value.password === value.confirmPassword) {
    return {};
  }

  return {
    passwordMatch: value,
  };
}

export const validateAndUpdateForm = updateGroup<FormValue>({
  userName: validate(required),
  password: (state, parentState) => {
    if (!parentState.value.createAccount) {
      return disable(state);
    }

    state = enable(state);
    state = validate(state, validatePasswordsMatch);
    return updateGroup<PasswordValue>(state, {
      password: validate(required, minLength(8)),
    });
  },
  agreeToTermsOfUse: validate(requiredTrue),
});

const reducers = combineReducers<State["syncValidation"], any>({
  formState(s = INITIAL_STATE, a: Action) {
    return validateAndUpdateForm(formGroupReducer(s, a));
  },
  submittedValue(
    s: FormValue | undefined,
    a: ReturnType<typeof setSubmittedValueAction>
  ) {
    // todo: rewrite
    switch (a.type) {
      case setSubmittedValueAction.type:
        return a.submittedValue;

      default:
        return s;
    }
  },
});

export function reducer(s: State["syncValidation"], a: Action) {
  return reducers(s, a);
}
