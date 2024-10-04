import { ActionType } from "@ngrx/store";
import { Actions, setUserDefinedPropertyAction } from "../../actions";
import { FormArrayState } from "../../state";
import { childReducer } from "./util";

export function setUserDefinedPropertyReducer<TValue>(
  state: FormArrayState<TValue>,
  action: ActionType<Actions>
): FormArrayState<TValue> {
  if (action.type !== setUserDefinedPropertyAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
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
