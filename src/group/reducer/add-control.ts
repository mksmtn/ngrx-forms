import { ActionType } from "@ngrx/store";
import { Actions, addGroupControlAction } from "../../actions";
import {
  computeGroupState,
  createChildState,
  FormGroupState,
  KeyValue,
} from "../../state";
import { childReducer } from "./util";

export function addControlReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
): FormGroupState<TValue> {
  if (action.type !== addGroupControlAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.controls.hasOwnProperty(action.name)) {
    throw new Error(
      `Group '${state.id}' already has child control '${
        action.name as string
      }'!`
    );
  }

  const controls = Object.assign({}, state.controls, {
    [action.name]: createChildState(
      `${state.id}.${action.name as string}`,
      action.value
    ),
  });

  return computeGroupState(
    state.id,
    controls,
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: true,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    }
  );
}
