import { ActionType } from "@ngrx/store";
import { Actions, markAsUnsubmittedAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function markAsUnsubmittedReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== markAsUnsubmittedAction.type) {
    return state;
  }

  if (state.isUnsubmitted) {
    return state;
  }

  return {
    ...state,
    isSubmitted: false,
    isUnsubmitted: true,
  };
}
