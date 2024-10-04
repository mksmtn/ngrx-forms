import { ActionType } from "@ngrx/store";
import { Actions, markAsTouchedAction } from "../../actions";
import { computeGroupState, FormGroupState, KeyValue } from "../../state";
import { childReducer, dispatchActionPerChild } from "./util";

export function markAsTouchedReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
): FormGroupState<TValue> {
  if (action.type !== markAsTouchedAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, (controlId) =>
    markAsTouchedAction({ controlId })
  );

  if (controls === state.controls) {
    return state;
  }

  return computeGroupState(
    state.id,
    controls,
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: state.isEnabled,
      wasOrShouldBeTouched: true,
      wasOrShouldBeSubmitted: state.isSubmitted,
    }
  );
}
