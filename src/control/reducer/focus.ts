import { ActionType } from "@ngrx/store";
import { Actions, focusAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function focusReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== focusAction.type) {
    return state;
  }

  if (state.isFocused) {
    return state;
  }

  return {
    ...state,
    isFocused: true,
    isUnfocused: false,
  };
}
