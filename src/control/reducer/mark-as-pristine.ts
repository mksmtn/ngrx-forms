import { ActionType } from "@ngrx/store";
import { Actions, markAsPristineAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function markAsPristineReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== markAsPristineAction.type) {
    return state;
  }

  if (state.isPristine) {
    return state;
  }

  return {
    ...state,
    isDirty: false,
    isPristine: true,
  };
}
