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
import { createFormArrayState } from "../state";
import { formArrayReducer } from "./reducer";

describe("form array reducer", () => {
  const FORM_CONTROL_ID = "test ID";
  const FORM_CONTROL_0_ID = `${FORM_CONTROL_ID}.0`;
  type FormArrayValue = string[];
  const INITIAL_FORM_CONTROL_VALUE: FormArrayValue = [""];
  const INITIAL_STATE = createFormArrayState(
    FORM_CONTROL_ID,
    INITIAL_FORM_CONTROL_VALUE
  );

  it("should skip any non-ngrx-forms action", () => {
    const resultState = formArrayReducer(INITIAL_STATE, { type: "" } as any);
    expect(resultState).toBe(INITIAL_STATE);
  });

  it("should skip any action with non-equal control ID", () => {
    const resultState = formArrayReducer(
      INITIAL_STATE,
      setValueAction({ controlId: `A${FORM_CONTROL_ID}`, value: "A" })
    );
    expect(resultState).toBe(INITIAL_STATE);
  });

  it(`should forward ${focusAction.name}s to children`, () => {
    const resultState = formArrayReducer(
      INITIAL_STATE,
      focusAction({ controlId: FORM_CONTROL_0_ID })
    );
    expect(resultState.controls[0].isFocused).toEqual(true);
    expect(resultState.controls[0].isUnfocused).toEqual(false);
  });

  it(`should forward ${unfocusAction.name}s to children`, () => {
    const state = {
      ...INITIAL_STATE,
      controls: [
        {
          ...INITIAL_STATE.controls[0],
          isFocused: true,
          isUnfocused: false,
        },
      ],
    };
    const resultState = formArrayReducer(
      state,
      unfocusAction({ controlId: FORM_CONTROL_0_ID })
    );
    expect(resultState.controls[0].isFocused).toEqual(false);
    expect(resultState.controls[0].isUnfocused).toEqual(true);
  });

  it(`should forward ${addGroupControlAction.name}s to children`, () => {
    const value = [{ inner: "" }];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState = formArrayReducer(
      state,
      addGroupControlAction({
        controlId: FORM_CONTROL_0_ID,
        name: "inner2",
        value: "",
      })
    );
    // todo: as any really needed?
    expect((resultState.controls[0].controls as any).inner2).toBeDefined();
  });

  it(`should forward ${removeGroupControlAction.name}s to children`, () => {
    const value = [{ inner: "", inner2: "" }];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState = formArrayReducer(
      state,
      removeGroupControlAction({ controlId: FORM_CONTROL_0_ID, name: "inner2" })
    );
    expect(resultState.controls[0].controls.inner2).toBeUndefined();
  });

  it(`should forward ${addArrayControlAction.name}s to children`, () => {
    const value = [["a"]];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState = formArrayReducer(
      state,
      addArrayControlAction({ controlId: FORM_CONTROL_0_ID, value: "b" })
    );
    expect(resultState.controls[0].controls[1]).toBeDefined();
  });

  it(`should forward ${removeArrayControlAction.name}s to children`, () => {
    const value = [["a", "b"]];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState = formArrayReducer(
      state,
      removeArrayControlAction({ controlId: FORM_CONTROL_0_ID, index: 0 })
    );
    expect(resultState.controls[0].controls[1]).toBeUndefined();
  });

  it(`should forward ${moveArrayControlAction.name}s to children`, () => {
    const value = [["a", "b", "c"]];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState = formArrayReducer(
      state,
      moveArrayControlAction({
        controlId: FORM_CONTROL_0_ID,
        fromIndex: 0,
        toIndex: 1,
      })
    );
    expect(resultState.controls[0].controls[0].value).toBe("b");
    expect(resultState.controls[0].controls[1].value).toBe("a");
  });

  it(`should forward ${swapArrayControlAction.name}s to children`, () => {
    const value = [["a", "b", "c"]];
    const state = createFormArrayState(FORM_CONTROL_ID, value);
    const resultState = formArrayReducer(
      state,
      swapArrayControlAction({
        controlId: FORM_CONTROL_0_ID,
        fromIndex: 0,
        toIndex: 1,
      })
    );
    expect(resultState.controls[0].controls[0].value).toBe("b");
    expect(resultState.controls[0].controls[1].value).toBe("a");
  });

  it("should not update state if no child was updated", () => {
    const resultState = formArrayReducer(
      INITIAL_STATE,
      setValueAction({ controlId: FORM_CONTROL_0_ID, value: "" })
    );
    expect(resultState).toBe(INITIAL_STATE);
  });

  it("should not update state value if no child value was updated", () => {
    const resultState = formArrayReducer(
      INITIAL_STATE,
      markAsDirtyAction({ controlId: FORM_CONTROL_0_ID })
    );
    expect(resultState.value).toBe(INITIAL_STATE.value);
  });

  it("should not reset child states", () => {
    const value = "A";
    const state = formArrayReducer(
      INITIAL_STATE,
      setValueAction({ controlId: FORM_CONTROL_0_ID, value })
    );
    const resultState = formArrayReducer(
      state,
      markAsSubmittedAction({ controlId: FORM_CONTROL_ID })
    );
    expect(resultState.controls[0].value).toBe(value);
  });

  it("should not be stateful", () => {
    formArrayReducer(
      INITIAL_STATE,
      setValueAction({ controlId: FORM_CONTROL_ID, value: [] })
    );
    expect(() =>
      formArrayReducer(
        INITIAL_STATE,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      )
    ).not.toThrowError();
  });

  it("should preserve the order of properties when stringified", () => {
    const expected = JSON.stringify(INITIAL_STATE);
    let state = formArrayReducer(
      INITIAL_STATE,
      markAsDirtyAction({ controlId: FORM_CONTROL_ID })
    );
    state = formArrayReducer(
      state,
      markAsPristineAction({ controlId: FORM_CONTROL_ID })
    );
    expect(JSON.stringify(state)).toEqual(expected);
  });

  it("should throw if state is undefined", () => {
    expect(() => formArrayReducer(undefined, { type: "" })).toThrowError();
  });

  it("should throw if state is not an array state", () => {
    expect(() =>
      formArrayReducer(
        INITIAL_STATE.controls[0] as any,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      )
    ).toThrowError();
  });

  describe(setValueAction.name, () => {
    it("should update state", () => {
      const resultState = formArrayReducer(
        INITIAL_STATE,
        setValueAction({ controlId: FORM_CONTROL_ID, value: ["A"] })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(setErrorsAction.name, () => {
    it("should update state", () => {
      const errors = { required: { actual: undefined } };
      const resultState = formArrayReducer(
        INITIAL_STATE,
        setErrorsAction({ controlId: FORM_CONTROL_ID, errors })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(startAsyncValidationAction.name, () => {
    it("should update state", () => {
      const name = "required";
      const resultState = formArrayReducer(
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
      const resultState = formArrayReducer(
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

      const resultState = formArrayReducer(
        state,
        clearAsyncErrorAction({ controlId: FORM_CONTROL_ID, name })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsDirtyAction.name, () => {
    it("should update state", () => {
      const resultState = formArrayReducer(
        INITIAL_STATE,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsPristineAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isDirty: true, isPristine: false };
      const resultState = formArrayReducer(
        state,
        markAsPristineAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(enableAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
      const resultState = formArrayReducer(
        state,
        enableAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(disableAction.name, () => {
    it("should update state", () => {
      const resultState = formArrayReducer(
        INITIAL_STATE,
        disableAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsTouchedAction.name, () => {
    it("should update state", () => {
      const resultState = formArrayReducer(
        INITIAL_STATE,
        markAsTouchedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsUntouchedAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isTouched: true, isUntouched: false };
      const resultState = formArrayReducer(
        state,
        markAsUntouchedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsSubmittedAction.name, () => {
    it("should update state", () => {
      const resultState = formArrayReducer(
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
      const resultState = formArrayReducer(
        state,
        markAsUnsubmittedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(setUserDefinedPropertyAction.name, () => {
    it("should update state", () => {
      const action = setUserDefinedPropertyAction({
        controlId: FORM_CONTROL_ID,
        name: "prop",
        value: 12,
      });
      const resultState = formArrayReducer<string>(INITIAL_STATE, action);
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
      const resultState = formArrayReducer<string>(state, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(addArrayControlAction.name, () => {
    it("should update state", () => {
      const action = addArrayControlAction({
        controlId: FORM_CONTROL_ID,
        value: "",
      });
      const resultState = formArrayReducer<string>(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(removeArrayControlAction.name, () => {
    it("should update state", () => {
      const action = removeArrayControlAction({
        controlId: FORM_CONTROL_ID,
        index: 0,
      });
      const resultState = formArrayReducer<string>(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(moveArrayControlAction.name, () => {
    it("should update state", () => {
      const action = moveArrayControlAction({
        controlId: FORM_CONTROL_ID,
        fromIndex: 0,
        toIndex: 1,
      });
      const state = createFormArrayState(FORM_CONTROL_ID, ["a", "b", "c"]);
      const resultState = formArrayReducer<string>(state, action);
      expect(resultState).not.toBe(state);
    });
  });

  describe(swapArrayControlAction.name, () => {
    it("should update state", () => {
      const action = swapArrayControlAction({
        controlId: FORM_CONTROL_ID,
        fromIndex: 0,
        toIndex: 1,
      });
      const state = createFormArrayState(FORM_CONTROL_ID, ["a", "b", "c"]);
      const resultState = formArrayReducer<string>(state, action);
      expect(resultState).not.toBe(state);
    });
  });
});
