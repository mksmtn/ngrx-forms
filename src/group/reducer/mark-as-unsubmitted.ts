import { ActionType } from "@ngrx/store";
import { Actions, markAsUnsubmittedAction } from "../../actions";
import { computeGroupState, FormGroupState, KeyValue } from "../../state";
import { childReducer, dispatchActionPerChild } from "./util";

export function markAsUnsubmittedReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
): FormGroupState<TValue> {
  if (action.type !== markAsUnsubmittedAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isUnsubmitted) {
    return state;
  }

  return computeGroupState(
    state.id,
    dispatchActionPerChild(state.controls, (controlId) =>
      markAsUnsubmittedAction({ controlId })
    ),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: false,
    }
  );
}
