import { ActionType } from "@ngrx/store";
import { Actions, setUserDefinedPropertyAction } from "../../actions";
import { FormControlState, FormControlValueTypes } from "../../state";

export function setUserDefinedPropertyReducer<
  TValue extends FormControlValueTypes
>(
  state: FormControlState<TValue>,
  action: ActionType<Actions>
): FormControlState<TValue> {
  if (action.type !== setUserDefinedPropertyAction.type) {
    return state;
  }

  if (state.userDefinedProperties[action.name] === action.value) {
    return state;
  }

  return {
    ...state,
    userDefinedProperties: {
      ...state.userDefinedProperties,
      [action.name]: action.value,
    },
  };
}
