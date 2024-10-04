import { ActionType } from "@ngrx/store";
import { Actions, markAsUntouchedAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function markAsUntouchedReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== markAsUntouchedAction.type) {
    return state;
  }

  if (state.isUntouched) {
    return state;
  }

  return {
    ...state,
    isTouched: false,
    isUntouched: true,
  };
}
