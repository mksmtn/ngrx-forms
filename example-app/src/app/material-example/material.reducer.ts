import {
  Action,
  combineReducers,
  createAction,
  createReducer,
  on,
  props,
} from "@ngrx/store";
import {
  box,
  Boxed,
  createFormGroupState,
  createFormStateReducerWithUpdate,
  disable,
  enable,
  FormGroupState,
  updateGroup,
  validate,
  equalTo,
  minLength,
  required,
  requiredTrue,
} from "ngrx-forms";

import { State as RootState } from "../app.reducer";

export interface PasswordValue {
  password: string;
  confirmPassword: string;
}

export interface FormValue {
  userName: string;
  createAccount: boolean;
  password: PasswordValue;
  sex: string;
  favoriteColor: string;
  hobbies: Boxed<string[]>;
  dateOfBirth: string;
  agreeToTermsOfUse: boolean;
}

export interface State extends RootState {
  material: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
  };
}

export const setSubmittedValueAction = createAction(
  "material/SET_SUBMITTED_VALUE",
  props<{
    submittedValue: FormValue;
  }>()
);

export const FORM_ID = "material";

export const INITIAL_FORM_STATE = createFormGroupState<FormValue>(FORM_ID, {
  userName: "",
  createAccount: true,
  password: {
    password: "",
    confirmPassword: "",
  },
  sex: "",
  favoriteColor: "",
  hobbies: box([]),
  dateOfBirth: new Date(Date.UTC(1970, 0, 1)).toISOString(),
  agreeToTermsOfUse: false,
});

export const INITIAL_STATE: State["material"] = {
  formState: INITIAL_FORM_STATE,
  submittedValue: undefined,
};

const validationFormGroupReducer = createFormStateReducerWithUpdate<FormValue>(
  updateGroup<FormValue>({
    userName: validate(required),
    password: (state, parentState) => {
      if (!parentState.value.createAccount) {
        return disable(state);
      }

      state = enable(state);
      return updateGroup<PasswordValue>(state, {
        password: validate(required, minLength(8)),
        confirmPassword: validate(equalTo(state.value.password)),
      });
    },
    agreeToTermsOfUse: validate(requiredTrue),
  })
);

const reducers = combineReducers<State["material"], any>({
  formState(s = INITIAL_STATE.formState, a: Action) {
    return validationFormGroupReducer(s, a);
  },
  submittedValue: createReducer(
    INITIAL_STATE.submittedValue,
    on(setSubmittedValueAction, (_state, action) => {
      return action.submittedValue;
    })
  ),
});

export function reducer(s: State["material"], a: Action) {
  return reducers(s, a);
}
