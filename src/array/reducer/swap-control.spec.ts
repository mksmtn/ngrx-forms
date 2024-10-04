import { swapArrayControlAction } from "../../actions";
import { createFormArrayState } from "../../state";
import { moveControlReducer } from "./move-control";
import { swapControlReducer } from "./swap-control";
import {
  FORM_CONTROL_0_ID,
  FORM_CONTROL_ID,
  INITIAL_STATE_NESTED_GROUP,
} from "./test-util";

describe(`form array ${swapControlReducer.name}`, () => {
  const testArrayValue = [0, 1, 2, 3, 4, 5];
  const testArrayState = createFormArrayState(FORM_CONTROL_ID, testArrayValue);

  it("should swap controls forwards", () => {
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_ID,
      fromIndex: 0,
      toIndex: 2,
    });
    const resultState = swapControlReducer(testArrayState, action);
    expect(resultState.value).toEqual([2, 1, 0, 3, 4, 5]);
    expect(resultState.isDirty).toEqual(true);
  });

  it("should swap controls backwards", () => {
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_ID,
      fromIndex: 5,
      toIndex: 1,
    });
    const resultState = swapControlReducer(testArrayState, action);
    expect(resultState.value).toEqual([0, 5, 2, 3, 4, 1]);
    expect(resultState.isDirty).toEqual(true);
  });

  it("should throw on out of bound or negative indices", () => {
    expect(() =>
      swapControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        swapArrayControlAction({
          controlId: FORM_CONTROL_ID,
          fromIndex: 0,
          toIndex: INITIAL_STATE_NESTED_GROUP.controls.length,
        })
      )
    ).toThrow();
    expect(() =>
      swapControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        swapArrayControlAction({
          controlId: FORM_CONTROL_ID,
          fromIndex: INITIAL_STATE_NESTED_GROUP.controls.length,
          toIndex: 0,
        })
      )
    ).toThrow();
    expect(() =>
      swapControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        swapArrayControlAction({
          controlId: FORM_CONTROL_ID,
          fromIndex: -3,
          toIndex: INITIAL_STATE_NESTED_GROUP.controls.length,
        })
      )
    ).toThrow();
    expect(() =>
      swapControlReducer(
        INITIAL_STATE_NESTED_GROUP,
        swapArrayControlAction({
          controlId: FORM_CONTROL_ID,
          fromIndex: INITIAL_STATE_NESTED_GROUP.controls.length,
          toIndex: -2,
        })
      )
    ).toThrow();
  });

  it("should update deeply nested child IDs after a swap", () => {
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_ID,
      fromIndex: 0,
      toIndex: 1,
    });
    const resultState = swapControlReducer(INITIAL_STATE_NESTED_GROUP, action);
    resultState.controls.forEach((control, index) => {
      expect(control.id).toEqual(`${FORM_CONTROL_ID}.${index}`);
      expect(control.controls.inner.id).toEqual(
        `${FORM_CONTROL_ID}.${index}.inner`
      );
    });
  });

  it("should return the state unmodified if no element was moved", () => {
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_ID,
      fromIndex: 1,
      toIndex: 1,
    });
    const resultState = swapControlReducer(testArrayState, action);
    expect(resultState).toBe(testArrayState);
    expect(resultState.isDirty).toEqual(false);
  });

  it("should return the state if applied on a different state ID", () => {
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_0_ID,
      fromIndex: 0,
      toIndex: 1,
    });
    const resultState = swapControlReducer(testArrayState, action);
    expect(resultState).toBe(testArrayState);
  });

  it("should update nested array child IDs after a swap", () => {
    const testValue = [{ array: [0, 1, 2, 3] }, { array: [0, 1, 2, 3] }];
    const testState = createFormArrayState(FORM_CONTROL_ID, testValue);
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_ID,
      fromIndex: 0,
      toIndex: 1,
    });
    const resultState = moveControlReducer(testState, action);
    resultState.controls.forEach((control, index) => {
      expect(control.id).toEqual(`${FORM_CONTROL_ID}.${index}`);
      expect(control.controls.array.id).toEqual(
        `${FORM_CONTROL_ID}.${index}.array`
      );
      control.controls.array.controls.forEach((c, i) => {
        expect(c.id).toEqual(`${FORM_CONTROL_ID}.${index}.array.${i}`);
      });
    });
  });

  it("should mark the array as dirty", () => {
    const action = swapArrayControlAction({
      controlId: FORM_CONTROL_ID,
      fromIndex: 2,
      toIndex: 1,
    });
    const resultState = swapControlReducer(testArrayState, action);
    expect(resultState.isDirty).toEqual(true);
  });
});
