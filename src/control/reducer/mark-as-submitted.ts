import { ActionType } from "@ngrx/store";
import { Actions, markAsSubmittedAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function markAsSubmittedReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== markAsSubmittedAction.type) {
    return state;
  }

  if (state.isSubmitted) {
    return state;
  }

  return {
    ...state,
    isSubmitted: true,
    isUnsubmitted: false,
  };
}
