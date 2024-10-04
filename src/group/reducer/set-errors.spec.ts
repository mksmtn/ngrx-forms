import { setErrorsAction } from "../../actions";
import { createFormGroupState } from "../../state";
import { setErrorsReducer } from "./set-errors";
import {
  FORM_CONTROL_ID,
  FORM_CONTROL_INNER3_ID,
  FORM_CONTROL_INNER4_ID,
  FORM_CONTROL_INNER5_0_ID,
  FORM_CONTROL_INNER5_ID,
  FORM_CONTROL_INNER_ID,
  INITIAL_STATE,
  INITIAL_STATE_FULL,
} from "./test-util";

describe(`form group ${setErrorsReducer.name}`, () => {
  it("should update state if there are errors", () => {
    const errors = { required: { actual: undefined } };
    const resultState = setErrorsReducer(
      INITIAL_STATE,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors })
    );
    expect(resultState.errors).toEqual(errors);
    expect(resultState.isValid).toBe(false);
    expect(resultState.isInvalid).toBe(true);
  });

  it("should update state if there are no errors", () => {
    const errors = { required: { actual: undefined } };
    const state = { ...INITIAL_STATE, isValid: false, isInvalid: true, errors };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors: {} })
    );
    expect(resultState.errors).toEqual({});
    expect(resultState.isValid).toBe(true);
    expect(resultState.isInvalid).toBe(false);
  });

  it("should not update state if errors are same", () => {
    const state = {
      ...INITIAL_STATE,
      isValid: false,
      isInvalid: true,
      errors: { required: { actual: undefined } },
    };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors: state.errors })
    );
    expect(resultState).toBe(state);
  });

  it("should not update state if errors are equal", () => {
    const state = {
      ...INITIAL_STATE,
      isValid: false,
      isInvalid: true,
      errors: { required: { actual: undefined } },
    };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({
        controlId: FORM_CONTROL_ID,
        errors: { required: { actual: undefined } },
      })
    );
    expect(resultState).toBe(state);
  });

  it("should not update state if control is disabled", () => {
    const errors = { required: { actual: undefined } };
    const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors })
    );
    expect(resultState).toBe(state);
  });

  it("should not update state if errors are equal and empty", () => {
    const resultState = setErrorsReducer(
      INITIAL_STATE,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors: {} })
    );
    expect(resultState).toBe(INITIAL_STATE);
  });

  it("should update state if group is empty", () => {
    const errors = { required: { actual: undefined } };
    const state = createFormGroupState("test ID", {});
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors })
    );
    expect(resultState.errors).toEqual(errors);
    expect(resultState.isValid).toBe(false);
    expect(resultState.isInvalid).toBe(true);
  });

  it("should keep async errors", () => {
    const syncErrors = { required: { actual: undefined } };
    const asyncErrors = { $required: true };
    const state = {
      ...INITIAL_STATE,
      isValid: false,
      isInvalid: true,
      errors: asyncErrors,
    };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors: syncErrors })
    );
    expect(resultState.errors).toEqual({ ...asyncErrors, ...syncErrors });
  });

  it("should throw if trying to set invalid error value", () => {
    expect(() =>
      setErrorsReducer(
        INITIAL_STATE,
        setErrorsAction({ controlId: FORM_CONTROL_ID, errors: null as any })
      )
    ).toThrowError();
    expect(() =>
      setErrorsReducer(
        INITIAL_STATE,
        setErrorsAction({ controlId: FORM_CONTROL_ID, errors: 1 as any })
      )
    ).toThrowError();
    expect(() =>
      setErrorsReducer(
        INITIAL_STATE,
        setErrorsAction({ controlId: FORM_CONTROL_ID, errors: [] as any })
      )
    ).toThrowError();
    expect(() =>
      setErrorsReducer(
        INITIAL_STATE,
        setErrorsAction({
          controlId: FORM_CONTROL_ID,
          errors: { $required: true },
        })
      )
    ).toThrowError();
    expect(() =>
      setErrorsReducer(
        INITIAL_STATE,
        setErrorsAction({
          controlId: FORM_CONTROL_ID,
          errors: { _inner: true },
        })
      )
    ).toThrowError();
  });

  it("should aggregate child errors", () => {
    const errors = { required: { actual: undefined } };
    const resultState = setErrorsReducer(
      INITIAL_STATE,
      setErrorsAction({ controlId: FORM_CONTROL_INNER_ID, errors })
    );
    expect(resultState.errors).toEqual({ _inner: errors });
    expect(resultState.isValid).toEqual(false);
    expect(resultState.isInvalid).toEqual(true);
  });

  it("should aggregate child errors for group children", () => {
    const errors = { required: { actual: undefined } };
    const resultState = setErrorsReducer(
      INITIAL_STATE_FULL,
      setErrorsAction({ controlId: FORM_CONTROL_INNER3_ID, errors })
    );
    expect(resultState.errors).toEqual({ _inner3: errors });
    expect(resultState.isValid).toEqual(false);
    expect(resultState.isInvalid).toEqual(true);
  });

  it("should aggregate child errors for array children", () => {
    const errors = { required: { actual: undefined } };
    const resultState = setErrorsReducer(
      INITIAL_STATE_FULL,
      setErrorsAction({ controlId: FORM_CONTROL_INNER5_ID, errors })
    );
    expect(resultState.errors).toEqual({ _inner5: errors });
    expect(resultState.isValid).toEqual(false);
    expect(resultState.isInvalid).toEqual(true);
  });

  it("should aggregate nested child errors for group", () => {
    const errors = { required: { actual: undefined } };
    const resultState = setErrorsReducer(
      INITIAL_STATE_FULL,
      setErrorsAction({ controlId: FORM_CONTROL_INNER4_ID, errors })
    );
    expect(resultState.errors).toEqual({ _inner3: { _inner4: errors } });
    expect(resultState.isValid).toEqual(false);
    expect(resultState.isInvalid).toEqual(true);
  });

  it("should aggregate nested child errors for array", () => {
    const errors = { required: { actual: undefined } };
    const resultState = setErrorsReducer(
      INITIAL_STATE_FULL,
      setErrorsAction({ controlId: FORM_CONTROL_INNER5_0_ID, errors })
    );
    expect(resultState.errors).toEqual({ _inner5: { _0: errors } });
    expect(resultState.isValid).toEqual(false);
    expect(resultState.isInvalid).toEqual(true);
  });

  it("should aggregate multiple child errors", () => {
    const errors1 = { required: { actual: undefined } };
    const errors2 = { min: 0 };
    let resultState = setErrorsReducer(
      INITIAL_STATE_FULL,
      setErrorsAction({ controlId: FORM_CONTROL_INNER_ID, errors: errors1 })
    );
    resultState = setErrorsReducer(
      resultState,
      setErrorsAction({ controlId: FORM_CONTROL_INNER3_ID, errors: errors2 })
    );
    expect(resultState.errors).toEqual({ _inner: errors1, _inner3: errors2 });
    expect(resultState.isValid).toEqual(false);
    expect(resultState.isInvalid).toEqual(true);
  });

  it("should track child errors and own errors when own errors are changed", () => {
    const errors1 = { required: { actual: undefined } };
    const errors2 = { min: 0 };
    const state = {
      ...INITIAL_STATE,
      errors: {
        _inner: errors2,
      },
      isValid: false,
      isInvalid: true,
      controls: {
        inner: {
          ...INITIAL_STATE.controls.inner,
          isValid: false,
          isInvalid: true,
          errors: errors2,
        },
      },
    };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_ID, errors: errors1 })
    );
    expect(resultState.errors).toEqual({ ...errors1, _inner: errors2 });
  });

  it("should track own errors and child errors when child errors are changed", () => {
    const errors1 = { required: { actual: undefined } };
    const state = {
      ...INITIAL_STATE,
      isValid: false,
      isInvalid: true,
      errors: errors1,
    };
    const errors2 = { min: 0 };
    const resultState = setErrorsReducer(
      state,
      setErrorsAction({ controlId: FORM_CONTROL_INNER_ID, errors: errors2 })
    );
    expect(resultState.errors).toEqual({ ...errors1, _inner: errors2 });
  });
});
