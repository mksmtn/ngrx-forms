import { ActionType } from "@ngrx/store";
import { Actions, startAsyncValidationAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function startAsyncValidationReducer<
  TValue extends FormControlValueTypes
>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== startAsyncValidationAction.type) {
    return state;
  }

  if (state.pendingValidations.indexOf(action.name) >= 0) {
    return state;
  }

  return {
    ...state,
    pendingValidations: [...state.pendingValidations, action.name],
    isValidationPending: true,
  };
}
