import { ActionType } from "@ngrx/store";
import { Actions, enableAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function enableReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== enableAction.type) {
    return state;
  }

  if (state.isEnabled) {
    return state;
  }

  return {
    ...state,
    isEnabled: true,
    isDisabled: false,
  };
}
