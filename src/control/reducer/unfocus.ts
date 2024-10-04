import { ActionType } from "@ngrx/store";
import { Actions, unfocusAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function unfocusReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== unfocusAction.type) {
    return state;
  }

  if (state.isUnfocused) {
    return state;
  }

  return {
    ...state,
    isFocused: false,
    isUnfocused: true,
  };
}
