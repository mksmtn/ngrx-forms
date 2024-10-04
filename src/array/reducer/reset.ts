import { ActionType } from "@ngrx/store";
import { Actions, resetAction } from "../../actions";
import { computeArrayState, FormArrayState } from "../../state";
import { childReducer, dispatchActionPerChild } from "./util";

export function resetReducer<TValue>(
  state: FormArrayState<TValue>,
  action: ActionType<Actions>
): FormArrayState<TValue> {
  if (action.type !== resetAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, (controlId) =>
      resetAction({ controlId })
    ),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: false,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: false,
      wasOrShouldBeSubmitted: false,
    }
  );
}
