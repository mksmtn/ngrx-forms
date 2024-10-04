import { ActionType } from "@ngrx/store";
import { Actions, resetAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function resetReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== resetAction.type) {
    return state;
  }

  if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
    return state;
  }

  return {
    ...state,
    isDirty: false,
    isPristine: true,
    isTouched: false,
    isUntouched: true,
    isSubmitted: false,
    isUnsubmitted: true,
  };
}
