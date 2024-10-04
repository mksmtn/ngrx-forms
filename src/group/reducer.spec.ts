import {
  addArrayControlAction,
  addGroupControlAction,
  clearAsyncErrorAction,
  disableAction,
  enableAction,
  focusAction,
  markAsDirtyAction,
  markAsPristineAction,
  markAsSubmittedAction,
  markAsTouchedAction,
  markAsUnsubmittedAction,
  markAsUntouchedAction,
  moveArrayControlAction,
  removeArrayControlAction,
  removeGroupControlAction,
  resetAction,
  setAsyncErrorAction,
  setErrorsAction,
  setUserDefinedPropertyAction,
  setValueAction,
  startAsyncValidationAction,
  swapArrayControlAction,
  unfocusAction,
} from "../actions";
import { createFormGroupState } from "../state";
import { formGroupReducer } from "./reducer";

describe("form group reducer", () => {
  const FORM_CONTROL_ID = "test ID";
  const FORM_CONTROL_INNER_ID = `${FORM_CONTROL_ID}.inner`;
  const FORM_CONTROL_INNER5_ID = `${FORM_CONTROL_ID}.inner5`;
  interface FormGroupValue {
    inner: string;
    inner2?: string;
    inner3?: { inner4: string };
    inner5?: string[];
  }
  const INITIAL_FORM_CONTROL_VALUE: FormGroupValue = { inner: "" };
  const INITIAL_FORM_CONTROL_VALUE_FULL: FormGroupValue = {
    inner: "",
    inner2: "",
    inner3: { inner4: "" },
    inner5: [""],
  };
  const INITIAL_STATE = createFormGroupState(
    FORM_CONTROL_ID,
    INITIAL_FORM_CONTROL_VALUE
  );
  const INITIAL_STATE_FULL = createFormGroupState(
    FORM_CONTROL_ID,
    INITIAL_FORM_CONTROL_VALUE_FULL
  );

  it("should skip any non-ngrx-forms action", () => {
    const resultState = formGroupReducer(INITIAL_STATE, { type: "" } as any);
    expect(resultState).toBe(INITIAL_STATE);
  });

  it("should skip any action with non-equal control ID", () => {
    const resultState = formGroupReducer(
      INITIAL_STATE,
      setValueAction({ controlId: `A${FORM_CONTROL_ID}`, value: "A" }) as any
    );
    expect(resultState).toBe(INITIAL_STATE);
  });

  it(`should forward ${focusAction.name}s to children`, () => {
    const resultState = formGroupReducer(
      INITIAL_STATE,
      focusAction({ controlId: FORM_CONTROL_INNER_ID }) as any
    );
    expect(resultState.controls.inner.isFocused).toEqual(true);
    expect(resultState.controls.inner.isUnfocused).toEqual(false);
  });

  it(`should forward ${unfocusAction.name}s to children`, () => {
    const state = {
      ...INITIAL_STATE,
      controls: {
        inner: {
          ...INITIAL_STATE.controls.inner,
          isFocused: true,
          isUnfocused: false,
        },
      },
    };
    const resultState = formGroupReducer(
      state,
      unfocusAction({ controlId: FORM_CONTROL_INNER_ID }) as any
    );
    expect(resultState.controls.inner.isFocused).toEqual(false);
    expect(resultState.controls.inner.isUnfocused).toEqual(true);
  });

  it(`should forward add ${addArrayControlAction.name}s to children`, () => {
    const resultState = formGroupReducer<FormGroupValue>(
      INITIAL_STATE_FULL,
      addArrayControlAction({ controlId: FORM_CONTROL_INNER5_ID, value: "" })
    );
    expect(resultState.controls.inner5!.controls[1]).toBeDefined();
  });

  it(`should forward remove ${removeArrayControlAction.name}s to children`, () => {
    const resultState = formGroupReducer(
      INITIAL_STATE_FULL,
      removeArrayControlAction({ controlId: FORM_CONTROL_INNER5_ID, index: 0 })
    );
    expect(resultState.controls.inner5!.controls[0]).toBeUndefined();
  });

  it(`should forward add ${moveArrayControlAction.name}s to children`, () => {
    const value: FormGroupValue = {
      inner: "",
      inner2: "",
      inner3: { inner4: "" },
      inner5: ["a", "b", "c"],
    };
    const state = createFormGroupState(FORM_CONTROL_ID, value);
    const resultState = formGroupReducer<FormGroupValue>(
      state,
      moveArrayControlAction({
        controlId: FORM_CONTROL_INNER5_ID,
        fromIndex: 0,
        toIndex: 1,
      })
    );
    expect(resultState.controls.inner5!.controls[0].value).toBe("b");
    expect(resultState.controls.inner5!.controls[1].value).toBe("a");
  });

  it(`should forward remove ${swapArrayControlAction.name}s to children`, () => {
    const value: FormGroupValue = {
      inner: "",
      inner2: "",
      inner3: { inner4: "" },
      inner5: ["a", "b", "c"],
    };
    const state = createFormGroupState(FORM_CONTROL_ID, value);
    const resultState = formGroupReducer(
      state,
      swapArrayControlAction({
        controlId: FORM_CONTROL_INNER5_ID,
        fromIndex: 0,
        toIndex: 1,
      })
    );
    expect(resultState.controls.inner5!.controls[0].value).toBe("b");
    expect(resultState.controls.inner5!.controls[1].value).toBe("a");
  });

  it("should not update state if no child was updated", () => {
    const resultState = formGroupReducer(
      INITIAL_STATE,
      setValueAction({ controlId: FORM_CONTROL_INNER_ID, value: "" })
    );
    expect(resultState).toBe(INITIAL_STATE);
  });

  it("should not update state value if no child value was updated", () => {
    const resultState = formGroupReducer(
      INITIAL_STATE,
      markAsDirtyAction({ controlId: FORM_CONTROL_INNER_ID })
    );
    expect(resultState.value).toBe(INITIAL_STATE.value);
  });

  it("should not reset child states", () => {
    const value = "A";
    const state = formGroupReducer(
      INITIAL_STATE,
      setValueAction({ controlId: FORM_CONTROL_INNER_ID, value }) as any
    );
    const resultState = formGroupReducer(
      state,
      markAsSubmittedAction({ controlId: FORM_CONTROL_ID })
    );
    expect(resultState.controls.inner.value).toBe(value);
  });

  it("should not be stateful", () => {
    formGroupReducer(
      INITIAL_STATE_FULL,
      setValueAction({
        controlId: FORM_CONTROL_ID,
        value: INITIAL_FORM_CONTROL_VALUE,
      })
    );
    expect(() =>
      formGroupReducer(
        INITIAL_STATE_FULL,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      )
    ).not.toThrowError();
  });

  it("should preserve the order of properties when stringified", () => {
    const expected = JSON.stringify(INITIAL_STATE_FULL);
    let state = formGroupReducer(
      INITIAL_STATE_FULL,
      markAsDirtyAction({ controlId: FORM_CONTROL_ID })
    );
    state = formGroupReducer(
      state,
      markAsPristineAction({ controlId: FORM_CONTROL_ID })
    );
    expect(JSON.stringify(state)).toEqual(expected);
  });

  it("should throw if trying to set a date as value", () => {
    const state = createFormGroupState<any>(FORM_CONTROL_ID, {});
    expect(() =>
      formGroupReducer(
        state,
        setValueAction({ controlId: FORM_CONTROL_ID, value: new Date() })
      )
    ).toThrowError();
  });

  it("should throw if trying to set a date as a child value", () => {
    const state = createFormGroupState<any>(FORM_CONTROL_ID, { inner: null });
    expect(() =>
      formGroupReducer(
        state,
        setValueAction({ controlId: FORM_CONTROL_INNER_ID, value: new Date() })
      )
    ).toThrowError();
  });

  it("should throw if state is undefined", () => {
    expect(() => formGroupReducer(undefined, { type: "" })).toThrowError();
  });

  it("should throw if state is not a group state", () => {
    expect(() =>
      formGroupReducer(
        INITIAL_STATE.controls.inner as any,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      )
    ).toThrowError();
  });

  describe(setValueAction.name, () => {
    it("should update state", () => {
      const resultState = formGroupReducer(
        INITIAL_STATE,
        setValueAction({ controlId: FORM_CONTROL_ID, value: { inner: "A" } })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(setErrorsAction.name, () => {
    it("should update state", () => {
      const errors = { required: { actual: undefined } };
      const resultState = formGroupReducer(
        INITIAL_STATE,
        setErrorsAction({ controlId: FORM_CONTROL_ID, errors })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(startAsyncValidationAction.name, () => {
    it("should update state", () => {
      const name = "required";
      const resultState = formGroupReducer(
        INITIAL_STATE,
        startAsyncValidationAction({ controlId: FORM_CONTROL_ID, name })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(setAsyncErrorAction.name, () => {
    it("should update state", () => {
      const name = "required";
      const value = true;
      const state = {
        ...INITIAL_STATE,
        pendingValidations: [name],
        isValidationPending: true,
      };
      const resultState = formGroupReducer<typeof state.value>(
        state,
        setAsyncErrorAction({ controlId: FORM_CONTROL_ID, name, value })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(clearAsyncErrorAction.name, () => {
    it("should update state", () => {
      const name = "required";
      const state = {
        ...INITIAL_STATE,
        isValid: false,
        isInvalid: true,
        errors: { [`$${name}`]: true },
        pendingValidations: [name],
        isValidationPending: true,
      };

      const resultState = formGroupReducer(
        state,
        clearAsyncErrorAction({ controlId: FORM_CONTROL_ID, name })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsDirtyAction.name, () => {
    it("should update state", () => {
      const resultState = formGroupReducer(
        INITIAL_STATE,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsPristineAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isDirty: true, isPristine: false };
      const resultState = formGroupReducer(
        state,
        markAsPristineAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(enableAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
      const resultState = formGroupReducer(
        state,
        enableAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(disableAction.name, () => {
    it("should update state", () => {
      const resultState = formGroupReducer(
        INITIAL_STATE,
        disableAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsTouchedAction.name, () => {
    it("should update state", () => {
      const resultState = formGroupReducer(
        INITIAL_STATE,
        markAsTouchedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsUntouchedAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isTouched: true, isUntouched: false };
      const resultState = formGroupReducer(
        state,
        markAsUntouchedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsSubmittedAction.name, () => {
    it("should update state", () => {
      const resultState = formGroupReducer(
        INITIAL_STATE,
        markAsSubmittedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsUnsubmittedAction.name, () => {
    it("should update state", () => {
      const state = {
        ...INITIAL_STATE,
        isSubmitted: true,
        isUnsubmitted: false,
      };
      const resultState = formGroupReducer(
        state,
        markAsUnsubmittedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(addGroupControlAction.name, () => {
    it("should update state", () => {
      const action = addGroupControlAction({
        controlId: FORM_CONTROL_ID,
        name: "inner2",
        value: "",
      });
      const resultState = formGroupReducer<FormGroupValue>(
        INITIAL_STATE,
        action
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(removeGroupControlAction.name, () => {
    it("should update state", () => {
      const action = removeGroupControlAction({
        controlId: FORM_CONTROL_ID,
        name: "inner2",
      });
      const resultState = formGroupReducer<FormGroupValue>(
        INITIAL_STATE_FULL,
        action
      );
      expect(resultState).not.toBe(INITIAL_STATE_FULL);
    });
  });

  describe(setUserDefinedPropertyAction.name, () => {
    it("should update state", () => {
      const action = setUserDefinedPropertyAction({
        controlId: FORM_CONTROL_ID,
        name: "prop",
        value: 12,
      });
      const resultState = formGroupReducer<FormGroupValue>(
        INITIAL_STATE_FULL,
        action
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(resetAction.name, () => {
    it("should update state", () => {
      const action = resetAction({ controlId: FORM_CONTROL_ID });
      const state = {
        ...INITIAL_STATE,
        isSubmitted: true,
        isUnsubmitted: false,
      };
      const resultState = formGroupReducer<FormGroupValue>(state, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });
});
