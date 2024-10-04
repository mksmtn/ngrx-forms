import { ActionType } from "@ngrx/store";
import { Actions, disableAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function disableReducer<TValue extends FormControlValueTypes>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== disableAction.type) {
    return state;
  }

  if (state.isDisabled) {
    return state;
  }

  return {
    ...state,
    isEnabled: false,
    isDisabled: true,
    isValid: true,
    isInvalid: false,
    errors: {},
    pendingValidations: [],
    isValidationPending: false,
  };
}
