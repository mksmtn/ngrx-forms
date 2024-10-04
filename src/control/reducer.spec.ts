import {
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
  resetAction,
  setAsyncErrorAction,
  setErrorsAction,
  setUserDefinedPropertyAction,
  setValueAction,
  startAsyncValidationAction,
  unfocusAction,
} from "../actions";
import { createFormControlState } from "../state";
import { formControlReducer } from "./reducer";

describe("form control reducer", () => {
  const FORM_CONTROL_ID = "test ID";
  const INITIAL_FORM_CONTROL_VALUE = "";
  const INITIAL_STATE = createFormControlState<string>(
    FORM_CONTROL_ID,
    INITIAL_FORM_CONTROL_VALUE
  );

  it("should skip any action with non-equal control ID", () => {
    const resultState = formControlReducer(
      INITIAL_STATE,
      setValueAction({ controlId: `${FORM_CONTROL_ID}A`, value: "A" })
    );
    expect(resultState).toBe(INITIAL_STATE);
  });

  it("should preserve the order of properties when stringified", () => {
    const expected = JSON.stringify(INITIAL_STATE);
    let state = formControlReducer(
      INITIAL_STATE,
      markAsDirtyAction({ controlId: FORM_CONTROL_ID })
    );
    state = formControlReducer(
      state,
      markAsPristineAction({ controlId: FORM_CONTROL_ID })
    );
    expect(JSON.stringify(state)).toEqual(expected);
  });

  it("should throw if state is undefined", () => {
    expect(() => formControlReducer(undefined, { type: "" })).toThrowError();
  });

  it("should throw if state is not a control state", () => {
    expect(() =>
      formControlReducer(
        { ...INITIAL_STATE, value: [], controls: [] } as any,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      )
    ).toThrowError();
  });

  describe(setValueAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
        INITIAL_STATE,
        setValueAction({ controlId: FORM_CONTROL_ID, value: "A" })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(setErrorsAction.name, () => {
    it("should update state", () => {
      const errors = { required: { actual: undefined } };
      const resultState = formControlReducer(
        INITIAL_STATE,
        setErrorsAction({ controlId: FORM_CONTROL_ID, errors })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(startAsyncValidationAction.name, () => {
    it("should update state", () => {
      const name = "required";
      const resultState = formControlReducer(
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
      const resultState = formControlReducer(
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

      const resultState = formControlReducer(
        state,
        clearAsyncErrorAction({ controlId: FORM_CONTROL_ID, name })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsDirtyAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
        INITIAL_STATE,
        markAsDirtyAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsPristineAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isDirty: true, isPristine: false };
      const resultState = formControlReducer(
        state,
        markAsPristineAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(enableAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
      const resultState = formControlReducer(
        state,
        enableAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(disableAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
        INITIAL_STATE,
        disableAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsTouchedAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
        INITIAL_STATE,
        markAsTouchedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsUntouchedAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isTouched: true, isUntouched: false };
      const resultState = formControlReducer(
        state,
        markAsUntouchedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(focusAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
        INITIAL_STATE,
        focusAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(unfocusAction.name, () => {
    it("should update state", () => {
      const state = { ...INITIAL_STATE, isFocused: true, isUnfocused: false };
      const resultState = formControlReducer(
        state,
        unfocusAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(setUserDefinedPropertyAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
        INITIAL_STATE,
        setUserDefinedPropertyAction({
          controlId: FORM_CONTROL_ID,
          name: "prop",
          value: 12,
        })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(markAsSubmittedAction.name, () => {
    it("should update state", () => {
      const resultState = formControlReducer(
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
      const resultState = formControlReducer(
        state,
        markAsUnsubmittedAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(resetAction.name, () => {
    it("should update state", () => {
      const state = {
        ...INITIAL_STATE,
        isSubmitted: true,
        isUnsubmitted: false,
      };
      const resultState = formControlReducer(
        state,
        resetAction({ controlId: FORM_CONTROL_ID })
      );
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });
});
