import { ActionType } from "@ngrx/store";
import { Actions, disableAction } from "../../actions";
import { computeGroupState, FormGroupState, KeyValue } from "../../state";
import { childReducer, dispatchActionPerChild } from "./util";

export function disableReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
): FormGroupState<TValue> {
  if (action.type !== disableAction.type) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isDisabled) {
    return state;
  }

  return computeGroupState(
    state.id,
    dispatchActionPerChild(state.controls, (controlId) =>
      disableAction({ controlId })
    ),
    state.value,
    {},
    [],
    state.userDefinedProperties,
    {
      wasOrShouldBeDirty: state.isDirty,
      wasOrShouldBeEnabled: false,
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    }
  );
}
