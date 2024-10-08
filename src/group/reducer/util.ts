import { ActionType } from "@ngrx/store";
import { Actions } from "../../actions";
import { formStateReducer } from "../../reducer";
import {
  AbstractControlState,
  computeGroupState,
  FormGroupControls,
  FormGroupState,
  FormState,
  KeyValue,
} from "../../state";

export function dispatchActionPerChild<TValue extends KeyValue>(
  controls: FormGroupControls<TValue>,
  actionCreator: (controlId: string) => ActionType<Actions>
) {
  let hasChanged = false;
  const newControls = Object.keys(controls).reduce((c, key) => {
    Object.assign(c, {
      [key]: formStateReducer(
        controls[key],
        actionCreator((controls[key] as AbstractControlState<unknown>).id)
      ),
    });
    hasChanged = hasChanged || c[key] !== controls[key];
    return c;
  }, {} as FormGroupControls<TValue>);
  return hasChanged ? newControls : controls;
}

function callChildReducers<TValue extends { [key: string]: any }>(
  controls: FormGroupControls<TValue>,
  action: ActionType<Actions>
): FormGroupControls<TValue> {
  let hasChanged = false;
  const newControls = Object.keys(controls)
    .map(
      (key) =>
        [key, formStateReducer(controls[key], action)] as [
          string,
          FormState<any>
        ]
    )
    .reduce((res, [key, state]) => {
      hasChanged = hasChanged || state !== controls[key];
      return Object.assign(res, { [key]: state });
    }, {} as FormGroupControls<TValue>);
  return hasChanged ? newControls : controls;
}

export function childReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
) {
  const controls = callChildReducers(state.controls, action);

  if (state.controls === controls) {
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
      wasOrShouldBeTouched: state.isTouched,
      wasOrShouldBeSubmitted: state.isSubmitted,
    }
  );
}
