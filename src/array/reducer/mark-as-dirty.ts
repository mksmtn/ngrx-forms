import { ActionType } from "@ngrx/store";
import { Actions, markAsDirtyAction } from "../../actions";
import { computeArrayState, FormArrayState } from "../../state";
import { childReducer, dispatchActionPerChild } from "./util";

export function markAsDirtyReducer<TValue>(
  state: FormArrayState<TValue>,
  action: ActionType<Actions>
): FormArrayState<TValue> {
  if (action.type !== markAsDirtyAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, (controlId) =>
    markAsDirtyAction({ controlId })
  );

  if (controls === state.controls && state.isDirty) {
    return state;
  }

  return computeArrayState(
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
