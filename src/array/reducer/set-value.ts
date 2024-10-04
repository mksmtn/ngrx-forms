import { ActionType } from "@ngrx/store";
import { Actions, setValueAction } from "../../actions";
import { formStateReducer } from "../../reducer";
import {
  computeArrayState,
  createChildState,
  FormArrayState,
} from "../../state";
import { childReducer } from "./util";

export function setValueReducer<TValue>(
  state: FormArrayState<TValue>,
  action: ActionType<Actions>
): FormArrayState<TValue> {
  if (action.type !== setValueAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.value === action.value) {
    return state;
  }

  if (action.value instanceof Date) {
    throw new Error(
      "Date values are not supported. Please used serialized strings instead."
    );
  }

  // todo: better typing?
  const value = action.value as readonly TValue[];

  const controls = value.map((v, i) => {
    if (!state.controls[i]) {
      return createChildState(`${state.id}.${i}`, v);
    }

    return formStateReducer<TValue>(
      state.controls[i],
      setValueAction({ controlId: state.controls[i].id, value: v })
    );
  });

  return computeArrayState(
    state.id,
    controls,
    value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    }
  );
}
