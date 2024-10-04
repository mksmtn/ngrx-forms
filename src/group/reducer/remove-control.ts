import { ActionType } from "@ngrx/store";
import { Actions, removeGroupControlAction } from "../../actions";
import { computeGroupState, FormGroupState, KeyValue } from "../../state";
import { childReducer } from "./util";

export function removeControlReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
): FormGroupState<TValue> {
  if (action.type !== removeGroupControlAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (!state.controls.hasOwnProperty(action.name)) {
    throw new Error(
      `Group '${state.id}' does not have child control '${
        action.name as string
      }'!`
    );
  }

  const { [action.name]: _, ...controls } = state.controls;

  return computeGroupState(
    state.id,
    // todo: better typing?
    controls as FormGroupState<TValue>["controls"],
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
