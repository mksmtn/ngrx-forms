import { Action, combineReducers, createAction, props } from "@ngrx/store";
import {
  addArrayControlAction,
  addGroupControl,
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
  removeArrayControlAction,
  setValue,
  updateGroup,
} from "ngrx-forms";

import { State as RootState } from "../app.reducer";

export interface FormValue {
  array: boolean[];
  group: { [id: string]: boolean };
}

export interface State extends RootState {
  dynamic: {
    formState: FormGroupState<FormValue>;
    array: {
      maxIndex: number;
      options: number[];
    };
    groupOptions: string[];
  };
}

export const createGroupElementAction = createAction(
  "dynamic/CREATE_GROUP_ELEMENT",
  props<{ name: string }>()
);

export const removeGroupElementAction = createAction(
  "dynamic/REMOVE_GROUP_ELEMENT",
  props<{ name: string }>()
);

export const FORM_ID = "dynamic";

export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
  array: [false, false],
  group: {
    abc: false,
    xyz: false,
  },
});

export function formStateReducer(
  s = INITIAL_STATE,
  a:
    | ReturnType<typeof createGroupElementAction>
    | ReturnType<typeof removeGroupElementAction>
) {
  s = formGroupReducer(s, a);

  switch (a.type) {
    // todo: rewrite
    case createGroupElementAction.type:
      return updateGroup<FormValue>({
        group: (group) => {
          const newGroup = addGroupControl(group, a.name, false);

          // alternatively we can also use setValue
          // const newValue = { ...group.value, [a.name]: false };
          // const newGroup = setValue(group, newValue);

          return newGroup;
        },
      })(s);

    case removeGroupElementAction.type:
      return updateGroup<FormValue>({
        group: (group) => {
          const newValue = { ...group.value };
          delete newValue[a.name];
          const newGroup = setValue(group, newValue);

          // alternatively we can also use removeGroupControl
          // const newGroup = removeGroupControl(group, a.name);

          return newGroup;
        },
      })(s);

    default:
      return s;
  }
}

const reducers = combineReducers<State["dynamic"], any>({
  formState: formStateReducer,
  // todo: rewrite
  array(
    s = { maxIndex: 2, options: [1, 2] },
    a:
      | ReturnType<typeof addArrayControlAction>
      | ReturnType<typeof removeArrayControlAction>
  ) {
    switch (a.type) {
      case addArrayControlAction.type: {
        const maxIndex = s.maxIndex + 1;
        const options = [...s.options];
        // tslint:disable-next-line:no-unnecessary-type-assertion
        options.splice(a.index!, 0, maxIndex);
        return {
          maxIndex,
          options,
        };
      }

      case removeArrayControlAction.type: {
        const options = [...s.options];
        // tslint:disable-next-line:no-unnecessary-type-assertion
        options.splice(a.index!, 1);
        return {
          ...s,
          options,
        };
      }

      default:
        return s;
    }
  },
  groupOptions(
    s: string[] = ["abc", "xyz"],
    a:
      | ReturnType<typeof createGroupElementAction>
      | ReturnType<typeof removeGroupElementAction>
  ) {
    switch (a.type) {
      case createGroupElementAction.type:
        return [...s, a.name];

      case removeGroupElementAction.type:
        return s.filter((i) => i !== a.name);

      default:
        return s;
    }
  },
});

export function reducer(s: State["dynamic"], a: Action) {
  return reducers(s, a);
}
