import { ActionType } from "@ngrx/store";
import { Actions, markAsDirtyAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function markAsDirtyReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== markAsDirtyAction.type) {
    return state;
  }

  if (state.isDirty) {
    return state;
  }

  return {
    ...state,
    isDirty: true,
    isPristine: false,
  };
}
