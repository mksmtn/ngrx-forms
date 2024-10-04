import { ActionType } from "@ngrx/store";
import { Actions, markAsTouchedAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function markAsTouchedReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== markAsTouchedAction.type) {
    return state;
  }

  if (state.isTouched) {
    return state;
  }

  return {
    ...state,
    isTouched: true,
    isUntouched: false,
  };
}
