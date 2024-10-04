import { ActionType } from "@ngrx/store";
import { Actions, setValueAction } from "../../actions";
import { formStateReducer } from "../../reducer";
import {
  AbstractControlState,
  computeGroupState,
  createChildState,
  FormGroupControls,
  FormGroupState,
  KeyValue,
} from "../../state";
import { childReducer } from "./util";

export function setValueReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: ActionType<Actions>
): FormGroupState<TValue> {
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
  const value = action.value as TValue;

  const controls = Object.keys(value).reduce((c, key) => {
    const control = state.controls[key] as
      | AbstractControlState<unknown>
      | undefined;

    // tslint:disable-next-line:prefer-conditional-expression
    if (!control) {
      Object.assign(c, {
        [key]: createChildState<TValue[string]>(
          `${state.id}.${key}`,
          value[key]
        ),
      });
    } else {
      Object.assign(c, {
        [key]: formStateReducer(
          control,
          setValueAction({
            controlId: control.id,
            value: value[key],
          })
        ),
      });
    }
    return c;
  }, {} as FormGroupControls<TValue>);

  return computeGroupState(
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
