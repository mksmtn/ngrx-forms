import { ActionType } from "@ngrx/store";
import { Actions, enableAction } from "../../actions";
import { computeArrayState, FormArrayState } from "../../state";
import { childReducer, dispatchActionPerChild } from "./util";

export function enableReducer<TValue>(
  state: FormArrayState<TValue>,
  action: ActionType<Actions>
): FormArrayState<TValue> {
  if (action.type !== enableAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, (controlId) =>
    enableAction({ controlId })
  );

  if (controls === state.controls && state.isEnabled) {
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
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: true,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    }
  );
}
