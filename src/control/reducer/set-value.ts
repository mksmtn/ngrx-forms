import { ActionType } from "@ngrx/store";
import { Actions, setValueAction } from "../../actions";
import {
  FormControlState,
  FormControlValueTypes,
  verifyFormControlValueIsValid,
} from "../../state";

export function setValueReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== setValueAction.type) {
    return state;
  }

  if (state.value === action.value) {
    return state;
  }

  return {
    ...state,
    // todo: better typing?
    value: verifyFormControlValueIsValid<TValue>(action.value as TValue),
  };
}
