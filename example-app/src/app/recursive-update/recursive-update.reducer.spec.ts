import {
  blockUIAction,
  formStateReducer,
  INITIAL_STATE,
  unblockUIAction,
} from "./recursive-update.reducer";

describe("recursive update", () => {
  it("should disable all controls when blocking", () => {
    const state = formStateReducer(INITIAL_STATE, blockUIAction());
    expect(state.isEnabled).toBe(false);
  });

  it("should enable all controls that were enabled when blocking and leave others disabled", () => {
    let state = formStateReducer(INITIAL_STATE, blockUIAction());
    state = formStateReducer(state, unblockUIAction());
    expect(state.isEnabled).toBe(true);
    expect(state.controls.firstName.isEnabled).toBe(true);
    expect(state.controls.lastName.isEnabled).toBe(true);
    expect(state.controls.email.isEnabled).toBe(true);
    expect(state.controls.favoriteColor.isEnabled).toBe(true);
    expect(state.controls.employed.isEnabled).toBe(false);
    expect(state.controls.notes.isEnabled).toBe(false);
    expect(state.controls.sex.isEnabled).toBe(false);
  });
});
