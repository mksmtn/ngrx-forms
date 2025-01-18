import {
  Action,
  combineReducers,
  createAction,
  createReducer,
  on,
  props,
} from "@ngrx/store";
import {
  addArrayControlAction,
  addGroupControl,
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
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

export const formStateReducer = createReducer<
  typeof INITIAL_STATE,
  | ReturnType<typeof createGroupElementAction>
  | ReturnType<typeof removeGroupElementAction>
>(
  INITIAL_STATE,
  onNgrxForms(),
  on(createGroupElementAction, (state, action) => {
    return updateGroup<FormValue>({
      group: (group) => {
        const newGroup = addGroupControl(group, action.name, false);

        // alternatively we can also use setValue
        // const newValue = { ...group.value, [a.name]: false };
        // const newGroup = setValue(group, newValue);

        return newGroup;
      },
    })(state);
  }),
  on(removeGroupElementAction, (state, action) => {
    return updateGroup<FormValue>({
      group: (group) => {
        const newValue = { ...group.value };
        delete newValue[action.name];
        const newGroup = setValue(group, newValue);

        // alternatively we can also use removeGroupControl
        // const newGroup = removeGroupControl(group, a.name);

        return newGroup;
      },
    })(state);
  })
);

const arrayReducer = createReducer<
  State["dynamic"]["array"],
  | ReturnType<typeof addArrayControlAction>
  | ReturnType<typeof removeArrayControlAction>
>(
  { maxIndex: 2, options: [1, 2] },
  on(addArrayControlAction, (state, action) => {
    const maxIndex = state.maxIndex + 1;
    const options = [...state.options];
    options.splice(action.index ?? 0, 0, maxIndex);
    return {
      maxIndex,
      options,
    };
  }),
  on(removeArrayControlAction, (state, action) => {
    const options = [...state.options];
    options.splice(action.index, 1);
    return {
      ...state,
      options,
    };
  })
);

const groupOptionsReducer = createReducer<
  State["dynamic"]["groupOptions"],
  | ReturnType<typeof createGroupElementAction>
  | ReturnType<typeof removeGroupElementAction>
>(
  ["abc", "xyz"],
  on(createGroupElementAction, (state, action) => {
    return [...state, action.name];
  }),
  on(removeGroupElementAction, (state, action) => {
    return state.filter((a) => a !== action.name);
  })
);

const reducers = combineReducers<State["dynamic"], any>({
  formState: formStateReducer,
  array: arrayReducer,
  groupOptions: groupOptionsReducer,
});

export function reducer(s: State["dynamic"], a: Action) {
  return reducers(s, a);
}
